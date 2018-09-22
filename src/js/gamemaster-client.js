/**
 * gamemaster-client.js
 *
 * Prototype client for Game Master.
 *
 * v0.1.0
 */

GameMaster.prototype.client = function(core, server)
{
  this.core = core; // TODO: hack for local mode, change later
  this.clientId = UUIDv4();
  this.server = server;
  this.commandQueue = new GameMaster.CommandQueue();
  this.responseQueue = new GameMaster.CommandQueue(); // TODO: yeah yeah it says commandqueue, what of it...gonna consolidate them anyway
}

GameMaster.prototype.client.prototype =
{

  accept : function(foo)
  {
    var parsed = JSON.parse(foo);
    this.responseQueue.enqueue(parsed);
    // console.log('accepted "' + parsed.command + '"');
  },
  
  createCommand : function(foo)
  {
    var cmd = new GameMaster.CommandObject(
    {
      clientId : this.clientId,
      command  : foo
    })
    
    return cmd;
  },
  
  enqueueCommand : function(foo)
  {
    this.commandQueue.enqueue(foo);
  },
  
  send : function(foo)
  {
    var serialized = JSON.stringify(foo);
    
    this.server.accept(serialized);
    
    // console.log('sent "' + serialized + '"');
  }
}

// TODO: need a timing loop thing here to process objects in outgoing queue

// TODO: need an incoming queue for response objects

// Consider: use the same queue for both? Inbox and outbox or combined - whats the impact?
// Basically looking like both client and server might benefit from a common ancestor?