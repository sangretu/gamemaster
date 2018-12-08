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
      
      this.setMeta = function(scab) 
      { 
        meta = scab; return this.getMeta(); 
      };
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
    
    // TODO: Really not sure how to organize this part and at what level
    
    bastion.Bulwark.prototype.getSummary = function()
    {
      var summary = 'Bulwark/' + this.getClassName() + '\n';
      
      //for (x in this.getMeta()) summary +=   '  meta[' + x + '] = ' + this.getMeta()[x].toString() + '\n';
      for (x in this.getData())
      {
        summary +=   this.getClassName() + '.data[' + x + '] = ' + this.getData()[x].toString() + '\n';
      };
      
      // TODO: This is so messy
      
      var regex = /\n\n/gi;

      summary = summary.replace(regex, '\n');
      
      return summary;
    };
    
    bastion.Bulwark.prototype.toString = function()
    {
      var result = this.getSummary();
      
      return result;
    };
    
    // TODO: Naive but effective for now
    bastion.Bulwark.prototype.getDetail = function()
    {
      var result = '';
      result += '\nObject of type ' + this.getClassName() + ' (Bulwark):\n';
      
      for (x in this.getMeta())
      {        
        result += '  meta[' + x + '] = ' + this.getMeta()[x].toString() + '\n';
      };
      
      for (x in this.getData())
      {
        var data = this.getData()[x];
        
        if (Array.isArray(data))
        {
          for (y in data)
          {
            // TODO: theoretically this needs to be recursive
            result += '    data[' + x + '][' + y + '] = ' + data[y].toString() + '\n';
          }
        
        } else
        {
          result += '  data[' + x + '] = ' + this.getData()[x].toString() + '\n';
        };
      };
      
      return result;
    };
  
  }
  
  { // Parameters
  
    // TODO: I am not convinced this needs to exist.
  
    bastion.Parameters = function(parameters)
    {
      bastion.Bulwark.call(this, parameters);
      
      throw 'Are you sure you need a parameters object that derives from Bulwark?';
      
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
      
      var args                    = parameters        || {};
      this.getData().friendlyName = args.friendlyName || 'Unnamed table';
      this.getData().options      = args.options      || [];
      this.getData().footnotes    = args.footnotes    || [];
    }
    
    Table.prototype = Object.create(bastion.Bulwark.prototype);
    
    Table.prototype.getFriendlyName = function()
    {
      return this.getData().friendlyName;
    };
    
    Table.prototype.setFriendlyName = function(name)
    {
      this.getData().friendlyName = name;
      return this.getFriendlyName();
    };
    
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
    
    Table.prototype.getFootnotes = function()
    {
      return this.getData().footnotes;
    };
    
    Table.prototype.addFootnote = function(footnote)
    {
      this.getFootnotes().push(footnote);
    };
    
    Table.prototype.setFootnotes = function(scab)
    {
      this.getData().footnotes = scab;
      return this.getFootnotes();
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
    
    Table.prototype.roll = function(parameters)
    {
      /////////////////////
      // Validation
      /////////////////////
      
      // fail graciously if there are no options
      //if (this.getOptions().length == 0) throw 'Cannot roll on a table with no options (' + this.getFriendlyName() + ')';
      if (this.getOptions().length == 0)
      return 'Cannot roll on a table with no options (' + this.getFriendlyName() + ')';
      
      // if (logger) logger.log('[DEBUG] Table.roll with context type ' + typeof this);
      
      //var response = parameters || new bastion.ActivityLog();
      //response.logger = parameters.logger || new bastion.ActivityLog();
      
      /////////////////////
      // Execution
      /////////////////////
      
      var result = {};
      
      result.tableName = this.getFriendlyName();
      
      result.chanceUnits = this.getTotalChanceUnits(); //temp;
      
      result.roll        = rollDie(result.chanceUnits);
      
      result.option      = {};
      
      var numOptions = this.getOptions().length;
      var tally      = 0;
      var option     = new Option(); // default empty Option
      
      for (var i=0 ; tally < result.roll.getRoll() && i < numOptions ; i++)
      {
        option  = this.getOptions()[i];      
        tally  += option.getChanceUnits();
      };
      
      // Should not be possible for this to be false, but just in case...
      if (tally >= result.roll.getRoll()) result.option = option;
      
      //console.log('roll : ' + result.roll.getTotal());
      //console.log('option : ' + result.option);
      
      result.result = result.option.invoke();
      
      var response = new TableRollResponse();
      response.setData(result);
      //response.log(result.toString());
      
      return response;
    };

  }
    
  { // TableRollResponse
  
    // A custom Response for table rolls, just because I want to clean up the output.
  
    TableRollResponse = function(parameters)
    {
      bastion.Response.call(this, parameters);
      
      // initialize Bulwark meta section
      
      var CLASS_ID_TABLE_ROLL_RESPONSE = "e0c2d557-9c22-4c28-b1a8-dd495b1d9df0";
      this.setClassName('TableRollResponse');
      this.setClassId(CLASS_ID_TABLE_ROLL_RESPONSE);
    }
    
    TableRollResponse.prototype = Object.create(bastion.Response.prototype);
    
    TableRollResponse.prototype.getSummary = function()
    {
      var summary = 'Rolling on ' + this.getData().tableName + '\n';
      summary += '  ' + this.getData().roll.toString() + '\n';
      summary += '  Result : ' + this.getData().option + '\n';
      
      for (var x = 0; x < this.getData().result.length; x++)
      {
        var activityResult = this.getData().result[x];
        summary += activityResult.toString();
      }
      
      //summary += '\n';
      
      return summary;
    };
    
    TableRollResponse.toString = function()
    {
      return this.getSummary();
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
      
      var args                   = parameters       || {};
      this.getData().text        = args.text        || '(no text)';
      this.getData().chanceUnits = args.chanceUnits || 0;
      this.getData().activities  = args.activities  || [];
    }
    
    Option.prototype = Object.create(bastion.Bulwark.prototype);
    
    Option.prototype.getText = function()
    {
      return this.getData().text;
    };
    
    Option.prototype.setText = function(text)
    {
      this.getData().text = text;
      return this.getText();
    };
    
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
      /////////////////////
      // Validation
      /////////////////////
      
      if (!activity.func) throw 'Invalid activity, no func to call : ' + activity.toString();
      
      /////////////////////
      // Execution
      /////////////////////
      
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
      
      for (var x = 0; x < this.getActivities().length; x++)
      {
      
        // TODO: scope issues when calling functions from a list, need
        // to make clear the expectations of an activity object.
        
        var activity = this.getActivities()[x];
        var context  = activity.context || this;
        
        /////////////////////
        // Validation
        /////////////////////
        
        if (!activity.func) throw 'Invalid activity, no func to call : ' + activity.toString();
        
        /*
        // Debugging context issues...because calling a function that was passed is a problem
        console.log('[option.invoke]');
        console.log('x       : ' + x);
        console.log('context : ' + activity.context);
        console.log('func    : ' + activity.func);
        */
        
        results.push(activity.func.call(context));
        //results.push(this.getActivities()[x]());
      };
      
      // TODO: return a more predictable object type?
      
      return results;
    };
    
    Option.prototype.getSummary = function()
    {
      var summary = this.getText();
      
      return summary;
    };
    
    Option.prototype.toString = function()
    {
      return this.getSummary();
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
      
      DieRoll.prototype.getSummary = function()
      {
        var summary = 'DieRoll : d';
        summary += this.getSides();
        summary += ' = ' + this.getRoll();
        
        return summary;
      };
      
      DieRoll.prototype.toString = function()
      {
        return this.getSummary();
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

      DiceRoll.prototype.getSummary = function()
      {
        var summary = 'DiceRoll : ';
        
        var rolls = this.getData();
        
        for(var i = 0; i < rolls.length; i++)
        {
          summary += rolls[i].getSummary() + ', ';
        }
        summary += '(Total : ' + this.getTotal() + ')';
        
        return summary;
      };
      
      DiceRoll.prototype.toString = function()
      {
        return this.getSummary();
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

{ // Artifacts

  // The whole point of this is to create stuff, so I need some way of representing
  // stuff that's been created. Starting simple, will work my way up...
  
  var mapParts = {};
  
  { // PassageSegment

    mapParts.PassageSegment = function(parameters)
    {
      bastion.Bulwark.call(this, parameters);
      
      // initialize Bulwark meta section
      
      var CLASS_ID_PASSAGE_SEGMENT = "dd358476-76f8-461c-af54-218d88df921b";
      this.setClassName('PassageSegment');
      this.setClassId(CLASS_ID_PASSAGE_SEGMENT);
      
      // initialize data
      
      var args                   = parameters       || {};
      this.getData().map         = args.map         || new Map();
    }
    
    mapParts.PassageSegment.prototype = Object.create(bastion.Bulwark.prototype);
    
    mapParts.PassageSegment.prototype.getSummary = function()
    {
      var summary = 'PLACEHOLDER: PassageSegment\n';
      
      return summary;
    };
    
    mapParts.PassageSegment.prototype.toString = function()
    {
      return this.getSummary();
    };
  
  }

}

{ // Table instances

  // Trying Activity class because option creation got messy
  var TableRoll = function(table)
  {
    this.context = table;
    this.func    = function(){return 'No table call for this option\n';};
    
    if (typeof table == 'function')
    {
      this.func = table;
    };
    
    if (table instanceof Table)
    {
      this.func = table.roll;
    };
  };
  
  var addTableOptions = function(table, options)
  {    
    for (var i in options)
    {
      var o = options[i];
      
      var activities = [];
      
      for (var x in o[1])
      {
        activities.push(new TableRoll(o[1][x]));
      };
      
      table.addOption(new Option({ chanceUnits : o[0] , activities : activities , text : o[2] }));
    };
  };

  // These clearly need to be moved once I'm convinced they work.
  // Create empties first so options have something to point to
  var tables = 
  {
    tablePeriodicCheck              : new Table({friendlyName:'TABLE I.: Periodic check (d20)'}),
    tableDoorsLocation              : new Table({friendlyName:'TABLE II.: Doors (d20), Location of Door:'}),
    tableDoorsBeyond                : new Table({friendlyName:'TABLE II.: Doors* (d20), Space Beyond Door is:'}),
    tableSidePassages               : new Table({friendlyName:'TABLE III.: Side Passages (d20)'}),
    tablePassageWidth               : new Table({friendlyName:'TABLE III. A.: Passage Width (d20)'}),
    tableSpecialPassage             : new Table({friendlyName:'TABLE III. B.: Special Passage (d20)'}),
    tableTurns                      : new Table({friendlyName:'TABLE IV.: Turns (d20)'}),
    tableChamberShapeAndSize        : new Table({friendlyName:'TABLE V.: Chambers and Rooms Shape and Size (d20), Chamber Shape and Area'}),
    tableRoomShapeAndSize           : new Table({friendlyName:'TABLE V.: Chambers and Rooms Shape and Size (d20), Room Shape and Area'}),
    tableUnusualShape               : new Table({friendlyName:'TABLE V. A.: Unusual Shape (d20)'}),
    tableUnusualSize                : new Table({friendlyName:'TABLE V. B.: Unusual Size (d20)'}),
    tableNumberOfExits              : new Table({friendlyName:'TABLE V. C.: Number of Exits (d20)'}),
    tableExitLocation               : new Table({friendlyName:'TABLE V. D.: Exit Location (d20)'}),
    tableExitDirection              : new Table({friendlyName:'TABLE V. E.: Exit Direction (d20)'}),
    tableChamberOrRoomContents      : new Table({friendlyName:'TABLE V. F.: Chamber or Room Contents (d20)'}),
    tableTreasure                   : new Table({friendlyName:'TABLE V. G.: TREASURE* (d%)'}),
    tableTreasureIsContainedIn      : new Table({friendlyName:'TABLE V. H.: Treasure is Contained in* (d20)'}),
    tableTreasureIsGuardedBy        : new Table({friendlyName:'TABLE V. I.: Treasure is Guarded by (d20)'}),
    tableTreasureIsHiddenByIn       : new Table({friendlyName:'TABLE V. I.: Treasure is Hidden by / in (d20)'}),
    tableStairs                     : new Table({friendlyName:'TABLE VI.: Stairs (d20)'}),
    tableTrickTrap                  : new Table({friendlyName:'TABLE VII.: Trick/Trap (d20)'}),
    tableGas                        : new Table({friendlyName:'TABLE VII. A.: Gas Sub-Table (d20)'}),
    tableDungeonRandomMonsterLevel1 : new Table({friendlyName:'Dungeon Random Monster Level Determination Matrix (d20), dungeon level 1'}),
    tableMonsterLevel1              : new Table({friendlyName:'Monster Level I'}),
    tableMonsterLevel2              : new Table({friendlyName:'Monster Level II'}),
    tableMonsterLevel3              : new Table({friendlyName:'Monster Level III'}),
  };
  
  var initTablePeriodicCheck = function()
  {
    var t = tables.tablePeriodicCheck;
    
    var options =
    [
      [ 2 , [ function(){return new mapParts.PassageSegment()}, tables.tablePeriodicCheck ] , 'Continue straight - check again in 60\' (this table)' ],
      [ 3 , [ tables.tableDoorsLocation ] , 'Door (see TABLE II.)' ],
      [ 5 , [ tables.tableSidePassages, tables.tablePeriodicCheck ] , 'Side Passage (see TABLE III.) - check again in 30\` (this table)' ],
      [ 3 , [ tables.tableTurns, tables.tablePeriodicCheck ] , 'Passage Turns (see TABLE IV., check width on TABLE III.) - check again in 30\' (this table)' ],
      [ 3 , [ tables.tableChamberShapeAndSize, tables.tablePeriodicCheck ] , 'Chamber (see TABLE V.) - check 30\' after leaving (this table)' ],
      [ 1 , [ tables.tableStairs ] , 'Stairs (see TABLE VI.)' ],
      [ 1 , [] , 'Dead End (walls left, right, and ahead can be checked for Secret Doors, see TABLE V.D., footnote)' ],
      [ 1 , [ tables.tableTrickTrap, tables.tablePeriodicCheck ] , 'Trick/Trap (see TABLE VII.), passage continues - check again in 30\' (this table)' ],
      [ 1 , [ tables.tableDungeonRandomMonsterLevel1, tables.tablePeriodicCheck ] , 'Wandering Monster, check again immediately to see what lies ahead so direction of monster\'s approach can be determined.' ],
    ];
    
    addTableOptions(t, options);
    
    // TODO: disabled tableDoorsBeyond from second result to limit scope of the dungeon for now  
  };
  
  var initTableDoorsLocation = function()
  {
    var t = tables.tableDoorsLocation;
    
    var options =
    [
      [ 6 , [  ] , 'Left' ],
      [ 6 , [  ] , 'Right' ],
      [ 8 , [  ] , 'Ahead' ],
    ];
    
    addTableOptions(t, options);
  };
  
  var initTableDoorsBeyond = function()
  {
    var t = tables.tableDoorsBeyond;
    
    var options =
    [
      [ 4 , [ tables.tablePassageWidth, tables.tablePeriodicCheck        ] , 'Parallel passage**, or 10\' x 10\' room if door is straight ahead' ],
      [ 4 , [ tables.tablePassageWidth, tables.tablePeriodicCheck        ] , 'Passage straight ahead' ],
      [ 1 , [ tables.tablePassageWidth, tables.tablePeriodicCheck        ] , 'Passage 45 degrees ahead/behind***' ],
      [ 1 , [ tables.tablePassageWidth, tables.tablePeriodicCheck        ] , 'Passage 45 degrees behind/ahead***' ],
      [ 8 , [ tables.tableRoomShapeAndSize    ] , 'Room (go to TABLE V.)' ],
      [ 2 , [ tables.tableChamberShapeAndSize ] , 'Chamber (go to TABLE V.)' ],
    ];
    
    addTableOptions(t, options);
    
    t.addFootnote('Always check width of passage (TABLE III. A.)');
    t.addFootnote('* Check again immediately on TABLE I. unless door is straight ahead; if another door is not indicated, then ignore the result and check again 30\' past the door. If a room or chamber is beyond a door, go to TABLE V.');
    t.addFootnote('** Extends 30\' in both directions.');
    t.addFootnote('*** The direction will be appropriate to existing circumstances, but use the direction before the slash in preference to the other.');
  };
  
  var initTableSidePassages = function()
  {
    var t = tables.tableSidePassages;   

    var options =
    [
      [ 2 , [ tables.tablePassageWidth ] , 'left 90 degrees' ],
      [ 2 , [ tables.tablePassageWidth ] , 'right 90 degrees' ],
      [ 1 , [ tables.tablePassageWidth ] , 'left 45 degrees ahead' ],
      [ 1 , [ tables.tablePassageWidth ] , 'right 45 degrees ahead' ],
      [ 1 , [ tables.tablePassageWidth ] , 'left 45 degrees behind (left 135 degrees)' ],
      [ 1 , [ tables.tablePassageWidth ] , 'right 45 degrees behind (right 135 degrees)' ],
      [ 1 , [ tables.tablePassageWidth ] , 'left curve 45 degrees ahead' ],
      [ 1 , [ tables.tablePassageWidth ] , 'right curve 45 degrees ahead' ],
      [ 3 , [ tables.tablePassageWidth ] , 'passage "T"s' ],
      [ 2 , [ tables.tablePassageWidth ] , 'passage "Y"s' ],
      [ 4 , [ tables.tablePassageWidth ] , 'four-way intersection' ],
      [ 1 , [ tables.tablePassageWidth ] , 'passage "X"s (if present passage is horizontal or vertical it forms a fifth passage into the "X")' ]
    ];
    
    addTableOptions(t, options);  
  };
  
  var initTablePassageWidth = function()
  {
    var t = tables.tablePassageWidth;
    
    var options =
    [
      [ 12 , [] , '10\'' ],
      [  4 , [] , '20\'' ],
      [  1 , [] , '30\'' ],
      [  1 , [] , '5\'' ],
      [  2 , [ tables.tableSpecialPassage ] , 'Special passage (TABLE III. B. below)' ],
    ];
    
    addTableOptions(t, options);
  };
  
  var initTableSpecialPassage = function()
  {
    var t = tables.tableSpecialPassage;
    
    var options =
    [
      [ 4 , [  ] , '40\', columns down center' ],
      [ 3 , [  ] , '40\', double row of columns' ],
      [ 3 , [  ] , '50\', double row of columns' ],
      [ 2 , [  ] , '50\', columns 10\' right and left support 10\' wide upper galleries 20\' above*' ],
      [ 3 , [  ] , '10\' stream**' ],
      [ 2 , [  ] , '20\' river***' ],
      [ 1 , [  ] , '40\' river***' ],
      [ 1 , [  ] , '60\' river***' ],
      [ 1 , [  ] , '20\', chasm****' ],
    ];
    
    addTableOptions(t, options);
  
    t.addFootnote('* Stairs up to gallery will be at end of passage (1-15) or at beginning (16-20). In the former case if a stairway is indicated in or adjacent to the passage it will replace the end stairs 50% (1-10) of the time and supplement 50% (11-20) of the time.');
    t.addFootnote('** Streams bisect the passage. They will be bridged 75% (1-15) of the time and be an obstacle 25% (16-20) of the time.');
    t.addFootnote('*** Rivers bisect the passage. They will be bridged 50% (1-10) of the time, have a boat 25% (11-15) of the time (50% chance for either bank), and be an obstacle 25% of the time.');
    t.addFootnote('**** Chasms bisect the passage. They are 150\' to 200\' deep. They will be bridged 50% (1-10) of the time, have a jumping place 5\'-10\' wide 25% (11-15) of the time, and be an obstacle 25% (16-20) of the time.');
  
  };
  
  var initTableTurns = function()
  {
    var t = tables.tableTurns;
    
    var options =
    [
      [ 8 , [  ] , 'left 90 degrees' ],
      [ 1 , [  ] , 'left 45 degrees ahead' ],
      [ 1 , [  ] , 'left 45 degrees behind (left 135 degrees)' ],
      [ 8 , [  ] , 'right 90 degrees' ],
      [ 1 , [  ] , 'right 45 degrees ahead' ],
      [ 1 , [  ] , 'right 45 degrees behind (right 135 degrees)' ],
    ];
    
    addTableOptions(t, options);
  };
  
  var initTableChamberShapeAndSize = function()
  {
    var t = tables.tableChamberShapeAndSize;
    
    var options =
    [
      [ 2 , [ tables.tableNumberOfExits, tables.tableChamberOrRoomContents ] , 'Square, 20\' x 20\'' ],
      [ 2 , [ tables.tableNumberOfExits, tables.tableChamberOrRoomContents ] , 'Square, 20\' x 20\'' ],
      [ 2 , [ tables.tableNumberOfExits, tables.tableChamberOrRoomContents ] , 'Square, 30\' x 30\'' ],
      [ 2 , [ tables.tableNumberOfExits, tables.tableChamberOrRoomContents ] , 'Square, 40\' x 40\'' ],
      [ 2 , [ tables.tableNumberOfExits, tables.tableChamberOrRoomContents ] , 'Rectangular, 20\' x 30\'' ],
      [ 3 , [ tables.tableNumberOfExits, tables.tableChamberOrRoomContents ] , 'Rectangular, 20\' x 30\'' ],
      [ 2 , [ tables.tableNumberOfExits, tables.tableChamberOrRoomContents ] , 'Rectangular, 30\' x 50\'' ],
      [ 2 , [ tables.tableNumberOfExits, tables.tableChamberOrRoomContents ] , 'Rectangular, 40\' x 60\'' ],
      [ 2 , [ tables.tableUnusualShape, tables.tableUnusualSize, tables.tableChamberOrRoomContents ] , 'Unusual shape and size - see sub-tables below' ],
    ];
    
    addTableOptions(t, options);    
    
    t.addFootnote('Roll for Shape, Size, and Exits; then Contents, Treasure, and how the latter is contained, if applicable.');
  };
  
  var initTableRoomShapeAndSize = function()
  {
    var t = tables.tableRoomShapeAndSize;
    
    var options =
    [
      [ 2 , [ tables.tableNumberOfExits, tables.tableChamberOrRoomContents ] , 'Square, 10\' x 10\'' ],
      [ 2 , [ tables.tableNumberOfExits, tables.tableChamberOrRoomContents ] , 'Square, 20\' x 20\'' ],
      [ 2 , [ tables.tableNumberOfExits, tables.tableChamberOrRoomContents ] , 'Square, 30\' x 30\'' ],
      [ 2 , [ tables.tableNumberOfExits, tables.tableChamberOrRoomContents ] , 'Square, 40\' x 40\'' ],
      [ 2 , [ tables.tableNumberOfExits, tables.tableChamberOrRoomContents ] , 'Rectangular, 10\' x 20\'' ],
      [ 3 , [ tables.tableNumberOfExits, tables.tableChamberOrRoomContents ] , 'Rectangular, 20\' x 30\'' ],
      [ 2 , [ tables.tableNumberOfExits, tables.tableChamberOrRoomContents ] , 'Rectangular, 20\' x 40\'' ],
      [ 2 , [ tables.tableNumberOfExits, tables.tableChamberOrRoomContents ] , 'Rectangular, 30\' x 40\'' ],
      [ 2 , [ tables.tableUnusualShape, tables.tableUnusualSize, tables.tableChamberOrRoomContents ] , 'Unusual shape and size - see sub-tables below' ],
    ];
    
    addTableOptions(t, options);
    
    t.addFootnote('Roll for Shape, Size, and Exits; then Contents, Treasure, and how the latter is contained, if applicable.');
  };
  
  var initTableUnusualShape = function()
  {
    var t = tables.tableUnusualShape;
    
    var options =
    [
      [ 5 , [  ] , 'Circular*' ],
      [ 3 , [  ] , 'Triangular' ],
      [ 3 , [  ] , 'Trapezoidal' ],
      [ 2 , [  ] , 'Odd-shaped**' ],
      [ 2 , [  ] , 'Oval' ],
      [ 2 , [  ] , 'Hexagonal' ],
      [ 2 , [  ] , 'Octogonal' ],
      [ 1 , [  ] , 'Cave' ],
    ];
    
    addTableOptions(t, options);
    
    t.addFootnote('* 1-5 has pool (see TABLE VIII. A. and C. if appropriate), 6-7 has well, 8-10 has shaft, and 10-20 is normal.');
    t.addFootnote('** Draw what shape you desire or what will fit the map - it is a special shape if desired.');
  };
  
  var initTableUnusualSize = function()
  {
    var t = tables.tableUnusualSize;
    
    var options =
    [
      [ 3 , [  ] , 'about 500 sq. ft.' ],
      [ 3 , [  ] , 'about 900 sq. ft.' ],
      [ 2 , [  ] , 'about 1,300 sq. ft.' ],
      [ 2 , [  ] , 'about 2,000 sq. ft.' ],
      [ 2 , [  ] , 'about 2,700 sq. ft.' ],
      [ 2 , [  ] , 'about 3,400 sq. ft.' ],
      [ 6 , [  ] , 'roll again and add result to 9-10 above (if another 15-20 repeat the process, doubling 9-10 above, and so on)' ],
    ];
    
    addTableOptions(t, options);
  };
  
  var initTableNumberOfExits = function()
  {
    var t = tables.tableNumberOfExits;
    
    // TODO: including max exits per room since there is currently no way to know room size ahead of calculating exits, fix this.
    var options =
    [
      [ 3 , [ tables.tableExitDirection, tables.tableExitDirection ] , 'up to 600\' : 1 , over 600\' : 2' ],
      [ 3 , [ tables.tableExitDirection, tables.tableExitDirection, tables.tableExitDirection ] , 'up to 600\' : 2 , over 600\' : 3' ],
      [ 3 , [ tables.tableExitDirection, tables.tableExitDirection, tables.tableExitDirection, tables.tableExitDirection ] , 'up to 600\' : 3 , over 600\' : 4' ],
      [ 3 , [ tables.tableExitDirection ] , 'up to 1200\' : 0* , over 1200\' : 1' ],
      [ 3 , [ tables.tableExitDirection ] , 'up to 1600\' : 0* , over 1600\' : 1' ],
      [ 3 , [ tables.tableExitDirection, tables.tableExitDirection, tables.tableExitDirection, tables.tableExitDirection ] , 'any size : 1-4(d4)' ],
      [ 2 , [ tables.tableExitDirection ] , 'any size : 1 - door in chamber, passage in room' ],
    ];
    
    addTableOptions(t, options);
    
    t.addFootnote('* Check once per 10\' for secret doors (see TABLE V. D., footnote).');
  };
  
  var initTableExitLocation = function()
  {
    var t = tables.tableExitLocation;
    
    var options =
    [
      [ 7 , [ tables.tableExitDirection ] , 'opposite wall' ],
      [ 5 , [ tables.tableExitDirection ] , 'left wall' ],
      [ 5 , [ tables.tableExitDirection ] , 'right wall' ],
      [ 3 , [ tables.tableExitDirection ] , 'same wall' ],
    ];
    
    addTableOptions(t, options);
    
    t.addFootnote('* If a passage or door is indicated in a wall where the space immediately beyond the wall has already been mapped, then the exit is either a secret door (1-5) or a one-way door (6-10) or it is in the opposite direction (11-20).');
  };
  
  var initTableExitDirection = function()
  {
    var t = tables.tableExitDirection;
    
    var options =
    [
      [ 16 , [  ] , 'straight ahead' ],
      [  2 , [  ] , '45 degrees left/right*' ],
      [  2 , [  ] , '45 degrees right/left*' ],
    ];
    
    addTableOptions(t, options);
    
    t.addFootnote('* The exit will be appropriate to existing circumstances, but use the direction before the slash in preference to the other.');
  };
  
  var initTableChamberOrRoomContents = function()
  {
    var t = tables.tableChamberOrRoomContents;
    
    var options =
    [
      [ 12 , [  ] , 'Empty' ],
      [  2 , [ tables.tableDungeonRandomMonsterLevel1 ] , 'Monster only (determine on appropriate table from Appendix C: Random Monster Encounters, Dungeon Encounter Matrix).' ],
      [  3 , [ tables.tableDungeonRandomMonsterLevel1, tables.tableTreasure, tables.tableTreasure ] , 'Monster and treasure (see TABLE V. G. below)' ],
      [  1 , [  ] , 'Special*, or contains stairway up 1 level (1-5), up 2 levels (7-8), down 1 level (9-14), down 2 levels (15-19), or down 3 levels - 2 flights of stairs and a slanting passageway (20).' ],
      [  1 , [ tables.tableTrickTrap ] , 'Trick/Trap (see TABLE VII.' ],
      [  1 , [ tables.tableTreasure ] , 'Treasure (see TABLE V. G.)' ],
    ];
    
    addTableOptions(t, options);
    
    t.addFootnote('* Determine by balance of level or put in what you desire; otherwise put in stairs as indicated.');
  };
  
  var initTableTreasure = function()
  {
    var t = tables.tableTreasure;
    
    var options =
    [
      [ 25 , [ tables.tableTreasureIsContainedIn, tables.tableTreasureIsGuardedBy, tables.tableTreasureIsHiddenByIn ] , '1,000 copper pieces/level' ],
      [ 25 , [ tables.tableTreasureIsContainedIn, tables.tableTreasureIsGuardedBy, tables.tableTreasureIsHiddenByIn ] , '1,000 silver pieces/level' ],
      [ 15 , [ tables.tableTreasureIsContainedIn, tables.tableTreasureIsGuardedBy, tables.tableTreasureIsHiddenByIn ] , '750 electrum pieces/level' ],
      [ 15 , [ tables.tableTreasureIsContainedIn, tables.tableTreasureIsGuardedBy, tables.tableTreasureIsHiddenByIn ] , '250 gold pieces/level' ],
      [ 10 , [ tables.tableTreasureIsContainedIn, tables.tableTreasureIsGuardedBy, tables.tableTreasureIsHiddenByIn ] , '100 platinum pieces/level' ],
      [  4 , [ tables.tableTreasureIsContainedIn, tables.tableTreasureIsGuardedBy, tables.tableTreasureIsHiddenByIn ] , '1-4 gems/level' ],
      [  3 , [ tables.tableTreasureIsContainedIn, tables.tableTreasureIsGuardedBy, tables.tableTreasureIsHiddenByIn ] , '1 piece jewelry/level' ],
      [  3 , [ tables.tableTreasureIsContainedIn, tables.tableTreasureIsGuardedBy, tables.tableTreasureIsHiddenByIn ] , 'Magic (roll once on Magic Items Table)' ],
    ];
    
    addTableOptions(t, options);
    
    t.addFootnote('* See also TABLES V. H. and I. or J.');
  };
  
  var initTableTreasureIsContainedIn = function()
  {
    var t = tables.tableTreasureIsContainedIn;
    
    var options =
    [
      [ 2 , [  ] , 'Bags' ],
      [ 2 , [  ] , 'Sacks' ],
      [ 2 , [  ] , 'Small Coffers' ],
      [ 2 , [  ] , 'Chests' ],
      [ 2 , [  ] , 'Huge Chests' ],
      [ 2 , [  ] , 'Pottery Jars' ],
      [ 2 , [  ] , 'Metal Urns' ],
      [ 2 , [  ] , 'Stone Containers' ],
      [ 2 , [  ] , 'Iron Trunks' ],
      [ 2 , [  ] , 'Loose' ],
    ];
    
    addTableOptions(t, options);
    
    t.addFootnote('* Go to TABLE V. I. on a roll of 1-8, TABLE V. J. on a 9-20 to determine protection if desired.');
  };
  
  var initTableTreasureIsGuardedBy = function()
  {
    var t = tables.tableTreasureIsGuardedBy;
    
    var options =
    [
      [ 2 , [  ] , 'Contact poison on container' ],
      [ 2 , [  ] , 'Contact poison on treasure' ],
      [ 2 , [  ] , 'Poisoned needles in lock' ],
      [ 1 , [  ] , 'Poisoned needles in handles' ],
      [ 1 , [  ] , 'Spring darts firing from front of container' ],
      [ 1 , [  ] , 'Sprint darts firing up from top of container' ],
      [ 1 , [  ] , 'Spring darts firing up from inside bottom of container' ],
      [ 2 , [  ] , 'Blade scything across inside' ],
      [ 1 , [  ] , 'Poisonous insects or reptiles living inside container' ],
      [ 1 , [  ] , 'Gas released by opening container' ],
      [ 1 , [  ] , 'Trapdoor opening in front of container' ],
      [ 1 , [  ] , 'Trapdoor opening 6\' in front of container' ],
      [ 1 , [  ] , 'Stone block dropping in front of the container' ],
      [ 1 , [  ] , 'Spears released from walls when container opened' ],
      [ 1 , [  ] , 'Explosive runes' ],
      [ 1 , [  ] , 'Symbol' ],
    ];
    
    addTableOptions(t, options);
  };
  
  var initTableTreasureIsHiddenByIn = function()
  {
    var t = tables.tableTreasureIsHiddenByIn;
    
    var options =
    [
      [ 3 , [  ] , 'Invisibility' ],
      [ 2 , [  ] , 'Illusion (to change or hide appearance)' ],
      [ 1 , [  ] , 'Secret space under container' ],
      [ 2 , [  ] , 'Secret compartment in container' ],
      [ 1 , [  ] , 'Inside ordinary item in plain view' ],
      [ 1 , [  ] , 'Disguised to appear as something else' ],
      [ 1 , [  ] , 'Under a heap of trash/dung' ],
      [ 2 , [  ] , 'Under a loose stone in the floor' ],
      [ 2 , [  ] , 'Behind a loose stone in the wall' ],
      [ 5 , [  ] , 'In a secret room nearby' ],
    ];
    
    addTableOptions(t, options);
  };
  
  var initTableStairs = function()
  {
    var t = tables.tableStairs;
    
    var options =
    [
      [ 5 , [  ] , 'Down 1 level*' ],
      [ 1 , [  ] , 'Down 2 levels**' ],
      [ 1 , [  ] , 'Down 3 levels***' ],
      [ 1 , [  ] , 'Up 1 level' ],
      [ 1 , [  ] , 'Up dead end (1 in 6 chance to chute down 2 levels)' ],
      [ 1 , [  ] , 'Down dead end (1 in 6 chance to chute down 1 level)' ],
      [ 1 , [  ] , 'Chimney up 1 level, passage continues, check again in 30\'' ],
      [ 1 , [  ] , 'Chimney up 2 levels, passage continues, check again in 30\'' ],
      [ 1 , [  ] , 'Chimney down 2 levels, passage continues, check again in 30\'' ],
      [ 3 , [  ] , 'Trap door down 1 level, passage continues, check again in 30\'' ],
      [ 1 , [  ] , 'Trap door down 2 levels, passage continues, check again in 30\'' ],
      [ 3 , [ tables.tableChamberShapeAndSize ] , 'Up 1 then down 2 (total down 1), chamber at end (roll on TABLE V.)' ],
    ];
    
    addTableOptions(t, options);
    
    t.addFootnote('* 1 in 20 has a door which closes egress for the day.');
    t.addFootnote('** 2 in 20 has a door which closes egress for the day.');
    t.addFootnote('*** 3 in 20 has a door which closes egress for the day.');
    t.addFootnote('N.B. Check for such doors only after descending steps if playing solo!');
  };
  
  var initTableTrickTrap = function()
  {
    var t = tables.tableTrickTrap;
    
    var options =
    [
      [ 5 , [  ] , 'Secret Door unless unlocated: Non-elf locates 3 in 20, elf locates 5 in 20, magical device locates 18 in 20 (then see TABLE II.). Unlocated secret doors go to die 6,7 below.' ],
      [ 2 , [  ] , 'Pit, 10\' deep, 3 in 6 to fall in.' ],
      [ 1 , [  ] , 'Pit, 10\' deep with spikes, 3 in 6 to fall in.' ],
      [ 1 , [  ] , '20\' x 20\' elevator room (party has entered door directly ahead and is in room), descends 1 level and will not ascend for 30 turns.' ],
      [ 1 , [  ] , 'As 9. above, but room descends 2 levels.' ],
      [ 1 , [  ] , 'As 9. above, but room descends 2-5 levels - 1 upon entering and 1 additional level each time an unsuccessful attempt at door opening is made, or until it descends as far as it can. This will not ascend for 60 turns. ' ],
      [ 1 , [  ] , 'Wall 10\' behind slides across passage blocking it for from 40-60 turns.' ],
      [ 1 , [  ] , 'Oil (equal to one flask) pours on random person from hole in ceiling, followed by flaming cinder (2-12 h.p. damage unless successful save vs. magic is made, which indicates only 1-3 h.p. damage).' ],
      [ 1 , [  ] , 'Pit, 10\' deep, 3 in 6 to fall in, pit walls move together to crush victim(s) in 2-5 rounds.' ],
      [ 1 , [  ] , 'Arrow trap, 1-3 arrows, 1 in 20 is poisoned.' ],
      [ 1 , [  ] , 'Spear trap, 1-3 spears, 1 in 20 is poisoned.' ],
      [ 1 , [  ] , 'Gas; party has detected it, but must breathe it to continue along corridor, as it covers 60\' ahead. Mark map accordingly regardless of turning back or not (See TABLE VII. A.)' ],
      [ 1 , [  ] , 'Door falls outward causing 1-10 hit points of damage to each person failing his saving throw versus petrification.' ],
      [ 1 , [  ] , 'Illusionary wall concealing 8. (pit) above (1-6), 20. (chute) below (7-10) or chamber with monster and treasure (11-20) (see TABLE V.).' ],
      [ 1 , [  ] , 'Chute down 1 level (cannot be ascended in any manner).' ],
    ];
    
    addTableOptions(t, options);
  };
  
  var initTableGas = function()
  {
    var t = tables.tableGas;
    
    var options =
    [
      [ 7 , [  ] , 'Only effect is to obscure vision when passing through.' ],
      [ 2 , [  ] , 'Blinds for 1-6 turns after passing through.' ],
      [ 3 , [  ] , 'Fear: run back 120\' feet unless saving throw versus magic is made.' ],
      [ 1 , [  ] , 'Sleep: party sound asleep for 2-12 turns (as sleep spell).' ],
      [ 5 , [  ] , 'Strength: adds 1-6 points of strength (as strength spell) to all fighters in party for 1 to 10 hours.' ],
      [ 1 , [  ] , 'Sickness: return to surface immediately.' ],
      [ 1 , [  ] , 'Poison: killed unless saving throw versus poison is made.' ],
    ];
    
    addTableOptions(t, options);
  };
  
  var initTableDungeonRandomMonsterLevel1 = function()
  {
    var t = tables.tableDungeonRandomMonsterLevel1;
    
    var options =
    [
      [ 16 , [ tables.tableMonsterLevel1 ] , 'I' ],
      [  3 , [ tables.tableMonsterLevel2 ] , 'II' ],
      [  1 , [ tables.tableMonsterLevel3 ] , 'III' ],
    ];
    
    addTableOptions(t, options);
  };
  
  var initTableMonsterLevel1 = function()
  {
    var t = tables.tableMonsterLevel1;
    
    var options =
    [
      [ 1 , [  ] , 'Ant, giant (1-4)' ],
      [ 1 , [  ] , 'Badger* (1-4)' ],
      [ 1 , [  ] , 'Beetle, fire (1-4)' ],
      [ 1 , [  ] , 'Demon, manes (1-4)' ],
      [ 1 , [  ] , 'Dwarf (4-14)' ],
      [ 1 , [  ] , 'Ear seeker (1)' ],
      [ 1 , [  ] , 'Elf (3-11)' ],
      [ 1 , [  ] , 'Gnome (5-15)' ],
      [ 1 , [  ] , 'Goblin (6-15)' ],
      [ 1 , [  ] , 'Halfling** (9-16)' ],
      [ 1 , [  ] , 'Hobgoblin (2-8)' ],
      [ 1 , [  ] , 'Human - see Human Subtable below' ],
      [ 1 , [  ] , 'Kobold (6-18)' ],
      [ 1 , [  ] , 'Orc (7-12)' ],
      [ 1 , [  ] , 'Piercer (1-3)' ],
      [ 1 , [  ] , 'Rat, giant (5-20)' ],
      [ 1 , [  ] , 'Rot grub (1-3)' ],
      [ 1 , [  ] , 'Shrieker (1-2)' ],
      [ 1 , [  ] , 'Skeleton (1-4)' ],
      [ 1 , [  ] , 'Zombie (1-3)' ],
    ];
    
    addTableOptions(t, options);
    
    t.addFootnote('* Not encountered below the 2nd level; treat as a roll of 29-33 (hobgoblin) thereafter.');
    t.addFootnote('* Not encountered below the 4th level; treat as a roll of 71-83 (Rat, giant) thereafter.');
  };
  
  var initTableMonsterLevel2 = function()
  {
    var t = tables.tableMonsterLevel2;
    
    // TODO: Double-check these odds
    
    var options =
    [
      [  1 , [  ] , 'Badger, giant* (1-4)' ],
      [ 15 , [  ] , 'Centipede, giant (3-13)' ],
      [ 11 , [  ] , 'Character - see Character Subtable' ],
      [  2 , [  ] , 'Devil, lemure (2-5)' ],
      [  2 , [  ] , 'Gas spore (1-2)' ],
      [  7 , [  ] , 'Gnoll (4-10)' ],
      [  7 , [  ] , 'Piercer (1-4)' ],
      [ 12 , [  ] , 'Rat, giant (6-24)' ],
      [  2 , [  ] , 'Rot grub (1-4)' ],
      [ 12 , [  ] , 'Shrieker (1-3)' ],
      [  5 , [  ] , 'Stirge (5-15)' ],
      [ 10 , [  ] , 'Toad, giant (1-4)' ],
      [ 12 , [  ] , 'Troglodyte (2-8)' ],
    ];
    
    addTableOptions(t, options);
    
    t.addFootnote('* Not encountered below the 3rd level; treat as a roll of 32-38 (Gnoll) thereafter.');
  };
  
  var initTableMonsterLevel3 = function()
  {
    var t = tables.tableMonsterLevel3;
    
    var options =
    [
      [ 10 , [  ] , 'Beetle, boring (1-3)' ],
      [ 10 , [  ] , 'Bugbear (2-7)' ],
      [ 10 , [  ] , 'Character - see Character Subtable' ],
      [  2 , [  ] , 'Dragon - see Dragon Subtable below (1)' ],
      [  2 , [  ] , 'Fungi, violet (1-3)' ],
      [  6 , [  ] , 'Gelatinous cube (1)' ],
      [  5 , [  ] , 'Ghoul (1-4)' ],
      [  5 , [  ] , 'Lizard, giant (1-3)' ],
      [  4 , [  ] , 'Lycanthrope, wererat (2-5)' ],
      [  6 , [  ] , 'Ochre jelly (1)' ],
      [ 12 , [  ] , 'Ogre (1-3)' ],
      [  2 , [  ] , 'Piercer (2-5)' ],
      [  1 , [  ] , 'Rot Grub (1-4)' ],
      [  2 , [  ] , 'Shrieker (2-5)' ],
      [  6 , [  ] , 'Spider, huge (1-3)' ],
      [  9 , [  ] , 'Spider, large (2-5)' ],
      [  2 , [  ] , 'Tick, giant (1-3)' ],
      [  5 , [  ] , 'Weasel, giant (1-4)' ],
    ];
    
    addTableOptions(t, options);
  };
  
  var initTablePLACEHOLDER = function()
  {
    var t = tables.tablePLACEHOLDER;    
    
    t.addOption(new Option({ chanceUnits : 0 , activities  : [ {func: function(){return 'PLACEHOLDER: ' ;} } ] , text : '' }));    
    
    t.addFootnote('');

    t.addOption(new Option(
    {
      chanceUnits : 0,
      text        : 'TEMPLATE',
      activities  : 
      [
        { // comment
          context : tables.TEMPLATE, 
          func    : function(){return 'PLACEHOLDER: tables.TEMPLATE.roll';}
        } 
      ]
    }));
  
  };

  var initializeTables = function()
  {
    initTablePeriodicCheck();
    initTableDoorsLocation();
    initTableDoorsBeyond();
    initTableSidePassages();
    initTablePassageWidth();
    initTableSpecialPassage();
    initTableTurns();
    initTableChamberShapeAndSize();
    initTableRoomShapeAndSize();
    initTableUnusualShape();
    initTableUnusualSize();
    initTableNumberOfExits();
    initTableExitLocation();
    initTableExitDirection();
    initTableChamberOrRoomContents();
    initTableTreasure();
    initTableTreasureIsContainedIn();
    initTableTreasureIsGuardedBy();
    initTableTreasureIsHiddenByIn();
    initTableStairs();
    initTableTrickTrap();
    initTableGas();
    initTableDungeonRandomMonsterLevel1();
    initTableMonsterLevel1();
    initTableMonsterLevel2();
    initTableMonsterLevel3();
  };
  
}


// Testing in development

var logger = new bastion.ActivityLog();

var b  = new bastion.Bulwark();
//var p  = new bastion.Parameters();
var al = new bastion.ActivityLog();
var rq = new bastion.Request();
var rs = new bastion.Response();
var d  = rollDice(3,6);

var option1 = new Option({text:'placeholder option 1','chanceUnits':2,'activities':[{func:function(){return 'one';}},{func:function(){return 'two';}}]});
var option2 = new Option();
option2.setChanceUnits(2);
option2.setText('placeholder option 2');
option2.addActivity({func:function(){return 'three';}});
option2.addActivity({func:function(){return 'four';}});

var table =  new Table();
table.addOption(option1);
table.addOption(option2);

table.addOption(new Option(
{
  chanceUnits : 2,
  text        : 'Continue straight - check again in 60\' (this table)',
  activities  : [ { context:tables.tablePeriodicCheck, func:tables.tablePeriodicCheck.roll } ]
}));


initializeTables();