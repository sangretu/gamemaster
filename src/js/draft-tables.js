/**
 * draft-tables.js
 *
 * Trying out a new concept for randomization tables. Details are in "notes - tables.txt"
 *
 * 2018-11-06
 */

// A single option from a single randomization table.
// Chances is an integer value representing the number
// of chance units this option has. Result is a function
// which can be invoked to retrieve the value of the
// option.
//
// The subresults parameters are additional tables
// which are called as a result of this option being
// generated, and are appended to the result.
TableOption = function(chances, result, ...subresults)
{
  this.chances    = chances;
  this.result     = result;
  this.subresults = subresults;
};
 
// A randomization table.
Table = function(name)
{
  this.name      = name || '';
  this.options   = [];
  this.footnotes = [];
  
  // Because some functions can be called out of context (roll)
  // TODO: This is probably not the best way to solve this problem.
  // Also, loops cause problems because of the way
  // these objects are being created.
  this.subroll = this.roll.bind(this);
};

// Add an option to the table.
Table.prototype.setName = function(name)
{
  this.name = name;
};

// Add an option to the table.
Table.prototype.add = function(option)
{
  this.options.push(option);
};

// Add an option to the table.
Table.prototype.addFootnote = function(footnote)
{
  this.footnotes.push(footnote);
};

Table.prototype.chanceUnits = function()
{
  var sum = 0;
  
  for (i in this.options)
  {
    var option = this.options[i];
    sum += option.chances;
  };
  
  return sum;
};

// Get a printable representation of the table
Table.prototype.list = function()
{
  var listing = '[' + this.name + ']\n';
  
  for (var i in this.options)
  {
    var option = this.options[i];
    // TODO: handle non-string results ... like subtables
    listing += option.chances + '\t' + option.result() + '\n';
  };
  
  for (var i in this.footnotes)
  {
    var footnote = this.footnotes[i];
    // TODO: handle non-string results ... like subtables
    listing += footnote + '\n';
  };
  
  return listing;
};

// Roll on the table
Table.prototype.roll = function()
{
  // TODO: Uses temporary manual testing feature, convert to proper version
  sendCommand('roll 1d' + this.chanceUnits());
  // TODO: This assumes synchronous operation I think, which is not the model
  var diceResult = gmClient.responseQueue.dequeue().resultText;
  var sum = 0;
  var option = null;
  
  for (var i in this.options)
  {
    option = this.options[i];
    // TODO: Include applicable footnotes
    sum += option.chances;
    if (sum >= diceResult) break;
  };
  
  var result = '[' + diceResult + '] : ' + option.result();
  
  // Generate subresults if appropriate
  
  var subresult = null;
  
  for (var i in option.subresults)
  {
    subresult = option.subresults[i]();
    // TODO: could use indications of what the subresult represents
    // (table metadata).
    result += '\n( ' + subresult + ' )';
  };
  
  return result;
};

/* [TESTING] */

var tables = 
{
  tablePeriodicCheck              : new Table(),
  tableDoorsLocation              : new Table(),
  tableDoorsBeyond                : new Table(),
  tableSidePassages               : new Table(),
  tablePassageWidth               : new Table(),
  tableSpecialPassage             : new Table(),
  tableTurns                      : new Table(),
  tableChamberShapeAndSize        : new Table(),
  tableRoomShapeAndSize           : new Table(),
  tableUnusualShape               : new Table(),
  tableUnusualSize                : new Table(),
  tableNumberOfExits              : new Table(),
  tableExitLocation               : new Table(),
  tableExitDirection              : new Table(),
  tableChamberOrRoomContents      : new Table(),
  tableTreasure                   : new Table(),
  tableTreasureIsContainedIn      : new Table(),
  tableTreasureIsGuardedBy        : new Table(),
  tableTreasureIsHiddenByIn       : new Table(),
  tableStairs                     : new Table(),
  tableTrickTrap                  : new Table(),
  tableGas                        : new Table(),
  tableDungeonRandomMonsterLevel1 : new Table(),
  tableMonsterLevel1              : new Table(),
  tableMonsterLevel2              : new Table(),
  tableMonsterLevel3              : new Table(),
};

var testTables = function()
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
  
  for (var i in tables)
  {
    console.log(tables[i].list());
  };
};

var initTablePeriodicCheck = function()
{
  // TODO: This is totally cheating
  if (tables.tablePeriodicCheck.name != '') return tables.tablePeriodicCheck;
  tables.tablePeriodicCheck.setName('TABLE I.: Periodic check (d20)');
  
  var thisTable = tables.tablePeriodicCheck;
  
  thisTable.add(new TableOption( 2 , function(){return 'Continue straight - check again in 60\' (this table)';                                        }, tables.tablePeriodicCheck.subroll ));
  thisTable.add(new TableOption( 3 , function(){return 'Door (see TABLE II.)';                                                                        }, tables.tableDoorsLocation.subroll ));
  thisTable.add(new TableOption( 5 , function(){return 'Side Passage (see TABLE III.) - check again in 30\` (this table)';                            }, tables.tableSidePassages.subroll , tables.tablePeriodicCheck.subroll));
  thisTable.add(new TableOption( 3 , function(){return 'Passage Turns (see TABLE IV., check width on TABLE III.) - check again in 30\' (this table)'; }, tables.tableTurns.subroll , tables.tablePeriodicCheck.subroll));
  thisTable.add(new TableOption( 3 , function(){return 'Chamber (see TABLE V.) - check 30\' after leaving (this table)';                              }, tables.tableChamberShapeAndSize.subroll ));
  thisTable.add(new TableOption( 1 , function(){return 'Stairs (see TABLE VI.)';                                                                      }, tables.tableStairs.subroll ));
  thisTable.add(new TableOption( 1 , function(){return 'Dead End (walls left, right, and ahead can be checked for Secret Doors, see TABLE V.D., footnote)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Trick/Trap (see TABLE VII.), passage continues - check again in 30\' (this table)';           } , tables.tableTrickTrap.subroll, tables.tablePeriodicCheck.subroll));
  thisTable.add(new TableOption( 1 , function(){return 'Wandering Monster, check again immediately to see what lies ahead so direction of monster\'s approach can be determined.';} , tables.tableDungeonRandomMonsterLevel1.subroll , tables.tablePeriodicCheck.subroll));
  
  return thisTable;
};

var initTableDoorsLocation = function()
{
  // TODO: This is totally cheating
  if (tables.tableDoorsLocation.name != '') return tables.tableDoorsLocation;
  tables.tableDoorsLocation.setName('TABLE II.: Doors (d20), Location of Door:');
  
  var thisTable = tables.tableDoorsLocation;
  
  thisTable.add(new TableOption( 6 , function(){return 'Left'; } ));
  thisTable.add(new TableOption( 6 , function(){return 'Right';} ));
  thisTable.add(new TableOption( 8 , function(){return 'Ahead';} ));
  
  return thisTable;
};

var initTableDoorsBeyond = function()
{
  // TODO: This is totally cheating
  if (tables.tableDoorsBeyond.name != '') return tables.tableDoorsBeyond;
  tables.tableDoorsBeyond.setName('TABLE II.: Doors* (d20), Space Beyond Door is:');
  
  var thisTable = tables.tableDoorsBeyond;
  
  thisTable.add(new TableOption( 4 , function(){return 'Parallel passage**, or 10\' x 10\' room if door is straight ahead'; } , tables.tablePassageWidth.subroll ));
  thisTable.add(new TableOption( 4 , function(){return 'Passage straight ahead';                                            } , tables.tablePassageWidth.subroll ));
  thisTable.add(new TableOption( 1 , function(){return 'Passage 45 degrees ahead/behind***';                                } , tables.tablePassageWidth.subroll ));
  thisTable.add(new TableOption( 1 , function(){return 'Passage 45 degrees behind/ahead***';                                } , tables.tablePassageWidth.subroll ));
  thisTable.add(new TableOption( 8 , function(){return 'Room (go to TABLE V.)';                                             } , tables.tableRoomShapeAndSize.subroll));
  thisTable.add(new TableOption( 2 , function(){return 'Chamber (go to TABLE V.)';                                          } , tables.tableChamberShapeAndSize.subroll ));
  
  thisTable.addFootnote('Always check width of passage (TABLE III. A.');
  thisTable.addFootnote('* Check again immediately on TABLE I. unless door is straight ahead; if another door is not indicated, then ignore the result and check again 30\' past the door. If a room or chamber is beyond a door, go to TABLE V.');
  thisTable.addFootnote('** Extends 30\' in both directions.');
  thisTable.addFootnote('*** The direction will be appropriate to existing circumstances, but use the direction before the slash in preference to the other.');
  
  return thisTable;
};

var initTableSidePassages = function()
{
  // TODO: This is totally cheating
  if (tables.tableSidePassages.name != '') return tables.tableSidePassages;
  tables.tableSidePassages.setName('Table III.: Side Passages (d20)');
  
  var thisTable = tables.tableSidePassages;
    
  thisTable.add(new TableOption( 2 , function(){return 'left 90 degrees';                             } , tables.tablePassageWidth.subroll ));
  thisTable.add(new TableOption( 2 , function(){return 'right 90 degrees';                            } , tables.tablePassageWidth.subroll ));
  thisTable.add(new TableOption( 1 , function(){return 'left 45 degrees ahead';                       } , tables.tablePassageWidth.subroll ));
  thisTable.add(new TableOption( 1 , function(){return 'right 45 degrees ahead';                      } , tables.tablePassageWidth.subroll ));
  thisTable.add(new TableOption( 1 , function(){return 'left 45 degrees behind (left 135 degrees)';   } , tables.tablePassageWidth.subroll ));
  thisTable.add(new TableOption( 1 , function(){return 'right 45 degrees behind (right 135 degrees)'; } , tables.tablePassageWidth.subroll ));
  thisTable.add(new TableOption( 1 , function(){return 'left curve 45 degrees ahead';                 } , tables.tablePassageWidth.subroll ));
  thisTable.add(new TableOption( 1 , function(){return 'right curve 45 degrees ahead';                } , tables.tablePassageWidth.subroll ));
  thisTable.add(new TableOption( 3 , function(){return 'passage "T"s';                                } , tables.tablePassageWidth.subroll ));
  thisTable.add(new TableOption( 2 , function(){return 'passage "Y"s';                                } , tables.tablePassageWidth.subroll ));
  thisTable.add(new TableOption( 4 , function(){return 'four-way intersection';                       } , tables.tablePassageWidth.subroll ));
  thisTable.add(new TableOption( 1 , function(){return 'passage "X"s (if present passage is horizontal or vertical it forms a fifth passage into the "X")';}, tables.tablePassageWidth.subroll ));
  
  return thisTable;
};

var initTablePassageWidth = function()
{
  // TODO: This is totally cheating
  if (tables.tablePassageWidth.name != '') return tables.tablePassageWidth;
  tables.tablePassageWidth.setName('TABLE III. A.: Passage Width (d20)');
  
  var thisTable = tables.tablePassageWidth;
  
  thisTable.add(new TableOption( 12 , function(){return '10\'';} ));
  thisTable.add(new TableOption(  4 , function(){return '20\'';} ));
  thisTable.add(new TableOption(  1 , function(){return '30\'';} ));
  thisTable.add(new TableOption(  1 , function(){return '5\'';} ));
  thisTable.add(new TableOption(  2 , function(){return 'Special passage (TABLE III. B. below)';} , tables.tableSpecialPassage.subroll ));
  
  return thisTable;
};

var initTableSpecialPassage = function()
{
  // TODO: This is totally cheating
  if (tables.tableSpecialPassage.name != '') return tables.tableSpecialPassage;
  tables.tableSpecialPassage.setName('TABLE III. B.: Special Passage (d20)');
  
  var thisTable = tables.tableSpecialPassage;
  
  thisTable.add(new TableOption( 4 , function(){return '40\', columns down center';} ));
  thisTable.add(new TableOption( 3 , function(){return '40\', double row of columns';} ));
  thisTable.add(new TableOption( 3 , function(){return '50\', double row of columns';} ));
  thisTable.add(new TableOption( 2 , function(){return '50\', columns 10\' right and left support 10\' wide upper galleries 20\' above*';} ));
  thisTable.add(new TableOption( 3 , function(){return '10\' stream**';} ));
  thisTable.add(new TableOption( 2 , function(){return '20\' river***';} ));
  thisTable.add(new TableOption( 1 , function(){return '40\' river***';} ));
  thisTable.add(new TableOption( 1 , function(){return '60\' river***';} ));
  thisTable.add(new TableOption( 1 , function(){return '20\', chasm****';} ));
  
  thisTable.addFootnote('* Stairs up to gallery will be at end of passage (1-15) or at beginning (16-20). In the former case if a stairway is indicated in or adjacent to the passage it will replace the end stairs 50% (1-10) of the time and supplement 50% (11-20) of the time.');
  thisTable.addFootnote('** Streams bisect the passage. They will be bridged 75% (1-15) of the time and be an obstacle 25% (16-20) of the time.');
  thisTable.addFootnote('*** Rivers bisect the passage. They will be bridged 50% (1-10) of the time, have a boat 25% (11-15) of the time (50% chance for either bank), and be an obstacle 25% of the time.');
  thisTable.addFootnote('**** Chasms bisect the passage. They are 150\' to 200\' deep. They will be bridged 50% (1-10) of the time, have a jumping place 5\'-10\' wide 25% (11-15) of the time, and be an obstacle 25% (16-20) of the time.');
  
  return thisTable;
};

var initTableTurns = function()
{
  // TODO: This is totally cheating
  if (tables.tableTurns.name != '') return tables.tableTurns;
  tables.tableTurns.setName('TABLE IV.: Turns (d20)');
  
  var thisTable = tables.tableTurns;
  
  thisTable.add(new TableOption( 8 , function(){return 'left 90 degrees';} ));
  thisTable.add(new TableOption( 1 , function(){return 'left 45 degrees ahead';} ));
  thisTable.add(new TableOption( 1 , function(){return 'left 45 degrees behind (left 135 degrees)';} ));
  thisTable.add(new TableOption( 8 , function(){return 'right 90 degrees';} ));
  thisTable.add(new TableOption( 1 , function(){return 'right 45 degrees ahead';} ));
  thisTable.add(new TableOption( 1 , function(){return 'right 45 degrees behind (right 135 degrees)';} ));
  
  return thisTable;
};

var initTableChamberShapeAndSize = function()
{
  // TODO: This is totally cheating
  if (tables.tableChamberShapeAndSize.name != '') return tables.tableChamberShapeAndSize;
  tables.tableChamberShapeAndSize.setName('TABLE V.: Chambers and Rooms Shape and Size (d20), Chamber Shape and Area');
  
  var thisTable = tables.tableChamberShapeAndSize;
  
  thisTable.add(new TableOption( 2 , function(){return 'Square, 20\' x 20\'';      } , tables.tableNumberOfExits.subroll , tables.tableChamberOrRoomContents.subroll ));
  thisTable.add(new TableOption( 2 , function(){return 'Square, 20\' x 20\'';      } , tables.tableNumberOfExits.subroll , tables.tableChamberOrRoomContents.subroll ));
  thisTable.add(new TableOption( 2 , function(){return 'Square, 30\' x 30\'';      } , tables.tableNumberOfExits.subroll , tables.tableChamberOrRoomContents.subroll ));
  thisTable.add(new TableOption( 2 , function(){return 'Square, 40\' x 40\'';      } , tables.tableNumberOfExits.subroll , tables.tableChamberOrRoomContents.subroll ));
  thisTable.add(new TableOption( 2 , function(){return 'Rectangular, 20\' x 30\''; } , tables.tableNumberOfExits.subroll , tables.tableChamberOrRoomContents.subroll ));
  thisTable.add(new TableOption( 3 , function(){return 'Rectangular, 20\' x 30\''; } , tables.tableNumberOfExits.subroll , tables.tableChamberOrRoomContents.subroll ));
  thisTable.add(new TableOption( 2 , function(){return 'Rectangular, 30\' x 50\''; } , tables.tableNumberOfExits.subroll , tables.tableChamberOrRoomContents.subroll ));
  thisTable.add(new TableOption( 2 , function(){return 'Rectangular, 40\' x 60\''; } , tables.tableNumberOfExits.subroll , tables.tableChamberOrRoomContents.subroll ));
  thisTable.add(new TableOption( 3 , function(){return 'Unusual shape and size - see sub-tables below';} , tables.tableUnusualShape.subroll , tables.tableUnusualSize.subroll , tables.tableNumberOfExits.subroll , tables.tableChamberOrRoomContents.subroll ));
  
  thisTable.addFootnote('Roll for Shape, Size, and Exits; then Contents, Treasure, and how the latter is contained, if applicable.');
  
  return thisTable;
};

var initTableRoomShapeAndSize = function()
{
  // TODO: This is totally cheating
  if (tables.tableRoomShapeAndSize.name != '') return tables.tableRoomShapeAndSize;
  tables.tableRoomShapeAndSize.setName('TABLE V.: Chambers and Rooms Shape and Size (d20), Room Shape and Area');
  
  var thisTable = tables.tableRoomShapeAndSize;
  
  thisTable.add(new TableOption( 2 , function(){return 'Square, 10\' x 10\'';      } , tables.tableNumberOfExits.subroll , tables.tableChamberOrRoomContents.subroll ));
  thisTable.add(new TableOption( 2 , function(){return 'Square, 20\' x 20\'';      } , tables.tableNumberOfExits.subroll , tables.tableChamberOrRoomContents.subroll ));
  thisTable.add(new TableOption( 2 , function(){return 'Square, 30\' x 30\'';      } , tables.tableNumberOfExits.subroll , tables.tableChamberOrRoomContents.subroll ));
  thisTable.add(new TableOption( 2 , function(){return 'Square, 40\' x 40\'';      } , tables.tableNumberOfExits.subroll , tables.tableChamberOrRoomContents.subroll ));
  thisTable.add(new TableOption( 2 , function(){return 'Rectangular, 10\' x 20\''; } , tables.tableNumberOfExits.subroll , tables.tableChamberOrRoomContents.subroll ));
  thisTable.add(new TableOption( 3 , function(){return 'Rectangular, 20\' x 30\''; } , tables.tableNumberOfExits.subroll , tables.tableChamberOrRoomContents.subroll ));
  thisTable.add(new TableOption( 2 , function(){return 'Rectangular, 20\' x 40\''; } , tables.tableNumberOfExits.subroll , tables.tableChamberOrRoomContents.subroll ));
  thisTable.add(new TableOption( 2 , function(){return 'Rectangular, 30\' x 40\''; } , tables.tableNumberOfExits.subroll , tables.tableChamberOrRoomContents.subroll ));
  thisTable.add(new TableOption( 3 , function(){return 'Unusual shape and size - see sub-tables below'; } , tables.tableUnusualShape.subroll , tables.tableUnusualSize.subroll , tables.tableNumberOfExits.subroll , tables.tableChamberOrRoomContents.subroll ));
  
  thisTable.addFootnote('Roll for Shape, Size, and Exits; then Contents, Treasure, and how the latter is contained, if applicable.');  
  
  return thisTable;
};

var initTableUnusualShape = function()
{
  // TODO: This is totally cheating
  if (tables.tableUnusualShape.name != '') return tables.tableUnusualShape;
  tables.tableUnusualShape.setName('TABLE V. A.: Unusual Shape (d20)');
  
  var thisTable = tables.tableUnusualShape;
  
  thisTable.add(new TableOption( 5 , function(){return 'Circular*';} ));
  thisTable.add(new TableOption( 3 , function(){return 'Triangular';} ));
  thisTable.add(new TableOption( 3 , function(){return 'Trapezoidal';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Odd-shaped**';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Oval';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Hexagonal';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Octogonal';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Cave';} ));
  
  thisTable.addFootnote('* 1-5 has pool (see TABLE VIII. A. and C. if appropriate), 6-7 has well, 8-10 has shaft, and 10-20 is normal.');
  thisTable.addFootnote('** Draw what shape you desire or what will fit the map - it is a special shape if desired.');
  
  return thisTable;
};

var initTableUnusualSize = function()
{
  // TODO: This is totally cheating
  if (tables.tableUnusualSize.name != '') return tables.tableUnusualSize;
  tables.tableUnusualSize.setName('TABLE V. B.: Unusual Size (d20)');
  
  var thisTable = tables.tableUnusualSize;
  
  thisTable.add(new TableOption( 3 , function(){return 'about 500 sq. ft.';} ));
  thisTable.add(new TableOption( 3 , function(){return 'about 900 sq. ft.';} ));
  thisTable.add(new TableOption( 2 , function(){return 'about 1,300 sq. ft.';} ));
  thisTable.add(new TableOption( 2 , function(){return 'about 2,000 sq. ft.';} ));
  thisTable.add(new TableOption( 2 , function(){return 'about 2,700 sq. ft.';} ));
  thisTable.add(new TableOption( 2 , function(){return 'about 3,400 sq. ft.';} ));
  thisTable.add(new TableOption( 6 , function(){return 'roll again and add result to 9-10 above (if another 15-20 repeat the process, doubling 9-10 above, and so on)';} , tables.tableUnusualSize.subroll ));
  
  return thisTable;
};

var initTableNumberOfExits = function()
{
  // TODO: This is totally cheating
  if (tables.tableNumberOfExits.name != '') return tables.tableNumberOfExits;
  tables.tableNumberOfExits.setName('TABLE V. C.: Number of Exits (d20)');
  
  var thisTable = tables.tableNumberOfExits;

  // TODO: including max exits per room since there is currently no way to know room size ahead of calculating exits, fix this.
  thisTable.add(new TableOption( 3 , function(){return 'up to 600\' : 1 , over 600\' : 2';                } , tables.tableExitLocation.subroll , tables.tableExitLocation.subroll ));
  thisTable.add(new TableOption( 3 , function(){return 'up to 600\' : 2 , over 600\' : 3';                } , tables.tableExitLocation.subroll , tables.tableExitLocation.subroll , tables.tableExitLocation.subroll ));
  thisTable.add(new TableOption( 3 , function(){return 'up to 600\' : 3 , over 600\' : 4';                } , tables.tableExitLocation.subroll , tables.tableExitLocation.subroll , tables.tableExitLocation.subroll , tables.tableExitLocation.subroll ));
  thisTable.add(new TableOption( 3 , function(){return 'up to 1200\' : 0* , over 1200\' : 1';             } , tables.tableExitLocation.subroll , tables.tableExitLocation.subroll ));
  thisTable.add(new TableOption( 3 , function(){return 'up to 1600\' : 0* , over 1600\' : 1';             } , tables.tableExitLocation.subroll , tables.tableExitLocation.subroll ));
  thisTable.add(new TableOption( 3 , function(){return 'any size : 1-4(d4)';                              } , tables.tableExitLocation.subroll , tables.tableExitLocation.subroll , tables.tableExitLocation.subroll , tables.tableExitLocation.subroll , tables.tableExitLocation.subroll ));
  thisTable.add(new TableOption( 2 , function(){return 'any size : 1 - door in chamber, passage in room'; } , tables.tableExitLocation.subroll , tables.tableExitLocation.subroll ));
  
  thisTable.addFootnote('* Check once per 10\' for secret doors (see TABLE V. D., footnote).');

  return thisTable;
};

var initTableExitLocation = function()
{
  // TODO: This is totally cheating
  if (tables.tableExitLocation.name != '') return tables.tableExitLocation;
  tables.tableExitLocation.setName('TABLE V. D.: Exit Location (d20)');
  
  var thisTable = tables.tableExitLocation;
  
  thisTable.add(new TableOption( 7 , function(){return 'opposite wall'; } , tables.tableExitDirection.subroll ));
  thisTable.add(new TableOption( 5 , function(){return 'left wall';     } , tables.tableExitDirection.subroll ));
  thisTable.add(new TableOption( 5 , function(){return 'right wall';    } , tables.tableExitDirection.subroll ));
  thisTable.add(new TableOption( 3 , function(){return 'same wall';     } , tables.tableExitDirection.subroll ));
  
  thisTable.addFootnote('* If a passage or door is indicated in a wall where the space immediately beyond the wall has already been mapped, then the exit is either a secret door (1-5) or a one-way door (6-10) or it is in the opposite direction (11-20).');
  
  return thisTable;
};

var initTableExitDirection = function()
{
  // TODO: This is totally cheating
  if (tables.tableExitDirection.name != '') return tables.tableExitDirection;
  tables.tableExitDirection.setName('TABLE V. E.: Exit Direction (d20)');
  
  var thisTable = tables.tableExitDirection;

  thisTable.add(new TableOption( 16 , function(){return 'straight ahead';} ));
  thisTable.add(new TableOption(  2 , function(){return '45 degrees left/right*';} ));
  thisTable.add(new TableOption(  2 , function(){return '45 degrees right/left*';} ));
  
  thisTable.addFootnote('* The exit will be appropriate to existing circumstances, but use the direction before the slash in preference to the other.');

  return thisTable;
};

var initTableChamberOrRoomContents = function()
{
  // TODO: This is totally cheating
  if (tables.tableChamberOrRoomContents.name != '') return tables.tableChamberOrRoomContents;
  tables.tableChamberOrRoomContents.setName('TABLE V. F.: Chamber or Room Contents (d20)');
  
  var thisTable = tables.tableChamberOrRoomContents;
  
  thisTable.add(new TableOption( 12 , function(){return 'Empty';} ));
  thisTable.add(new TableOption(  2 , function(){return 'Monster only (determine on appropriate table from Appendix C: Random Monster Encounters, Dungeon Encounter Matrix).';} , tables.tableDungeonRandomMonsterLevel1.subroll ));
  thisTable.add(new TableOption(  3 , function(){return 'Monster and treasure (see TABLE V. G. below)';} , tables.tableDungeonRandomMonsterLevel1.subroll , tables.tableTreasure.subroll , tables.tableTreasure.subroll ));
  thisTable.add(new TableOption(  1 , function(){return 'Special*, or contains stairway up 1 level (1-5), up 2 levels (7-8), down 1 level (9-14), down 2 levels (15-19), or down 3 levels - 2 flights of stairs and a slanting passageway (20).';} ));
  thisTable.add(new TableOption(  1 , function(){return 'Trick/Trap (see TABLE VII.';} , tables.tableTrickTrap.subroll ));
  thisTable.add(new TableOption(  1 , function(){return 'Treasure (see TABLE V. G.)';} , tables.tableTreasure.subroll ));
  
  thisTable.addFootnote('* Determine by balance of level or put in what you desire; otherwise put in stairs as indicated.');
  
  return thisTable;
};

var initTableTreasure = function()
{
  // TODO: This is totally cheating
  if (tables.tableTreasure.name != '') return tables.tableTreasure;
  tables.tableTreasure.setName('TABLE V. G.: TREASURE* (d%)');
  
  var thisTable = tables.tableTreasure;
  
  thisTable.add(new TableOption( 25 , function(){return '1,000 copper pieces/level';              } , tables.tableTreasureIsContainedIn.subroll , tables.tableTreasureIsGuardedBy.subroll , tables.tableTreasureIsHiddenByIn.subroll ));
  thisTable.add(new TableOption( 25 , function(){return '1,000 silver pieces/level';              } , tables.tableTreasureIsContainedIn.subroll , tables.tableTreasureIsGuardedBy.subroll , tables.tableTreasureIsHiddenByIn.subroll ));
  thisTable.add(new TableOption( 15 , function(){return '750 electrum pieces/level';              } , tables.tableTreasureIsContainedIn.subroll , tables.tableTreasureIsGuardedBy.subroll , tables.tableTreasureIsHiddenByIn.subroll ));
  thisTable.add(new TableOption( 15 , function(){return '250 gold pieces/level';                  } , tables.tableTreasureIsContainedIn.subroll , tables.tableTreasureIsGuardedBy.subroll , tables.tableTreasureIsHiddenByIn.subroll ));
  thisTable.add(new TableOption( 10 , function(){return '100 platinum pieces/level';              } , tables.tableTreasureIsContainedIn.subroll , tables.tableTreasureIsGuardedBy.subroll , tables.tableTreasureIsHiddenByIn.subroll ));
  thisTable.add(new TableOption(  4 , function(){return '1-4 gems/level';                         } , tables.tableTreasureIsContainedIn.subroll , tables.tableTreasureIsGuardedBy.subroll , tables.tableTreasureIsHiddenByIn.subroll ));
  thisTable.add(new TableOption(  3 , function(){return '1 piece jewelry/level';                  } , tables.tableTreasureIsContainedIn.subroll , tables.tableTreasureIsGuardedBy.subroll , tables.tableTreasureIsHiddenByIn.subroll ));
  thisTable.add(new TableOption(  3 , function(){return 'Magic (roll once on Magic Items Table)'; } , tables.tableTreasureIsContainedIn.subroll , tables.tableTreasureIsGuardedBy.subroll , tables.tableTreasureIsHiddenByIn.subroll ));
  
  thisTable.addFootnote('* See also TABLES V. H. and I. or J.');
  
  return thisTable;
};

var initTableTreasureIsContainedIn = function()
{
  // TODO: This is totally cheating
  if (tables.tableTreasureIsContainedIn.name != '') return tables.tableTreasureIsContainedIn;
  tables.tableTreasureIsContainedIn.setName('TABLE V. H.: Treasure is Contained in* (d20)');
  
  var thisTable = tables.tableTreasureIsContainedIn;
  
  thisTable.add(new TableOption( 2 , function(){return 'Bags';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Sacks';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Small Coffers';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Chests';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Huge Chests';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Pottery Jars';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Metal Urns';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Stone Containers';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Iron Trunks';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Loose';} ));
  
  thisTable.addFootnote('* Go to TABLE V. I. on a roll of 1-8, TABLE V. J. on a 9-20 to determine protection if desired.');
  
  return thisTable;
};

var initTableTreasureIsGuardedBy = function()
{
  // TODO: This is totally cheating
  if (tables.tableTreasureIsGuardedBy.name != '') return tables.tableTreasureIsGuardedBy;
  tables.tableTreasureIsGuardedBy.setName('TABLE V. I.: Treasure is Guarded by (d20)');
  
  var thisTable = tables.tableTreasureIsGuardedBy;
  
  thisTable.add(new TableOption( 2 , function(){return 'Contact poison on container';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Contact poison on treasure';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Poisoned needles in lock';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Poisoned needles in handles';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Spring darts firing from front of container';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Sprint darts firing up from top of container';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Spring darts firing up from inside bottom of container';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Blade scything across inside';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Poisonous insects or reptiles living inside container';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Gas released by opening container';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Trapdoor opening in front of container';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Trapdoor opening 6\' in front of container';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Stone block dropping in front of the container';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Spears released from walls when container opened';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Explosive runes';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Symbol';} ));
  
  return thisTable;
};

var initTableTreasureIsHiddenByIn = function()
{
  // TODO: This is totally cheating
  if (tables.tableTreasureIsHiddenByIn.name != '') return tables.tableTreasureIsHiddenByIn;
  tables.tableTreasureIsHiddenByIn.setName('TABLE V. I.: Treasure is Guarded by (d20)');
  
  var thisTable = tables.tableTreasureIsHiddenByIn;
  
  thisTable.add(new TableOption( 3 , function(){return 'Invisibility';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Illusion (to change or hide appearance)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Secret space under container';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Secret compartment in container';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Inside ordinary item in plain view';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Disguised to appear as something else';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Under a heap of trash/dung';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Under a loose stone in the floor';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Behind a loose stone in the wall';} ));
  thisTable.add(new TableOption( 5 , function(){return 'In a secret room nearby';} ));
    
  return thisTable;
};

var initTableStairs = function()
{
  // TODO: This is totally cheating
  if (tables.tableStairs.name != '') return tables.tableStairs;
  tables.tableStairs.setName('undefined');
  
  var thisTable = tables.tableStairs;
  
  thisTable.add(new TableOption( 5 , function(){return 'Down 1 level*';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Down 2 levels**';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Down 3 levels***';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Up 1 level';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Up dead end (1 in 6 chance to chute down 2 levels)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Down dead end (1 in 6 chance to chute down 1 level)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Chimney up 1 level, passage continues, check again in 30\'';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Chimney up 2 levels, passage continues, check again in 30\'';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Chimney down 2 levels, passage continues, check again in 30\'';} ));
  thisTable.add(new TableOption( 3 , function(){return 'Trap door down 1 level, passage continues, check again in 30\'';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Trap door down 2 levels, passage continues, check again in 30\'';} ));
  thisTable.add(new TableOption( 3 , function(){return 'Up 1 then down 2 (total down 1), chamber at end (roll on TABLE V.)';} ));
  
  thisTable.addFootnote('* 1 in 20 has a door which closes egress for the day.');
  thisTable.addFootnote('** 2 in 20 has a door which closes egress for the day.');
  thisTable.addFootnote('*** 3 in 20 has a door which closes egress for the day.');
  thisTable.addFootnote('N.B. Check for such doors only after descending steps if playing solo!');
  
  return thisTable;
};

var initTableTrickTrap = function()
{
  // TODO: This is totally cheating
  if (tables.tableTrickTrap.name != '') return tables.tableTrickTrap;
  tables.tableTrickTrap.setName('undefined');
  
  var thisTable = tables.tableTrickTrap;
  
  thisTable.add(new TableOption( 5 , function(){return 'Secret Door unless unlocated: Non-elf locates 3 in 20, elf locates 5 in 20, magical device locates 18 in 20 (then see TABLE II.). Unlocated secret doors go to die 6,7 below.';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Pit, 10\' deep, 3 in 6 to fall in.';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Pit, 10\' deep with spikes, 3 in 6 to fall in.';} ));
  thisTable.add(new TableOption( 1 , function(){return '20\' x 20\' elevator room (party has entered door directly ahead and is in room), descends 1 level and will not ascend for 30 turns.';} ));
  thisTable.add(new TableOption( 1 , function(){return 'As 9. above, but room descends 2 levels.';} ));
  thisTable.add(new TableOption( 1 , function(){return 'As 9. above, but room descends 2-5 levels - 1 upon entering and 1 additional level each time an unsuccessful attempt at door opening is made, or until it descends as far as it can. This will not ascend for 60 turns. ';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Wall 10\' behind slides across passage blocking it for from 40-60 turns.';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Oil (equal to one flask) pours on random person from hole in ceiling, followed by flaming cinder (2-12 h.p. damage unless successful save vs. magic is made, which indicates only 1-3 h.p. damage).';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Pit, 10\' deep, 3 in 6 to fall in, pit walls move together to crush victim(s) in 2-5 rounds.';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Arrow trap, 1-3 arrows, 1 in 20 is poisoned.';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Spear trap, 1-3 spears, 1 in 20 is poisoned.';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Gas; party has detected it, but must breathe it to continue along corridor, as it covers 60\' ahead. Mark map accordingly regardless of turning back or not (See TABLE VII. A.)';} , tables.tableGas.subroll ));
  thisTable.add(new TableOption( 1 , function(){return 'Door falls outward causing 1-10 hit points of damage to each person failing his saving throw versus petrification.';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Illusionary wall concealing 8. (pit) above (1-6), 20. (chute) below (7-10) or chamber with monster and treasure (11-20) (see TABLE V.).';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Chute down 1 level (cannot be ascended in any manner).';} ));
  
  return thisTable;
};

var initTableGas = function()
{
  // TODO: This is totally cheating
  if (tables.tableGas.name != '') return tables.tableGas;
  tables.tableGas.setName('TABLE VII. A.: Gas Sub-Table (d20)');
  
  var thisTable = tables.tableGas;
  
  thisTable.add(new TableOption( 7 , function(){return 'Only effect is to obscure vision when passing through.';} ));
  thisTable.add(new TableOption( 2 , function(){return 'Blinds for 1-6 turns after passing through.';} ));
  thisTable.add(new TableOption( 3 , function(){return 'Fear: run back 120\' feet unless saving throw versus magic is made.';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Sleep: party sound asleep for 2-12 turns (as sleep spell).';} ));
  thisTable.add(new TableOption( 5 , function(){return 'Strength: adds 1-6 points of strength (as strength spell) to all fighters in party for 1 to 10 hours.';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Sickness: return to surface immediately.';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Poison: killed unless saving throw versus poison is made.';} ));
  
  return thisTable;
};

var initTableDungeonRandomMonsterLevel1 = function()
{
  // TODO: This is totally cheating
  if (tables.tableDungeonRandomMonsterLevel1.name != '') return tables.tableDungeonRandomMonsterLevel1;
  tables.tableDungeonRandomMonsterLevel1.setName('Dungeon Random Monster Level DeterminationMatrix (d20), dungeon level 1');
  
  var thisTable = tables.tableDungeonRandomMonsterLevel1;

  thisTable.add(new TableOption( 16 , function(){return 'I';   } , tables.tableMonsterLevel1.subroll ));
  thisTable.add(new TableOption(  3 , function(){return 'II';  } , tables.tableMonsterLevel2.subroll ));
  thisTable.add(new TableOption(  1 , function(){return 'III'; } , tables.tableMonsterLevel3.subroll ));
  
  return thisTable;
};

var initTableMonsterLevel1 = function()
{
  // TODO: This is totally cheating
  if (tables.tableMonsterLevel1.name != '') return tables.tableMonsterLevel1;
  tables.tableMonsterLevel1.setName('Monster Level I');
  
  var thisTable = tables.tableMonsterLevel1;
  
  thisTable.add(new TableOption( 1 , function(){return 'Ant, giant (1-4)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Badger* (1-4)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Beetle, fire (1-4)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Demon, manes (1-4)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Dwarf (4-14)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Ear seeker (1)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Elf (3-11)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Gnome (5-15)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Goblin (6-15)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Halfling** (9-16)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Hobgoblin (2-8)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Human - see Human Subtable below';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Kobold (6-18)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Orc (7-12)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Piercer (1-3)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Rat, giant (5-20)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Rot grub (1-3)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Shrieker (1-2)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Skeleton (1-4)';} ));
  thisTable.add(new TableOption( 1 , function(){return 'Zombie (1-3)';} ));
  
  thisTable.addFootnote('* Not encountered below the 2nd level; treat as a roll of 29-33 (hobgoblin) thereafter.');
  thisTable.addFootnote('* Not encountered below the 4th level; treat as a roll of 71-83 (Rat, giant) thereafter.');

  return thisTable;
};

var initTableMonsterLevel2= function()
{
  // TODO: This is totally cheating
  if (tables.tableMonsterLevel2.name != '') return tables.tableMonsterLevel2;
  tables.tableMonsterLevel2.setName('Monster Level II');
  
  var thisTable = tables.tableMonsterLevel2;
  // TODO: check these odds
  thisTable.add(new TableOption(  1 , function(){return 'Badger, giant* (1-4)';} ));
  thisTable.add(new TableOption( 15 , function(){return 'Centipede, giant (3-13)';} ));
  thisTable.add(new TableOption( 11 , function(){return 'Character - see Character Subtable';} ));
  thisTable.add(new TableOption(  2 , function(){return 'Devil, lemure (2-5)';} ));
  thisTable.add(new TableOption(  2 , function(){return 'Gas spore (1-2)';} ));
  thisTable.add(new TableOption(  7 , function(){return 'Gnoll (4-10)';} ));
  thisTable.add(new TableOption(  7 , function(){return 'Piercer (1-4)';} ));
  thisTable.add(new TableOption( 12 , function(){return 'Rat, giant (6-24)';} ));
  thisTable.add(new TableOption(  2 , function(){return 'Rot grub (1-4)';} ));
  thisTable.add(new TableOption( 12 , function(){return 'Shrieker (1-3)';} ));
  thisTable.add(new TableOption(  5 , function(){return 'Stirge (5-15)';} ));
  thisTable.add(new TableOption( 10 , function(){return 'Toad, giant (1-4)';} ));
  thisTable.add(new TableOption( 12 , function(){return 'Troglodyte (2-8)';} ));
  
  thisTable.addFootnote('* Not encountered below the 3rd level; treat as a roll of 32-38 (Gnoll) thereafter.');
  
  return thisTable;
};

var initTableMonsterLevel3 = function()
{
  // TODO: This is totally cheating
  if (tables.tableMonsterLevel3.name != '') return tables.tableMonsterLevel3;
  tables.tableMonsterLevel3.setName('Monster Level III');
  
  var thisTable = tables.tableMonsterLevel3;
  
  thisTable.add(new TableOption( 10 , function(){return 'Beetle, boring (1-3)';} ));
  thisTable.add(new TableOption( 10 , function(){return 'Bugbear (2-7)';} ));
  thisTable.add(new TableOption( 10 , function(){return 'Character - see Character Subtable';} ));
  thisTable.add(new TableOption(  2 , function(){return 'Dragon - see Dragon Subtable below (1)';} ));
  thisTable.add(new TableOption(  2 , function(){return 'Fungi, violet (1-3)';} ));
  thisTable.add(new TableOption(  6 , function(){return 'Gelatinous cube (1)';} ));
  thisTable.add(new TableOption(  5 , function(){return 'Ghoul (1-4)';} ));
  thisTable.add(new TableOption(  5 , function(){return 'Lizard, giant (1-3)';} ));
  thisTable.add(new TableOption(  4 , function(){return 'Lycanthrope, wererat (2-5)';} ));
  thisTable.add(new TableOption(  6 , function(){return 'Ochre jelly (1)';} ));
  thisTable.add(new TableOption( 12 , function(){return 'Ogre (1-3)';} ));
  thisTable.add(new TableOption(  2 , function(){return 'Piercer (2-5)';} ));
  thisTable.add(new TableOption(  1 , function(){return 'Rot Grub (1-4)';} ));
  thisTable.add(new TableOption(  2 , function(){return 'Shrieker (2-5)';} ));
  thisTable.add(new TableOption(  6 , function(){return 'Spider, huge (1-3)';} ));
  thisTable.add(new TableOption(  9 , function(){return 'Spider, large (2-5)';} ));
  thisTable.add(new TableOption(  2 , function(){return 'Tick, giant (1-3)';} ));
  thisTable.add(new TableOption(  5 , function(){return 'Weasel, giant (1-4)';} ));
  
  return thisTable;
};

var initTableTemplate = function()
{
  // TODO: This is totally cheating
  if (tables.foo.name != '') return tables.foo;
  tables.foo.setName('undefined');
  
  var thisTable = tables.foo;
  /*
  thisTable.add(new TableOption(  , function(){return '';} ));
  thisTable.add(new TableOption(  , function(){return '';} ));
  thisTable.add(new TableOption(  , function(){return '';} ));
  thisTable.add(new TableOption(  , function(){return '';} ));
  thisTable.add(new TableOption(  , function(){return '';} ));
  thisTable.add(new TableOption(  , function(){return '';} ));
  thisTable.add(new TableOption(  , function(){return '';} ));
  thisTable.add(new TableOption(  , function(){return '';} ));
  thisTable.add(new TableOption(  , function(){return '';} ));
  thisTable.add(new TableOption(  , function(){return '';} ));
  
  thisTable.addFootnote('');
  */
  return thisTable;
};