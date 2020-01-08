/**
 * evolution.js
 *
 * Prototype for Game Master Evolution.
 *
 * v0.1.0.20200108
 */
 
console.log('Game Master Evolution');

/*
 step four.  convert actions to buttons. Add an attack and flee button to the page, which perform the same action as the function calls. 
*/

var goblin_hit_points = 4;
var player_hit_points = 10;
var current_round     = 0;

var btn_attack;
var btn_flee;

init_buttons = function()
{
  btn_attack = document.createElement('button');
  btn_attack.textContent = 'attack';
  btn_attack.onclick = attack;

  btn_flee   = document.createElement('button');
  btn_flee.textContent = 'flee';
  btn_flee.onclick = flee;
};

window.onload = function(e)
{
  init_buttons();
  document.getElementById('content').appendChild(btn_attack);
  document.getElementById('content').appendChild(btn_flee);
}


var roll_to_hit = function()
{
  return Math.floor(Math.random()*20);
};

var attack = function()
{
  current_round++;
  console.log('------------ round ' + current_round + ' ------------');

  if (roll_to_hit() >= 10)
  {
    console.log('you hit the goblin');
    goblin_hit_points--;
  } else
  {
    console.log('you miss the goblin');
  };
  
  if (goblin_hit_points > 0)
  {  
    if (roll_to_hit() >= 10)
    {
      console.log('the goblin hit you');
      player_hit_points--;
    } else
    {
      console.log('the goblin misses you');
    };
  }
  
  if (goblin_hit_points == 0) console.log('you win in ' + current_round + ' rounds');
  else if (player_hit_points == 0) console.log('goblin wins in ' + current_round + ' rounds');
};

var flee = function()
{
  console.log('you fled after ' + current_round + ' rounds of combat');
};