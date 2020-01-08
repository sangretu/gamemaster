/**
 * evolution.js
 *
 * Prototype for Game Master Evolution.
 *
 * v0.1.0.20200108
 */
 
console.log('Game Master Evolution');

/*
 step nine.  character classes.  The player is randomly assigned one of the standard set of character classes when the program begins.  each class, of the set listed in the players handbook to include the monk but not the Bard, has a different maximum hit die and a different armor class based on class armor restrictions.   when the player is assigned a class, before the battle begins, a line of output indicates what class they have been assigned, and what their head points armor class are.  One that was an accident   sorry, I just witnessed a traffic accident. Back to work. Each class also has a custom weapon damage range based on their weapon limitations. The standard stats provided earlier should be used for the fighter class unless it throws things out of balance. 
 
 Note: also fixed bug in roll_die, max value was excluded
*/

var character_classes =
[
  {
    class_name : 'cleric',
    max_hp     : 8,
    max_damage : 6, // club, flail, hammer, mace, staff
    ac         : 4 // any + shield
  },
  {
    class_name : 'druid',
    max_hp     : 8,
    max_damage : 6, // club, dagger, dart, hammer, scimitar, sling, spear, staff
    ac         : 7 // leather + wooden shield
  },
  {
    class_name : 'fighter',
    max_hp     : 10,
    max_damage : 8, // any
    ac         : 4 // any + shield
  },
  {
    class_name : 'paladin',
    max_hp     : 10,
    max_damage : 8, // any
    ac         : 2 // any + shield
  },
  {
    class_name : 'ranger',
    max_hp     : 8,
    max_damage : 6, // any
    ac         : 6 // any + shield
  },
  {
    class_name : 'magic-user',
    max_hp     : 4,
    max_damage : 4, // dagger, dart, staff
    ac         : 10 // none
  },
  {
    class_name : 'illusionist',
    max_hp     : 4,
    max_damage : 4, // dagger, dart, staff
    ac         : 10 // none
  },
  {
    class_name : 'thief',
    max_hp     : 6,
    max_damage : 6, // club, dagger, dart, sling, sword
    ac         : 8 // leather
  },
  {
    class_name : 'assassin',
    max_hp     : 6,
    max_damage : 4, // any
    ac         : 7 // leather + shield
  },
  {
    class_name : 'monk',
    max_hp     : 4,
    max_damage : 6, // bo sticks, club, crossbow, dagger, hand axe, javelin, jo stick, pole arm, spear, staff
    ac         : 10 // none
  }
];

var roll_die = function(max)
{
  var min = 1;
  var result = Math.floor(Math.random()*Math.floor(max-min+1))+min;
  return result;
};

var player_class = character_classes[roll_die(character_classes.length)-1];

var goblin_max_hit_points = roll_die(4);
var player_max_hit_points = roll_die(player_class.max_hp);
var goblin_hit_points     = goblin_max_hit_points;
var player_hit_points     = player_max_hit_points;
var player_armor_class    = player_class.ac;
var goblin_armor_class    = 8;
var current_round         = 0;

console.log
(
  'Player : '
  + player_class.class_name // Note: This is class not character
  + ', hp ' 
  + player_max_hit_points 
  + ', ac ' + player_armor_class
  + ', max damage ' + player_class.max_damage // Note: This is class not character
);

var btn_attack;
var btn_flee;

init_buttons = function() {
  btn_attack = document.createElement('button');
  btn_attack.textContent = 'attack';
  btn_attack.onclick = attack;

  btn_flee   = document.createElement('button');
  btn_flee.textContent = 'flee';
  btn_flee.onclick = flee;
};

window.onload = function(e) {
  init_buttons();
  document.getElementById('content').appendChild(btn_attack);
  document.getElementById('content').appendChild(btn_flee);
}

console.log('goblin_hit_points = ' + goblin_hit_points);
console.log('player_hit_points = ' + player_hit_points);

var attack = function()
{
  if (player_hit_points <= 0 || goblin_hit_points <= 0) return;

  current_round++;
  console.log('------------ round ' + current_round + ' ------------');
  console.log('Player : ' + player_hit_points + '/' + player_max_hit_points + ' hp');
  console.log('Goblin : ' + goblin_hit_points + '/' + goblin_max_hit_points + ' hp');

  if (player_hit_points > 0)
  {
    if (roll_die(20) >= (20 - goblin_armor_class) )
    {
      var damage = roll_die(6);
      console.log('you hit the goblin for ' + damage + ' points of damage');
      goblin_hit_points -= damage;
    } else
    {
      console.log('you miss the goblin');
    };
  }
  
  if (goblin_hit_points > 0)
  {  
    if (roll_die(20) >= (20 - player_armor_class) )
    {
      var damage = roll_die(4);
      console.log('the goblin hit you for ' + damage + ' points of damage');
      player_hit_points -= damage;
    } else
    {
      console.log('the goblin misses you');
    };
  }
  
  if (goblin_hit_points <= 0) console.log('you win in ' + current_round + ' rounds');
  else if (player_hit_points <= 0) console.log('goblin wins in ' + current_round + ' rounds');
};

var flee = function()
{
  if (player_hit_points <= 0 || goblin_hit_points <= 0) return;
  console.log('you fled after ' + current_round + ' rounds of combat');
};