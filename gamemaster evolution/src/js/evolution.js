/**
 * evolution.js
 *
 * Prototype for Game Master Evolution.
 *
 * v0.1.0.20200108
 */
 
console.log('Game Master Evolution');

/*
 step seven.  variable weapon damage. The player does a random amount of damage from 1 to 6 points each time they hit. The goblin does a random amount of damage from 1 to 4 points each time it hits. The amount of damage done each time is added to the readout, for example, “you hit the goblin for two points of damage.“
*/

var roll_die = function(max)
{
  var min = 1;
  return Math.floor(Math.random()*Math.floor(max-min))+min;
};

var goblin_max_hit_points = roll_die(4);
var player_max_hit_points = roll_die(10);
var goblin_hit_points = goblin_max_hit_points;
var player_hit_points = player_max_hit_points;
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
    if (roll_die(20) >= 10)
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
    if (roll_die(20) >= 10)
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