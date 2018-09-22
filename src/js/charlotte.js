/**
 * charlotte.js
 *
 * A set of JavaScript tools to help you make cool stuff on the web.
 *
 * v0.3 tagged 20140812
 *
 * 20170429 + some minor edits for this use case, I really need to standardize charlotte versions :/
 */

{ /* Utilities */

  // random UUID generator brought to you by https://gist.github.com/jed/982883
	UUIDv4 = function b(a)
  {
    return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)
  };
	
  // Fisher-Yates Shuffle as described ingeniously here: http://bost.ocks.org/mike/shuffle/
  shuffle = function(array)
  {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m)
    {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  };
  
  // Sort an array by key, inspired by http://phpjs.org/functions/ksort
	ksort = function(data)
	{
		var k, i;
		var keys   = [];
		var sorted = [];

		// create an array of keys
		for (k in data) keys.push(k);

		// sort it
		sorter = function(a, b) { return ((a+0)-(b+0)); };
		keys.sort(sorter);

		// create a new array with original values in key order
		for ( i = 0 ; i < keys.length ; i++ )
		{
			k = keys[i];
			sorted[k] = data[k];
		};

		return sorted;
	};

  // Get the absolute offset of an element.
	getAbsoluteOffset = function(element)
	{
		// possibly the same as jQuery.offset(), at least in nominal cases		
		var offset = { top : 0, left : 0 };
		do
		{
			offset.top     += element.offsetTop  || 0;
			offset.left    += element.offsetLeft || 0;
			element         = element.offsetParent;
		} while(element);

		return offset;
	};

  // Perform a deep copy of most JS variable types
  deepCopy = function(original)
  {
    var type = typeof original;
    
    if       (original === null        ) return original;
    else if  (type     === 'number'    ) return original;
    else if  (type     === 'string'    ) return original;
    else if  (type     === 'boolean'   ) return original;
    else if  (type     === 'undefined' ) return original;
    else if  (type     === 'object'    )
    {
      var copy = Array.isArray(original)?[]:Object.create(Object.getPrototypeOf(original));
      for (i in original) copy[i] = deepCopy(original[i]);
      return copy;
    }
    else throw 'deepCopy : invalid type (' + type + ')';
  };
}

{ /* Classes */
	
	{ // Component
	
		// Abstract-ish class intended as a parent for web components.

		var Component = function(style)
		{
			this.uuid       = UUIDv4();
			//this.style      = style || Object.create(null);  // 20170429 removed
			this.components = [];
			this.enabled    = true;
		};

		Component.prototype.initialize = function(sessionTime)
		{
			for (i in this.components) this.components[i].initialize(sessionTime);
		};
		
		// TODO: used to be self.update(document.hasFocus(), self.isActive), but behavior of document.hasFocus appears to differ by browser;
		// Chrome for Mac apparently returns true while in the console?
		Component.prototype.update     = function(sessionTime)
		{
			for (i in this.components) this.components[i].update(sessionTime);
		};
		
		Component.prototype.draw       = function(sessionTime)
		{
			for (i in this.components) this.components[i].draw(sessionTime);	
		};
		
		Component.prototype.getElement = function()
		{
			if (typeof(this.element) === 'undefined')
			{
				this.element = document.createElement('div');
				this.element.setAttribute('class', 'component');
				this.element.setAttribute('uuid', this.uuid);
				this.element.object = this;
				/* 20170429 removed
				for (var key in this.style)
				{
					this.element.style[key] = this.style[key];
				}
				*/
			}
			
			return this.element;
		};
	
	}

	{ // Session
	
		var Session = function()
		{
			Component.call(this);
			
			this.startTime       = 0;
			this.sessionTime     = null;
			this.targetFrameRate = 1000/24;
			this.minTimeout      = 4;
			this.components      = [];
			// TODO: this should be protected because setting it externally won't work
			this.isActive        = false;

			// TODO: consider moving these to prototype
			this.run             = function(){ this.isActive = true; this.tick(); };
			this.stop            = function(){ this.isActive = false; };
		};
		
		Session.prototype = Object.create(Component.prototype);
		
		// TODO: not sure when this should happen...when are components added? How do we ensure they are initialized if added later?
		// NOTE: no sessionTime argument here
		Session.prototype.initialize = function()
		{
			// TODO: these might belong in run()
			this.startTime   = Date.now();
			this.sessionTime = new SessionTime(0, 0, false);
			
			// use Function.prototype.bind to prevent scope problems with setTimeout
			this.tock = this.tick.bind(this);
			
			Component.prototype.initialize.call(this, this.sessionTime);
		};
		
		Session.prototype.tick = function()
		{
			if (!this.isActive) return;
		
			var totalSessionTime       = Date.now() - this.startTime;
			var elapsedSessionTime     = totalSessionTime - this.sessionTime.totalSessionTime;
			var isRunningSlowly        = elapsedSessionTime > this.targetFrameRate;
			var targetSleepTime        = Math.floor(Math.max(0, this.targetFrameRate - elapsedSessionTime));
			
			if (targetSleepTime <= this.minTimeout)
			{
				this.sessionTime         = new SessionTime(totalSessionTime, elapsedSessionTime, isRunningSlowly);
				
				this.update(this.sessionTime);
				// TODO: skip draw if isRunningSlowly?
				this.draw(this.sessionTime);
				
				// recalculate target sleep time after update is done
				totalSessionTime       = Date.now() - this.startTime;
				elapsedSessionTime     = totalSessionTime - this.sessionTime.totalSessionTime;
				targetSleepTime        = Math.floor(Math.max(0, this.targetFrameRate - elapsedSessionTime));
			}
			
			// TODO: previous versions subtracted minTimeout/2 from targetSleepTime to prevent isRunningSlowly...consider
			setTimeout(this.tock, targetSleepTime);
			
			// console.log('[' + this.sessionTime.totalSessionTime + '] : ' + this.sessionTime.elapsedSessionTime + ' / ' + this.targetFrameRate + ', waiting ' + targetSleepTime + 'ms.');
		};
		
	}

	{ // SessionTime

		var SessionTime = function(totalSessionTime, elapsedSessionTime, isRunningSlowly)
		{
			this.totalSessionTime   = typeof(totalSessionTime)   === 'undefined'? 0     : totalSessionTime;
			this.elapsedSessionTime = typeof(elapsedSessionTime) === 'undefined'? 0     : elapsedSessionTime;
			this.isRunningSlowly    = typeof(isRunningSlowly)    === 'undefined'? false : isRunningSlowly;
		};

	}

	{ // FrameRate
	
		var FrameRate = function()
		{
			Component.call(this);
			
			this.total = 0;
			this.fps   = 0;
		};
		
		FrameRate.prototype = Object.create(Component.prototype);
		
		FrameRate.prototype.update = function(sessionTime)
		{
			this.total = session.sessionTime.totalSessionTime;
			this.fps   = Math.floor(1000/session.sessionTime.elapsedSessionTime);
			
			Component.prototype.update.call(this, sessionTime);
		};
		
		FrameRate.prototype.draw = function(sessionTime)
		{
			this.getElement().innerHTML = '[framerate] ' + this.total + ' : ' + this.fps + 'fps';
			
			Component.prototype.draw.call(this, sessionTime);
		};
	
	}

	{ // TimeQueue

		// Keeps an array of timestamps and functions to be executed at those times.
		var TimeQueue = function()
		{
			Component.call(this);			
			this.queue = [];
		};

		TimeQueue.prototype = Object.create(Component.prototype);
		
		TimeQueue.prototype.add = function(when, what)
		{
			// TODO: consider relative vs absolute times
			if (this.queue[when] === undefined) this.queue[when] = [];
			this.queue[when].push(what);
			this.queue = ksort(this.queue);
		};
		
		TimeQueue.prototype.update = function(sessionTime)
		{
			// TODO: use sessionTime
			var now = new Date().getTime();

			for (var i in this.queue)
			{
				if (i < now)
				{
					for (var v in this.queue[i])
					{
            // Note on scope: "this" points to the function being called.
						this.queue[i][v]();
					}
					delete this.queue[i];
				}
				else break;
			}
			
			Component.prototype.update.call(this, sessionTime);
			
		};
	}

  { // Dispatcher
  
    // Intents-type utility allowing registration of functions to process arbitrary data types.
    var Dispatcher = function()
    {
      this.handlers = {};
    };
    
    Dispatcher.prototype =
    {

      dispatch : function(object, type)
      {
        var handlers = this.handle(type);
        
        for(i in handlers)
        {
          // stop processing if a handler returns true
          if (handlers[i](object)) break;
        }
      },

      /**
      * Both handle and unhandle take type and handler parameters. Both return an
      * array of handlers for the given type. Handle first adds handler to the
      * array if it is not already present, and unhandle first removes handler
      * from the array if it is present.
      */
      
      handle : function(type, handler)
      {
        if (!type) return [];
        
        this.handlers[type] = this.handlers[type] || [];
        
        if (handler && $(handlers[handler]).indexOf(this.handlers[type]) == -1) this.handlers[type].push(handler);
        return this.handlers[type];
      },
      
      unhandle : function(type, handler)
      {
        if (!this.handlers[type]) return [];
        var i = $(handlers[handler]).indexOf(this.handlers[type]);
        if (i > -1) this.handlers[type].splice(i, 1);
        return this.handlers[type];
      }
    };
  
  }

  { // Bulwark
  
    // Baseline JSON-serializable object template, v0.1
    
    // Usage:
    // var foo = new Bulwark();
    // var json = JSON.stringify(foo);
    
    var Bulwark = function()
    {
      var bulwark = Object.create(null);
      
      bulwark["meta"] = Object.create(null);
      bulwark["meta"]["format"]  = "bulwark";
      bulwark["meta"]["version"] = 0.1;
      bulwark["meta"]["result"]  = 1;
      bulwark["meta"]["message"] = "This is why result is 0, optional if result is 1.";
      bulwark["meta"]["about"]   = "Other optional fields can be added here.";
      bulwark["data"] = [];
      
      // NOTE: The specification for bulwark requires each object within the data array to have a "type" member with a string value to be used as a domain-unique identifier for the payload type, and an "object" member with either an object or an array value, containing the payload. For example:
      
      /*
      var info =
        {
          "type"     : "foo",
          "object"   : {} // or []
        };
      
      bulwark["data"].push(info);
      */
      
      return bulwark;
    }
  }

}

{ /* Components */
  
  { // Piece  

    // A piece is a movable component, usually within a zone.

    var Piece = function(style)
    {
      Component.call(this, style);
      
      this.zone = null;
    };

    Piece.prototype = Object.create(Component.prototype);
		
		Piece.prototype.getElement = function()
		{
			if (typeof(this.element) === 'undefined')
			{
				this.element = Component.prototype.getElement.call(this);
				this.element.className += ' piece';
			}
			
			return this.element;
		};
  }
  
  { // Zone
  
    // A region capable of containing pieces.

    var Zone = function(style)
    {
      Component.call(this, style);
      
      this.pieces = [];
    };

    Zone.prototype = Object.create(Component.prototype);
		
		Zone.prototype.getElement = function()
		{
			if (typeof(this.element) === 'undefined')
			{
				this.element = Component.prototype.getElement.call(this);
				this.element.className += ' zone';
			}
			
			return this.element;
		};

    // Returns the coordinates a specified piece should move to if it is gained by this zone.
    Zone.prototype.getTargetCoordinates = function(piece) {return getAbsoluteOffset(this.getElement());};

    Zone.prototype.gainPiece = function(piece)
    {
      // determine where piece is and where it's going
      var from = getAbsoluteOffset(piece.getElement());
      var to   = this.getTargetCoordinates();
      
      // tell old zone to give it up
      var oldzone = piece.zone;
      if (oldzone) oldzone.losePiece(piece, this);
      
      // acquire piece
      piece.zone = this;
      this.pieces.push(piece);
      this.getElement().appendChild(piece.getElement());
      
      // (later tier) animation
      // reset position relative to new parent? may not be needed now.
      // start animation
      // consider state changes / side effects
      
      var animation = new Animations.Slide(piece, from, to, 2000);
      piece.components.push(animation);
    }

    Zone.prototype.losePiece = function(piece, newZone)
    {
      // find piece in this zone
      var index = this.pieces.indexOf(piece);

      // not present
      if (index == -1) return false

      // remove piece from pieces
      // TODO: validate with return value of element removed?
      this.pieces.splice(index, 1);
      
      // (later tier) consider side effects; move remaining pieces, chain events?
    };

  }

}

{ /* Animations */

  // Various classes for timed state transitions.

  var Animations = {};
  
  { // Slide
  
    Animations.Slide = function(subject, from, to, duration)
    {
      Component.call(this);
      
      this.subject   = subject;
      this.from      = from;
      this.to        = to;
      this.duration  = duration;
      this.startTime = Date.now(); // TODO: pull this from sessionTime
      this.at        = {};
      
      // TODO: consider an initialize function for this?
      for (var key in this.from)
      {
        this.at[key] = this.from[key];
      }
    }

    Animations.Slide.prototype = Object.create(Component.prototype);

    Animations.Slide.prototype.update = function(sessionTime)
    {
      // TODO: pull this from sessionTime
      var factor = Math.min(1, (Date.now() - this.startTime) / this.duration);
      
      // TODO: this needs to happen in timed steps
      for (var key in this.at)
      {
        var diff = (this.to[key] - this.from[key]);
        
        this.at[key] = this.from[key] + (diff * factor);
      }
      
      Component.prototype.update.call(this);
    };

    Animations.Slide.prototype.draw = function(sessionTime)
    {
      // TODO: all values must be numeric for now, assuming px
      for (var key in this.at)
      {
        this.subject.getElement().style[key] = this.at[key] + "px";
      }
      
      Component.prototype.draw.call(this);
    };
  
  }

}

{ /* Geometry (2D) */

	// 20140612 - Conceived of geometry utilities while pondering welzl sphere implementation. Most of this stuff is first-draft, unrefined, and untested.
	
	// TODO: Look into SVG elements as a way of displaying these objects on-screen.

  { // Point
  
    var Point = function(x, y)
    {
      this.x = x || 0;
      this.y = y || 0;
    }
    
    Point.prototype.distance = function(p)
    {
      // a^2 + b^2 = c^2, thank you Pythagoras!
      var asquared = Math.pow(this.x, 2) + Math.pow(p.x, 2);
      var bsquared = Math.pow(this.y, 2) + Math.pow(p.y, 2);
      var c = Math.sqrt(asquared + bsquared)
      return c;
    }
    
    Point.prototype.midpoint = function(p)
    {
      // A point equidistant between two points is the average of the two.
      var x = (this.x + p.x) / 2;
      var y = (this.y + p.y) / 2;
      return new Point(x, y);
    }
  
  }
  
  { // Line
  
    var Line = function(p1, p2)
    {
      this.p1 = p1 || new Point();
      this.p2 = p2 || new Point();
    }
    
    Line.prototype.length = function()
    {
      return this.p1.distance(this.p2);
    }
    
    Line.prototype.midpoint = function()
    {
      return this.p1.midpoint(this.p2);
    }

    Line.prototype.intersection = function(l)
    {
      // convert to form Ax+By=C
      // see http://community.topcoder.com/tc?module=Static&d1=tutorials&d2=geometry2

      // Line 1
      var A1 = l1.p2.y - l1.p1.y;
      var B1 = l1.p1.x - l1.p2.x;
      var C1 = A1*l1.p1.x + B1*l1.p1.y;

      // Line 2
      var A2 = l2.p2.y - l2.p1.y;
      var B2 = l2.p1.x - l2.p2.x;
      var C2 = A2*l2.p1.x + B2*l2.p1.y;

      // determinant
      var det = A1*B2 - A2*B1;

      if (det == 0) return null; // parallel

      // NOTE: This can introduce rounding errors due to floating point math
      
      var x = (B2*C1 - B1*C2) / det;
      var y = (A1*C2 - A2*C1) / det;

      return new Point(x, y);
    }
    
    Line.prototype.slope = function()
    {
      // Slope is defined as change in height divided by change in horizontal distance
      var dx = this.p1.x - this.p2.x;
      var dy = this.p1.y - this.p2.y;
      return dy / dx;
    }
    
    Line.prototype.perpendicularBisector = function()
    {
      var mid   = this.midpoint();
      var perp  = new Vector(this.p1.x - this.p2.x, this.p1.y - this.p2.y).perpendicular();
      
      return new Line(mid, new Point(perp.x + mid.x, perp.y + mid.y));
    }
    
    Line.prototype.formula = function()
    {    
      // NOTE: This is just here to help me plug formulas into a graphing tool during development
      
      // The "point-slope" form of the equation of a straight line is: y - y1 = m(x - x1)
      
      var m   = this.slope();
      var mx1 = m * this.p1.x;
      var y1  = this.p1.y;
      
      var formula = "y = " + m + "x ";      
      formula += mx1 < 0?"+ ":"- ";
      formula += Math.abs(mx1) + " ";
      formula += y1 < 0?"- ":"+ ";
      formula += Math.abs(y1);
      
      return formula;
    
    }

    
  }
  
  { // Vector
  
    var Vector = function(x, y)
    {
      this.x = x || 0;
      this.y = y || 0;
    }
    
    Vector.prototype.length = function()
    {
      return new Point().distance(new Point(this.x, this.y));
    }
    
    // Create a unit vector from this vector, maintaining direction but setting length to 1.
    
    Vector.prototype.normalize = function()
    {
      // A unit vector is created by dividing a vector by its own magnitude.
      
      var m = this.length();
      return new Vector(this.x / m, this.y / m);
    }

    Vector.prototype.slope = function()
    {
      // Slope is defined as change in height divided by change in horizontal distance
      return this.y / this.x;
    }
    
    Vector.prototype.perpendicular = function()
    {
      var slope = -1/this.slope();
      return new Vector(1, slope);
    }
    
    Vector.prototype.formula = function()
    {
      // NOTE: This is just here to help me plug formulas into a graphing tool during development
      
      // The "point-slope" form of the equation of a straight line is: y - y1 = m(x - x1)
      // For a vector, that's basiccaly just y = mx
      
      var m     = this.slope();
      
      var formula = "y = " + m + "x";      
      
      return formula;
    }
    
  }
  
  { // Ray
  
    var Ray = function(position, direction)
    {
      this.position  = position  || new Point(0,0);
      this.direction = direction || new Vector(0,0);
    }
    
    Ray.prototype.intersect = function(r)
    {
      // From http://stackoverflow.com/questions/2931573/determining-if-two-rays-intersect
      
      // Given: two rays a, b with starting points (origin vectors) as, bs, and direction vectors ad, bd.
      // The two lines intersect if there is an intersection point p:

      // p = as + ad * u
      // p = bs + bd * v
      
      // If this equation system has a solution for u>=0 and v>=0
      // (the positive direction is what makes them rays), the rays intersect.
      
      // For the x/y coordinates of the 2d vectors, this means:

      // p.x = as.x + ad.x * u
      // p.y = as.y + ad.y * u
      // p.x = bs.x + bd.x * v
      // p.y = bs.y + bd.y * v
      
      // Further steps:

      // as.x + ad.x * u = bs.x + bd.x * v
      // as.y + ad.y * u = bs.y + bd.y * v
      
      // Solving against v:

      // v := (as.x + ad.x * u - bs.x) / bd.x
      
      // Inserting and solving against u:

      // as.y + ad.y * u = bs.y + bd.y * ((as.x + ad.x * u - bs.x) / bd.x) 
      // u := (as.y*bd.x + bd.y*bs.x - bs.y*bd.x - bd.y*as.x ) / (ad.x*bd.y - ad.y*bd.x)
      
      // Calculate u, then calculate v, if both are positive the rays intersect, else not.
      
      // TODO: This can return infinity, if two rays overlap each other.
      
      var as = this.position;
      var ad = this.direction;
      var bs = r.position;
      var bd = r.direction;
      
      var u = (as.y * bd.x + bd.y * bs.x - bs.y * bd.x - bd.y * as.x) / (ad.x * bd.y - ad.y * bd.x);
      var v = (as.x + ad.x * u - bs.x) / bd.x;
      
      if (u < 0 || u != v) return false;
      
      return new Point(as.x + ad.x * u, as.y + ad.y * u);
    }
    
  }
  
  { // Circle
  
    // NOTE: I've overloaded this function to allow several ways to define a circle.
  
    var Circle = function(arg1, arg2, arg3)
    {
      this.center = new Point();
      this.radius = 0;
    
      // TODO: establish a method of identifying object types
      var argtypes = typeof(arg1) + typeof(arg2) + typeof(arg3);
      
      // TODO: lots of edge cases here, bad data types, duplicate points, negative values...
      
      // Method 1: center, radius
      if (argtypes == "objectnumberundefined")
      {
        this.center = arg1;
        this.radius = arg2;
      }
      
      // Method 2: 2 points
      else if (argtypes == "objectobjectundefined")
      {
        // Create the smallest possible circle which includes both points.
        this.center = arg1.midpoint(arg2);
        this.radius = this.center.distance(arg2);
      }
      
      // Method 3: 3 points
      else if (argtypes == "objectobjectobject")
      {
        // Create the smallest possible circle which includes all 3 points.
        
        // Probably not the most efficient way, but the first one that comes to mind: take the longest leg of the triangle created by the three points, draw a line from the odd point perpendicular to and intersecting that line, and find the point on that line at which all 3 points are equidistant? Honestly, I should just look at the welzl sphere implementation though.
        
        // The center of a circle circumscribed on a triangle is the intersection of any two perpendicular bisectors.
        
        var l1 = new Line(arg1, arg2).perpendicularBisector();
        var l2 = new Line(arg1, arg3).perpendicularBisector();
        
        var p = l1.intersection(l2);
        
        // no intersection? what a mess.
        if (p == null) return null;
        
        this.center = p;
        this.radius = p.distance(arg1);
      }
    
    }
    
    Circle.prototype.contains = function(p)
    {
      return this.center.distance(p) <= this.radius;
    }
    
    Circle.prototype.formula = function()
    {    
      // (x-a)2 + (y-b)2 = r2
      return "(x - " + this.center.x + ")^2 + (y - " + this.center.y + ")^2 = " + Math.pow(this.radius, 2);
    }
  
  }

}