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

  { // Bastion
  
    // Bastion is a container for my Bulwark implementation and other classes 
    // related to information transfer between functions and services. I've 
    // made it a top-level object on par with Charlotte and Gamemaster with
    // the expectation that it can be reused in other projects.
    
    // This is the same UUIDv4 function from Charlotte; I included it here to
    // avoid dependencies.
    var UUIDv4 = function b(a)
    {
      return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)
    };
    
    // A new concept on versioning, just trying it out like this.
    var CLASS_ID_BULWARK      = "0d1d972c-1763-434f-a174-c66cbf76cb4c";
    var CLASS_ID_PARAMETERS   = "a92a1e7e-a44b-483e-ad41-6a8c69a102b0";
    var CLASS_ID_ACTIVITY_LOG = "2634bd89-23d9-4100-990f-d798f82c1c46";
    var CLASS_ID_REQUEST      = "4da8e3dd-ab45-4634-948b-27b9def36ac0";
    var CLASS_ID_RESPONSE     = "533cafcf-f436-4f18-b819-ff2b6d0fa51d";
    
    { // Bulwark
      
      // This is a new Bulwark implementation (2018-12-04) that incorporates
      // some design ideas I came up with for the Gamemaster project, but it
      // is scoped in a fashion that should make it appropriate for other
      // efforts as well.
      var Bulwark = function(parameters)
      {
        var meta = {};   // scope : private
        var data = {};   // scope : private
        
        meta.className  = 'Bulwark';
        meta.classId    = CLASS_ID_BULWARK;
        meta.instanceId = UUIDv4();
        
        // TODO: I still don't perfectly understand the private/privileged
        // model in JavaScript, but this approach works for the time being.
        // See the basic.js test script (elsewhere, if you can find it) for
        // more information.
        
        this.getMeta = function()
        {
          return meta;
        };
        
        this.getData = function()
        {
          return data;
        };
        
        this.setMeta = function(key, value)
        {
          meta[key] = value;
          return meta;
        };
        
        this.setData = function(object)
        {
          data = object;
          return data;
        };
        
        // initialize
        
        // NOTE: Trying this out because it worked well in a child object.
        // If it breaks something, change something.
        if (parameters) this.setData(parameters);
      };
      
      // Naive but effective for now
      Bulwark.prototype.toString = function()
      {
        var result = '';
        result += '\nObject of type Bulwark:\n';
        for (x in this.getMeta()) result += '  meta[' + x + '] = ' + this.getMeta()[x].toString() + '\n';
        for (x in this.getData()) result += '  data[' + x + '] = ' + this.getData()[x].toString() + '\n';
        
        return result;
      };
      
    }
    
    // Data types...all children of Bulwark?
    
    { // Parameters
      
      var Parameters = function(parameters)
      {
        Bulwark.call(this, parameters);
        
        this.setMeta('className','Parameters');
        this.setMeta('classId', CLASS_ID_PARAMETERS);
        this.setMeta('instanceId', UUIDv4());
        //this.setData(parameters);
      };
      
      Parameters.prototype = Object.create(Bulwark.prototype);
      
    }
    
    { // ActivityLog
    
      var ActivityLog = function(parameters)
      {
        Bulwark.call(this, parameters);
        
        this.setMeta('className','ActivityLog');
        this.setMeta('classId', CLASS_ID_ACTIVITY_LOG);
        this.setMeta('instanceId', UUIDv4());
        this.setData([]); // make data an array
        // TODO: this breaks Bulwark's assignment of parameters to data,
        // so maybe re-assign?
      };
      
      ActivityLog.prototype = Object.create(Bulwark.prototype);
      
      ActivityLog.prototype.log = function(entry)
      {
        this.getData().push(entry);
      };
      
    }
    
    { // Request
      
      var Request = function(parameters)
      {
        Bulwark.call(this, parameters);
        
        this.setMeta('className','Request');
        this.setMeta('classId', CLASS_ID_REQUEST);
        this.setMeta('instanceId', UUIDv4());
        this.setData([]); // make data an array
        // TODO: this breaks Bulwark's assignment of parameters to data,
        // so maybe re-assign?
      };
      
      Request.prototype = Object.create(Bulwark.prototype);
      
    }
    
    { // Response
      
      var Response = function(parameters)
      {
        Bulwark.call(this, parameters);
        
        this.setMeta('className','Response');
        this.setMeta('classId', CLASS_ID_RESPONSE);
        this.setMeta('instanceId', UUIDv4());
        this.setData([]); // make data an array
        // TODO: this breaks Bulwark's assignment of parameters to data,
        // so maybe re-assign?
      };
      
      Response.prototype = Object.create(Bulwark.prototype);
      
    }
    
  }
 
  // Non-Bastion stuff
  
  { // Map
  
    var CLASS_ID_MAP = "05ab06ad-60a5-4e83-ad99-4e6d74817d64";
  
    var Map = function(parameters)
    {
      // placeholder Map class
      Bulwark.call(this, parameters);
      
      this.setMeta('className','Map');
      this.setMeta('classId', CLASS_ID_MAP);
      this.setMeta('instanceId', UUIDv4());
      this.setData([]); // make data an array
        // TODO: this breaks Bulwark's assignment of parameters to data,
        // so maybe re-assign?
    }
    
    Map.prototype = Object.create(Bulwark.prototype);
  
  }

  { // Table
  
    var CLASS_ID_TABLE = "d45db882-509a-494d-bf48-c979b11db81d";

    var Table = function(parameters)
    {
      // placeholder Table class
      Bulwark.call(this, parameters);
      
      this.setMeta('className','Table');
      this.setMeta('classId', CLASS_ID_TABLE);
      this.setMeta('instanceId', UUIDv4());
      this.setData([]); // make data an array
        // TODO: this breaks Bulwark's assignment of parameters to data,
        // so maybe re-assign?
      
      this.getOptions = function()
      {
        return this.getData()['options'];
      };
      
      this.setOptions = function(option)
      {
        this.getData()['options'].push(option);
        return this.getData()['options'];
      };
      
      this.roll = function()
      {
        // TODO: I think this and a lot of the other functions should
        // be in the prototype?
        
        var response = new Response();
        
        var chanceUnits = 0;
        this.getOptions().forEach(function(o)
        {
          chanceUnits += o.getChanceUnits();
        });
        
        var roll = rollDice(1, chanceUnits);
        console.log(roll.getTotal());
        response.getData().push(roll);
        
        var option = null;
        chanceUnits = 0; // reset to determine winner
        
        for (var i=0; i < this.getOptions().length; i++)
        {
          chanceUnits += this.getOptions()[i].getChanceUnits();
          
          if (chanceUnits >= roll.getTotal())
          {
            option = this.getOptions()[i];
            break;
          };
        };
        
        response.getData().push(option.invoke());
        
        return response;
      };
      
      // initialize
      
      this.getData()['options'] = [];
    };

    Table.prototype = Object.create(Bulwark.prototype);

  }

  { // Option

    var CLASS_ID_OPTION = "f4f34ff5-d584-4021-917a-84a1ee725988";
    
    var Option = function(parameters)
    {
      // placeholder Option class
      Bulwark.call(this, parameters);
      
      this.setMeta('className','Option');
      this.setMeta('classId', CLASS_ID_OPTION);
      this.setMeta('instanceId', UUIDv4());
      
      this.getChanceUnits = function()
      {
        return this.getData()['chanceUnits'];
      };
      
      this.setChanceUnits = function(units)
      {
        this.getData()['chanceUnits'] = units;
        return this.getData()['chanceUnits'];
      };
      
      this.getActivities = function()
      {
        return this.getData()['activities'];
      };
      
      this.setActivities = function(activity)
      {
        this.getData()['activities'].push(activity);
        return this.getData()['activities'];
      };
      
      this.invoke = function()
      {
        var results = [];
        
        for (x in this.getData()['activities'])
        {
          results.push(this.getData()['activities'][x]());
        };
        
        return results;
      };
      
      // initialize
      
      // set values if they were not set by parameters
      this.getData().chanceUnits = this.getData().chanceUnits || 0;
      this.getData().activities  = this.getData().activities  || [];
    };

    Option.prototype = Object.create(Bulwark.prototype);

  }
  
  { // Dice
  
    // No-frills dice roller, because the current frilly one has bugs and
    // is in a pretty verbose state. Plus this is all I need right now;
    // something that does a simple roll on a simple table and returns
    // a Result object.
    
    { // DieRoll
    
      // A DieRoll is the result of a single rolled die.
      
      var CLASS_ID_DIE_ROLL = "6d88ae49-8ed5-4486-afed-2dd7768123f6";
    
      var DieRoll = function(parameters)
      {
        Bulwark.call(this, parameters);
        
        this.setMeta('className','DieRoll');
        this.setMeta('classId', CLASS_ID_DIE_ROLL);
        this.setMeta('instanceId', UUIDv4());
      };
      
      DieRoll.prototype = Object.create(Bulwark.prototype);
      
      DieRoll.prototype.getSides = function()
      {
        return this.getData().sides;
      };
      
      DieRoll.prototype.setSides = function(sides)
      {
        this.getData().sides = sides;
        return this.getSides();
      };
      
      DieRoll.prototype.getRoll = function()
      {
        return this.getData().dieRoll;
      };
      
      DieRoll.prototype.setRoll = function(roll)
      {
        this.getData().dieRoll = roll;
        return this.getRoll();
      };
      
      // TODO: I think I should move a lot of the functions in some of the other
      // objects into prototypes like this?
      
    }
    
    { // DiceRoll
    
      // A DiceRoll is a set of DieRolls.
      
      var CLASS_ID_DICE_ROLL = "c6dde968-94ef-4715-9897-8442e402183a";
    
      var DiceRoll = function(parameters)
      {
        Bulwark.call(this);
        
        this.setMeta('className','DiceRoll');
        this.setMeta('classId', CLASS_ID_DICE_ROLL);
        this.setMeta('instanceId', UUIDv4());
        this.setData([]); // make data an array
      };
      
      DiceRoll.prototype = Object.create(Bulwark.prototype);
      
      DiceRoll.prototype.getTotal = function()
      {
        var rolls = this.getData();
        var total = 0;
        for(var i = 0; i < rolls.length; i++)
        {
          total += rolls[i].getRoll();
        };
        
        return total;
        
      };
      
    }
    
    var rollDie = function(sides)
    {
      var dieRoll = Math.floor(Math.random()*sides+1);
      
      var response = new DieRoll({'sides':sides, 'dieRoll':dieRoll});
      
      return response;
    };
    
    var rollDice = function (quantity, sides)
    {
      var response = new DiceRoll();
      
      for (var i = 0 ; i < quantity ; i++)
      {
        response.getData().push(rollDie(sides));
      };
      
      return response;
    };
  
  }

    // This appears to be working pretty well so far (good job, me!). I'd like
    // to have those activities returning result objects, with activity logs
    // and whatever other registered data type is appropriate to the given
    // option. Not sure if there's a good way to default that in the Option
    // class or if it just needs to be handled on option creation. If so,
    // the overhead of setting up tables is going to look uglier than I had
    // hoped, but still ... points for abstracting out as much as I did with
    // so little actual code!
    
    // TODO: Trying to finish up basic table functionality. Are these results
    // combining data and activity log? Is there anything critical that is
    // still missing from this model? Anything that prevents me from adding
    // all the table instances without having to worry too much about refactoring?
    
    // <Testing>
    var option1 = new Option();
    option1.setChanceUnits(2);
    option1.setActivities(function(){return 'one';});
    option1.setActivities(function(){return 'two';});
    
    var option2 = new Option({'chanceUnits':1,'activities':[function(){return 'A';}]});
    var option3 = new Option({'chanceUnits':1,'activities':[function(){return 'B';}]});
    var option4 = new Option({'chanceUnits':1,'activities':[function(){return 'C';}]});
    
    var table =  new Table();
    table.setOptions(option1);
    table.setOptions(option2);
    table.setOptions(option3);
    table.setOptions(option4);
    
    console.log('\n[OUTPUTTING TABLE]\n');
    console.log(table.toString());
    
    console.log('\n[ROLLING ON TABLE]\n');
    console.log(table.roll().toString());
    // </Testing> 

}


// 20181203 STATUS
// These all seem to work; they don't do much other than create a Parameters
// instance which derives from Bulwark, but that's pretty much all I needed
// to get started anyway.
//
// Next I guess is to create the random dungeon generation object and start
// creating the table classes in there. Oh. And then work on the Option and
// Table parent classes, I suppose. Don't forget the initialize concept.