/**
 * index.js
 *
 * GY-64x AI Gamemaster
 *
 * v0.0.0.BLM
 *
 * 20201127 - aaron ward
 */

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

var interjections =
{
  abracadabra : 'I can say abracadabra	as, <say-as interpret-as="interjection">abracadabra</say-as>',
  absolutely : 'I can say absolutely	as, <say-as interpret-as="interjection">absolutely</say-as>',
  achoo : 'I can say achoo	as, <say-as interpret-as="interjection">achoo</say-as>',
  ack : 'I can say ack	as, <say-as interpret-as="interjection">ack</say-as>',
  agreed : 'I can say agreed	as, <say-as interpret-as="interjection">agreed</say-as>',
  ah : 'I can say ah	as, <say-as interpret-as="interjection">ah</say-as>',
  aha : 'I can say aha	as, <say-as interpret-as="interjection">aha</say-as>',
  ahem : 'I can say ahem	as, <say-as interpret-as="interjection">ahem</say-as>',
  ahoy : 'I can say ahoy	as, <say-as interpret-as="interjection">ahoy</say-as>',
  alas : 'I can say alas	as, <say-as interpret-as="interjection">alas</say-as>',
  all : 'I can say all righty	as, <say-as interpret-as="interjection">all righty</say-as>',
  aloha : 'I can say aloha	as, <say-as interpret-as="interjection">aloha</say-as>',
  alrighty : 'I can say alrighty	as, <say-as interpret-as="interjection">alrighty</say-as>',
  anyhoo : 'I can say anyhoo	as, <say-as interpret-as="interjection">anyhoo</say-as>',
  anytime : 'I can say anytime	as, <say-as interpret-as="interjection">anytime</say-as>',
  aooga : 'I can say aooga	as, <say-as interpret-as="interjection">aooga</say-as>',
  april : 'I can say april fools\'	as, <say-as interpret-as="interjection">april fools\'</say-as>',
  argh : 'I can say argh	as, <say-as interpret-as="interjection">argh</say-as>',
  arr : 'I can say arr	as, <say-as interpret-as="interjection">arr</say-as>',
  arrivederci : 'I can say arrivederci	as, <say-as interpret-as="interjection">arrivederci</say-as>',
  as : 'I can say as if	as, <say-as interpret-as="interjection">as if</say-as>',
  as : 'I can say as you wish	as, <say-as interpret-as="interjection">as you wish</say-as>',
  attagirl : 'I can say attagirl	as, <say-as interpret-as="interjection">attagirl</say-as>',
  au : 'I can say au revoir	as, <say-as interpret-as="interjection">au revoir</say-as>',
  avast : 'I can say avast ye	as, <say-as interpret-as="interjection">avast ye</say-as>',
  aw : 'I can say aw	as, <say-as interpret-as="interjection">aw</say-as>',
  aw : 'I can say aw man	as, <say-as interpret-as="interjection">aw man</say-as>',
  awesome : 'I can say awesome	as, <say-as interpret-as="interjection">awesome</say-as>',
  aww : 'I can say aww applesauce	as, <say-as interpret-as="interjection">aww applesauce</say-as>',
  aww : 'I can say aww yeah	as, <say-as interpret-as="interjection">aww yeah</say-as>',
  ay : 'I can say ay	as, <say-as interpret-as="interjection">ay</say-as>',
  aye : 'I can say aye	as, <say-as interpret-as="interjection">aye</say-as>',
  baa : 'I can say baa	as, <say-as interpret-as="interjection">baa</say-as>',
  bada : 'I can say bada bing bada boom	as, <say-as interpret-as="interjection">bada bing bada boom</say-as>',
  bah : 'I can say bah humbug	as, <say-as interpret-as="interjection">bah humbug</say-as>',
  bam : 'I can say bam	as, <say-as interpret-as="interjection">bam</say-as>',
  bang : 'I can say bang	as, <say-as interpret-as="interjection">bang</say-as>',
  batter : 'I can say batter up	as, <say-as interpret-as="interjection">batter up</say-as>',
  bazinga : 'I can say bazinga	as, <say-as interpret-as="interjection">bazinga</say-as>',
  beep : 'I can say beep beep	as, <say-as interpret-as="interjection">beep beep</say-as>',
  behold : 'I can say behold	as, <say-as interpret-as="interjection">behold</say-as>',
  bing : 'I can say bing	as, <say-as interpret-as="interjection">bing</say-as>',
  bingo : 'I can say bingo	as, <say-as interpret-as="interjection">bingo</say-as>',
  blah : 'I can say blah	as, <say-as interpret-as="interjection">blah</say-as>',
  blarg : 'I can say blarg	as, <say-as interpret-as="interjection">blarg</say-as>',
  blast : 'I can say blast	as, <say-as interpret-as="interjection">blast</say-as>',
  blimey : 'I can say blimey	as, <say-as interpret-as="interjection">blimey</say-as>',
  boing : 'I can say boing	as, <say-as interpret-as="interjection">boing</say-as>',
  bon : 'I can say bon appetit	as, <say-as interpret-as="interjection">bon appetit</say-as>',
  bon : 'I can say bon voyage	as, <say-as interpret-as="interjection">bon voyage</say-as>',
  bonjour : 'I can say bonjour	as, <say-as interpret-as="interjection">bonjour</say-as>',
  boo : 'I can say boo	as, <say-as interpret-as="interjection">boo</say-as>',
  boo : 'I can say boo hoo	as, <say-as interpret-as="interjection">boo hoo</say-as>',
  boom : 'I can say boom	as, <say-as interpret-as="interjection">boom</say-as>',
  booya : 'I can say booya	as, <say-as interpret-as="interjection">booya</say-as>',
  bravo : 'I can say bravo	as, <say-as interpret-as="interjection">bravo</say-as>',
  brrr : 'I can say brrr	as, <say-as interpret-as="interjection">brrr</say-as>',
  buh : 'I can say buh bye	as, <say-as interpret-as="interjection">buh bye</say-as>',
  bummer : 'I can say bummer	as, <say-as interpret-as="interjection">bummer</say-as>',
  caw : 'I can say caw	as, <say-as interpret-as="interjection">caw</say-as>',
  cha : 'I can say cha ching	as, <say-as interpret-as="interjection">cha ching</say-as>',
  checkmate : 'I can say checkmate	as, <say-as interpret-as="interjection">checkmate</say-as>',
  cheer : 'I can say cheer up	as, <say-as interpret-as="interjection">cheer up</say-as>',
  cheerio : 'I can say cheerio	as, <say-as interpret-as="interjection">cheerio</say-as>',
  cheers : 'I can say cheers	as, <say-as interpret-as="interjection">cheers</say-as>',
  chirp : 'I can say chirp	as, <say-as interpret-as="interjection">chirp</say-as>',
  choo : 'I can say choo choo	as, <say-as interpret-as="interjection">choo choo</say-as>',
  clank : 'I can say clank	as, <say-as interpret-as="interjection">clank</say-as>',
  click : 'I can say click clack	as, <say-as interpret-as="interjection">click clack</say-as>',
  cock : 'I can say cock a doodle doo	as, <say-as interpret-as="interjection">cock a doodle doo</say-as>',
  coo : 'I can say coo	as, <say-as interpret-as="interjection">coo</say-as>',
  cowabunga : 'I can say cowabunga	as, <say-as interpret-as="interjection">cowabunga</say-as>',
  d : 'I can say d\'oh	as, <say-as interpret-as="interjection">d\'oh</say-as>',
  dang : 'I can say dang	as, <say-as interpret-as="interjection">dang</say-as>',
  darn : 'I can say darn	as, <say-as interpret-as="interjection">darn</say-as>',
  ding : 'I can say ding	as, <say-as interpret-as="interjection">ding</say-as>',
  ding : 'I can say ding ding ding	as, <say-as interpret-as="interjection">ding ding ding</say-as>',
  ding : 'I can say ding dong	as, <say-as interpret-as="interjection">ding dong</say-as>',
  ditto : 'I can say ditto	as, <say-as interpret-as="interjection">ditto</say-as>',
  dot : 'I can say dot dot dot	as, <say-as interpret-as="interjection">dot dot dot</say-as>',
  drat : 'I can say drat	as, <say-as interpret-as="interjection">drat</say-as>',
  dude : 'I can say dude	as, <say-as interpret-as="interjection">dude</say-as>',
  duh : 'I can say duh	as, <say-as interpret-as="interjection">duh</say-as>',
  dum : 'I can say dum	as, <say-as interpret-as="interjection">dum</say-as>',
  dun : 'I can say dun dun dun	as, <say-as interpret-as="interjection">dun dun dun</say-as>',
  dynomite : 'I can say dynomite	as, <say-as interpret-as="interjection">dynomite</say-as>',
  eek : 'I can say eek	as, <say-as interpret-as="interjection">eek</say-as>',
  eep : 'I can say eep	as, <say-as interpret-as="interjection">eep</say-as>',
  eggselent : 'I can say eggselent	as, <say-as interpret-as="interjection">eggselent</say-as>',
  eh : 'I can say eh?	as, <say-as interpret-as="interjection">eh?</say-as>',
  ehn : 'I can say ehn	as, <say-as interpret-as="interjection">ehn</say-as>',
  en : 'I can say en gard	as, <say-as interpret-as="interjection">en gard</say-as>',
  encore : 'I can say encore	as, <say-as interpret-as="interjection">encore</say-as>',
  er : 'I can say er	as, <say-as interpret-as="interjection">er</say-as>',
  eureka : 'I can say eureka	as, <say-as interpret-as="interjection">eureka</say-as>',
  excellent : 'I can say excellent	as, <say-as interpret-as="interjection">excellent</say-as>',
  fancy : 'I can say fancy that	as, <say-as interpret-as="interjection">fancy that</say-as>',
  fiddlesticks : 'I can say fiddlesticks	as, <say-as interpret-as="interjection">fiddlesticks</say-as>',
  gadzooks : 'I can say gadzooks	as, <say-as interpret-as="interjection">gadzooks</say-as>',
  gee : 'I can say gee	as, <say-as interpret-as="interjection">gee</say-as>',
  gee : 'I can say gee whiz	as, <say-as interpret-as="interjection">gee whiz</say-as>',
  gee : 'I can say gee willikers	as, <say-as interpret-as="interjection">gee willikers</say-as>',
  geronimo : 'I can say geronimo	as, <say-as interpret-as="interjection">geronimo</say-as>',
  giddy : 'I can say giddy up	as, <say-as interpret-as="interjection">giddy up</say-as>',
  giddyap : 'I can say giddyap	as, <say-as interpret-as="interjection">giddyap</say-as>',
  golly : 'I can say golly	as, <say-as interpret-as="interjection">golly</say-as>',
  good : 'I can say good	as, <say-as interpret-as="interjection">good</say-as>',
  good : 'I can say good afternoon	as, <say-as interpret-as="interjection">good afternoon</say-as>',
  good : 'I can say good call	as, <say-as interpret-as="interjection">good call</say-as>',
  good : 'I can say good evening	as, <say-as interpret-as="interjection">good evening</say-as>',
  good : 'I can say good grief	as, <say-as interpret-as="interjection">good grief</say-as>',
  good : 'I can say good luck	as, <say-as interpret-as="interjection">good luck</say-as>',
  good : 'I can say good morning	as, <say-as interpret-as="interjection">good morning</say-as>',
  good : 'I can say good night	as, <say-as interpret-as="interjection">good night</say-as>',
  good : 'I can say good riddance	as, <say-as interpret-as="interjection">good riddance</say-as>',
  goodbye : 'I can say goodbye	as, <say-as interpret-as="interjection">goodbye</say-as>',
  gosh : 'I can say gosh	as, <say-as interpret-as="interjection">gosh</say-as>',
  gotcha : 'I can say gotcha	as, <say-as interpret-as="interjection">gotcha</say-as>',
  gracious : 'I can say gracious me	as, <say-as interpret-as="interjection">gracious me</say-as>',
  great : 'I can say great	as, <say-as interpret-as="interjection">great</say-as>',
  great : 'I can say great scott	as, <say-as interpret-as="interjection">great scott</say-as>',
  guess : 'I can say guess what	as, <say-as interpret-as="interjection">guess what</say-as>',
  ha : 'I can say ha	as, <say-as interpret-as="interjection">ha</say-as>',
  ha : 'I can say ha ha	as, <say-as interpret-as="interjection">ha ha</say-as>',
  hardy : 'I can say hardy har har	as, <say-as interpret-as="interjection">hardy har har</say-as>',
  he : 'I can say he shoots he scores	as, <say-as interpret-as="interjection">he shoots he scores</say-as>',
  heads : 'I can say heads up	as, <say-as interpret-as="interjection">heads up</say-as>',
  hear : 'I can say hear hear	as, <say-as interpret-as="interjection">hear hear</say-as>',
  heave : 'I can say heave ho	as, <say-as interpret-as="interjection">heave ho</say-as>',
  hee : 'I can say hee-yah	as, <say-as interpret-as="interjection">hee-yah</say-as>',
  hey : 'I can say hey now	as, <say-as interpret-as="interjection">hey now</say-as>',
  hi : 'I can say hi-yah	as, <say-as interpret-as="interjection">hi-yah</say-as>',
  high : 'I can say high five	as, <say-as interpret-as="interjection">high five</say-as>',
  hike : 'I can say hike	as, <say-as interpret-as="interjection">hike</say-as>',
  hip : 'I can say hip hip hooray	as, <say-as interpret-as="interjection">hip hip hooray</say-as>',
  hiss : 'I can say hiss	as, <say-as interpret-as="interjection">hiss</say-as>',
  hiya : 'I can say hiya	as, <say-as interpret-as="interjection">hiya</say-as>',
  hmm : 'I can say hmm	as, <say-as interpret-as="interjection">hmm</say-as>',
  holy : 'I can say holy smoke	as, <say-as interpret-as="interjection">holy smoke</say-as>',
  honk : 'I can say honk	as, <say-as interpret-as="interjection">honk</say-as>',
  howdy : 'I can say howdy	as, <say-as interpret-as="interjection">howdy</say-as>',
  huh : 'I can say huh	as, <say-as interpret-as="interjection">huh</say-as>',
  hurrah : 'I can say hurrah	as, <say-as interpret-as="interjection">hurrah</say-as>',
  hurray : 'I can say hurray	as, <say-as interpret-as="interjection">hurray</say-as>',
  huzzah : 'I can say huzzah	as, <say-as interpret-as="interjection">huzzah</say-as>',
  i : 'I can say i\'m totally kidding	as, <say-as interpret-as="interjection">i\'m totally kidding</say-as>',
  inconceivable : 'I can say inconceivable	as, <say-as interpret-as="interjection">inconceivable</say-as>',
  indeed : 'I can say indeed	as, <say-as interpret-as="interjection">indeed</say-as>',
  interesting : 'I can say interesting	as, <say-as interpret-as="interjection">interesting</say-as>',
  jeepers : 'I can say jeepers creepers	as, <say-as interpret-as="interjection">jeepers creepers</say-as>',
  jeez : 'I can say jeez	as, <say-as interpret-as="interjection">jeez</say-as>',
  jeez : 'I can say jeez louise	as, <say-as interpret-as="interjection">jeez louise</say-as>',
  jiminy : 'I can say jiminy cricket	as, <say-as interpret-as="interjection">jiminy cricket</say-as>',
  jinx : 'I can say jinx	as, <say-as interpret-as="interjection">jinx</say-as>',
  just : 'I can say just joshin\'	as, <say-as interpret-as="interjection">just joshin\'</say-as>',
  just : 'I can say just kidding	as, <say-as interpret-as="interjection">just kidding</say-as>',
  kablam : 'I can say kablam	as, <say-as interpret-as="interjection">kablam</say-as>',
  kaboom : 'I can say kaboom	as, <say-as interpret-as="interjection">kaboom</say-as>',
  kaching : 'I can say kaching	as, <say-as interpret-as="interjection">kaching</say-as>',
  kapow : 'I can say kapow	as, <say-as interpret-as="interjection">kapow</say-as>',
  katchow : 'I can say katchow	as, <say-as interpret-as="interjection">katchow</say-as>',
  kazaam : 'I can say kazaam	as, <say-as interpret-as="interjection">kazaam</say-as>',
  kerbam : 'I can say kerbam	as, <say-as interpret-as="interjection">kerbam</say-as>',
  kerboom : 'I can say kerboom	as, <say-as interpret-as="interjection">kerboom</say-as>',
  kerching : 'I can say kerching	as, <say-as interpret-as="interjection">kerching</say-as>',
  kerchoo : 'I can say kerchoo	as, <say-as interpret-as="interjection">kerchoo</say-as>',
  kerflop : 'I can say kerflop	as, <say-as interpret-as="interjection">kerflop</say-as>',
  kerplop : 'I can say kerplop	as, <say-as interpret-as="interjection">kerplop</say-as>',
  kerplunk : 'I can say kerplunk	as, <say-as interpret-as="interjection">kerplunk</say-as>',
  kerpow : 'I can say kerpow	as, <say-as interpret-as="interjection">kerpow</say-as>',
  kersplat : 'I can say kersplat	as, <say-as interpret-as="interjection">kersplat</say-as>',
  kerthump : 'I can say kerthump	as, <say-as interpret-as="interjection">kerthump</say-as>',
  kidding : 'I can say kidding	as, <say-as interpret-as="interjection">kidding</say-as>',
  knock : 'I can say knock knock	as, <say-as interpret-as="interjection">knock knock</say-as>',
  le : 'I can say le sigh	as, <say-as interpret-as="interjection">le sigh</say-as>',
  legendary : 'I can say legendary	as, <say-as interpret-as="interjection">legendary</say-as>',
  look : 'I can say look out	as, <say-as interpret-as="interjection">look out</say-as>',
  magnificent : 'I can say magnificent	as, <say-as interpret-as="interjection">magnificent</say-as>',
  mamma : 'I can say mamma mia	as, <say-as interpret-as="interjection">mamma mia</say-as>',
  man : 'I can say man overboard	as, <say-as interpret-as="interjection">man overboard</say-as>',
  mazel : 'I can say mazel tov	as, <say-as interpret-as="interjection">mazel tov</say-as>',
  meow : 'I can say meow	as, <say-as interpret-as="interjection">meow</say-as>',
  merci : 'I can say merci	as, <say-as interpret-as="interjection">merci</say-as>',
  mm : 'I can say mm hmm	as, <say-as interpret-as="interjection">mm hmm</say-as>',
  moo : 'I can say moo	as, <say-as interpret-as="interjection">moo</say-as>',
  my : 'I can say my bad	as, <say-as interpret-as="interjection">my bad</say-as>',
  my : 'I can say my goodness	as, <say-as interpret-as="interjection">my goodness</say-as>',
  nanu : 'I can say nanu nanu	as, <say-as interpret-as="interjection">nanu nanu</say-as>',
  neener : 'I can say neener neener	as, <say-as interpret-as="interjection">neener neener</say-as>',
  never : 'I can say never	as, <say-as interpret-as="interjection">never</say-as>',
  no : 'I can say no	as, <say-as interpret-as="interjection">no</say-as>',
  no : 'I can say no way	as, <say-as interpret-as="interjection">no way</say-as>',
  now : 'I can say now now	as, <say-as interpret-as="interjection">now now</say-as>',
  nuh : 'I can say nuh uh	as, <say-as interpret-as="interjection">nuh uh</say-as>',
  oh : 'I can say oh	as, <say-as interpret-as="interjection">oh</say-as>',
  oh : 'I can say oh behave	as, <say-as interpret-as="interjection">oh behave</say-as>',
  oh : 'I can say oh boy	as, <say-as interpret-as="interjection">oh boy</say-as>',
  oh : 'I can say oh brother	as, <say-as interpret-as="interjection">oh brother</say-as>',
  oh : 'I can say oh dear	as, <say-as interpret-as="interjection">oh dear</say-as>',
  oh : 'I can say oh my	as, <say-as interpret-as="interjection">oh my</say-as>',
  oh : 'I can say oh snap	as, <say-as interpret-as="interjection">oh snap</say-as>',
  oh : 'I can say oh well	as, <say-as interpret-as="interjection">oh well</say-as>',
  oink : 'I can say oink	as, <say-as interpret-as="interjection">oink</say-as>',
  okey : 'I can say okey dokey	as, <say-as interpret-as="interjection">okey dokey</say-as>',
  oof : 'I can say oof	as, <say-as interpret-as="interjection">oof</say-as>',
  ooh : 'I can say ooh	as, <say-as interpret-as="interjection">ooh</say-as>',
  ooh : 'I can say ooh la la	as, <say-as interpret-as="interjection">ooh la la</say-as>',
  oops : 'I can say oops	as, <say-as interpret-as="interjection">oops</say-as>',
  open : 'I can say open sesame	as, <say-as interpret-as="interjection">open sesame</say-as>',
  ouch : 'I can say ouch	as, <say-as interpret-as="interjection">ouch</say-as>',
  ow : 'I can say ow	as, <say-as interpret-as="interjection">ow</say-as>',
  oy : 'I can say oy	as, <say-as interpret-as="interjection">oy</say-as>',
  pew : 'I can say pew pew	as, <say-as interpret-as="interjection">pew pew</say-as>',
  phew : 'I can say phew	as, <say-as interpret-as="interjection">phew</say-as>',
  phooey : 'I can say phooey	as, <say-as interpret-as="interjection">phooey</say-as>',
  ping : 'I can say ping	as, <say-as interpret-as="interjection">ping</say-as>',
  play : 'I can say play ball	as, <say-as interpret-as="interjection">play ball</say-as>',
  plop : 'I can say plop	as, <say-as interpret-as="interjection">plop</say-as>',
  poof : 'I can say poof	as, <say-as interpret-as="interjection">poof</say-as>',
  pop : 'I can say pop	as, <say-as interpret-as="interjection">pop</say-as>',
  pow : 'I can say pow	as, <say-as interpret-as="interjection">pow</say-as>',
  puh : 'I can say puh-leeze	as, <say-as interpret-as="interjection">puh-leeze</say-as>',
  quack : 'I can say quack	as, <say-as interpret-as="interjection">quack</say-as>',
  rats : 'I can say rats	as, <say-as interpret-as="interjection">rats</say-as>',
  read : 'I can say read \'em and weep	as, <say-as interpret-as="interjection">read \'em and weep</say-as>',
  really : 'I can say really	as, <say-as interpret-as="interjection">really</say-as>',
  ribbit : 'I can say ribbit	as, <say-as interpret-as="interjection">ribbit</say-as>',
  righto : 'I can say righto	as, <say-as interpret-as="interjection">righto</say-as>',
  roger : 'I can say roger	as, <say-as interpret-as="interjection">roger</say-as>',
  ruh : 'I can say ruh roh	as, <say-as interpret-as="interjection">ruh roh</say-as>',
  schwing : 'I can say schwing	as, <say-as interpret-as="interjection">schwing</say-as>',
  she : 'I can say she shoots she scores	as, <say-as interpret-as="interjection">she shoots she scores</say-as>',
  sheesh : 'I can say sheesh	as, <say-as interpret-as="interjection">sheesh</say-as>',
  shh : 'I can say shh	as, <say-as interpret-as="interjection">shh</say-as>',
  shiver : 'I can say shiver me timbers	as, <say-as interpret-as="interjection">shiver me timbers</say-as>',
  shoot : 'I can say shoot	as, <say-as interpret-as="interjection">shoot</say-as>',
  shucks : 'I can say shucks	as, <say-as interpret-as="interjection">shucks</say-as>',
  shush : 'I can say shush	as, <say-as interpret-as="interjection">shush</say-as>',
  splash : 'I can say splash	as, <say-as interpret-as="interjection">splash</say-as>',
  splendid : 'I can say splendid	as, <say-as interpret-as="interjection">splendid</say-as>',
  spoiler : 'I can say spoiler alert	as, <say-as interpret-as="interjection">spoiler alert</say-as>',
  squee : 'I can say squee	as, <say-as interpret-as="interjection">squee</say-as>',
  stunning : 'I can say stunning	as, <say-as interpret-as="interjection">stunning</say-as>',
  suit : 'I can say suit up	as, <say-as interpret-as="interjection">suit up</say-as>',
  swish : 'I can say swish	as, <say-as interpret-as="interjection">swish</say-as>',
  swoosh : 'I can say swoosh	as, <say-as interpret-as="interjection">swoosh</say-as>',
  ta : 'I can say ta da	as, <say-as interpret-as="interjection">ta da</say-as>',
  ta : 'I can say ta ta	as, <say-as interpret-as="interjection">ta ta</say-as>',
  tee : 'I can say tee hee	as, <say-as interpret-as="interjection">tee hee</say-as>',
  thanks : 'I can say thanks for asking	as, <say-as interpret-as="interjection">thanks for asking</say-as>',
  there : 'I can say there there	as, <say-as interpret-as="interjection">there there</say-as>',
  thump : 'I can say thump	as, <say-as interpret-as="interjection">thump</say-as>',
  tick : 'I can say tick tick tick	as, <say-as interpret-as="interjection">tick tick tick</say-as>',
  tick : 'I can say tick-tock	as, <say-as interpret-as="interjection">tick-tock</say-as>',
  totally : 'I can say totally kidding	as, <say-as interpret-as="interjection">totally kidding</say-as>',
  totally : 'I can say totally kidding of course	as, <say-as interpret-as="interjection">totally kidding of course</say-as>',
  totes : 'I can say totes	as, <say-as interpret-as="interjection">totes</say-as>',
  touche : 'I can say touche	as, <say-as interpret-as="interjection">touche</say-as>',
  tsk : 'I can say tsk tsk	as, <say-as interpret-as="interjection">tsk tsk</say-as>',
  tweet : 'I can say tweet	as, <say-as interpret-as="interjection">tweet</say-as>',
  ugh : 'I can say ugh	as, <say-as interpret-as="interjection">ugh</say-as>',
  uh : 'I can say uh	as, <say-as interpret-as="interjection">uh</say-as>',
  uh : 'I can say uh huh	as, <say-as interpret-as="interjection">uh huh</say-as>',
  uh : 'I can say uh oh	as, <say-as interpret-as="interjection">uh oh</say-as>',
  uh : 'I can say uh uh	as, <say-as interpret-as="interjection">uh uh</say-as>',
  um : 'I can say um	as, <say-as interpret-as="interjection">um</say-as>',
  va : 'I can say va va voom	as, <say-as interpret-as="interjection">va va voom</say-as>',
  very : 'I can say very	as, <say-as interpret-as="interjection">very</say-as>',
  voila : 'I can say voila	as, <say-as interpret-as="interjection">voila</say-as>',
  vroom : 'I can say vroom	as, <say-as interpret-as="interjection">vroom</say-as>',
  wah : 'I can say wah wah	as, <say-as interpret-as="interjection">wah wah</say-as>',
  wahoo : 'I can say wahoo	as, <say-as interpret-as="interjection">wahoo</say-as>',
  watch : 'I can say watch out	as, <say-as interpret-as="interjection">watch out</say-as>',
  way : 'I can say way to go	as, <say-as interpret-as="interjection">way to go</say-as>',
  well : 'I can say well	as, <say-as interpret-as="interjection">well</say-as>',
  well : 'I can say well done	as, <say-as interpret-as="interjection">well done</say-as>',
  well : 'I can say well well	as, <say-as interpret-as="interjection">well well</say-as>',
  wham : 'I can say wham	as, <say-as interpret-as="interjection">wham</say-as>',
  whammo : 'I can say whammo	as, <say-as interpret-as="interjection">whammo</say-as>',
  whee : 'I can say whee	as, <say-as interpret-as="interjection">whee</say-as>',
  whew : 'I can say whew	as, <say-as interpret-as="interjection">whew</say-as>',
  whoa : 'I can say whoa	as, <say-as interpret-as="interjection">whoa</say-as>',
  whoo : 'I can say whoo ah	as, <say-as interpret-as="interjection">whoo ah</say-as>',
  whoops : 'I can say whoops	as, <say-as interpret-as="interjection">whoops</say-as>',
  whoops : 'I can say whoops a daisy	as, <say-as interpret-as="interjection">whoops a daisy</say-as>',
  whoosh : 'I can say whoosh	as, <say-as interpret-as="interjection">whoosh</say-as>',
  woo : 'I can say woo	as, <say-as interpret-as="interjection">woo</say-as>',
  woo : 'I can say woo hoo	as, <say-as interpret-as="interjection">woo hoo</say-as>',
  woof : 'I can say woof	as, <say-as interpret-as="interjection">woof</say-as>',
  wow : 'I can say wow	as, <say-as interpret-as="interjection">wow</say-as>',
  wowza : 'I can say wowza	as, <say-as interpret-as="interjection">wowza</say-as>',
  wowzer : 'I can say wowzer	as, <say-as interpret-as="interjection">wowzer</say-as>',
  yabba : 'I can say yabba dabba doo	as, <say-as interpret-as="interjection">yabba dabba doo</say-as>',
  yadda : 'I can say yadda yadda yadda	as, <say-as interpret-as="interjection">yadda yadda yadda</say-as>',
  yahoo : 'I can say yahoo	as, <say-as interpret-as="interjection">yahoo</say-as>',
  yay : 'I can say yay	as, <say-as interpret-as="interjection">yay</say-as>',
  yeah : 'I can say yeah	as, <say-as interpret-as="interjection">yeah</say-as>',
  yeehaw : 'I can say yeehaw	as, <say-as interpret-as="interjection">yeehaw</say-as>',
  yes : 'I can say yes	as, <say-as interpret-as="interjection">yes</say-as>',
  yikes : 'I can say yikes	as, <say-as interpret-as="interjection">yikes</say-as>',
  yippee : 'I can say yippee	as, <say-as interpret-as="interjection">yippee</say-as>',
  yo : 'I can say yo	as, <say-as interpret-as="interjection">yo</say-as>',
  yoink : 'I can say yoink	as, <say-as interpret-as="interjection">yoink</say-as>',
  yoo : 'I can say yoo hoo	as, <say-as interpret-as="interjection">yoo hoo</say-as>',
  you : 'I can say you bet	as, <say-as interpret-as="interjection">you bet</say-as>',
  you : 'I can say you go girl	as, <say-as interpret-as="interjection">you go girl</say-as>',
  you : 'I can say you rang?	as, <say-as interpret-as="interjection">you rang?</say-as>',
  yowza : 'I can say yowza	as, <say-as interpret-as="interjection">yowza</say-as>',
  yowzer : 'I can say yowzer	as, <say-as interpret-as="interjection">yowzer</say-as>',
  yuck : 'I can say yuck	as, <say-as interpret-as="interjection">yuck</say-as>',
  yum : 'I can say yum	as, <say-as interpret-as="interjection">yum</say-as>',
  zap : 'I can say zap	as, <say-as interpret-as="interjection">zap</say-as>',
  zing : 'I can say zing	as, <say-as interpret-as="interjection">zing</say-as>',
  zoinks : 'I can say zoinks	as, <say-as interpret-as="interjection">zoinks</say-as>',
  zoom : 'I can say zoom	as, <say-as interpret-as="interjection">zoom</say-as>',
  zowie : 'I can say zowie	as, <say-as interpret-as="interjection">zowie</say-as>'
};

/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

//var launch = 'I put on my robe and wizard hat.<audio src="soundbank://soundlibrary/magic_spells/magic_spells_10"/>';
var launch = 'placeholder.'

var intro = function()
{
    var voice_open  = '<voice name = "Ivy">';
    var voice_close = '</voice>';
    
    var I_grew_up = 'My name is Ivy. I grew up on the edge of the forest.';
    var chirp     = '<audio src="soundbank://soundlibrary/animals/amzn_sfx_bird_forest_short_01"/>';
    var joanna    = 'My parents are, Joe the blacksmith <voice name="Joanna">Joanna. Call me Joanna.</voice>';
    var salli     = 'and Salli, the, uh... <voice name="Salli">Watchyerself, I don\'t need them knowin my name!</voice>';
    var neener    = '. <say-as interpret-as="interjection">neener neener</say-as>';
    var anywho    = '. <say-as interpret-as="interjection">anywho</say-as>';
    // intro_Justin
    // interjections.ahem


    
    //var utterance = voice_open + I_grew_up + chirp + joanna + salli + neener + anywho + intro_Justin + interjections.ahem + voice_close;
    //var utterance = voice_open + intro_Ivy + intro_Joanna + intro_Kendra + intro_Kimberly + intro_Salli + intro_Joey + intro_Justin + intro_Kevin + intro_Matthew + voice_close;
    
    var utterance = 
        voice_open +
        intro_Ivy +
        voice_close;
        
    return utterance;
}

const handle_foo =
{
  canHandle(handlerInput) { return Alexa.getRequestType(handlerInput.requestEnvelope) == 'foo'; },
  
  handle(handlerInput)
  {
    const speakOutput = 'TEMPLATE';
    
    return handlerInput.responseBuilder
                       .speak(speakOutput)
                       .reprompt(speakOutput)
                       .getResponse();
  }
};

const handle_admin_console =
{
  canHandle(handlerInput) { return Alexa.getRequestType(handlerInput.requestEnvelope) == 'admin_console'; },
  
  handle(handlerInput)
  {
    const speakOutput = '<audio src="soundbank://soundlibrary/computers/beeps_tones/beeps_tones_09"/>';
    
    return handlerInput.responseBuilder
                       .speak(speakOutput)
                       .reprompt(speakOutput)
                       .getResponse();
  }
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
          const speakOutput  = launch + intro();

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const handler_look = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'look';
    },
    handle(handlerInput) {
          const speakOutput  = 'You look around.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }}

const handler_listen = {    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'listen';
    },
    handle(handlerInput) {
          const speakOutput  = 'You listen carefully.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        handler_admin_console,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();