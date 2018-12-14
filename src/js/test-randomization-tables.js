/**
 * test-randomization-tables.js
 *
 * Testing a new data structure and implementation approach for randomization
 * tables; separating data from logic to the degree feasible, and cementing
 * option actions as an array of functions.
 *
 * 2018-12-13
 */

// As a bare minimum to define a table, it needs a handle.

var RandomDungeonGeneration = {};

RandomDungeonGeneration.tables = 
{
  periodic_check                    : {},
  doors_location                    : {},
  doors_beyond                      : {},
  side_passages                     : {},
  passage_width                     : {},
  special_passage                   : {},
  turns                             : {},
  chamber_shape_and_size            : {},
  room_shape_and_size               : {},
  unusual_shape                     : {},
  unusual_size                      : {},
  number_of_exits                   : {},
  exit_location                     : {},
  exit_direction                    : {},
  chamber_or_room_contents          : {},
  treasure                          : {},
  treasure_is_contained_in          : {},
  treasure_is_guarded_by            : {},
  treasure_is_hidden_in             : {},
  stairs                            : {},
  trick_trap                        : {},
  gas                               : {},
  monster_level_at_dungeon_level_1  : {},
  monster_level_1                   : {},
  monster_level_2                   : {},
  monster_level_3                   : {},
};

RandomDungeonGeneration.activities = 
{  
  generate_passage_segment          : {},
  generate_door                     : {},
  generate_chamber                  : {},
  generate_room                     : {},
  generate_stairs                   : {},
};

var acts = RandomDungeonGeneration.activities;

acts.generate_passage_segment          .getFunction = function() { return function(x) { return 'placeholder action - generate_passage_segment' + x ; } };
acts.generate_door                     .getFunction = function() { return function(x) { return 'placeholder action - generate_door'            + x ; } };
acts.generate_chamber                  .getFunction = function() { return function(x) { return 'placeholder action - generate_chamber'         + x ; } };
acts.generate_room                     .getFunction = function() { return function(x) { return 'placeholder action - generate_room'            + x ; } };
acts.generate_stairs                   .getFunction = function() { return function(x) { return 'placeholder action - generate_stairs'          + x ; } };
  
var stub = RandomDungeonGeneration.tables;

stub.periodic_check                    .options = [
  { chanceUnits : 2  , activities : [] , text : 'Continue straight - check again in 60\' (this table)' },
  { chanceUnits : 3  , activities : [] , text : 'Door (see TABLE II.)' },
  { chanceUnits : 5  , activities : [] , text : 'Side Passage (see TABLE III.) - check again in 30` (this table)' },
  { chanceUnits : 3  , activities : [] , text : 'Passage Turns (see TABLE IV., check width on TABLE III.) - check again in 30\' (this table)' },
  { chanceUnits : 3  , activities : [] , text : 'Chamber (see TABLE V.) - check 30\' after leaving (this table)' },
  { chanceUnits : 1  , activities : [] , text : 'Stairs (see TABLE VI.)' },
  { chanceUnits : 1  , activities : [] , text : 'Dead End (walls left, right, and ahead can be checked for Secret Doors, see TABLE V.D., footnote)' },
  { chanceUnits : 1  , activities : [] , text : 'Trick/Trap (see TABLE VII.), passage continues - check again in 30\' (this table)' },
  { chanceUnits : 1  , activities : [] , text : 'Wandering Monster, check again immediately to see what lies ahead so direction of monster\'s approach can be determined.' },
];
stub.doors_location                    .options = [
  { chanceUnits : 6  , activities : [] , text : 'Left' },
  { chanceUnits : 6  , activities : [] , text : 'Right' },
  { chanceUnits : 8  , activities : [] , text : 'Ahead' },
];
stub.doors_beyond                      .options = [
  { chanceUnits : 4  , activities : [] , text : 'Parallel passage**, or 10\' x 10\' room if door is straight ahead' },
  { chanceUnits : 4  , activities : [] , text : 'Passage straight ahead' },
  { chanceUnits : 1  , activities : [] , text : 'Passage 45 degrees ahead/behind***' },
  { chanceUnits : 1  , activities : [] , text : 'Passage 45 degrees behind/ahead***' },
  { chanceUnits : 8  , activities : [] , text : 'Room (go to TABLE V.)' },
  { chanceUnits : 2  , activities : [] , text : 'Chamber (go to TABLE V.)' },
];
stub.side_passages                     .options = [
  { chanceUnits : 2  , activities : [] , text : 'left 90 degrees' },
  { chanceUnits : 2  , activities : [] , text : 'right 90 degrees' },
  { chanceUnits : 1  , activities : [] , text : 'left 45 degrees ahead' },
  { chanceUnits : 1  , activities : [] , text : 'right 45 degrees ahead' },
  { chanceUnits : 1  , activities : [] , text : 'left 45 degrees behind (left 135 degrees)' },
  { chanceUnits : 1  , activities : [] , text : 'right 45 degrees behind (right 135 degrees)' },
  { chanceUnits : 1  , activities : [] , text : 'left curve 45 degrees ahead' },
  { chanceUnits : 1  , activities : [] , text : 'right curve 45 degrees ahead' },
  { chanceUnits : 3  , activities : [] , text : 'passage "T"s' },
  { chanceUnits : 2  , activities : [] , text : 'passage "Y"s' },
  { chanceUnits : 4  , activities : [] , text : 'four-way intersection' },
  { chanceUnits : 1  , activities : [] , text : 'passage "X"s (if present passage is horizontal or vertical it forms a fifth passage into the "X")' },
];
stub.passage_width                     .options = [
  { chanceUnits : 12 , activities : [] , text : '10\'' },
  { chanceUnits : 4  , activities : [] , text : '20\'' },
  { chanceUnits : 1  , activities : [] , text : '30\'' },
  { chanceUnits : 1  , activities : [] , text : '5\'' },
  { chanceUnits : 2  , activities : [] , text : 'Special passage (TABLE III. B. below)' },
];
stub.special_passage                   .options = [
  { chanceUnits : 4  , activities : [] , text : '40\', columns down center' },
  { chanceUnits : 3  , activities : [] , text : '40\', double row of columns' },
  { chanceUnits : 3  , activities : [] , text : '50\', double row of columns' },
  { chanceUnits : 2  , activities : [] , text : '50\', columns 10\' right and left support 10\' wide upper galleries 20\' above*' },
  { chanceUnits : 3  , activities : [] , text : '10\' stream**' },
  { chanceUnits : 2  , activities : [] , text : '20\' river***' },
  { chanceUnits : 1  , activities : [] , text : '40\' river***' },
  { chanceUnits : 1  , activities : [] , text : '60\' river***' },
  { chanceUnits : 1  , activities : [] , text : '20\', chasm****' },
];
stub.turns                             .options = [
  { chanceUnits : 8  , activities : [] , text : 'left 90 degrees' },
  { chanceUnits : 1  , activities : [] , text : 'left 45 degrees ahead' },
  { chanceUnits : 1  , activities : [] , text : 'left 45 degrees behind (left 135 degrees)' },
  { chanceUnits : 8  , activities : [] , text : 'right 90 degrees' },
  { chanceUnits : 1  , activities : [] , text : 'right 45 degrees ahead' },
  { chanceUnits : 1  , activities : [] , text : 'right 45 degrees behind (right 135 degrees)' },
];
stub.chamber_shape_and_size            .options = [
  { chanceUnits : 2  , activities : [] , text : 'Square, 20\' x 20\'' },
  { chanceUnits : 2  , activities : [] , text : 'Square, 20\' x 20\'' },
  { chanceUnits : 2  , activities : [] , text : 'Square, 30\' x 30\'' },
  { chanceUnits : 2  , activities : [] , text : 'Square, 40\' x 40\'' },
  { chanceUnits : 2  , activities : [] , text : 'Rectangular, 20\' x 30\'' },
  { chanceUnits : 3  , activities : [] , text : 'Rectangular, 20\' x 30\'' },
  { chanceUnits : 2  , activities : [] , text : 'Rectangular, 30\' x 50\'' },
  { chanceUnits : 2  , activities : [] , text : 'Rectangular, 40\' x 60\'' },
  { chanceUnits : 3  , activities : [] , text : 'Unusual shape and size - see sub-tables below' },
];
stub.room_shape_and_size               .options = [
  { chanceUnits : 2  , activities : [] , text : 'Square, 10\' x 10\'' },
  { chanceUnits : 2  , activities : [] , text : 'Square, 20\' x 20\'' },
  { chanceUnits : 2  , activities : [] , text : 'Square, 30\' x 30\'' },
  { chanceUnits : 2  , activities : [] , text : 'Square, 40\' x 40\'' },
  { chanceUnits : 2  , activities : [] , text : 'Rectangular, 10\' x 20\'' },
  { chanceUnits : 3  , activities : [] , text : 'Rectangular, 20\' x 30\'' },
  { chanceUnits : 2  , activities : [] , text : 'Rectangular, 20\' x 40\'' },
  { chanceUnits : 2  , activities : [] , text : 'Rectangular, 30\' x 40\'' },
  { chanceUnits : 3  , activities : [] , text : 'Unusual shape and size - see sub-tables below' },
];
stub.unusual_shape                     .options = [
  { chanceUnits : 5  , activities : [] , text : 'Circular*' },
  { chanceUnits : 3  , activities : [] , text : 'Triangular' },
  { chanceUnits : 3  , activities : [] , text : 'Trapezoidal' },
  { chanceUnits : 2  , activities : [] , text : 'Odd-shaped**' },
  { chanceUnits : 2  , activities : [] , text : 'Oval' },
  { chanceUnits : 2  , activities : [] , text : 'Hexagonal' },
  { chanceUnits : 2  , activities : [] , text : 'Octogonal' },
  { chanceUnits : 1  , activities : [] , text : 'Cave' },
];
stub.unusual_size                      .options = [
  { chanceUnits : 3  , activities : [] , text : 'about 500 sq. ft.' },
  { chanceUnits : 3  , activities : [] , text : 'about 900 sq. ft.' },
  { chanceUnits : 2  , activities : [] , text : 'about 1,300 sq. ft.' },
  { chanceUnits : 2  , activities : [] , text : 'about 2,000 sq. ft.' },
  { chanceUnits : 2  , activities : [] , text : 'about 2,700 sq. ft.' },
  { chanceUnits : 2  , activities : [] , text : 'about 3,400 sq. ft.' },
  { chanceUnits : 6  , activities : [] , text : 'roll again and add result to 9-10 above (if another 15-20 repeat the process, doubling 9-10 above, and so on)' },
];
stub.number_of_exits                   .options = [
  { chanceUnits : 3  , activities : [] , text : 'up to 600\' : 1 , over 600\' : 2' },
  { chanceUnits : 3  , activities : [] , text : 'up to 600\' : 2 , over 600\' : 3' },
  { chanceUnits : 3  , activities : [] , text : 'up to 600\' : 3 , over 600\' : 4' },
  { chanceUnits : 3  , activities : [] , text : 'up to 1200\' : 0* , over 1200\' : 1' },
  { chanceUnits : 3  , activities : [] , text : 'up to 1600\' : 0* , over 1600\' : 1' },
  { chanceUnits : 3  , activities : [] , text : 'any size : 1-4(d4)' },
  { chanceUnits : 2  , activities : [] , text : 'any size : 1 - door in chamber, passage in room' },
];
stub.exit_location                     .options = [
  { chanceUnits : 7  , activities : [] , text : 'opposite wall' },
  { chanceUnits : 5  , activities : [] , text : 'left wall' },
  { chanceUnits : 5  , activities : [] , text : 'right wall' },
  { chanceUnits : 3  , activities : [] , text : 'same wall' },
];
stub.exit_direction                    .options = [
  { chanceUnits : 16 , activities : [] , text : 'straight ahead' },
  { chanceUnits : 2  , activities : [] , text : '45 degrees left/right*' },
  { chanceUnits : 2  , activities : [] , text : '45 degrees right/left*' },
];
stub.chamber_or_room_contents          .options = [
  { chanceUnits : 12 , activities : [] , text : 'Empty' },
  { chanceUnits : 2  , activities : [] , text : 'Monster only (determine on appropriate table from Appendix C: Random Monster Encounters, Dungeon Encounter Matrix).' },
  { chanceUnits : 3  , activities : [] , text : 'Monster and treasure (see TABLE V. G. below)' },
  { chanceUnits : 1  , activities : [] , text : 'Special*, or contains stairway up 1 level (1-5), up 2 levels (7-8), down 1 level (9-14), down 2 levels (15-19), or down 3 levels - 2 flights of stairs and a slanting passageway (20).' },
  { chanceUnits : 1  , activities : [] , text : 'Trick/Trap (see TABLE VII.' },
  { chanceUnits : 1  , activities : [] , text : 'Treasure (see TABLE V. G.)' },
];
stub.treasure                          .options = [
  { chanceUnits : 25 , activities : [] , text : '1,000 copper pieces/level' },
  { chanceUnits : 25 , activities : [] , text : '1,000 silver pieces/level' },
  { chanceUnits : 15 , activities : [] , text : '750 electrum pieces/level' },
  { chanceUnits : 15 , activities : [] , text : '250 gold pieces/level' },
  { chanceUnits : 10 , activities : [] , text : '100 platinum pieces/level' },
  { chanceUnits : 4  , activities : [] , text : '1-4 gems/level' },
  { chanceUnits : 3  , activities : [] , text : '1 piece jewelry/level' },
  { chanceUnits : 3  , activities : [] , text : 'Magic (roll once on Magic Items Table)' },
];
stub.treasure_is_contained_in          .options = [
  { chanceUnits : 2  , activities : [] , text : 'Bags' },
  { chanceUnits : 2  , activities : [] , text : 'Sacks' },
  { chanceUnits : 2  , activities : [] , text : 'Small Coffers' },
  { chanceUnits : 2  , activities : [] , text : 'Chests' },
  { chanceUnits : 2  , activities : [] , text : 'Huge Chests' },
  { chanceUnits : 2  , activities : [] , text : 'Pottery Jars' },
  { chanceUnits : 2  , activities : [] , text : 'Metal Urns' },
  { chanceUnits : 2  , activities : [] , text : 'Stone Containers' },
  { chanceUnits : 2  , activities : [] , text : 'Iron Trunks' },
  { chanceUnits : 2  , activities : [] , text : 'Loose' },
];
stub.treasure_is_guarded_by            .options = [
  { chanceUnits : 2  , activities : [] , text : 'Contact poison on container' },
  { chanceUnits : 2  , activities : [] , text : 'Contact poison on treasure' },
  { chanceUnits : 2  , activities : [] , text : 'Poisoned needles in lock' },
  { chanceUnits : 1  , activities : [] , text : 'Poisoned needles in handles' },
  { chanceUnits : 1  , activities : [] , text : 'Spring darts firing from front of container' },
  { chanceUnits : 1  , activities : [] , text : 'Sprint darts firing up from top of container' },
  { chanceUnits : 1  , activities : [] , text : 'Spring darts firing up from inside bottom of container' },
  { chanceUnits : 2  , activities : [] , text : 'Blade scything across inside' },
  { chanceUnits : 1  , activities : [] , text : 'Poisonous insects or reptiles living inside container' },
  { chanceUnits : 1  , activities : [] , text : 'Gas released by opening container' },
  { chanceUnits : 1  , activities : [] , text : 'Trapdoor opening in front of container' },
  { chanceUnits : 1  , activities : [] , text : 'Trapdoor opening 6\' in front of container' },
  { chanceUnits : 1  , activities : [] , text : 'Stone block dropping in front of the container' },
  { chanceUnits : 1  , activities : [] , text : 'Spears released from walls when container opened' },
  { chanceUnits : 1  , activities : [] , text : 'Explosive runes' },
  { chanceUnits : 1  , activities : [] , text : 'Symbol' },
];
stub.treasure_is_hidden_in             .options = [
  { chanceUnits : 3  , activities : [] , text : 'Invisibility' },
  { chanceUnits : 2  , activities : [] , text : 'Illusion (to change or hide appearance)' },
  { chanceUnits : 1  , activities : [] , text : 'Secret space under container' },
  { chanceUnits : 2  , activities : [] , text : 'Secret compartment in container' },
  { chanceUnits : 1  , activities : [] , text : 'Inside ordinary item in plain view' },
  { chanceUnits : 1  , activities : [] , text : 'Disguised to appear as something else' },
  { chanceUnits : 1  , activities : [] , text : 'Under a heap of trash/dung' },
  { chanceUnits : 2  , activities : [] , text : 'Under a loose stone in the floor' },
  { chanceUnits : 2  , activities : [] , text : 'Behind a loose stone in the wall' },
  { chanceUnits : 5  , activities : [] , text : 'In a secret room nearby' },
];
stub.stairs                            .options = [
  { chanceUnits : 5  , activities : [] , text : 'Down 1 level*' },
  { chanceUnits : 1  , activities : [] , text : 'Down 2 levels**' },
  { chanceUnits : 1  , activities : [] , text : 'Down 3 levels***' },
  { chanceUnits : 1  , activities : [] , text : 'Up 1 level' },
  { chanceUnits : 1  , activities : [] , text : 'Up dead end (1 in 6 chance to chute down 2 levels)' },
  { chanceUnits : 1  , activities : [] , text : 'Down dead end (1 in 6 chance to chute down 1 level)' },
  { chanceUnits : 1  , activities : [] , text : 'Chimney up 1 level, passage continues, check again in 30\'' },
  { chanceUnits : 1  , activities : [] , text : 'Chimney up 2 levels, passage continues, check again in 30\'' },
  { chanceUnits : 1  , activities : [] , text : 'Chimney down 2 levels, passage continues, check again in 30\'' },
  { chanceUnits : 3  , activities : [] , text : 'Trap door down 1 level, passage continues, check again in 30\'' },
  { chanceUnits : 1  , activities : [] , text : 'Trap door down 2 levels, passage continues, check again in 30\'' },
  { chanceUnits : 3  , activities : [] , text : 'Up 1 then down 2 (total down 1), chamber at end (roll on TABLE V.)' },
];
stub.trick_trap                        .options = [
  { chanceUnits : 5  , activities : [] , text : 'Secret Door unless unlocated: Non-elf locates 3 in 20, elf locates 5 in 20, magical device locates 18 in 20 (then see TABLE II.). Unlocated secret doors go to die 6,7 below.' },
  { chanceUnits : 2  , activities : [] , text : 'Pit, 10\' deep, 3 in 6 to fall in.' },
  { chanceUnits : 1  , activities : [] , text : 'Pit, 10\' deep with spikes, 3 in 6 to fall in.' },
  { chanceUnits : 1  , activities : [] , text : '20\' x 20\' elevator room (party has entered door directly ahead and is in room), descends 1 level and will not ascend for 30 turns.' },
  { chanceUnits : 1  , activities : [] , text : 'As 9. above, but room descends 2 levels.' },
  { chanceUnits : 1  , activities : [] , text : 'As 9. above, but room descends 2-5 levels - 1 upon entering and 1 additional level each time an unsuccessful attempt at door opening is made, or until it descends as far as it can. This will not ascend for 60 turns. ' },
  { chanceUnits : 1  , activities : [] , text : 'Wall 10\' behind slides across passage blocking it for from 40-60 turns.' },
  { chanceUnits : 1  , activities : [] , text : 'Oil (equal to one flask) pours on random person from hole in ceiling, followed by flaming cinder (2-12 h.p. damage unless successful save vs. magic is made, which indicates only 1-3 h.p. damage).' },
  { chanceUnits : 1  , activities : [] , text : 'Pit, 10\' deep, 3 in 6 to fall in, pit walls move together to crush victim(s) in 2-5 rounds.' },
  { chanceUnits : 1  , activities : [] , text : 'Arrow trap, 1-3 arrows, 1 in 20 is poisoned.' },
  { chanceUnits : 1  , activities : [] , text : 'Spear trap, 1-3 spears, 1 in 20 is poisoned.' },
  { chanceUnits : 1  , activities : [] , text : 'Gas; party has detected it, but must breathe it to continue along corridor, as it covers 60\' ahead. Mark map accordingly regardless of turning back or not (See TABLE VII. A.)' },
  { chanceUnits : 1  , activities : [] , text : 'Door falls outward causing 1-10 hit points of damage to each person failing his saving throw versus petrification.' },
  { chanceUnits : 1  , activities : [] , text : 'Illusionary wall concealing 8. (pit) above (1-6), 20. (chute) below (7-10) or chamber with monster and treasure (11-20) (see TABLE V.).' },
  { chanceUnits : 1  , activities : [] , text : 'Chute down 1 level (cannot be ascended in any manner).' },
];
stub.monster_level_at_dungeon_level_1  .options = [
  { chanceUnits : 16 , activities : [] , text : 'I' },
  { chanceUnits : 3  , activities : [] , text : 'II' },
  { chanceUnits : 1  , activities : [] , text : 'III' },
];
stub.monster_level_1                   .options = [
  { chanceUnits : 1  , activities : [] , text : 'Ant, giant (1-4)' },
  { chanceUnits : 1  , activities : [] , text : 'Badger* (1-4)' },
  { chanceUnits : 1  , activities : [] , text : 'Beetle, fire (1-4)' },
  { chanceUnits : 1  , activities : [] , text : 'Demon, manes (1-4)' },
  { chanceUnits : 1  , activities : [] , text : 'Dwarf (4-14)' },
  { chanceUnits : 1  , activities : [] , text : 'Ear seeker (1)' },
  { chanceUnits : 1  , activities : [] , text : 'Elf (3-11)' },
  { chanceUnits : 1  , activities : [] , text : 'Gnome (5-15)' },
  { chanceUnits : 1  , activities : [] , text : 'Goblin (6-15)' },
  { chanceUnits : 1  , activities : [] , text : 'Halfling** (9-16)' },
  { chanceUnits : 1  , activities : [] , text : 'Hobgoblin (2-8)' },
  { chanceUnits : 1  , activities : [] , text : 'Human - see Human Subtable below' },
  { chanceUnits : 1  , activities : [] , text : 'Kobold (6-18)' },
  { chanceUnits : 1  , activities : [] , text : 'Orc (7-12)' },
  { chanceUnits : 1  , activities : [] , text : 'Piercer (1-3)' },
  { chanceUnits : 1  , activities : [] , text : 'Rat, giant (5-20)' },
  { chanceUnits : 1  , activities : [] , text : 'Rot grub (1-3)' },
  { chanceUnits : 1  , activities : [] , text : 'Shrieker (1-2)' },
  { chanceUnits : 1  , activities : [] , text : 'Skeleton (1-4)' },
  { chanceUnits : 1  , activities : [] , text : 'Zombie (1-3)' },
];
stub.monster_level_2                   .options = [
  { chanceUnits : 1  , activities : [] , text : 'Badger, giant* (1-4)' },
  { chanceUnits : 15 , activities : [] , text : 'Centipede, giant (3-13)' },
  { chanceUnits : 11 , activities : [] , text : 'Character - see Character Subtable' },
  { chanceUnits : 2  , activities : [] , text : 'Devil, lemure (2-5)' },
  { chanceUnits : 2  , activities : [] , text : 'Gas spore (1-2)' },
  { chanceUnits : 7  , activities : [] , text : 'Gnoll (4-10)' },
  { chanceUnits : 7  , activities : [] , text : 'Piercer (1-4)' },
  { chanceUnits : 12 , activities : [] , text : 'Rat, giant (6-24)' },
  { chanceUnits : 2  , activities : [] , text : 'Rot grub (1-4)' },
  { chanceUnits : 12 , activities : [] , text : 'Shrieker (1-3)' },
  { chanceUnits : 5  , activities : [] , text : 'Stirge (5-15)' },
  { chanceUnits : 10 , activities : [] , text : 'Toad, giant (1-4)' },
  { chanceUnits : 12 , activities : [] , text : 'Troglodyte (2-8)' },
];
stub.monster_level_3                   .options = [
  { chanceUnits : 10 , activities : [] , text : 'Beetle, boring (1-3)' },
  { chanceUnits : 10 , activities : [] , text : 'Bugbear (2-7)' },
  { chanceUnits : 10 , activities : [] , text : 'Character - see Character Subtable' },
  { chanceUnits : 2  , activities : [] , text : 'Dragon - see Dragon Subtable below (1)' },
  { chanceUnits : 2  , activities : [] , text : 'Fungi, violet (1-3)' },
  { chanceUnits : 6  , activities : [] , text : 'Gelatinous cube (1)' },
  { chanceUnits : 5  , activities : [] , text : 'Ghoul (1-4)' },
  { chanceUnits : 5  , activities : [] , text : 'Lizard, giant (1-3)' },
  { chanceUnits : 4  , activities : [] , text : 'Lycanthrope, wererat (2-5)' },
  { chanceUnits : 6  , activities : [] , text : 'Ochre jelly (1)' },
  { chanceUnits : 12 , activities : [] , text : 'Ogre (1-3)' },
  { chanceUnits : 2  , activities : [] , text : 'Piercer (2-5)' },
  { chanceUnits : 1  , activities : [] , text : 'Rot Grub (1-4)' },
  { chanceUnits : 2  , activities : [] , text : 'Shrieker (2-5)' },
  { chanceUnits : 6  , activities : [] , text : 'Spider, huge (1-3)' },
  { chanceUnits : 9  , activities : [] , text : 'Spider, large (2-5)' },
  { chanceUnits : 2  , activities : [] , text : 'Tick, giant (1-3)' },
  { chanceUnits : 5  , activities : [] , text : 'Weasel, giant (1-4)' },
];

stub.periodic_check                    .options[0].activities = 
[
  function()
  {
    return RandomDungeonGeneration.activities.generate_passage_segment.getFunction()();
  }
];

stub.periodic_check                    .options[1].activities = 
[
  RandomDungeonGeneration.activities.generate_door.getFunction()
];

stub.periodic_check                    .options[2].activities = 
[
  function()
  {
    var generate_chamber = RandomDungeonGeneration.activities.generate_chamber.getFunction();
    var generate_stairs  = RandomDungeonGeneration.activities.generate_stairs .getFunction();
    
    var chamber = generate_chamber();
    var stairs  = generate_stairs(chamber);
    
    return stairs;
  }
];

// TODO: Here I am testing the ability to put together arbitrary logic using
// predefined activity functions and anything else I need within the context
// of an option's activities. This is important because I anticipate needing
// to pass results of one function (e.g., generate_room) into another
// (e.g., place_room_on_map) in numerous combinations; I need full flexibility
// while retaining some sort of structure and predictability.
//
// Not really sure where the objects being created by these functions should
// be defined, or if we need base classes for activity etc to be defined
// at this stage. I mean, maybe? If I'm creating objects and not just storing
// raw data here? At least I stuck with the function call to obtain member
// data, I feel like that's a major design strength I don't want to give up
// pretty much anywhere I don't have to. Look out for those context gotchas
// though.
//
// Next step is maybe mapping out all the actual tables needed (I know I am
// missing some here, like the multiple sized room tables), and breaking
// down the activities called for by each. And. Every. Option.
//
// Feel free to use some placeholders, just be sure they are easily found
// and distinguished later.

var test_rt = function()
{
  var o = stub.periodic_check.options;
  
  for (var n in o)
  {
    var a = o[n].activities;
    
    for (var i in a)
    {
      console.log(a[i]());
    };
  };
};