/**
 * evolution.js
 *
 * Prototype for Game Master Evolution.
 *
 * v0.1.0.20200108
 */
 
console.log('Game Master Evolution');

/*
 step eight.  armor class. The player has an armor class of six. The goblin has an armor class of eight.  rather than having to roll a 10 on a 20 sided die to hit the opponent, each fighter must roll  A value equal to or greater than 20 minus their opponents armor class.
*/

var roll_die = function(max)
{
  var min = 1;
  var result = Math.floor(Math.random()*Math.floor(max-min))+min;
  console.log('rolled ' + result);
  return result;
};

var goblin_max_hit_points = roll_die(4);
var player_max_hit_points = roll_die(10);
var goblin_hit_points = goblin_max_hit_points;
var player_hit_points = player_max_hit_points;
var player_armor_class = 6;
var goblin_armor_class = 8;
var current_round     = 0;

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
  console.log('you fled after ' + current_round + ' rounds of combat');
};