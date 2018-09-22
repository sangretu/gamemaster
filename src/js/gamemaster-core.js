/**
 * gamemaster-core.js
 *
 * Prototype core for Game Master.
 *
 * v0.1.0
 */

{ /* Utilities */

  // random UUID generator brought to you by https://gist.github.com/jed/982883
	UUIDv4 = function b(a)
  {
    return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)
  };

}

{ /* Classes (and class-level members) */

  { // GameMaster

    function GameMaster(params)
    {
    }

    GameMaster.prototype.foo = function(arg)
    {
    }

  }
  
  { // GameMaster.Game
  
    // Available core game rulesets
    GameMaster.Game = {};
  
  }
  
  { // GameMaster.Strings
  
    // Localizable strings ... defined in a separate file, referenced here just as a reminder.
    // TODO: architect localization
    GameMaster.Strings = {};
  
  }

  { // GameMaster.ConsoleCommands
  
    // List of default console command names and strings
    GameMaster.ConsoleCommands = 
    {
      'INIT'   : '~INIT',
      'HELP'   : '~HELP',
      'ABOUT'  : '~ABOUT',
      'STATUS' : '~STATUS',
      'PING'   : '~PING'
    }
    
  }

  { // GameMaster.CommandObject
  
    // Represents a command and its associated metadata
    GameMaster.CommandObject = function(arg)
    {
      this.commandId = UUIDv4();
      this.clientId  = arg.clientId;
      this.command   = arg.command;
    }
  
  }
  
  { // GameMaster.CommandQueue
  
    // For CommandObjects
    GameMaster.CommandQueue = function()
    {
      this.stack = [];
    }

    GameMaster.CommandQueue.prototype.enqueue = function(cmd)
    {
      this.stack.push(cmd);
    }

    GameMaster.CommandQueue.prototype.dequeue = function()
    {
      return this.stack.shift();
    }

  }
  
  { // GameMaster.ResultObject
    
    // Represents the results of an executed command
    GameMaster.ResultObject = function(arg)
    {
      this.resultId   = UUIDv4();
      this.clientId   = arg.clientId;
      this.commandId  = arg.commandId;
      this.resultText = arg.resultText;
      this.resultData = arg.resultData;
    }
    
  }

}