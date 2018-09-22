/**
 * character.template.js
 *
 * Prototype character template for gamemaster.
 *
 * v0.1.0
 */

// going to set this up as an instantiatable object
// also, note this is being done in a rush, while prepping
// for a TOEE session; although I've spent a decent amount
// of time researching and taking notes on how I would go
// about this, I'm not carefully sculpting this version in
// any way - it will need that to be done.

var Character = function(parameters)
{

  this.version   = '0.1.0.20180421'
  this.uuid      = UUIDv4();

  this.abilities =
  {
    'Strength'      : undefined,
    'Intelligence'  : undefined,
    'Wisdom'        : undefined,
    'Dexterity'     : undefined,
    'Constitution'  : undefined,
    'Charisma'      : undefined
  }
  
  this.race                 = undefined;
  this.sex                  = undefined;
  this.classes              = {};
  this.alignment            = undefined;
  this.hitpoints            = undefined;
  this.background           = undefined;
  this.languages            = {};
  this.possessions          = {};
  this.relationships        = {};
  this.name                 = undefined;
  this.weapon_proficiencies = {};
  this.height               = undefined;
  this.weight               = undefined;
  this.age                  = undefined;

};

// if it were to have a parent object, that would happen here
// also the parent would be called in the constructor

// basic export function to allow serialization for import/export whatever
Character.prototype.export = function()
{
  // note this implementation leaves undefined stuff out, so that's a bit messy?
  console.log(JSON.stringify(this));
};

Character.prototype.foo = function(parameters)
{
  // do nothing, sample function
};