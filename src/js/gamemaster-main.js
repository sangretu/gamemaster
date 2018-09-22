/**
 * gamemaster-main.js
 *
 * Prototype main for Game Master.
 *
 * v0.1.0
 */

// left out of onload for scope
var gm       = new GameMaster();
var gmServer = new gm.server(gm);
var gmClient = new gm.client(gm, gmServer);

var sendCommand;

// console stuff
var session;
var testConsole;
  
// TODO: threw the window.onload thing in because of a stupid element reference...fix it. 
window.onload = function(e)
{ 

  gmServer.game = new GameMaster.Game.ADnD1E();

  // Some tests

  gmClient.enqueueCommand(gmClient.createCommand(GameMaster.ConsoleCommands.INIT));
  gmClient.enqueueCommand(gmClient.createCommand(GameMaster.ConsoleCommands.STATUS));
  gmClient.enqueueCommand(gmClient.createCommand(GameMaster.ConsoleCommands.ABOUT));
  gmClient.enqueueCommand(gmClient.createCommand('roll 3d6'));
  //gmClient.enqueueCommand(gmClient.createCommand('another command')); // bogus command, see below

  gmClient.send(gmClient.commandQueue.dequeue());
  gmClient.send(gmClient.commandQueue.dequeue());
  gmClient.send(gmClient.commandQueue.dequeue());
  gmClient.send(gmClient.commandQueue.dequeue());

  gmServer.process();
  gmServer.process();
  gmServer.process();
  gmServer.process();
  // TODO: handle edge cases like this (bogus command listed above)
  //gmServer.process();
  // and this (nothing to process)
  //gmServer.process();
  
  console.log(gmClient.responseQueue.dequeue());
  console.log(gmClient.responseQueue.dequeue());
  console.log(gmClient.responseQueue.dequeue());
  console.log(gmClient.responseQueue.dequeue());

  // for simplified and manual testing
  sendCommand = function(cmd)
  {
    gmClient.enqueueCommand(gmClient.createCommand(cmd));
    gmClient.send(gmClient.commandQueue.dequeue());
    gmServer.process();
  }

  // Stupid console stuff because its not well compartmentalized yet

    
  var initConsole = function()
  {
    testConsole = new Console();
    testConsole.setTitle('Console - D&D Tools');		
    results.appendChild(testConsole.getElement());
  }

  var createSession = function()
  {
    session = new Session();
    session.components.push(testConsole);
    
    session.initialize();
  }

  initConsole();
  createSession();
  session.run();

}
