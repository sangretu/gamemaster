/**
 * test-terbtd.js
 *
 * Quick hack-in of tables from "Tricks, Empty Rooms, & Basic Trap Design"
 * by Courtney C. Campbell. Integrates with RandomDungeonGeneration object
 * defined in test-randomization-tables.js because that's the latest one
 * I've been tinkering with.
 *
 * 2018-12-30
 */

// As a bare minimum to define a table, it needs a handle.


var stub = RandomDungeonGeneration.tables;

stub.room_types                             = {};
stub.rooms_of_public_assembly               = {};
stub.rooms_of_containment_and_imprisonment  = {};
stub.rooms_of_pleasures_and_relaxation      = {};
stub.rooms_of_general_function              = {};
stub.rooms_of_war_and_conflict              = {};
stub.rooms_of_dieties_and_worship           = {};
stub.rooms_of_learning_and_knowledge        = {};
stub.rooms_of_specific_utility              = {};

stub.room_types                               .options = [
  { chanceUnits : 1  , activities : [] , text : 'Rooms of Public Assembly' },
  { chanceUnits : 1  , activities : [] , text : 'Rooms of Containment and Imprisonment' },
  { chanceUnits : 1  , activities : [] , text : 'Rooms of Pleasure and Relaxation' },
  { chanceUnits : 1  , activities : [] , text : 'Rooms of General Function' },
  { chanceUnits : 1  , activities : [] , text : 'Rooms of War and Conflict' },
  { chanceUnits : 1  , activities : [] , text : 'Rooms of Dieties and Worship' },
  { chanceUnits : 1  , activities : [] , text : 'Rooms of Learning and Knowledge' },
  { chanceUnits : 1  , activities : [] , text : 'Rooms of Specific Utility' },
];

stub.rooms_of_public_assembly                 .options = [
  { chanceUnits : 1  , activities : [] , text : 'Assemblage' },
  { chanceUnits : 2  , activities : [] , text : 'Antechamber' },
  { chanceUnits : 1  , activities : [] , text : 'Amphitheater' },
  { chanceUnits : 1  , activities : [] , text : 'Audience Hall' },
  { chanceUnits : 1  , activities : [] , text : 'Courtroom' },
  { chanceUnits : 1  , activities : [] , text : 'Great Hall' },
  { chanceUnits : 1  , activities : [] , text : 'Throne Room' },
];

stub.rooms_of_containment_and_imprisonment    .options = [
  { chanceUnits : 1  , activities : [] , text : 'Aviary' },
  { chanceUnits : 1  , activities : [] , text : 'Bestiary' },
  { chanceUnits : 1  , activities : [] , text : 'Cage' },
  { chanceUnits : 2  , activities : [] , text : 'Cell' },
  { chanceUnits : 1  , activities : [] , text : 'Kennel' },
  { chanceUnits : 1  , activities : [] , text : 'Oubliette' },
  { chanceUnits : 1  , activities : [] , text : 'Padded Room' },
  { chanceUnits : 1  , activities : [] , text : 'Pen' },
  { chanceUnits : 1  , activities : [] , text : 'Prison' },
  { chanceUnits : 1  , activities : [] , text : 'Stockade' },
  { chanceUnits : 1  , activities : [] , text : 'Zoo' },
];

stub.rooms_of_pleasures_and_relaxation        .options = [
  { chanceUnits : 1  , activities : [] , text : 'Arena' },
  { chanceUnits : 2  , activities : [] , text : 'Banquet' },
  { chanceUnits : 1  , activities : [] , text : 'Combat Pit' },
  { chanceUnits : 1  , activities : [] , text : 'Den' },
  { chanceUnits : 1  , activities : [] , text : 'Game Room' },
  { chanceUnits : 2  , activities : [] , text : 'Gallery' },
  { chanceUnits : 1  , activities : [] , text : 'Harem' },
  { chanceUnits : 1  , activities : [] , text : 'Maze' },
  { chanceUnits : 2  , activities : [] , text : 'Museum' },
  { chanceUnits : 1  , activities : [] , text : 'Music Room' },
  { chanceUnits : 1  , activities : [] , text : 'Pool' },
  { chanceUnits : 1  , activities : [] , text : 'Sauna' },
  { chanceUnits : 1  , activities : [] , text : 'Seraglio' },
  { chanceUnits : 1  , activities : [] , text : 'Statuary' },
  { chanceUnits : 1  , activities : [] , text : 'Torture Chamber' },
  { chanceUnits : 1  , activities : [] , text : 'Trophy Room' },
];

stub.rooms_of_general_function                .options = [
  { chanceUnits : 1  , activities : [] , text : 'Bathroom' },
  { chanceUnits : 1  , activities : [] , text : 'Bedroom' },
  { chanceUnits : 1  , activities : [] , text : 'Cistern Room' },
  { chanceUnits : 2  , activities : [] , text : 'Closet' },
  { chanceUnits : 1  , activities : [] , text : 'Dining Room' },
  { chanceUnits : 1  , activities : [] , text : 'Dressing Room' },
  { chanceUnits : 1  , activities : [] , text : 'Foyer (Entry Room)' },
  { chanceUnits : 1  , activities : [] , text : 'Hall' },
  { chanceUnits : 1  , activities : [] , text : 'Lair' },
  { chanceUnits : 1  , activities : [] , text : 'Larder / Pantry' },
  { chanceUnits : 1  , activities : [] , text : 'Lounge' },
  { chanceUnits : 1  , activities : [] , text : 'Map Room' },
  { chanceUnits : 1  , activities : [] , text : 'Privy' },
  { chanceUnits : 1  , activities : [] , text : 'Planning Room' },
  { chanceUnits : 1  , activities : [] , text : 'Reception Chamber' },
  { chanceUnits : 1  , activities : [] , text : 'Salon' },
  { chanceUnits : 1  , activities : [] , text : 'Servants Dorm' },
  { chanceUnits : 1  , activities : [] , text : 'Storage' },
  { chanceUnits : 1  , activities : [] , text : 'Waiting Room' },
  { chanceUnits : 1  , activities : [] , text : 'Wardrobe' },
  { chanceUnits : 1  , activities : [] , text : 'Well Room' },
  { chanceUnits : 1  , activities : [] , text : 'Vault' },
  { chanceUnits : 1  , activities : [] , text : 'Vestibule' },
];

stub.rooms_of_war_and_conflict                .options = [
  { chanceUnits : 1  , activities : [] , text : 'Armory' },
  { chanceUnits : 1  , activities : [] , text : 'Arsenal' },
  { chanceUnits : 1  , activities : [] , text : 'Barracks' },
  { chanceUnits : 1  , activities : [] , text : 'Guardroom' },
  { chanceUnits : 1  , activities : [] , text : 'Gymnasium' },
  { chanceUnits : 1  , activities : [] , text : 'Interrogation Room' },
  { chanceUnits : 1  , activities : [] , text : 'Mess Hall' },
];

stub.rooms_of_dieties_and_worship             .options = [
  { chanceUnits : 1  , activities : [] , text : 'Chantry' },
  { chanceUnits : 2  , activities : [] , text : 'Chapel' },
  { chanceUnits : 1  , activities : [] , text : 'Crypt, Human' },
  { chanceUnits : 1  , activities : [] , text : 'Crypt, Animal' },
  { chanceUnits : 1  , activities : [] , text : 'Confessional' },
  { chanceUnits : 1  , activities : [] , text : 'Crematorium' },
  { chanceUnits : 1  , activities : [] , text : 'Embalming Chamber' },
  { chanceUnits : 1  , activities : [] , text : 'Meditation Chamber' },
  { chanceUnits : 1  , activities : [] , text : 'Monk Cell' },
  { chanceUnits : 1  , activities : [] , text : 'Mass Grave' },
  { chanceUnits : 2  , activities : [] , text : 'Robing Room' },
  { chanceUnits : 2  , activities : [] , text : 'Shrine' },
  { chanceUnits : 1  , activities : [] , text : 'Scriptorium' },
  { chanceUnits : 2  , activities : [] , text : 'Temple' },
  { chanceUnits : 1  , activities : [] , text : 'Tomb' },
  { chanceUnits : 1  , activities : [] , text : 'Vestiary' },
];

stub.rooms_of_learning_and_knowledge          .options = [
  { chanceUnits : 1  , activities : [] , text : 'Classroom' },
  { chanceUnits : 1  , activities : [] , text : 'Conjuring Room' },
  { chanceUnits : 1  , activities : [] , text : 'Divination Chamber' },
  { chanceUnits : 1  , activities : [] , text : 'Inscription Chamber' },
  { chanceUnits : 1  , activities : [] , text : 'Laboratory' },
  { chanceUnits : 2  , activities : [] , text : 'Library' },
  { chanceUnits : 1  , activities : [] , text : 'Morgue' },
  { chanceUnits : 1  , activities : [] , text : 'Observatory' },
  { chanceUnits : 1  , activities : [] , text : 'Study' },
  { chanceUnits : 1  , activities : [] , text : 'Solar' },
  { chanceUnits : 1  , activities : [] , text : 'Summoning Room' },
];

stub.rooms_of_specific_utility                .options = [
  { chanceUnits : 1  , activities : [] , text : 'Barn' },
  { chanceUnits : 1  , activities : [] , text : 'Kitchen' },
  { chanceUnits : 1  , activities : [] , text : 'Forge' },
  { chanceUnits : 1  , activities : [] , text : 'Meeting Chamber' },
  { chanceUnits : 1  , activities : [] , text : 'Mine' },
  { chanceUnits : 2  , activities : [] , text : 'Office' },
  { chanceUnits : 1  , activities : [] , text : 'Pool / Water Room' },
  { chanceUnits : 1  , activities : [] , text : 'Stable' },
  { chanceUnits : 1  , activities : [] , text : 'Treasury' },
  { chanceUnits : 1  , activities : [] , text : 'Garage' },
  { chanceUnits : 1  , activities : [] , text : 'Smokehouse' },
  { chanceUnits : 1  , activities : [] , text : 'Tannery' },
  { chanceUnits : 1  , activities : [] , text : 'Work Pit / Workshop' },
];

/*
Placeholder example command:

var option = RandomDungeonGeneration.roll(RandomDungeonGeneration.tables.room_types);
console.log(option)
var a = option.activities;
for (var i in a) { console.log(a[i]()); };

*/

// implanting into existing tables
stub.doors_beyond.options[4].activities.push
(
  function()
  {
    var option = RandomDungeonGeneration.roll(RandomDungeonGeneration.tables.room_types);
    console.log(option)
    var a = option.activities;
    for (var i in a) { console.log(a[i]()); };
  }
);

stub.doors_beyond.options[5].activities.push
(
  function()
  {
    var option = RandomDungeonGeneration.roll(RandomDungeonGeneration.tables.room_types);
    console.log(option)
    var a = option.activities;
    for (var i in a) { console.log(a[i]()); };
  }
);

stub.room_types                    .options[0].activities = 
[
  function()
  {
    var type  = RandomDungeonGeneration.roll(RandomDungeonGeneration.tables.rooms_of_public_assembly);
    // TODO: This won't work when the name was sanitized
    var deets = room_types[type.text];
    return {type:type, deets:deets};
  }
];

stub.room_types                    .options[1].activities = 
[
  function()
  {
    var type = RandomDungeonGeneration.roll(RandomDungeonGeneration.tables.rooms_of_containment_and_imprisonment);
    // TODO: This won't work when the name was sanitized
    var deets = room_types[type.text];
    return {type:type, deets:deets};
  }
];

stub.room_types                    .options[2].activities = 
[
  function()
  {
    var type = RandomDungeonGeneration.roll(RandomDungeonGeneration.tables.rooms_of_pleasures_and_relaxation);
    // TODO: This won't work when the name was sanitized
    var deets = room_types[type.text];
    return {type:type, deets:deets};
  }
];

stub.room_types                    .options[3].activities = 
[
  function()
  {
    var type = RandomDungeonGeneration.roll(RandomDungeonGeneration.tables.rooms_of_general_function);
    // TODO: This won't work when the name was sanitized
    var deets = room_types[type.text];
    return {type:type, deets:deets};
  }
];

stub.room_types                    .options[4].activities = 
[
  function()
  {
    var type = RandomDungeonGeneration.roll(RandomDungeonGeneration.tables.rooms_of_war_and_conflict);
    // TODO: This won't work when the name was sanitized
    var deets = room_types[type.text];
    return {type:type, deets:deets};
  }
];

stub.room_types                    .options[5].activities = 
[
  function()
  {
    var type = RandomDungeonGeneration.roll(RandomDungeonGeneration.tables.rooms_of_dieties_and_worship);
    // TODO: This won't work when the name was sanitized
    var deets = room_types[type.text];
    return {type:type, deets:deets};
  }
];

stub.room_types                    .options[6].activities = 
[
  function()
  {
    var type = RandomDungeonGeneration.roll(RandomDungeonGeneration.tables.rooms_of_learning_and_knowledge);
    // TODO: This won't work when the name was sanitized
    var deets = room_types[type.text];
    return {type:type, deets:deets};
  }
];

stub.room_types                    .options[7].activities = 
[
  function()
  {
    var type = RandomDungeonGeneration.roll(RandomDungeonGeneration.tables.rooms_of_specific_utility);
    // TODO: This won't work when the name was sanitized
    var deets = room_types[type.text];
    return {type:type, deets:deets};
  }
];