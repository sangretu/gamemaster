/**
 * evolution.js
 *
 * Prototype for Game Master Evolution.
 *
 * v0.1.0.20200108
 */
 
console.log('Game Master Evolution');

/*
 step one. A goblin fight. Goblin has four hit points, player has 10 hit points. Both need to roll a 10 on a 20 sided die to hit the other.  A successful hit does one damage.  output is sent to the consul, with the text “you hit the goblin“, you miss the goblin“, “the goblin hits you“, or “the goblin misses you“.  once one of the fighters is reduced to zero points, the other fighter is announced as the winner.  The player attacks first. 
*/

var goblin_hit_points = 4;
var player_hit_points = 10;

var roll_to_hit = function()
{
  return Math.floor(Math.random()*20);
};

while (goblin_hit_points > 0 && player_hit_points > 0)
{
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

if (goblin_hit_points == 0) console.log('you win');
else if (player_hit_points == 0) console.log('goblin wins');
else console.log('error');

