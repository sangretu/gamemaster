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


var Entity = function(parameters) {};

var PassageSegment = function(parameters)
{
  Entity.call(this, parameters);
  
  // TODO: What does this need to know?
  //
  // width
  // length
  // direction
  // path
  // features
  // contents
  //
  // TODO: What defaults should it use?
  //
  // width 10'
  // length 30'
  // direction north
  // curves none
  // features none
  // contents none
  // 
  // TODO: And for mapping?
  //
  // location
  // orientation
  
  // TODO: not sure how I want these values represented
  
  // TODO: support intersections
  
  var  args       =  parameters      ||  {};
  this.width      =  args.width      ||  10;
  this.length     =  args.length     ||  30;
  this.direction  =  args.direction  ||  'north';
  this.path       =  args.path       ||  {};
  this.features   =  args.features   ||  {};
  this.contents   =  args.contents   ||  {};
};

PassageSegment.prototype = Object.create(Entity.prototype);

PassageSegment.prototype.toString = function() { return '[PassageSegment] (placeholder)'; };

var Door = function(parameters)
{
  Entity.call(this, parameters);
};

Door.prototype = Object.create(Entity.prototype);

Door.prototype.toString = function() { return '[Door] (placeholder)'; };

var Chamber = function(parameters)
{
  Entity.call(this, parameters);
};

Chamber.prototype = Object.create(Entity.prototype);

Chamber.prototype.toString = function() { return '[Chamber] (placeholder)'; };

var Room = function(parameters)
{
  Entity.call(this, parameters);
};

Room.prototype = Object.create(Entity.prototype);

Room.prototype.toString = function() { return '[Room] (placeholder)'; };

var Stairs = function(parameters)
{
  Entity.call(this, parameters);
};

Stairs.prototype = Object.create(Entity.prototype);

Stairs.prototype.toString = function() { return '[Stairs] (placeholder)'; };
