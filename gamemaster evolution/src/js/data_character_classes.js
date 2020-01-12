{ // Character classes

  var character_classes =
  [
    {
      class_name   : 'cleric',
      thac_goblin  : 14, // ac 6
      max_hp       : 8,
      ac           : 4, // any + shield
      weapon_types : [ 'club', 'flail', 'hammer', 'mace', 'staff' ]
    },
    {
      class_name   : 'druid',
      thac_goblin  : 14, // ac 6
      max_hp       : 8,
      ac           : 7, // leather + wooden shield
      weapon_types : [ 'club', 'dagger', 'dart', 'hammer', 'scimitar', 'sling', 'spear', 'staff' ]
    },
    {
      class_name   : 'fighter',
      thac_goblin  : 14, // ac 6
      max_hp       : 10,
      ac           : 4, // any + shield
      weapon_types : [ 'any' ]
    },
    {
      class_name   : 'paladin',
      thac_goblin  : 14, // ac 6
      max_hp       : 10,
      ac           : 2, // any + shield
      weapon_types : [ 'any' ]
    },
    {
      class_name   : 'ranger',
      thac_goblin  : 14, // ac 6
      max_hp       : 8,
      ac           : 6, // any + shield
      weapon_types : [ 'any' ]
    },
    {
      class_name   : 'magic-user',
      thac_goblin  : 15, // ac 6
      max_hp       : 4,
      ac           : 10, // none
      weapon_types : [ 'dagger', 'dart', 'staff' ]
    },
    {
      class_name   : 'illusionist',
      thac_goblin  : 15, // ac 6
      max_hp       : 4,
      ac           : 10, // none
      weapon_types : [ 'dagger', 'dart', 'staff' ]
    },
    {
      class_name   : 'thief',
      thac_goblin  : 15, // ac 6
      max_hp       : 6,
      ac           : 8, // leather
      weapon_types : [ 'club', 'dagger', 'dart', 'sling', 'sword' ]
    },
    {
      class_name   : 'assassin',
      thac_goblin  : 15, // ac 6
      max_hp       : 6,
      max_damage   : 4, // any
      ac           : 7, // leather + shield
      weapon_types : [ 'any' ]
    },
    {
      class_name   : 'monk',
      thac_goblin  : 14, // ac 6
      max_hp       : 4,
      ac           : 10, // none
      weapon_types : [ 'bo stick', 'club', 'crossbow', 'dagger', 'hand axe', 'javelin', 'polearm', 'spear', 'staff' ]
    }
  ];

}