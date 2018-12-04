/**
 * draft-tables.2.js
 *
 * Yet another table design, based on a bunch of notes in the back of that composition book.
 *
 * For the record, the current progression as I understand it is:
 *  - The stuff in gamemaster-game-adnd1e.js
 *  - draft-tables
 *  - draft-tables.2 (this file)
 *
 * There was probably something that came before the gamemaster version (dndtools?), and I 
 * feel like there may have been a half-step after it as well, but they are not currently 
 * in this repo so I'm not worried about them at the moment.
 *
 * 2018-12-03
 */

{ /* Classes */
 
  { // Bulwark

    // My pride and joy here; copied from the charlotte file here in gamemaster, it's my
    // all-purpose messenger. I feel like I'm going to be using this a lot.
   
    // Uh-oh. I was doing something weird in the constructor here that kind of breaks
    // JavaScript inheritance. I wouldn't care so much but I kind of need to inherit
    // from Bulwark itself. So I guess I'll modify it...the JSON spec won't change,
    // just this implementation in JS. And the comments will be a little out of date.

    // Baseline JSON-serializable object template, v0.1
    
    // Usage:
    // var foo = new Bulwark();
    // var json = JSON.stringify(foo);
    
    var Bulwark = function()
    {    
      this.meta         = {};
      this.meta.format  = 'bulwark';
      this.meta.version = 0.1;
      this.meta.result  = 1
      // bulwark["meta"]["message"] = "This is why result is 0, optional if result is 1.";
      // bulwark["meta"]["about"]   = "Other optional fields can be added here.";
      this.data = [];
      
      // NOTE: The specification for bulwark requires each object within the data array to have
      // a "type" member with a string value to be used as a domain-unique identifier for the 
      // payload type, and an "object" member with either an object or an array value, 
      // containing the payload. For example:
      
      /*
      var info =
        {
          "type"     : "foo",
          "object"   : {} // or []
        };
      
      bulwark["data"].push(info);
      */
    }
  }

  // Ok, for starters I wanted to have a few parent classes in place to inherit from. Even
  // if they don't do anything right now, it makes it easier to make sweeping changes later.
    
  { // Parameters

    Parameters = function(parameters)
    {
      // placeholder Parameters parent class
      Bulwark.call(this, parameters);
      
      this.data.push({type:'parameters',object:parameters});
    };

    Parameters.prototype = Object.create(Bulwark.prototype);
    
    Parameters.prototype.toString = function(){return "I am a Parameters.";};

  }

  { // GamemasterFunction

    GamemasterFunction = function(parameters)
    {
      // placeholder function parent class
      this.parameters = parameters;
    };

    GamemasterFunction.prototype.toString = function(){return "I am a GamemasterFunction."};

  }

  { // Map

    Map = function(parameters)
    {
      // placeholder Map class
      GamemasterFunction.call(this, parameters);
    };

    Map.prototype = Object.create(GamemasterFunction.prototype);

    Map.prototype.toString = function(){return "I am a Map."};

  }

  { // Table

    Table = function(parameters)
    {
      // placeholder Table class
      GamemasterFunction.call(this, parameters);
    };

    Table.prototype = Object.create(GamemasterFunction.prototype);

    Table.prototype.toString = function(){return "I am a Table."};

  }

  { // Option

    Option = function(parameters)
    {
      // placeholder Option class
      GamemasterFunction.call(this, parameters);
    };

    Option.prototype = Object.create(GamemasterFunction.prototype);

    Option.prototype.toString = function(){return "I am an Option."};

  }

}

//

var test = function()
{ 
  console.log(gmf.toString());
  console.log(map.toString());
  console.log(tab.toString());
  console.log(opt.toString());
};

// init

var parameters = new Parameters({ foo : 0 });
  
var gmf = new GamemasterFunction(parameters);
var map = new Map(parameters);
var tab = new Table(parameters);
var opt = new Option(parameters);

// 20181203 STATUS
// These all seem to work; they don't do much other than create a Parameters
// instance which derives from Bulwark, but that's pretty much all I needed
// to get started anyway.
//
// Next I guess is to create the random dungeon generation object and start
// creating the table classes in there. Oh. And then work on the Option and
// Table parent classes, I suppose. Don't forget the initialize concept.