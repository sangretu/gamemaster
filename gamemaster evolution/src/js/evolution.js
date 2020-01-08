/**
 * evolution.js
 *
 * Prototype for Game Master Evolution.
 *
 * v0.1.0.20200108
 */
 
console.log('Game Master Evolution');

/*
 step two. Add round markers. Between each set of attacks, a divider line is shown along with the current round number. Final read out has the number of rounds append it, for example, “the goblin one in three rounds. 
*/

var goblin_hit_points = 4;
var player_hit_points = 10;
var current_round     = 0;

var roll_to_hit = function()
{
  return Math.floor(Math.random()*20);
};

while (goblin_hit_points > 0 && player_hit_points > 0)
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
  
  if (!(goblin_hit_points > 0)) break;
  
  if (roll_to_hit() >= 10)
  {
    console.log('the goblin hit you');
    player_hit_points--;
  } else
  {
    console.log('the goblin misses you');
  };
  
};

if (goblin_hit_points == 0) console.log('you win in ' + current_round + ' rounds');
else if (player_hit_points == 0) console.log('goblin wins in ' + current_round + ' rounds');
else console.log('error');

