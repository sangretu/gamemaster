/**
 * gamemaster-server.js
 *
 * Prototype server for Game Master.
 *
 * v0.1.0
 */

GameMaster.prototype.server = function(core)
{
  this.core = core; // TODO: hack for local mode, change later
  this.commandQueue  = new GameMaster.CommandQueue();
  this.responseQueue = new GameMaster.CommandQueue(); // TODO: yeah yeah it says commandqueue, what of it...gonna consolidate them anyway
  
  this.clients =
  {
  }
}

GameMaster.prototype.server.prototype =
{ 

  accept : function(foo)
  {
    var parsed = JSON.parse(foo);
    this.commandQueue.enqueue(parsed);
    // console.log('accepted "' + parsed.command + '"');
  },

  createResponse : function(cmdObject, resultObject)
  {
    // Modifying the cmdObject probably isn't best but it works for now
    cmdObject.resultText = resultObject.resultText;
    cmdObject.resultData = resultObject.resultData;
  
    var r = new GameMaster.ResultObject(cmdObject);
    
    return r;
  },
  
  // Process the next command in the queue
  process : function(foo)
  {
    var cmd = this.commandQueue.dequeue();
    
    // TODO: naive parsing for standardization's sake, probly replace this with
    // something better later eh?
    
    cmd.arg = cmd.command.split(' ');
    
    // Console commands are "reserved" and thus parsed out first. It should not be
    // possible for a game to override them. It probably is, but it shouldn't be.
    
    // TODO: can switch this to cmd.arg[0] if you want to support parameters
    switch (cmd.command)
    {
      case GameMaster.ConsoleCommands.INIT:
        this.commandProcessors.INIT(cmd);
        break;
      case GameMaster.ConsoleCommands.HELP:
        this.commandProcessors.HELP(cmd);
        break;
      case GameMaster.ConsoleCommands.ABOUT:
        this.commandProcessors.ABOUT(cmd);
        break;
      case GameMaster.ConsoleCommands.STATUS:
        this.commandProcessors.STATUS(cmd);
        break;
      case GameMaster.ConsoleCommands.PING:
        this.commandProcessors.PING(cmd);
        break;
      default:
        // match non-console commands
        
        
        // TODO: super naive, no edge checks
        var gameCommandFunction = this.game.getCommand(cmd);
        
        if (typeof gameCommandFunction === 'function')
        {
          // Call the command function, passing arg[1]...arg[n]
          cmd.arg.shift(); // at this point we've lost arg[0]
          var response = gameCommandFunction.apply(this.game.Commands, cmd.arg);
          
          /*
          var shit =
          {
            resultText : response.success?response.result:response.message,
            resultData : response.success?response.rolls:0
          }
          */
          
          var r = this.createResponse(cmd, response);
          
          
          this.enqueueResponse(r);
          this.send(this.responseQueue.dequeue());
          //console.log(response);
        }
        
        // TODO: handle bogus commands
        //console.log('Unknown command : ' + cmd.command);
    }
    
    // console.log('processed "' + cmd.command + '"');
  },
  
  enqueueResponse : function(foo)
  {
    this.responseQueue.enqueue(foo);
  },
  
  send : function(foo)
  {
    var serialized = JSON.stringify(foo);
    
    // TODO: Ok here's where INIT comes in handy. For now we'll just have one client eh?
    this.clients[foo.clientId].accept(serialized);
    
    // console.log('sent "' + serialized + '"');
  }
  
}


GameMaster.prototype.server.prototype.commandProcessors =
{

  "INIT" : function(arg)
  {
    // console.log('processing init command');
    
    var info =
    {
      commandId  : arg.commandId,
      resultText : 'Initialization complete (simulated)',
      resultData : { op : 'init' }
    };
    
    // TODO: hack for local, change later.
    // TODO: Ok this is really really ugly and breaks all scope - something is wrong
    gmServer.clients[arg.clientId] = gmClient;
    
    // TODO: once again, scope breaking
    var r = gmServer.createResponse(arg, info);
    gmServer.enqueueResponse(r);
    gmServer.send(gmServer.responseQueue.dequeue());
  },
  
  "HELP" : function(arg)
  {
    // console.log('processing help command');
    
    var info =
    {
      commandId  : arg.commandId,
      resultText : 'Help complete (simulated)',
      resultData : { op : 'help' }
    };
    
    // TODO: hack for local, change later.
    // TODO: Ok this is really really ugly and breaks all scope - something is wrong
    gmServer.clients[arg.clientId] = gmClient;
    
    // TODO: once again, scope breaking
    var r = gmServer.createResponse(arg, info);
    gmServer.enqueueResponse(r);
    gmServer.send(gmServer.responseQueue.dequeue());
  },
  
  "ABOUT" : function(arg)
  {
    //console.log('processing about command');
    
    var info =
    {
      commandId  : arg.commandId,
      resultText : 'About complete (simulated)',
      resultData : { op : 'about' }
    };
    
    // TODO: hack for local, change later.
    // TODO: Ok this is really really ugly and breaks all scope - something is wrong
    gmServer.clients[arg.clientId] = gmClient;
    
    // TODO: once again, scope breaking
    var r = gmServer.createResponse(arg, info);
    gmServer.enqueueResponse(r);
    gmServer.send(gmServer.responseQueue.dequeue());
  },
  
  "STATUS" : function(arg)
  {
    //console.log('processing status command');
    
    var info =
    {
      commandId  : arg.commandId,
      resultText : 'Status complete (simulated)',
      resultData : { op : 'status' }
    };
    
    // TODO: hack for local, change later.
    // TODO: Ok this is really really ugly and breaks all scope - something is wrong
    gmServer.clients[arg.clientId] = gmClient;
    
    // TODO: once again, scope breaking
    var r = gmServer.createResponse(arg, info);
    gmServer.enqueueResponse(r);
    gmServer.send(gmServer.responseQueue.dequeue());
  },
  
  "PING" : function(arg)
  {
    // console.log('processing ping command');
    
    var info =
    {
      commandId  : arg.commandId,
      resultText : 'Ping complete (simulated)',
      resultData : { op : 'ping' }
    };
    
    // TODO: hack for local, change later.
    // TODO: Ok this is really really ugly and breaks all scope - something is wrong
    gmServer.clients[arg.clientId] = gmClient;
    
    // TODO: once again, scope breaking
    var r = gmServer.createResponse(arg, info);
    gmServer.enqueueResponse(r);
    gmServer.send(gmServer.responseQueue.dequeue());
  }
  
}

// TODO: need a timing loop thing here to process objects in queue, create response objects, etc