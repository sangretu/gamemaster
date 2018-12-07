/**
 * bastion.js
 *
 * A container for a bulwark implementation and its supporting material.
 *
 * Doing something a bit new here and trying to use bulwark as a standard for
 * much of the data passing between functions, has required some careful
 * consideration, but I think I've got it to a reasonably scalable design.
 *
 * Bastion is intended to be a root-level object
 *
 * 2018-12-07
 */

// This is a new trick for me, but I'm going to sculpt this as a self-executing
// function that creates a "bastion" object in the context of its caller;
// presumable "Window", which will make it a root-level object.

!function() // creates bastion object
{
  this.bastion = {}; // The "this" keyword changes scope from function to caller.
  
  // Same UUIDv4 as in charlotte, but included here to avoid dependencies
  bastion.UUIDv4 = function b(a)
  {
    return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)
  };
  
  { // Bulwark
  
    // The key new design principle here is that all access to the private members is
    // through the accessors, and all calls to the accessors are made from member
    // functions. The goal is not to keep callers from getting access to the private
    // members, but rather an attempt to make all data access and modification to be
    // done by function call rather than direct access to support arbitrary changes
    // as happens when rules randomly interact with each other. So foo.setBar('baz')
    // is fine but foo.getBar().baz ='tinkle' is not...even though it would work.
  
    bastion.Bulwark = function(parameters)
    {
      var meta = {}; // private
      var data = {}; // private
      
      this.getMeta = function() { return meta; };
      this.getData = function() { return data; };
      
      this.setMeta = function(scab) { meta = scab; return this.getMeta(); };
      this.setData = function(scab) { data = scab; return this.getData(); };
      
      // initialization section
      
      this.getMeta().instanceId = bastion.UUIDv4();
      
      // expecting the following to be overridden by child classes
      
      // using variable for class id because I'm not sure I want
      // to keep the definition within the class, will make it
      // easier to move and/or update later.
      
      var CLASS_ID_BULWARK      = "0d1d972c-1763-434f-a174-c66cbf76cb4c";
      this.getMeta().className  = 'Bulwark';
      this.getMeta().classId    = CLASS_ID_BULWARK;
      
    };
    
    bastion.Bulwark.prototype.getClassName = function()
    {
      return this.getMeta().className;
    };
    
    bastion.Bulwark.prototype.setClassName = function(scab)
    {
      this.getMeta().className = scab;
      return this.getClassName();
    };
    
    bastion.Bulwark.prototype.getClassId = function()
    {
      return this.getMeta().classId;
    };
    
    bastion.Bulwark.prototype.setClassId = function(scab)
    {
      this.getMeta().classId = scab;
      return this.getClassId();
    };
    
    bastion.Bulwark.prototype.getInstanceId = function()
    {
      return this.getMeta().instanceId;
    };
    
    bastion.Bulwark.prototype.setInstanceId = function(scab)
    {
      this.getMeta().instanceId = scab;
      return this.getInstanceId();
    };
      
    // TODO: Naive but effective for now
    bastion.Bulwark.prototype.toString = function()
    {
      var result = '';
      result += '\nObject of type ' + this.getClassName() + ' (Bulwark):\n';
      for (x in this.getMeta()) result += '  meta[' + x + '] = ' + this.getMeta()[x].toString() + '\n';
      for (x in this.getData()) result += '  data[' + x + '] = ' + this.getData()[x].toString() + '\n';
      
      return result;
    };
  
  }
  
  { // Parameters
  
    bastion.Parameters = function(parameters)
    {
      bastion.Bulwark.call(this, parameters);
      
      // initialize Bulwark meta section
      
      var CLASS_ID_PARAMETERS = "a92a1e7e-a44b-483e-ad41-6a8c69a102b0";
      this.setClassName('Parameters');
      this.setClassId(CLASS_ID_PARAMETERS);
    }
    
    bastion.Parameters.prototype = Object.create(bastion.Bulwark.prototype);
  
  }
  
  { // ActivityLog
  
    bastion.ActivityLog = function(parameters)
    {
      bastion.Bulwark.call(this, parameters);
      
      this.setData([]); // Data is an array
      
      // initialize Bulwark meta section
      
      var CLASS_ID_ACTIVITY_LOG = "2634bd89-23d9-4100-990f-d798f82c1c46";
      this.setClassName('ActivityLog');
      this.setClassId(CLASS_ID_ACTIVITY_LOG);
    }
    
    bastion.ActivityLog.prototype = Object.create(bastion.Bulwark.prototype);
    
    bastion.ActivityLog.prototype.getLog = function()
    {
      return this.getData();
    };
    
    bastion.ActivityLog.prototype.log = function(entry)
    {
      this.getData().push(entry);
    };
  
  }
  
  { // Request
  
    bastion.Request = function(parameters)
    {
      bastion.Bulwark.call(this, parameters);
      
      // initialize Bulwark meta section
      
      var CLASS_ID_REQUEST      = "4da8e3dd-ab45-4634-948b-27b9def36ac0";
      this.setClassName('Request');
      this.setClassId(CLASS_ID_REQUEST);
    }
    
    bastion.Request.prototype = Object.create(bastion.Bulwark.prototype);
  
  }
  
  { // Response
  
    bastion.Response = function(parameters)
    {
      bastion.Bulwark.call(this, parameters);
      
      // initialize Bulwark meta section
      
      var CLASS_ID_RESPONSE     = "533cafcf-f436-4f18-b819-ff2b6d0fa51d";
      this.setClassName('Response');
      this.setClassId(CLASS_ID_RESPONSE);
    }
    
    bastion.Response.prototype = Object.create(bastion.Bulwark.prototype);
  
  }
  
  { // Template
  
    bastion.Template = function(parameters)
    {
      bastion.Bulwark.call(this, parameters);
      
      // initialize Bulwark meta section
      
      var CLASS_ID_TEMPLATE = "insert_uuid_here";
      this.setClassName('Template');
      this.setClassId(CLASS_ID_TEMPLATE);
    }
    
    bastion.Template.prototype = Object.create(bastion.Bulwark.prototype);
  
  }
  
}(); // Self-execute

{ // Non-bastion children of Bulwark
    
  // Keeping these here for now but eventually they should be in a different file
  
  { // Map

    Map = function(parameters)
    {
      bastion.Bulwark.call(this, parameters);
      
      // initialize Bulwark meta section    
    
      var CLASS_ID_MAP = "05ab06ad-60a5-4e83-ad99-4e6d74817d64";
      this.setClassName('Map');
      this.setClassId(CLASS_ID_MAP);
    }
    
    Map.prototype = Object.create(bastion.Bulwark.prototype);

  }
    
  { // Table

    Table = function(parameters)
    {
      bastion.Bulwark.call(this, parameters);
      
      // initialize Bulwark meta section
    
      var CLASS_ID_TABLE = "d45db882-509a-494d-bf48-c979b11db81d";
      this.setClassName('Table');
      this.setClassId(CLASS_ID_TABLE);
        
      // initialize data
      
      var args                   = parameters    || {};
      this.getData().options     = args.options  || [];
    }
    
    Table.prototype = Object.create(bastion.Bulwark.prototype);
    
    Table.prototype.getOptions = function()
    {
      return this.getData().options;
    };
    
    Table.prototype.addOption = function(option)
    {
      this.getOptions().push(option);
    };
    
    Table.prototype.setOptions = function(scab)
    {
      this.getData().options = scab;
      return this.getOptions();
    };
    
    Table.prototype.getTotalChanceUnits = function()
    {
      var totalChanceUnits = 0;
      
      this.getOptions().forEach(function(o)
      {
        totalChanceUnits += o.getChanceUnits();
      });
      
      return totalChanceUnits;
    };
    
    Table.prototype.roll = function()
    {
      var result = {};
      
      result.chanceUnits = this.getTotalChanceUnits();
      
      result.roll        = rollDice(1, result.chanceUnits);
      
      result.option      = {};
      
      var numOptions = this.getOptions().length;
      var tally      = 0;
      var option     = new Option(); // default empty Option
      
      for (var i=0 ; tally < result.roll.getTotal() && i < numOptions ; i++)
      {
        option  = this.getOptions()[i];      
        tally  += option.getChanceUnits();
      };
      
      // Should not be possible for this to be false, but just in case...
      if (tally >= result.roll.getTotal()) result.option = option;
      
      result.result = result.option.invoke();
      
      var response = new bastion.Response();
      response.setData(result);
      
      return response;
    };

  }
    
  { // Option

    Option = function(parameters)
    {
      bastion.Bulwark.call(this, parameters);
      
      // initialize Bulwark meta section

      var CLASS_ID_OPTION = "f4f34ff5-d584-4021-917a-84a1ee725988";
      this.setClassName('Option');
      this.setClassId(CLASS_ID_OPTION);
        
      // initialize data
      
      var args                   = parameters || {};
      this.getData().chanceUnits = args.chanceUnits || 0;
      this.getData().activities  = args.activities  || [];
    }
    
    Option.prototype = Object.create(bastion.Bulwark.prototype);
    
    Option.prototype.getChanceUnits = function()
    {
      return this.getData().chanceUnits;
    };
    
    Option.prototype.setChanceUnits = function(units)
    {
      this.getData().chanceUnits = units;
      return this.getChanceUnits();
    };
    
    Option.prototype.getActivities = function()
    {
      return this.getData().activities;
    };
    
    Option.prototype.addActivity = function(activity)
    {
      this.getActivities().push(activity);
    };
    
    Option.prototype.setActivities = function(scab)
    {
      this.getData().activities = scab;
      return this.getActivities();
    };
    
    Option.prototype.invoke = function()
    {
      var results = [];
      
      for (x in this.getActivities())
      {
        results.push(this.getActivities()[x]());
      };
      
      return results;
    };

  }

  { // Dice
    
      // No-frills dice roller, because the current frilly one has bugs and
      // is in a pretty verbose state. Plus this is all I need right now;
      // something that does a simple roll on a simple table and returns
      // a Result object.
    
    { // DieRoll

      // A DieRoll is the result of a single rolled die.
      
      DieRoll = function(parameters)
      {
        bastion.Bulwark.call(this, parameters);
        
        // initialize Bulwark meta section
        
        var CLASS_ID_DIE_ROLL = "6d88ae49-8ed5-4486-afed-2dd7768123f6";
        this.setClassName('DieRoll');
        this.setClassId(CLASS_ID_DIE_ROLL);
        
        // initialize data
        
        var args             = parameters || {};
        this.getData().sides = args.sides || 0;
        this.getData().roll  = args.roll  || 0;
      }
      
      DieRoll.prototype = Object.create(bastion.Bulwark.prototype);
      
      DieRoll.prototype.getSides = function()
      {
        return this.getData().sides;
      };
      
      DieRoll.prototype.setSides = function()
      {
        this.getData().sides = scab;
        return this.getSides();
      };
      
      DieRoll.prototype.getRoll = function()
      {
        return this.getData().roll;
      };
      
      DieRoll.prototype.setRoll = function(scab)
      {
        this.getData().roll = scab;
        return this.getRoll();
      };

    }
      
    { // DiceRoll

      // A DiceRoll is a set of DieRolls.
      
      DiceRoll = function(parameters)
      {
        bastion.Bulwark.call(this, parameters);
        
        this.setData([]); // Data is an array
        
        // initialize Bulwark meta section
        
        var CLASS_ID_DICE_ROLL = "c6dde968-94ef-4715-9897-8442e402183a";
        this.setClassName('DiceRoll');
        this.setClassId(CLASS_ID_DICE_ROLL);
      }
      
      DiceRoll.prototype = Object.create(bastion.Bulwark.prototype);
      
      DiceRoll.prototype.getRolls = function()
      {
        return this.getData();
      };
      
      DiceRoll.prototype.addRoll = function(roll)
      {
        this.getRolls().push(roll);
        return this.getRolls;
      };
      
      DiceRoll.prototype.setRolls = function(scab)
      {
        this.getRolls() = scab;
        return this.getRolls();
      };
        
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
    
    // Non-bulwark functions
    
    var rollDie = function(sides)
    {
      var dieRoll = Math.floor(Math.random()*sides+1);
      
      var response = new DieRoll({'sides':sides, 'roll':dieRoll});
      
      return response;
    };
    
    var rollDice = function (quantity, sides)
    {
      var response = new DiceRoll();
      
      for (var i = 0 ; i < quantity ; i++)
      {
        response.addRoll(rollDie(sides));
      };
      
      return response;
    };

  }

    // This appears to be working pretty well so far (good job, me!). I'd like
    // to have those activities returning response objects with activity logs
    // and whatever other registered data type is appropriate to the given
    // option. Not sure if there's a good way to default that in the Option
    // class or if it just needs to be handled on option creation. If so,
    // the overhead of setting up tables is going to look uglier than I had
    // hoped, but still ... points for abstracting out as much as I did with
    // so little actual code!

    
  { // Template

    Template = function(parameters)
    {
      bastion.Bulwark.call(this, parameters);
      
      // initialize Bulwark meta section
      
      var CLASS_ID_TEMPLATE = "insert_uuid_here";
      this.setClassName('Template');
      this.setClassId(CLASS_ID_TEMPLATE);
    }
    
    Template.prototype = Object.create(bastion.Bulwark.prototype);

  }

}

{ // Table instances

  // These clearly need to be moved once I'm convinced they work.
}


// Testing in development

var b  = new bastion.Bulwark();
var p  = new bastion.Parameters();
var al = new bastion.ActivityLog();
var rq = new bastion.Request();
var rs = new bastion.Response();
var d  = rollDice(3,6);

var option1 = new Option({'chanceUnits':2,'activities':[function(){return 'one';},function(){return 'two';}]});
var option2 = new Option();
option2.setChanceUnits(2);
option2.addActivity(function(){return 'three';});
option2.addActivity(function(){return 'four';});

var table =  new Table();
table.addOption(option1);
table.addOption(option2);