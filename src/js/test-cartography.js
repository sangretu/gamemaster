/**
 * test-cartography.js
 *
 * Mostly placeholder stuff for a future mapping effort; need to establish some
 * kind of basic interface and be able to generate roughly defined objects for
 * manipulation by random dungeon generator activities.
 *
 * 2018-12-14
 */

// I don't think inheritance is the answer here. It might be tempting to have
// a Mappable class, but most objects that would fall into that category would
// similarly fall into others as well. Perhaps design an object that could be
// a member of anything mappable instead? Should it just be Cartography?

var Cartography = function(parameters)
{
};

/* Some mapping terms that might be useful:
// coordinates
// ellipsoid
// grid
// hachure (lines to represent slopes)
// landmark
// planimetric map (along a single plane)
// planimetry (details with no relief or contour)
// map series
// orientation
// origin of coordinates
// neatline (edge of map)
// overedge
// overprint (added data about important stuff)
// quadrangle
// scale
// representational fraction (scale unit)
// survey
// traverse
// legend
// signature (icon or representation)
*/

// Some stuff that will need to be moved out of this file eventually.

// TODO: Idea - Material class, with condition values and maybe descriptor
// guidelines or mods to interactions (rotten oak, etc). Probably support
// multiple conditions as it could be wet and damaged, but how to know
// when to replace or add a new one? Maybe refer to the adjective order
// thing for categories of conditions? There are multiple versions of it,
// first glance suggests some variant of a combination of these two?
//
// https://www.dailywritingtips.com/the-royal-order-of-adjectives/
// https://www.gingersoftware.com/content/grammar-rules/adjectives/order-of-adjectives/

{ // Geometry2d

// Need this for some of the mapping calculations. Copying some from charlotte,
// adding more as needed.

// TODO: Point.distance is apparently wrong in charlotte. Oops?

  { // Point
  
    var Point = function(x, y)
    {
      this.x = x || 0;
      this.y = y || 0;
    }
    
    // Had to fix this, charlotte version uses wrong formula
    
    Point.prototype.distance = function(p)
    {
      // Distance formula:
      // D = sqrt( (x2 - x1)^2 + (y2 - y1)^2 )
      var d = Math.sqrt( Math.pow((this.x - p.x), 2) + Math.pow((this.y - p.y), 2) );
      return d;
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
    
    Vector.fromPoints = function(p1, p2)
    {
      var x = p2.x - p1.x;
      var y = p2.y - p1.y;
      
      return new Vector(x, y);
    };
    
    Vector.fromLine = function(line)
    {
      return Vector.fromPoints(line.p1, line.p2);
    };
  
  }
  
  { // Arc
  
    // This one is new, doesn't appear in charlotte (as of this writing)
    
    // Defining this as the portion of a circle with given origin that passes
    // CLOCKWISE from p1 to p2.
    
    // TODO: This should maybe subclass Line?
  
    var Arc = function(p1, p2, origin)
    {
      this.p1     = p1 || new Point();
      this.p2     = p2 || new Point();
      this.origin = origin || new Point();
    }
  }
  
  { // PathSegment
  
    // Another new one; a path segment is a line (or arc?) with width values
    // at each endpoint.
    
    var PathSegment = function(line, width1, width2)
    {
      this.line   = line;
      this.width1 = width1;
      this.width2 = width2;
    };
  
  }
  
  { // Path
  
    // Another new one; defining a path as a set of lines and arcs with width
    // values at each endpoint.
    
    var Path = function(segments)
    {
      this.segments = segments;
    }
    
    // A path outline is a set of lines which represent its borders.
    // TODO: Some handling of intersections would be useful.
    Path.prototype.outline = function()
    {
      var lines = [];
      
      // TODO: This makes no attempt to create a continuous outline right
      
      for (var i in this.segments)
      {
        var segment = this.segments[i];
        
        // TODO: This makes some assumptions about the direction of each
        // line, which are not necessarily true.
        
        var yBottom = segment.line.p1.y;
        var yTop    = segment.line.p2.y;
        
        var cornerBottomLeft  = new Point(segment.line.p1.x - (segment.width1 / 2), yBottom);
        var cornerBottomRight = new Point(segment.line.p1.x + (segment.width1 / 2), yBottom);
        var cornerTopLeft     = new Point(segment.line.p2.x - (segment.width2 / 2), yTop   );
        var cornerTopRight    = new Point(segment.line.p2.x + (segment.width2 / 2), yTop   );
        
        lines.push( new Line( cornerBottomLeft  , cornerTopLeft     ) );
        lines.push( new Line( cornerTopLeft     , cornerTopRight    ) );
        lines.push( new Line( cornerTopRight    , cornerBottomRight ) );
        lines.push( new Line( cornerBottomRight , cornerBottomLeft  ) );
      };
      
      return lines;
    }
  }
}

{ // SVG

  // First attempt at a basic SVG library for creating shapes
  
  var svgDraw =
  {
    svgns : 'http://www.w3.org/2000/svg',
    
    SVG : function()
    {
      return document.createElementNS(svgDraw.svgns, 'svg');
    },
    
    Line : function(line2d, color)
    {
      var line = document.createElementNS(svgDraw.svgns, 'line');
      line.setAttribute('x1', line2d.p1.x);
      line.setAttribute('x2', line2d.p2.x);
      line.setAttribute('y1', line2d.p1.y);
      line.setAttribute('y2', line2d.p2.y);
      line.setAttribute('stroke', color || 'white');
      
      return line;
    }
    
  }

}

{ // Entities ... things that exist in a dungeon?

  var Entity = function(parameters) {};

  { // PassageSegment

    var PassageSegment = function(parameters)
    {
      Entity.call(this, parameters);
      
      // TODO: not sure how I want these values represented
      
      // TODO: support intersections
      
      var  args       =  parameters      ||  {};
      this.width      =  args.width      ||  10;
      this.length     =  args.length     ||  30;
      this.direction  =  args.direction  ||  'north';
      this.path       =  args.path       ||  {};
      this.features   =  args.features   ||  {};
      this.contents   =  args.contents   ||  {};
      
      // NOTE: I guess a passage could be represented in data as a set of points
      // with connections between them and width values for each endpoint; width
      // would scale (smoothly or by algorithm) as each line segment is traversed
      // from one value to the other. Intersections could be points with multiple
      // lines connected, and dead-ends would be a point with only one line.
      //
      // On a map local to the object, the first point would be at the origin,
      // and it could proceed along the Y axis. A basic passageway would just be
      // two points, with one line connecting them and the same width for both
      // endpoints.
      //
      // Assume the Y axis represents a continuation along the same direction as
      // the connecting line segment of the previous PassageSegment, or 
      // perpendicular to a connecting door, or along the normal of an imaginary
      // line between both edges of a connected opening (e.g., chamber exit).
      
      // TODO: And for mapping?
      //
      // location
      // orientation
    };

    PassageSegment.prototype = Object.create(Entity.prototype);
    
    PassageSegment.prototype.svg = function()
    {
      // TODO: tweaking point locations to hack around relative translation
      var p1   = new Point(0,0);
      var p2   = new Point(0,this.length);
      var line = new Line(p1, p2);
      
      //var svgLine = new svgDraw.Line(line);
      
      var pathSegment = new PathSegment(line, this.width, this.width);
      var path        = new Path([pathSegment]);
      var outline     = path.outline();
      
      var svg = new svgDraw.SVG();
      
      // TODO: need some way to handle this properly.
      // This is a weird hack
      svg.setAttribute('viewBox', '-10, 0, 200, 200');
      
      for (var i in outline)
      {
        var line = outline[i];
        svg.appendChild(new svgDraw.Line(line));
      }
      
      return svg;
    };

    PassageSegment.prototype.toString = function() { return '[PassageSegment] (placeholder)'; };

  }

  { // Door

    var Door = function(parameters)
    {
      Entity.call(this, parameters);
    };

    Door.prototype = Object.create(Entity.prototype);

    Door.prototype.toString = function() { return '[Door] (placeholder)'; };

  }

  { // Chamber

    var Chamber = function(parameters)
    {
      Entity.call(this, parameters);
    };

    Chamber.prototype = Object.create(Entity.prototype);

    Chamber.prototype.toString = function() { return '[Chamber] (placeholder)'; };

  }

  { // Room

    var Room = function(parameters)
    {
      Entity.call(this, parameters);
    };

    Room.prototype = Object.create(Entity.prototype);

    Room.prototype.toString = function() { return '[Room] (placeholder)'; };

  }

  { // Stairs

    var Stairs = function(parameters)
    {
      Entity.call(this, parameters);
    };

    Stairs.prototype = Object.create(Entity.prototype);

    Stairs.prototype.toString = function() { return '[Stairs] (placeholder)'; };

  }

}