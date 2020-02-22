/**
 * evolution.js
 *
 * Prototype for Game Master Evolution.
 *
 * v0.1.0.20200108
 */
 
console.log('Game Master Evolution');

/*
 step 16. Add a kobold. Randomly determine which of the two monster types is the players opponent at the beginning of the battle. Make the necessary adjustments to target values and modifiers. 
*/

{ /* Classes */

  { // Monster
  
    var Monster = function(type)
    {
      /// TODO: This should be protected
      this.type = type;
      
      // make getters referance available through instances
      //this.getters = Monster.getters;
    };
    
    // Master "get" function, offers mitigation of version compatibility issues
    // by allowing attempts to retrieve data that may not be supported by the
    // object being queried.
    Monster.prototype.get         = function(getter)
    {
      if (getter == undefined) return undefined;
      
      /// NOTE: I wanted to construct it like this, but context got really messy, worth revisiting
      /// return getter();
      
      if (getter === this.getters.type      ) return this.get_type();
      if (getter === this.getters.type_name ) return this.get_type_name();
      if (getter === this.getters.ac        ) return this.get_ac();
      if (getter === this.getters.hp        ) return this.get_hp();
      if (getter === this.getters.attacks   ) return this.get_attacks();
      
      return 'no getter';
    };
    
    Monster.prototype.get_type      = function() { return this.type;           };
    
    Monster.prototype.get_type_name = function() { return this.type.type_name; };
    
    Monster.prototype.get_ac        = function() { return this.type.ac;        };
    
    Monster.prototype.get_hp        = function() { return this.type.hd;        }; /// TODO: not correct
    
    Monster.prototype.get_attacks   = function() { return 1;                   }; /// TODO: not correct
    
    Monster.prototype.getters =
    {
      type      : Monster.prototype.get_type,
      type_name : Monster.prototype.get_type_name,
      ac        : Monster.prototype.get_ac,
      hp        : Monster.prototype.get_hp,
      attacks   : Monster.prototype.get_attacks
    };
    
  }

}

var roll_die = function(max)
{
  var min = 1;
  var result = Math.floor(Math.random()*Math.floor(max-min+1))+min;
  return result;
};

var player_class = character_classes[roll_die(character_classes.length)-1];

var player_class_name     = player_class.class_name;
var player_max_hit_points = roll_die(player_class.max_hp);
var player_hit_points     = player_max_hit_points;
var player_armor_class    = player_class.ac;
// choose weapon type
var available_types = [];
for (var wtype in weapon_types)
{
  if ( player_class.weapon_types.includes('any') ) available_types.push(weapon_types[wtype]);
  else
  {
    for (var ok in player_class.weapon_types)
    {
      if
      (
        weapon_types[wtype].types.includes(player_class.weapon_types[ok])
        // NOTE: I believe there are a few like this
        || weapon_types[wtype].name == player_class.weapon_types[ok]
      )
      available_types.push(weapon_types[wtype]);
    }
  }
};
var player_weapon_type = available_types[roll_die(available_types.length)-1];
var player_thac_goblin    = player_class.thac_goblin - (player_weapon_type.melee?player_weapon_type.ac_mods_2_to_10[4]:0);

// TODO: convert range to die roll.
// NOTE: need logic to determine rolls necessary for e.g., 2-8, 2-7, 3-12
// NOTE: need new die roller or just call the regular one multiple times?

var damage_range_goblin = player_weapon_type.damage_SM;
if ( (damage_range_goblin.indexOf('-') < 1 ) ) throw 'invalid damage range : ' + damage_range_goblin + ' (' + player_weapon_type.name + ')';
var damage_min_goblin   = damage_range_goblin.substring(0, damage_range_goblin.indexOf('-'));
var damage_max_goblin   = damage_range_goblin.substring(damage_range_goblin.indexOf('-')+1);
// TODO: maybe put this in a loop?
// What is the exact logic anyway?
// If min % max == 0, then roll min dice with max/min sides
// Proper calculation from here relies on knowledge of D&D dice sets to know e.g., 4-19 is a curve of 3d6+1, rather than 1d16+3
// But for this exercise, I think we can convert ranges with remainders to min-X to max-X where min = 1+X
// Which actually works for the baseline formula as well...well, sort of...confuses with multiple dice
var damage_mod_goblin   = 0;

if ( ( !(damage_max_goblin % damage_min_goblin == 0) ) )
{
  damage_mod_goblin = damage_min_goblin - 1;
};

// So we roll damage_min_goblin - damage_mod_goblin dice with (damage_max_goblin - damage_mod_goblin) / (damage_min_goblin - damage_mod_goblin) sides?
var qty_dice  = damage_min_goblin - damage_mod_goblin;
var size_dice = (damage_max_goblin - damage_mod_goblin) / (damage_min_goblin - damage_mod_goblin);
// console.log ('Damage roll will be ' + qty_dice + 'd' + size_dice + '+' + damage_mod_goblin);
// console.log(damage_min_goblin + '-' + damage_max_goblin);

var goblin_max_hit_points = roll_die(7);
var goblin_hit_points     = goblin_max_hit_points;
var goblin_armor_class    = 6;
var goblin_thac0          = 21;

var current_round         = 0;

console.log('------------ round ' + current_round + ' ------------');

console.log
(
  'Player : '       + player_class_name 
  + ', hp '         + player_max_hit_points
  + ', ac '         + player_armor_class
  + ', weapon '     + player_weapon_type.name
  + ', damage '     + player_weapon_type.damage_SM + ' (' + qty_dice + 'd' + size_dice + '+' + damage_mod_goblin + ')'
  + ', thac6 '      + player_thac_goblin
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

  btn_status = document.createElement('button');
  btn_status.textContent = 'status';
  btn_status.onclick = showstatus;
};

window.onload = function(e) {
  init_buttons();
  document.getElementById('content').appendChild(btn_attack);
  document.getElementById('content').appendChild(btn_flee);
  document.getElementById('content').appendChild(btn_status);
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
    var hit_roll = roll_die(20);
    
    if (hit_roll >= player_thac_goblin) // (20 - goblin_armor_class) )
    {
      //var damage = roll_die(6);  // TODO: Whooops, this was supposed to be based on the character
      
      var damage = 0;
      for ( var rolls = 0 ; rolls < qty_dice ; rolls++ ) damage += roll_die(size_dice);
      damage += damage_mod_goblin;
      
      console.log('you hit the goblin (' + hit_roll + '/' + player_thac_goblin + ') for ' + damage + ' points of damage');
      goblin_hit_points -= damage;
    } else
    {
      console.log('you miss the goblin (' + hit_roll + '/' + player_thac_goblin + ')');
    };
  }
  
  if (goblin_hit_points > 0)
  {
    var hit_roll = roll_die(20);
    
    if (hit_roll >= (goblin_thac0 - player_armor_class))// (20 - player_armor_class) )
    {
      var damage = roll_die(4);
      console.log('the goblin hit you (' + hit_roll + '/' + (goblin_thac0 - player_armor_class) + ') for ' + damage + ' points of damage');
      player_hit_points -= damage;
    } else
    {
      console.log('the goblin misses you (' + hit_roll + '/' + (goblin_thac0 - player_armor_class) + ')');
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

var showstatus = function()
{
  console.log('============ status ============');
  
  console.log('Combat status : ');
  if      (goblin_hit_points <= 0) console.log('player won in ' + current_round + ' rounds');
  else if (player_hit_points <= 0) console.log('goblin won in ' + current_round + ' rounds');
  else                             console.log('in progress (round ' + current_round + ')');
  
  console.log
  (
    'Player : '       + player_class_name 
    + ', hp '         + player_hit_points + '/' + player_max_hit_points
    + ', ac '         + player_armor_class
    + ', weapon '     + player_weapon_type.name
    + ', damage '     + player_weapon_type.damage_SM + ' (' + qty_dice + 'd' + size_dice + '+' + damage_mod_goblin + ')'
    + ', thac6 '      + player_thac_goblin
  );
  
  console.log
  (
    'Monster : '      + 'goblin'
    + ', hp '         + goblin_hit_points + '/' + goblin_max_hit_points
    + ', ac '         + goblin_armor_class
    + ', weapon '     + 'undefined'
    + ', damage '     + '1-4 (1d4+0)'
    + ', thacPlayer ' + (goblin_thac0 - player_armor_class)
  );
};