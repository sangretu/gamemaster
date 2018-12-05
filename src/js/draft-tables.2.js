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
    
    // This is a new Bulwark implementation (2018-12-04) that incorporates
    // some design ideas I came up with for the Gamemaster project, but it
    // is scoped in a fashion that should make it appropriate for other
    // efforts as well.
    var Bulwark = function()
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
    };
    
    // Naive but effective for now
    Bulwark.prototype.toString = function()
    {
      var result = '';
      result += 'Object of type Bulwark:\n';
      for (x in this.getMeta()) result += '  meta[' + x + '] = ' + this.getMeta()[x] + '\n';
      for (x in this.getData()) result += '  data[' + x + '] = ' + this.getData()[x] + '\n';
      
      return result;
    };
    
    // Data types...all children of Bulwark?
    
    var Parameters = function(parameters)
    {
      Bulwark.call(this);
      
      this.setMeta('className','Parameters');
      this.setMeta('classId', CLASS_ID_PARAMETERS);
      this.setMeta('instanceId', UUIDv4());
      this.setData(parameters);
    };
    
    Parameters.prototype = Object.create(Bulwark.prototype);
    
    var ActivityLog = function(parameters)
    {
      Bulwark.call(this);
      
      this.setMeta('className','ActivityLog');
      this.setMeta('classId', CLASS_ID_ACTIVITY_LOG);
      this.setMeta('instanceId', UUIDv4());
      this.setData([]);
    };
    
    ActivityLog.prototype = Object.create(Bulwark.prototype);
    
    ActivityLog.prototype.log = function(entry)
    {
      this.getData().push(entry);
    };
    
    var Request = function(parameters)
    {
      Bulwark.call(this);
      
      this.setMeta('className','Request');
      this.setMeta('classId', CLASS_ID_REQUEST);
      this.setMeta('instanceId', UUIDv4());
      this.setData([]);
    };
    
    Request.prototype = Object.create(Bulwark.prototype);
    
    var Response = function(parameters)
    {
      Bulwark.call(this);
      
      this.setMeta('className','Response');
      this.setMeta('classId', CLASS_ID_RESPONSE);
      this.setMeta('instanceId', UUIDv4());
      this.setData([]);
    };
    
    Response.prototype = Object.create(Bulwark.prototype);
    
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
      this.setData([]);
    }
    
    Map.prototype = Object.create(Bulwark.prototype);
  
  }

  { // Table
  
    var CLASS_ID_TABLE = "d45db882-509a-494d-bf48-c979b11db81d";

    Table = function(parameters)
    {
      // placeholder Table class
      Bulwark.call(this, parameters);
      
      this.setMeta('className','Table');
      this.setMeta('classId', CLASS_ID_TABLE);
      this.setMeta('instanceId', UUIDv4());
      this.setData([]);
    };

    Table.prototype = Object.create(Bulwark.prototype);

  }

  { // Option

    var CLASS_ID_OPTION = "f4f34ff5-d584-4021-917a-84a1ee725988";
    
    Option = function(parameters)
    {
      // placeholder Option class
      Bulwark.call(this, parameters);
      
      this.setMeta('className','Option');
      this.setMeta('classId', CLASS_ID_OPTION);
      this.setMeta('instanceId', UUIDv4());
      this.setData([]);
      
      var chanceUnits = 0;  // private
      
      this.getChanceUnits = function()
      {
        return chanceUnits;
      };
      
      this.setChanceUnits = function(units)
      {
        chanceUnits = units;
        return chanceUnits;
      };
      
      var activities  = []; // private
      
      this.getActivities = function()
      {
        return activities;
      };
      
      this.setActivities = function(activity)
      {
        activities.push(activity);
        return activities;
      };
      
      this.invoke = function()
      {
        var results = [];
        
        for (x in activities)
        {
          results.push(activities[x]());
        };
        
        return results;
      };
    };

    Option.prototype = Object.create(Bulwark.prototype);
    
    // Naive but effective for now
    Option.prototype.toString = function()
    {      
      //var result = Bulwark.toString.call(this);
      var result = Bulwark.prototype.toString.call(this);
      result += '  chanceUnits = ' + this.getChanceUnits() + '\n';
      for (x in this.getActivities()) result += '  activities[' + x + '] = ' + this.getActivities()[x] + '\n';
      
      return result;
    };

  }
    
    // <Testing>
    //
    var option = new Option();
    option.setChanceUnits(2);
    option.setActivities(function(){return 'one';});
    option.setActivities(function(){return 'two';});
    console.log('\n[OUTPUTTING OPTION]\n');
    console.log(option.toString());
    console.log('\n[INVOKING OPTION]\n');
    console.log(option.invoke());
    // </Testing> 

    // This appears to be working pretty well so far (good job, me!). I'd like
    // to have those activities returning result objects, with activity logs
    // and whatever other registered data type is appropriate to the given
    // option. Not sure if there's a good way to default that in the Option
    // class or if it just needs to be handled on option creation. If so,
    // the overhead of setting up tables is going to look uglier than I had
    // hoped, but still ... points for abstracting out as much as I did with
    // so little actual code!
    
    // Wait...am I maybe supposed to stick those private variables in the
    // data object? I think possibly I should, yeah.
    
    // TODO: Stick the private variables in the data object and see if that
    // works as desired. Then go back to trying to implement basic table
    // features.
    
    // More testing
    var table =  new Table();
    console.log('\n[OUTPUTTING TABLE]\n');
    console.log(table.toString());

}


// 20181203 STATUS
// These all seem to work; they don't do much other than create a Parameters
// instance which derives from Bulwark, but that's pretty much all I needed
// to get started anyway.
//
// Next I guess is to create the random dungeon generation object and start
// creating the table classes in there. Oh. And then work on the Option and
// Table parent classes, I suppose. Don't forget the initialize concept.