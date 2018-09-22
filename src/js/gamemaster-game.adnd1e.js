/**
 * gamemaster-game.adnd1e.js
 *
 * Prototype AD&D 1E implementation for Game Master.
 *
 * v0.1.0
 */

GameMaster.Game.ADnD1E = function(foo)
{
  this.coreSetName = "Advanced Dungeons & Dragons, First Edition";
}

GameMaster.Game.ADnD1E.prototype.Commands =
{
  'roll' : function(dice)
  {
    // derived from d&d tools\js\dice.js v0.1.0 of 2016-02-19
    // with a bunch of improvements (probly merge back eh?)
    
    // cleaning up a bit
    // BUG: roll('1') == 11?
    // BUG: roll('5') == 51?
    // BUG: roll('1d1') == 11?
    // BUG: roll('d1') == 2?
    // BUG: roll('d0') == 1?
    // BUG: roll('3d6-5') == -45?
    // BUG: roll("3d6+5") == 63?
  
    /*
    var response = 
    {
      success : false,
      message : '',
      formula : dice,
      rolls   : [],
      result  : 0
    };
    */
    
    var response = 
    {
      success    : false,
      formula    : dice,
      resultText : 0,
      resultData : []
    };
  
    if (dice.length == 0)
    {
      response.resultText = GameMaster.Strings['ERR_BAD_ARGUMENT'];
      return response;
    }
    
    // split out first term
    var regex = '^([\+\-]?\\d*(?:d\\d*)?)(.*)';
    var tokens = dice.match(regex);
    
    if (tokens[1].length > 0)
    {
      var regex_terms = '^([\+\-]?)(\\d*)(?:(?:d)(\\d+))?$';
      var terms = tokens[1].match(regex_terms);
      
      var f = terms[1] + '1';
      var q = terms[2] || 1;
      var s = terms[3] || 1;
        
      // Special case for constants, which are currently parsed as sfd1 (e.g. +5 = +5d1)
      // Note this effectively treats any 'xd1' terms as constants too, which seems acceptable.
      if (s == 1)
      {
        var constant = (f*(q+1));
        response.resultText += constant;
        q = 0; // skip rolling
      }
      
      for ( ; q-->0 ; )
      {
        // TODO: When would the result get multiplied by s exactly? Oh that's the sign isn't it?
        // So when would it be multiplied by f? Er, always - that's the factor to determine the
        // number of sides of the dice, isn't it? Ok so maybe the "todo" here is to document
        // it better? Or at all? Argh no s is sides, so f is factor? Shit I dunno.
        
        var roll = Math.floor(Math.random()*s+1)*f;
        response.resultData.push(roll);
        response.resultText += roll;
      }
      
      // At this point, we think we have succeeded.
      response.success = true;
      
      if (tokens[2].length > 0)
      {
        var recurse = this.roll(tokens[2]);
        
        response.resultData   = response.resultData.concat(recurse.resultData);
        response.resultText += recurse.resultText;
        
        // Propogate failures
        if (!recurse.success)
        {        
          response.success = recurse.success;
          response.resultText = recurse.resultText;
        }
      }
      
      return response;
    }
    else
    {
      // no term found
      response.message = GameMaster.Strings['ERR_BAD_ARGUMENT'];
      return response;
    }
    
    // NOTE:
    // Ok so I think I fixed the main bug - was related to no default value for q.
    // Also tweaked a little to prevent unnecessary extra recursion at the end.
    // Basically an improvement but not backward-compatible in this state.
      
    // TODO: Putting in a bogus term can screw up the results (e.g., '1d4-(10+10)' subtracts 1
    // from the 1d4) - just fail safe instead of returning an incorrect result.      
    // Ok so it seems the fix for this is basically to avoid populating the response object
    // until you are sure the call has succeeded? Cuz otherwise you end up with partial results
    // and a naive caller might use them. Barely ok for prototype but problem in production, yeah?
    
    // TODO: Lots of silly little bugs remain here but I don't have the luxury of polishing this
    // right now so I'm going to leave it as the functional mess it is and address it later.
    
  },

  'getRandomMagicItem' : function()
  {
  
    // mostly copied from d&d tools\js\treasure.js, with some customizations to fit gamemaster specs
    
    // gamemaster result info (default)
    var response = 
    {
      success    : false,
      resultText : '',
      resultData : []
    };
    
    // TODO: again, naive logic with no error checking all throughout this function
    var roll   = this.roll('1d100');
    response.resultData.push('Magic Items : ' + roll.resultText);
    
    // Using message and result for now because they are already everywhere in the code
    var message = '';
    var result = roll.resultText;
      
    var category = 'undefined';
    if      ( result <= 20  ) category = 'Potions';
    else if ( result <= 35  ) category = 'Scrolls';
    else if ( result <= 40  ) category = 'Rings';
    else if ( result <= 45  ) category = 'Rods, Staves & Wands';
    else if ( result <= 48  ) category = 'Miscellaneous Magic 1/5';
    else if ( result <= 51  ) category = 'Miscellaneous Magic 2/5';
    else if ( result <= 54  ) category = 'Miscellaneous Magic 3/5';
    else if ( result <= 57  ) category = 'Miscellaneous Magic 4/5';
    else if ( result <= 60  ) category = 'Miscellaneous Magic 5/5';
    else if ( result <= 75  ) category = 'Armor & Shields';
    else if ( result <= 86  ) category = 'Swords';
    else if ( result <= 100 ) category = 'Miscellaneous Weapons';
      else                    message += 'ERROR - value not in range';
    
    if      ( category == 'Potions' )
    {
      roll   = this.roll('1d100');
      response.resultData.push('Potions : ' + roll.resultText);
      result = roll.resultText;
      
      if      ( result <=  03 ) message += 'Potion of Animal Control';
      else if ( result <=  06 ) message += 'Potion of Clairaudience';
      else if ( result <=  09 ) message += 'Potion of Clairvoyonce';
      else if ( result <=  12 ) message += 'Potion of Climbing';
      else if ( result <=  15 ) message += 'Potion of Delusion';
      else if ( result <=  18 ) message += 'Potion of Dimunition';
      else if ( result <=  20 ) message += 'Potion of Dragon Control';
      else if ( result <=  23 ) message += 'Potion of ESP';
      else if ( result <=  26 ) message += 'Potion of Extra-Healing';
      else if ( result <=  29 ) message += 'Potion of Fire Resistance';
      else if ( result <=  32 ) message += 'Potion of Flying';
      else if ( result <=  34 ) message += 'Potion of Gaseous Form';
      else if ( result <=  36 ) message += 'Potion of Giant Control';
      else if ( result <=  39 ) message += 'Potion of Giant Strength (F)';
      else if ( result <=  41 ) message += 'Potion of Growth';
      else if ( result <=  47 ) message += 'Potion of Healing';
      else if ( result <=  49 ) message += 'Potion of Heroism (F)';
      else if ( result <=  51 ) message += 'Potion of Human Control';
      else if ( result <=  54 ) message += 'Potion of Invisibility';
      else if ( result <=  57 ) message += 'Potion of lnvulnerability (F)';
      else if ( result <=  60 ) message += 'Potion of Levitation';
      else if ( result <=  63 ) message += 'Potion of Longevity';
      else if ( result <=  66 ) message += 'Oil of Etherealness';
      else if ( result <=  69 ) message += 'Oil of Slipperiness';
      else if ( result <=  72 ) message += 'Philter of Love';
      else if ( result <=  75 ) message += 'Philter of Persuasiveness';
      else if ( result <=  78 ) message += 'Potion of Plant Control';
      else if ( result <=  81 ) message += 'Potion of Polymorph (self)';
      else if ( result <=  84 ) message += 'Potion of Poison';
      else if ( result <=  87 ) message += 'Potion of Speed';
      else if ( result <=  90 ) message += 'Potion of Super-Heroism (F)';
      else if ( result <=  93 ) message += 'Potion of Sweet Water';
      else if ( result <=  96 ) message += 'Potion of Treasure Finding';
      else if ( result <=  97 ) message += 'Potion of Undead Control';
      else if ( result <= 100 ) message += 'Potion of Water Breathing';
      else                      message += 'ERROR - value not in range';
    }
    
    else if ( category == 'Scrolls' )
    {
      roll   = this.roll('1d100');
      response.resultData.push('Scrolls : ' + roll.resultText);
      result = roll.resultText;
    
      if      ( result <=  10 ) message += 'Scroll of 1 spell (lvl 1-4)';
      else if ( result <=  16 ) message += 'Scroll of 1 spell (lvl 1-6)';
      else if ( result <=  19 ) message += 'Scroll of 1 spell (lvl MU 2-9 or C 2-7)';
      else if ( result <=  24 ) message += 'Scroll of 2 spells (lvl 1-4)';
      else if ( result <=  27 ) message += 'Scroll of 2 spells (lvl MU 1-8 or C 1-6)';
      else if ( result <=  32 ) message += 'Scroll of 3 spells (lvl 1-4)';
      else if ( result <=  35 ) message += 'Scroll of 3 spells (lvl MU 2-9 or C 2-7)';
      else if ( result <=  39 ) message += 'Scroll of 4 spells (lvl 1-6)';
      else if ( result <=  42 ) message += 'Scroll of 4 spells (lvl MU 1-8 or C 1-6)';
      else if ( result <=  46 ) message += 'Scroll of 5 spells (lvl 1-6)';
      else if ( result <=  49 ) message += 'Scroll of 5 spells (lvl MU 1-8 or C 1-6)';
      else if ( result <=  52 ) message += 'Scroll of 6 spells (lvl 1-6)';
      else if ( result <=  54 ) message += 'Scroll of 6 spells lvl MU 3-8 or C 3-6)';
      else if ( result <=  57 ) message += 'Scroll of 7 spells (lvl 1-8)';
      else if ( result <=  59 ) message += 'Scroll of 7 spells (lvl 2-9)';
      else if ( result <=  60 ) message += 'Scroll of 7 spells (lvl MU 4-9 or C 4-7)';
      else if ( result <=  62 ) message += 'Scroll of Protection - Demons';
      else if ( result <=  64 ) message += 'Scroll of Protection - Devils';
      else if ( result <=  70 ) message += 'Scroll of Protection - Elementals';
      else if ( result <=  76 ) message += 'Scroll of Protection - Lyconthropes';
      else if ( result <=  82 ) message += 'Scroll of Protection - Magic';
      else if ( result <=  87 ) message += 'Scroll of Protection - Petrification';
      else if ( result <=  92 ) message += 'Scroll of Protection - Possession';
      else if ( result <=  97 ) message += 'Scroll of Protection - Undead';
      else if ( result <= 100 ) message += 'Cursed Scroll';
      else                      message += 'ERROR - value not in range';
    }
    
    else if ( category == 'Rings' )
    {
      roll   = this.roll('1d100');
      response.resultData.push('Rings : ' + roll.resultText);
      result = roll.resultText;
      
      if      ( result <=  06 ) message += 'Ring of Contrariness';
      else if ( result <=  12 ) message += 'Ring of Delusion';
      else if ( result <=  14 ) message += 'Ring of Djinni Summoning';
      else if ( result <=  15 ) message += 'Ring of Elemental Command';
      else if ( result <=  21 ) message += 'Ring of Feather Falling';
      else if ( result <=  22 ) message += 'Ring of Fire Resistance';
      else if ( result <=  30 ) message += 'Ring of Free Action';
      else if ( result <=  33 ) message += 'Ring of Human Influence';
      else if ( result <=  40 ) message += 'Ring of Invisibility';
      else if ( result <=  43 ) message += 'Ring of Mammal Control';
      else if ( result <=  44 ) message += 'Ring of Multiple Wishes';
      else if ( result <=  60 ) message += 'Ring of Protection';
      else if ( result <=  61 ) message += 'Ring of Regeneration';
      else if ( result <=  63 ) message += 'Ring of Shooting Stars';
      else if ( result <=  65 ) message += 'Ring of Spell Storing';
      else if ( result <=  69 ) message += 'Ring of Spell Turning';
      else if ( result <=  75 ) message += 'Ring of Swimming';
      else if ( result <=  77 ) message += 'Ring of Telekinesis';
      else if ( result <=  79 ) message += 'Ring of Three Wishes';
      else if ( result <=  85 ) message += 'Ring of Warmth';
      else if ( result <=  90 ) message += 'Ring of Water Walking';
      else if ( result <=  98 ) message += 'Ring of Weakness';
      else if ( result <=  99 ) message += 'Ring of Wizardry (M)';
      else if ( result <= 100 ) message += 'Ring of X-Ray Vision';
      else                      message += 'ERROR - value not in range';
    }
    
    else if ( category == 'Rods, Staves & Wands' )
    {
      roll   = this.roll('1d100');
      response.resultData.push('Rods, Staves & Wands : ' + roll.resultText);
      result = roll.resultText;
      
      if      ( result <=  03 ) message += 'Rod of Absorption (C,M)';
      else if ( result <=  04 ) message += 'Rod of Beguiling (C,M,T)';
      else if ( result <=  14 ) message += 'Rod of Cancellation (any)';
      else if ( result <=  16 ) message += 'Rod of lordly Might (F)';
      else if ( result <=  17 ) message += 'Rod of Resurrection (C)';
      else if ( result <=  18 ) message += 'Rod of Rulership (any)';
      else if ( result <=  19 ) message += 'Rod of Smiting (C,F)';
      else if ( result <=  20 ) message += 'Staff of Command (C,M)';
      else if ( result <=  22 ) message += 'Staff of Curing (C)';
      else if ( result <=  23 ) message += 'Staff of the Magi (M)';
      else if ( result <=  24 ) message += 'Staff of Power (M)';
      else if ( result <=  27 ) message += 'Staff of the Serpent (C)';
      else if ( result <=  31 ) message += 'Staff of Striking (C,M)';
      else if ( result <=  33 ) message += 'Staff of Withering (C)';
      else if ( result <=  34 ) message += 'Wand of Conjuration (M)';
      else if ( result <=  38 ) message += 'Wand of Enemy Detection (any)';
      else if ( result <=  41 ) message += 'Wand of Fear (C,M)';
      else if ( result <=  44 ) message += 'Wand of Fire (M)';
      else if ( result <=  47 ) message += 'Wand of Frost (M)';
      else if ( result <=  52 ) message += 'Wand of illumination (any)';
      else if ( result <=  56 ) message += 'Wand of Illusion (M)';
      else if ( result <=  59 ) message += 'Wand of Lightning (M)';
      else if ( result <=  68 ) message += 'Wand of Magic Detection (any)';
      else if ( result <=  73 ) message += 'Wand of Metal & Mineral Detection (any)';
      else if ( result <=  78 ) message += 'Wand of Magic Missiles (any)';
      else if ( result <=  86 ) message += 'Wand of Negation (any)';
      else if ( result <=  89 ) message += 'Wand of Paralyzation (M)';
      else if ( result <=  92 ) message += 'Wand of Polymorphing (M)';
      else if ( result <=  94 ) message += 'Wand of Secret Door & Trap Location (any)';
      else if ( result <=  100) message += 'Wand of Wonder (any)';
      else                      message += 'ERROR - value not in range';
    }
    
    else if ( category == 'Miscellaneous Magic 1/5' )
    {
      roll   = this.roll('1d100');
      response.resultData.push('Miscellaneous Magic 1/5 : ' + roll.resultText);
      result = roll.resultText;
      
      if      ( result <=   2 ) message += 'Alchemy Jug';
      else if ( result <=   4 ) message += 'Amulet of Inescapable Location';
      else if ( result <=   5 ) message += 'Amulet of Life Protection';
      else if ( result <=   7 ) message += 'Amulet of the Planes';
      else if ( result <=  11 ) message += 'Amulet of Proof Against Destruction and Location';
      else if ( result <=  13 ) message += 'Apparatus of Kwalish';
      else if ( result <=  16 ) message += 'Arrow of Direction';
      else if ( result <=  17 ) message += 'Artifact or Relic';
      else if ( result <=  20 ) message += 'Bag of Beans';
      else if ( result <=  21 ) message += 'Bag of Devouring';
      else if ( result <=  26 ) message += 'Bag of Holding';
      else if ( result <=  27 ) message += 'Bag of Transmuting';
      else if ( result <=  29 ) message += 'Bag of Tricks';
      else if ( result <=  31 ) message += 'Beaker of Plentiful Potions';
      else if ( result <=  32 ) message += 'Boat, Folding';
      else if ( result <=  33 ) message += 'Book of Exalted Deeds (C)';
      else if ( result <=  34 ) message += 'Book of Infinite Spells';
      else if ( result <=  35 ) message += 'Book of Vile Darkness (C)';
      else if ( result <=  36 ) message += 'Boots of Dancing';
      else if ( result <=  42 ) message += 'Boots of Elvenkind';
      else if ( result <=  47 ) message += 'Boots of Levitation';
      else if ( result <=  51 ) message += 'Boots of Speed';
      else if ( result <=  55 ) message += 'Boots of Striding and Springing';
      else if ( result <=  58 ) message += 'Bowl Commanding Water Elementals (M)';
      else if ( result <=  59 ) message += 'Bowl of Watery Death (M)';
      else if ( result <=  79 ) message += 'Bracers of Defense';
      else if ( result <=  81 ) message += 'Bracers of Defenselessness';
      else if ( result <=  84 ) message += 'Brazier Commanding Fire Elementals (M)';
      else if ( result <=  85 ) message += 'Brazier of Sleep Smoke (M)';
      else if ( result <=  92 ) message += 'Brooch of Shielding';
      else if ( result <=  93 ) message += 'Broom of Animated Attack';
      else if ( result <=  98 ) message += 'Broom of Flying';
      else if ( result <= 100 ) message += 'Bucknard\'s Everfull Purse';
      else                      message += 'ERROR - value not in range';
    }
    
    else if ( category == 'Miscellaneous Magic 2/5' )
    {
      roll   = this.roll('1d100');
      response.resultData.push('Miscellaneous Magic 2/5 : ' + roll.resultText);
      result = roll.resultText;
      
      if      ( result <=   6 ) message += 'Candle of Invocation (C)';
      else if ( result <=   8 ) message += 'Carpet of Flying';
      else if ( result <=  10 ) message += 'Censer Controlling Air Elementals (M)';
      else if ( result <=  11 ) message += 'Censer of Summoning Hostile Air Elementals (M)';
      else if ( result <=  13 ) message += 'Chime of Opening';
      else if ( result <=  14 ) message += 'Chime of Hunger';
      else if ( result <=  18 ) message += 'Cloak of Displacement';
      else if ( result <=  27 ) message += 'Cloak of Elvenkind';
      else if ( result <=  30 ) message += 'Cloak of Manta Ray';
      else if ( result <=  32 ) message += 'Cloak of Poisonousness';
      else if ( result <=  55 ) message += 'Cloak of Protection';
      else if ( result <=  60 ) message += 'Crystal Ball (M)';
      else if ( result <=  61 ) message += 'Crystal Hypnosis Ball (M)';
      else if ( result <=  63 ) message += 'Cube of Force';
      else if ( result <=  65 ) message += 'Cube of Frost Resistance';
      else if ( result <=  67 ) message += 'Cubic Gate';
      else if ( result <=  69 ) message += 'Daern\'s Instant Fortress';
      else if ( result <=  72 ) message += 'Decanter of Endless Water';
      else if ( result <=  76 ) message += 'Deck of Many Things';
      else if ( result <=  77 ) message += 'Drums of Deafening';
      else if ( result <=  79 ) message += 'Drums of Panic';
      else if ( result <=  85 ) message += 'Dust of Appearance';
      else if ( result <=  91 ) message += 'Dust of Disappearance';
      else if ( result <=  92 ) message += 'Dust of Sneezing and Choking';
      else if ( result <=  93 ) message += 'Efreeti Bottle';
      else if ( result <=  94 ) message += 'Eversmoking Bottle';
      else if ( result <=  95 ) message += 'Eyes of Charming (M)';
      else if ( result <=  97 ) message += 'Eyes of the Eagle';
      else if ( result <=  99 ) message += 'Eyes of Minute Seeing';
      else if ( result <= 100 ) message += 'Eyes of Petrification';
      else                      message += 'ERROR - value not in range';
    }
    
    else if ( category == 'Miscellaneous Magic 3/5' )
    {  
      roll   = this.roll('1d100');
      response.resultData.push('Miscellaneous Magic 3/5 : ' + roll.resultText);
      result = roll.resultText;
      
      if      ( result <=  15 ) message += 'Figurine of Wondrous Power';
      else if ( result <=  16 ) message += 'Flask of Curses';
      else if ( result <=  18 ) message += 'Gauntlets of Dexterity';
      else if ( result <=  20 ) message += 'Gauntlets of Fumbling';
      else if ( result <=  22 ) message += 'Gauntlets of Ogre Power (C,F,T)';
      else if ( result <=  25 ) message += 'Gauntlets of Swimming and Climbing (C,F,T)';
      else if ( result <=  26 ) message += 'Gem of Brightness';
      else if ( result <=  27 ) message += 'Gem of Seeing';
      else if ( result <=  28 ) message += 'Girdle of Femininity/Masculinity (C, F, T)';
      else if ( result <=  29 ) message += 'Girdle of Giant Strength (C, F, T)';
      else if ( result <=  30 ) message += 'Helm of Brilliance';
      else if ( result <=  35 ) message += 'Helm of Comprehending Languages & Reading Magic';
      else if ( result <=  37 ) message += 'Helm of Opposite Alignment';
      else if ( result <=  39 ) message += 'Helm of Telepathy';
      else if ( result <=  40 ) message += 'Helm of Teleportation';
      else if ( result <=  45 ) message += 'Helm of Underwater Action';
      else if ( result <=  46 ) message += 'Horn of Blasting';
      else if ( result <=  48 ) message += 'Horn of Bubbles';
      else if ( result <=  49 ) message += 'Horn of Collapsing';
      else if ( result <=  53 ) message += 'Horn of the Tritons (C, F)';
      else if ( result <=  60 ) message += 'Horn of Valhalla';
      else if ( result <=  63 ) message += 'Horseshoes of Speed';
      else if ( result <=  65 ) message += 'Horseshoes of a Zephyr';
      else if ( result <=  70 ) message += 'Incense of Meditation (C)';
      else if ( result <=  71 ) message += 'Incense of Obsession (C)';
      else if ( result <=  72 ) message += 'Ioun Stones';
      else if ( result <=  78 ) message += 'Instrument of the Bards';
      else if ( result <=  80 ) message += 'Iron Flask';
      else if ( result <=  85 ) message += 'Javelin of Lightning (F)';
      else if ( result <=  90 ) message += 'Javelin of Piercing (F)';
      else if ( result <=  91 ) message += 'Jewel of Attacks';
      else if ( result <=  92 ) message += 'Jewel of Flawlessness';
      else if ( result <= 100 ) message += 'Keoghtom\'s Ointment';
      else                      message += 'ERROR - value not in range';
    }
    
    else if ( category == 'Miscellaneous Magic 4/5' )
    {
      roll   = this.roll('1d100');
      response.resultData.push('Miscellaneous Magic 4/5 : ' + roll.resultText);
      result = roll.resultText;
      
      if      ( result <=  01 ) message += 'Libram of Gainful Conjuration (M)';
      else if ( result <=  02 ) message += 'Libram of Ineffable Damnation (M)';
      else if ( result <=  03 ) message += 'Libram of Silver Magic (M)';
      else if ( result <=  04 ) message += 'Lyre of Building';
      else if ( result <=  05 ) message += 'Manual of Bodily Health';
      else if ( result <=  06 ) message += 'Manual of Goinful Exercise';
      else if ( result <=  07 ) message += 'Manual of Golems (C, M)';
      else if ( result <=  08 ) message += 'Manual of Puissant Skill at Arms (F)';
      else if ( result <=  09 ) message += 'Manual of Quickness of Action';
      else if ( result <=  10 ) message += 'Manual of Stealthy Pilfering (T)';
      else if ( result <=  11 ) message += 'Mattock of the Titans (F)';
      else if ( result <=  12 ) message += 'Maul of the Titans';
      else if ( result <=  15 ) message += 'Medallion of ESP';
      else if ( result <=  17 ) message += 'Medallion of Thought Projection';
      else if ( result <=  18 ) message += 'Mirror of Life Trapping (M)';
      else if ( result <=  19 ) message += 'Mirror of Mental Prowess';
      else if ( result <=  20 ) message += 'Mirror of Opposition';
      else if ( result <=  23 ) message += 'Necklace of Adaptation';
      else if ( result <=  27 ) message += 'Necklace of Missiles';
      else if ( result <=  33 ) message += 'Necklace of Prayer Beads (C)';
      else if ( result <=  35 ) message += 'Necklace of Strangulation';
      else if ( result <=  38 ) message += 'Net of Entrapment (C, F, T)';
      else if ( result <=  42 ) message += 'Net of Snaring (C, F, T)';
      else if ( result <=  44 ) message += 'Nolzurs\' Marvelous Pigments';
      else if ( result <=  46 ) message += 'Pearl of Power (M)';
      else if ( result <=  48 ) message += 'Peorl of Wisdom (C)';
      else if ( result <=  50 ) message += 'Periapt of Foul Rotting';
      else if ( result <=  53 ) message += 'Periapt of Health';
      else if ( result <=  60 ) message += 'Periapt of Proof Against Poison';
      else if ( result <=  64 ) message += 'Periapt of Wound Closure';
      else if ( result <=  70 ) message += 'Phylactery of Faithfulness (C)';
      else if ( result <=  74 ) message += 'Phylactery of long Years (C)';
      else if ( result <=  76 ) message += 'Phylactery of Monstrous Attention (C)';
      else if ( result <=  84 ) message += 'Pipes of the Sewers';
      else if ( result <=  85 ) message += 'Portable Hole';
      else if ( result <=  100) message += 'Quaal\'s Feather Token';
      else                      message += 'ERROR - value not in range';
    }
    
    else if ( category == 'Miscellaneous Magic 5/5' )
    {
      roll   = this.roll('1d100');
      response.resultData.push('Miscellaneous Magic 5/5 : ' + roll.resultText);
      result = roll.resultText;
      
      if      ( result <=  01 ) message += 'Robe of the Archmagi (M)';
      else if ( result <=  08 ) message += 'Robe of Blending';
      else if ( result <=  09 ) message += 'Robe of Eyes (M)';
      else if ( result <=  10 ) message += 'Robe of Powerlessness (M)';
      else if ( result <=  11 ) message += 'Robe of Scintillating Colors (C, M)';
      else if ( result <=  19 ) message += 'Robe of Useful ftems (M)';
      else if ( result <=  25 ) message += 'Rope of Climbing';
      else if ( result <=  27 ) message += 'Rope of Constriction';
      else if ( result <=  31 ) message += 'Rope of Entanglement';
      else if ( result <=  32 ) message += 'Rug of Smothering';
      else if ( result <=  33 ) message += 'Rug of Welcome (M)';
      else if ( result <=  34 ) message += 'Saw of Mighty Cutting (F)';
      else if ( result <=  35 ) message += 'Scarab of Death';
      else if ( result <=  38 ) message += 'Scarab of Enraging Enemies';
      else if ( result <=  40 ) message += 'Scarab of Insanity';
      else if ( result <=  46 ) message += 'scarab of Protection';
      else if ( result <=  47 ) message += 'Spade of Colossal Excavation (F)';
      else if ( result <=  48 ) message += 'Sphere of Annihilation (M)';
      else if ( result <=  50 ) message += 'Stone of Controlling Earth Elementals';
      else if ( result <=  52 ) message += 'Stone of Good Luck (Luckstone)';
      else if ( result <=  54 ) message += 'Stone of Weight (Loadstone)';
      else if ( result <=  57 ) message += 'Talisman of Pure Good (C)';
      else if ( result <=  58 ) message += 'Talisman of the Sphere (M)';
      else if ( result <=  60 ) message += 'Talisman of Ultimate Evil (C)';
      else if ( result <=  66 ) message += 'Talisman of Zagy';
      else if ( result <=  67 ) message += 'Tome of Clear Thought';
      else if ( result <=  68 ) message += 'Tome of Leadership and Influence';
      else if ( result <=  69 ) message += 'Tome of Understanding';
      else if ( result <=  76 ) message += 'Trident of Fish Command (C, F, T)';
      else if ( result <=  78 ) message += 'Trident of Submission (F)';
      else if ( result <=  83 ) message += 'Trident of Warning (C, F, T)';
      else if ( result <=  85 ) message += 'Trident of Yearning';
      else if ( result <=  87 ) message += 'Vacuous Grimoire';
      else if ( result <=  90 ) message += 'Well of Many Worlds';
      else if ( result <= 100 ) message += 'Wings of Flying';
      else                      message += 'ERROR - value not in range';
    }
    
    else if ( category == 'Armor & Shields' )
    {
      roll   = this.roll('1d100');
      response.resultData.push('Armor & Shields : ' + roll.resultText);
      result = roll.resultText;
      
      var size = this.roll('1d100').resultText;
      if      ( size <=  65 ) size = ' (human-sized)';
      else if ( size <=  85 ) size = ' (elf-sized)';
      else if ( size <=  95 ) size = ' (dwarf-sized)';
      else if ( size <= 100 ) size = ' (gnome/halfling-sized)';
      else                    size = ' ERROR - size value not in range';
      
      if      ( result <=  05 ) message += 'Chain Mail +1' + size;
      else if ( result <=  09 ) message += 'Chain Mail +2' + size;
      else if ( result <=  11 ) message += 'Chain Mail +3' + size;
      else if ( result <=  19 ) message += 'Leather Armor +1' + size;
      else if ( result <=  26 ) message += 'Plate Mail +1' + size;
      else if ( result <=  32 ) message += 'Plate Mail +2' + size;
      else if ( result <=  35 ) message += 'Plate Mail +3' + size;
      else if ( result <=  37 ) message += 'Plate Mail +4' + size;
      else if ( result <=  38 ) message += 'Plate Mail +5' + size;
      else if ( result <=  39 ) message += 'Plate Mail of Etherealness' + size;
      else if ( result <=  44 ) message += 'Plate Mail of Vulnerability' + size;
      else if ( result <=  50 ) message += 'Ring Mail +1' + size;
      else if ( result <=  55 ) message += 'Scale Mail +1' + size;
      else if ( result <=  59 ) message += 'Scale Mail +2' + size;
      else if ( result <=  63 ) message += 'Splint Mail +1' + size;
      else if ( result <=  66 ) message += 'Splint Mail +2' + size;
      else if ( result <=  68 ) message += 'Splint Mail +3' + size;
      else if ( result <=  69 ) message += 'Splint Mail +4' + size;
      else if ( result <=  75 ) message += 'Studded Leather +1' + size;
      else if ( result <=  84 ) message += 'Shield +1';
      else if ( result <=  89 ) message += 'Shield +2';
      else if ( result <=  93 ) message += 'Shield +3';
      else if ( result <=  95 ) message += 'Shield +4';
      else if ( result <=  96 ) message += 'Shield +5';
      else if ( result <=  97 ) message += 'Shield, large, +1, +4 vs. missiles';
      else if ( result <= 100 ) message += 'Shield -1, missile attractor';
      else                      message += 'ERROR - value not in range';
    }
    
    else if ( category == 'Swords' )
    {
      roll   = this.roll('1d100');
      response.resultData.push('Swords : ' + roll.resultText);
      result = roll.resultText;
      
      var type = this.roll('1d100').resultText;
      if      ( type <=  70 ) type = 'Longsword';
      else if ( type <=  90 ) type = 'Broadsword';
      else if ( type <=  95 ) type = 'Short Sword';
      else if ( type <=  99 ) type = 'Bastard Sword';
      else if ( type <= 100 ) type = 'Two-Handed Sword';
      else                    type = 'ERROR - type value not in range';
      
      if      ( result <=  25 ) message += type + ' +1';
      else if ( result <=  30 ) message += type + ' +1, +2 vs. magic-using & enchanted creatures';
      else if ( result <=  35 ) message += type + ' +1, +3 vs. lycanthropes & shape changers';
      else if ( result <=  40 ) message += type + ' +1, +3 vs. regenerating creatures';
      else if ( result <=  45 ) message += type + ' +1, +4 vs. reptiles';
      else if ( result <=  49 ) message += type + ' +1, Flame Tongue, +2 vs. regenerating creatures, + 3 vs. cold-using, inflammable, or avian creatures, +4 vs. undead';
      else if ( result <=  50 ) message += type + ' +1, Luck Blade';
      else if ( result <=  58 ) message += type + ' +2';
      else if ( result <=  62 ) message += type + ' +2, Giant Slayer';
      else if ( result <=  66 ) message += type + ' +2, Dragon Slayer';
      else if ( result <=  67 ) message += type + ' +2, Nine Lives Stealer';
      else if ( result <=  71 ) message += type + ' +3';
      else if ( result <=  74 ) message += type + ' +3, Frost Brand, +6 vs. fire-using/dwelling creatures';
      else if ( result <=  76 ) message += type + ' +4';
      else if ( result <=  77 ) message += type + ' +4, Defender';
      else if ( result <=  78 ) message += type + ' +5';
      else if ( result <=  79 ) message += type + ' +5, Defender';
      else if ( result <=  80 ) message += type + ' +5, Holy Avenger';
      else if ( result <=  81 ) message += type + ' of Dancing';
      else if ( result <=  82 ) message += type + ' of Wounding';
      else if ( result <=  83 ) message += type + ' of Life Stealing';
      else if ( result <=  84 ) message += type + ' of Sharpness';
      else if ( result <=  85 ) message += type + ', Vorpal Weapon';
      else if ( result <=  90 ) message += type + ' +1, Cursed';
      else if ( result <=  95 ) message += type + ' -2, Cursed';
      else if ( result <= 100 ) message += type + ', Cursed Berserking';
      else                    message += 'ERROR - value not in range';
      
      var unusual = this.roll('1d100').resultText;
      if      ( unusual <=  75 ) unusual = '';
      else if ( unusual <=  83 ) unusual = ' [unusual - intelligence 12]';
      else if ( unusual <=  89 ) unusual = ' [unusual - intelligence 13]';
      else if ( unusual <=  94 ) unusual = ' [unusual - intelligence 14]';
      else if ( unusual <=  97 ) unusual = ' [unusual - intelligence 15]';
      else if ( unusual <=  99 ) unusual = ' [unusual - intelligence 16]';
      else if ( unusual <= 100 ) unusual = ' [unusual - intelligence 17]';
      else                       unusual = 'ERROR - type value not in range';
      
      // TODO: this pushes in an empty element if not unusual
      message += unusual;
      response.resultData.push(unusual);
    }
    
    else if ( category == 'Miscellaneous Weapons' )
    {
      roll   = this.roll('1d100');
      response.resultData.push('[Miscellaneous Weapons : ' + roll.resultText);
      result = roll.resultText;
      
      if      ( result <=   8 ) message += 'Arrow + 1, 2-24 in number';
      else if ( result <=  12 ) message += 'Arrow +2, 2-16 in number';
      else if ( result <=  14 ) message += 'Arrow +3, 2-12 in number';
      else if ( result <=  15 ) message += 'Arrow of Slaying';
      else if ( result <=  20 ) message += 'Axe +1';
      else if ( result <=  22 ) message += 'Axe +2';
      else if ( result <=  23 ) message += 'Axe +2, Throwing';
      else if ( result <=  24 ) message += 'Axe +3';
      else if ( result <=  27 ) message += 'Battle Axe + 1';
      else if ( result <=  32 ) message += 'Bolt +2, 2-20 in number';
      else if ( result <=  35 ) message += 'Bow +1';
      else if ( result <=  36 ) message += 'Crossbow of Accuracy, +3';
      else if ( result <=  37 ) message += 'Crossbow of Distance';
      else if ( result <=  38 ) message += 'Crossbow of Speed';
      else if ( result <=  46 ) message += 'Dagger +1, +2 vs. creatures smaller than man-sized';
      else if ( result <=  50 ) message += 'Dagger +2, + 3 vs. creatures larger than man-sized';
      else if ( result <=  51 ) message += 'Dagger of Venom';
      else if ( result <=  56 ) message += 'Flail +1';
      else if ( result <=  60 ) message += 'Hammer +1';
      else if ( result <=  62 ) message += 'Hammer +2';
      else if ( result <=  63 ) message += 'Hammer +3, Dwarven Thrower';
      else if ( result <=  64 ) message += 'Hammer of Thunderbolts';
      else if ( result <=  67 ) message += 'Javelin +2';
      else if ( result <=  72 ) message += 'Mace +1';
      else if ( result <=  75 ) message += 'Mace +2';
      else if ( result <=  76 ) message += 'Mace of Disruption';
      else if ( result <=  77 ) message += 'Mace +4';
      else if ( result <=  80 ) message += 'Military Pick +1';
      else if ( result <=  83 ) message += 'Morning Star +1';
      else if ( result <=  88 ) message += 'Scimitar +2';
      else if ( result <=  89 ) message += 'Sling of Seeking +2';
      else if ( result <=  94 ) message += 'Spear +1';
      else if ( result <=  96 ) message += 'Spear +2';
      else if ( result <=  97 ) message += 'Spear +3';
      else if ( result <=  99 ) message += 'Spear, Cursed Backbiter';
      else if ( result <= 100 ) message += 'Trident (Military Fork) +3';
      else                      message += 'ERROR - value not in range';
    }
   
    //console.log(message);
    response.success    = true;
    response.resultText = message;
    return response;
  
  },
  
  'foo' : function(bar)
  {
  },
}

// Get the command function, if any, that should process a given
// command string - note that the string should include all parameters,
// in case the implementation wants to perform any kind of pre-validation.
//
// TODO: This should probably be templated in a parent object somewhere.
GameMaster.Game.ADnD1E.prototype.getCommand = function(cmd)
{
  // TODO: This take the whole command object, with args preparsed. That implementation
  // should get cleaned up at some point, as should this immediately thereafter.
  
  return this.Commands[cmd.arg[0]];
  
  // NOTE: Ok so this cheezy implementation works like so:
  // gmServer.game.getCommand('roll 5d6')('3d6')
  
  // Oh, should the calls include arg0 when making them? Nope, I think not.
  // Then how to reliably yoink them? The standard method seems like it would
  // involve pre-parsing the arguments and then letting the function handle
  // them however it wanted, yes?
}