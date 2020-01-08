/**
 * evolution.js
 *
 * Prototype for Game Master Evolution.
 *
 * v0.1.0.20200108
 */
 
console.log('Game Master Evolution');

/*
 step three.  allow the player to select an action for each round. The two actions the player may select “attack“ and “flea”. The player receives a simple prompt  on the consul, and inputs their selected option as a function call in the consul.  if the player fleas, the battle ends prematurely with the final output, “flat“.  amendment: “you flag after X rounds of combat“. 
*/

var goblin_hit_points = 4;
var player_hit_points = 10;
var current_round     = 0;

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