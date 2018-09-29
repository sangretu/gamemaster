/**
 * gamemaster-game.pathfinder1e.js
 *
 * Prototype Pathfinder 1E implementation for Game Master.
 *
 * Note this will be much more naive and hacky than the rest of the code for
 * now because it's a quick concept prototype that just happens to use the
 * existing engine, in whatever state it's in. Assuming I'm still capable of
 * writing "hacky" code, every time I try I still end up going into full
 * design mode.
 *
 * v0.1.0
 */

GameMaster.Game.Pathfinder1E = function(foo)
{
  this.coreSetName = "Pathfinder, First Edition";
}

GameMaster.Game.Pathfinder1E.prototype.Commands =
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
  
  'generateCharacter' : function()
  {
    // gamemaster result info (default)
    var response = 
    {
      success    : false,
      resultText : '',
      resultData : []
    };
    
    var fudging        = this.generateFudging();
    var homeland       = this.generateHomeland();
    var race           = this.generateRace();
    var age            = this.generateAge();
    var alignment      = this.generateAlignment();
    var characterClass = this.generateClass();
    var abilityScores  = this.generateAbilityScores();
    
    response.success = fudging.success && homeland.success && race.success && age.success && alignment.success && characterClass.success && abilityScores.success;
    
    response.resultData = fudging.resultData.concat(homeland.resultData.concat(race.resultData.concat(age.resultData.concat(alignment.resultData.concat(characterClass.resultData.concat(abilityScores.resultData))))));
    
    response.resultText = fudging.resultText + '\n' + homeland.resultText + '\n' + race.resultText + '\n' + age.resultText + '\n' + alignment.resultText + '\n' + characterClass.resultText + '\n' + abilityScores.resultText;
    
    return response;
  },
  
  'generateFudging' : function()
  {
    // gamemaster result info (default)
    var response = 
    {
      success    : false,
      resultText : '',
      resultData : []
    };
    
    var tier = 'Fudging';
    
    // TODO: again, naive logic with no error checking all throughout this function
    var roll   = this.roll('1d100');
    response.resultData.push(tier + ' : ' + roll.resultText);
    
    // Using message and result for now because they are already everywhere in the code
    var message = '';
    var result = roll.resultText;
    
    if (result == '100')
    { 
      tier = 'Rare Fudging';
      roll   = this.roll('1d100');
      response.resultData.push(tier + ' : ' + roll.resultText);
      result = roll.resultText;
      
      if (result == '100')
      { 
        tier = 'Epic Fudging';
        roll   = this.roll('1d100');
        response.resultData.push(tier + ' : ' + roll.resultText);
        result = roll.resultText;
      
        if (result == '100')
        { 
          tier = 'Legendary Fudging';
          roll   = this.roll('1d100');
          response.resultData.push(tier + ' : ' + roll.resultText);
          result = roll.resultText;
      
          if (result == '100')
          { 
            tier = 'Mythic Fudging';
            roll   = this.roll('1d100');
            response.resultData.push(tier + ' : ' + roll.resultText);
            result = roll.resultText;
          }
        }
      }
    }
    
    roll = this.roll('1d8');
    response.resultData.push(tier + ' : ' + roll.resultText);
    result = roll.resultText;
    message = tier + ' : ' + roll.resultText;
    
    response.success    = true;
    response.resultText = message;
    return response;
  },
  
  'generateHomeland' : function()
  {
    // NOTE: Generalizing now that I've tried fudging.
    // Fill this part out for each segment.
    var segment = 'Homeland';
    var die     = '1d4400000';
    
    // gamemaster result info (default)
    var response = 
    {
      success    : false,
      resultText : '',
      resultData : []
    };
    
    var tier = segment;
    
    // TODO: again, naive logic with no error checking all throughout this function
    var roll   = this.roll('1d100');
    response.resultData.push(tier + ' : ' + roll.resultText);
    
    // Using message and result for now because they are already everywhere in the code
    var message = '';
    var result = roll.resultText;
    
    if (result == '100')
    { 
      tier = 'Rare ' + segment;
      roll   = this.roll('1d100');
      response.resultData.push(tier + ' : ' + roll.resultText);
      result = roll.resultText;
      
      if (result == '100')
      { 
        tier = 'Epic ' + segment;
        roll   = this.roll('1d100');
        response.resultData.push(tier + ' : ' + roll.resultText);
        result = roll.resultText;
      
        if (result == '100')
        { 
          tier = 'Legendary ' + segment;
          roll   = this.roll('1d100');
          response.resultData.push(tier + ' : ' + roll.resultText);
          result = roll.resultText;
      
          if (result == '100')
          { 
            tier = 'Mythic ' + segment;
            roll   = this.roll('1d100');
            response.resultData.push(tier + ' : ' + roll.resultText);
            result = roll.resultText;
          }
        }
      }
    }
    
    roll = this.roll(die);
    response.resultData.push(tier + ' : ' + roll.resultText);
    result = roll.resultText;
    message = tier + ' : ' + roll.resultText;
    
    response.success    = true;
    response.resultText = message;
    return response;
  },
  
  'generateRace' : function()
  {
    // NOTE: Generalizing now that I've tried fudging.
    // Fill this part out for each segment.
    var segment = 'Race';
    var die     = '1d10';
    
    // gamemaster result info (default)
    var response = 
    {
      success    : false,
      resultText : '',
      resultData : []
    };
    
    var tier = segment;
    
    // TODO: again, naive logic with no error checking all throughout this function
    var roll   = this.roll('1d100');
    response.resultData.push(tier + ' : ' + roll.resultText);
    
    // Using message and result for now because they are already everywhere in the code
    var message = '';
    var result = roll.resultText;
    
    if (result == '100')
    { 
      tier = 'Rare ' + segment;
      roll   = this.roll('1d100');
      response.resultData.push(tier + ' : ' + roll.resultText);
      result = roll.resultText;
      
      if (result == '100')
      { 
        tier = 'Epic ' + segment;
        roll   = this.roll('1d100');
        response.resultData.push(tier + ' : ' + roll.resultText);
        result = roll.resultText;
      
        if (result == '100')
        { 
          tier = 'Legendary ' + segment;
          roll   = this.roll('1d100');
          response.resultData.push(tier + ' : ' + roll.resultText);
          result = roll.resultText;
      
          if (result == '100')
          { 
            tier = 'Mythic ' + segment;
            roll   = this.roll('1d100');
            response.resultData.push(tier + ' : ' + roll.resultText);
            result = roll.resultText;
          }
        }
      }
    }
    
    roll = this.roll(die);
    response.resultData.push(tier + ' : ' + roll.resultText);
    result = roll.resultText;
    message = tier + ' : ' + roll.resultText;
    
    response.success    = true;
    response.resultText = message;
    return response;
  },
  
  'generateAge' : function()
  {
    // NOTE: Generalizing now that I've tried fudging.
    // Fill this part out for each segment.
    var segment = 'Age';
    var die     = '1d10';
    
    // gamemaster result info (default)
    var response = 
    {
      success    : false,
      resultText : '',
      resultData : []
    };
    
    var tier = segment;
    
    // TODO: again, naive logic with no error checking all throughout this function
    var roll   = this.roll('1d100');
    response.resultData.push(tier + ' : ' + roll.resultText);
    
    // Using message and result for now because they are already everywhere in the code
    var message = '';
    var result = roll.resultText;
    
    if (result == '100')
    { 
      tier = 'Rare ' + segment;
      roll   = this.roll('1d100');
      response.resultData.push(tier + ' : ' + roll.resultText);
      result = roll.resultText;
      
      if (result == '100')
      { 
        tier = 'Epic ' + segment;
        roll   = this.roll('1d100');
        response.resultData.push(tier + ' : ' + roll.resultText);
        result = roll.resultText;
      
        if (result == '100')
        { 
          tier = 'Legendary ' + segment;
          roll   = this.roll('1d100');
          response.resultData.push(tier + ' : ' + roll.resultText);
          result = roll.resultText;
      
          if (result == '100')
          { 
            tier = 'Mythic ' + segment;
            roll   = this.roll('1d100');
            response.resultData.push(tier + ' : ' + roll.resultText);
            result = roll.resultText;
          }
        }
      }
    }
    
    roll = this.roll(die);
    response.resultData.push(tier + ' : ' + roll.resultText);
    result = roll.resultText;
    message = tier + ' : ' + roll.resultText;
    
    response.success    = true;
    response.resultText = message;
    return response;
  },
  
  'generateAlignment' : function()
  {
    // NOTE: Generalizing now that I've tried fudging.
    // Fill this part out for each segment.
    var segment = 'Alignment';
    var die     = '2d6';
    
    // gamemaster result info (default)
    var response = 
    {
      success    : false,
      resultText : '',
      resultData : []
    };
    
    var tier = segment;
    
    // TODO: again, naive logic with no error checking all throughout this function
    var roll   = this.roll('1d100');
    response.resultData.push(tier + ' : ' + roll.resultText);
    
    // Using message and result for now because they are already everywhere in the code
    var message = '';
    var result = roll.resultText;
    
    if (result == '100')
    { 
      tier = 'Rare ' + segment;
      roll   = this.roll('1d100');
      response.resultData.push(tier + ' : ' + roll.resultText);
      result = roll.resultText;
      
      if (result == '100')
      { 
        tier = 'Epic ' + segment;
        roll   = this.roll('1d100');
        response.resultData.push(tier + ' : ' + roll.resultText);
        result = roll.resultText;
      
        if (result == '100')
        { 
          tier = 'Legendary ' + segment;
          roll   = this.roll('1d100');
          response.resultData.push(tier + ' : ' + roll.resultText);
          result = roll.resultText;
      
          if (result == '100')
          { 
            tier = 'Mythic ' + segment;
            roll   = this.roll('1d100');
            response.resultData.push(tier + ' : ' + roll.resultText);
            result = roll.resultText;
          }
        }
      }
    }
    
    roll = this.roll(die);
    response.resultData.push(tier + ' : ' + roll.resultText);
    result = roll.resultText;
    message = tier + ' : ' + roll.resultText;
    
    response.success    = true;
    response.resultText = message;
    return response;
  },
  
  'generateClass' : function()
  {
    // NOTE: Generalizing now that I've tried fudging.
    // Fill this part out for each segment.
    var segment = 'Class';
    var die     = '1d37';
    
    // gamemaster result info (default)
    var response = 
    {
      success    : false,
      resultText : '',
      resultData : []
    };
    
    var tier = segment;
    
    // TODO: again, naive logic with no error checking all throughout this function
    var roll   = this.roll('1d100');
    response.resultData.push(tier + ' : ' + roll.resultText);
    
    // Using message and result for now because they are already everywhere in the code
    var message = '';
    var result = roll.resultText;
    
    if (result == '100')
    { 
      tier = 'Rare ' + segment;
      roll   = this.roll('1d100');
      response.resultData.push(tier + ' : ' + roll.resultText);
      result = roll.resultText;
      
      if (result == '100')
      { 
        tier = 'Epic ' + segment;
        roll   = this.roll('1d100');
        response.resultData.push(tier + ' : ' + roll.resultText);
        result = roll.resultText;
      
        if (result == '100')
        { 
          tier = 'Legendary ' + segment;
          roll   = this.roll('1d100');
          response.resultData.push(tier + ' : ' + roll.resultText);
          result = roll.resultText;
      
          if (result == '100')
          { 
            tier = 'Mythic ' + segment;
            roll   = this.roll('1d100');
            response.resultData.push(tier + ' : ' + roll.resultText);
            result = roll.resultText;
          }
        }
      }
    }
    
    roll = this.roll(die);
    response.resultData.push(tier + ' : ' + roll.resultText);
    result = roll.resultText;
    message = tier + ' : ' + roll.resultText;
    
    if (tier == segment)
    {
      var characterClass = 'undefined';
      
      switch (result)
      {
        case  1 : characterClass = 'Barbarian' ; break;
        case  2 : characterClass = 'Bard' ; break;
        case  3 : characterClass = 'Cleric' ; break;
        case  4 : characterClass = 'Druid' ; break;
        case  5 : characterClass = 'Fighter' ; break;
        case  6 : characterClass = 'Monk' ; break;
        case  7 : characterClass = 'Paladin / Antipaladin' ; break;
        case  8 : characterClass = 'Ranger' ; break;
        case  9 : characterClass = 'Rogue' ; break;
        case 10 : characterClass = 'Ninja' ; break;
        case 11 : characterClass = 'Sorcerer' ; break;
        case 12 : characterClass = 'Wizard' ; break;
        case 13 : characterClass = 'Alchemist' ; break;
        case 14 : characterClass = 'Cavalier / Samurai' ; break;
        case 15 : characterClass = 'Gunslinger' ; break;
        case 16 : characterClass = 'Inquisitor' ; break;
        case 17 : characterClass = 'Magus' ; break;
        case 18 : characterClass = 'Oracle' ; break;
        case 19 : characterClass = 'Summoner' ; break;
        case 20 : characterClass = 'Witch' ; break;
        case 21 : characterClass = 'Arcanist' ; break;
        case 22 : characterClass = 'Bloodrager' ; break;
        case 23 : characterClass = 'Brawler' ; break;
        case 24 : characterClass = 'Hunter' ; break;
        case 25 : characterClass = 'Investigator' ; break;
        case 26 : characterClass = 'Shaman' ; break;
        case 27 : characterClass = 'Skald' ; break;
        case 28 : characterClass = 'Slayer' ; break;
        case 29 : characterClass = 'Swashbuckler' ; break;
        case 30 : characterClass = 'Warpriest' ; break;
        case 31 : characterClass = 'Kineticist' ; break;
        case 32 : characterClass = 'Medium' ; break;
        case 33 : characterClass = 'Mesmerist' ; break;
        case 34 : characterClass = 'Occultist' ; break;
        case 35 : characterClass = 'Psychic' ; break;
        case 36 : characterClass = 'Spiritualist' ; break;
        case 37 : characterClass = 'Vigilante' ; break;
        default : characterClass = 'Error : ' + result;
      }
        
      message = tier + ' : ' + characterClass;
    }    
    
    response.success    = true;
    response.resultText = message;
    return response;
  },
  
  'generateAbilityScores' : function()
  {
    // NOTE: Generalizing now that I've tried fudging.
    // Fill this part out for each segment.
    var segment = 'Ability Scores';
    var die     = '18d6';
    
    // gamemaster result info (default)
    var response = 
    {
      success    : false,
      resultText : '',
      resultData : []
    };
    
    var tier = segment;
    
    // TODO: again, naive logic with no error checking all throughout this function
    var roll   = this.roll('1d100');
    response.resultData.push(tier + ' : ' + roll.resultText);
    
    // Using message and result for now because they are already everywhere in the code
    var message = '';
    var result = roll.resultText;
    
    if (result == '100')
    { 
      tier = 'Rare ' + segment;
      roll   = this.roll('1d100');
      response.resultData.push(tier + ' : ' + roll.resultText);
      result = roll.resultText;
      
      if (result == '100')
      { 
        tier = 'Epic ' + segment;
        roll   = this.roll('1d100');
        response.resultData.push(tier + ' : ' + roll.resultText);
        result = roll.resultText;
      
        if (result == '100')
        { 
          tier = 'Legendary ' + segment;
          roll   = this.roll('1d100');
          response.resultData.push(tier + ' : ' + roll.resultText);
          result = roll.resultText;
      
          if (result == '100')
          { 
            tier = 'Mythic ' + segment;
            roll   = this.roll('1d100');
            response.resultData.push(tier + ' : ' + roll.resultText);
            result = roll.resultText;
          }
        }
      }
    }
    
    roll = this.roll(die);
    response.resultData.push(tier + ' : ' + roll.resultText);
    result = roll.resultText;
    message = tier + ' : ' + roll.resultText;
    
    response.success    = true;
    response.resultText = message;
    return response;
  },
  
  'generateSegment' : function()
  {
    // NOTE: Generalizing now that I've tried fudging.
    // Fill this part out for each segment.
    var segment = 'Undefined';
    var die     = '1d10';
    
    // gamemaster result info (default)
    var response = 
    {
      success    : false,
      resultText : '',
      resultData : []
    };
    
    var tier = segment;
    
    // TODO: again, naive logic with no error checking all throughout this function
    var roll   = this.roll('1d100');
    response.resultData.push(tier + ' : ' + roll.resultText);
    
    // Using message and result for now because they are already everywhere in the code
    var message = '';
    var result = roll.resultText;
    
    if (result == '100')
    { 
      tier = 'Rare ' + segment;
      roll   = this.roll('1d100');
      response.resultData.push(tier + ' : ' + roll.resultText);
      result = roll.resultText;
      
      if (result == '100')
      { 
        tier = 'Epic ' + segment;
        roll   = this.roll('1d100');
        response.resultData.push(tier + ' : ' + roll.resultText);
        result = roll.resultText;
      
        if (result == '100')
        { 
          tier = 'Legendary ' + segment;
          roll   = this.roll('1d100');
          response.resultData.push(tier + ' : ' + roll.resultText);
          result = roll.resultText;
      
          if (result == '100')
          { 
            tier = 'Mythic ' + segment;
            roll   = this.roll('1d100');
            response.resultData.push(tier + ' : ' + roll.resultText);
            result = roll.resultText;
          }
        }
      }
    }
    
    roll = this.roll(die);
    response.resultData.push(tier + ' : ' + roll.resultText);
    result = roll.resultText;
    message = tier + ' : ' + roll.resultText;
    
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
GameMaster.Game.Pathfinder1E.prototype.getCommand = function(cmd)
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