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

GameMaster.Game.Pathfinder1E.creationData =
{
  'races' : 
  {
    'standard'  : 
    [
      'dwarf',
      'elf',
      'gnome',
      'half-elf',
      'half-orc',
      'halfling',
      'human'
    ] ,
    'rare'      : 
    [
      'aasimar',
      'catfolk',
      'dhampir',
      'drow',
      'fetchling',
      'goblin',
      'hobgoblin',
      'ifrit',
      'kobold',
      'orc',
      'oread',
      'ratfolk',
      'sylph',
      'tengu',
      'tiefling',
      'undine',
      'crossbreed 2 standard races'
    ] ,
    'epic'      : 
    [
      'changeling',
      'duergar',
      'gillman',
      'grippli',
      'kitsune',
      'merfolk',
      'nagaji',
      'samsaran',
      'strix',
      'suli',
      'svirfneblin',
      'vanaras',
      'vishkanya',
      'wayang',
      'crossbreed 2-3 standard/rare races'
    ] ,
    'legendary' : 
    [
      'adaro',
      'android',
      'aphorite',
      'aquatic elf',
      'boggard',
      'cecaelia',
      'drow noble',
      'ganzi',
      'gathlain',
      'ghoran',
      'green martian',
      'grindylow',
      'kasatha',
      'kuru',
      'lashunta',
      'locathah',
      'monkey goblin',
      'munavri',
      'reborn samsaran',
      'sahuagin',
      'shabli',
      'skinwalker',
      'triaxian',
      'trilon',
      'trox',
      'vine leshy',
      'wyrwood',
      'wyvaran',
      'crossbreed 2-4 standard/rare/legendary races'
    ] ,
    'mythic'    : 
    [
      'race builder',
      'crossbreed 2-5 races'
    ] ,
  },
  /*
  '' : 
  {
    'standard'  : [] ,
    'rare'      : [] ,
    'epic'      : [] ,
    'legendary' : [] ,
    'mythic'    : [] ,
  },
  */
}
// adding more to this at the end of the file because it's huge

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
    // NOTE: Generalizing now that I've tried fudging.
    // Fill this part out for each segment.
    var segment = 'fudging';
    var tier    = 'standard';
    
    // gamemaster result info (default)
    var response = 
    {
      success    : false,
      resultText : '',
      resultData : []
    };
    
    // TODO: again, naive logic with no error checking all throughout this function
    var roll   = this.roll('1d10');
    response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    
    if (roll.resultText == '10')
    {
      tier   = 'rare'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'epic'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'legendary'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'mythic'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    
    var options = ['placeholder_1', 'placeholder_2'];
    var die = '1d' + options.length;
    var message = '';
    
    roll = this.roll(die);
    response.resultData.push(segment + ' : ' + roll.resultText);
    result = options[roll.resultText - 1];
    message = tier + ' ' + segment + ' : ' + result;
    
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
    var segment = 'race';
    var tier    = 'standard';
    
    // gamemaster result info (default)
    var response = 
    {
      success    : false,
      resultText : '',
      resultData : []
    };
    
    // TODO: again, naive logic with no error checking all throughout this function
    var roll   = this.roll('1d10');
    response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    
    if (roll.resultText == '10')
    {
      tier   = 'rare'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'epic'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'legendary'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'mythic'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    
    var options = GameMaster.Game.Pathfinder1E.creationData.races[tier];
    var die = '1d' + options.length;
    var message = '';
    
    roll = this.roll(die);
    response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    result = options[roll.resultText - 1];    
    message = tier + ' ' + segment + ' : ' + result;
    
    response.success    = true;
    response.resultText = message;
    return response;
  },
  
  'generateAge' : function()
  {

    // NOTE: Generalizing now that I've tried fudging.
    // Fill this part out for each segment.
    var segment = 'age';
    var tier    = 'standard';
    
    // gamemaster result info (default)
    var response = 
    {
      success    : false,
      resultText : '',
      resultData : []
    };
    
    // TODO: again, naive logic with no error checking all throughout this function
    var roll   = this.roll('1d10');
    response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    
    if (roll.resultText == '10')
    {
      tier   = 'rare'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'epic'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'legendary'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'mythic'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    
    var options = ['placeholder_1', 'placeholder_2'];
    var die = '1d' + options.length;
    var message = '';
    
    roll = this.roll(die);
    response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    result = options[roll.resultText - 1];
    message = tier + ' ' + segment + ' : ' + result;
    
    response.success    = true;
    response.resultText = message;
    return response;
  },
  
  'generateAlignment' : function()
  {
    // NOTE: Generalizing now that I've tried fudging.
    // Fill this part out for each segment.
    var segment = 'alignment';
    var tier    = 'standard';
    
    // gamemaster result info (default)
    var response = 
    {
      success    : false,
      resultText : '',
      resultData : []
    };
    
    // TODO: again, naive logic with no error checking all throughout this function
    var roll   = this.roll('1d10');
    response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    
    if (roll.resultText == '10')
    {
      tier   = 'rare'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'epic'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'legendary'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'mythic'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    
    var options = ['LG','LN','LE','NG','N','NE','CG','CN','CE'];
    var die = '1d' + options.length;
    var message = '';
    
    roll = this.roll(die);
    response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    result = options[roll.resultText - 1];
    message = tier + ' ' + segment + ' : ' + result;
    
    response.success    = true;
    response.resultText = message;
    return response;
  },
  
  'generateClass' : function()
  {
    // NOTE: Generalizing now that I've tried fudging.
    // Fill this part out for each segment.
    var segment = 'class';
    var tier    = 'standard';
    
    // gamemaster result info (default)
    var response = 
    {
      success    : false,
      resultText : '',
      resultData : []
    };
    
    // TODO: again, naive logic with no error checking all throughout this function
    var roll   = this.roll('1d10');
    response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    
    if (roll.resultText == '10')
    {
      tier   = 'rare'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'epic'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'legendary'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'mythic'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    
    var options = GameMaster.Game.Pathfinder1E.creationData.classes;
    
    var die = '1d' + options.length;
    var message = '';
    
    roll = this.roll(die);
    response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    result = options[roll.resultText - 1];
    
    // special result handling for classes because I imported all that data
    // from archives of nethys
    
    message = tier + ' ' + segment + ' : ' + result.name + '\n';
    message += 'description : ' + result.description + '\n';
    message += 'role : ' + result.role;
    
    if (tier != 'standard')
    {
      options = result.archetypes;
      die = '1d' + options.length;
      roll = this.roll(die);
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
      result = options[roll.resultText - 1];
      message += '\n';
      message += 'archetype : ' + result.name + '\n';
      message += 'summary : ' + result.summary + '\n';
      message += 'replaces : ' + result.replaces;
    }
    
    response.success    = true;
    response.resultText = message;
    return response;
  },
  
  'generateAbilityScores' : function()
  {
    // NOTE: Generalizing now that I've tried fudging.
    // Fill this part out for each segment.
    var segment = 'ability scores';
    var tier    = 'standard';
    
    // gamemaster result info (default)
    var response = 
    {
      success    : false,
      resultText : '',
      resultData : []
    };
    
    // TODO: again, naive logic with no error checking all throughout this function
    var roll   = this.roll('1d10');
    response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    
    if (roll.resultText == '10')
    {
      tier   = 'rare'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'epic'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'legendary'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'mythic'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    };
    
    var options = ['placeholder_1', 'placeholder_2'];
    var die = '1d' + options.length;
    var message = '';
    
    roll = this.roll(die);
    response.resultData.push(tier + ' ' + segment + ' : ' + roll.resultText);
    result = options[roll.resultText - 1];
    message = tier + ' ' + segment + ' : ' + result;
    
    response.success    = true;
    response.resultText = message;
    return response;
  },
  
  'generateSegment' : function()
  {
    // NOTE: Generalizing now that I've tried fudging.
    // Fill this part out for each segment.
    var segment = 'segment';
    var tier    = 'standard';
    
    // gamemaster result info (default)
    var response = 
    {
      success    : false,
      resultText : '',
      resultData : []
    };
    
    // TODO: again, naive logic with no error checking all throughout this function
    var roll   = this.roll('1d10');
    response.resultData.push(tier + ' : ' + roll.resultText);
    
    if (roll.resultText == '10')
    {
      tier   = 'rare'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'epic'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'legendary'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' : ' + roll.resultText);
    };
    if (roll.resultText == '10')
    {
      tier   = 'mythic'
      roll   = this.roll('1d10');
      response.resultData.push(tier + ' : ' + roll.resultText);
    };
    
    var options = ['placeholder_1', 'placeholder_2'];
    var die = '1d' + options.length;
    var message = '';
    
    roll = this.roll(die);
    response.resultData.push(tier + ' : ' + roll.resultText);
    result = options[roll.resultText - 1];
    message = tier + ' ' + segment + ' : ' + result;
    
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

GameMaster.Game.Pathfinder1E.creationData.classes =
[
  { "name"       : "Alchemist" ,
  
    "description": "Whether secreted away in a smoky basement laboratory or gleefully experimenting in a well-respected school of magic, the alchemist is often regarded as being just as unstable, unpredictable, and dangerous as the concoctions he brews. While some creators of alchemical items content themselves with sedentary lives as merchants, providing tindertwigs and smokesticks, the true alchemist answers a deeper calling. Rather than cast magic like a spellcaster, the alchemist captures his own magic potential within liquids and extracts he creates, infusing his chemicals with virulent power to grant him impressive skill with poisons, explosives, and all manner of self-transformative magic.",
    
    "role": "The alchemist’s reputation is not softened by his exuberance (some would say dangerous recklessness) in perfecting his magical extracts and potion-like creations, infusing these substances with magic siphoned from his aura and using his own body as experimental stock. Nor is it mollified by the alchemist’s almost gleeful passion for building explosive bombs and discovering strange new poisons and methods for their use. These traits, while making him a liability and risk for most civilized organizations and institutions of higher learning, seem to fit quite well with most adventuring groups." ,
    
    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Aerochemist",
        "replaces": "Mutagen, Swift Poisoning; Persistent Mutagen; Poison Use; Swift Alchemy; Poison Resistance",
        "summary": "Aerochemists use scraps of Shory’s magic in their concoctions to gain personal powers of flight."
      },
      {
        "name": "Alchemical Sapper",
        "replaces": "Class Skills; Bomb; Mutagen; Poison Resistance; Swift Alchemy; 6th-level Discovery; Poison Immunity",
        "summary": "Alchemical sappers are trained to create explosives."
      },
      {
        "name": "Alchemical Trapper",
        "replaces": "2nd and 4th-level Discoveries",
        "summary": "(Kobold Only) Because kobolds rely on traps to soften up enemies, kobold alchemists learn to turn bombs into traps."
      },
      {
        "name": "Aquachymist",
        "replaces": "Class Skills; Bombs; 2nd-level Discovery",
        "summary": "Aquachymists are those rare few alchemists of land-dwelling and aquatic races alike who strive to unlock new and fantastic secrets of alchemy that can be discovered only in the water’s depths."
      },
      {
        "name": "Beastmorph",
        "replaces": "Swift Alchemy; Swift Poisoning; Poison Immunity; Persistent Mutagen",
        "summary": "Beastmorphs study the anatomy of monsters, learning how they achieve their strange powers."
      },
      {
        "name": "Blazing Torchbearer",
        "replaces": "Brew Potion; Poison Use; 4th-level Discovery",
        "summary": "The blazing torchbearer is especially adept at manipulating flames of all kinds."
      },
      {
        "name": "Blightseeker",
        "replaces": "Bombs; 6th, 12th, 18th-level Discovery; Persistent Mutagen",
        "summary": "Blightseekers are alchemists devoted to the study of fungi native to the Darklands."
      },
      {
        "name": "Blood Alchemist",
        "replaces": "Alignment; Mutagen; Bombs",
        "summary": "Most alchemists can transform matter and energy into other forms, but some wicked specialists realize that life itself is an energy that can greatly fuel their alchemy."
      },
      {
        "name": "Bogborn Alchemist",
        "replaces": "Class Skills; Throw Anything",
        "summary": "(Grippli Only) Some grippli alchemists are particularly attuned to the swamps and the dangerous creatures that inhabit them; these serve as their laboratories and research subjects, respectively."
      },
      {
        "name": "Bramble Brewer",
        "replaces": "2nd-level Discovery; Mutagen; Greater Mutagen; Grand Mutagen",
        "summary": "(Half-Elf Only) Some half-elven alchemists merge human curiosity with their elven link to nature."
      },
      {
        "name": "Chirurgeon",
        "replaces": "Poison Use; Poison Resistance +4; Poison Immunity",
        "summary": "An alchemist who studies anatomy and uses this knowledge to heal is a chirurgeon."
      },
      {
        "name": "Clone Master",
        "replaces": "Bomb; Poison Resistance +6; Poison Immunity",
        "summary": "Clone masters practice duplicating existing creatures in order to better understand how to create new life."
      },
      {
        "name": "Concocter",
        "replaces": "2nd, 4th, 6th-level Discovery; Swift Poisoning",
        "summary": "Concocters are experts at combining sets of chemicals to create unique effects."
      },
      {
        "name": "Construct Rider",
        "replaces": "Class Skills; Brew Potion; Mutagen; 4th-level Discovery; Extracts",
        "summary": "A construct rider creates arcane devices to emulate and surpass weak flesh."
      },
      {
        "name": "Crimson Chymist",
        "replaces": "Mutagen",
        "summary": "Crimson chymists turn to the alchemical arts, infusing their bodies with the mutagenic essence of the Mantis God."
      },
      {
        "name": "Crypt Breaker",
        "replaces": "Alchemist Bomb, Mutagen, Brew Potion, Persistent Mutagen",
        "summary": "Crypt breakers use their powers of perception and alchemical adaptation to safely investigate the mysteries of the past."
      },
      {
        "name": "Deep Bomber",
        "replaces": "Poison Use; Swift Alchemy; Instant Alchemy; Swift Poisoning",
        "summary": "(Svirfneblin Only) Consumed with keeping hidden from the horrors below the surface, svirfneblin use their racial proclivity for alchemy and their inherent talent for obfuscation to strike their enemies from the darkness and retreat unseen."
      },
      {
        "name": "Dimensional Excavator",
        "replaces": "4th-level Discovery",
        "summary": "Dimensional excavators have discovered and recorded ways to cause their bombs to create minor tears in the fabric of reality, forming extradimensional pits to vex their foes."
      },
      {
        "name": "Dragonblood Chymist",
        "replaces": "Mutagen; 2nd, 12th, 16th-level discovery; Throw Anything; Poison Resistance; Poison Use; Swift Poisoning",
        "summary": "The dragonblood chymist specializes in the reckless distillation of extracts and elixirs that allow them to experience the might of a dragon, however dangerous it might be\n."
      },
      {
        "name": "Ectochymist",
        "replaces": "Class Skills; Bombs; Poison Resistance; Poison Use; Swift Poisoning; 8th-level Alchemist Discovery; Poison Immunity",
        "summary": "Ectochymists study the effects of alchemy on soul and spirit, focusing on fighting ghosts and other incorporeal creatures."
      },
      {
        "name": "Ectoplasm Master",
        "replaces": "Brew Potion",
        "summary": "Alchemists capable of distilling spectral horrors into alchemical reagents."
      },
      {
        "name": "Eldritch Poisoner",
        "replaces": "Bomb; Throw Anything; Mutagen; Persistent Mutagen; 4th-level Discovery",
        "summary": "Eldritch poisoners are masters of the toxic arts, synthesizing lethal and incapacitating poisons with uncanny speed and expertise."
      },
      {
        "name": "Energist",
        "replaces": "Extracts; Bombs; Poison Immunity; Throw Anything; 2nd-level Discovery; Swift Poisoning; Poison Resistance",
        "summary": "While most alchemists experiment mainly with chemicals and physical materials to create disparate effects, energists tap into the energy of life or death: positive energy or negative energy."
      },
      {
        "name": "Energy Scientist",
        "replaces": "Class Skills; Alchemy; Poison Resistance; Poison Immunity; Poison Use; Swift Poisoning",
        "summary": "Energy scientists fervently prepare themselves to overcome exposure to specific elemental hazards so that they can traverse the Elemental Planes in search of novel discoveries and reagents."
      },
      {
        "name": "Fermenter",
        "replaces": "Poison Resistance; 10th-level Discovery; Poison Use; Swift Poisoning",
        "summary": "Little more than moonshiners to some, fermenters focus their efforts on imbibing substances, learning from the resulting effects on their bodies, and infusing this knowledge into their skill sets."
      },
      {
        "name": "Fire Bomber",
        "replaces": "Weapon/Armor Proficiency; Bomb; Throw Anything; 4th-level Discovery; Poison Resistance +6; Poison Immunity; Persistent Mutagen",
        "summary": "(Goblin Only) Fire bombers are exceptionally good at using bombs to burn creatures and blow things up, but are not quite as good at creating other types of bombs or extracts."
      },
      {
        "name": "First World Innovator",
        "replaces": "Brew Potion; Poison Use; Swift Poisoning; Poison Immunity; Bombs; Poison Resistance",
        "summary": "Those who can harness primal reagents—mundane reagents infused with the power of the First World—walk a fine line between genius and catastrophe."
      },
      {
        "name": "Gloom Chymist",
        "replaces": "Bomb; Poison Resistance; Poison Use; Swift Poisoning",
        "summary": "A breakthrough in Nidalese alchemy led to the creation of glooms, magical fields of darkness from the Shadow Plane that can be momentarily animated with the use of strange compounds."
      },
      {
        "name": "Grenadier",
        "replaces": "Brew Potion, Poison Resistance, Poison Use, Swift Poisoning, Poison Immunity",
        "summary": "Grenadiers sacrifice their skill with poisons in order to become more adept at using alchemical bombs."
      },
      {
        "name": "Grenadier [MC]",
        "replaces": "Brew Potion; Poison Resistance; Poison Use; Swift Poisoning; Poison Immunity",
        "summary": "Grenadiers train to exercise their talents in the thick of battle, even when not under the influence of their mutagens. They learn methods of combining weapon attacks with their alchemical magic, and sacrifice skill with poisons in order to become more adept at using alchemical bombs or using alchemical items in conjunction with their martial skills."
      },
      {
        "name": "Gun Chemist",
        "replaces": "Weapon and Armor Proficiencies; Bombs; Brew Potion; Throw Anything; Poison Resistance; Swift Poisoning",
        "summary": "Simple alchemists may dabble in explosives, but for the rare gun chemist, a firearm’s barrel is his crucible"
      },
      {
        "name": "Herbalist",
        "replaces": "Alchemy; Key Ability Score; Throw Anything; Bombs; Poison Use; Poison Resistance; Poison Immunity",
        "summary": "(Vine Leshy) Vine leshys who study the physical and spiritual composition of their own bodies have discovered a strange herbal alchemy all their own."
      },
      {
        "name": "Homunculist",
        "replaces": "Poison Use; Poison Resistance; Poison Immunity; Swift Poisoning; Mutagen",
        "summary": "One of the grand goals of alchemy is the ability to create new life. A homunculist has made this dream a reality, growing and modifying a familiar in his own laboratory."
      },
      {
        "name": "Horticulturist",
        "replaces": "Mutagen; 2nd and 4th-level Discoveries; Bomb; Poison Resistance; Poison Use; Poison Immunity; Persistent Mutagen",
        "summary": "A horticulturist spends his time cultivating plants and plant creatures, allowing him to experiment with strange and wondrous herbal concoctions."
      },
      {
        "name": "Ice Chemist",
        "replaces": "Bomb; Poison Resistance; Poison Immunity; 2nd-level Discovery",
        "summary": "Reclusive alchemists who dwell in the highest mountains or on the frozen tundra devote their skills to mastering the cold."
      },
      {
        "name": "Inspired Chemist",
        "replaces": "Mutagen",
        "summary": "Akin to a mindchemistUM, inspired chemists use a type of cognatogen that instead of increasing their mental ability scores grants them inspiration like an investigator."
      },
      {
        "name": "Internal Alchemist",
        "replaces": "Throw Anything; Swift Alchemy; Swift Poisoning",
        "summary": "An internal alchemist studies medicine, diet, and the living body to purify the self in the hope of gaining immortality."
      },
      {
        "name": "Interrogator",
        "replaces": "Class Skills; Bomb; Mutagen; Persistent Mutagen",
        "summary": "An interrogator extracts vital information from reluctant individuals using alchemical and traditional methods."
      },
      {
        "name": "Mad Scientist",
        "replaces": "Alchemy, 2nd, 4th-level Discovery; Mutagen",
        "summary": "The mad scientist’s colleagues laughed at her insights, mocked her theories, and hounded her from the halls of academia, simply because they were too weak and frightened to understand her work."
      },
      {
        "name": "Metamorph",
        "replaces": "Class Skills; Bomb; Extracts; Throw Anything; Swift Alchemy; Swift Poisoning; Instant Alchemy",
        "summary": "Metamorphs eschew traditional alchemy, focusing on internal chemistry and the transfiguration of living forms."
      },
      {
        "name": "Mindchemist",
        "replaces": "Mutagen; Poison Use",
        "summary": "A mindchemist can reach incredible levels of mental acuity, but suffers lingering debilitating effects to his physique."
      },
      {
        "name": "Mixologist",
        "replaces": "Alchemy; Brew Potion; Mutagen; 2nd-level Discovery; POison Resistance; Persistent Mutagen",
        "summary": "Mixologists focus on mastering the chemical reactions between alcohol and the physical body."
      },
      {
        "name": "Mnemostiller",
        "replaces": "Key Ability Score; Alchemy; Throw Anything; Mutagen; Bombs; Poison Resistance; Poison Use",
        "summary": "Mnemostillers extract memories; hey can return memories as easily as administering a potion, and experienced mnemostillers create a variety of effects through the careful administration of past traumas or victories"
      },
      {
        "name": "Oenopion Researcher",
        "replaces": "Poison Use, Swift Alchemy",
        "summary": "The alchemist of Oenopion is incredibly skilled at making potions, elixirs, and other materials crucial to the country's economy and its monster-creating fleshforges."
      },
      {
        "name": "Oozemaster",
        "replaces": "Class Skills; Bomb; Brew Potion; Poison Resistance; Poison Immunity",
        "summary": "The oozemaster is a specialized alchemist who fights and ensnares oozes."
      },
      {
        "name": "Plague Bringer",
        "replaces": "Mutagen; Poison Resistance; Poison Immunity",
        "summary": "(Ratfolk Only) The plague bringer sees disease as the ultimate weapon, and has worked tirelessly to master new diseases and disease-delivery systems."
      },
      {
        "name": "Preservationist",
        "replaces": "Poison Use; Poison Resistance +4; Poison Resistance +6; Poison Immunity; Persistant Mutagen; 18th-level Discovery",
        "summary": "Some alchemists are obsessed with collecting and preserving exotic creatures."
      },
      {
        "name": "Promethean Alchemist",
        "replaces": "Brew Potion; Throw Anything; Bombs; Mutagen",
        "summary": "Obsessed with discovering the origins of life, promethean alchemists build constructs they gradually endow with life."
      },
      {
        "name": "Psychonaut",
        "replaces": "Bomb; Poison Resistance +4; Poison Resistance +6; Poison Immunity; 15th-level Bomb Damage Increase; 17th-level Bomb Damage Increase",
        "summary": "A psychonaut uses his knowledge to explore altered states of consciousness and even other planes of existence."
      },
      {
        "name": "Ragechemist",
        "replaces": "Poison Use; Swift Poisoning; Poison Immunity",
        "summary": "Some alchemists create mutagens that tap into a primal anger that fuels their physical transformation."
      },
      {
        "name": "Reanimator",
        "replaces": "Bomb; 7th-level Bomb Damage Increase; 13th-level Bomb Damage Increase; 15th-level Bomb Damage Increase",
        "summary": "A reanimator is an alchemist who has discovered how to infuse a corpse with a semblance of life."
      },
      {
        "name": "Royal Alchemist",
        "replaces": "Class Skills; Poison Use; Swift Poisoning",
        "summary": "Many rulers often hire specialized alchemists capable of concocting protections from both poisons and diseases for the nobles and their guests."
      },
      {
        "name": "Saboteur",
        "replaces": "Mutagen",
        "summary": "(Gnome Only) The saboteur is an alchemist who specializes in destroying the plans, materials, and allies of his enemies."
      },
      {
        "name": "Sacrament Alchemist",
        "replaces": "Deity; Mutagen; Swift Alchemy",
        "summary": "Sacrament alchemists serve in a great variety of priestly roles for their deities."
      },
      {
        "name": "Tinkerer",
        "replaces": "Mutagen; Poison Resistance; Poison Use; Swift Poisoning; Poison Immunity; Persistent Mutagen",
        "summary": "Tinkerers constantly dabble in clockworking, creating special familiars that they regularly upgrade and with which they form bizarre bonds."
      },
      {
        "name": "Toxicant",
        "replaces": "Mutagen; Persistent Mutagen",
        "summary": "In lands such as Daggermark and Katapesh where poisons are legal and may be openly studied and sold, some alchemists obsess over the myriad ways that poisons and venoms can be applied and delivered."
      },
      {
        "name": "Trap Breaker",
        "replaces": "Poison Use; Poison Resistance +2, +4, +6; Swift Poisoning; Poison Immunity",
        "summary": "Trap breakers forgo the study of poison to instead master the construction and deployment of traps, using their nimble fingers to disable dangerous devices and their alchemical knowledge to create devastating land mines."
      },
      {
        "name": "Vaultbreaker",
        "replaces": "Brew Potion; Bombs; Throw Anything; Poison Use",
        "summary": "The vaultbreaker combines stealth with his bomb-making talents to construct special focused charges that can disable or destroy hinges, locks, and similar mechanisms."
      },
      {
        "name": "Vivisectionist",
        "replaces": "Bomb",
        "summary": "A vivisectionist studies bodies to better understand their function."
      },
      {
        "name": "Wasteland Blightbreaker",
        "replaces": "Poison Resistance +2, +6; Swift Poisoning; 8th-level Discovery",
        "summary": "The deleterious effects of the weird hazards of the Mana Wastes require special skill to remedy."
      },
      {
        "name": "Winged Marauder",
        "replaces": "Class Skills; Mutagen; Persistent Mutagen",
        "summary": "(Goblin Only) Goblin alchemists have created a mixture of pheromones that they use to manipulate and entice giant vultures or dire bats to do their bidding."
      }
    ]
  } ,
  
  { "name"       : "Antipaladin" ,
  
    "description": 
    [
      "Although it is a rare occurrence, paladins do sometimes stray from the path of righteousness. Most of these wayward holy warriors seek out redemption and forgiveness for their misdeeds, regaining their powers through piety, charity, and powerful magic. Yet there are others, the dark and disturbed few, who turn actively to evil, courting the dark powers they once railed against in order to take vengeance on their former brothers. It's said that those who climb the farthest have the farthest to fall, and antipaladins are living proof of this fact, their pride and hatred blinding them to the glory of their forsaken patrons.",
      "Antipaladins become the antithesis of their former selves. They make pacts with fiends, take the lives of the innocent, and put nothing ahead of their personal power and wealth. Champions of evil, they often lead armies of evil creatures and work with other villains to bring ruin to the holy and tyranny to the weak. Not surprisingly, paladins stop at nothing to put an end to such nefarious antiheroes.",
      "The antipaladin is an alternate class. Making use of and altering numerous facets of the paladin core class, this villainous warrior can't truly be considered a new character class by its own right. By the changes made here, though, the details and tones of the paladin class are shifted in a completely opposite direction and captures an entirely different fantasy theme, without needlessly designing an entire new class. While a redesign of sorts, this alternate class can be used just as any of the other base classes found in the first part of this chapter."
    ],
    
    "role": 
    [
      "Antipaladins are villains at their most dangerous. They care nothing for the lives of others and actively seek to bring death and destruction to ordered society. They rarely travel with those that they do not subjugate, unless as part of a ruse to bring ruin from within.",
      "As an alternate paladin class, the antipaladin uses Table: Antipaladin to determine its base attack bonus, saving throw bonuses, and spells per day. These details, along with the class's new special abilities, can be found on Table 2–13."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Blighted Myrmidon",
        "replaces": "Smite Good; Fiendish Boon; 10th-level use of Smite Good; Aura of Vengeance; 15th-level Cruelty; Unholy Champion",
        "summary": "Blighted myrmidons carry the seed of rot in their black hearts and sap life from the natural world."
      },
      {
        "name": "Dread Vanguard",
        "replaces": "Spells; Aura of Sin",
        "summary": "Some antipaladins serve or ally themselves with villains who are bent on earthly conquest."
      },
      {
        "name": "Fearmonger",
        "replaces": "Touch of Corruption; Cruelty",
        "summary": "The fearmonger wants to do more than cause pain, misery, and confusion. He wishes to spread fear among his foes and infect entire populations with it."
      },
      {
        "name": "Insinuator",
        "replaces": "Code of Conduct; Aura of Evil; Detect Good; Smite Good; Touch of Corruption; Aura of Cowardice; Plague Bringer; Cruelty; Channel Negative Energy; Spells; Fiendish Boon; Aura of Despair; Aura of Vengeance; Aura of Sin; Aura of Depravity; Unholy Champion",
        "summary": "Between the selfless nobility of paladins and the chaotic menace of antipaladins, there exists a path of dedicated self-interest."
      },
      {
        "name": "Iron Tyrant",
        "replaces": "Touch of Corruption; Cruelty; Channel Negative Energy; Fiendish Boon",
        "summary": "Iron tyrants seek the strength to rule over domains as unfettered despots, and depend on their armor as protection against those they have not yet cowed."
      },
      {
        "name": "Knight of the Sepulcher",
        "replaces": "Fiendish Boon; Aura of Despair; 10th-level Smite Good use; Aura of Vengeance; Aura of Sin; Cruetly; Aura of Depravity; Unholy Champion",
        "summary": "Not content with the antipaladin’s mere corruption of the soul, the knight of the sepulcher sacrifices mortality along with morality."
      },
      {
        "name": "Rough Rampager",
        "replaces": "Aura of Cowardice; Aura of Despair; Aura of Sin",
        "summary": "Rough rampagers venerate Rovagug, reveling in the destruction the dark god represents."
      },
      {
        "name": "Seal-Breaker",
        "replaces": "Aura of Cowardice; Fiendish Boon; Aura of Despair; Aura of Vengeance",
        "summary": "Seal-breakers are dedicated to the Whispering Tyrant and have tasked themselves with finding and destroying the seals that bind him within Gallowspire."
      },
      {
        "name": "Tyrant",
        "replaces": "Code of Conduct; Class Skills; Fiendish Boon",
        "summary": "Tyrants are manipulative and lawful antipaladins, chess masters who arrange things behind the scenes to ensure that whatever happens, evil always wins, and the tyrant along with it."
      }
    ]
  } ,
  
  { "name"       : "Arcanist" ,

    "description": 
    [
      "Some spellcasters seek the secrets of magic, pursuing the power to make the impossible possible. Others are born with magic in their blood, commanding unbelievable forces as effortlessly as they breathe. Yet still others seek to meld the science of arcane scholars with the natural might of innate casters. These arcanists seek to discover the mysterious laws of magic and through will and expertise bend those forces to their whims. Arcanists are the shapers and tinkers of the arcane world, and no magic can resist their control."
    ],
    
    "role": 
    [
      "Arcanists are scholars of all things magical. They constantly seek out new forms of magic to discover how they work, and in many cases, to collect the energy of such magic for their own uses. Many arcanists are seen as reckless, more concerned with the potency of magic than the ramifications of unleashing such power."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Aeromancer",
        "replaces": "1st, 5th, 11th-level Arcane Exploit",
        "summary": "While the practice of aeromancy is rare, some arcanists today are able to rival the aerial mastery of the ancient Shory aeromancers."
      },
      {
        "name": "Blade Adept",
        "replaces": "1st, 3rd, and 9th-level Arcanist Exploits",
        "summary": "A small number of arcanists learn to use blades as part of their spellcasting and in combat."
      },
      {
        "name": "Blood Arcanist",
        "replaces": "1st, 3rd, 9th, and 15th-level Arcanist Exploits; Magical Supremacy",
        "summary": "Though most arcanists possess only a rudimentary innate arcane gift, the blood arcanist has the full power of a bloodline to draw upon."
      },
      {
        "name": "Brown-Fur Transmuter",
        "replaces": "3rd and 9th-level Arcanist Exploits; Magical Supremacy",
        "summary": "Frequently called “brown-furs,” these transmutation-focused arcanists are known for transforming themselves into animals."
      },
      {
        "name": "Eldritch Font",
        "replaces": "3rd, 7th, and 13th-level Arcanist Exploits; Magical Supremacy",
        "summary": "For some arcanists, the power bubbling up from within is nearly too much to contain."
      },
      {
        "name": "Elemental Master",
        "replaces": "1st, 3rd, 9th, 11th, and 15th-level Arcanist Exploits",
        "summary": "Arcanists with an affinity for elemental forces sometimes focus on one and display its power in everything they do."
      },
      {
        "name": "Harrowed Society Student",
        "replaces": "1st and 9th-level Arcanist Exploits; Consume Spells",
        "summary": "Based out of Varisia’s Twilight Academy, the secretive Harrowed Society focuses its efforts on the intellectual study of the region’s supernatural quirks and hidden history, and embraces the use of the harrow deck to examine the world’s occult mysteries."
      },
      {
        "name": "Magaambyan Initiate",
        "replaces": "Alignment; 1st, 5th, 9th, 17th-level Arcanist Exploit",
        "summary": "Aspiring students of the Magaambya often spend decades researching arcane magic while learning to follow in the footsteps of the academy’s founder, Old-Mage Jatembe."
      },
      {
        "name": "Occultist",
        "replaces": "1st and 7th-level Arcanist Exploits; Magical Supremacy",
        "summary": "Not all arcanists peer inward to discern the deepest secrets of magic. Some look outward, connecting with extraplanar creatures and bartering for secrets, power, and favor."
      },
      {
        "name": "School Savant",
        "replaces": "1st, 3rd, and 7th-level Arcanist Exploits",
        "summary": "Some arcanists specialize in a school of magic and trade flexibility for focus."
      },
      {
        "name": "Spell Specialist",
        "replaces": "1st, 7th, 13th, and 19th-level Arcanist Exploits",
        "summary": "Where most arcanists are broad in their study of magic, a spell specialist has her power focused in a few spells."
      },
      {
        "name": "Twilight Sage",
        "replaces": "Consume Spells; Spells; 1st and 11th-level Arcanist Exploits; Magical Supremacy",
        "summary": "The twilight sages of Geb carry out experiments to solve the ultimate puzzle and unlock the secrets of life and death. While the twilight sages generally aren’t actively malicious, most are willing to perform human experimentation in pursuit of knowledge with little regard for the casualties."
      },
      {
        "name": "Unlettered Arcanist",
        "replaces": "Spellbooks; Spells",
        "summary": "Some arcanists store their spells as whispered secrets within familiars instead of on paper."
      },
      {
        "name": "White Mage",
        "replaces": "1st and 9th-level Arcanist Exploits",
        "summary": "A white mage is an arcanist touched by a divine power and gifted with the ability to heal others."
      }
    ]
  } ,
  
  { "name"       : "Barbarian" ,
  
    "description": 
    [
      "For some, there is only rage. In the ways of their people, in the fury of their passion, in the howl of battle, conflict is all these brutal souls know. Savages, hired muscle, masters of vicious martial techniques, they are not soldiers or professional warriors—they are the battle possessed, creatures of slaughter and spirits of war. Known as barbarians, these warmongers know little of training, preparation, or the rules of warfare; for them, only the moment exists, with the foes that stand before them and the knowledge that the next moment might hold their death. They possess a sixth sense in regard to danger and the endurance to weather all that might entail. These brutal warriors might rise from all walks of life, both civilized and savage, though whole societies embracing such philosophies roam the wild places of the world. Within barbarians storms the primal spirit of battle, and woe to those who face their rage."
    ],
    
    "role": 
    [
      "Barbarians excel in combat, possessing the martial prowess and fortitude to take on foes seemingly far superior to themselves. With rage granting them boldness and daring beyond that of most other warriors, barbarians charge furiously into battle and ruin all who would stand in their way."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Armored Hulk",
        "replaces": "Fast Movement; Uncanny Dodge; Trap Sense; Improved Uncanny Dodge",
        "summary": "Some barbarians disdain the hides and leather used as armor by most of their kin. Instead they master the heaviest of armors, even those created by more civilized people, to gain greater protection and stability in battle."
      },
      {
        "name": "Beastkin Berserker",
        "replaces": "Fast Movement; 4th, 8th, 12th-level Rage Power",
        "summary": "While some barbarians take on bestial aspects in their rages, the beastkin berserker descends so deeply into primal fury that she actually transforms into an animal."
      },
      {
        "name": "Breaker",
        "replaces": "Fast Movement; Trap Sense",
        "summary": "Breakers find the need to destroy their surroundings."
      },
      {
        "name": "Brutal Pugilist",
        "replaces": "Uncanny Dodge; Trap Sense; Improved Uncanny Dodge",
        "summary": "Some barbarians focus on using their bare hands to tear their opponents limb from limb."
      },
      {
        "name": "Brutish Swamper",
        "replaces": "Skills; Fast Movement; Uncanny Dodge; Improved Uncanny Dodge; Trap Sense; 6th-level Rage Power",
        "summary": "The hardy and insular denizens of the swamp produce warriors of narrow focus and great strength."
      },
      {
        "name": "Cave Dweller",
        "replaces": "Skills; Fast Movement; Trap Sense; Damage Reduction",
        "summary": "Unused to the light of the sun, cave dwellers use their subterranean expertise to protect their clans from the manifold dangers of deep caverns and tunnels."
      },
      {
        "name": "Deepwater Rager",
        "replaces": "Fast Movement; Uncanny Dodge; Improved Uncanny Dodge; Indomitable Will; Tireless Rage",
        "summary": "Deepwater ragers bellow ferociously as they charge their enemies, tackling them into the raging seas."
      },
      {
        "name": "Dreadnought",
        "replaces": "Rage; Fast Movement; Indomitable Will; Tireless Rage",
        "summary": "Unstoppable and fearless, the dreadnought turns the terror of her enemies into violent physical power."
      },
      {
        "name": "Drunken Brute",
        "replaces": "Fast Movement",
        "summary": "Drunken brutes use potent liquor to fuel their rage and grant them additional powers."
      },
      {
        "name": "Drunken Rager",
        "replaces": "Fast Movement; Uncanny Dodge; Trap Sense; Improved Uncanny Dodge; 12th-level Rage Power",
        "summary": "These hotheaded, hard-drinking ruffians and brawlers are as dangerous in the midst of combat as they are in a tavern, and they wouldn’t be caught dead without a libation for either occasion."
      },
      {
        "name": "Elemental Kin",
        "replaces": "Trap Sense",
        "summary": "Some barbarian tribes have strong ties to the elemental forces of nature."
      },
      {
        "name": "Fearsome Defender",
        "replaces": "Fast Movement; Uncanny Dodge; Trapsense; Improved Uncanny Dodge",
        "summary": "These savage slaves feel little pain and exist only to rain terror down on the enemies of their pitiless masters."
      },
      {
        "name": "Feral Gnasher",
        "replaces": "Weapon/Armor Proficiency; Fast Movement; 2nd-level Rage Power; Trap Sense 1-5; Improved Uncanny Dodge",
        "summary": "(Goblin Only) Feral gnashers grow up in the wild, either raised by animals or scraping by on their own, and soon learn to fend for themselves."
      },
      {
        "name": "Flesheater",
        "replaces": "Rage; 2nd, 8th, and 14th-level Rage Powers; Greater Rage; Mighty Rage",
        "summary": "A flesheater eats flesh to create a spiritual bond between herself and the consumed creature, allowing her to take on aspects of the creature that served as the meal."
      },
      {
        "name": "Geminate Invoker",
        "replaces": "Alignment; Class Skills; Rage; Trap Sense; 4th, 8th, 12th-level Rage Powers",
        "summary": "Geminate invokers are barbarians who use Rivethun traditions to invite spirits into their bodies."
      },
      {
        "name": "Giant Stalker",
        "replaces": "Rage; Uncanny Dodge; Trap Sense",
        "summary": "Giant stalkers are followers of the Mammoth Lords who have trained since childhood to spot and track giants."
      },
      {
        "name": "Hateful Rager",
        "replaces": "Rage; 2nd, 8th, 14th, 20th-level Rage Powers; Uncanny Dodge; Trap Sense +3",
        "summary": "(Half-Orc Only) From a young age, many half-orcs are treated cruelly, bullied, ridiculed, and made outcasts. While some hide their shame, others foster a deep, burning hatred that they channel into a raw fury and unleash against their enemies."
      },
      {
        "name": "Hurler",
        "replaces": "Fast Movement",
        "summary": "The hurler becomes skilled at throwing objects at their foes before closing in for the kill."
      },
      {
        "name": "Invulnerable Rager",
        "replaces": "Uncanny Dodge; Improved Uncanny Dodge; Damage Reduction; Trap Sense",
        "summary": "Some barbarians learn to take whatever comes their way, shrugging off mortal wounds with ease."
      },
      {
        "name": "Jungle Rager",
        "replaces": "Uncanny Dodge; Trap Sense; Improved Uncanny Dodge; Damage Reduction",
        "summary": "A jungle rager can disappear from sight, strike from hiding, and use the environment to shield herself from harm."
      },
      {
        "name": "Mad Dog",
        "replaces": "2nd, 6th, 10th, 14th, 18th-level Rage Powers; Rage; Uncanny Dodge; Improved Uncanny Dodge; Damage Reduction; Indomitable Will",
        "summary": "Though named for the wild savages who fight alongside rabid dogs, mad dogs employ all manner of beasts as their battle brethren."
      },
      {
        "name": "Mooncursed",
        "replaces": "Race; Rage; Improved Uncanny Dodge; Greater Rage; Mighty Rage",
        "summary": "Some barbarians exhibit an unusual form of lycanthropy powered by their fury. Such a character transforms willfully but can maintain her animal or hybrid forms only while raging."
      },
      {
        "name": "Mounted Fury",
        "replaces": "Fast Movement; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Many barbarian tribes are masters of the horse, teaching their members how to ride from a young age."
      },
      {
        "name": "Numerian Liberator",
        "replaces": "Class Skills; Uncanny Dodge; Improved Uncanny Dodge; Indomitable Will",
        "summary": "While many native Kellids oppose the Technic League and its espousal of foul alien artifacts, the most stalwart and staunchly dedicated of these technophobic traditionalists refer to themselves as Numerian liberators."
      },
      {
        "name": "Pack Hunter",
        "replaces": "Rage Powers; Trap Sense; 6th-level Rage Power",
        "summary": "Pack hunter barbarians team up to hunt dangerous prey to feed, to protect their camps, and as a rite of passage."
      },
      {
        "name": "Pack Rager",
        "replaces": "2nd, 6th, 10th, 14th, and 18th-level Rage Powers; Damage Reduction",
        "summary": "Barbarian rages can be a thing of savage beauty, exhibiting a lethal grace. While such uncontrolled displays of carnage often disregard group tactics, there are those barbarians whose rages inspire and spur on their allies during the ferocious dance of death."
      },
      {
        "name": "Primal Hunter",
        "replaces": "Fast Movement; Rage",
        "summary": "Rather than exploding with anger, primal hunters focus their rage to strike distant targets."
      },
      {
        "name": "Raging Cannibal",
        "replaces": "2nd-level Rage Power; Uncanny Dodge; Trap Sense; Improved Uncanny Dodge; Damage Reduction",
        "summary": "While savagery is not inherently evil, some barbaric cultures thrive on depravity and welcome the act of feeding on their own kind."
      },
      {
        "name": "Savage Barbarian",
        "replaces": "Trap Sense; Damage Reduction",
        "summary": "The savage barbarian learns to avoid blows and toughen up their skin."
      },
      {
        "name": "Savage Technologist",
        "replaces": "Class Skills; Weapon/Armor Proficiencies; Rage; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Savage technologists exhort Kellids to rise up against the depredations of the Technic League. But rather than rejecting technology, they wield the League’s own weapons against it."
      },
      {
        "name": "Scarred Rager",
        "replaces": "Fast Movement; Uncanny Dodge; Trap Sense; Improved Uncanny Dodge",
        "summary": "The scarred rager believes each wound tells the tales of her prowess and bravery."
      },
      {
        "name": "Sea Reaver",
        "replaces": "Fast Movement; Uncanny Dodge; Trap Sense; Improved Uncanny Dodge",
        "summary": "Some sea reavers are no more than hunters of the open sea, while others are raiders striking fear into coastal settlements within reach of the sea reavers’ longships."
      },
      {
        "name": "Sharptooth",
        "replaces": "Fast Movement; Uncanny Dodge; Improved Uncanny Dodge; Trap Sense; 6th and 12th-level Rage Powers",
        "summary": "Coastal hunters and agents of the ocean’s rage, sharptooth barbarians emulate the greatest predators of the sea."
      },
      {
        "name": "Shoanti Burn Rider",
        "replaces": "Fast Movement; Uncanny Dodge; Trap Sense; 4th, 8th, 12th, 16th-level Rage Powers; Improved Uncanny Dodge",
        "summary": "The Shoanti tribes who live in the Cinderlands have turned the deadly emberstorms that plague the region into a rite of passage. A few who survive the experience begin to embrace the adrenaline and surge of joy that comes from dancing along the edge of a whirling firestorm. These thrill-seekers are known as burn riders, and their exploits are celebrated by all Shoanti."
      },
      {
        "name": "Superstitious",
        "replaces": "Trap Sense; Damage Reduction",
        "summary": "The superstitious barbarian is naturally distrusting, developing keen senses to protect themselves from harm."
      },
      {
        "name": "Titan Mauler",
        "replaces": "Fast Movement; Uncanny Dodge; Trap Sense; Improved Uncanny Dodge; Indomitable Will",
        "summary": "In lands overrun by giants, dragons, and other hulking beasts, entire fellowships of barbarians hone tactics and traditions with one purpose—to bring low these massive foes."
      },
      {
        "name": "Totem Warrior",
        "replaces": "None",
        "summary": "The totem warrior has a special totem that is the patron of her tribe."
      },
      {
        "name": "True Primitive",
        "replaces": "Fast Movement; Trap Sense",
        "summary": "Isolated and xenophobic tribes that dwell in areas untouched by civilization often see anything from cities and organized settlements as strange, dangerous, and decadent."
      },
      {
        "name": "Untamed Rager",
        "replaces": "Uncanny Dodge; Trap Sense; Improved Uncanny Dodge; Damage Reduction",
        "summary": "There are no rules in the wild. Some barbarians enter combat with only victory in mind and do anything in their power to achieve it."
      },
      {
        "name": "Urban Barbarian",
        "replaces": "Fast Movement; Rage",
        "summary": "Every barbarian knows that city life can soften the spirit and the body, but some barbarians take on the trappings and ways of their adoptive homes and bend their savage powers to its challenges."
      },
      {
        "name": "Wild Rager",
        "replaces": "Rage; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Rages are barely controlled, but there are those who wholly give in to their more savage side, letting their rages take them to a confusing and uncontrolled place of terrible savagery."
      },
      {
        "name": "Wildborn",
        "replaces": "Weapon/Armor Proficiencies; Trap Sense; Rage Powers; Damage Reduction",
        "summary": "Some barbarians are born or bred outside the reach of civilization. These wildborn fight and survive without ever seeing a forge or worked stone, and only dare a trip into the city when no other option is available."
      }
    ]
  } ,
  
  { "name"       : "Bard" ,
  
    "description": 
    [
      "Untold wonders and secrets exist for those skillful enough to discover them. Through cleverness, talent, and magic, these cunning few unravel the wiles of the world, becoming adept in the arts of persuasion, manipulation, and inspiration. Typically masters of one or many forms of artistry, bards possess an uncanny ability to know more than they should and use what they learn to keep themselves and their allies ever one step ahead of danger. Bards are quick-witted and captivating, and their skills might lead them down many paths, be they gamblers or jacks-of-all-trades, scholars or performers, leaders or scoundrels, or even all of the above. For bards, every day brings its own opportunities, adventures, and challenges, and only by bucking the odds, knowing the most, and being the best might they claim the treasures of each."
    ],
    
    "role": 
    [
      "Bards capably confuse and confound their foes while inspiring their allies to ever-greater daring. While accomplished with both weapons and magic, the true strength of bards lies outside melee, where they can support their companions and undermine their foes without fear of interruptions to their performances."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Animal Speaker",
        "replaces": "Fascinate; Well-Versed; Inspire Competence; Suggestion; Mass Suggestion",
        "summary": "An animal speaker focuses not on the ears and minds of humans, but on the creatures of the wild and those in the underbellies of cities."
      },
      {
        "name": "Arcane Duelist",
        "replaces": "Countersong; Suggestion; Mass Suggestion; Versatile Performance; Well-Versed; Lore Master; Jack of all Trades",
        "summary": "A master of the martial applications of steel and spell, the arcane duelist blends both into a lethal combination."
      },
      {
        "name": "Arcane Healer",
        "replaces": "Versatile Performance; Loremaster",
        "summary": "Though bards may have different reasons for wanting to heal the sick and injured, both out of pure altruism and in order to keep adventuring companions safe, the ability to heal also makes it much easier for a bard to pose as a cleric or other divine healer, opening the door for a wide array of swindles and scams."
      },
      {
        "name": "Archaeologist",
        "replaces": "Bardic Performance; Versatile Performance; Well-Versed",
        "summary": "No stodgy researcher, this archaeologist meets his research head-on in the field."
      },
      {
        "name": "Archivist",
        "replaces": "Inspire Courage; Suggestion; Mass Suggestion; Versatile Performance; Well-Versed; Lore Master; Jack of all Trades",
        "summary": "Some bards greatly prefer academic pursuits to the drama (and sometimes melodrama) of their artistic brethren."
      },
      {
        "name": "Argent Voice",
        "replaces": "Fascinate; Dirge of Doom; Frightening Tune; Versatile Performance",
        "summary": "Argent voices are agents of the Silver Ravens that dedicate themselves to the study of the magical performance are known as the \"Song of Silver\"."
      },
      {
        "name": "Arrowsong Minstrel",
        "replaces": "Weapon Proficiency; Spellcasting; Bardic Knowledge; Dirge of Doom; Distraction; Fascinate; Inspire Competence; Lore Master; Soothing Performance",
        "summary": "Arrowsong minstrels combine the elven traditions of archery, song, and spellcasting into a seamless harmony of dazzling magical effects."
      },
      {
        "name": "Averaka Arbiter",
        "replaces": "Inspire Competence; Dirge of Doom; Versatile Performance; Well-Versed",
        "summary": "Some Averakan bards make it their mission to unify their fellow half-orcs, and are equally skilled at helping allies defeat common enemies and at building a new civilization that reflects their unique identity."
      },
      {
        "name": "Brazen Deceiver",
        "replaces": "Countersong; Distraction; Bardic Knowledge; Well-Versed; Versatile Performance; Lore Master",
        "summary": "Where other thieves use stealth or intimidation to achieve their goals, the brazen deceiver depends on lies backed by powerful shadow magic."
      },
      {
        "name": "Buccaneer",
        "replaces": "Bardic Knowledge; Suggestion; Lore Master; Mass Suggestion",
        "summary": "A buccaneer is a pirate who specializes in raiding ships and port towns, but who leaves his victims alive whenever possible."
      },
      {
        "name": "Busker",
        "replaces": "Bardic Performance",
        "summary": "A busker uses his dazzling physical stunts to get by on his own in the city streets."
      },
      {
        "name": "Celebrity",
        "replaces": "Inspire Courage; Lore Master; Dirge of Doom",
        "summary": "Known for being known, a celebrity bard is a master of performance who captures the imagination and attention of his audience."
      },
      {
        "name": "Chelish Diva",
        "replaces": "Bardic Knowledge, Well-Versed, Lore Master, Inspire Competence, Dirge of Doom",
        "summary": "In their pursuit of glory, a Chelish diva seeks to prove themselves better than any upstart actor, dancer, or chorus member through magic and discipline."
      },
      {
        "name": "Chronicler of Worlds",
        "replaces": "Key Ability Score; Alignment; Bardic Knowledge; Inspire Greatness; Inspire Heroics; Well-Versed; Versatile Performance;",
        "summary": "A chronicler of worlds forsakes morality in service of understanding; she is both warrior and mystic, scholar and soldier."
      },
      {
        "name": "Court Bard",
        "replaces": "Inspire Courage; Inspire Competence; Dirge of Doom; Frightening Tune; Bardic Knowledge; Lore Master; Jack of all Trades",
        "summary": "The court bard takes up the role of resplendent proclaimer and artist-in-residence at the hand of nobility, royalty, and the well-moneyed elite who aspire to join their ranks."
      },
      {
        "name": "Court Fool",
        "replaces": "Bardic Knowledge; Countersong; Inspire Competence; Lore Master",
        "summary": "The court fool holds up an unflattering mirror to those in charge or speaks truths, however veiled, that no one else can safely utter."
      },
      {
        "name": "Cultivator",
        "replaces": "Class Skills; Spells; Bardic Knowledge; Countersong; Well-Versed; Lore Master",
        "summary": "Cultivators use music to promote plant growth and influence the behavior of plants both naturally and supernaturally."
      },
      {
        "name": "Daredevil",
        "replaces": "Bardic Knowledge; Inspire Courage; Versatile Performance; Well-Versed; Lore Master",
        "summary": "As quick at wordplay as at swordplay, daredevils are dashing heroes, inspiring their allies to match their clever repartee and acrobatic feats."
      },
      {
        "name": "Dawnflower Dervish",
        "replaces": "Bardic Performance, Bardic Knowledge, Lore Master, Dirge of Doom",
        "summary": "Many bards of Sarenrae's faith hone their skills with dance and scimitar to become dervish dancers."
      },
      {
        "name": "Demagogue",
        "replaces": "Inspire Courage +1; Lore Master; Suggestion; Mass Suggestion",
        "summary": "Not content with providing amusing and occasionally instructive performances, the demagogue seeks to inflame and ignite his audience."
      },
      {
        "name": "Dervish Dancer",
        "replaces": "Suggestion; Mass Suggestion; Dirge of Doom; Frightening Performance; Bardic Knowledge; Lore Master; Versatile Performance; Soothing Performance; Deadly Performance",
        "summary": "Not all bards inspire others with their performances. Dervish dancers enter a near-mystical trance that allows them to push their bodies beyond normal limits."
      },
      {
        "name": "Detective",
        "replaces": "Inspire Courage; Inspire Greatness; Inspire Heroics; Bardic Knowledge; Well-Versed; Versatile Performance",
        "summary": "Piecing together clues and catching the guilty with sheer cleverness, the detective is skilled at divining the truth."
      },
      {
        "name": "Dirge Bard",
        "replaces": "Jack of all Trades; Well-Versed; Versatile Performance; Lore Master",
        "summary": "A composer of sonorous laments for the dead and elaborate requiems for those lost yet long remembered, dirge bards master musical tools and tropes that must appeal to the ears and hearts of both the living and the dead."
      },
      {
        "name": "Disciple of the Forked Tongue",
        "replaces": "Inspire Courage; Inspire Greatness; Versatile Performance",
        "summary": "(Vishkanya) Studied in venomous words as well as venomous blood, a disciple of the forked tongue knows just the right phrase to slowly poison the soul."
      },
      {
        "name": "Dragon Herald",
        "replaces": "Weapon/Armor Proficiency; Bardic Knowledge; Countersong; Fascinate; Inspire Competence; Soothing Performance; Inspire Heroics; Lore Master; Jack-of-all-Trades",
        "summary": "(Kobold Only) Dragon heralds are messengers and evangelists of true dragonkind. They carry the word of their dragon patrons far  and wide, whether that’s a message of peace or a declaration  of war."
      },
      {
        "name": "Dragon Yapper",
        "replaces": "Fascinate; Dirge of Doom; Versatile Performance",
        "summary": "(Kobold Only) Kobolds’ yammering songs distract opponents in combat, hindering their ability to attack."
      },
      {
        "name": "Duettist",
        "replaces": "Well-Versed; Jack-of-all-Trades; Bardic Knowledge; Versatile Performance; Lore Master; Dirge of Doom; Frightening Tune",
        "summary": "Whether singing a delicate duo with a nightingale or slipping coins from purses while a trained monkey distracts the crowd, the duettist blends his bond to his familiar with his natural talent for performance to create amazing effects."
      },
      {
        "name": "Dwarven Scholar",
        "replaces": "Key Ability Score; Weapon and Armor Proficiencies; Versatile Performance; Inspire Courage; Suggestion",
        "summary": "A dwarven scholar researches the lineage of the kings of the old dwarven empires and learns their ancient tactics."
      },
      {
        "name": "Faith Singer",
        "replaces": "Deity; Versatile Performance",
        "summary": "Faith singers show their faith in their deity with songs or other appropriate performances."
      },
      {
        "name": "Fey Courtier",
        "replaces": "Dirge of Doom; Frightening Tune; Inspire Heroics; Versatile Performance: Inspire Competence",
        "summary": "(Gathlain) Fey who associate with courts often become bards skilled at navigating the inhuman societies of the trackless wilds."
      },
      {
        "name": "Fey Prankster",
        "replaces": "Bardic Knowledge; Countersong; Inspire Courage; Dirge of Doom; Well-Versed; Lore Master",
        "summary": "Sly and mischievous like the Lantern King himself, fey pranksters learn supernatural tricks that can cause their victims to suffer mishaps and accidents."
      },
      {
        "name": "Filidh",
        "replaces": "Weapon/Armor Proficiencies; Spellcasting; Inspire Courage; Suggestion; Dirge of Doom; Inspire Heroics; Deadly Performance",
        "summary": "By tapping into the world’s natural music, specialized bards known as filidhs are able to see not only the tapestry of life but divine portents of the future from the rhythm of all life’s song."
      },
      {
        "name": "First World Minstrel",
        "replaces": "Spell List; Bardic Knowledge; Inspire Courage; Dirge of Doom; Well-Versed",
        "summary": "The First World minstrel's performances channel the mysterious powers of the First World."
      },
      {
        "name": "Flame Dancer",
        "replaces": "Countersong; Inspire Competence; Suggestion; Dirge of Doom",
        "summary": "A flame dancer studies the movements of fire, adding its grace to his repertoire."
      },
      {
        "name": "Flamesinger",
        "replaces": "Bardic Knowledge; Lore Master; Inspire Courage; Versatile Performance",
        "summary": "The flamesinger finds inspiration in the mesmerizing beauty of fire."
      },
      {
        "name": "Fortune-Teller",
        "replaces": "Spell List; Bardic Performance; Countersong; Distraction; Well-Versed; Dirge of Doom",
        "summary": "Instead of using song and dance, a fortune-teller influences people by divining their fate."
      },
      {
        "name": "Geisha",
        "replaces": "Weapon/Armor Proficiencies; Bardic Knowledge",
        "summary": "Specially trained entertainers called geisha are praised for their appearance and skill at conversation, music, dancing, singing, poetry, and calligraphy."
      },
      {
        "name": "Hatharat Agent",
        "replaces": "Bardic Knowledge; Well-Versed; Dirge of Doom",
        "summary": "Although the Hatharat employs all manner of specialists, bards who take up the role of agent are among its most infamous and widespread."
      },
      {
        "name": "Hoaxer",
        "replaces": "Bardic Knowledge; Inspire Courage; Inspire Competence; Inspire Greatness; Countersong; Distraction; Inspire Greatness; Versatile Performance; Well-Versed; Lore Master",
        "summary": "Hoaxers specialize in creating valuable-looking counterfeits and infusing these false treasures with dangerous magic to make their marks more vulnerable to future swindles."
      },
      {
        "name": "Impervious Messenger",
        "replaces": "Fascinate; Suggestion; Mass Suggestion; Dirge of Doom; Frightening Tune; Bardic Knowledge; Well-Versed",
        "summary": "The impervious messenger is capable of harnessing the unique qualities of bardic magic to keep, transport, and communicate the most precious of secrets and messages."
      },
      {
        "name": "Juggler",
        "replaces": "Weapon/Armor Proficiencies; Bardic Knowledge; Lore Master; Versatile Performance; Well-Versed; Soothing Performance",
        "summary": "Jugglers are masters of manipulating objects, most famously by keeping multiple objects in the air simultaneously."
      },
      {
        "name": "Lotus Geisha",
        "replaces": "Different Weapon Proficiencies; Well-Versed; Bardic Knowledge; Lore Master",
        "summary": "The lotus geisha of Minkai are renowned for their powers of seduction."
      },
      {
        "name": "Luring Piper",
        "replaces": "Class Skills; Bardic Knowledge; Dirge of Doom; Soothing Performance; Well-Versed",
        "summary": "Some bards have an exceptional ability to use their musical performances to entrance the world’s wilder creatures."
      },
      {
        "name": "Magician",
        "replaces": "Inspire Courage; Dirge of Doom; Frightening Tune; Bardic Knowledge; Countersong; Well-Versed; Versatile Performance; Lore Master; Jack of all Trades",
        "summary": "A magician dabbles in performance, but sees it as a means to tap into universal energies and channel them."
      },
      {
        "name": "Masked Performer",
        "replaces": "Bardic Knowledge; Countersong; Inspire Competence; Surggestion; Mass Suggestion; Versatile Performance; Lore Master",
        "summary": "The masked performer takes on the persona represented by the likeness she wears."
      },
      {
        "name": "Mute Musician",
        "replaces": "Bardic Knowledge; Inspire Competence; Frightening Tune; Inspire Heroics; Mass Suggestion; Versatile Performance; Well-Versed; Jack-of-All-Trades",
        "summary": "A mute musician forswears speech for the unnatural songs and thunderous silences of the depths of space."
      },
      {
        "name": "Negotiator",
        "replaces": "Bardic Knowledge; Bardic Performance; Versatile Performance; Lore Master",
        "summary": "Negotiators are those bards who take the skills of a performer and apply them to the realms of business and law."
      },
      {
        "name": "Phrenologist",
        "replaces": "Bardic Knowledge; Well-Versed; Jack-of-all-Trades; Inspire Courage; Inspire Competence; Fascinate",
        "summary": "The phrenologist is an expert at reading creatures’ skulls, and he learns to use this knowledge to his benefit."
      },
      {
        "name": "Pitax: Academy of Grand Arts",
        "replaces": "Versatile Performance",
        "summary": "Those who have successfully mastered the strict curriculum of the Academy of Grand Arts."
      },
      {
        "name": "Plant Speaker",
        "replaces": "Inspire Greatness; Bardic Knowledge; Well-Versed; Lore Master",
        "summary": "(Vine Leshy) Plant speakers build upon their racial plantspeech ability and their storytelling tendencies to create an art form full of deep metaphors and allegory rather than specific details and facts."
      },
      {
        "name": "Prankster",
        "replaces": "Fascinate; Suggestion; Mass Suggestion; Lore Master",
        "summary": "(Gnome Only) The prankster sees humor as the highest form or art, and pranks as the highest form of humor."
      },
      {
        "name": "Provocateur",
        "replaces": "Bardic Knowledge; 2nd-level Versatile Performance; Suggestion, Mass Suggestion",
        "summary": "Provocateurs are bards who use their art to make controversial political statements, undermine enemies’ reputations, and upset the status quo on a large scale."
      },
      {
        "name": "Ringleader (AG)",
        "replaces": "Bardic Performance; Well-Versed; Versatile Performance; Suggestion; Mass Suggestion; Soothing Performance",
        "summary": "Ringleaders are specialists who oversee large operations in which trouble could strike at any moment and any place."
      },
      {
        "name": "Ringleader (UI)",
        "replaces": "Inspire Competence; Dirge of Doom; Frightening Tune; Versatile Performance; Well-Versed; Lore Master",
        "summary": "Ringleaders are adept in getting the most out of their allies, and they excel at planning for unexpected complications in advance."
      },
      {
        "name": "Sandman",
        "replaces": "Inspire Courage; Suggestion; Inspire Greatness; Inspire Heroics; Mass Suggestion; Deadly Performance; Bardic Knowledge; Versatile Performance; Inspire Competence; Lore Master",
        "summary": "Combining performance with stealth, trickery, and guile, the sandman uses cleverness to keep others off-balance."
      },
      {
        "name": "Savage Skald",
        "replaces": "Fascinate; Suggestion; Jack of all Trades; Soothing Performance; Mass Suggestion",
        "summary": "Far from civilization, furious tribes have their own war-singers, work-chanters, and lore-keepers, savaging enemies with song and sword alike."
      },
      {
        "name": "Sea Singer",
        "replaces": "Countersong; Inspire Competence; Suggestion; Mass Suggestion; Bardic Knowledge; Versatile Performance; Well-Versed",
        "summary": "The sea singer calls the blue waters his home, and is much in demand among sea captains wishing good fortune for their crew and hull as they ply the tradewinds far and wide."
      },
      {
        "name": "Shadow Puppeteer",
        "replaces": "Inspire Courage; Inspire Competence",
        "summary": "(Wayang Only) A shadow puppeteer invokes amazing and terrifying shadow puppet shows, producing supernatural effects by creating and manipulating shadow."
      },
      {
        "name": "Silver Balladeer",
        "replaces": "Alignment; Suggestion; Inspire Greatness; Mass Suggestion; Well-Versed; 2nd-level Versatile Performance",
        "summary": "The bright purity of silver makes beautiful music, and its vibrations are also anathema to unnatural creatures. Some bards use a mixture of silver-stringed instruments and esoteric knowledge to battle the dark forces of the world."
      },
      {
        "name": "Solacer",
        "replaces": "Class Skills; Bardic Knowledge; Lore Master; Countersong; Versatile Performance; Jack-of-All-Trades",
        "summary": "Solacers are experts in the healing arts as well as creators of performances that console the distraught, rally the stricken, raise spirits, and vanquish sorrow."
      },
      {
        "name": "Songhealer",
        "replaces": "Versatile Performance; Frightening Tune; Deadly Performance",
        "summary": "The songhealer brings peace and surcease of pain, calming wild emotions and providing a balm for the wounded body."
      },
      {
        "name": "Sorrowsoul",
        "replaces": "Soothing Perfrmance; Versatile Performance; Well-Versed; Lore Master",
        "summary": "While most bards, on occasion, sing mournful tunes or craft elegies that depict the deepest sadness or the most profound suffering, the sorrowsoul has known tragedy and loss on a level so intimate, he has bound it to his soul."
      },
      {
        "name": "Sound Striker",
        "replaces": "Inspire Competence; Suggestion",
        "summary": "They say that words can cut deeper than any blade, and the sound striker proves this true."
      },
      {
        "name": "Stonesinger",
        "replaces": "Spellcasting; Bardic Performance; Countersong; Dirge of Doom",
        "summary": "Stonesingers are rare bards capable of vocalizing their bardic performances through subsonic harmonies, allowing their performances to carry as subtle vibrations through stone, rather than through the air."
      },
      {
        "name": "Street Performer",
        "replaces": "Inspire Courage; Inspire Competence; Inspire Greatness; Inspire Heroics; Countersong; Bardic Knowledge; Lore Master",
        "summary": "Whether acrobat, troubadour, or thespian, the street performer mixes with the masses, singing for his supper."
      },
      {
        "name": "Studious Librarian",
        "replaces": "Distraction; Suggestion; Jack-of-All-Trades; Dirge of Doom; Mass Suggestion; Deadly Performance",
        "summary": "Studious librarians are bards that have studied long in great libraries of the Inner Sea region."
      },
      {
        "name": "Thundercaller",
        "replaces": "Bardic Knowledge; Inspire Competence; Suggestion; Mass Suggestion; Dirge of Doom; Frightening Tune",
        "summary": "Thundercallers bear the knowledge of the ancients, wielding it like a weapon to protect the land for which they care so deeply."
      },
      {
        "name": "Voice of the Wild",
        "replaces": "Bardic Knowledge; Countersong; Versatile Performance; Jack-of-all-Trades; Inspire Competence; Dirge of Doom; Inspire Heroics",
        "summary": "Most bards are inspired by the art of civilization, yet the voice of the wild’s muse is the grandeur and beauty of nature."
      },
      {
        "name": "Wasteland Chronicler",
        "replaces": "Bardic Knowledge; Inspire Competence",
        "summary": "Wasteland chroniclers explore the farthest reaches of desolate wastelands, seeking to unlock the mysteries found there and meet the inhabitants of such regions"
      },
      {
        "name": "Watersinger",
        "replaces": "Fascinate, Suggestion, Mass Suggestion, Inspire Competence, 5th-level Lore Master",
        "summary": "(Undine Only) The watersinger’s song reaches from the depths of his soul into the elemental waters from which life first sprang."
      },
      {
        "name": "Wit",
        "replaces": "Bardic Knowledge; Inspire Competence; Dirge of Doom; Frightening Tune; Versatile Performance; Lore Master; Jack-of-All-Trades",
        "summary": "The wit is a master of clever repartee and verbal dueling, moving through noble courts like a fish through water."
      }
    ]
  } ,
  
  { "name"       : "Bloodrager" ,
    
    "description": 
    [
      "While many ferocious combatants can tap into a deep reservoir of buried rage, bloodragers have an intrinsic power that seethes within. Like sorcerers, bloodragers’ veins surge with arcane power. While sorcerers use this power for spellcasting, bloodragers enter an altered state in which their bloodline becomes manifest, where the echoes of their strange ancestry lash out with devastating power. In these states, bloodragers can cast some arcane spells instinctively. The bloodrager’s magic is as fast, violent, and seemingly unstoppable as their physical prowess."
    ],
    
    "role": 
    [
      "Masters of the battlefield, bloodragers unleash fearful carnage on their enemies using their bloodlines and combat prowess. The bloodrager’s place is on the front lines, right in his enemies’ faces, supplying tremendous martial force bolstered by a trace of arcane magic."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Ancestral Harbinger",
        "replaces": "Uncanny Dodge; Improved Uncanny Dodge; 6th, 12th, and 18th-level Bloodline Feats",
        "summary": "While all bloodragers tap into their bloodlines to fuel the arcane energies they use in battle, some have the ability to call directly to the spirits of their ancestors to aid them, summoning spirits to fight for them or inspire their allies."
      },
      {
        "name": "Blood Conduit",
        "replaces": "Fast Movement; Bloodline Feats; Uncanny Dodge; Improved Uncanny Dodge; Indomitable Will",
        "summary": "Blood conduits learn to channel their arcane might directly through their flesh, without the need for mystical words or gestures."
      },
      {
        "name": "Bloodrider",
        "replaces": "Fast Movement; Uncanny Dodge; Improved Uncanny Dodge; 9th-level Bloodline Feat",
        "summary": "In the world’s wild lands, a mount is an advantage in both everyday life and the dealing of death"
      },
      {
        "name": "Bloody-Knuckled Rowdy",
        "replaces": "Damage Reduction; Spellcasting; Fast Movement; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "The bloody-knuckled rowdy focuses on tricks and maneuvers that are quick and effective, duplicating combat styles from professional brawlers, street thugs, and even trapped animals."
      },
      {
        "name": "Crossblooded Rager",
        "replaces": "Bonus Feats; Bonus Spells; Bloodline Powers; Saving Throws",
        "summary": "While most bloodragers manifest only one bloodline, there are some that, through some quirk of heredity or the conjunction of other powers, manifest two."
      },
      {
        "name": "Enlightened Bloodrager",
        "replaces": "Spellcasting; 1st, 4th-level Bloodline Power; Bloodrage; Bonus Spells; 7th, 13th, 19th-level Damage Reduction",
        "summary": "Troubled by overwhelming rage and mystic forces beyond their comprehension, bloodragers have been traveling to the Magaambya for generations, seeking the peace and enlightenment promised by students of Old-Mage Jatembe."
      },
      {
        "name": "Greenrager",
        "replaces": "Blood Sanctuary; 6th and 9th-level Bloodline Feats",
        "summary": "Typically, nature finds its greatest harmony with divine magic, but sometimes a connection with the natural world manifest itself through the arcane current in the veins of the bloodragers called greenragers."
      },
      {
        "name": "Hag-Riven",
        "replaces": "Weapon/Armor Proficiencies; Fast Movement; Uncanny Dodge; Improved Uncanny Dodge; Damage Reduction",
        "summary": "All changelings have the potential to transform into hags, but the process is a slow one, requiring several nights to complete. When left incomplete—by virtue of a wily changeling’s escape or her mother’s death—the creature is scarred and saturated in arcane power."
      },
      {
        "name": "Id Rager",
        "replaces": "Bloodline; Bloodline Spells; Bloodline Powers; Spellcasting; Eschew Materials; Bloodline Feats",
        "summary": "An id rager lacks a supernatural taint to his blood, instead drawing power from pure emotion."
      },
      {
        "name": "Metamagic Rager",
        "replaces": "Improved Uncanny Dodge",
        "summary": "While metamagic is difficult for many bloodragers to utilize, a talented few are able to channel their bloodrage in ways that push their spells to impressive ends."
      },
      {
        "name": "Primalist",
        "replaces": "Bloodline",
        "summary": "While bloodrage powers come from the very essence of a bloodrager’s being and are often strict and immutable, some bloodragers tap into ancient traditions and primitive wisdom to enhance their rages with something more primal."
      },
      {
        "name": "Prowler at World's End",
        "replaces": "Bloodline Powers; 9th, 12th, 15th-level Bloodline Feats; Greater Bloodrage; Mighty Bloodrage",
        "summary": "Many catfolk bloodragers capable of communing with the ancient spirits of creation take on the burden of protecting the world from the sinister forces that exist at the world’s fringes."
      },
      {
        "name": "Rageshaper",
        "replaces": "Blood Sanctuary; Improved Uncanny Dodge",
        "summary": "All bloodragers blend the unpredictable surge of arcane power with the savage fury of battle lust. For most, their rage is a conduit for the eldritch power locked in their heritage, but for a rageshaper, the latent magical energies in his blood bring about physical transformations and facilitate the blending of arcana and aggression into a deadly synthesis that few other barbarians (or even other bloodragers) can match."
      },
      {
        "name": "Spelleater",
        "replaces": "Uncanny Dodge; Improved Uncanny Dodge; Damage Reduction",
        "summary": "Where other bloodragers learn to avoid or shrug off minor damage of all sorts, spelleaters tap into the power of their bloodline in order to heal damage as it comes, and can even cannibalize their own magical energy to heal more damage and continue taking the fight to the enemy."
      },
      {
        "name": "Steelblood",
        "replaces": "Armor Proficiency; Fast Movement; Uncanny Dodge; Improved Uncanny Dodge; Damage Reduction",
        "summary": "Most bloodragers prefer light armor, but some learn the secret of using heavy armors."
      },
      {
        "name": "Symbol Striker",
        "replaces": "Class Skills; Fast Movement; 6th, 9th, 12th, 18th-level Bloodline Feats;",
        "summary": "Symbol strikers are unique form of rune-wielding berserker spellcasters whose tradition originates from Dongun Hold, a Sky Citadel in Alkenstar"
      },
      {
        "name": "Untouchable Rager",
        "replaces": "Spells; Blood Casting; Eschew Materials; Bloodline Spells",
        "summary": "While most bloodragers are known for their inexplicable ability to focus their bloodline into a horrifying mix of martial terror and spellcasting fury, from time to time a bloodrager’s bloodline acts differently."
      },
      {
        "name": "Urban Bloodrager",
        "replaces": "Class Skills; Weapon/Armor Proficiencies; Bloodrage; Blood Sanctuary; Damage Reduction",
        "summary": "Like the urban barbarian, the urban bloodrager has learned to control her rage in so-called polite society."
      }
    ]
  } ,
  
  { "name"       : "Brawler" ,
  
    "description": 
    [
      "Deadly even with nothing in her hands, a brawler eschews using the fighter’s heavy armor and the monk’s mysticism, focusing instead on perfecting many styles of brutal unarmed combat. Versatile, agile, and able to adapt to most enemy attacks, a brawler’s body is a powerful weapon."
    ],
    
    "role": 
    [
      "Brawlers are maneuverable and well suited for creating flanking situations or dealing with lightly armored enemies, as well as quickly adapting to a rapidly changing battlefield."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Bouncer",
        "replaces": "Martial Flexibility; 2nd-level Bonus Feat; Close Weapon Mastery",
        "summary": "Some taverns employ bouncers to keep out undesirables or for when their customers get too rowdy."
      },
      {
        "name": "Constructed Pugilist",
        "replaces": "Class Skills; Martial Flexibility; Bonus Combat Feats",
        "summary": "Brawlers that develop combat skills that use their prostheses so they always have a weapon at hand"
      },
      {
        "name": "Exemplar",
        "replaces": "Unarmed Strike; Close Weapon Mastery; Maneuver Training; AC Bonus; Brawler’s Strike",
        "summary": "A versatile soldier who inspires her companions with her fighting prowess, an exemplar is at home on the front lines of battles anywhere."
      },
      {
        "name": "Feral Striker",
        "replaces": "Martial Flexibility",
        "summary": "A feral striker taps into a reservoir of druidic power hidden inside herself, allowing her to take animalistic characteristics."
      },
      {
        "name": "Hinyasi",
        "replaces": "Armor Proficiencies; 2nd-level Bonus Feat; Knockout; Close Weapon Mastery",
        "summary": "The hinyasi's martial traditions are centered on the use of farming tools and on other improvised weapons."
      },
      {
        "name": "Living Avalanche",
        "replaces": "2nd and 5th-level Bonus Feats; Maneuver Training; AC Bonus; Awesome Blow; Improved Awesome Blow",
        "summary": "When a living avalanche is on the move, no one can stand in her way."
      },
      {
        "name": "Mutagenic Mauler",
        "replaces": "Martial Flexibility; AC Bonus",
        "summary": "Not content with perfecting her body with natural methods, a mutagenic mauler resorts to alchemy to unlock the primal beast within."
      },
      {
        "name": "Shield Champion",
        "replaces": "Weapon/Armor Proficiencies; 3rd, 7th, 11th, 15th, and 19th-level Maneuver Training; Brawler’s Strike",
        "summary": "Stalwart in battle, a shield champion has perfected an entire martial discipline relying on only her hand-to-hand fighting skills and her ever-present shield."
      },
      {
        "name": "Snakebite Striker",
        "replaces": "Class Skills; Martial Flexibility; 3rd, 7th, 11th, and 19th-level Maneuver Training",
        "summary": "With her lightning quickness and guile, a snakebite striker keeps her foes’ attention focused on her, because any one of her feints might be an actual attack."
      },
      {
        "name": "Steel-Breaker",
        "replaces": "Class Skills; Brawler’s Strike; Maneuver Training",
        "summary": "The steel-breaker studies destruction and practices it as an art form."
      },
      {
        "name": "Strangler",
        "replaces": "Class Skills; Brawler’s Flurry; AC Bonus; Knockout; Awesome Blow; Improved Awesome Blow",
        "summary": "A strangler is trained to choke the life out of her victims with her vise-like grip."
      },
      {
        "name": "Turfer",
        "replaces": "Maneuver Training; Knockout",
        "summary": "A turfer has a mastery over particular types of terrain."
      },
      {
        "name": "Ulfen Beast-Wrestler",
        "replaces": "Maneuver Training; AC Bonus",
        "summary": "For these mighty grapplers, wrestling normal opponents has lost its challenge—they seek greater targets for glory."
      },
      {
        "name": "Venomfist",
        "replaces": "Unarmed Strike; Knockout; Close Weapon Mastery",
        "summary": "Thanks to alchemical experiments and rigorous study of venomous creatures, a venomfist has toxic unarmed strikes."
      },
      {
        "name": "Verdant Grappler",
        "replaces": "2nd and 11th-level Bonus Feats; Maneuver Training; Close Weapon Mastery",
        "summary": "By accepting spirits of nature into her soul, a verdant grappler can entangle her foes with tangled undergrowth."
      },
      {
        "name": "Wild Child",
        "replaces": "Class Skills; 2nd, 5th, 8th, 11th, 14th, 17th, and 20th-level Bonus Combat Feats; Close Weapon Mastery; Maneuver Training",
        "summary": "The wild child works with his sworn animal friend to conquer the challenges that lay before them."
      },
      {
        "name": "Winding Path Renegade",
        "replaces": "2nd, 8th, 14th-level Bonus Feat; AC Bonus",
        "summary": "Winding path renegades studied at the Houses of Perfection in Jalmeray, but while they grasped the mechanical aspects of the forms, they lacked the mental discipline required by the masters of the school."
      }
    ]
  } ,
  
  { "name"       : "Cavalier" ,
    
    "description": 
    [
      "While many warriors strive to perfect their art, spending all of their time honing their skill at martial arms, others spend as much effort dedicating themselves to a cause. These warriors, known as cavaliers, swear themselves to a purpose, serving it above all else. Cavaliers are skilled at fighting from horseback, and are often found charging across a battlefield, with the symbol of their order trailing on a long, fluttering banner. The cavalier’s true power comes from the conviction of his ideals, the oaths that he swears, and the challenges he makes."
    ],
    
    "role": 
    [
      "Cavaliers tend to marshal forces on the battlefield, using their mounted talents and challenges to control the flow of the fight. Outside of battle, cavaliers can be found advancing their cause through diplomacy and, if needed, subterfuge. The cavalier is no stranger to courtly intrigue and can hold his own in even the most delicate of social situations."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Beast Rider",
        "replaces": "Mount; Expert Trainer",
        "summary": "Where some cavaliers are simply skilled with horses or well-trained knights, the beast rider spends his life in constant pursuit of the most perfect mount, forming bonds with greater, more powerful, and more exotic creatures."
      },
      {
        "name": "Castellan",
        "replaces": "Mount; Cavalier’s Charge; Expert Trainer; Mighty Charge; Demanding Challenge; Supreme Charge",
        "summary": "A castellan is a cavalier who dedicates himself to the defense of a castle or walled city."
      },
      {
        "name": "Charger",
        "replaces": "Class Skills; Weapon/Armor Proficiencies; Mount; Cavalier’s Charge; Expert Trainer; Mighty Charge",
        "summary": "(Centaur Only) No warrior better epitomizes the centaur’s devastating martial power than the charger."
      },
      {
        "name": "Circuit Judge",
        "replaces": "Tactician; Greater Tactician; Master Tactician; Challange; Demanding Challange",
        "summary": "A circuit judge claims a specific region, becoming an expert in the local laws and, perhaps, becoming a fearsome executioner."
      },
      {
        "name": "Constable",
        "replaces": "Class Skills; Mount; Cavalier’s Charge; Expert Trainer; Banner; Mighty Charge; Supreme Charge; Greater Banner",
        "summary": "Constables keep order in the narrow streets and dark alleys of settlements."
      },
      {
        "name": "Courtly Knight",
        "replaces": "Tactician; Greater Tactician; Master Tactician",
        "summary": "These courtly knights are equally at home in a duel with words or swords."
      },
      {
        "name": "Daring Champion",
        "replaces": "Weapon/Armor Proficiencies; Mount; Cavalier’s Charge; Expert Trainer; Mighty Charge; Supreme Charge",
        "summary": "While many cavaliers are the champions of old fighting forms, some younger, more daring cavaliers mix a martial style influenced by the lighter armored and more flamboyant swashbuckler forms with the dedication of cavalier orders."
      },
      {
        "name": "Daring General",
        "replaces": "6th, 12th, 18th-level Bonus Feats; Demanding Challenge; Supreme Charge",
        "summary": "Those cavaliers most gifted at command often become daring generals."
      },
      {
        "name": "Disciple of the Pike",
        "replaces": "Mount; Cavalier's Charge; Expert Trainer; Banner; Greater Banner; Mighty Charge; Supreme Charge",
        "summary": "The Hellknight Order of the Pike are renowned monster hunters, taking on large game using ancient weapon arts combined with modern equipment."
      },
      {
        "name": "Drakerider",
        "replaces": "Mount; Tactcian; Expert Trainer; Banner; Greater Tactician; Greater Banner; Master Tactician;",
        "summary": "While many cavaliers dream of riding a dragon into battle, drakeriders come to learn that the reality involves far more effort than they had expected."
      },
      {
        "name": "Emissary",
        "replaces": "Tactician; Banner; Greater Tactician; Greater Banner; Supreme Charge",
        "summary": "Some cavaliers focus more on speed and mobility than they do on the raw power of the mounted charge."
      },
      {
        "name": "Esquire",
        "replaces": "Mount; Cavalier’s Charge; Expert Trainer; Banner; Mighty Charge; Supreme Charge",
        "summary": "The esquire is a roving knight who acquires the services of a faithful follower—an aide-de-camp—who serves as the esquire’s assistant, spear carrier, and guard."
      },
      {
        "name": "Fell Rider",
        "replaces": "Mount; Cavalier’s Charge; Expert Trainer; Banner; Mighty Charge; Greater Banner; Supreme Charge",
        "summary": "(Hobgoblin Only) The fell rider rides a bestial steed, a mount mastered by him alone. He tramples his enemies down, leaving twisted bodies in his wake, and fear rides with him."
      },
      {
        "name": "First Mother's Fang",
        "replaces": "Class Skills; Weapon Proficiencies; Mount; Order",
        "summary": "A first mother’s fang acts as a servant of his nation, a skilled general and tactician in times of war and a noble governor during times of peace."
      },
      {
        "name": "Gallant",
        "replaces": "Order; Banner; Greater Banner",
        "summary": "Gallants embody the virtues of honor, generosity, and civility. Their personal symbol serves as an inspiration to others in a courtly setting as much as on a battlefield."
      },
      {
        "name": "Gendarme",
        "replaces": "Tactician; Greater Tactician; Master Tactician; Supreme Charge",
        "summary": "The gendarme cares less for the finer points of tactical precision than he does for the exhilaration of the charge: the rush of wind through the visor of his helmet, the feel of his couched lance, the satisfying shriek of armor giving way before his weapon’s force as the point drives past metal into his foes."
      },
      {
        "name": "Ghost Rider",
        "replaces": "Mount; Tactician; Greater Tactician; Master Tactician; Cavalier’s Charge; Expert Trainer; Banner; Mighty Charge; Greater Banner",
        "summary": "Ghost riders are conflicted warriors who use the powers of the phantasmal dead even while seeking out and banishing the corruption of undeath from plagued communities."
      },
      {
        "name": "Green Knight",
        "replaces": "Tactician; Mount; Order; Cavalier’s Charge; Expert Trainer; Banner; Greater Tactician; Mighty Charge; Greater Banner; Master Tactician; Supreme Charge",
        "summary": "Some knights serve nature itself and can be found protecting unspoiled natural places or serving fey beings."
      },
      {
        "name": "Herald Squire",
        "replaces": "Tactician; 2nd-level Order Ability; Cavalier's Charge",
        "summary": "The herald squire is the eyes and ears of a traveling knight."
      },
      {
        "name": "Honor Guard",
        "replaces": "Challenge; Cavalier’s Charge; Mighty Charge; Demanding Challenge",
        "summary": "Certain cavaliers are trained not as advance combatants, but as loyal guards, standing as firm defenders in the face of threats to their chosen charge."
      },
      {
        "name": "Hooded Knight",
        "replaces": "Class Skills; Mount; Tactician; Greater Tactician; Master Tactician",
        "summary": "Some cavaliers wander the lonely roads of the world—any world, including the First World—protecting travelers and acting as their honor guard."
      },
      {
        "name": "Huntmaster",
        "replaces": "Weapon/Armor Proficiency; Challenge; Mount; Tactician; Greater Tactician; Master Tactician; Cavalier’s Charge; Expert Trainer; Banner; Bonus Feats; Mighty Charge; Greater Banner; Supreme Charge",
        "summary": "Huntmasters train the beasts favored by lordly castes into swift and deadly trackers."
      },
      {
        "name": "Hussar",
        "replaces": "Armor Proficiencies; Class Skills; Tactician; Banner; Greater Banner; 6th, 12th, 18th-level Bonus Feats; Greater Tactician; Master Tactician",
        "summary": "Agile and maneuverable cavalry, hussars make up for their relatively light armor with their speed and cunning."
      },
      {
        "name": "Knight of Arnisant",
        "replaces": "Tactician; Expert Trainer; Banner; Greater Tactician; Demanding Challenge; Greater Tactician",
        "summary": "The cavaliers known as knights of Arnisant revere the famous general who was crucial in the defeat of the Whispering Tyrant, the powerful wizard-king. Knights of Arnisant call upon Arnisant to grant them protection from evil magic, just as the Shield of Aroden protected him."
      },
      {
        "name": "Luring Cavalier",
        "replaces": "Challenge; Cavalier’s Charge; Mighty Charge; Demanding Challenge; Supreme Charge",
        "summary": "Those who study the perfection of strategy and tactics know that picking the battlefield can grant advantages that only overwhelming numbers of allies can eclipse."
      },
      {
        "name": "Musketeer",
        "replaces": "Mount; Expert Trainer",
        "summary": "Some cavaliers are entrusted by their masters with the care and use of expensive and powerful oddities—firearms."
      },
      {
        "name": "Oceanrider",
        "replaces": "Armor Proficiency; Mount; Expert Trainer",
        "summary": "Oceanriders are underwater cavaliers who ride dolphins, orcas, or seahorses."
      },
      {
        "name": "Qabarat Outrider",
        "replaces": "Armor Proficiency; Tactician; Greater Tactician; Master Tactician; Banner; Greater Banner",
        "summary": "(Lashunta Only) The war colleges of the Castrovelian city-state of Qabarat produce a distinctive breed of cavalier known as the Qabarat outrider. In defense of the lashunta city-states, outriders lead small units of regular troops, the members of which can link minds with one another to form bonds in battle few can match."
      },
      {
        "name": "Qadiran Horselord",
        "replaces": "Weapon and Armor Proficiency; Mount; Tactician; Cavalier's Charge; 6th-level Bonus Feat; Greater Tactician; Master Tactician",
        "summary": "Much like the breed of horses they ride, Qadiran horselords pride themselves on their mobility and endurance."
      },
      {
        "name": "Saurian Champion",
        "replaces": "Class Skills; Weapon/Armor Proficiencies; Challenge; Order; Cavalier’s Mount; Tactician; Greater Tactician; Master Tactician; Banner; Greater Banner",
        "summary": "These primeval cavaliers idolize dinosaurs as apex predators and value them as powerful, oversized mounts."
      },
      {
        "name": "Sister-in-Arms",
        "replaces": "Challange; Order; Mount; Cavalier's Charge; Expert Trainer; Mighty Charge; Supreme Charge",
        "summary": "Some of the most charismatic Gray Maidens combine their devotion to their sisters with the intense tactical training they received, learning to perfectly direct their companions and inspiring them to survive and emerge victorious."
      },
      {
        "name": "Spellscar Drifter",
        "replaces": "Weapon/Armor Proficiency; Tactician; Cavalier’s Charge; Banner Cavalier; Bonus Feats; Greater Tactician; Mighty Charge; Demanding Challenge; Master Tactician; Supreme Charge",
        "summary": "Spellscar drifters are self-reliant and always keep their firearms loaded—in the Spellscar Desert, a rider with a slow draw doesn’t live long."
      },
      {
        "name": "Standard Bearer",
        "replaces": "Mount; Banner; Mighty Charge; Supreme Charge",
        "summary": "Some cavaliers prefer to stand away from the fray, their banners a beacon shining brightly over the battlefield, rallying their troops to victory."
      },
      {
        "name": "Strategist",
        "replaces": "Expert Trainer; Greater Banner; 18th-level Bonus Feat",
        "summary": "Some cavaliers make a lifelong mission out of their exceptional ability to direct troops on the battlefield, combining tactical insight with a preternatural skill at improving the teamwork of their allies in order to win the day."
      },
      {
        "name": "Vermin Tamer",
        "replaces": "Mount; Expert Trainer; Demanding Challenge",
        "summary": "Due to the strange terrain, the lack of sunlight, and numerous other hazards, keeping a traditional mount in the Darklands can prove difficult. Cavaliers native to or traveling the region may choose to tame local creatures instead."
      },
      {
        "name": "Wave Rider",
        "replaces": "Weapon/Armor Proficiency; Mount",
        "summary": "Throughout the Inner Sea region, wave riders patrol harbors, keeping them safe from dangerous sea creatures and watching for smugglers. The most famous of these is the hippocampus-riding Sea Cavalry of Absalom."
      }
    ]
  } ,
  
  { "name"       : "Cleric" ,
  
    "description": 
    [
      "In faith and the miracles of the divine, many find a greater purpose. Called to serve powers beyond most mortal understanding, all priests preach wonders and provide for the spiritual needs of their people. Clerics are more than mere priests, though; these emissaries of the divine work the will of their deities through strength of arms and the magic of their gods. Devoted to the tenets of the religions and philosophies that inspire them, these ecclesiastics quest to spread the knowledge and influence of their faith. Yet while they might share similar abilities, clerics prove as different from one another as the divinities they serve, with some offering healing and redemption, others judging law and truth, and still others spreading conflict and corruption. The ways of the cleric are varied, yet all who tread these paths walk with the mightiest of allies and bear the arms of the gods themselves."
    ],
    
    "role": 
    [
      "More than capable of upholding the honor of their deities in battle, clerics often prove stalwart and capable combatants. Their true strength lies in their capability to draw upon the power of their deities, whether to increase their own and their allies' prowess in battle, to vex their foes with divine magic, or to lend healing to companions in need.",
      "As their powers are influenced by their faith, all clerics must focus their worship upon a divine source. While the vast majority of clerics revere a specific deity, a small number dedicate themselves to a divine concept worthy of devotion—such as battle, death, justice, or knowledge—free of a deific abstraction. (Work with your GM if you prefer this path to selecting a specific deity.)"
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Angelfire Apostle",
        "replaces": "Armor Proficiency; Spellcasting; Alignment; Channel Energy",
        "summary": "Angelfire apostles use the powers of good to avoid violence when possible and cleanse both maladies and evil creatures with blinding flames."
      },
      {
        "name": "Appeaser",
        "replaces": "Aura; Channel Energy; Alignment; Spells; Domains",
        "summary": "A rare few seek the power of dark forces for brighter ends by focusing on the utilitarian aspects of a god’s portfolio, appeasing their deities through high praise and glorifying their chosen gods’ unaligned aspects."
      },
      {
        "name": "Asmodean Advocate",
        "replaces": "Domains",
        "summary": "For the faithful of Asmodeus, the words used in a negotiation or contract matter more than their intent."
      },
      {
        "name": "Blossoming Light",
        "replaces": "Armor Proficiency; Alignment; Channel Energy; Domains",
        "summary": "Blossoming lights are clerics who take their pursuit of purity and light to extremes."
      },
      {
        "name": "Cardinal",
        "replaces": "Armor Proficieny; Spontaneous Casting; Domain; Class Skills; Skill Ranks; Base Attack Bonus",
        "summary": "Cardinals wield significant political power, engaging in the game of intrigue on behalf of their churches"
      },
      {
        "name": "Channeler of the Unknown",
        "replaces": "Weapon and Armor Proficiency; Spells; Aura; Channel Energy; Domains; Spontaneous Casting",
        "summary": "(Ex-cleric archetype) Channelers of the unknown are those faithless clerics who channel the power of an unknown entity or force of the universe"
      },
      {
        "name": "Cloistered Cleric",
        "replaces": "Weapon/Armor Proficiencies; Domains; Spells",
        "summary": "Cloistered clerics typically live in a temple and rarely interact with the outside world. They are bookish and well learned in the lore of the faith, paying less attention to its magical and martial aspects."
      },
      {
        "name": "Crashing Wave",
        "replaces": "Deity; Bonus Languages; Channel Energy; Spontaneous Casting",
        "summary": "Clerics who live in or near the sea sometimes embrace the watery aspect of Gozreh over the deity’s other dimensions and take the title of crashing wave; such clerics understand the tempestuousness and cruelty of the sea, but also its generosity and bounty"
      },
      {
        "name": "Crusader",
        "replaces": "Domains; Spells",
        "summary": "Crusaders serve the militant arm of a church, ready to stand guard over the religion’s holy places and to be its swift, avenging arm against those who resist its truth."
      },
      {
        "name": "Demonic Apostle",
        "replaces": "Domains; Channel Energy",
        "summary": "(Drow Only) Demon worship is common among the drow, and so are ranks of demonic apostles, who gain magical insight from their dark lords and crush their chaotic masters’ enemies by channeling demonic energy."
      },
      {
        "name": "Divine Paragon",
        "replaces": "Domain; Aura",
        "summary": "Divine paragons strive to emulate their god’s ideals as closely as possible."
      },
      {
        "name": "Divine Scourge",
        "replaces": "Domains; Channel Energy",
        "summary": "Divine scourges take on the role of dealing out unique punishments on behalf of their deities, taking pleasure in carrying out their sacrosanct duties."
      },
      {
        "name": "Divine Strategist",
        "replaces": "Domains; Channel Energy",
        "summary": "The divine strategist leads the armies of the faithful, not from the front lines but through her clever strategy and tactical acumen."
      },
      {
        "name": "Ecclesitheurge",
        "replaces": "Weapon/Armor Proficiencies; Domain; Channel Energy",
        "summary": "Eschewing physical armor for protection via the strength of his faith, an ecclesitheurge focuses on the miracles his deity bestows and the breadth of that deity’s dominion."
      },
      {
        "name": "Elder Mythos Cultist",
        "replaces": "Alignment; Domains; Channel Energy; Spontaneous Casting; 5th, 11th, and 19th-level Channel Energy increase",
        "summary": "Typically grasping, secretive, and thoroughly mad, Elder Mythos cultists open their bodies and minds to horrifying realities not meant for the sane as they strive to prepare the world for the eventual return of their alien masters."
      },
      {
        "name": "Evangelist",
        "replaces": "Domains; Channel Energy; Spontaneous Casting",
        "summary": "The evangelist is the voice of her religion in the world."
      },
      {
        "name": "Fiendish Vessel",
        "replaces": "Domains; Channel Energy",
        "summary": "(Tiefling Only) Fiendish vessels, through their fiendish heritage, share an innate connection with their patron, and that connection grants them understanding and power."
      },
      {
        "name": "Forgemaster",
        "replaces": "Domains; Channel Energy",
        "summary": "(Dwarf Only) Forgemasters are priestly dwarves who are ritual casters and expert enchanters, able to produce their rune-graven armaments with astonishing speed."
      },
      {
        "name": "Foundation of Faith",
        "replaces": "Channel Energy",
        "summary": "Whether aiding the faithful or defending against the depredations of unbelievers, a foundation of faith is unshakable in her convictions."
      },
      {
        "name": "Herald Caller",
        "replaces": "Class Skills; Domains; Armor Proficiencies;",
        "summary": "Unlike warpriests or paladins, who charge headlong into battle in the name of their patron deities, herald callers are adept at calling powerful outsiders to aid their brethren in battle."
      },
      {
        "name": "Hidden Priest",
        "replaces": "1st-level Domain Power, 8th-level Domain Power",
        "summary": "When practicing their religion is outlawed, the hidden priest learns to hide their true nature and practice magic in secret."
      },
      {
        "name": "Idealist",
        "replaces": "Spontaneous Casting; Channel Energy",
        "summary": "Idealist clerics are personifications of belief, each embracing the purest ideal of his deity’s realm."
      },
      {
        "name": "Iron Priest",
        "replaces": "Class Skills; Channel Energy; Spellcasting",
        "summary": "Iron priests preach of the messengers from beyond the stars, envoys of the divine brought to Golarion in a falling star."
      },
      {
        "name": "Lawspeaker",
        "replaces": "Alignment; Domains",
        "summary": "Lawspeakers spread their philosophy of certain and unwavering justice throughout the Inner Sea region."
      },
      {
        "name": "Mendevian Priest",
        "replaces": "Domains",
        "summary": "Crusade-minded clerics of Iomedae, Gorum, and other churches come to Mendev to learn battlefield tactics and the weaknesses of demons."
      },
      {
        "name": "Merciful Healer",
        "replaces": "Domains; Channel Energy",
        "summary": "The merciful healer is a master of battlefield revivification, sustaining and restoring allies to keep them in the fight."
      },
      {
        "name": "Roaming Exorcist",
        "replaces": "Skill Ranks; Weapon/Armor Proficiencies; Domains; Channel Energy",
        "summary": "The roaming exorcist travels far and wide to root out possessions, hauntings, and hidden evils. The roaming exorcist extracts unruly spirits from not only victims of possession, but also haunted sites and accursed items."
      },
      {
        "name": "Sacred Attendant",
        "replaces": "Channel Armor Proficiency; Energy; Domains",
        "summary": "Sacred attendants bring out the varied beauty in everyone they help, and they typically worship deities of beauty, love, and sex."
      },
      {
        "name": "Scroll Scholar",
        "replaces": "1st Level Domain Power, Channel Energy 5th level increase, 4th-level spell slot",
        "summary": "Those who trade some of their potential to better understand ancient texts and scrolls can become learned scroll scholars."
      },
      {
        "name": "Separatist",
        "replaces": "Domains",
        "summary": "A radical cleric, unsatisfied with the orthodoxy of her deity’s teachings, forges her own path of defiant divine expression."
      },
      {
        "name": "Stoic Caregiver",
        "replaces": "Channel Energy; Domains;",
        "summary": "Stoic caregivers are champions of life in defiance of untimely death as well as undeath."
      },
      {
        "name": "Theologian",
        "replaces": "Domains",
        "summary": "A theologian is an expert on one particular area of her religion"
      },
      {
        "name": "Triadic Priest",
        "replaces": "Domains",
        "summary": "Power comes not just from communion with one’s deity, but also from the formation of divine triumvirates. At the head of these groups are triadic priests."
      },
      {
        "name": "Undead Lord",
        "replaces": "Domains",
        "summary": "An undead lord is a cleric focused on using necromancy to control undead."
      },
      {
        "name": "Varisian Pilgrim",
        "replaces": "Altered Domain Abilities; Medium Armor/Shield Proficiency; 8th-level Domain Power",
        "summary": "While most clerics are associated with a particular temple, adventuring clerics spend much of their time away from their favored place of worship, and there are those who worship primarily on the road and during the journey."
      }
    ]
  } ,
  
  { "name"       : "Druid" ,
  
    "description": 
    [
      "Within the purity of the elements and the order of the wilds lingers a power beyond the marvels of civilization. Furtive yet undeniable, these primal magics are guarded over by servants of philosophical balance known as druids. Allies to beasts and manipulators of nature, these often misunderstood protectors of the wild strive to shield their lands from all who would threaten them and prove the might of the wilds to those who lock themselves behind city walls. Rewarded for their devotion with incredible powers, druids gain unparalleled shape-shifting abilities, the companionship of mighty beasts, and the power to call upon nature's wrath. The mightiest temper powers akin to storms, earthquakes, and volcanoes with primeval wisdom long abandoned and forgotten by civilization."
    ],
    
    "role": 
    [
      "While some druids might keep to the fringe of battle, allowing companions and summoned creatures to fight while they confound foes with the powers of nature, others transform into deadly beasts and savagely wade into combat. Druids worship personifications of elemental forces, natural powers, or nature itself. Typically this means devotion to a nature deity, though druids are just as likely to revere vague spirits, animalistic demigods, or even specific awe-inspiring natural wonders."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Aerie Protector",
        "replaces": "Weapon/Armor Proficiencies; Nature Bond; Wild Empathy; Woodland Stride; Resist Nature’s Lure; Wild Shape; Venom Immunity",
        "summary": "The aerie protector guards nature’s nests and lairs in the highest mountains, and she is only ever truly at ease when under vast expanses of open sky."
      },
      {
        "name": "Ancient Guardian",
        "replaces": "Weapon Proficiencies; Nature Bond; Wild Empathy; Trackless Step; Woodland Stride; Spontaneous Casting; Resist Nature’s Lure; A Thousand Faces",
        "summary": "Ancient guardians revere nature and draw power from its divine energies, but also protect the customs, histories, and lore of their tribe and race."
      },
      {
        "name": "Ape Shaman",
        "replaces": "A Thousand Faces; Venom Immunity",
        "summary": "A shaman with this totem calls upon the mighty ape, a peaceful but powerful simian whose strength is beyond compare."
      },
      {
        "name": "Aquatic Druid",
        "replaces": "Woodland Stride; Trackless Step; Resist Nature's Lure; Venom Immunity; A Thousand Faces",
        "summary": "Shepherds of the lakes and seas, aquatic druids guard ecosystems ranging from shallows streams to deep ocean trenches, ministering to their residents and communing with the tides."
      },
      {
        "name": "Arctic Druid",
        "replaces": "Woodland Stride; Trackless Step; Resist Nature's Lure; Venom Immunity; A Thousand Faces",
        "summary": "An arctic druid watches over the stark landscape of the far frozen reaches of the world."
      },
      {
        "name": "Ashvawg Tamer",
        "replaces": "Resist Nature's Lure, one less Wild Shape/day, Venom Immunity",
        "summary": "Ashvawg Tamers are druids who have chosen to bond with a strange and monstrous creature."
      },
      {
        "name": "Bat Shaman",
        "replaces": "A Thousand Faces; Venom Immunity",
        "summary": "The bat shaman’s totem is the agile bat, flitting and turning with incredible speed through even the most convoluted mazes."
      },
      {
        "name": "Bear Shaman",
        "replaces": "A Thousand Faces; Venom Immunity",
        "summary": "A shaman with this focus calls upon the mighty bear, titan of the woodlands and mountains, a paragon of strength and ferocity, and yet also a quiet protector rich in wisdom."
      },
      {
        "name": "Blight Druid",
        "replaces": "Wild Empathy; Trackless Step; Resist Nature's Lure; Venom Immunity; A Thousand Faces",
        "summary": "The devoted servants of nature corrupted, ruined, and destroyed, blight druids are the caretakers of lands ravaged by natural disaster."
      },
      {
        "name": "Boar Shaman",
        "replaces": "A Thousand Faces; Venom Immunity",
        "summary": "A boar shaman chooses the stolid and ferocious boar as her totem."
      },
      {
        "name": "Cave Druid",
        "replaces": "Nature Sense; Woodland Stride; Trackless Step; Resist Nature's Lure",
        "summary": "A few druids seek to preserve the hidden underdark and purge it of the fell horrors that creep up from below."
      },
      {
        "name": "Death Druid",
        "replaces": "Nature Bond; Wild Shape; Resist Nature's Lure; Venom Immunity",
        "summary": "Some druids believe that birth and death are the most important parts of the natural cycle."
      },
      {
        "name": "Defender of the True World",
        "replaces": "Class Skills; Wild Empathy; Trackless Step; Resist Nature's Lure; Venom Immunity; A Thousand Faces",
        "summary": "Some druids specialize in protecting Golarion from the threat of First World inhabitants."
      },
      {
        "name": "Desert Druid",
        "replaces": "Woodland Stride; Trackless Step; Resist Nature's Lure; Venom Immunity; A Thousand Faces",
        "summary": "Desert druids come to the desert to pay homage, protect and maintain the few habitable locales, and witness nature's majesty in all its burning, merciless glory."
      },
      {
        "name": "Devolutionist",
        "replaces": "Nature Bond; Resist Nature's Lure; Venom Immunity",
        "summary": "Devolutionists believe that the world would be better off without any sentient life at all."
      },
      {
        "name": "Dinosaur Druid",
        "replaces": "Spontaneous Casting; Nature’s Bond; Wild Shape; Resist Nature’s Lure",
        "summary": "A dinosaur druid speaks for the spirit of prehistoric nature, even taking the form of great beasts of legend."
      },
      {
        "name": "Draconic Druid",
        "replaces": "Nature Bond; Wild Empathy; Woodland Stride; Venom Immunity; A Thousand Faces; Timeless Body; Nature Sense; Resist Nature's Lure",
        "summary": "Some druids believe that dragons are the ultimate expression of nature and eventually transform into draconic forms."
      },
      {
        "name": "Dragon Shaman",
        "replaces": "A Thousand Faces; 8th-level Wild Shape; Venom Immunity",
        "summary": "Your totem is the legendary dragon, fearsome and deadly yet cunning and wise, a creature born of pure magic and raw elemental fury, bound within a shell of fangs, claws, and scales that few dare to challenge."
      },
      {
        "name": "Drovier",
        "replaces": "Nature's Bond; Wild Shape",
        "summary": "Droviers view their allies and adventuring companions as a herd or pack to be protected and directed."
      },
      {
        "name": "Eagle Shaman",
        "replaces": "A Thousand Faces; Venom Immunity",
        "summary": "A shaman with this totem calls upon the noble eagle, stern and proud, soaring high above the world with keen and pitiless eyes that miss nothing."
      },
      {
        "name": "Elemental Ally",
        "replaces": "Nature’s Bond; Wild Shape; Wild Empathy; Resist Nature’s Lure",
        "summary": "An elemental ally is a druid who has crafted powerful bonds of trust and friendship with one ally from each of the four primary elemental planes."
      },
      {
        "name": "Feral Child",
        "replaces": "Weapon/Armor Proficiency; Class Skills; Nature Bond; Trackless Step; A Thousand Faces; Wild Shape; Resist Nature’s Lure; Venom Immunity; Timeless Body",
        "summary": "(Human Only) Some youths, abandoned in the wilderness and then raised by animals, are so connected with their adoptive home and family that they become feral."
      },
      {
        "name": "Feral Shifter",
        "replaces": "Nature Bond; Venom Immunity; A Thousand Faces; Timeless Body",
        "summary": "A feral shifter internalizes her communion with and mastery over animals. Instead of forming a bond with an animal companion or an aspect of nature, she alters her own essence or being as homage to the noble creatures of the wild."
      },
      {
        "name": "Feyspeaker",
        "replaces": "Spontaneous Casting; Wild Shape; Nature Sense; Base Attack Bonus; Class Skills; Skill Ranks; Armor Proficiency",
        "summary": "Some druids hear the whispers of the natural world like fey creatures do, and learn to mimic those tantalizing murmurs in order to influence the minds of both wild beasts and civilized people."
      },
      {
        "name": "Fungal Pilgrim",
        "replaces": "Nature Bond; Wild Shape; Timeless Body",
        "summary": "Fungal pilgrims are druids seeking transformation into a more plantlike existence."
      },
      {
        "name": "Goliath Druid",
        "replaces": "Class Skills; Nature Sense; Nature Bond; Wild Empathy; Resist Nature’s Lure; Wild Shape; Venom Immunity; A Thousand Faces",
        "summary": "Goliath druids hone their spiritual and magical connections to nature’s largest creatures, especially dinosaurs, giants, and megafauna, revering these massive creatures as living relics of a primeval time when all creatures were more in harmony with nature."
      },
      {
        "name": "Green Faith Initiate",
        "replaces": "Trackless Step; 6th, 10th-level use of Wild Shape; Venom Immunity; A Thousand Faces",
        "summary": "Druids who are initiated into the magic of nature as strict students of the Green Faith’s traditions sometimes demonstrate abilities unique to their organization."
      },
      {
        "name": "Green Scourge",
        "replaces": "Spontaneous Casting; Nature Sense; Trackless Step; Resist Nature's Lure",
        "summary": "Green scourges are militant druids sworn to restore natural order."
      },
      {
        "name": "Halcyon Druid",
        "replaces": "Nature Bond; Nature Sense; Class Skills; Wild Empathy; Spontaneous Casting; Wild Shape; Resist Nature's Lure; A Thousand Faces",
        "summary": "Though they revere the natural world, halcyon druids are less focused on emulating its inhabitants. Instead, like Old-Mage Jatembe, they treat with beings from the Outer Sphere."
      },
      {
        "name": "Jungle Druid",
        "replaces": "Woodland Stride; Trackless Step; Resist Nature's Lure; A Thousand Faces",
        "summary": "The jungle druid waches over the fecund jungles of the equatorial regions, rich in life and ancient tradition."
      },
      {
        "name": "Kraken Caller",
        "replaces": "Bonus Language; Woodland Stride; Trackless Step; Resist Nature’s Lure; Wild Shape; A Thousand Faces",
        "summary": "Some druids draw upon power irreverently stolen from one of the most dangerous creatures of the depths: the kraken."
      },
      {
        "name": "Leshy Warden",
        "replaces": "Nature Bond; Wild Empathy; Spontaneous Casting; Resist Nature’s Lure; Wild Shape; A Thousand Faces",
        "summary": "The natural world is full of bodiless nature spirits connected to the forces of glades, springs, and individual plants. Some druids hear their call keenly and are able to effortlessly incarnate them as the miniature creatures known as leshys."
      },
      {
        "name": "Life Channeler",
        "replaces": "Alignment; Nature Bond; Wild Shape; Venom Immunity",
        "summary": "By sacrificing the life of a sentient creature, life channelers can generate energy that guarantees fertility and prosperity for lower creatures like plants and animals."
      },
      {
        "name": "Lion Shaman",
        "replaces": "A Thousand Faces; Venom Immunity",
        "summary": "A shaman with this totem calls upon the proud lion, imposing and majestic, the mighty leader of deadly hunters."
      },
      {
        "name": "Mantella",
        "replaces": "Wild Shape; Venom Immunity; Spontaneous Casting",
        "summary": "(Grippli) A mantella focuses on exploring her poisonous heritage, whether or not it has manifested in her own personal biology."
      },
      {
        "name": "Menhir Savant",
        "replaces": "Nature Sense; Wild Empathy; Woodland Stride; Trackless Step; A Thousand Faces",
        "summary": "Some druids study the paths of nature’s power through the nodes and ley lines that connect standing stones and megalithic circles, learning to tap into their energies."
      },
      {
        "name": "Mooncaller",
        "replaces": "Woodland Stride; Resist Nature's Lure; Venom Immunity; A Thousand Faces",
        "summary": "A mooncaller is bound to the subtle influences of the ever-changing moon and its endless cycles from light to dark and back again."
      },
      {
        "name": "Mountain Druid",
        "replaces": "Woodland Stride; Trackless Step; Resist Nature's Lure; Venom Immunity; A Thousand Faces",
        "summary": "As more and more of the soft, easy lands become cultivated and civilized, many druids look for refuge and solitude among the eternal peaks of the highest mountains."
      },
      {
        "name": "Naga Aspirant",
        "replaces": "Spontaneous Casting; Resist Nature’s Lure; Wild Shape; Venom Immunity; A Thousand Faces; Timeless Body",
        "summary": "(Nagaji Only) The naga aspirant follows the ancient beliefs and engages in the rituals of a druidic sect dedicated to the transcendence of her nagaji form through absolute devotion to nagas and naga gods."
      },
      {
        "name": "Nature Fang",
        "replaces": "Nature Sense; Wild Empathy; Woodland Stride; Wild Shape; Resist Nature’s Lure; Venom Immunity",
        "summary": "A nature fang is a druid who stalks and slays those who despoil nature, kill scarce animals, or introduce diseases to unprotected habitats."
      },
      {
        "name": "Nature Priest",
        "replaces": "Deity; Class Skills; Weapon Proficiencies; Nature Sense; Nature Bond; Resist Nature's Lure; Venom Immunity",
        "summary": "Nature priests serve two masters: their deities and nature itself, and can call upon the power of both to fuel their divine abilities."
      },
      {
        "name": "Nithveil Adept",
        "replaces": "Nature Sense; Nature Bond; Spontaneous Casting; Resist Nature's Lure",
        "summary": "Nithveil adepts learn the secret magic of the First World fey in the moving, reality-phasing city of Nithveil"
      },
      {
        "name": "Pack Lord",
        "replaces": "Nature Bond",
        "summary": "Some druids bond with many animal companions rather than just one, achieving a level of communion rare even in druidic circles and leading their pack brothers and pack sisters with total authority."
      },
      {
        "name": "Plains Druid",
        "replaces": "Woodland Stride; Trackless Step; Resist Nature's Lure; Venom Immunity; A Thousand Faces",
        "summary": "Out upon the wide and rolling prairies and savannahs, plains druids stand guard over the grasslands."
      },
      {
        "name": "Planar Extremist",
        "replaces": "Alignment; Spells; Nature's Bond; Spontaneous Casting; Resist Nature's Lure; Wild Shape",
        "summary": "(Ex-druid archetype) Planar extremists are those druids that have lost their neutral stance and find themselves gravitating toward one of the four most extreme alignments"
      },
      {
        "name": "Progenitor",
        "replaces": "Spontaneous Casting; Nature Bond; Wild Shape",
        "summary": "Progenitors are druids who tap into the vibrant power of the First World to propagate natural and supernatural wonders."
      },
      {
        "name": "Reincarnated Druid",
        "replaces": "Woodland Stride; Resist Nature's Lure; Venom Immunity; Timeless Body",
        "summary": "Spun off into the endless circle of life, an incarnate druid is an embodiment of nature’s eternal renewal."
      },
      {
        "name": "Restorer",
        "replaces": "Nature Sense; Spontanteous Casting; Resist Nature's Lore; A Thousand Faces",
        "summary": "Restorers carefully tend to the health of both the environment and creatures in it."
      },
      {
        "name": "River Druid",
        "replaces": "Class Skills; Nature Sense; Woodland Stride; Trackless Step; Resist Nature’s Lure; Wild Shape; Timeless Body",
        "summary": "These druids are the guardians of rivers and the creatures that depend on them."
      },
      {
        "name": "Road Keeper",
        "replaces": "Spontaneous Casting; Nature Bond; Wild Empathy; Woodland Stride; Resist Nature’s Lure; Wild Shape",
        "summary": "Guardians of the lonely paths between cities, road keepers protect the wild from travelers, and travelers from the wild."
      },
      {
        "name": "Rot Warden",
        "replaces": "Spontaneous Casting; Nature Bond; Wild Empathy; Trackless Step; Venom Immunity; Resist Nature’s Lure; Wild Shape",
        "summary": "Harbingers of decay, rot wardens live in damp lands where insects and rot break down the dead to feed the living."
      },
      {
        "name": "Saurian Shaman",
        "replaces": "Venom Immunity",
        "summary": "A shaman with this focus calls upon the primeval dinosaur, the archaic terror that lingers as a hungering, atavistic stranger at the fringes of the ecosystem, a destroyer and despoiler whose coming other animals dread."
      },
      {
        "name": "Season Keeper",
        "replaces": "Nature Bond; Trackless Step; Venom Immunity; Timeless Body; Wild Shape",
        "summary": "(Triaxian Only) Imbued with the primeval potency of their planet’s seasons, those druids known as season keepers guide Triaxian communities through the stark transition from summer to winter (and vice versa)."
      },
      {
        "name": "Season Sage",
        "replaces": "Wild Shape",
        "summary": "(Gathlain) Season sages wander as the seasons change, turning the leaves and transforming nature as they pass and taking pleasure in the transition between seasons."
      },
      {
        "name": "Serpent Shaman",
        "replaces": "A Thousand Faces; Venom Immunity",
        "summary": "A shaman with this totem calls upon the cunning serpent, the stealthy deceiver who draws the weak minded in and strikes while they are unaware."
      },
      {
        "name": "Shark Shaman",
        "replaces": "A Thousand Faces; Venom Immunity",
        "summary": "Some druids emulate the deadly shark, a remorseless hunter that marine dwellers dread."
      },
      {
        "name": "Skinshaper",
        "replaces": "Class Skills; Wild Shape; A Thousand Faces",
        "summary": "Using the same primal energy with which other druids assume animal forms, skinshapers can imitate some of the most dangerous beasts of all: humans and other humanoids."
      },
      {
        "name": "Sky Druid",
        "replaces": "Weapon/Armor Proficiency; Nature Bond; Woodland Stride; Resist Nature’s Lure; Trackless Step; Wild Shape; Venom Immunity; A Thousand Faces",
        "summary": "(Sylph Only) Some druids develop ties not to a particular landscape, but instead to the endless blue expanse of the skies."
      },
      {
        "name": "Storm Druid",
        "replaces": "Spontaneous Casting; Woodland Stride; Trackless Step; Resist Nature's Lure; Venom Immunity; A Thousand Faces",
        "summary": "While most druids focus their attention upon the rich earth and the bounty of nature that springs forth from it, the storm druid’s eyes have ever been cast to the skies and the endless expanse of blue, channeling the most raw and untamed aspects of nature."
      },
      {
        "name": "Sunrider",
        "replaces": "Class Skills; Weapon and Armor Proficiencies; Nature Bond; Woodland Stride; Trackless Step; Resist Nature's Lure; Wild Shape",
        "summary": "Sunriders help their allies, be they fellow tribe members or fellow adventurers, to survive in harsh desert terrain, while simultaneously making it even harsher for their foes."
      },
      {
        "name": "Supernaturalist",
        "replaces": "Weapon/Armor Proficiencies; Nature Bond; Wild Empathy; Nature Sense; Trackless Step; Resist Nature’s Lure; Wild Shape",
        "summary": "Supernaturalists wholly embrace paranormal phenomena as extensions of nature."
      },
      {
        "name": "Survivor",
        "replaces": "Class Skills; Weapon/Armor Proficiencies; Spellcasting; Nature Bond; Resist Nature’s Lure; Wild Shape; Venom Immunity",
        "summary": "The survivor embodies the neutral aspect of the natural world and eschews druidic magic in favor of more pragmatic and worldly survival methods."
      },
      {
        "name": "Swamp Druid",
        "replaces": "Woodland Stride; Trackless Step; Resist Nature's Lure; A Thousand Faces",
        "summary": "Some druids eschew pleasant glades and groves and instead seek out dank marshes, misty bogs and heaths, and trackless swamps as the place they call home and watch over with care, finding beauty and life in abundance in places few others would willingly enter."
      },
      {
        "name": "Swarm Monger",
        "replaces": "Nature Bond; Woodland Stride; Nature Sense; Resist Nature's Lure; 12th-level Wild Shape options",
        "summary": "Whereas other druids commune with nature or even the spirit of a city, swarm mongers find beauty and strength in decay, and they draw their power from fungus, disease, and their own singular will to survive."
      },
      {
        "name": "Tempest Druid",
        "replaces": "Alignment; Weapon and Armor Proficiencies; Nature Bond; Nature Sense; Trackless Step; Resist Nature's Lure; Venom Immunity",
        "summary": "Some druids have come to worship the Eye of Abendego as an aspect of pure elemental fury, channeling its mysteries into their own magic"
      },
      {
        "name": "Tempest Tamer",
        "replaces": "Bonus Languages; Resist Nature's Lure; Wild Shape",
        "summary": "Tempest Tamer\nSource Blood of the Sea pg. 25\nDruids draw upon the fiercest powers of nature, and tsunamis, typhoons, and whirlpools are among the most powerful forces in the ocean."
      },
      {
        "name": "Toxicologist",
        "replaces": "Spontaneous Casting; Wild Empathy; Woodland Stride; Trackless Step; Resist Nature's Lure; Wild Shape",
        "summary": "Toxicologists specialize in the stealthy application of insidious poisons to their targets, believing word of their foes’ horrifying deaths will deter others from attempting similar desecrations of the natural world."
      },
      {
        "name": "Treesinger",
        "replaces": "Nature Bond; Wild Empathy; Wild Shape",
        "summary": "(Elf Only) Some elves turn to the timeless growth of nature for solace, finding allies among the great trees themselves, and even leading the forest’s plants into combat."
      },
      {
        "name": "Troll Fury",
        "replaces": "Wild Empathy; Resist Nature’s Lure; Venom Immunity",
        "summary": "(Troll Only) Troll furies combine a druid’s love of natural balance with a single-minded devotion to the welfare of the troll tribe."
      },
      {
        "name": "Undine Adept",
        "replaces": "Domains; Woodland Stride; Trackless Step; Resist Nature’s Lure; Wild Shape; Venom Immunity",
        "summary": "(Undine Only) An undine adept dedicates herself to preserving the knowledge of the first undines and ensuring her people’s ancient connections to the natural world remain undisturbed."
      },
      {
        "name": "Urban Druid",
        "replaces": "Spontaneous Casting; Woodland Stride; Trackless Step; Resist Nature's Lure; Venom Immunity",
        "summary": "While many druids keep to the wilderness, some make their way within settlements, communing with the animals and vermin who live there and speaking for the nature that runs rampant in civilization's very cradle."
      },
      {
        "name": "Urushiol",
        "replaces": "Nature Bond; Resist Nature's Lure",
        "summary": "When an urushiol druid forms a bond with nature, it takes a vastly different form than for most druids. His body becomes increasingly toxic, allowing him to secrete a deadly poison through his pores."
      },
      {
        "name": "Wild Whisperer",
        "replaces": "Woodland Stride; Trackless Step; Resist Nature’s Lure; Wild Shape",
        "summary": "A wild whisperer is an expert at studying, predicting, and explaining animal behavior."
      },
      {
        "name": "Wolf Shaman",
        "replaces": "A Thousand Faces; Venom Immunity",
        "summary": "A shaman with this totem calls upon the clever wolf, capable of roaming alone yet wise enough to run with a pack when facing dangers too great for one alone."
      },
      {
        "name": "World Walker",
        "replaces": "Trackless Step; Resist Nature’s Lure; Venom Immunity; Timeless Body",
        "summary": "While all druids traverse the wilderness with ease, the world walkers take it upon themselves to travel the entire world."
      }
    ]
  } ,
  
  { "name"       : "Fighter" ,
  
    "description": 
    [
      "Some take up arms for glory, wealth, or revenge. Others do battle to prove themselves, to protect others, or because they know nothing else. Still others learn the ways of weaponcraft to hone their bodies in battle and prove their mettle in the forge of war. Lords of the battlefield, fighters are a disparate lot, training with many weapons or just one, perfecting the uses of armor, learning the fighting techniques of exotic masters, and studying the art of combat, all to shape themselves into living weapons. Far more than mere thugs, these skilled warriors reveal the true deadliness of their weapons, turning hunks of metal into arms capable of taming kingdoms, slaughtering monsters, and rousing the hearts of armies. Soldiers, knights, hunters, and artists of war, fighters are unparalleled champions, and woe to those who dare stand against them."
    ],
    
    "role": 
    [
      "Fighters excel at combat—defeating their enemies, controlling the flow of battle, and surviving such sorties themselves. While their specific weapons and methods grant them a wide variety of tactics, few can match fighters for sheer battle prowess."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Aerial Assaulter",
        "replaces": "Class Skills; Bravery; 2nd, 12th-level Bonus Feat, Armor Mastery, Weapon Mastery",
        "summary": "Aerial assaulters leap to great heights and create higher ground where there is none."
      },
      {
        "name": "Airborne Ambusher",
        "replaces": "Weapon/Armor Proficiency; Class Skills; Bravery; Weapon Training 1-4",
        "summary": "(Strix Only) Driven by suspicion and hatred, strix doggedly guard their territories, making deadly use of their flight."
      },
      {
        "name": "Aldori Defender",
        "replaces": "Armor Training; 6th, 8th, 10th-level Bonus Feat",
        "summary": "Trained warrior in the art of the Aldori dueling sword."
      },
      {
        "name": "Aquanaut",
        "replaces": "Armor Proficiency; Bravery; Armor Training 1-4; Armor Mastery; Weapon Training 1-4",
        "summary": "Aquanaut fighters master the movement of water, using its flow to their advantage in combat."
      },
      {
        "name": "Archer",
        "replaces": "Bravery; Armor Training 1-4; Weapon Training 1-4; Armor Mastery",
        "summary": "The archer is dedicated to the careful mastery of the bow, perfecting his skills with years of practice."
      },
      {
        "name": "Armiger",
        "replaces": "Class Skills; Skill Points; 1st, 10th-level Bonus Feats; Bravery",
        "summary": "Fighters who focus their training to become Hellknights."
      },
      {
        "name": "Armor Master",
        "replaces": "Bravery; Weapon Training 1-4; Armor Mastery; Weapon Mastery",
        "summary": "While many fighters hone their weapon skills to a point of inescapable grace and lethality, there are those who live under the maxim that a good offense can be accomplished though an impenetrable defense."
      },
      {
        "name": "Brawler",
        "replaces": "Armor Training 1-4; Weapon Training 1-4; Armor Mastery, Weapon Mastery",
        "summary": "All melee is up close and personal, but some warriors bring it as close as they can get."
      },
      {
        "name": "Cad",
        "replaces": "Weapon/Armor Proficiency; Bravery; Armor Training 1-4; Weapon Training 1-4; Weapon Mastery",
        "summary": "In combat, most fighters have some sort of code of honor. Some believe that one should not kick enemies when they are down, or should limit use of other such dirty tricks to the most dire of circumstances. The cad places no such limitations on himself."
      },
      {
        "name": "Calistrian Hunter",
        "replaces": "Weapon/Armor Proficiency; Class Skills; Bravery; Weapon Training 1-4; Weapon Mastery",
        "summary": "Like a bounty hunter following his own rules, a Calistrian hunter tracks down elusive prey using his wits and delivers long-overdue retribution while easily ignoring his own injuries thanks to the joy he receives from a job well done."
      },
      {
        "name": "Cavern Sniper",
        "replaces": "Class Skills; 1st, 4th-level Fighter Bonus Feats; Bravery; Weapon Training 1-4; Weapon Mastery",
        "summary": "(Drow Only) Perfectly at home in the darkness, the cavern sniper capitalizes on stealth and ranged attacks imbued with his spell-like abilities to harass his opponents."
      },
      {
        "name": "Child of Acavna and Amaznen",
        "replaces": "Weapon/Armor Proficiency; Skills; 1st, 2nd, 8th, 12th, 16th, and 20th-level Combat Feats; Armor Training; Weapon Training",
        "summary": "The child of Acavna and Amaznen has trained in the nearly forgotten arts of Azlant passed down by Aroden, which combine martial prowess with elementary wizardry. Inspired by the deities Aroden once worshiped long ago, children of Acavna and Amaznen strive to understand the dangers of the world and overcome them with knowledge and strength of arms."
      },
      {
        "name": "Corsair",
        "replaces": "2nd-level Bonus Feat; Armor Training; 6th-level Bonus Feat",
        "summary": "A corsair is a pirate who focuses on shipboard combat, relying on his strength of arms over his agility."
      },
      {
        "name": "Crossbowman",
        "replaces": "Armor Training 1-4; Weapon Training 1-4; Armor Mastery",
        "summary": "The crossbowman has perfected the deadly use of the crossbow, a simple but cruelly efficient weapon, as a craftsman mastering a lethal tool."
      },
      {
        "name": "Cyber-Soldier",
        "replaces": "Weapon Training 1; Armor Training 2 and 4; Armor Mastery",
        "summary": "Cyber-soldiers replace fallible flesh with precisioncrafted machinery."
      },
      {
        "name": "Dirty Fighter",
        "replaces": "Bravery; Weapon Training 1-4",
        "summary": "(Orc Only) The dirty fighter laughs at concepts like honor and fair play. He cares only for victory, no matter how he achieves it, and spends as much time mastering sneaky combat maneuvers as he does drilling with weapons or learning how to wear armor."
      },
      {
        "name": "Dragonheir Scion",
        "replaces": "Class Skills; 1st, 3rd, 5th-level Bonus Feats; Bravery; Armor Training; Armor Mastery; Weapon Mastery",
        "summary": "Dragonheir scions are the martially inclined humanoid descendants of those influenced by draconic power."
      },
      {
        "name": "Dragoon",
        "replaces": "Weapon/Armor Proficiency; 1st-level Bonus Feat; Weapon Training 1-4; Armor Training 2-4; Weapon Mastery",
        "summary": "These gallant lancers serve in the vanguard of many armies or as knights-errant."
      },
      {
        "name": "Drill Sergeant",
        "replaces": "Bravery; Weapon Training 1-4",
        "summary": "Drill sergeants excel at training other combatants in fighting techniques."
      },
      {
        "name": "Druman Blackjacket",
        "replaces": "Bravery; 4th, 8th, 12th, 16th-level Bonus Feats;",
        "summary": "Known as the Blackjackets, the elite soldiers of Druma are and always have been mercenaries rather than a standing army."
      },
      {
        "name": "Eldritch Guardian",
        "replaces": "Class Skills; 1st and 2nd-level Bonus Feats; Bravery",
        "summary": "Eldritch guardians are trained to detect and give warning about magic threats to the people and places they protect."
      },
      {
        "name": "Foehammer",
        "replaces": "Armor Training 1-4; Weapon Training 2-4; Armor Mastery; Weapon Mastery",
        "summary": "(Dwarf Only) While the axe is the most famous dwarven weapon, the hammer is at the heart of dwarves’ heritage as forgemasters and warriors alike."
      },
      {
        "name": "Free Hand Fighter",
        "replaces": "Bravery; Armor Training 1-4; Weapon Training 1-4; Armor Mastery",
        "summary": "The free hand fighter specializes in the delicate art of handling a single weapon in one hand while using his free hand to balance, block, tip, and distract his opponents."
      },
      {
        "name": "Gladiator",
        "replaces": "Weapon/Armor Proficiency; Bravery",
        "summary": "The gladiator is both a cunning warrior and a consummate performer, knowing life and death are balanced not only on a sword’s edge, but also on the cheers or jeers of the crowd."
      },
      {
        "name": "Gloomblade",
        "replaces": "Class Skills; Armor Proficiencies; Weapon Training",
        "summary": "The Shadow Plane’s substance is legendary for its versatility. In shadow-shrouded lands, secretive martial practitioners long ago learned to shape supernatural weapons from ribbons of pure darkness."
      },
      {
        "name": "High Guardian",
        "replaces": "Class Skills; 1st, 2nd, 4th-level Bonus Feats; Bravery",
        "summary": "High guardians epitomize personal devotion, serving as the shield that protects his lord from the myriad dangers around every corner."
      },
      {
        "name": "Lore Warden",
        "replaces": "Armor Proficiencies; Bravery; 2nd-level Bonus Feat; Armor Training; Armor Mastery",
        "summary": "Lore wardens are fighters who benefit from learning to outsmart and outmaneuver their foes rather than just overpower them."
      },
      {
        "name": "Lore Warden (PFS Field Guide)",
        "replaces": "Medium Armor, Heavy Armor, and Shield Proficiency; Bravery 1; Armor Training 1-4; Armor Mastery",
        "summary": "Lore wardens are fighters who benefit from learning to outsmart and outmaneuver their foes rather than just overpower them."
      },
      {
        "name": "Martial Master",
        "replaces": "Weapon Training; Weapon Mastery",
        "summary": "There are those who learn the fighting arts though countless hours of repetition and training, while others seem to pick up new stances and forms as if they were born to them."
      },
      {
        "name": "Mobile Fighter",
        "replaces": "Bravery; Weapon Training 1-4; Armor Training 3-4; Weapon Mastery",
        "summary": "Where some fighters focus on strength and raw power, the mobile fighter relies on swiftness and mobility, gliding across the battlefield like a steel whirlwind and leaving destruction in his wake."
      },
      {
        "name": "Molthuni Defender",
        "replaces": "Armor Training",
        "summary": "Taking advantage of their weighty armor, Molthuni defenders can hold back an onslaught of enemies intent on breaking through their line."
      },
      {
        "name": "Mutation Warrior",
        "replaces": "Armor Training 1-4; Armor Mastery",
        "summary": "While most fighters rely on physical fitness and rigorous training to achieve martial superiority, a few prefer to create and imbibe dangerous concoctions that mutate them into fearsome creatures."
      },
      {
        "name": "Opportunist",
        "replaces": "Class Skils; Bravery; 1st, 4th, 8th, 12th, 16th, 20th-level Bonus Feat; Weapon Training 1",
        "summary": "Opportunists believe every battle is one of wits rather than arms."
      },
      {
        "name": "Pack Mule",
        "replaces": "Skill Ranks; 1st-level Bonus Feat; Bravery; Armor Training 1-4; Armor Mastery",
        "summary": "Pack mules carry heavy loads with ease and small packages with discretion."
      },
      {
        "name": "Phalanx Soldier",
        "replaces": "Bravery; Armor Training 1-4; Weapon Training 1-4; Weapon Mastery",
        "summary": "The phalanx soldier specializes in defensive tactics, using his shield to guard himself and his allies and forming a shield wall like an unbreakable anvil against which his enemies break."
      },
      {
        "name": "Polearm Master",
        "replaces": "Bravery; Armor Training 1-4; Weapon Training 1-4; Armor Mastery",
        "summary": "The polearm master is schooled in the ancient wisdom that enemies are best faced at the end of long striking pole."
      },
      {
        "name": "Qadira: Dawnflower Dervish",
        "replaces": "Armor Training 1-4",
        "summary": "Spinning warrior dervish of Sarenrae, wielding a scimitar with devastating consequences."
      },
      {
        "name": "Relic Master",
        "replaces": "Class Skills; Armor Training; Weapon Training; Armor Mastery",
        "summary": "Commonly trained in the well-funded temples of Osirion or Qadira, the relic master is skilled in magic item mastery."
      },
      {
        "name": "Roughrider",
        "replaces": "Bravery; Armor Training 1-4; Weapon Training 1-4; Armor Mastery",
        "summary": "Roughriders study and practice the fine points of mounted combat, drilling endlessly with warbeasts—from noble thoroughbreds to trained monsters—to form a perfect synergy between rider and steed."
      },
      {
        "name": "Savage Warrior",
        "replaces": "Bravery; Weapon Training 1-4; Weapon Mastery",
        "summary": "Warriors' might is not measured only by their skill with steel, but also by their ability to inflict death with fang and claw, horn and hoof, and every exotic appendage the natural and unnatural world has to offer."
      },
      {
        "name": "Seasoned Commander",
        "replaces": "Armor Proficiencies; Skill Ranks per Level; Class Skills; 1st-level Bonus Feat; Armor Training 1, 3, 4; Weapon Training",
        "summary": "The seasoned commander excels at leading troops through inspiration and the use of unit tactics."
      },
      {
        "name": "Sensate",
        "replaces": "Class Skills; Weapon/Armor Proficiencies; Bravery; Armor Training 1-4; Weapon Training 2-4; Armor Mastery; Weapon Mastery",
        "summary": "A sensate perceives battle through senses beyond mortal ken, anticipating his opponents’ movements before they even begin to act."
      },
      {
        "name": "Shielded Fighter",
        "replaces": "Armor Training 1-4; Weapon Training 1-4; Armor Mastery; Weapon Mastery",
        "summary": "A shielded fighter focuses on both offense and defense, blending weapon and shield in perfect balance to impede his enemies while delivering deadly blows, and even turning the shield itself into a formidable weapon."
      },
      {
        "name": "Siegebreaker",
        "replaces": "1st, 2nd, 4th, and 8th-level Bonus Feats; Bravery; Weapon Mastery",
        "summary": "The siegebreaker is trained to break through lines of enemy soldiers."
      },
      {
        "name": "Skirmisher",
        "replaces": "Armor Proficiencies; Class Skills; Skill Ranks; 2nd-level Bonus Feat; Bravery; Armor Training; Armor Mastery",
        "summary": "Not all battles are fought between armies; sometimes, a settlement or nation faces a threat too dire to fight in the open. In order to repel a much larger enemy force, some soldiers must abandon equipment and tactics designed for open-field warfare and instead rely on ambushes, hit-andrun tactics, and sabotage to whittle down their enemies’ strength and morale."
      },
      {
        "name": "Steelbound Fighter",
        "replaces": "1st level Bonus Feat; Weapon Training 1-4",
        "summary": "A fighter who has impressive martial resolve and technique with a specific weapon as the result of a powerful relationship a similar weapon had with one of his ancestors."
      },
      {
        "name": "Swarm Fighter",
        "replaces": "Weapon/Armor Proficiency; 1st, 2nd, 6th, 10th, 14th, 18th-level Bonus Feats; Bravery; Weapon Training 1-4; Weapon Mastery",
        "summary": "(Kobold Only) Scuttling between the legs of friend and\n foe alike, the swarm fighter is an unshakable combatant."
      },
      {
        "name": "Tactician",
        "replaces": "Weapon/Armor Proficiency; 1st-level Bonus Feat; Bravery; Weapon Training 1; Armor Training 3, 4",
        "summary": "While many fighters focus on the fundamentals of melee and ranged combat, there are those who are trained to view the bigger picture on the battlefield."
      },
      {
        "name": "Taldor: Rondelero Duelist",
        "replaces": "Armor Training 1-3, Bravery, Weapon Training 1",
        "summary": "One who has perfected the art of rondelero, fighting with falcata and buckler."
      },
      {
        "name": "Thunderstriker",
        "replaces": "Armor Training 1-4; Weapon Training 3-4; Armor Mastery",
        "summary": "The thunderstriker adopts an unusual fighting style, gripping a heavy weapon with both hands and switching to a defensive posture with weapon and buckler, lashing out with the shield with surprising speed and power."
      },
      {
        "name": "Titan Fighter",
        "replaces": "1st-level Bonus Feat; Armor Training; Weapon Training",
        "summary": "Titan fighters make use of enormous weapons others can barely lift."
      },
      {
        "name": "Tower Shield Specialist",
        "replaces": "Bravery; Weapon Training 1-4; Weapon Mastery",
        "summary": "Many fighters believe the tower shield is a tool suitable only for troops on the battlefield, claiming it is too large and bulky to use in skirmishes or within dungeon corridors."
      },
      {
        "name": "Trench Fighter",
        "replaces": "Armor Training 1-4",
        "summary": "Advances in technology have made archaic armors\n obsolete by the twentieth century, and modern soldiers\n concentrate training on firearms and swift feet."
      },
      {
        "name": "Tribal Fighter",
        "replaces": "1st-level Bonus Feat; Weapon Training",
        "summary": "A tribal fighter knows that it is not the weapon that matters but the hand that wields it. Instead of encasing himself in metal armor like the soldiers fighting and dying for the socalled civilized lands do, he prefers to wear something he or his ancestors have killed."
      },
      {
        "name": "Two-Handed Fighter",
        "replaces": "Bravery; Armor Training 1-4; Armor Mastery",
        "summary": "Some fighters focus their efforts on finding the biggest, heaviest, most imposing weapon they can find and training to manage and harness the weight of their massive weapons for maximum impact."
      },
      {
        "name": "Two-Weapon Warrior",
        "replaces": "Armor Training 1-4; Weapon Training 1-4; Armor Mastery",
        "summary": "Trained under great masters who preached the simple truth that two are better than one when it comes to weapons, the two-weapon warrior is a terror when his hands are full."
      },
      {
        "name": "Unarmed Fighter",
        "replaces": "Weapon/Armor Proficiency; 1st-level Bonus Feat; Bravery; Armor Training 1-4; Weapon Training 1-4; 8th, 12th-level Bonus Feat; Armor Mastery; Weapon Mastery",
        "summary": "The unarmed fighter picks up a weapon only rarely, and when he does, he prefers the weapons of the monk."
      },
      {
        "name": "Unbreakable",
        "replaces": "Weapon/Armor Proficiency; 1st-level Bonus Feat; Bravery; Weapon Training 1-4; Armor Training 3-4; Weapon Mastery",
        "summary": "The unbreakable is a warrior of indomitable will, unstoppable and implacable once he has set his mind upon a course of action."
      },
      {
        "name": "Ustalavic Duelist",
        "replaces": "Weapon/Armor Proficiency; 1st-level Bonus Feat; Weapon Training 1-4",
        "summary": "The University of Lepidstadt has developed a reputation for churning out fearsome duelists. At the end of each academic year, the students all gather together and duel one another with light blades. Each student duels one opponent after another until he is marked on the cheek by an adversary’s blade. These “Lepidstadt scars” are recognized throughout the Inner Sea region and beyond as marks of their prowess. The Lepidstadt Style is one of fluid motion and precise thrusts."
      },
      {
        "name": "Varisian Free-Style Fighter",
        "replaces": "Class Skills; 1st, 6th, 10th, and 12th-level Bonus Feats; Weapon Training; Weapon Mastery; Armor Training",
        "summary": "Free-style fighters are most common in Varisia, where their training—students’ traveling study with multiple teachers, or perhaps instruction in the anything-goes mentality of the Price of Freedom school in Kaer Maga—allows them to blend fighting styles into a greater whole."
      },
      {
        "name": "Venomblade",
        "replaces": "1st, 6th, 12th-level Bonus Feat; Bravery",
        "summary": "(Nagaji) The venomblade has learned to take full advantage of his toxic spittle, blinding his targets and then rushing in to cut them down where they stand."
      },
      {
        "name": "Viking",
        "replaces": "Weapon/Armor Proficiencies; Bravery; Armor Training; Weapon Training; Bonus Feats",
        "summary": "Vikings seek to raid “softer societies” and return with their longships filled with plunder. A viking strikes fear into the heart of her foes, and in battle she can fly into a terrible rage."
      },
      {
        "name": "Warlord",
        "replaces": "Class Skills; Weapon and Armor Proficiency; Armor Training; Armor Mastery",
        "summary": "Honorable, fearless experts in gun and blade, warlords eschew armor as impractical to their harsh and often desert-like environment"
      },
      {
        "name": "Weapon Bearer Squire",
        "replaces": "1st-level Bonus Feat; 2nd-level Bonus Feat; Armor Training 1",
        "summary": "The weapon bearer squire ensures her knight is equipped for any task."
      },
      {
        "name": "Weapon Master",
        "replaces": "Bravery; Armor Training 1-4; Weapon Training 1-4; Armor Mastery",
        "summary": "Devoted to the perfection of a single weapon, the weapon master's meditations upon his favored weapon border on the obsessive, but none can deny his consummate skill."
      }
    ]
  } ,
  
  { "name"       : "Gunslinger" ,
  
    "description": 
    [
      "For a renegade few, battle sounds different than it does for the typical fighter. The clash of steel and the sizzle of spell energy are drowned out by the thunderous rhythm of gunfire—the pounding beat of the gunslinger.",
      "Gunslingers are a bold and mysterious lot. While many treat the secrets of black powder with the same care and reverence that a wizard typically reserves for his spellbook, most gunslingers know that firearms are a secret that cannot remain concealed forever. While current firearms are simple, often imprecise, and even dangerous devices, they are a technology on the move, and one that will become even more powerful when it is fully fused with magic."
    ],
    
    "role": 
    [
      "Gunslingers are thunderous artillery, often found where the fighting is fiercest. Brave, clever, and frequently foolhardy, many gunslingers push to position themselves at close range, barrels blazing, to take down their foes and demoralize their enemies. Other gunslingers are masters of distant death, picking off enemies from afar with their strange and wondrous weapons."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Blatherskite",
        "replaces": "Class Skills; Gunslinger's Dodge; Gunslinger Initiative; Pistol-Whip; Startling Shot",
        "summary": "The blatherskate has an extraordinary talent for retreating from harm’s way and fooling his enemies into thinking he is weaker than he is."
      },
      {
        "name": "Bolt Ace",
        "replaces": "Weapon Proficiencies; Gunsmith; Grit; Deadeye; Quick Clear; Utility Shot; Startling Shot; Expert Loading; Lightning Reload; Menacing Shot; Gun Training",
        "summary": "While gunslingers are full of sound and fury, there is a class of gunslingers that never soil their hands with powder or feel the sting of gun smoke."
      },
      {
        "name": "Buccaneer",
        "replaces": "Quick Clear Deed; Pistol Whip Deed; Dead Shot Deed; Lightning Reload Deed; Grit; Nimble; Gun Training 1,2, and 4",
        "summary": "(Human Only) Freebooters who cling to the convoluted codes that rule independent ships, the buccaneer is a gunslinger of the high seas."
      },
      {
        "name": "Bushwhacker",
        "replaces": "Grit; Utility Shot Deed; Targeting Deed; 4th, 8th, 12th, 16th, 20th-level Bonus Feats",
        "summary": "(Kobold Only) The bushwhacker specializes in the art of the ambush. For her, gunplay works best when it comes from a concealed position and is directed against a target that falls with the very first volley and is dead before the smoke clears."
      },
      {
        "name": "Commando",
        "replaces": "Class Skills; Utility Shot; Expert Loading; Lightning Reload; Slinger's Luck; 4th-level Bonus Feat; Gun Training",
        "summary": "Commandos are those rough and ready gunslingers who excel at hit-and-run tactics and leveraging their expertise in the wild against their enemies."
      },
      {
        "name": "Experimental Gunsmith",
        "replaces": "Gunsmith; Gunsmithing; Gun Training",
        "summary": "(Gnome Only) The experimental gunsmith is obsessed with creating the ultimate firearm, and is willing to take risks to work the kinks out of her design."
      },
      {
        "name": "Firebrand",
        "replaces": "Gunsmith; Grit; Deadeye; Dead Shot; Bonus Feats; Gun Training",
        "summary": "Where other gunslingers rely on precision shooting, the firebrand instead masters explosive ordnance."
      },
      {
        "name": "Gulch Gunner",
        "replaces": "Class Skills; Grit; Deadeye Deed; Pistol Whip Deed; Menacing Shot Deed; 9th, 13th, 17th-level Gun Training",
        "summary": "(Ratfolk Only) These gulch gunners often specialize in proficiency with a single pistol (easily handled in tight spaces) and wander from warren to warren selling their tunnel-shooting skills to the highest bidder."
      },
      {
        "name": "Gun Scavenger",
        "replaces": "Gunsmith; Quick Clear Deed; Targeting Deed; Nimble",
        "summary": "A gun scavenger collects scraps, spare parts, and other components that might—if modified properly—give her firearm an extra edge."
      },
      {
        "name": "Gun Tank",
        "replaces": "Armor Proficiency; Gunslinger’s Dodge Deed; Evasive Deed; Nimble; Bonus Feats (4th level and every 4 levels after)",
        "summary": "Gunslingers usually don’t use heavy armor, but there are a few who use and modify their armor to protect themselves from both traditional weapons and gunfire."
      },
      {
        "name": "Gunner Squire",
        "replaces": "Gunslinger's Dodge; Gunslinger Initiative; Nimble +1",
        "summary": "The gunner squire is prepared to reload or repair her lord's firearms at a moment's notice."
      },
      {
        "name": "Maverick",
        "replaces": "Dodge; Pistol Whip; Gunslinger Initiative",
        "summary": "Quick with her gun and no stranger to barroom brawls, a maverick can hold her own when bullets and punches start flying."
      },
      {
        "name": "Musket Master",
        "replaces": "Weapon Proficiency; Gunsmith; Gunslinger’s Dodge Deed; Utility Shot Deed; Gun Training 1-4",
        "summary": "Some gunslingers want a little more firepower and range. These are the musket masters; the best of these gunslingers can reload a musket with dazzling speed, potentially putting even their pistol-wielding brethren to shame."
      },
      {
        "name": "Mysterious Stranger",
        "replaces": "Grit; Quick Clear Deed; Nimble; Gun Training 1-4",
        "summary": "A few rare gunslingers seem to accomplish their chosen tasks purely through willpower and an unwillingness to ever give up."
      },
      {
        "name": "Pistolero",
        "replaces": "Weapon Proficiency; Gunsmith; Deadeye Deed; Startling Shot Deed; Menacing Shot Deed; Gun Training 1-4",
        "summary": "While most gunslingers have favorite firearms, there are those rare ones who choose to specialize in one-handed firearms exclusively."
      },
      {
        "name": "Scatter Gunner",
        "replaces": "Gunsmith; Deadyeye; Utility Shot; Dead Shot; Targeting",
        "summary": "Punishing firearms such as the blunderbuss and dragon pistol can lay waste to invaders in tight corridors, and the dwarves of Dongun Hold have pioneered masterful methods for making the most of these indiscriminate weapons"
      },
      {
        "name": "Siege Gunner",
        "replaces": "Grit; Nimble; Deadeye; Gunslinger Initiative; Bonus Feats",
        "summary": "The Grand Duchy of Alkenstar has spawned all manner of firearm specialists, wielding small and large firearms alike. Siege gunners specialize in the very largest— cannons, bombards, and firedrakes."
      },
      {
        "name": "Techslinger",
        "replaces": "Deadeye; Quick Clear; Expert Loading; Gun Training",
        "summary": "Techslingers spurn unreliable gunpowder weapons in favor of high-tech armaments."
      },
      {
        "name": "Thronewarden",
        "replaces": "Class Skills; Nimble; 4th-level Bonus Feat; Startling Shot; Bleeding Wound",
        "summary": "As vigilant sentinels, thronewardens identify and head off trouble."
      },
      {
        "name": "Wyrm Sniper",
        "replaces": "Class Skills; Starling Shot Deed; Lightning Reload Deed; Menacing Shot Deed",
        "summary": "These long-shot artists are masters at taking down\n dragons with sharp shooting and light siege weaponry."
      }
    ]
  } ,
  
  { "name"       : "Hunter" ,
  
    "description": 
    [
      "Hunters are warriors of the wilds that have forged close bonds with trusted animal companions. They focus their tactics on fighting alongside their companion animals as a formidable team of two. Able to cast a wide variety of nature spells and take on the abilities and attributes of beasts, hunters magically improve both themselves and their animal companions."
    ],
    
    "role": 
    [
      "Hunters can adapt their tactics to many kinds of opponents, and cherish their highly trained animal companions. As a team, the hunter and her companion can react to danger with incredible speed, making them excellent scouts, explorers, and saboteurs."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Aquatic Beastmaster",
        "replaces": "Animal Focus; Wild Empathy; Improved Empathic Link",
        "summary": "Hunters beneath the sea are just as committed as their surface-dwelling counterparts to working alongside their animal companions to eradicate threats."
      },
      {
        "name": "Chameleon Adept",
        "replaces": "Class Skills; Teamwork Feats; Hunter’s Tactics; Wild Empathy; Precise Companion; Woodland Stride; Raise Animal Companion; One with the Wild",
        "summary": "Some hunters are masters of blending into every situation, even making their companions appear humanoid for brief periods of time."
      },
      {
        "name": "Colluding Scoundrel",
        "replaces": "Animal Focus; Second Animal Focus; Master Hunter",
        "summary": "The colluding scoundrel is a canny and conniving skirmisher, manipulating her enemies and leveraging her allies for her own benefit."
      },
      {
        "name": "Courtly Hunter",
        "replaces": "Class Skills; Animal Companion; Animal Focus; Precise Companion; Hunter Tactics; Teamwork Feats; Bonus Tricks",
        "summary": "While most hunters find themselves at ease in the wildest parts of the world, courtly hunters instead make their homes in cultured urban environments."
      },
      {
        "name": "Divine Hunter",
        "replaces": "Alignment; Class Skills; Teamwork Feats; Hunter Tactics",
        "summary": "While most hunters heed the call of nature and fight to protect its bounty, some are inspired to serve a higher power."
      },
      {
        "name": "Feral Hunter",
        "replaces": "Animal Companion; Animal Focus; Hunter Tactics; Speak with Master; Precise Companion; Bonus Tricks; Improved Empathic Link; Greater Empathic Link; Master of the Wild; Raise Animal Companion; 6th, 9th, 12th, 15th, and 18th-level Teamwork Feats",
        "summary": "A feral hunter has forged a bond with nature that’s so strong that she doesn’t merely channel the aspects of animals— she actually becomes an animal herself."
      },
      {
        "name": "Feykiller",
        "replaces": "Animal Focus; Wild Empathy; Speak with Master; Improed Empathic Link; One with the Wild",
        "summary": "Some hunters in fey-plagued regions are dedicated to tracking down and eradicating these threats."
      },
      {
        "name": "Flood Flourisher",
        "replaces": "Hunter Tactics; Woodland Stride; Teamwork Feats; Swift Tracker",
        "summary": "Well adapted to their drenched surroundings, flood flourishers coordinate deadly ambushes with their loyal animal companions by capitalizing on their mastery of the soggy terrain."
      },
      {
        "name": "Forester",
        "replaces": "Animal Focus; Animal Companion; Precise Companion; Hunter Tactics; Improved Empathic Link; Bonus Tricks; Raise Animal Companion; Speak with Master; Greater Empathic Link",
        "summary": "While all hunters have a bond with the natural world, a forester has a stronger tie to her environment than to the animals within it."
      },
      {
        "name": "Packmaster",
        "replaces": "Animal Companion; Animal Focus; Teamwork Feats; Second Animal Focus; Master Hunter",
        "summary": "Some hunters form bonds with packs of well-trained creatures. Whether such a hunter is a northern berserker running with a pack of timber wolves or a savage warrior dashing through the jungle alongside her herd of dimetrodons, the packmaster revels in the thrill of the hunt and the glory of the kill."
      },
      {
        "name": "Patient Ambusher",
        "replaces": "Class Skills; Nature Training; Wild Empathy; Hunter Tactics; Teamwork Feats; Raise Animal Companion",
        "summary": "Wandering the wilds, some hunters eschew the bond of innate teamwork with their animal companions. Instead, these hunters master the creation and deployment of intricate ranger traps, often using themselves or their animal companions to lure foes into their snares."
      },
      {
        "name": "Pelagic Hunter",
        "replaces": "Animal Companion; Animal Focus; Woodland Stride",
        "summary": "Pelagic hunters form strong bonds that extend deep beneath the sea."
      },
      {
        "name": "Plant Master",
        "replaces": "Animal Companion; Animal Focus; Wild Empathy; One with the Wild; Master Hunter",
        "summary": "Some hunters form a bond with plant life instead of an animal and take on those aspects instead."
      },
      {
        "name": "Primal Companion Hunter",
        "replaces": "Animal Focus; Second Animal Focus; Master Hunter",
        "summary": "Most hunters are skilled at awakening the primal beasts inside themselves. However, some can instead activate the primal essence within their animal companion."
      },
      {
        "name": "Roof Runner",
        "replaces": "Class Skills; Armor Proficieny; Track; Woodland Stride; Swift Tracker; Master Hunter",
        "summary": "Roof runners are skilled ambushers, skirmishers, and spies who eschew heavier types of armor in order to remain light on their feet."
      },
      {
        "name": "Scarab Stalker",
        "replaces": "Animal Focus; Woodland Stride",
        "summary": "The forgotten ruins in the desert sands have given rise to a breed of hunters who call upon the powers of the pyramids to protect and explore the ancient sites of their people."
      },
      {
        "name": "Totem-Bonded",
        "replaces": "Animal Companion; Animal Focus",
        "summary": "Totem-bonded are hunters who are able to form a true spiritual bond with the powerful fauna that dominate the wildlands."
      },
      {
        "name": "Treestrider",
        "replaces": "Animal Companion; Animal Focus; Second Animal Focus; Precise Companion; Raise Animal Companion",
        "summary": "Some hunters are masters of the wild. Whether raised by apes or having some other link with simian creatures, these hunters glide through the wilderness with ease."
      },
      {
        "name": "Uprooter Scout",
        "replaces": "Improved Empathic Link; Speak with Master; Greater Empathic Link; Raise Animal Companion; One with the Wild",
        "summary": "The Uprooters are an elite band of Kyonin elves skilled and brave enough to foray into the Tanglebriar and take the offensive in the fight against Treerazer."
      },
      {
        "name": "Urban Hunter",
        "replaces": "Class Skills; Animal Companion; Hunter Tactics; Teamwork Feat; Woodland Stride; One with the Wild",
        "summary": "Urban hunters help guards track down and apprehend criminals or spies, find lost children and disaster victims, and protect animals from abuse in the city."
      },
      {
        "name": "Verminous Hunter",
        "replaces": "Animal Companion; Wild Empathy; Animal Focus; Woodland Stride",
        "summary": "A verminous hunter calls on the ceaseless, single-minded dedication of vermin to hunt and overwhelm her prey."
      }
    ]
  } ,
  
  { "name"       : "Inquisitor" ,
  
    "description": 
    [
      "Grim and determined, the inquisitor roots out enemies of the faith, using trickery and guile when righteousness and purity is not enough. Although inquisitors are dedicated to a deity, they are above many of the normal rules and conventions of the church. They answer to their deity and their own sense of justice alone, and are willing to take extreme measures to meet their goals."
    ],
    
    "role": 
    [
      "Inquisitors tend to move from place to place, chasing down enemies and researching emerging threats. As a result, they often travel with others, if for no other reason than to mask their presence. Inquisitors work with members of their faith whenever possible, but even such allies are not above suspicion."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Abolisher",
        "replaces": "Domains; Stern Gaze; Detect Alignment; Discern Lies",
        "summary": "Abolishers are incorruptible inquisitors who weed out creatures of alien, unnatural origins, finding and exposing aberrations for what they are."
      },
      {
        "name": "Cloaked Wolf",
        "replaces": "Class Skills; Stern Gaze; Cunning Initiative; Monster Lore; Solo Tactics; Teamwork Feats",
        "summary": "Some inquisitors are adept at appearing harmless until they throw off their unassuming facades and take their enemies by surprise."
      },
      {
        "name": "Cold Iron Warden",
        "replaces": "3rd, 6th, 9th, 12th, 15th, 18th-level Teamwork Feats; Bane; Discern Lies",
        "summary": "The natural enemies of demoniacs and other cultists of fiendish forces, cold iron wardens are inquisitors who dedicate their lives to eradicating the taint of demonkind from Golarion."
      },
      {
        "name": "Exarch",
        "replaces": "Monster Lore; Detect Alignment; Bane; Second Judgment; Greater Bane; Third Judgment",
        "summary": "(Dwarf Only) The gruff traditionalism of most dwarves finds its apex in those who adhere to a strict orthodoxy rooted in ancient principles and practices and who are not amenable whatsoever to change or innovation."
      },
      {
        "name": "Exorcist",
        "replaces": "Second Judgment; Third Judgment; Slayer; True Judgment",
        "summary": "Some inquisitors, as they learn more about the threat of possession and the machinations of the planes, task themselves to expel possessing spirits and conniving outsiders from the world whenever possible."
      },
      {
        "name": "Explusionist",
        "replaces": "Domain; Monster Lore; Discern Lies",
        "summary": "Expulsionists are inquisitors who seek to rid the material world of the corrupting inf luences of wicked spirits that twist mortals to their own ends."
      },
      {
        "name": "Faith Hunter",
        "replaces": "Domain; Justice, Destruction Judgement; Detect Alignment",
        "summary": "Certain relentless inquisitors burn with special hatred for an enemy of specific convictions, and they stop at nothing when obsessively hunting these foes down."
      },
      {
        "name": "Green Faith Marshal",
        "replaces": "Domain; Stern Gaze; Monster Lore; Discern Lies; Stalwart",
        "summary": "The Green Faith marshal serves as a literal force of nature, hunting down and punishing those who have committed sins against nature through enslavement and mistreatment of animals or destruction of wild places."
      },
      {
        "name": "Heretic",
        "replaces": "Monster Lore",
        "summary": "While all inquisitors hunt the enemies of the faith, sometimes, either through political maneuvering by her enemies or an unyielding tenacity that breaks her faith’s basic tenets, an inquisitor can find herself a heretic."
      },
      {
        "name": "Hexenhammer",
        "replaces": "Monster Lore; Stern Gaze; Domain; Cunning Initiative; Teamwork Feats; Solo Tactics; Spellcasting",
        "summary": "Hexenhammers learn to use the hexes and some spells of witches, but must pay the price for dealing with supernatural powers, as they slip ever closer to the evil they seek to destroy."
      },
      {
        "name": "Iconoclast",
        "replaces": "Monster Lore; Detect Alignment; Discern Lies; Exploit Weakness; True Judgment",
        "summary": "Some magic items are heretical by nature, enabling the unfaithful to spread wickedness. Iconoclasts seek out and remove such crutches, cleansing the taint these items exude."
      },
      {
        "name": "Immolator",
        "replaces": "Smiting Judgment; Bane; Greater Bane; True Judgment",
        "summary": "(Ifrit Only) The immolator puts her pyromaniacal urges to work in the service of a deity. She brings burning retribution down upon the enemies of her faith, consigning their souls to the sacrificial flames."
      },
      {
        "name": "Infiltrator",
        "replaces": "Stern Gaze; Monster Lore; Track; Discern Lies",
        "summary": "This inquisitor uses guile and deception to blend in among the enemies of the faith rather than confronting them head-on."
      },
      {
        "name": "Keeper of Construct",
        "replaces": "Domain; Stern Gaze; Monster Lore; Exploid Weakness",
        "summary": "Some of Brigh’s inquisitors, and occasionally those who follow Torag, track down malicious construct crafters and fight renegade constructs with unrivaled expertise."
      },
      {
        "name": "Keeper of the Current",
        "replaces": "Track; Spellcasting; Discern Lies",
        "summary": "Water-related deities all have organized churches beneath the waves that engage zealous followers to hunt down apostates and enemies. Regardless of their faith, these undersea zealots are known as keepers of the current."
      },
      {
        "name": "Kinslayer",
        "replaces": "Destruction Judgment; Teamwork Feats; Detect Alignment",
        "summary": "(Dhampir Only) Appalled and guilt-ridden by the horrific circumstances of her birth, a kinslayer dedicates herself to eradicating the very creatures whose blood flows within her veins."
      },
      {
        "name": "Living Grimoire",
        "replaces": "Monster Lore; Spellcasting; Cunning Initiative; Orisons; Judgement; Bane; Greater Bane; Second Judgement; Third Judgement; True Judgement",
        "summary": "The living grimoire literally wields the sacred word of his deity, using his holy tome to smite the foes of his god with divine might."
      },
      {
        "name": "Monster Tactician",
        "replaces": "Judgment; Discern Lies; Second Judgment; Third Judgment; Slayer; True Judgment",
        "summary": "While most inquisitors have learned to take advantage of the movements of their opponents and allies in combat, some instead summon creatures as a means of claiming strategic advantage, exploiting the mystic connection between themselves and their summoned creatures to impart a bit of their own tactical knowledge."
      },
      {
        "name": "Oathkeeper",
        "replaces": "Alignment; Class Skills; Monster Lore; Track",
        "summary": "Oathkeepers formally oversee the creation of bargains and personally hunt down those who dare to violate them."
      },
      {
        "name": "Preacher",
        "replaces": "Solo Tactics",
        "summary": "Some inquisitors wander the land to spread the true word of their faith."
      },
      {
        "name": "Ravener Hunter",
        "replaces": "Alignment; Domain; Spells; 3rd-level Teamwork Feat",
        "summary": "For generations, the catfolk of Murraseth have viewed the cults of Angazhan with loathing and hatred, and they believe it is their sacred duty to hunt down the followers of the Ravener King and expel them from the Material Plane"
      },
      {
        "name": "Reaper of Secrets",
        "replaces": "Monster Lore; Stern Gaze; Solo Tactics",
        "summary": "Masters of mind tricks and deception, these divine assassins track down and kill anyone who has forbidden knowledge about their faiths."
      },
      {
        "name": "Relic Hunter",
        "replaces": "Spellcasting; Judgment; Domain; Bane; Greater Bane; Second Judgment; Third Judgment",
        "summary": "Some inquisitors specialize in the use and recovery of long-lost relics of their faiths, drawing forth divine might from the recovered items in order to restore their sanctity and wield these artifacts against the enemies of their gods."
      },
      {
        "name": "Royal Accuser",
        "replaces": "Class Skills; Stern Gaze; Detect Alignment; Solo Tactics; Teamwork Bonus Feats",
        "summary": "Royal accusers serve the prince of Ustalav, cutting through the nation’s baroque politics and quietly facing its many threats."
      },
      {
        "name": "Sacred Huntsmaster",
        "replaces": "Judgment; Solo Tactics; Second Judgment; Third Judgment; Slayer; True Judgment",
        "summary": "Some inquisitors create a strong bond with an animal companion, and they hunt and punish threats to the faith as an awe-inspiring duo."
      },
      {
        "name": "Sanctified Slayer",
        "replaces": "Judgment; Second Judgment; Third Judgment; Slayer; True Judgment",
        "summary": "While all inquisitors root out enemies of the faith, in many orders and churches there’s a select group of these religious hunters devoted to one goal, and one goal alone—to terminate the enemies of the faith wherever they can be found."
      },
      {
        "name": "Secret Seeker",
        "replaces": "Monster Lore; Bane; Greater Bane; Exploit Weakness",
        "summary": "Recognizing that torture is a poor method of securing truthful intelligence, secret seekers instead prefer magical means of inquiry."
      },
      {
        "name": "Sin Eater",
        "replaces": "Domain; 6th-level Teamwork Feat; Exploit Weakness",
        "summary": "There is a sect of inquisitors in some religions that believes it is not enough to hunt the enemies of the church—one must also devour those enemies’ sins."
      },
      {
        "name": "Spellbreaker",
        "replaces": "Monster Lore; Bonus Teamwork Feats; Solo Tactics; Final Judgment",
        "summary": "The world is full of dangerous magic, and many recoil in the face of such power. The spellbreaker, by contrast, learns to recognize and resist certain types of magic, wading through waves of magic to reach her foes."
      },
      {
        "name": "Suit Seeker",
        "replaces": "Class Skills; Domain; Judgment; Second Judgment; Third Judgment; Detect Alignment; True Judgment",
        "summary": "Though surrounded by meaning and tradition revered by most harrowers, the harrow is a tool that could be abused. Those inquisitors known as suit seekers take grave offense at the misuse of this ancient power, and dedicate their considerable skills to hunting and eliminating any who would abuse the harrow’s magic and the heritage it represents."
      },
      {
        "name": "Tactical Leader",
        "replaces": "Stern Gaze; Solo Tactics; Teamwork Feats; Exploit Weakness",
        "summary": "Rather than pursuing their holy missions alone, some inquisitors see the inherent value of working with like-minded allies to accomplish mutual goals."
      },
      {
        "name": "Traceless Operative",
        "replaces": "Monster Lore; Stern Gaze; Track; Bane; Greater Bane",
        "summary": "Traceless operatives practice subterfuge and careful preparation in order to accomplish their divine mandates."
      },
      {
        "name": "Umbral Stalker",
        "replaces": "Class Skills; Domain; Justice Judgement",
        "summary": "As a consummate lurker in the shadows, an umbral stalker observes the enemies of her faith and strikes before the unfortunate victims even know she is skulking nearby."
      },
      {
        "name": "Urban Infiltrator",
        "replaces": "Class Skills; Monster Lore; Stalwart",
        "summary": "Masters of secretly gathering information to further their faith’s ends, urban infiltrators excel at operating within an unfriendly society or infiltrating an enemy cult."
      },
      {
        "name": "Vampire Hunter",
        "replaces": "Altered Judgments (Purity, Smiting); Detect Alignment; Altered Bane",
        "summary": "The vampire hunter believes that the worst of undead are the ones with unnatural appetities for flesh and blood."
      },
      {
        "name": "Vigilant Defender",
        "replaces": "Judgement; Stern Gaze; Exploit Weakness; True Judgement",
        "summary": "Some inquisitors focus more on protecting those who share their faiths and their ideals than on actively hunting their enemies."
      },
      {
        "name": "Witch Hunter",
        "replaces": "Monster Lore; Detect Alignment; Discern Lies; True Judgment; Track; Exploit Weakness",
        "summary": "When pursuing justice for their faith, inquisitors sometimes hunt sorcerers, witches, wizards, and other practitioners of arcane magic—but especially witches, since their devotion to a patron is often seen as suspect by many religions."
      }
    ]
  } ,
  
  { "name"       : "Investigator" ,
  
    "description": 
    [
      "Whether on the trail of a fugitive, a long-lost treasure trove, or a criminal mastermind, investigators are motivated by an intense curiosity about the world and use knowledge of it as a weapon. Mixing gumption and learnedness into a personal alchemy of daring, investigators are full of surprises. Observing the world around them, they gain valuable knowledge about the situation they’re in, process that information using inspiration and deduction, and cut to the quick of the matter in unexpected ways. Investigators are always evaluating situations they encounter, sizing up potential foes, and looking out for secret dangers, all while using their vast knowledge and powers of perception to find solutions to the most perplexing problems."
    ],
    
    "role": 
    [
      "Investigators live to solve mysteries and find inventive ways to get out of jams. They serve as advisors and support for their adventuring parties, but can take center stage when knowledge and cunning are needed. No slouches in battle, they know how to make surprise attacks and use inspiration to bring those attacks home."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Antiquarian",
        "replaces": "Alchemy; Poison Lore; Poison Resistance; Poison Immunity; Swift Alchemy",
        "summary": "Antiquarians are collectors, explorers, and scholars who delve into ruined places in search of lost lore and artifacts."
      },
      {
        "name": "Bonded Investigator",
        "replaces": "Poison Lore; Poison Resistance; Poison Immunity; 4th-level Studied Strike, 7th-level Investigator Talent",
        "summary": "Bonded investigators use intelligent familiars to assist them in their investigations."
      },
      {
        "name": "Cartographer",
        "replaces": "Poison Lore; Poison Resistance; Keen Recollection; Swift Alchemy",
        "summary": "Cartographers are eager trailblazers who explore uncharted terrain, study landmarks, and find new paths through the wilderness."
      },
      {
        "name": "Cipher",
        "replaces": "Class Skills; Inspiration; Trapfinding; Poison Lore; Poison Resistance; Poison Immunity; Trap SenseSwift Alchemy; 3rd, 5th, 7th, 9th, 11th-level Investigator Talent; Studied Strike",
        "summary": "A cipher trains himself to remain undetected and ignored in order to conduct his investigations without opposition or bothersome questions"
      },
      {
        "name": "Conspirator",
        "replaces": "Trapfinding; Inspiration; Trap Sense; 7th-level Investigator Talent",
        "summary": "A conspirator uses his knowledge of investigations to make sure he avoids any investigations that his rivals perform."
      },
      {
        "name": "Cryptid Scholar",
        "replaces": "Poison Lore; Poison Resistance; Studied Combat; Studied Strike",
        "summary": "Cryptid scholars research monsters that lurk secretly at the edge of civilization, developing a deep expertise regarding their anatomy, habits, and ecology."
      },
      {
        "name": "Cult Hunter",
        "replaces": "Trapfinding; Poison Resistance; Poison Immunity; Poison Lore; Trap Sense; Swift Alchemy; Studied Combat Studied Strike; 7th, 13th-level Investigator Talent",
        "summary": "Cult hunters seek out heretical secret societies, purging their ideological taint and banishing summoned servants."
      },
      {
        "name": "Dread Investigator",
        "replaces": "Inspiration; Studied Combat; Studied Strike; Poison Lore; Poison Resistance; Poison Immunity; 7th, 13th, and 19th-level Talents",
        "summary": "The dread investigator observes human behavior after the fact, honing their intuition by delving into the mysteries of death."
      },
      {
        "name": "Empiricist",
        "replaces": "Poison Lore; Poison Resistance; Swift Alchemy; True Inspiration",
        "summary": "Champions of deductive reasoning and logical insight, empiricists put their faith in facts, data, confirmed observations, and consistently repeatable experiments—these things are their currency of truth."
      },
      {
        "name": "Forensic Physician",
        "replaces": "Inspiration; Trapfinding; Trap Sense; 3rd, 5th-level Investigator Talent",
        "summary": "A forensic physician specializes in analyzing medical details in order to solve crimes and uncover evidence."
      },
      {
        "name": "Gravedigger",
        "replaces": "Weapon and Armor Proficiency; Alchemy; Trapfinding; Trap Sense; Poison Resistance; Poison Immunity; Studied Combat; Studied Strike; Swift Alchemy",
        "summary": "Gravediggers pursue long buried mysteries, figuratively and literally digging up the truth and finding answers to secrets only moldering corpses and dry bones can tell."
      },
      {
        "name": "Guardian of Immortality",
        "replaces": "Poison Lore; Poison Resistance; 7th, 13th-level Investigator Talent; Poison Immunity",
        "summary": "Guardians of immortality are Thuvian investigators charged with hunting down those who would attempt to steal or learn for themselves the secret to creating the sun orchid elixir."
      },
      {
        "name": "Hallucinist",
        "replaces": "Trapfinding; Trap Sense; 3rd, 5th, 7th, 9th, 11th, 15th-level Investigator Talent; Poison Lore' Poison Resistance; Poison Immunity; Keen Recollection; Studied Combat",
        "summary": "A hallucinist imbibes magical drugs to expand his mind into the psychedelic world, extending his awareness to things he could not normally perceive."
      },
      {
        "name": "Infiltrator",
        "replaces": "Trapfinding; Poison Lore; Poison Resistance",
        "summary": "An infiltrator specializes in investigating or disrupting groups from within."
      },
      {
        "name": "Jinyiwei",
        "replaces": "Inspiration; Alchemy; Trapfinding; Trap Sense; Swift Alchemy",
        "summary": "Jinyiwei are a special task force of secret police whose mission is to root out, expose, and counteract their government’s existing wrongdoing."
      },
      {
        "name": "Lamplighter",
        "replaces": "Class Skills; Poison Lore; Poison Resistance; Poison Immunity; Keen Recollection; Trap Sense",
        "summary": "Lamplighters are investigators tasked with keeping the night streets safe and lit, and securing darkened areas against whatever dangers lurk in the shadows."
      },
      {
        "name": "Lepidstadt Inspector",
        "replaces": "Trapfinding; Trap Sense; Poison Resistance; Poison Immunity; Swift Alchemy; 5th-level Investigator Talent",
        "summary": "The ability of investigators trained at the University of Lepidstadt to get to the bottom of a mystery is legendary, and troubled settlements throughout the region often send petitions to the university requesting the aid of a formally trained inspector when some mystery threatens the community as a whole."
      },
      {
        "name": "Majordomo",
        "replaces": "Trapfinding; Alchemy; Swift Alchemy; Trap Sense",
        "summary": "In a world of intrigue where the loyalties of staff can be bought and sold, sometimes it takes the skills of an investigator to follow the byzantine paper trails and prevent embezzling and espionage within the estates of the elite."
      },
      {
        "name": "Malice Binder",
        "replaces": "Inspiration; Trapfinding; Trap Sense; Alchemy; Poison Resistance; Poison Immunity",
        "summary": "A lock of hair, a bit of blood, even a footprint is enough to grant a wily witch hunter an edge. Malice binders often rise from the ranks of the common folk rather than from wealthy nobles or the church. Their magic is old and crude, but devastatingly effective against those they hunt."
      },
      {
        "name": "Mastermind",
        "replaces": "Inspiration; Trapfinding; Trap Sense; Swift Alchemy; 9th-level Investigator Talent",
        "summary": "Although some investigators use their honed senses and cunning insight for personal gain, no one excels at such endeavors like the mastermind."
      },
      {
        "name": "Natural Philosopher",
        "replaces": "Weapon/Armor Proficiencies; Class Skills; Inspiration; Trapfinding; Alchemy; Trap Sense; 3rd-level Investigator Talent",
        "summary": "Natural philosophers are scholars, explorers, and survivalists who feel at home in nature, seldom longing for the comforts of the city."
      },
      {
        "name": "Portal Seeker",
        "replaces": "Trapfinding; Poison Resistance; Poison Lore; Studied Strike; Poison Immunity",
        "summary": "While most investigators seek answers to mundane mysteries, portal seekers chase more unusual enigmas: portals to other planes."
      },
      {
        "name": "Profiler",
        "replaces": "Trapfinding; Poison Lore; Trap Sense; Poison Resistance; Poison Immunity; Swift Alchemy; 7th-level Investigator Talent",
        "summary": "Profilers understand the human psyche to an intense degree, allowing them to predict the criminals they hunt."
      },
      {
        "name": "Psychic Detective",
        "replaces": "Class Skills; Alchemy; Poison Lore; Poison Resistance; Swift Alchemy; Poison Immunity; 3rd-level Talent; Investigator Talents",
        "summary": "A psychic detective supplements her keen insight with occult skill to unravel mysteries both ordinary and supernatural."
      },
      {
        "name": "Questioner",
        "replaces": "Inspiration; Alchemy; Poison Lore",
        "summary": "Dabblers in arcane magic and masters of stealth and guile, questioners are investigators who often find themselves mucking about in cases for less-than-savory clientele or that require an extra bit of subtlety."
      },
      {
        "name": "Reckless Epicurean",
        "replaces": "Trapfinding; 5th, 13th-level Investigator Talent",
        "summary": "Whether an obsessive scientist, a healer determined to ensure the safety of her tinctures, or a seeker of new and interesting potions, a reckless epicurean’s body is saturated with experimental chemicals and magic."
      },
      {
        "name": "Ruthless Agent",
        "replaces": "Alignment; Inspiration; Trapfinding; Trap Sense; Swift Alchemy; 11th, 17th-level Investigator Talents.",
        "summary": "Ruthless agents are often called upon for their skills at extracting information by any means necessary."
      },
      {
        "name": "Scavanger",
        "replaces": "Alchemy; Inspiration; Poison Lore; Poison Resistance; Poison Immunity",
        "summary": "Scavengers are masters of systems: how they fit together, why they work, and how to make the most of their parts."
      },
      {
        "name": "Skeptic",
        "replaces": "Trapfinding; Poison Resistance; Swift Alchemy; 7th level Investigator Talent",
        "summary": "The skeptic accepts the existence of the occult world while challenging claims that the supernatural explains all of life’s problems."
      },
      {
        "name": "Sleuth",
        "replaces": "Alchemy; Swift Alchemy",
        "summary": "A sleuth is an investigator who relies on good fortune and guile rather than alchemy."
      },
      {
        "name": "Spiritualist",
        "replaces": "Alchemy; Poison Lore; Poison Resistance; Trap Sense; Swift Alchemy; Poison Immunity",
        "summary": "While most investigators look to the physical world to gain their knowledge, there are those who seek out knowledge beyond the pale."
      },
      {
        "name": "Star Watcher",
        "replaces": "Weapon/Armor Proficiencies; Alchemy; Trapfinding; Trap Sense; Swift Alchemy",
        "summary": "Star watchers study the movements and positions of the sun, the moon, and the stars, searching for secrets written in the sky."
      },
      {
        "name": "Steel Hound",
        "replaces": "Weapon/Armor Proficiencies; Poison Lore; Swift Alchemy",
        "summary": "Steel hounds are investigators who have taken to using firearms in place of the more mundane weapons their counterparts favor."
      },
      {
        "name": "Tekritanin Arbiter",
        "replaces": "Trapfinding; Poison Lore; Poison Resistance; Trap Sense",
        "summary": "The Tekritanin League facilitated trade and settled disputes between a vast array of diverse cultures. The arbiters were the first line of diplomatic defense, solving problems before they could become disruptive."
      },
      {
        "name": "Toxin Codexer",
        "replaces": "Alchemy; Trapfinding; 3rd-level Investigator Talent; Keen Recollection; Trap Sense",
        "summary": "A toxin codexer meticulously seeks out new poisons and catalogs their effects, both those that are harmful and those that are potentially beneficial."
      }
    ]
  } ,
  
  { "name"       : "Kineticist" ,
  
    "description": 
    [
      "Kineticists are living channels for elemental matter and energy, manipulating the world around them by drawing upon inner reserves from their own bodies. Kineticists often awaken to their kinetic abilities during a violent or traumatic experience, releasing their power involuntarily. As kinetic power is seldom inherited, kineticists are rarely able to find mentors to guide them, so they must delve into these mysteries on their own to learn to control their gifts."
    ],
    
    "role": 
    [
      "Kineticists generally use their powers to assail their foes from range, but based on the way their talents develop, they can channel their kinetic abilities for a variety of situations. Kineticists are usually quite different from their families and friends, so they often strike out on their own or alongside others with extraordinary talents."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Aquakinetcist",
        "replaces": "Elemental Focus; Expanded Element; Basic Hydrokinesis; 2nd, 6th-levle Utility Wild Talent; Elemental Defense",
        "summary": "While all hydrokineticists have the ability to control water, aquakineticists’ powers are tied to their determination to explore the world beneath the waves."
      },
      {
        "name": "Arakineticist",
        "replaces": "4th, 6th, 8th, and 13th-level Utility Wild Talents",
        "summary": "Those of strong will who live under a dark curse long enough might learn to control and channel the corrupt energy afflicting them."
      },
      {
        "name": "Blightburner",
        "replaces": "Elemental Focus; Basic Geokinesis; 2nd-level Utility Power; Elemental Overflow; Flesh of Stone; Gather Power; Internal Buffer",
        "summary": "Darklands geokineticists sometimes exhibit supernatural powers associated with blightburn crystals. Blightburner kineticists harness this radioactivity in pyrotechnic displays, an unusual feat for those connected to the element of earth."
      },
      {
        "name": "Blighted Defiler",
        "replaces": "Alignment; Gather Power; Key Ability Score; Internal Buffer; Elemental Defense; Omnikinesis",
        "summary": "A few kineticists have developed the ability to steal the life force from the surrounding land in order to infuse themselves with unnatural strength beyond their bodies’ normal capabilities."
      },
      {
        "name": "Blood Kineticist",
        "replaces": "1st, 5th, 9th, and 11th-level Infusions; 6th and 8th-level Utility Wild Talent; Expanded Element; Omnikinesis",
        "summary": "To a blood kineticist, the water in a creature’s blood is just like any other sort, and she uses that knowledge to brutal ends."
      },
      {
        "name": "Dark Elementalist",
        "replaces": "Alignment; Key Ability Score; Burn; Elemental Overflow; Internal Buffer",
        "summary": "Dark elementalists are loathe to suffer the consequences of channeling their power and study the darkest esoteric energies of the planes to use souls to fuel their occult might."
      },
      {
        "name": "Elemental Annihilator",
        "replaces": "1st, 3rd, 5th, and 9th-level Infusions; all utility wild talents",
        "summary": "For some kineticists, nothing in life is as sweet as destruction and pain. Elemental annihilators pursue only uses of their powers that harm others."
      },
      {
        "name": "Elemental Ascetic",
        "replaces": "Kinetic Blast; Elemental Overflow; Wild Talents; Elemental Defense; 5th, 9th, 13th-level Infusions",
        "summary": "Combining the elemental powers of a kineticist with the rigid physical discipline of a monk, an elemental ascetic channels his powers through his body to enhance himself in combat."
      },
      {
        "name": "Elemental Purist",
        "replaces": "Internal Buffer; Expanded Elements; 11th, 19th-level Infusion; Omnikinesis",
        "summary": "An elemental purist spurns all elements that are not her own, for utter devotion can allow one to accomplish even seemingly impossible heroics."
      },
      {
        "name": "Elysiokineticist",
        "replaces": "Elemental Focus; Class Skills; Expanded Element; Basic Phytokinesis, 1st-level Infusion; Flesh of Wood",
        "summary": "Similar to how phytokineticists draw their power from the First World, elysiokineticists trace their abilities to the riotous wilderness of the plane known as Elysium"
      },
      {
        "name": "Ioun Kineticist",
        "replaces": "Elemental Focus; Basic Telekinesis; Internal Buffer; Elemental Overflow",
        "summary": "Some aetherkineticists dedicate themselves to unlocking ioun stones’ cosmic secrets and seemingly limitless potential."
      },
      {
        "name": "Kinetic Chirurgeon",
        "replaces": "Infusions; Metakinesis; Infusion Specialization; Internal Buffer",
        "summary": "While any hydrokineticist or telekineticist can learn the rudiments of healing, some kineticists are virtuosos of the curative arts."
      },
      {
        "name": "Kinetic Knight",
        "replaces": "Class Skills; Kinetic Blast; Infusions; Metakinesis; Metakinetic Master; 3rd-level Infusion; Supercharge",
        "summary": "A kinetic knight dons armor and wields a blade of elemental energy."
      },
      {
        "name": "Leshykineticist",
        "replaces": "Element; Expanded Element; 6th, 10th-level Utility Wild Talents; Maximize Metakinesis; Basic Phytokinesis; Internal Buffer; Omnikinesis",
        "summary": "(Vine Leshy) Of all those who pursue the path of a kineticist, only leshykineticists are both made of plant matter and born of nature spirits. These curious creatures wield ancient powers unknown to any other kineticists."
      },
      {
        "name": "Overwhelming Soul",
        "replaces": "Class Skills; Wild Talents; Burn; Internal Buffer; Elemental Overflow",
        "summary": "Some kineticists have such a powerful personality that they can seize control of their element with their minds alone, without endangering their bodies."
      },
      {
        "name": "Psammokinetic",
        "replaces": "Alignment; Elemental Focus, Elemental Overflow; Expanded Element",
        "summary": "Psammokinetics are ascetic kineticists who consider the harsh nature of the burning deserts of Osirion to be a tempering fire that can purify all their imperfections."
      },
      {
        "name": "Psychokinetcist",
        "replaces": "Key Ability Score; Burn; Elemental Overflow",
        "summary": "Psychokineticists channel elemental power through their minds rather than their bodies and while this energy ravages their minds, it unleashes power locked in their ruptured emotions."
      },
      {
        "name": "Terrakineticist",
        "replaces": "Elemental Focus; Kinetic Blast; Elemental Defense; Expanded Element; Omnikinesis",
        "summary": "Terrakineticists have a stunted ability that allows them to access the Elemental Planes, but they’ve learned how to turn this limited talent into an incredible strength by tapping into the ambient elemental nature of the land surrounding them."
      }
    ]
  } ,
  
  { "name"       : "Magus" ,
  
    "description": 
    [
      "There are those who spend their lives poring over ancient tomes and texts, unlocking the power of magic, and there are those who spend their time perfecting the use of individual weapons, becoming masters without equal. The magus is at once a student of both philosophies, blending magical ability and martial prowess into something entirely unique, a discipline in which both spell and steel are used to devastating effect. As he grows in power, the magus unlocks powerful forms of arcana that allow him to merge his talents further, and at the pinnacle of his art, the magus becomes a blur of steel and magic, a force that few foes would dare to stand against."
    ],
    
    "role": 
    [
      "Magi spend much of their time traveling the world, learning whatever martial or arcane secrets they can find. They might spend months learning a new sword-fighting style from a master warrior, while simultaneously moonlighting in the local library, poring through tomes of ancient lore. Most who take this path dabble in all sorts of lore, picking up anything that might aid them in their search for perfection."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Armored Battlemage",
        "replaces": "Spell Combat; Arcane Pool; 3rd, 18th-level Magus Arcana; Improved Spell Combat; Greater Spell Combat",
        "summary": "Armored battlemages learn to move and cast spells in even the most restrictive armors, and have developed new methods to magically enhance their armor."
      },
      {
        "name": "Beastblade",
        "replaces": "3rd-level Magus Arcana; Spell Recall; Knowledge Pool; Improved Spell Recall",
        "summary": "Beastblade magi work in tandem with their familiars, using spell, steel, and claw to clear the battlefield of foes."
      },
      {
        "name": "Bladebound",
        "replaces": "Arcane Pool; 3rd-level Magus Arcana",
        "summary": "A select group of magi are called to carry a black blade—a sentient weapon of often unknown and possibly unknowable purpose."
      },
      {
        "name": "Card Caster",
        "replaces": "Arcane Pool; Spellstrike; 3rd-level Arcana",
        "summary": "The card caster is an ancient, martial offshoot of the traditional harrower, learning to not only draw power from the harrow, but also to invest each card with deadly power."
      },
      {
        "name": "Deep Marshal",
        "replaces": "Armor Proficiencies; Medium Armor; Heavy Armor; Spellcasting; Arcane Pool; Spell Combat; Spellstrike; 3rd-level Magus Arcana",
        "summary": "Largely unseen by visitors, the deep marshals have survived into the modern era as keepers, protectors, and repairers of the myriad of stony passages that travel around, through, and under the Five Kings Mountains."
      },
      {
        "name": "Eldritch Archer",
        "replaces": "Class Skills; Arcane Pool; Spell Combat; Spellstrike; Counterstrike",
        "summary": "The eldritch archer rains magical attacks down on her foes from the city walls."
      },
      {
        "name": "Eldritch Scion",
        "replaces": "Spells; Spell Recall; Arcane Pool; Spell Combat; Knowledge Pool; Improved Spell Combat; Greater Spell Combat",
        "summary": "Unlike typical magi, eldritch scions do not study tomes of magic or spend time learning to combine martial and magical skills. Rather, eldritch scions find that their spells and abilities come to them instinctively."
      },
      {
        "name": "Elemental Knight",
        "replaces": "Spell Recall",
        "summary": "(Suli Only) Elemental knights are born with elemental energies surging through their blood and discover the secret of reconciling and focusing this primal power into the arcane."
      },
      {
        "name": "Esoteric",
        "replaces": "Weapon/Armor Proficiency; Spellcasting; Arcane Pool; Spellstrike; Spell Recall; Bonus Feats; Medium Armor; Heavy Armor; Improved Spell Recall",
        "summary": "Esoterics are drawn to the mysticism of the occult and spend their lives delving into forgotten texts and forbidden tomes."
      },
      {
        "name": "Fiend Flayer",
        "replaces": "None",
        "summary": "(Tiefling Only) Some tiefling magi can tap the dark energy of their fiendish blood to enhance their arcane and combat talents."
      },
      {
        "name": "Greensting Slayer",
        "replaces": "Arcane Pool; Medium Armor; Heavy Armor",
        "summary": "The blending of martial prowess with elven magic has long been a staple of the Blackash Training Grounds in Erages. More than a few who study at Erages Academy follow this path because of the promises of wealth that the city’s criminal element makes toward practiced brawlers and smugglers."
      },
      {
        "name": "Hexbreaker",
        "replaces": "Spell Recall; Improved Spell Recall",
        "summary": "Hexbreakers—sometimes called witch-hammers for their proclivity toward warhammers—have borne witness to the damage of unrestrained arcane power and hone their own arcane arts to battle such abuse."
      },
      {
        "name": "Hexcrafter",
        "replaces": "Spell Recall",
        "summary": "A hexcrafter magus has uncovered the secret of using his arcane pool to recreate witch hexes."
      },
      {
        "name": "Jistkan Artificer",
        "replaces": "Spells; Arcane Pool; Cantrips; 3rd-level Magus Arcana; Spellstrike",
        "summary": "As part of studying the secret methods the original Jistkan artificers used to build golems, these magi graft construct parts onto their own arms."
      },
      {
        "name": "Kapenia Dancer",
        "replaces": "Weapon/Armor Proficiencies; Diminished Spellcasting",
        "summary": "The kapenia dancer laces their deadly scarves with powerful magic."
      },
      {
        "name": "Kensai",
        "replaces": "Weapon/Armor Proficiency; Spells; Spell Recall; Knowledge Pool; Medium Armor; 9th-level Arcana; Improved Spell Recall; Heavy Armor; True Magus",
        "summary": "A kensai spends his life focusing his training and meditation into a rapturous perfection of the use of a single weapon, which is usually but not always a sword, channeling his arcane might through it in a dizzying and deadly dance beyond the abilities of even the greatest of mundane warriors."
      },
      {
        "name": "Magic Warrior",
        "replaces": "Class Skills; 3rd-level Magus Arcana; Improved Spell Combat; Greater Spell Combat; Greater Spell Access",
        "summary": "Trained in a tradition stretching back to Old-Mage Jatembe’s Ten Magic Warriors, magic warriors renounce their identities to master magical might and serve as champions of culture and learning across the Mwangi Expanse and beyond."
      },
      {
        "name": "Mindblade",
        "replaces": "Spellcasting; Arcane Pool; Spell Recall; Knowledge Pool; Improved Spell Recall; Greater Spell Combat; Greater Spell Access; Medium Armor; Improved Spell Combat; Heavy Armor",
        "summary": "A mindblade blends psychic talent and martial skill to lethal effect. By forming weapons with her mind, she always has the right tool for any situation."
      },
      {
        "name": "Myrmidarch",
        "replaces": "Spells; Spell Recall; Improved Spell Recall; 6th, 12th, 18th-level Magus Arcana; Knowledge Pool; Improved Spell Combat; Greater Spell Combat; True Magus",
        "summary": "The myrmidarch is a skilled specialist, using magic to supplement and augment his martial mastery."
      },
      {
        "name": "Nature-Bonded Magus",
        "replaces": "Arcane Pool; Spell Recall; Knowledge Pool; Improved Spell Recall",
        "summary": "A nature-bonded magus synergizes arcane magic and the divine magic traditions of druids into a deadly synthesis."
      },
      {
        "name": "Puppetmaster",
        "replaces": "Skills; Knowledge Pool; Greater Spell Access; Arcane Pool; Spell Combat; Improved Spell Combat; Greater Spell Combat; Spellstrike; Fighter Training; Counterstrike; Medium Armor; Heavy Armor; True Magus",
        "summary": "Puppetmasters focus on using charm and illusion spells to control the senses of those for whom they perform."
      },
      {
        "name": "Sigilus",
        "replaces": "Spellstrike; Medium Armor; Heavy Armor",
        "summary": "A sigilus manipulates the discoveries of wizards and other more sagacious Cyphermages, using those findings to create special sigils that allow her to transfer spell effects into different objects for later use."
      },
      {
        "name": "Skirnir",
        "replaces": "Spells; Spell Combat; Spell Recall; Knowledge Pool; Improved Spell Combat; Greater Spell Combat; Greater Spell Access; Counterstrike",
        "summary": "Sometimes called a shield-vassal or shieldmaiden, the skirnir has learned to infuse his power into his shield."
      },
      {
        "name": "Sorrowblade",
        "replaces": "3rd, 12th-level Magus Arcana; Speed Weapon Property",
        "summary": "A magus who has suffered greatly over the course ofher life can learn to channel that misery into her weapon and inflict it on others."
      },
      {
        "name": "Soul Forger",
        "replaces": "Spells; Knowledge Pool; Spell Recall; Improved Spell Recall; Counterstrike; Greater Spell Access",
        "summary": "The soul forger has learned the skill of infusing the raw magical essence of his soul into armaments of surpassing power, combining the mystic arts with the arts of war in a unity of steely perfection."
      },
      {
        "name": "Spell Dancer",
        "replaces": "Arcane Pool; 5th-level Bonus Feat; Medium Armor; Heavy Armor",
        "summary": "(Elf Only) Many elven magi do not consider themselves masters of a blend of martial and magical talents, but rather a sub-category of wizards who study the effect of physical movement and techniques upon spellcasting ability."
      },
      {
        "name": "Spell Trapper",
        "replaces": "Class Skills; Spell Recall; Fighter Training",
        "summary": "Spell trappers forsake much of their arcane skill and martial knowledge in exchange for the ability to conjure magical traps to hinder their foes."
      },
      {
        "name": "Spellblade",
        "replaces": "Spellstrike",
        "summary": "A spellblade magus can manifest a ghostly blade of force that can be used as an off-hand weapon."
      },
      {
        "name": "Spire Defender",
        "replaces": "Weapon/Armor Proficiencies; Spell Recall",
        "summary": "Magi who train themselves to accompany sages and archaeologists venturing into the Mordant Spire become spire defenders."
      },
      {
        "name": "Staff Magus",
        "replaces": "Weapon/Armor Proficiencies; Medium Armor; Heavy Armor; Fighter Training",
        "summary": "While most magi use a one-handed weapon as their melee implement of choice, one group of magi uses the quarterstaff instead."
      }
    ]
  } ,
  
  { "name"       : "Medium" ,
    
    "description": 
    [
      "Mediums channel spirits into themselves, using their own bodies as vessels for astral entities spawned from myths and legends. A medium balances his need for the spirits’ power with the danger of allowing such beings influence over his mind."
    ],
    
    "role": 
    [
      "Mediums are very versatile, filling whatever role the party needs at the moment by channeling the right spirit."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Fiend Keeper",
        "replaces": "Alignment; Spirit; Haunt Channeler; Location Channel; Connection Channel; Ask the Spirits",
        "summary": "Fiend keepers serve as a vessel to contain one of the world’s evil spirits so that it cannot inflict further harm."
      },
      {
        "name": "Kami Medium",
        "replaces": "Spirit; Taboo; Spellcasting; Haunt Channeler; Location Channel; Connection Channel; Ask the Spirits; Astral Journey",
        "summary": "Some mediums channel the power of nature spirits called kami rather than the spirits of legend."
      },
      {
        "name": "Nexian Channeler",
        "replaces": "Spirit; Knacks; Taboo; Haunt Channeler; Location Channel; Connection Channel; Propitiation; Ask the Spirits; Astral Journey; Trance of Three; Spacious Soul; Spirit Mastery; Astral Beacon",
        "summary": "The archmage Nex long ago created an astral reflection of himself from which he can draw additional power. This echo now serves as an appropriate spirit for well-trained mediums to channel."
      },
      {
        "name": "Outer Channeler",
        "replaces": "Spirit; Taboo; Haunt Channeler; Connection Channel; Location Channel; Ask the Spirits; Astral Journey",
        "summary": "Outer channelers invite extraplanar entities to inhabit them, allowing the likes of angels and demons to use them as vessels in exchange for power."
      },
      {
        "name": "Reanimated Medium",
        "replaces": "Spirit; Taboo; Haunt Channeler; Location Channel; Connection Channel; Spacious Soul; Astral Beacon",
        "summary": "Sometimes a departed soul destined for legend gains a second chance at life by possessing his own revived body."
      },
      {
        "name": "Relic Channeler",
        "replaces": "Spirit; Haunt Channeler; Location Channel; Connection Channel",
        "summary": "A relic channeler carries relics of legend around with her."
      },
      {
        "name": "Rivethun Spirit Channeler",
        "replaces": "Spellcasting; Spirit; Spirit Bonus; Spirit Surge; Taboo; Connection Channel",
        "summary": "Rivethun spirit channelers are mediums who practice the ancient dwarven philosophy of the rivethun, which teaches that power lies in the connection between physical bodies and immaterial souls."
      },
      {
        "name": "Spirit Dancer",
        "replaces": "Spirit; Spirit Bonus; Spirit Surge; Taboo; Shared Seance; Trance of Three; Spacious Soul; Astral Beacon",
        "summary": "A spirit dancer enacts an exuberant dance to the spirits, accepting many roles in the shifting dance and changing dance partners quickly."
      },
      {
        "name": "Storm Dreamer",
        "replaces": "Spirit Surge; Haunt Channeler; Location Channel; Connection Channel",
        "summary": "Storm dreamers serve the Storm Kindlers by communing with their mystical predecessors. They serve as spiritual advisors for the organization, and are valued for the lore and wisdom they gain during their trances."
      },
      {
        "name": "Storyteller",
        "replaces": "Spirit; Spirit Bonus; Spirit Surge; Shared Seance; Taboo; Haunt Channeler; Propitiation; Trance of Three; Connection Channel; Spirit Mastery; Astral Beacon",
        "summary": "While all mediums connect to legendary spirits, storyteller mediums take their obsession with legends to the extreme, suffusing their lives with epic tales at the cost of some of their spiritual power."
      },
      {
        "name": "Uda Wendo",
        "replaces": "Class Skills; Spirit; Shared Seance; Haunt Channeler; Location Channel; Connection Channel",
        "summary": "Uda wendo are powerful mediums who are sensitive to the presence and desires of the wendo, powerful and mysterious entities that walk Golarion while shaping fate and guiding destiny."
      },
      {
        "name": "Vessel of the Failed",
        "replaces": "Spirit; Spirit Mastery; Spirit Surge; Taboo",
        "summary": "A vessel of the failed channels the spirits of those who attempted the Test of the Starstone but failed; these spirits grant the medium abilities wrought from the spirits’ ultimate shortcomings."
      },
      {
        "name": "Voice of the Void",
        "replaces": "Spirit; Taboo; Haunt Channeler",
        "summary": "Some mediums delve deeply into the spirit world and make contact with entities that exist outside the boundaries of the sane multiverse."
      }
    ]
  } ,
  
  { "name"       : "Mesmerist" ,
    
    "description": 
    [
      "Experts at charm and deceit, mesmerists compel others to heed their words and bend to their will. Psychic powers, primarily those of enchantment and illusion, give mesmerists the tools they need to manipulate others—usually for their own personal gain. The very gaze of a mesmerist can hypnotize someone into following his whims. Mesmerists frequently form cults of personality around themselves, and they develop skills and contingency plans in case their ploys are discovered. They draw their magic from the Astral Plane, and many consider their minds to be conduits to enigmatic spaces others can’t comprehend."
    ],
    
    "role": 
    [
      "Mesmerists wield power over lesser minds, suppressing foes’ wills to weaken them. Priding themselves on their trickery and inventiveness, they also support their allies—and often themselves—with magical tricks, most of which offer protection. Their limited healing ability primarily provides temporary hit points, so mesmerists aren’t the strongest primary healers, but they can easily remove conditions that typically affect the mind."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Aromaphile",
        "replaces": "Hypnotic Stare; Painful Stare; Towering Ego; Bold Stare; Touch Treatment; Mental Potency",
        "summary": "(Ghoran) Rather than employ the baleful glares of the typical mesmerist, aromaphiles hypnotize others using an array of sickeningly sweet scents developed from their unique ghoran physiology."
      },
      {
        "name": "Autohypnotist",
        "replaces": "Hypnotic Stare; Mental Potency",
        "summary": "An autohypnotist has incredibly powerful psychic abilities that he can’t entirely control."
      },
      {
        "name": "Chart Caster",
        "replaces": "Class Skills; Mesmerist Tricks; Manifold Tricks; Touch Treatment",
        "summary": "Lirgeni astrologists would divine their futures by consulting star charts, but some had no talent for astrology and simply faked their results. When prophecy died with Aroden, a few Lirgeni survivors continued with this “reliable” method."
      },
      {
        "name": "Cult Master",
        "replaces": "Consummate Liar; Painful Stare; Mesmerist Tricks; 3rd, 6th, and 14th-level Touch Treatments; 7th-level Bold Stare; Masterful Tricks; Rule Minds",
        "summary": "The leaders of some cults are simply charlatans, bathing in the adulation of their followers. Others believe themselves to be truly in touch with an unknown power, bringing their unique messages to those willing to follow and obey them."
      },
      {
        "name": "Dreamstalker",
        "replaces": "Painful Stare; 1st-level Mesmerist Trick; Towering Ego;  Touch Treatment; Manifold Tricks; Glib Lie",
        "summary": "Many mesmerists concentrate their studies on conscious, rational thought, but dreamstalkers instead delve into the unleashed unconscious mind that wanders free in dreams."
      },
      {
        "name": "Enigma",
        "replaces": "Hypnotic Stare; Consummate Liar; Painful Stare; Touch Treatment; Manifold Tricks; Glib Lie; Rule Minds",
        "summary": "An enigma spends his life dedicated to developing psychic abilities that allow him to operate unnoticed."
      },
      {
        "name": "Eyebiter",
        "replaces": "Consummate Liar; 1st-level Mesmerist Trick; Touch Treatment; Mental Potency; Glib Lie",
        "summary": "An eyebiter’s eyes become so infused with psychic might that they can leave the eyebiter’s body and move about on their own."
      },
      {
        "name": "Fey Trickster",
        "replaces": "Class Skills; Spellcasting; Towering Ego; Touch Treatment; Rule Minds",
        "summary": "Most mesmerists draw psychic power from the Astral Plane, but a few gain their powers in an unusual way: from a brush with the fey."
      },
      {
        "name": "Gaslighter",
        "replaces": "Alignment; Consummate Liar; Touch Treatment; Painful Stare;",
        "summary": "A gaslighter takes joy in others’ suffering, delighting in driving them to madness."
      },
      {
        "name": "Hate-Monger",
        "replaces": "Alignment; Consummate Liar; Touch Treatment; Mental Potency; Manifold Tricks; 7th-level Bold Stare; Glib Lie",
        "summary": "Hate-mongers are xenophobic and judgmental rabblerousers who whip up mobs against enemies real or imagined."
      },
      {
        "name": "Material Manipulator",
        "replaces": "Spellcasting; Consummate Liar; 2nd-level Mesmerist Trick; Manifold Tricks; Touch Treatment; Rules Minds",
        "summary": "Rather than waste time limiting himself to ruling minds, a material manipulator forces his whims upon reality and uses his magic to ensure that those around him comply with his demands."
      },
      {
        "name": "Mindwyrm Mesmer",
        "replaces": "Consummate Liar; Painful Stare",
        "summary": "Mindwyrm mesmers emulate the confidence, swagger, and fear inspired by dragons to bully and browbeat others into obedience."
      },
      {
        "name": "Projectionist",
        "replaces": "Spellcasting; 4th-level Mesmerist Trick; Mental Potency",
        "summary": "Not content to simply command others from afar, a projectionist is able to use his mesmerizing powers to utterly dominate other creatures and objects by projecting his spirit from his body."
      },
      {
        "name": "Spirit Walker",
        "replaces": "Spells; Consummate Liar; Mental Potency; 3rd, 6th, 10th, and 14th-level Touch Treatments; Rule Minds",
        "summary": "Some mesmerists specialize in dominating and controlling undead rather than the living."
      },
      {
        "name": "Thought Eater",
        "replaces": "Consummate Liar; Towering Ego; Touch Treatment; Rule Minds",
        "summary": "Mesmerists that learn to pierce deep into the minds of their victims are known as thought eaters, dangerous individuals capable of devouring thoughts and assuming the knowledge those notions represent for themselves."
      },
      {
        "name": "Toxitician",
        "replaces": "Consummate Liar; Hypnotic Stare; Painful Stare; Bold Stare; Touch Treatment; Glib Lie",
        "summary": "Toxiticians forgo the mesmerist’s stare, instead combining their psychic power with their alchemical knowledge to craft injections that torment their foes and bolster themselves and their allies."
      },
      {
        "name": "Umbral Mesmerist",
        "replaces": "Spellcasting; 1st, 4th, 8th, 12th, 16th, and 20th-level Mesmerist Tricks; Towering Ego; Mental Potency",
        "summary": "Trained in secret, umbral mesmerists are clandestine weapons who spend years learning how to shape terrifying creatures from the inky darkness in which they revel."
      },
      {
        "name": "Vexing Daredevil",
        "replaces": "Class Skills; 1st-level Mesmerist Trick; Touch Treatment; Bold Stare; Glib Tongue",
        "summary": "Vexing daredevils train their psychic powers for combat, specializing in momentarily blinding and confusing their foes with sudden feints and tricks."
      },
      {
        "name": "Vexing Trickster",
        "replaces": "Consumate Liar, Touch Treatment",
        "summary": "Vexing tricksters indulge in the various hijinks their power enables."
      },
      {
        "name": "Vizier",
        "replaces": "Consummate Liar; 3rd-level Bold Stare; Towering Ego; Mental Potency",
        "summary": "While many mesmerists focus on beguiling their foes or taking overt control of others with their mental powers, viziers carve out a subtler niche for themselves as advisors."
      },
      {
        "name": "Vox",
        "replaces": "Spellcasting; Towering Ego; 10th-level Mesmerist Trick; Touch Treatment; Hypnotic Stare",
        "summary": "Most mesmerists practice their mental manipulation through their entrancing gaze, but others have learned to practice their skill through the lilt and intonation of their voice."
      }
    ]
  } ,
  
  { "name"       : "Monk" ,
  
    "description":
    [
      "For the truly exemplary, martial skill transcends the battlefield—it is a lifestyle, a doctrine, a state of mind. These warrior-artists search out methods of battle beyond swords and shields, finding weapons within themselves just as capable of crippling or killing as any blade. These monks (so called since they adhere to ancient philosophies and strict martial disciplines) elevate their bodies to become weapons of war, from battle-minded ascetics to self-taught brawlers. Monks tread the path of discipline, and those with the will to endure that path discover within themselves not what they are, but what they are meant to be."
    ],
    
    "role":
    [
      "Monks excel at overcoming even the most daunting perils, striking where it's least expected, and taking advantage of enemy vulnerabilities. Fleet of foot and skilled in combat, monks can navigate any battlefield with ease, aiding allies wherever they are needed most."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Black Asp",
        "replaces": "Stunning Fist; Still Mind",
        "summary": "The black asps are a sinister order of monks who train as assassins and infiltrators with no need for weapons to achieve their goals."
      },
      {
        "name": "Brazen Disciple",
        "replaces": "Class Skills; 1st, 6th-level Bonus Feats; Still Mind; Abundant Step; Perfect Self",
        "summary": "Brazen disciples use deception in their fighting style, and many go a step further, incorporating fire and smoke both mundane and magical."
      },
      {
        "name": "Disciple of Wholeness",
        "replaces": "Ki Pool; Purity of Body; Diamond Body; Diamond Soul",
        "summary": "Disciples of wholeness train to bring themselves and others closer to physical and spiritual perfection."
      },
      {
        "name": "Drunken Master",
        "replaces": "Still Mind; Purity of Body; Diamond Body; Diamond Soul; Empty Body",
        "summary": "The drunken master finds perfection through excess."
      },
      {
        "name": "Elemental Monk",
        "replaces": "Alignment; Stunning Fist; Bonus Feats; Evasion; Purity of Body; Diamond Body; Ki Pool",
        "summary": "Elemental monks draw inspiration from genies to create their fighting style. Their adaptability and versatility make them capable of serving as emissaries of elemental balance."
      },
      {
        "name": "Far Strike Monk",
        "replaces": "Weapon/Armor Proficiencies; Flurry of Blows; Bonus Feats; Stunning Fist; Still Mind; Purity of Body; Diamond Body",
        "summary": "Far strike monks are masters of thrown weapons, from shuriken to throwing axes to spears."
      },
      {
        "name": "Flowing Monk",
        "replaces": "Stunning Fist; 2nd-level Bonus Feat; Fast Movement; Purity of Body; Diamond Body; Quivering Palm",
        "summary": "The flowing monk is the wind and the river. He knows how the world flows, and forces his enemies to flow with it."
      },
      {
        "name": "Gray Disciple",
        "replaces": "Slow Fall; Still Mind; High Jump; 6th-level Bonus Feat; Wholeness of Body; Abundant Step; Quivering Palm; Tongue of the Sun and Moon; Empty Body",
        "summary": "(Duergar Only) The gray disciple contemplates the inner voice of duergar magic and the silent eternity of stone, mastering these dual mysteries and combining them to deadly effect."
      },
      {
        "name": "Hamatulatsu Master",
        "replaces": "Bonus Feats; Stunning Fist; Ki Pool; Purity of Body",
        "summary": "Once part of the Sisterhood of Eiseth, the Sisterhood of the Golden Erinyes is an order of female monks dedicated to emulating the painful strikes of the barbed devil, leaving targets alive but permanently scarred and broken by pain—a method called hamatulatsu."
      },
      {
        "name": "Harrow Warden",
        "replaces": "Weapon/Armor Proficiencies; Stunning Fist; Improved Evasion; Diamond Body; Quivering Palm",
        "summary": "Some who study the mysteries of the harrow do so to restore lost knowledge and pride to the Varisian people. The harrow warden fulfills this role as she seeks to bring her mind and body into alignment, and she protects her people by invoking the folklore that has guided them for so long. In mastering her own place in fate, a harrow warden learns how to misalign the destinies of others."
      },
      {
        "name": "Hellcat",
        "replaces": "Alignment; Class Skills; Weapon Proficiencies; Bonus Feats; Stunning Fist; Fast Movement; Evasion; Purity of Body; Improved Evasion; Slow Fall; Still Mind; Ki Pool; Wholeness of Body; Diamond Body",
        "summary": "Monks of the hellcat sect follow the teachings of Asmodeus or another infernal power."
      },
      {
        "name": "Hungry Ghost Monk",
        "replaces": "Stunning Fist; Purity of Body; Wholeness of Body; Diamond Body; Diamond Soul",
        "summary": "The hungry ghost monk looks to spirits that prey upon the living as models of perfection."
      },
      {
        "name": "Invested Regent",
        "replaces": "1st-level Bonus Feat",
        "summary": "The invested regent can harness a divine spark to perform superhuman stunts, influence others, and escape injury."
      },
      {
        "name": "Ironskin Monk",
        "replaces": "Monk’s AC; Bonus Feats; Evasion; Ki Speed Increase; High Jump; Fast Movement; Slow Fall; Improved Evasion; Tongue of the Sun and Moon; Perfect Self",
        "summary": "(Hobgoblin Only) Through discipline and training, an ironskin monk hardens his body to withstand punishing blows."
      },
      {
        "name": "Karmic Monk",
        "replaces": "Alignment; Class Skills; Stunning Fist; Still Mind; 7th and 10th-level Ki Pool Abilities; Improved Evasion; Slow Fall; Perfect Self",
        "summary": "A karmic monk contemplates the myriad harmonies that guide existence. He learns to use the disharmony in others against them, and to alter his own inner harmonies to exploit weaknesses in his opponents’ defenses."
      },
      {
        "name": "Kata Master",
        "replaces": "Stunning Fist; Still Mind; Ki Pool; Wholeness of Body; Quivering Palm",
        "summary": "The kata master takes the visual aspect of his martial art to its logical extreme, harnessing her flowing movements and skilled maneuvers as a psychological weapon against her enemies."
      },
      {
        "name": "Ki Mystic",
        "replaces": "Still Mind; Purity of Body; Diamond Body; Diamond Soul; Empty Body",
        "summary": "The ki mystic believes that violence is sometimes necessary, but knowing and understanding is the true root of perfection."
      },
      {
        "name": "Maneuver Master",
        "replaces": "Flurry of Blows; Still Mind; Slow Fall; Purity of Body; Diamond Body; Quivering Palm",
        "summary": "The maneuver master specializes in more complicated moves than simple damage-dealing strikes."
      },
      {
        "name": "Martial Artist",
        "replaces": "Still Mind; Slow Fall; Ki Pool; Purity of Body; Diamond Body; Perfect Self; Wholeness of Body; Timeless Body; Tongue of Sun and Moon; Abundant Step; Diamond Soul; Empty Body",
        "summary": "The martial artist pursues a mastery of pure martial arts without the monastic traditions. He is a master of form, but lacks the ability to harness his ki."
      },
      {
        "name": "Master of Many Styles",
        "replaces": "Bonus Feats; Flurry of Blows; Perfect Self",
        "summary": "The master of many styles is a collector. For every move, he seeks a counter. For every style, he has a riposte."
      },
      {
        "name": "Menhir Guardian",
        "replaces": "Alignment; Weapon/Armor Proficiencies; Unarmed Strike; Ki Pool; Flurry of Blows; Stunning Fist; High Jump; Quivering Palm",
        "summary": "Menhir guardians are ascetic protectors of sacred druidic sites, less concerned with structure and maintaining internal order than they are with preserving the natural balance of the world."
      },
      {
        "name": "Monk of the Empty Hand",
        "replaces": "Monk Weapon Proficiencies; Still Mind; Purity of Body; Diamond Body",
        "summary": "The monk of the empty hand eschews normal weapons in favor of whatever is lying around—rocks, chair legs, flagons of ale, even a simple quill pen all become deadly weapons in the hands of such a monk."
      },
      {
        "name": "Monk of the Four Winds",
        "replaces": "Stunning Fist; Abundant Step; Timeless Body; Perfect Self",
        "summary": "The monk of the four winds is connected to the natural world in a way few other creatures—even other monks—can hope to match."
      },
      {
        "name": "Monk of the Healing Hand",
        "replaces": "Wholeness of Body; Diamond Body; Quivering Palm; Perfect Self",
        "summary": "Monks of the healing hand seek perfection through helping others."
      },
      {
        "name": "Monk of the Lotus",
        "replaces": "Stunning Fist; Abundant Step; Quivering Palm; Tongue of the Sun and the Moon",
        "summary": "While a monk of the lotus realizes that combat cannot always be avoided—and is more than capable in a fight—he understands that all creatures are connected, and to harm another is to harm the self."
      },
      {
        "name": "Monk of the Mantis",
        "replaces": "2nd, 6th, 10th, 14th, and 18th-level Bonus Feats; Wholeness of Body; Diamond Body; Diamond Soul; Quivering Palm",
        "summary": "A body contains many points where the flesh, mind, and spirit coincide. A monk of the mantis is skilled at manipulating these points."
      },
      {
        "name": "Monk of the Sacred Mountain",
        "replaces": "Evasion; Slow Fall; High Jump; Improved Evasion; Tongue of the Sun and the Moon",
        "summary": "The monk of the sacred mountain finds strength and power in the earth beneath his feet."
      },
      {
        "name": "Monk of the Seven Forms",
        "replaces": "Bonus Feats; Stunning Fist; Maneuver Training; Abundant Step; Quivering Palm",
        "summary": "In their place, the monks of the isolated sanctuary now teach a style featuring lightning-fast strikes that mimic both dervish dances and the searing winds of the arid desert, favoring mobility and endurance."
      },
      {
        "name": "Nimble Guardian",
        "replaces": "Evasion; Still Mind; Purity of Body; Wholeness of Body; Improved Evasion",
        "summary": "(Catfolk Only) Some catfolk monks dedicate their graceful prowess to the defense of others, especially those dedicated to a similar ethos or who prove themselves as stalwart allies of the monk’s cause."
      },
      {
        "name": "Nornkith",
        "replaces": "Key Ability Score; Stunning Fist; 1st, 10th-level Bonus Feat; Diamond Soul; Quivering Palm; Empty Body; Perfect Self",
        "summary": "Nornkith hone their bodies and minds to follow the branching threefold paths of fate."
      },
      {
        "name": "Ouat",
        "replaces": "Greed, Hatred, Defensive Training, Stonecunning, Weapon Familiarity (Dwarven Racial Traits); Stunning Fist; Wholeness of Body",
        "summary": "(Dwarf Only) The ascetic, desert-dwelling dwarves known as the Ouat have eschewed dwarven traditions, whose unchanging rigidity, they believe, shackles their people to the past and inhibits self-improvement."
      },
      {
        "name": "Perfect Scholar",
        "replaces": "Class Skills; Still Mind; Slow Fall; Tongue of the Sun and Moon; Perfect Self",
        "summary": "Perfect scholars, often worshipers of Irori, hone their minds and bodies through the accumulation of knowledge"
      },
      {
        "name": "Qinggong Monk",
        "replaces": "Slow Fall; High Jump; Wholeness of Body; Diamond Body; Abundant Step; Diamond Soul; Quivering Palm; Timeless Body; Tongue of the Sun and Moon; Empty Body; Perfect Self",
        "summary": "The qinggong monk is a master of her ki, using it to perform superhuman stunts or even blast opponents with supernatural energy."
      },
      {
        "name": "Sage Counciler",
        "replaces": "Class Skills; 1st, 2nd, 6th, 10th-level Bonus Feat; Ki Pool abilities",
        "summary": "Sage counselors are ascetics and mystics who leave the confines of the monastery walls to advise secular people about spiritual truths and to seek knowledge of the outside world."
      },
      {
        "name": "Scaled Fist",
        "replaces": "Bonus Feats; Still Mind; Maneuver Training; Quivering Palm",
        "summary": "Scaled fists eschew passive introspection in favor of unshakable confidence.\n\tSteeped in traditions that trace their origins to the warrior-monks who trained under the tutelage of draconic masters in Tian Xia, scaled fists eschew passive introspection in favor of unshakable confidence. Scaled fists learn to combine brutal intimidation with the brazen ferocity of an ancient wyrm to devastate their foes."
      },
      {
        "name": "Scarred Monk",
        "replaces": "Ki Pool; High Jump; Wholeness of Body; Abundant Step, Empty Body",
        "summary": "For monks who seek the truth hidden in pain, the practice of mortifications of the flesh helps to achieve enlightenment and acquire disturbing powers."
      },
      {
        "name": "Sensei",
        "replaces": "Flurry of Blows; Fast Movement; Improved Evasion; Evasion; 2nd, 6th, 12th, 18th-level Bonus Feats",
        "summary": "The sensei is a revered teacher who imparts lessons on the oneness of mind, body, and spirit, along with occasional correction that is subtle and swift."
      },
      {
        "name": "Serpent-Fire Adept",
        "replaces": "Class Skills; Stunning Fist; 1st, 2nd, 6th, 10th, 14th, and 18th-level Bonus Feats; Slow Fall; High Jump; Wholeness of Body",
        "summary": "A serpent-fire adept embraces the secrets of her chakras and mastery of their energetic flow."
      },
      {
        "name": "Sin Monk",
        "replaces": "Ki Pool; High Jump; Wholeness of Body; Abundant Step; Empty Body; Perfect Self",
        "summary": "{Ex-monk archetype) Martial experts who have allowed such passions to lead them astray may find themselves gaining powers drawn from their newly embraced sins."
      },
      {
        "name": "Sohei",
        "replaces": "Weapon/Armor Proficiency; Stunning Fist; Fast Movement; Increased Unarmed Damage; Slow Fall; Abundant Step; Purity of Body; Diamond Body; Quivering Palm; Timeless Body; Tongue of Sun and Moon",
        "summary": "The sohei are masters of the horse and the hunt."
      },
      {
        "name": "Spirit Master",
        "replaces": "Still Mind; Maneuver Training; Purity of Body; Wholeness of Body; Quivering Palm; Empty Body; Perfect Self",
        "summary": "Spirit masters are monks who specialize in combating the undead, laying their corpses to rest, and sending their souls to final judgment."
      },
      {
        "name": "Student of Stone",
        "replaces": "Evasion; Fast Movement; Bonus Feat; High Jump; Improved Evasion; Abundant Step",
        "summary": "(Oread Only) By following the path of the stone, students of stone give up much of monks’ mobility in favor of sheer resilience."
      },
      {
        "name": "Terra-Cotta Monk",
        "replaces": "Class Skills; Evasion; High Jump; Improved Evasion; Abundant Step; Quivering Palm; Empty Body",
        "summary": "Possessing a natural affinity for all things earthen, terracotta monks are experts at turning the stone around them against their enemies."
      },
      {
        "name": "Tetori",
        "replaces": "Bonus Feats; Flurry of Blows; Slow Fall; High Jump; Abundant Step; Improved Evasion; Timeless Body; Tongue of Sun and Moon; Diamond Soul; Empty Body",
        "summary": "The style of the tetori is that of the majestic wrestler—a warrior with a dizzying array of grabs, holds, and locks with which to bewilder and incapacitate his foes."
      },
      {
        "name": "Treetop Monk",
        "replaces": "Still Mind; Purity of Body; Abundant Step",
        "summary": "(Vanara Only) While many vanaras follow traditional monastic training and traditions, others learn to blend exotic combat and the mysterious forces of ki with the natural world, allowing them to move through trees and overgrowth to deliver devastating attacks."
      },
      {
        "name": "Underfoot Adept",
        "replaces": "1st-level Bonus Feat; Stunning Fist; High Jump",
        "summary": "(Halfling Only) An underfoot adept turns his diminutive stature and unorthodox footwork into a powerful weapon."
      },
      {
        "name": "Wanderer",
        "replaces": "Class Skills; 1st-level Bonus Feat; Still Mind; Slow Fall; High Jump; Wholeness of Body; Abundant Step; Diamond Soul",
        "summary": "(Human Only) Some monks wander the world in humility to learn and to share wisdom and philosophy from their teachers with those they meet, often aiding those who are in need."
      },
      {
        "name": "Wasteland Meditant",
        "replaces": "Stunning Fist; Evasion; Slow Fall; Improved Evasion; Quivering Palm",
        "summary": "Some monks journey to remote and isolated corners of the world to find serenity and a heightened sense of awareness."
      },
      {
        "name": "Water Dancer",
        "replaces": "Flurry of Blows; Stunning Fist; Quivering Palm; 1st, 2nd, 6th, 10th, 14th, and 18th-level Bonus Feats; Unarmed Strike; Evasion; Slow Fall; Improved Evasion; Abundant Step",
        "summary": "Water dancers derive their martial training from ancient nereid traditions jealously guarded by these enigmatic fey."
      },
      {
        "name": "Weapon Adept",
        "replaces": "Stunning Fist; Evasion; Improved Evasion; Timeless Body; Perfect Self",
        "summary": "While all monks train in both unarmed combat and with weapons, the weapon adept seeks to become one with his weapons, transforming them into perfect extensions of his own body."
      },
      {
        "name": "Wildcat",
        "replaces": "Still Mind; Ki Pool; High Jump; Slow Fall; Improved Evasion; Abundant Step; Diamond Soul; Empty Body",
        "summary": "A wildcat is a student of the school of hard knocks, who dedicates himself to learning how to take down foes by any means necessary."
      },
      {
        "name": "Windstep Master",
        "replaces": "Stunning Fist; Slow Fall; Ki Pool",
        "summary": "Most monks are agile and fleet of foot, but few can rival a windstep master’s lightness of step."
      },
      {
        "name": "Zen Archer",
        "replaces": "Stunning Fist; Evasion; Maneuver Training; Still Mind; Purity of Body; Improved Evasion; Diamond Body; Tongue of the Sun and the Moon",
        "summary": "The zen archer takes a weapon most other monks eschew and seeks perfection in the pull of a taut bowstring, the flex of a bow’s limbs, and the flight of an arrow fired true."
      }
    ]
  } ,
  
  { "name"       : "Ninja" ,
  
    "description": 
    [
      "When the wealthy and the powerful need an enemy eliminated quietly and without fail, they call upon the ninja. When a general needs to sabotage the siege engines of his foes before they can reach the castle walls, he calls upon the ninja. And when fools dare to move against a ninja or her companions, they will find the ninja waiting for them while they sleep, ready to strike. These shadowy killers are masters of infiltration, sabotage, and assassination, using a wide variety of weapons, practiced skills, and mystical powers to achieve their goals."
    ],
    
    "role": 
    [
      "The ninja spends almost all of her time honing her skills, practicing her art, or working on her next assignment. Even when not specifically working, the ninja is ever vigilant and ready for the situation to turn deadly. Her line of work earns her many enemies, but it is a list that she frequently reduces through assassination and misdirection. The ninja is an alternate class for the rogue core class."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Frozen Shadow",
        "replaces": "Class Skills; Ki Pool; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Frozen shadows belong to a rare ninja clan operating in Avistan and they work as thieves, power brokers, and spies loosely guided by secretive masters with unknown agendas."
      },
      {
        "name": "Gunpowder Bombardier",
        "replaces": "Ki Pool; 2nd-level Ninja Trick; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Ratfolk assassins and other ninjas with an affinity for gunpowder demonstrate masterful control of bombs, using the explosives to inflict major damage or impair their foes"
      },
      {
        "name": "Hunting Serpent",
        "replaces": "Class Skills; No Trace; Uncanny Dodge; Improved Uncanny Dodge; 10th, 12th, 16th-level Ninja Trick",
        "summary": "Hunting serpents are specially trained killers to that hunt relentlessly and fight from the shadows."
      },
      {
        "name": "Mask of the Living God",
        "replaces": "Weapon and Armor Proficiency; Poison Use; Ki Pool; No Trace",
        "summary": "When the Living God needs to silence the voices of those heretics who question too loudly, these enforcers are the tools he employs."
      }
    ]
  } ,
  
  { "name"       : "Occultist" ,
  
    "description": 
    [
      "The occultist focuses on the world around him, grounded in the powers that flow throughout his environment. He studies the magic that infuses everything, from psychic resonances left in everyday items to powerful incantations that fuel the mightiest spells.",
      "The occultist channels his psychic might through implements-items that allow him to focus his power and produce incredible effects. For him, implements are more than simple tools. They are a repository of history and a tie to the events of the past. The occultist uses these implements to inf luence and change the present, adding his legend to theirs. Though some of these implements might be magic items in their own right, most of them are merely of historical or personal significance to the occultist."
    ],
    
    "role": 
    [
      "Occultists are always eager to travel in the company of adventurers, explorers, and archaeologists, as those three groups of people have a knack for finding items with rich histories and great significance."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Ancestral Aspirant",
        "replaces": "Class Skills; Implements; Object Reading; Outside Contact",
        "summary": "It is common for a noble to possess a deep pride for his family’s past, but when such self-importance gives way to obsession, an ancestral aspirant is born."
      },
      {
        "name": "Battle Host",
        "replaces": "Class Skills; Weapon/Armor Proficiency; Implements; Mental Focus; Spellcasting; Implement Mastery; Magic Item Skill; Object Reading; Shift Focus; Magic Circles; Binding Circles; Fast Circles; Aura Sight; Outside Contact",
        "summary": "Well versed in military history, battlefield lore, and the occult, a battle host forms a supernatural bond with a chosen weapon, suit of armor, or shield, from which he can channel psychic energy to cast spells, conjure the spirit of the object’s former owner, increase his own physical might, and produce a number of other remarkable abilities."
      },
      {
        "name": "Curator",
        "replaces": "Implements; 3rd-level Focus Power; Shift Focus; Outsider Contact; Magic Circles; Binding Circles; Fast Circles",
        "summary": "Most occultists acquire and study antiques at a steady pace, learning new techniques one at a time. A lucky few join wealthy organizations replete with relics or inherit undocumented vaults full of historical treasures, and dabble in a wide variety of implements while mastering few"
      },
      {
        "name": "Esoteric Initiate",
        "replaces": "Mental Focus; Implements; Shift Focus; Aura Sight",
        "summary": "While most occultists learn to draw power from a variety of implements and objects, esoteric initiates have focused their study entirely on items of antiquity connected to the teachings of the Esoteric Order of the Palatine Eye, believing such items to be more powerful than mundane items."
      },
      {
        "name": "Geomancer",
        "replaces": "Class Skills; Mental Focus; Implements; Magic Item Skill; Aura Sight; 7th and 13th-level Focus Powers",
        "summary": "A geomancer studies every type of land, deriving power from the differences between types of terrain."
      },
      {
        "name": "Haunt Collector",
        "replaces": "Implements; Aura Sight; Outside Contact; Magic Circles; Binding Circles; Fast Circles",
        "summary": "Haunt collectors use items haunted by their former owners to create ghostly presences imbued with psychic power."
      },
      {
        "name": "Naturalist",
        "replaces": "Class Skills; Mental Focus; Magic Circles; Fast Circles; Outside Contact; Binding Circles",
        "summary": "A naturalist eschews the contact with outsiders that other occultists use as the core of their work. Instead, he attunes his mind to the natural spirits that exist everywhere, just out of sight for the unawakened mind."
      },
      {
        "name": "Necroccultist",
        "replaces": "Implements; Implement Mastery; Object Reading; Aura Sight; Outside Contact",
        "summary": "Necroccultists’ fascination with death and the undead drives them to explore the forbidden necromantic arts as they search for secrets they can use to manipulate the natural cycle of life and death."
      },
      {
        "name": "Occult Historian",
        "replaces": "Object Reading; Aura Sight; 3rd-level Focus Power; Outside Contact 2, 3, and 4",
        "summary": "Many wilderness areas contain the remnants of ancient civilizations, with some waiting to be discovered and some held by fierce monsters or devious cults. An occult historian seeks these ruins not only for their esoteric artifacts but also to learn the structures’ secrets."
      },
      {
        "name": "Panoply Savant",
        "replaces": "Shift Focus; Outside Contact; Magic Circles; Binding Circles; Fast Circles",
        "summary": "Some occultists specialize in a particular panoply, fully dedicating themselves to mastering the secrets of the psychic resonance of each of its component implements, as well as the way they interact with one another."
      },
      {
        "name": "Psychodermist",
        "replaces": "Class Skills; Implements; Magic Item Skill; Object Reading; Aura Sight; Outside Contact; Binding Circles; Fast Circles",
        "summary": "Rather than tapping the psychic energy residing within esoteric items, psychodermists form supernatural bonds with trophies taken from creatures they have slain. Through these mementos, these occultists manifest not only their own magic, but also the unique powers of their fallen foes."
      },
      {
        "name": "Reliquarian",
        "replaces": "Weapon Proficiencies; Spells; Focus Powers; Implements; Knacks; Mental Focus",
        "summary": "Not all occultists derive their power from psychic impressions left on objects. Some find faith first, and draw out the divine potential in religious relics."
      },
      {
        "name": "Secret Broker",
        "replaces": "Class Skills; Implements; Implement Mastery; Magic Item Skill; Shift Focus; Magic Circles; Binding Circles; Fast Circles",
        "summary": "Whether as spymasters, extortionists, political fixers, or puppet masters, secret brokers use their talents with objects to gain information, then leverage that information for their own purposes."
      },
      {
        "name": "Sha'ir",
        "replaces": "Implements; Mental Focus; Spellcasting; Implement Mastery; Magic Item Skill; Object Reading; Aura Sight; Outside Contact",
        "summary": "Sha’irs delve into the occult not through power over objects but instead via their connection with minor servitor genies from the elemental planes."
      },
      {
        "name": "Silksworn",
        "replaces": "Spellcasting; Class Skills; Knacks; Implements; Weapon and Armor Proficiency; Outside Contact; Magic Circles; Binding Circles; Fast Circles; Implement Mastery",
        "summary": "Silksworn draw their power from wearing luxurious garments and can be found in many noble courts throughout Golarion"
      },
      {
        "name": "Talisman Crafter",
        "replaces": "Implements; Magic Item Skill; Object Reading; Shift Focus; Aura Sight; 5th, 17th-level Focus Powers",
        "summary": "Talisman crafters specialize- in the creation of seals, constructing master talismans to use as implements and inscribing wards with esoteric geometry."
      },
      {
        "name": "Tome Eater",
        "replaces": "Implements; Mental Focus; Spellcasting; Implement Mastery; Shift Focus; 6th-level Implement; Magic Circles; Outside Contact; Binding Circles; Fast Circles; Aura Sight",
        "summary": "Tome eaters have learned how to tap into the latent psychic energy of the written word by physically devouring books and scrolls to create magical effects and gain mystical insights."
      }
    ]
  } ,
  
  { "name"       : "Oracle" ,
    
    "description": 
    [
      "Although the gods work through many agents, perhaps none is more mysterious than the oracle. These divine vessels are granted power without their choice, selected by providence to wield powers that even they do not fully understand. Unlike a cleric, who draws her magic through devotion to a deity, oracles garner strength and power from many sources, namely those patron deities who support their ideals. Instead of worshiping a single source, oracles tend to venerate all of the gods that share their beliefs. While some see the powers of the oracle as a gift, others view them as a curse, changing the life of the chosen in unforeseen ways."
    ],
    
    "role": 
    [
      "Oracles do not usually associate with any one church or temple, instead preferring to strike out on their own, or with a small group of like-minded individuals. Oracles typically use their spells and revelations to further their understanding of their mystery, be it through fighting mighty battles or tending to the poor and sick."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Ancient Lorekeeper",
        "replaces": "Mystery Bonus Skills; 4th, 6th, 8th, 10th, 12th, 14th, 16th, and 18th-level Bonus Spells",
        "summary": "(Elf Only) The ancient lorekeeper is a repository for all the beliefs and vast knowledge of an elven people."
      },
      {
        "name": "Black-Blooded Oracle",
        "replaces": "Oracle’s Curse",
        "summary": "The black-blooded oracle has been infused with the eerie influence of strange fluids that seep from the rock in the deepest pits of the Darklands, the so-called Black Blood of Orv."
      },
      {
        "name": "Community Guardian",
        "replaces": "Mystery Class Skills; 2nd, 4th, 6th, 10th, 12th level Mystery Bonus Spells; 1st, 3rd-level Revelations",
        "summary": "(Halfling Only) The community guardian is chosen to protect and succor the weak and innocent within her community."
      },
      {
        "name": "Cyclopean Seer",
        "replaces": "Class Skills; Curse; Bonus Spells; 1st and 7th-level Revelations; Final Revelation",
        "summary": "A cyclopean seer draws power from the mysterious prophetic abilities of ancient giants."
      },
      {
        "name": "Divine Numerologist",
        "replaces": "10th, 12th, 14th, 16th, 18th-level Mystery Bonus Spells; 1st, 7th-level Revelation; Final Revelation",
        "summary": "Divine numerologists use esoteric mathematics and numbers traditions to peer into the past and future and extract meaningful portents."
      },
      {
        "name": "Dual-Cursed Oracle",
        "replaces": "Oracle’s Curse; Mystery Class Skills; Mystery Bonus Spells",
        "summary": "All oracles are cursed to some degree, but some oracles bear an even heavier burden."
      },
      {
        "name": "Elementalist Oracle",
        "replaces": "4th, 6th, 8th, 10th ,12th, 18th-level Mystery Bonus Spells; 1st, 11th-level Revelation; Final Revelation",
        "summary": "An elementalist oracle has an affinity with the elements and elemental creatures. She can communicate with elemental creatures, and can eventually become an elemental herself."
      },
      {
        "name": "Enlightened Philosopher",
        "replaces": "Mystery Class Skills; Mystery Bonus Spells; 7th-level Revelation; Final Revelation",
        "summary": "The enlightened philosopher seeks enlightenment through compassion, moderation, and humility."
      },
      {
        "name": "Hermit",
        "replaces": "Mystery; Curse; 2nd, 8th, 12th, 16th-level Bonus Spells; 1st, 7th-level Revelation",
        "summary": "A hermit is a recluse who gained her oracular powers from isolation in a deep desert, on a mountain peak, or in another secluded location."
      },
      {
        "name": "Inerrant Voice",
        "replaces": "2nd, 4th, 8th, 14th-level Bonus Spells; 3rd-level Revelation",
        "summary": "An inerrant voice serves as a spiritual advisor to either a monarch or noble."
      },
      {
        "name": "Keleshite Prophet",
        "replaces": "Mystery Skills; 6th, 10th, 12th, 16th, 18th-level Bonus Spells; 1st-level Revelation",
        "summary": "Keleshite prophets help guide and serve the vast Padishah Empire of Kelesh and its interests across Golarion."
      },
      {
        "name": "Ocean's Echo",
        "replaces": "Mystery Bonus Skills; 4th, 8th, 10th, 12th, 14th-level Bonus Spells; 1st, 3rd, 15th-level Revelation",
        "summary": "Although many merfolk claim deep connections to both art and the natural world, a rare few merfolk can manipulate the forces of nature and weave them into song."
      },
      {
        "name": "Pei Zin Practitioner",
        "replaces": "Mystery Class Skills; 1st-level Revelation",
        "summary": "In distant Tian Xia, herbalists practice an obscure alchemical art known as Pei Zin herbalism, which involves medicinal and restorative techniques that are used throughout much of that continent."
      },
      {
        "name": "Planar Oracle",
        "replaces": "Mystery Bonus Spells; 3rd-level Revelation; Final Revelation",
        "summary": "A planar oracle has an affinity with one of the Outer Planes."
      },
      {
        "name": "Possessed Oracle",
        "replaces": "Oracle’s Curse; Mystery Bonus Spells; 1st-level Revelation",
        "summary": "Some oracles are possessed by spirits, demons, or similar beings."
      },
      {
        "name": "Psychic Searcher",
        "replaces": "Bonus Spells; 2nd-level Mystery Spell; 3rd-level Revelation",
        "summary": "A psychic searcher is devoted to revealing the hidden within the world around her by sensing and communing with residual mental energy, haunts, and fragments of living spirits that can dwell in objects or rooms."
      },
      {
        "name": "Purifier",
        "replaces": "Bonus Spells; Spellcasting; 3rd, 7th, 11th-level Revelation",
        "summary": "(Aasimar Only) The purifier seeks out signs of possession or mind control that manifest from unwilling (and often unwitting) servants for fiendish corruptors and their mortal minions."
      },
      {
        "name": "Reincarnated Oracle",
        "replaces": "Oracle’s Curse; Bonus Spells; 1st, 3rd, or 7th-level Revelations (must pick two)",
        "summary": "(Samsaran Only) A reincarnated oracle draws her knowledge and power from the experiences of her previous lives."
      },
      {
        "name": "River Soul",
        "replaces": "Class Skills; 2nd, 6th, 8th, 10th ,18th-level Mystery Bonus Spells; Oracle's Curse; 1st, 11th-level Revelation; Final Revelation",
        "summary": "River soul oracles derive their powers from their bonds with rivers, whether these waterways are rapid cascades or lazy channels plied by boats."
      },
      {
        "name": "Seeker",
        "replaces": "Mystery Class Skills, 3rd-level Revelation, 15th-level Revelation",
        "summary": "The seeker is obsessed with learning about their heritage and history, researching ancient texts and obscure ruins for clues."
      },
      {
        "name": "Seer",
        "replaces": "Mystery Bonus Spells; 1st-level Revelation; 3rd-level Revelation",
        "summary": "While all oracles possess some ability at divination, the seer is a true prophet, able to see things as they really are, or will be."
      },
      {
        "name": "Shigenjo",
        "replaces": "Class Skills; Bonus Spells; 7th-level Revelation; Final Revelation",
        "summary": "(Tengu Only) The shigenjo walks the path of enlightenment and transcendence by seeking oneness with the celestial spirits."
      },
      {
        "name": "Spirit Guide",
        "replaces": "Class Skills; 3rd, 7th, and 15th-level Revelations",
        "summary": "Through her exploration of the universe’s mysteries, a spirit guide opens connections to the spirit world and forms bonds with the entities that inhabit it."
      },
      {
        "name": "Stargazer",
        "replaces": "Mystery Bonus Spells; 1st-level Revelation; 7th-level Revelation",
        "summary": "Some oracles seek meaning in the pattern of the stars across the night sky, the trails of comets, and the eternal orbits of the planets."
      },
      {
        "name": "Tree Soul",
        "replaces": "Class Skills; Weapon and Armor Proficiency; 2nd, 10th, 12th, 14th, 16th, 18th-level Mystery Bonus Spells; Oracle's Curse; 1st, 11th-level Revelation; Final Revelation",
        "summary": "Tree souls develop an affinity not just with trees but also with objects carved from them, feeling the essence of the tree’s spirit living within."
      },
      {
        "name": "Warsighted",
        "replaces": "1st, 7th, 11th, and 15th-level Revelations",
        "summary": "A warsighted’s unique gifts are not in strange magical revelations, but in her ability to adapt in the midst of a battle with new fighting techniques."
      }
    ]
  } ,
  
  { "name"       : "Paladin" ,
    
    "description": 
    [
      "Through a select, worthy few shines the power of the divine. Called paladins, these noble souls dedicate their swords and lives to the battle against evil. Knights, crusaders, and law-bringers, paladins seek not just to spread divine justice but to embody the teachings of the virtuous deities they serve. In pursuit of their lofty goals, they adhere to ironclad laws of morality and discipline. As reward for their righteousness, these holy champions are blessed with boons to aid them in their quests: powers to banish evil, heal the innocent, and inspire the faithful. Although their convictions might lead them into conflict with the very souls they would save, paladins weather endless challenges of faith and dark temptations, risking their lives to do right and fighting to bring about a brighter future."
    ],
    
    "role": 
    [
      "Paladins serve as beacons for their allies within the chaos of battle. While deadly opponents of evil, they can also empower goodly souls to aid in their crusades. Their magic and martial skills also make them well suited to defending others and blessing the fallen with the strength to continue fighting."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Banishing Warden",
        "replaces": "Class Skills; 3rd-level Mercy",
        "summary": "The banishing warden is an expert at fighting all types of evil outsiders and sending them back to their native planes."
      },
      {
        "name": "Chosen One",
        "replaces": "Divine Bond; Class Skills; Divine Grace; Smite Evil; Lay on Hands; Channel Positive Energy",
        "summary": "Most paladins train for years at a temple to attain a holy status, but rarely, an emissary of the divine appears to one of humble origins and calls her directly to the charge."
      },
      {
        "name": "Combat Healer Squire",
        "replaces": "Detect Evil; Divine Grace; Divine Health",
        "summary": "The combat healer squire is always ready with bandages and potions."
      },
      {
        "name": "Divine Defender",
        "replaces": "Mercy; Divine Bond",
        "summary": "Some paladins see themselves as the last line of defense between the teeming hordes of evil and the innocent folk trying to make a living in a harsh, unforgiving world."
      },
      {
        "name": "Divine Guardian",
        "replaces": "Spellcasting; Detect Evil; Lay on Hands; Aura of Courage",
        "summary": "The divine guardian devotes herself to the protection and guardianship of one creature at a time, be that her liege lord, an allied cleric, or an innocent facing overwhelming danger at the hands of evil."
      },
      {
        "name": "Divine Hunter",
        "replaces": "Heavy Armor Proficiency; Aura of Courage; Divine Bond; 6th-level Mercy; Aura of Resolve; Aura of Justice; Aura of Righteousness",
        "summary": "The divine hunter prefers to engage evil from afar, striking down her foes before they can threaten her allies."
      },
      {
        "name": "Dusk Knight",
        "replaces": "Class Skills; Smite Evil; Channel Positive Energy; Divine Bond; Aura of Resolve; Aura of Justice",
        "summary": "Some paladins focus their training to combat the shadows and use darkness to their advantage."
      },
      {
        "name": "Empyreal Knight",
        "replaces": "Divine Grace; Mercy; Lay on Hands; Channel Positive Energy; Divine Bond; Holy Champion",
        "summary": "The empyreal knight dedicates her life to serving the celestial beings that guide mortals in their struggle toward the light."
      },
      {
        "name": "Faithful Wanderer",
        "replaces": "Class Skills; Detect Evil; Aura of Good; Aura of Justice; Aura of Courage; Aura of Resolve; Aura of Faith; Aura of Righteousness; Smite Evil; Divine Bond; Holy Champion",
        "summary": "A faithful wanderer is self-sufficient and unobtrusive and learns to pick her battles carefully, lest her mission end abruptly in a blaze of glory"
      },
      {
        "name": "Forest Preserver",
        "replaces": "Class Skills; Aura of Courage; Divine Health; Channel Positive Energy; Aura of Resolve; Aura of Justice; Aura of Faith",
        "summary": "Forest preservers are sacred defenders of the woodlands and of the wild creatures and natural beauty within them."
      },
      {
        "name": "Ghost Hunter",
        "replaces": "Smite Evil; 6th and 9th-level Mercies",
        "summary": "Ghost hunters devote their lives to eliminating malevolent spirits and putting them to rest."
      },
      {
        "name": "Gray Paladin",
        "replaces": "Alignment Restiriction; Code of Conduct; Aura of Good; Class Skills; Smite Evil; Divine Grace; Aura of Courage; Aura of Resolve; Aura of Rightousness; Divine Health; Channel Positive Energy; Aura of Justice",
        "summary": "Gray paladins have discovered that in a world of intrigue, a strict code of honor hinders their options"
      },
      {
        "name": "Holy Guide",
        "replaces": "Class Skills; 3rd and 6th-level Mercies",
        "summary": "A holy guide believes that it’s his sacred calling to clear the roads of bandits between towns as well as to escort travelers to safety."
      },
      {
        "name": "Holy Gun",
        "replaces": "Weapon/Armor Proficiency; Detect Evil; Smite Evil; Divine Bond",
        "summary": "Not all paladins are knights in shining armor. Holy guns roam the world searching for evil. And where they find it, they put it down."
      },
      {
        "name": "Holy Tactician",
        "replaces": "Smite Evil; Divine Health; Divine Bond; Aura of Courage; Aura of Resolve; Aura of Justice; Holy Champion",
        "summary": "The holy tactician inspires her allies on the field of battle."
      },
      {
        "name": "Hospitaler",
        "replaces": "Smite Evil; Channel Positive Energy; Aura of Justice",
        "summary": "Paladins are known for their charity and for tending to the sick. The hospitaler takes to this calling above all others, spending much of her time healing the poor, and giving aid and succor to those in need."
      },
      {
        "name": "Hunting Paladin",
        "replaces": "Class Skills; Armor Proficiencies; Smite Evil; Detect Evil; Spells; Aura of Resolve",
        "summary": "Hunting paladins are tenacious trackers and stealthy stalkers in pursuit of evildoers."
      },
      {
        "name": "Invigorator",
        "replaces": "Smite Evil; Aura of Justice; Holy Champion",
        "summary": "Invigorators devote themselves to keeping their allies bodily whole by bolstering their health and spirits."
      },
      {
        "name": "Iomedaen Enforcer",
        "replaces": "Class Skills; Detect Evil; Smite Evil; Aura of Faith; Aura of Righteousness; Holy Champion",
        "summary": "Iomedaean enforcers have altered abilities that allow them to stand against the forces of chaos."
      },
      {
        "name": "Iroran Paladin",
        "replaces": "Class Skills; Weapon/Armor Proficiency; Aura of Good; Detect Evil; Smite Evil; Aura of Courage; Channel Positive Energy; Divine Bond; Aura of Justice",
        "summary": "Iroran paladins meditate on self-perfection and train relentlessly, knowing that their example can inspire others to excel."
      },
      {
        "name": "Knight of Coins",
        "replaces": "Class Skills; Skill Ranks; Detect Evil; 3rd, 9th, 15th-level Mercy",
        "summary": "Knights of coins promote fair trade and stable commerce between cities and between nations."
      },
      {
        "name": "Kraken Slayer",
        "replaces": "Smite Evil; Divine Health; Divine Bond; Aura of Faith",
        "summary": "Triton kraken slayers oppose all underwater threats, but they especially target the tentacled monstrosities called krakens."
      },
      {
        "name": "Legate",
        "replaces": "Mercy",
        "summary": "Though they hold to the same strict paladin code, legates present themselves not as armed crusaders, but as peaceful envoys and advisors, bringing wisdom garnered from the long, stable history of their nation."
      },
      {
        "name": "Martyr",
        "replaces": "Smite Evil; Divine Grace; Aura of Courage; Aura of Resolve; Aura of Righteousness; Divine Health; Lay on Hands; Mercy",
        "summary": "Martyrs shoulder the blackest suffering of the world onto themselves in order to help others and inspiring their allies to achieve heights of valor rather than seeking the glory for themselves."
      },
      {
        "name": "Mind Sword",
        "replaces": "Lay on Hands; Mercy; Channel Positive Energy",
        "summary": "Veterans of mystical battles against demons of the Worldwound, mind swords merge psychic and divine power, probing and cleansing minds while their telekinetic blades cleave demonic flesh."
      },
      {
        "name": "Pearl Seeker",
        "replaces": "Armor Proficiency; Class Skills; Detect Evil; Aura of Courage; Aura of Resolve; Spells; Divine Bond; Channel Energy",
        "summary": "Some paladins are called to their faith by strange empathic visions and dreams that beckon them to the oceans and beyond."
      },
      {
        "name": "Redeemer",
        "replaces": "Smite Evil; Detect Evil; Aura of Resolve; Aura of Justice",
        "summary": "(Half-Orc Only) As most half-orcs are outcasts, a half-orc paladin recognizes that often those who are monstrous are not necessarily evil and that sometimes even those who are evil became that way because of circumstances and misfortune."
      },
      {
        "name": "Sacred Servant",
        "replaces": "Smite Evil; Divine Bond; Aura of Resolve",
        "summary": "Paladins as a general rule, venerate the gods of good and purity, but some take this a step further, dedicating themselves to a specific deity and furthering the cause of the faith."
      },
      {
        "name": "Sacred Shield",
        "replaces": "Smite Evil; Channel Positive Energy; Divine Bond; Aura of Justice; Holy Champion",
        "summary": "When faced by evil, the sacred shield reaches first not for a weapon, but for her trusty shield. With her faith, she can ward others from harm."
      },
      {
        "name": "Scion of Talmandor",
        "replaces": "Class Skills; Divine Grace; Divine Bond; Aura of Resolve; Aura of Justice",
        "summary": "A scion of Talmandor serve by offering assistance to the oppressed and facilitating the peaceful transfer of power from the few to the many."
      },
      {
        "name": "Shining Knight",
        "replaces": "Divine Health; Aura of Justice",
        "summary": "While paladins often are seen mounted atop a loyal steed, the shining knight is the true symbol of mounted bravery."
      },
      {
        "name": "Silver Champion",
        "replaces": "Divine Bond; Channel Energy; Aura of Justice; Aura of Righteousness; Spells",
        "summary": "Drake-riding paladins who serve as priests of Apsu."
      },
      {
        "name": "Soul Sentinel",
        "replaces": "6th, 12th-level Mercy; Aura of Justice",
        "summary": "Soul sentinels use the strength of their resolve to stem the tide of corruption and insanity, as they believe that the greatest tragedy is a soul lost to evil when it was within their power to save it."
      },
      {
        "name": "Stonelord",
        "replaces": "Smite Evil; Divine Grace; 3rd, 9th, 12th, 15th, 18th-level Mercies; Spells; Channel Positive Energy; Divine Bond; Aura of Justice; Holy Champion",
        "summary": "(Dwarf Only) A stonelord is a devoted sentinel of dwarven enclaves, drawing the power of the earth and ancient stone to protect her people."
      },
      {
        "name": "Sword of Valor",
        "replaces": "Divine Grace; 6th-level Mercy; Aura of Justice",
        "summary": "A paladin who chooses to follow in Iomedae's footsteps can become a sword of valor."
      },
      {
        "name": "Tempered Champion",
        "replaces": "Spellcasting",
        "summary": "Tempered champions are trained in the Tempering Hall in Absalom to master their deities’ favored weapons."
      },
      {
        "name": "Temple Champion",
        "replaces": "Spells; Divine Bond; Aura of Justice",
        "summary": "A temple champion is a powerful warrior dedicated to a good or lawful deity. She thinks of herself primarily as a servant of her deity and secondarily as an agent of her deity’s church."
      },
      {
        "name": "Tortured Crusader",
        "replaces": "Key Ability Score; Skills; Detect Evil; Divine Grace; Smite Evil; Lay on Hands; Channel Energy; Divine Bond; Aura of Courage; Aura of Resolve; Aura of Faith; Aura of Righteousness; Aura of Justice ; Lay on Hands",
        "summary": "Though tortured crusaders may be beaten and battered, body, mind, and soul, they still somehow continue through torment and hardship. Despite setbacks and impossible odds, they shine like candles even in the darkest times"
      },
      {
        "name": "Tranquil Guardian",
        "replaces": "Smite Evil; Aura of Courage; Divine Bond; Aura of Resolve; Aura of Justice; Holy Champion",
        "summary": "(Aasimar Only) A tranquil guardian is a missionary of peace and tranquility, a soothing voice of succor in a violent and dangerous world."
      },
      {
        "name": "Undead Scourge",
        "replaces": "Aura of Resolve; Aura of Justice",
        "summary": "Undead are an abomination in the eyes of the just and righteous. It is no surprise then that there are some paladins that dedicate themselves to wiping these unholy terrors from the world."
      },
      {
        "name": "Vindictive Bastard",
        "replaces": "Aura; Detect Evil; Smite Evil; Divine Grace; Lay on Hands; Divine Health; Mercy; Channel Energy; Divine Bond; Aura of Justice; Aura of Faith; Aura of Righteousness; Holy Champion",
        "summary": "{Ex-paladin archetype) A vindictive bastard is a paladin that strikes out for retribution and revenge, far more interested in tearing down those who have harmed her or her companions than furthering a distant deity’s cause."
      },
      {
        "name": "Virtuoso Bravo",
        "replaces": "Armor Proficiency; Smite Evil; Mercy; Spellcasting",
        "summary": "Virtuous bravos rely on their wit and grace rather than might and strong armor."
      },
      {
        "name": "Warrior of the Holy Light",
        "replaces": "Spellcasting; Aura of Faith",
        "summary": "Some paladins use their gifts to focus on the holy light that shines within their souls."
      },
      {
        "name": "Wilderness Warden",
        "replaces": "Class Skills; Divine Grace; Smite Evil; Aura of Courage; 3rd, 9th, 15th-level Mercy; Spells; Aura of Resolve; Aura of Justice",
        "summary": "Wilderness wardens are vigilant guardians of natural places of all kinds, from mountain peaks to tangled thickets."
      }
    ]
  } ,
  
  { "name"       : "Psychic" ,
    
    "description": 
    [
      "Within the mind of any sentient being lies power to rival that of the greatest magical artifact or holy site. By accessing these staggering vaults of mental energy, the psychic can shape the world around her, the minds of others, and pathways across the planes. No place or idea is too secret or remote for a psychic to access, and she can pull from every type of psychic magic. Many methods allow psychics to tap into their mental abilities, and the disciplines they follow affect their abilities."
    ],
    
    "role": 
    [
      "With a large suite of spells, psychics can handle many situations, but they excel at moving and manipulating objects, as well as reading and influencing thoughts."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Amnesiac",
        "replaces": "Spellcasting",
        "summary": "The amnesiac once possessed great psychic power, but mental blocks—resulting from either a traumatic event or intentional implantation—have caused her to forget what she knew before"
      },
      {
        "name": "Formless Adept",
        "replaces": "Phrenic Pool; Psychic Discipline; Discipline Powers; 1st and 15th-level Phrenic Amplification; Discipline Spells; Remade Self",
        "summary": "Formless adepts master their psychic powers to unshackle themselves from the confines of the flesh and empower their spellcasting."
      },
      {
        "name": "Mutation Mind",
        "replaces": "1st-level Phrenic Amplification; Phrenic Amplifications; Major Amplifications",
        "summary": "Exposure to unintended spell effects, curses, or sources of radiation cause some to manifest psychic powers. When a mutation mind uses her psychic abilities, her physical body changes under the stress, and she risks losing control if she pushes too far."
      },
      {
        "name": "Psychic Duelist",
        "replaces": "4th-level Discipline Spell; 7th-level Phrenic Amplification; Phrenic Amplifications; Telepathic Bond; Telepathy",
        "summary": "Psychic duelists hone their mental powers for combat, much as warriors do with their blades."
      },
      {
        "name": "Psychic Marauder",
        "replaces": "Alignment; Detect Thoughts; 3rd, 11th, 19th-level Phrenic Amplification; Telepathic Bond; Remade Self",
        "summary": "The psychic marauder’s powers come hand in hand with madness, either from exposure to alien psyches or from terrifying glimpses into the cosmos that the psychic can’t suppress."
      },
      {
        "name": "Terror Weaver",
        "replaces": "Detect Thoughts; Telepathic Bond; 11th, 15th, 19th-level Phrenic Amplifications",
        "summary": "A number of exceptional Darklands half-orcs have developed potent psychic abilities, unlocked by generations of exposure to a specific combination of mind-altering fungi and radiation"
      }
    ]
  } ,
  
  { "name"       : "Ranger" ,
    
    "description": 
    [
      "For those who relish the thrill of the hunt, there are only predators and prey. Be they scouts, trackers, or bounty hunters, rangers share much in common: unique mastery of specialized weapons, skill at stalking even the most elusive game, and the expertise to defeat a wide range of quarries. Knowledgeable, patient, and skilled hunters, these rangers hound man, beast, and monster alike, gaining insight into the way of the predator, skill in varied environments, and ever more lethal martial prowess. While some track man-eating creatures to protect the frontier, others pursue more cunning game—even fugitives among their own people."
    ],
    
    "role": 
    [
      "Rangers are deft skirmishers, either in melee or at range, capable of skillfully dancing in and out of battle. Their abilities allow them to deal significant harm to specific types of foes, but their skills are valuable against all manner of enemies."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Abendego Diver",
        "replaces": "Weapon and Armor Proficiencies; Track; Wild Empathy; Favored Terrain; Woodland Stride; Swift Tracker; Master Hunter",
        "summary": "Named for the vicious and unending storm in the southern Arcadian Ocean, Abendego divers have pushed their bodies to their limits, holding their breath to expand their lung capacity and swimming until ocean travel is second nature to them."
      },
      {
        "name": "Battle Scout",
        "replaces": "Hunter’s Bond; 2nd, 3rd, 4th Favored Enemies; Master Hunter",
        "summary": "Though regular outdoorsmen might suffice in many cases, some large forces look to battle scouts to keep the body of their troops safe and prepared for the terrain and whatever dangers that terrain hides."
      },
      {
        "name": "Beast Master",
        "replaces": "Hunter's Bond; 6th-level Combat Style Feat; Camouflage",
        "summary": "Some rangers, particularly those in primitive lands or who were raised by animals, have unusually strong bonds with animals."
      },
      {
        "name": "Blightwarden",
        "replaces": "Favored Enemy; Wild Empathy; 1st Favored Terrain; Endurance;",
        "summary": "Some rangers feel so closely connected to their homelands that they stand as guardians against pervasive corruptions that pervert those lands beyond the point of recognition."
      },
      {
        "name": "Bow Nomad",
        "replaces": "Wild Empathy; Combat Style; Favored Terrain; 6th-level Combat Feat; Camouflage; Hide in Plain Sight",
        "summary": "(Kasatha Only) Thanks to their four arms, kasathas can master a combat form native to their home world and rarely witnessed on Golarion—wielding two bows at once."
      },
      {
        "name": "Cinderwalker",
        "replaces": "1st Favored Terrain; Wild Empathy; Hunter’s Bond; Woodland Stride",
        "summary": "Cinderwalkers traverse burning wastelands and restless mountains, thriving in lands most creatures avoid."
      },
      {
        "name": "Code Runner",
        "replaces": "Class Skills; Wild Empathy; Hunter's Bond",
        "summary": "A code runner specializes in the subtle and speedy transfer of secret messages."
      },
      {
        "name": "Corpse Hunter",
        "replaces": "Class Skills; Spells; Favored Enemies; Woodland Stride; Swift Tracker",
        "summary": "Many rangers count the undead among their favored enemies, but some make a full-time job out of hunting down and destroying these walking corpses."
      },
      {
        "name": "Dandy",
        "replaces": "Class Skills; Favored Enemy; Wild Empathy; Favored Terrain; Hunter's Bond; Spellcasting; Woodland Stride",
        "summary": "The antithesis of the gruff and wild woodsmen, a dandy takes effort to master the subtle etiquette of noble courts, the whispers of dark rumors, and the customs of the cultured world."
      },
      {
        "name": "Darklands Sailor",
        "replaces": "Track; Favored Terrain; Woodland Stride; Swift Tracker; Camouflage; Hide in Plain Sight",
        "summary": "Those plying the lightless waters of the Darklands learn to use sound to augment their compromised vision, providing insight into the hazards lurking below the surface."
      },
      {
        "name": "Deep Walker",
        "replaces": "Favored Terrain; Woodland Stride; Camouflage; Hide in Plain Sight",
        "summary": "Some rangers devote their lives to the woods, becoming hunters, protectors, and wilderness guides among its diverse terrain types."
      },
      {
        "name": "Divine Tracker",
        "replaces": "Alignment; Wild Empathy; Hunter’s Bond",
        "summary": "Blessed by his deity, a divine tracker hunts down those he deems deserving of his retribution."
      },
      {
        "name": "Dragon Hunter",
        "replaces": "Class Skills; Track; 5th, 10th, 15th, 20th-level Favored Enemies",
        "summary": "The quintessential dragonslayers, dragon hunters are\n experts at forging through the wilds in search of great\n wyrms."
      },
      {
        "name": "Drake Warden",
        "replaces": "Hunter's Bond; 2nd Favored Enemy; Swift Tracker",
        "summary": "Some rangers specialize in dealing with rambunctious younger drakes and thanks to their methods, their drakes are both fiercely loyal and extremely useful for scouting and stealth missions."
      },
      {
        "name": "Dungeon Rover",
        "replaces": "Class Skills; Track; Wild Empathy; Hunter’s Bond; Woodland Stride; Swift Tracker",
        "summary": "These rangers specialize in surviving hostile subterranean environs. They are well equipped to avoid traps, spot secret passages, and deal with inimical dungeon tenants."
      },
      {
        "name": "Dusk Stalker",
        "replaces": "Class Skills; Favored Terrain; Hunter’s Bond; Camouflage",
        "summary": "(Fetchling Only) Hunters and guides through the Shadow Plane, dusk stalkers are rangers that thrive in shadow."
      },
      {
        "name": "Elemental Envoy",
        "replaces": "Combat Style; Favored Terrain",
        "summary": "An elemental envoy travels the Elemental Planes. He has learned to protect himself from their many dangers, and he models his fighting style after their teachings."
      },
      {
        "name": "Falconer",
        "replaces": "Wild Empathy; Hunter’s Bond; 6th-level Combat Style Feat",
        "summary": "Rangers have always enjoyed a special bond with a specific animal, but the falconer takes this bond to a deeper level."
      },
      {
        "name": "Flamewarden",
        "replaces": "Hunter's Bond; Spells; Evasion; Camouflage; Improved Evasion; Master Hunter",
        "summary": "Emulating the blazing phoenix, flamewardens sweep through the world like a selective forest fire, burning away corruption, evil, and those who cling to decay."
      },
      {
        "name": "Fortune-Finder",
        "replaces": "Track; Hunter's Bond; Woodland Stride; Quarry; Improved Quarry; Master Hunter",
        "summary": "Vanaras often leave home to seek fortune and sate their curiosity regarding the mysterious lands that lie beyond their native territories. The most skilled of these thrillseekers are called ba-sadhaks, or fortune-finders."
      },
      {
        "name": "Freebooter",
        "replaces": "Favored Enemy; Hunter's Bond; Woodland Stride",
        "summary": "A freebooter is a natural leader, a pirate who works well with a variety of people and in a variety of roles."
      },
      {
        "name": "Galvanic Saboteur",
        "replaces": "Class Skills; Favored Enemy; Wild Empathy; Favored Terrain; Woodland Stride; Swift Tracker; Camouflage; Hide in Plain Sight",
        "summary": "Many Kellid locals blame Kevoth-Kul’s change on the influence of the Technic League and view both the League and their mechanical minions with a mix of fear and distrust. Some Kellid rangers have since developed skills to defeat the League’s robotic enforcers and devious arcanists."
      },
      {
        "name": "Groom",
        "replaces": "Track; Endurance; 1st Favored Terrain",
        "summary": "The groom attends to the needs of the party’s mounts and beasts of burden during their adventures, and guards these animals while the party goes underground."
      },
      {
        "name": "Guide",
        "replaces": "Favored Enemy; Hunter's Bond; Evasion; Quarry; Improved Quarry; Improved Evasion",
        "summary": "Many rangers are loners, but some choose to use their familiarity with the land to guide others safely through the wilderness."
      },
      {
        "name": "Guildbreaker",
        "replaces": "Class Skills; Favored Enemy; Wild Empathy; Hunter's Bond; Woodland Stride",
        "summary": "Guildbreakers stoke their enmity for their foes, and they train to track the movements of rival organizations, and even to infiltrate these groups to gather secret intelligence."
      },
      {
        "name": "Hooded Champion",
        "replaces": "1st-level Favored Enemy; Combat Syle; Wild Empathy; Endurance; Evasion; Improved Evasion",
        "summary": "The hooded champion lives on the periphery of civilized lands, and is often at odds with the forces of law and order."
      },
      {
        "name": "Horse Lord",
        "replaces": "Hunter's Bond; Camouflage; Hide in Plain Sight",
        "summary": "Rangers of the plains use horses or other riding beasts to hunt their lands, forging a near-mystical relationship with their mounts."
      },
      {
        "name": "Ilsurian Archer",
        "replaces": "Track; Wild Empathy; Combat Style; Spellcasting; Swift Tracking; Quarry; Improved Quarry",
        "summary": "Ilsurian archers maintain the strong tradition of archery first developed by soldiers in the service of Ilsur, who raised a small army with which he intended to overthrow the monarch of Korvosa after the fall of the Chelish Empire."
      },
      {
        "name": "Infiltrator",
        "replaces": "Favored Terrain",
        "summary": "Some rangers study their favored enemies and learn their ways, applying this knowledge to their own abilities and using their foes’ strengths against them."
      },
      {
        "name": "Jungle Lord",
        "replaces": "Class Skills; Weapon and Armor Proficiency; Favored Enemy; Favored Terrain; Hunter's Bond; Spells; 5th, 10th, 15th, 18th-level Favored Terrain; Quarry; Improved Quarry; Camouflage; Master Hunter",
        "summary": "Jungle lords are tempered by their harsh and unforgiving environments into something more than ordinary men and women."
      },
      {
        "name": "Lantern Lighter",
        "replaces": "Wild Empathy; Endurance; Favored Terrain; Woodland Stride; Camouflage; Hide in Plain Sight",
        "summary": "Lantern lighters were originally entrusted with secretly eliminating the drow and quarantining any knowledge of their existence, but in the new Lantern Bearer era, the lantern lighters have refocused their efforts on helping to rescue those imprisoned by the drow, or even to help individual drow who seek to escape the cruelties of their society for a chance at redemption on the surface."
      },
      {
        "name": "Nirmathi Irregular",
        "replaces": "Normal Weapon/Armor Proficiencies; Favored Enemy; Favored Terrain; Altered Spell List",
        "summary": "An irregular troop from Nirmathas, this ranger chooses to focus on the magic of stealth."
      },
      {
        "name": "Planar Scout",
        "replaces": "Class Skills; Wild Empathy; Favored Terrain; Hunter's Bond; Evasion; Improved Evasion",
        "summary": "Planar scouts are rangers specializing in traversing the planes—and surviving their journeys."
      },
      {
        "name": "Poison Darter",
        "replaces": "Favored Enemy; Wild Empathy; Combat Style; Hunter's Bond; Master Hunter",
        "summary": "In dense jungles, foliage and tight spaces hinder all but the most deceptively humble weapons: blowguns and poison."
      },
      {
        "name": "Raven Master",
        "replaces": "Class Skills; Wild Empathy; Hunter's Bond; Woodland Stride; Swift Tracker; Camouflage; Spellcasting",
        "summary": "Raven masters serve as messengers and spies for the Silver Ravens, eschewing a ranger’s usual connection to the natural world to form a mystic bond with their birds and to grant both animal and master a number of specialized abilities"
      },
      {
        "name": "Realm Wanderer",
        "replaces": "Class Skills; Track; Hunter's Bond; Swift Tracker; Master Hunter",
        "summary": "These rangers take to heart the lessons they’ve learned from their vastly contrasting experiences and know that creatively embracing this wisdom is sometimes the difference between life and death."
      },
      {
        "name": "Sable Company Marine",
        "replaces": "Hunter’s Bond",
        "summary": "Sable Company marines receive their training at the elite Endrin Military Academy in Korvosa. A large portion of their education is the handling and riding of hippogriffs, the iconic mounts of members of the company."
      },
      {
        "name": "Sentinel",
        "replaces": "Wild Empathy; Hunter's Bond; Woodland Stride; 6th-level Combat Style Feat; Quarry; Improved Quarry",
        "summary": "A sentinel specializes in heightening all of her senses to expose spies and those who work for opposing factions, rooting out all who attempt to slip past her evervigilant watch."
      },
      {
        "name": "Shapeshifter",
        "replaces": "Favored Terrain; Camouflage; Master Hunter",
        "summary": "Most rangers venture into the wilderness, but there are some who let the wilderness seep into them."
      },
      {
        "name": "Skirmisher",
        "replaces": "Spells",
        "summary": "Many rangers rely on spells, but there are some who eschew aid from divine powers for their own reasons."
      },
      {
        "name": "Spirit Ranger",
        "replaces": "Hunter's Bond; Camouflage",
        "summary": "Some rangers nurture a connection with the spirits that reside in all things."
      },
      {
        "name": "Stormwalker",
        "replaces": "Combat Style; Hunter's Bond; Swift Tracker; Quarry; Improved Evasion; Improved Quarry",
        "summary": "Rangers who walk in the tempest unafraid draw the power of the storm into themselves and become stormwalkers."
      },
      {
        "name": "Summit Sentinel",
        "replaces": "Combat Style; Favored Terrain; Swift Tracker; Hide in Plain Sight",
        "summary": "Some rangers eschew the path of the swift skirmisher and embrace the implacable strength of the mountain."
      },
      {
        "name": "Sword-Devil",
        "replaces": "Class Skills; Favored Enemy; Favored Terrain; Hunter's Bond; Spells; Quarry; Improved Quarry; Master Hunter",
        "summary": "Agile, vengeful, and deadly, a sword-devil ﬁghts with precision and grace, channeling the difficult lessons of a star-crossed life into unparalleled battle prowess."
      },
      {
        "name": "Tanglebriar Demonslayer",
        "replaces": "Class Skills; Favored Enemy; Endurance; Spells; Quarry; Improved Quarry",
        "summary": "Though they are sworn foes of Treerazer and his kin, Tanglebriar demonslayers are known to venture forth from Kyonin to broaden their expertise in the destruction of demons."
      },
      {
        "name": "Tidal Hunter",
        "replaces": "Wild Empathy; 6th-level Combat Style Feat; Track; Camouflage; Favored Terrain; Woodland Stride; Improved Evasion",
        "summary": "The tidal hunter draws strength from the fish and other wildlife of the deep."
      },
      {
        "name": "Toxic Herbalist",
        "replaces": "Wild Empathy; Endurance; Hunter's Bond; Swift Tracker; Quarry; Improved Quarry",
        "summary": "Saviors and destroyers in equal measure, toxic herbalists use nature’s bounty to craft remedies and poisons."
      },
      {
        "name": "Toxophilite",
        "replaces": "Wild Empathy; Combat Style; Endurance; Quarry; Improved Quarry",
        "summary": "The toxophilite emulates the sharpshooting rangers of legend, who could pin a fly to the wall with a single shot or split one arrow with another."
      },
      {
        "name": "Transporter",
        "replaces": "Wild Empathy; Favored Terrain; Hunter's Bond; Woodland Stride",
        "summary": "Transporters specialize in smuggling people as efficiently as possible through harsh and difficult environments."
      },
      {
        "name": "Trapper",
        "replaces": "Spells",
        "summary": "A trapper is a ranger who focuses exclusively on traps, rather than learning conventional magic."
      },
      {
        "name": "Trophy Hunter",
        "replaces": "Wild Empathy; Combat Feat Style; Hunter’s Bond",
        "summary": "Some rangers have taken up the mysteries of black powder in order to become big game hunters."
      },
      {
        "name": "Urban Ranger",
        "replaces": "Favored Terrain; Endurance; Woodland Stride; Camouflage; Hide in Plain Sight",
        "summary": "For the urban ranger, the streets and sewers of the city are just as dangerous as the barren wastelands or the deep forests."
      },
      {
        "name": "Warden",
        "replaces": "Favored Enemy; Combat Style Feats; Hunter’s Bond; Master Hunter",
        "summary": "All rangers have a bond with the wilderness, but the warden may have the strongest. This protector sits guard in the middle of the wilderness, keeping a lookout for any dangers that might spill from the deeper wilderness beyond, and protecting civilization from the savagery of nature—and vice versa."
      },
      {
        "name": "Wave Warden",
        "replaces": "Track; Combat Style; Favored Terrain; Woodland Stride; Swift Tracker",
        "summary": "(Merfolk Only) The wave warden patrols beneath the sea, preserving the safety and secrets of merfolk communities."
      },
      {
        "name": "Wild Hunter",
        "replaces": "Favored Enemy; Woodland Stride; Swift Tracker",
        "summary": "A wild hunter seeks to emulate the animals around him to keep him safe while he tracks his prey."
      },
      {
        "name": "Wild Shadow",
        "replaces": "Track; Wild Empathy; Favored Terrain; Hunter’s Bond; Woodland Stride; Quarry; Camouflage; Improved Quarry",
        "summary": "(Half-Elf Only) The isolation that some half-elves feel leads them to live a life of isolation amid the wild places of the world."
      },
      {
        "name": "Wild Soul",
        "replaces": "Code of Conduct; Favored Enemy; Swift Tracker; Quarry; Improved Quarry; Master Hunter",
        "summary": "Wild souls hail from primitive roots in the wild and venture to more civilized lands and learn their ways."
      },
      {
        "name": "Wild Stalker",
        "replaces": "Favored Enemy; 2nd-level Combat Style Feat; Hunter’s Bond",
        "summary": "The wild stalker forsakes the bonds of community and lives in the trackless wilds far from others of his kind, or perhaps grew up there, never knowing of civilization as anything more than his enemy."
      },
      {
        "name": "Wilderness Explorer",
        "replaces": "Class Skills; Wild Empathy; Hunter's Bond; Swift Tracker; Favored Terrain; Quarry; Improved Quarry",
        "summary": "Wilderness explorers are adept at making peaceful contact with remote societies."
      },
      {
        "name": "Wilderness Medic",
        "replaces": "Wild Empathy; Endurance; Evasion; Hunter's Body; Improved Evasion",
        "summary": "Wilderness medics know a variety of ways they can supply and preserve a rebellion or similar movement without requiring any resources that might make them easier to track down."
      },
      {
        "name": "Witchguard",
        "replaces": "Class Skills; Hunter’s Bond; Endurance; Spells; Woodland Stride",
        "summary": "Witchguards are the sworn defenders of the White Witches of Irrisen."
      },
      {
        "name": "Yokai Hunter",
        "replaces": "Favored Enemy; Woodland Stride; Camouflage",
        "summary": "Yokai hunters possess a supernatural tether to the spirit worlds that shroud mortal existence."
      }
    ]
  } ,
  
  { "name"       : "Rogue" ,
    
    "description": 
    [
      "Life is an endless adventure for those who live by their wits. Ever just one step ahead of danger, rogues bank on their cunning, skill, and charm to bend fate to their favor. Never knowing what to expect, they prepare for everything, becoming masters of a wide variety of skills, training themselves to be adept manipulators, agile acrobats, shadowy stalkers, or masters of any of dozens of other professions or talents. Thieves and gamblers, fast talkers and diplomats, bandits and bounty hunters, and explorers and investigators all might be considered rogues, as well as countless other professions that rely upon wits, prowess, or luck. Although many rogues favor cities and the innumerable opportunities of civilization, some embrace lives on the road, journeying far, meeting exotic people, and facing fantastic danger in pursuit of equally fantastic riches. In the end, any who desire to shape their fates and live life on their own terms might come to be called rogues."
    ],
    
    "role": 
    [
      "Rogues excel at moving about unseen and catching foes unaware, and tend to avoid head-to-head combat. Their varied skills and abilities allow them to be highly versatile, with great variations in expertise existing between different rogues. Most, however, excel in overcoming hindrances of all types, from unlocking doors and disarming traps to outwitting magical hazards and conning dull-witted opponents."
    ],
    
    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Acrobat",
        "replaces": "Trapfinding; Trap Sense",
        "summary": "Whether they are daring thieves, infiltrating assassins, or intrepid spies, proper training in acrobatics is a valuable boon for rogues."
      },
      {
        "name": "Bandit",
        "replaces": "Uncanny Dodge",
        "summary": "Bandits tend to have a variety of skills; sometimes these skills are similar to a ranger’s, but a bandit’s tactics always deal with surprise followed by intimidation, with the clear threat of naked force if intimidation does not do the trick."
      },
      {
        "name": "Bekyar Kidnapper",
        "replaces": "Trapfinding; Trap Sense",
        "summary": "A Bekyar kidnapper is not only adept at hiding herself in thick jungles and quickly subduing her prey, but also at spreading rumors of hidden ruins, buried treasure, and other such valuables that might lure an unwary foreigner into her traps."
      },
      {
        "name": "Bellflower Irrigator",
        "replaces": "Trapfinding; 4th-level Rogue Talent; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Rather than focusing on saving slaves, Bellflower irrigators seek to defeat slavery by aiming to eliminate the source."
      },
      {
        "name": "Burglar",
        "replaces": "Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Adept at infiltration, trap removal, and lock picking, burglars prey on the homes of the wealthy and forgotten tombs alike."
      },
      {
        "name": "Carnivalist",
        "replaces": "2nd, 4th, 6th-level Rogue Talents; Sneak Attack; Trap Sense",
        "summary": "Carnivalists train their miniature minions to perform acts of larceny and often hide their true talents behind theatrical sideshows."
      },
      {
        "name": "Cat Burglar",
        "replaces": "Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "(Catfolk Only) Cat burglars are masters of breaking and entering, using their feline grace to make it seem as though no crime was ever committed in the first place."
      },
      {
        "name": "Chameleon",
        "replaces": "Trapfinding; Trap Sense",
        "summary": "An absolute master of disguise, a chameleon effortlessly blends into any environment."
      },
      {
        "name": "Charlatan",
        "replaces": "Trapfinding; Trap Sense",
        "summary": "A charlatan is a master of lies and deception."
      },
      {
        "name": "Consigliere",
        "replaces": "Class Skills; Trapfinding; Evasion; Uncanny Dodge; Improved Uncanny Dodge; Trap Sense; 10th-level Rogue Talent",
        "summary": "Consiglieres act as trusted mediators and administrators for crime families and various criminal organizations, and many serve as the right hand to the leaders of such groups."
      },
      {
        "name": "Counterfeit Mage",
        "replaces": "Trapfinding; 4th-level Rogue Talent",
        "summary": "Charlatans and stage magicians use slight of hand to fake magic. A counterfeit mage goes a step further, parroting the motions and activation phrases used by arcane casters to activate wands or other magical accoutrements."
      },
      {
        "name": "Cutpurse",
        "replaces": "Trapfinding; Trap Sense",
        "summary": "Cutpurses are often trained by guilds to collect the guild’s tax from local businesses on a daily basis, whether through intimidation or pickpocketing. Some find themselves taking up the mantle of adventurer, and their talents are generally appreciated in this role, but the cutpurse is still the first person her companions look to when an item goes missing."
      },
      {
        "name": "Dark Lurker",
        "replaces": "Evasion; 2nd, 8th, 14th, and 20th-level Rogue Talents",
        "summary": "Dark lurkers use darkness as an ally."
      },
      {
        "name": "Deadly Courtesan",
        "replaces": "Class Skills; 2nd-level Rogue Trick; Trap Sense; Improved Uncanny Dodge",
        "summary": "(Vishkanya Only) Skilled at manipulation and diversion, the deadly courtesan builds up those around her and periodically takes them down."
      },
      {
        "name": "Desert Raider",
        "replaces": "Class Skills; Trapfinding; Trap Sense",
        "summary": "Desert raider learn the secrets of the deserts and become inured to their dangers."
      },
      {
        "name": "Discretion Specialist",
        "replaces": "Trapfinding; Trap Sense/Danger Sense; 4th, 12-th level Rogue Talents; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Discretion specialists deal with bodies, inconvenient witnesses, and other loose ends."
      },
      {
        "name": "Dreamthief",
        "replaces": "Class Skills; Sneak Attack; Master Strike; Trap Sense; Uncanny Dodge; Improved Uncanny Dodge; 12th-level Rogue Talent",
        "summary": "Each dreamthief bears a focused fragment of emotion, known as a dreamshard, within her soul. This metaphysical crystal grants a dreamthief supernatural powers, which she supplements with skill and grace."
      },
      {
        "name": "Driver",
        "replaces": "Trapfinding; Trap Sense",
        "summary": "A driver makes her living driving vehicles in the service of those who can pay for her considerable talents."
      },
      {
        "name": "Earthshadow",
        "replaces": "Trapfinding; Evasion; 4th, 8th, 12th, 16th-level Rogue Talents",
        "summary": "In the centuries since the Quest for the Sky, the mystic lore the dwarves call earthcraft has been passed down through the generations, and its practitioners are called earthshadows."
      },
      {
        "name": "Eldritch Raider",
        "replaces": "Class Skills; Skill Ranks; 2nd-level Rogue Talent; Trap Sense",
        "summary": "(Gillman Only) An eldritch raider is a rogue who seeks to unravel the mysteries of the destruction of the gillmen’s homeland."
      },
      {
        "name": "Eldritch Scoundrel",
        "replaces": "Armor Proficiency; Skills; Trap Sense; Sneak Attack; Rogue Talents; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Students of arcane magic, legerdemain, and stealth, eldritch scoundrels are a rare breed of adventurer most commonly found seeking lost and valuable arcane writings in the ruins of fallen empires, such as Thassilon or the Jistka Imperium."
      },
      {
        "name": "Escapologist",
        "replaces": "Trapfinding; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "The escapologist excels at escaping any confinement, whether physical, magical, or mental. Few restraints can hold an escapologist for long."
      },
      {
        "name": "False Medium",
        "replaces": "Trapfinding; 2nd-level Rogue Talent; Trap Sense",
        "summary": "The false medium is a master of pretending to have occult powers in order to manipulate the emotions and atmosphere of the people and places around him, often reaping a healthy reward from the bereaved, who find solace in his comforting lies."
      },
      {
        "name": "Fey Prankster",
        "replaces": "Trapfinding; 2nd, 6th, 8th, and 12th-level Rogue Talents; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "(Gathlain) Fey pranksters specialize in tricking others to teach a lesson or for their own entertainment."
      },
      {
        "name": "Filcher",
        "replaces": "Evasion; Trap Sense 1-6; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "(Halfling Only) Whether cutting purses in the midst of combat or replacing prized items with fakes under the noses of their owners, the filcher is the master of the quick and quiet steal."
      },
      {
        "name": "Galtan Agitator",
        "replaces": "Trapfinding; Trap Sense; 4th, 8th, 12th-level Rogue Talent",
        "summary": "Galtan agitators fight mightily to cast down the enemies of their ideals within the shambles of the tumultuous nation of Galt."
      },
      {
        "name": "Guerrilla",
        "replaces": "Trapfinding; Evasion; Trap Sense; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Guerrillas fight against oppressive leadership and governments including Chelish colonization in Sargava and the power structures in Cheliax proper, Nidal, and Razmiran"
      },
      {
        "name": "Guild Agent",
        "replaces": "Evasion; Uncanny Dodge; Improved Evasion; Master Strike",
        "summary": "Guild agents are members of a thieves’ guild or other shadowy organization. What they lose in independence, they more than make up for in benefits gained due to their association’s infrastructure."
      },
      {
        "name": "Gun Smuggler",
        "replaces": "Weapon Proficiencies; Trapfinding; Sneak Attack; Trap Finding; 6th-level Rogue Talent; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Gun smugglers are adept at procuring firearms and concealing their secret weapons"
      },
      {
        "name": "Heister",
        "replaces": "2nd, 4th, 8th-level Rogue Talent; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Notorious for their stealth, imagination, and elaborately planned thefts and capers, heisters specialize in breaking into secure locations, stealing items of value, and escaping undetected."
      },
      {
        "name": "Investigator",
        "replaces": "Trapfinding",
        "summary": "Not all rogues work against the law. Investigators use their skills to serve the law, often in the employ of nobles or in the pursuit of noble causes."
      },
      {
        "name": "Kintargo Rebel",
        "replaces": "Trap Sense; Uncanny Dodge",
        "summary": "Whenever the Chelish navy sails into the port, these rebels are quick to appear agreeably subservient in order to conceal their noncompliance and avoid retribution."
      },
      {
        "name": "Kitsune Trickster",
        "replaces": "Trapfinding; Trap Sense",
        "summary": "(Kitsune Only) The kitsune trickster combines her sharpened wit with minor arcane powers of charm and persuasion."
      },
      {
        "name": "Knife Master",
        "replaces": "Trapfinding; Sneak Attack; Trap Sense",
        "summary": "The knife master is a trained killer who specializes in close-up combat and the wave and weave of knife fighting."
      },
      {
        "name": "Makeshift Scrapper",
        "replaces": "Weapon Proficiencies; Trapfinding; Trap Sense; 12th-level Rogue Talent",
        "summary": "Some combatants specialize in the study of certain weapons, but those without formal training often learn to survive a fight by making brilliant use of whatever is lying around."
      },
      {
        "name": "Master of Disguise",
        "replaces": "Trapfinding; 2nd, 10th-level Rogue Talent",
        "summary": "A master of disguise believes that never letting her adversaries know her true identity protects her from bad luck or missteps on a job."
      },
      {
        "name": "Nameless Shadow",
        "replaces": "Trapfinding; 2nd, 4th, 6th, 8th, 10th, 14th, 18th-level Rogue Talents",
        "summary": "Where bandits and tyrants prey on merchants and caravans, the nameless shadow preys on bandits and tyrants."
      },
      {
        "name": "Needler",
        "replaces": "Evasion; Uncanny Dodge; 6th-level Rogue Talent; Improved Uncanny Dodge",
        "summary": "Needlers use subtlety and misdirection to deliver deadly poisons to unsuspecting victims in creative and unorthodox ways."
      },
      {
        "name": "Numerian Scavenger",
        "replaces": "Trapfinding; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "A Numerian scavenger lives for the discovery of new technological wonders scraped from the depths of the strange ruins, metal caverns, and outlandish junkyards of Numeria."
      },
      {
        "name": "Okeno Liberator",
        "replaces": "Trapfinding; Trap Sense; Uncanny Dodge",
        "summary": "The sight of yellow sails on the Inner Sea signals the approach of a ship from Okeno, home port of the most ruthless and feared of all slaving operations. Most who see these sails flee in terror, but some freedom fighters actually endeavor to be captured, knowing that being taken to Stonespine Island in manacles is the easiest way to infiltrate the city, liberate other slaves, and lead them to freedom."
      },
      {
        "name": "Phantom Thief",
        "replaces": "Class Skills; Sneak Attack; Trapfinding; Trap Sense; Master Strike",
        "summary": "Phantom thieves come from the ranks of the elite, having grown bored with their finery, and seek thrills from acts of daring, skill, and crime."
      },
      {
        "name": "Pirate",
        "replaces": "Trapfinding; 2nd-level Rogue Talent; Trapfinding",
        "summary": "A pirate breaks from the confines of country and king to commit her crimes upon the high seas."
      },
      {
        "name": "Planar Sneak",
        "replaces": "Trapsense; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "A planar sneak finds creative ways to defy conventional limitations when trying to overcome extraplanar obstacles."
      },
      {
        "name": "Poisoner",
        "replaces": "Trapfinding; Trap Sense",
        "summary": "The poisoner knows poison is just a tool toward an end, and is no different than any other weapon."
      },
      {
        "name": "Rake",
        "replaces": "Trapfinding; Trap Sense",
        "summary": "The rake is a rogue who is open about her skills and talents, often to the point of being boastful."
      },
      {
        "name": "Relic Raider",
        "replaces": "Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Relic raiders are rogues who specialize in recovering treasures from ruins and tombs, some in a quest for knowledge, others out of a desire for riches."
      },
      {
        "name": "River Rat",
        "replaces": "Class Skills; Trapfinding; Trap Sense",
        "summary": "River rats are skilled at hiding amid reeds and roots, striking the unwary from the shallows as others would from the shadows."
      },
      {
        "name": "Roof Runner",
        "replaces": "Trapfinding; Trap Sense",
        "summary": "A specialized urban acrobat, the roof runner makes her home high atop the spires and gables of great cities."
      },
      {
        "name": "Rotdrinker",
        "replaces": "Evasion; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Poisons are common tools in a rogue’s trade, and some poison-using rogues are so frequently exposed to these toxins that they have developed resistances to particular poisons."
      },
      {
        "name": "Sanctified Rogue",
        "replaces": "Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "The sanctified rogue serves a higher purpose, acting as a representative of a church or cult, or following the tenets of a specific faith or deity."
      },
      {
        "name": "Sapper",
        "replaces": "Trapfinding; 2nd and 4th-level Rogue Talents",
        "summary": "The sapper is a trained siege engineer and can deal with traps and other obstacles given plenty of time."
      },
      {
        "name": "Scout",
        "replaces": "Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Scouts frequently roam the wilderness, often banding together as bandits, but sometimes serving as guides, as trailblazers, or as companions to a ranger or barbarian warrior."
      },
      {
        "name": "Scroll Scoundrel",
        "replaces": "2nd-level Rogue Talent, Trap Sense, Uncanny Dodge, Improved Uncanny Dodge, 10th-level Rogue Talent",
        "summary": "Using knowledge from extensive research, the scroll scoundrel exploits overconfidence and predictability to better stay alive."
      },
      {
        "name": "Sczarni Swindler",
        "replaces": "Trapfinding; Evasion; Trap Sense; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "If life is a game, the Sczarni play to win. When skill and luck aren’t enough, cheating is often the best option."
      },
      {
        "name": "Seeker of the Lost",
        "replaces": "2nd-level Rogue Talent; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Aquatic elven adventurers descending into the ruins of sunken Azlant developed techniques to ease their explorations, and they now share these techniques among a loose group of acquaintances calling themselves the seekers of the lost."
      },
      {
        "name": "Shadow Scion",
        "replaces": "Trapfinding; 2nd, 8th, 14th-level Rogue Talent; Master Strike",
        "summary": "Shadow scions have learned the secrets of light and dark and draw power from the shadows themselves."
      },
      {
        "name": "Shadow Walker",
        "replaces": "Trapfinding; 2nd-level Rogue Talent; Trap Sense; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Shadow walkers are comfortable in light, darkness, and the shadows in between."
      },
      {
        "name": "Sharper",
        "replaces": "Trapfinding; 2nd, 4th, 6th, 8th, 10th, 16th-level Rogue Talent; Trap Sense;",
        "summary": "Sharpers use trickery and deception to part an owner from his valuables."
      },
      {
        "name": "Skulking Slayer",
        "replaces": "Weapon/Armor Proficiency; Class Skills; Trapfinding; Rogue Talent; Advanced Rogue Talent; Trap Sense 1-4",
        "summary": "(Half-Orc Only) Pushed into a life of crime by the society around them, half-orcs gravitate toward criminal activities that suit them best."
      },
      {
        "name": "Sly Saboteur",
        "replaces": "Class Skills; Trap Sense; Uncanny Dodge; Improved Uncanny Dodge;",
        "summary": "Sly saboteurs are irregular soldiers who specialize in sabotage and surprise attacks."
      },
      {
        "name": "Smuggler",
        "replaces": "Trap Sense; Trapfinding; Evasion",
        "summary": "Smugglers specialize in moving contraband from one area to another while avoiding detection by authorities."
      },
      {
        "name": "Snare Setter",
        "replaces": "Sneak Attack; Trapfinding; Master Strike",
        "summary": "(Kobold Only) Deep in darkness, the snare setter constructs his deadly\n traps and brutal mechanisms to confound and destroy any\n who try to invade his domain."
      },
      {
        "name": "Sniper",
        "replaces": "Trapfinding; Trap Sense",
        "summary": "Some say that the sniper is the worst kind of assassin: a killer who waits silently in the shadows and then strikes from a distance without remorse."
      },
      {
        "name": "Snoop",
        "replaces": "Trapfinding; Evasion; Uncanny Dodge; Improved Uncanny Dodge; 8th-level Rogue Talent",
        "summary": "Snoops act as information peddlers, specializing in gathering secrets through investigation, subterfuge, and coercion, and selling or trading those secrets for personal gain."
      },
      {
        "name": "Spy",
        "replaces": "Trapfinding; Trap Sense",
        "summary": "The best spies are like chameleons, but not only can they change their appearances to fit the situation, they can also change their personalities, allegiances, and even loves if that’s what it takes to achieve their clandestine goals."
      },
      {
        "name": "Survivalist",
        "replaces": "Trapfinding; Trap Sense",
        "summary": "The survivalist focuses her talents on surviving harsh and unforgiving conditions that would kill a lesser rogue."
      },
      {
        "name": "Swamp Poisoner",
        "replaces": "Racial Traits; Trapfinding; 2nd-level Rogue Talent; Trap Sense",
        "summary": "(Grippli) Swamp poisoners use their own toxins to defend their homes and level the playing field"
      },
      {
        "name": "Swashbuckler",
        "replaces": "Trapfinding; Trap Sense",
        "summary": "A paragon of mobile swordplay, the swashbuckler is a rogue who focuses almost exclusively on honing her skill at arms and perfecting daring acrobatic moves and elaborate flourishes that border on performance."
      },
      {
        "name": "Swordmaster",
        "replaces": "Class Skills; Trap Sense",
        "summary": "(Tengu Only) A swordmaster meditates to strengthen her spiritual connection to her blade. She strives to perfect her skills by mastering six deadly trances."
      },
      {
        "name": "Sylvan Trickster",
        "replaces": "Class Skills; Trapfinding; Rogue Talents; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Sylvan tricksters are rogues who model themselves after the mischievous fey of legend."
      },
      {
        "name": "Thug",
        "replaces": "Trapfinding; Trap Sense",
        "summary": "Some criminals steal with finesse, their victims only discovering the crime when the rogue is long gone and the coin already spent. A thug, on the other hand, cares nothing for finesse."
      },
      {
        "name": "Tidal Trickster",
        "replaces": "Trapfinding; Trap Sense; Uncanny Dodge; Improved Uncanny Dodge; 4th, 8th-level Rogue Talent",
        "summary": "Tidal tricksters roam the seas, using their skillful mastery of the currents to move across aquatic battlefields and throw their enemies off-balance."
      },
      {
        "name": "Toxic Talon",
        "replaces": "Weapon Proficiencies; Trapfinding; Trap Sense; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "A toxic talon spends resources and time combining easy-to-obtain materials into dangerous toxins to aid in the defense of Andoran."
      },
      {
        "name": "Trapsmith",
        "replaces": "Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Some rogues are not content with just disabling traps—they love to build them, finding a captivating beauty in the turning of gears and the slither of ropes over pulleys."
      },
      {
        "name": "Underground Chemist",
        "replaces": "Evasion; 4th-level Rogue Talent; Advanced Talents",
        "summary": "Underground chemists are part of the rotting, fetid underbelly of the alchemical world."
      },
      {
        "name": "Vexing Dodger",
        "replaces": "Trapfinding; 2nd-level Rogue Talent; Trap Sense; Uncanny Dodge; Improved Uncanny Dodge",
        "summary": "Vexing dodgers take advantage of their smaller size to outmaneuver larger foes such as giants."
      },
      {
        "name": "Waylayer",
        "replaces": "Trapfinding; Uncanny Dodge; Improved Uncanny Dodge; 12th and 20th-level Rogue Talents",
        "summary": "A clever rogue knows the easiest battle to win is the one that’s over before your foe knows it has begun."
      }
    ]
  } ,
  
  { "name"       : "Samurai" ,
    
    "description": 
    [
      "Few warriors are more dedicated to honor and the code of the warrior than the samurai. Trained from an early age in the art of war and sworn to the service of a lord, the samurai holds a position of power and respect in many lands, often serving as the voice and justice of the local noble. The samurai takes on his training with zeal, learning the way of the blade (typically a katana), the bow, and the horse. Some even learn how to effectively use firearms, if they are available. The samurai is often the most trusted soldier in his lord's employ. In him, the common folk see honor and sacrifice. He is an honorable warrior, dedicated to the realm and the leaders that guide it."
    ],
    
    "role": 
    [
      "While typically sworn to the service of a lord, a samurai is usually given free reign as to how he performs that service. As such, samurai can sometimes be found with other adventurers, taking the fight to the enemies of their masters. Other samurai become ronin, striving to serve an ideal without paying fealty to a lord. In either case, samurai make powerful allies, capable of withstanding nearly any harm while dispatching their foes with deadly precision. The samurai is an alternate class for the cavalier base class."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Ironbound Sword",
        "replaces": "Weapon Expertise; Banner; Greater Banner",
        "summary": "The ironbound sword’s fighting style, focused on incapacitating opponents rather than killing them, can subdue a foe without causing permanent harm, leaving the soul of the samurai unstained by deaths of her enemies."
      },
      {
        "name": "Soverign Blade",
        "replaces": "Alignment; Mount; Mounted Archer; 6th, 12th, 18th-level bonus feats",
        "summary": "In Tian Xia, many samurai are tutored in the ways of honor using lessons that originate from sovereign dragons and their dedication to safeguarding harmony."
      },
      {
        "name": "Sword Saint",
        "replaces": "Samurai's Mount; Mounted Charge; Banner; Greater Banner",
        "summary": "Sword saints hail from lands where samurai are prevalent, and are often ronin who wander the world seeking new challenges to perfect their intricate style of swordplay called iaijutsu."
      },
      {
        "name": "Ward Speaker",
        "replaces": "Alignment; Resolve; Greater Resolve; True Resolve; Honorable Stand",
        "summary": "The ward speaker draws power from simple rituals to honor the spirits found throughout the world so that he might better protect those entrusted to his care."
      },
      {
        "name": "Warrior Poet",
        "replaces": "Weapon and Armor Proficiency; Mount; Weapon Expertise; Banner; Greater Banner; Challenge; Mounted Archer; Demanding Challange; Bonus Combat Feats",
        "summary": "Warrior poets often study calligraphy, flower arrangement, poetry, and other courtly arts, but when called to battle, they treat combat as its own art form, fighting with beauty and grace."
      },
      {
        "name": "Yojimbo",
        "replaces": "Mount; Weapon Expertise; Mounted Archer",
        "summary": "Yojimbo are highly trained bodyguards favored by the nobles and warlords of distant Minkai."
      }
    ]
  } ,
  
  { "name"       : "Shaman" ,
  
    "description": 
    [
      "While some heroes speak to gods or consort with otherworldly muses, shamans commune with the spirits of the world and the energies that exist in every living thing. These divine adventurers draw upon their power to shape the world and expand the inf luence of their spiritual patrons. Shamans have strong ties to natural spirits. They form powerful bonds with particular spirits, and as their power grows they learn to call upon other spirits in times of need."
    ],
    
    "role": 
    [
      "Shamans make for potent divine spellcasters, capable of using divine spells and the power of their spirits to aid their allies and destroy their foes. While they aren’t the healers that clerics are, they can still fill that role when needed."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Animist",
        "replaces": "Spirit Magic Spells; 2nd, 8th, 10th, 12th, and 18th-level Hexes; Manifestation",
        "summary": "Even among mystical practitioners, the animist has a strange perspective and even stranger magic. The animist perceives that all things have a spirit, including objects, constructs, illnesses, buildings, and the environment."
      },
      {
        "name": "Benefactor",
        "replaces": "Spellcasting; Hexes;",
        "summary": "A benefactor seeks to improve the lives of others by primarily offering powerful supportive abilities and magic to her allies and others she deems worthy."
      },
      {
        "name": "Crystal Tender",
        "replaces": "Spirit Animal; Wandering Spirit; 8th-level Shaman Hex; Manifestation",
        "summary": "A crystal tender focuses on the spirits of metal and stone, using crystals as a means to focus the power of the spirits she venerates."
      },
      {
        "name": "Deep Shaman",
        "replaces": "Spirit; Spirit Animal; Class Skills; Spirit Abilities",
        "summary": "Deep shamans are tied to spirits from the depths."
      },
      {
        "name": "Draconic Shaman",
        "replaces": "Spirit; Spirit Animal; 4th, 10th-level Hexes; Spirit Magic",
        "summary": "Some shamans draw their powers from the might of dragons. These shamans each gain a powerful drake as an ally, and view caring for that drake as a sacred duty"
      },
      {
        "name": "Grasping Vine",
        "replaces": "Spirit Animal; Spirit Magic; 2nd, 8th-level Hex",
        "summary": "Grasping vine shamans are typically adherents of one of several scattered sects dedicated to the Green Mother. They revere plant life in all its forms, with a special fondness for poisonous or carnivorous plants."
      },
      {
        "name": "Name-Keeper",
        "replaces": "Class Skills; Spirit Animal; Spirit Magic; Wandering Spirit; Wandering Hex",
        "summary": "Name-keepers have delved into the storied histories etched into the Wall of Names and communed with the departed spirits of those whose names are memorialized on the monument."
      },
      {
        "name": "Overseer",
        "replaces": "Spirit Magic; Deliver Touch Spells",
        "summary": "While all shamans use their connection to the spirits of the world to draw upon otherworldly magic powers, the shamans of the Lands of the Linnorm Kings have a unique tradition in which they use the power of patron spirits to directly control their enemies."
      },
      {
        "name": "Possessed Shaman",
        "replaces": "Spirit Magic; 2nd and 6th-level Hexes",
        "summary": "For a possessed shaman, merely communing with the spirit world is insufficient. Instead, she invites the spirits to share her body, granting them the chance to experience corporeal existence."
      },
      {
        "name": "Primal Warden",
        "replaces": "Spirit Animal; Spirit Magic; 4th, 8th, 12th-levle Hex",
        "summary": "A\nshaman who communes with spirits that linger in areas where primal magic reigns, learning to stabilize\n these erratic energies and draw upon them to her benefit."
      },
      {
        "name": "Serendipity Shaman",
        "replaces": "Spirit Magic spells",
        "summary": "The serendipitous, shamanistic rites associated with the traditional catfolk worship of the so-called “spirits of creation”  focus upon attracting good fortune and banishing ill fortune in the name of these spirits."
      },
      {
        "name": "Speaker for the Past",
        "replaces": "Spirit Familiar; Wandering Spirit; Wandering Hex",
        "summary": "A speaker for the past is a shaman who specifically serves as the voice for spirits from her people’s history."
      },
      {
        "name": "Spirit Warden",
        "replaces": "Class Skills; Spirit Magic Spells; 2nd and 10th-level Hexes",
        "summary": "Not all spirits deserve reverence and respect. Some are twisted and despicable. It’s a spirit warden’s duty to end these spirits’ existence."
      },
      {
        "name": "True Silvered Throne",
        "replaces": "Class Skills; Spirit Animal; Wandering Spirit; Wandering Hex; 8th-level Hex",
        "summary": "Members in good standing who have risen to a prestigious rank within the Esoteric Order of the Palatine Eye, true silvered thrones have managed to discover rituals and occult secrets within the lore of their order."
      },
      {
        "name": "Unsworn Shaman",
        "replaces": "Spirit; Hex; Spirit Animal; Wandering Spirit; Wandering Hex; Spirit Magic",
        "summary": "An unsworn shaman never binds herself to one specific spirit, always making new deals as she deems necessary for the circumstances that she finds herself in."
      },
      {
        "name": "Visionary",
        "replaces": "Wandering Spirit; Spirit Magic Spells; Wandering Hex; Greater Wandering Spirit; True Wandering Spirit",
        "summary": "The visionary is a master at divination, drawing upon her intimate relationship with the spirit world to ferret out all manner of secrets and insights about the world around her and beyond."
      },
      {
        "name": "Witch Doctor",
        "replaces": "Alignment; 4th, 8th, 10th, and 12th-level Hexes",
        "summary": "The witch doctor is a healer who specializes in afflictions of the soul."
      }
    ]
  } ,
  
  { "name"       : "Shifter" ,
  
    "description": 
    [
      "Whether riding on the wind as a falcon or hiding in some fetid bog waiting to strike, the shifter is a true master of the wild. Both a devoted defender of druidic circles and a fierce predator, the shifter can take on the forms of nature and even fuse them together with devastating effect and unbridled savagery. By way of the druidic discipline of wild shape, they become living aspects of the wild. At first, they are able to assume only a minor aspect, but with time and practice they can fully transform into ever more powerful forms.",
      "The shifter class offers players a way to experience a shapeshifting character that is more martially inclined than a spellcasting druid. With each new level, the shifter’s powers grow in new and surprising ways, creating a character that thrives in battle, exploration, and stealth.",
      "Shifters are protectors of druidic circles and avengers of nature, yet a shifter’s magic is different from that of her druidic kin. Rather than invoking spells from the natural world or forging alliances with animals, shifters focus their supernatural powers inward to gain control over their own forms. Their ability to change their forms is as varied as the wonders of the wilds themselves but always remains at least partially rooted in the natural world. There are many paths to becoming a shifter; most are trained in that role by druidic circles and have their powers unlocked via rituals of initiation. Yet some stumble upon the gift naturally, as if their blood bore the secrets of shifter transformation.",
      "For those leaning toward the causes of law and good, the path of the shifter is one of contemplation and understanding. They become one with nature through mental and physical mimicry and gain an ever deeper spiritual understanding of the ebb and flow of the natural world. Those leaning toward the chaotic and evil teachings of druidic philosophy find such enlightenment through more violent means. These are typically quicker transformations, both brutal and painful, imparting the dark lessons of nature through its most catastrophic forms. Shifters who lean toward true neutrality are the most diverse when it comes to their command of metamorphic secrets."
    ],
    
    "role": 
    [
      "The shifter is so attuned to nature and the wild beasts of the world that she can call upon those powers to mystically fortify her being. Fluid in form and function, she can shape herself to overcome hardships and support those she befriends or serves."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Adaptive Shifter",
        "replaces": "Shifter Claws; Shifter Aspect; Chimeric Aspect; Greater Chimeric Aspect; Final Aspect; Wild Empathy; Track; Woodland Stride; Trackless Step; Wild Shape",
        "summary": "Rather than emulate other animals entirely, some shifters learn to reshape their forms on the fly in response to a range of stimuli"
      },
      {
        "name": "Elementalist Shifter",
        "replaces": "Languages; Shifter Aspect; Wild Empathy; Shifter Claws; Wild Shape; Chimeric Aspect; Greater Chimeric Aspect",
        "summary": "Rather than drawing power from bestial aspects, elementalist shifters channel power from the Inner Sphere and can take on powerful elemental forms at the cost of the greater diversity available to traditional shifters."
      },
      {
        "name": "Fiendflesh Shifter",
        "replaces": "Alignment; Shifter Claws; Wild Shape; Shifter Aspect; Defensive Instinct; Chimeric Aspect; Greater Chimeric Instinct",
        "summary": "By forging dark pacts with extraplanar forces, fiendflesh shifters invoke sinister powers to assume the strengths of daemons, demons, or devils."
      },
      {
        "name": "Leafshifter",
        "replaces": "Shifter Claws; Shifter Aspect",
        "summary": "(Ghoran only) Rather than assume aspects taken from the traits of natural animals, a leafshifter transforms into plant-animal hybrids that resemble living topiaries."
      },
      {
        "name": "Oozemorph",
        "replaces": "Weapon and Armor Proficiencies; Chimeric Form; Greater Chimeric Form; Wild Shape; Shifter Aspect; Shifter Claws; Wild Empathy; Defensive Instinct; Woodland Stride",
        "summary": "While most shifters are trained in druidic traditions that allow them to tap into animalistic powers, others look instead to the simplest forms of life for inspiration. Known as oozemorphs, these shifters focus on the ooze—a form of life as simple in construction as it is dangerous in combat."
      },
      {
        "name": "Rageshaper",
        "replaces": "Alignment; Wild Shape; Shifter Aspect; Shifter Claws; Defensive Instinct; Chimeric Aspect; Greater Chimeric Aspect; Woodland Stride; Trackless Step",
        "summary": "The rageshaper is a destructive force of nature brought to bear—a wild and uncontrollable engine of annihilation fueled by wrath."
      },
      {
        "name": "Verdant Shifter",
        "replaces": "Wild Empathy; Shifter Aspect; Defensive Instinct; Wild Shape; Chimeric Form; Greater Chimeric Form",
        "summary": "Verdant shifters have an affinity for plants rather than animals and gain a plantlike form that grows in power as they do."
      },
      {
        "name": "Weretouched",
        "replaces": "Shifter Aspect; Wild Empathy; Wild Shape",
        "summary": "Weretouched shifters are scions of lycanthropic forces, whether hereditary or supernaturally imposed. They can assume both animal and hybrid forms, as a lycanthrope does."
      }
    ]
  } ,
  
  { "name"       : "Skald" ,
    
    "description": 
    [
      "Skalds are poets, historians, and keepers of lore who use their gifts for oration and song to inspire allies into a frenzied rage. They balance a violent spirit with the veneer of civilization, recording events such as heroic battles and the deeds of great leaders, enhancing these stories in the retelling to earn bloodier victories in combat. A skald’s poetry is nuanced and often has multiple overlapping meanings, and he applies similar talents to emulate magic from other spellcasters."
    ],
    
    "role": 
    [
      "A skald inspires his allies, and often presses forward to fight enemies in melee. Outside of combat, he’s useful as a healer and scholar, less versatile but more durable than a bard."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Augur",
        "replaces": "Well-Versed; Versatile Performance; Spell Kenning",
        "summary": "Tales of Merivesta Olinchi are surprisingly common among the Bekyar of the Mwangi Expanse, who claim she spent some time studying their traditions and history."
      },
      {
        "name": "Bacchanal",
        "replaces": "Scribe Scroll; Versatile Performance; Song of Marching; Dirge of Doom",
        "summary": "Bacchanals are skalds who use ecstatic dancing and ribald songs to influence the primal instincts of listeners."
      },
      {
        "name": "Battle Scion",
        "replaces": "Bardic Knowledge; Dirge of Doom; Song of the Fallen; Master Skald",
        "summary": "The battle scion possesses a unique mixture of courtly grace alongside martial and magical prowess."
      },
      {
        "name": "Bekyar Demon Dancer",
        "replaces": "Skills; Versatile Performance; 3rd, 6th, and 9th-level Rage Powers",
        "summary": "While the twisted power of the demon-worshiping Bekyar’s skalds is great, it comes at a terrible price."
      },
      {
        "name": "Belkzen War Drummer",
        "replaces": "Weapon Proficiencies; Bardic Knowledge; Scribe Scroll; Lore Master; 7th-level Versatile Performance",
        "summary": "These fierce drummers are equally adept at tapping out a driving rhythm and rapping enemies upside the head with the same massive clubs they use to beat the crude hidecovered drums they carry into battle."
      },
      {
        "name": "Boaster",
        "replaces": "Scribe Scroll; Uncanny Dodge; Song of Marching; Lore Master; Song of the Fallen; Rage Powers; 6th-level Rage Power",
        "summary": "Boasters use incredible tales and claims to challenge themselves and their allies to accomplish remarkable feats."
      },
      {
        "name": "Bold Schemer",
        "replaces": "Class Skills; Bardic Knowledge; Uncanny Dodge; Improved Uncanny Dodge; Damage Reduction; Dirge of Doom",
        "summary": "The bold schemer combines wrath, wits, and daring to win battles and wars in unconventional ways, often through infiltration and deception."
      },
      {
        "name": "Court Poet",
        "replaces": "Inspired Rage; Song of Strength; Well-Versed",
        "summary": "Court poets elevate the skald’s love of history and poetry to an aristocratic ideal, captivating courts with complicated poetic traditions and inspiring others with their craft."
      },
      {
        "name": "Dragon Skald",
        "replaces": "Scribe Scroll; Bardic Knowledge; Well-Versed; Song of Marching",
        "summary": "The Ulfen prize skalds on sea raids and linnorm hunts. Dragon skald performances involve song, whistling, or blowing mighty horns, and viking sailors often talk about having a skald along to whistle up a wind or sing away the mists on the morning of a momentous raid."
      },
      {
        "name": "Elegist",
        "replaces": "Raging Song; Rage Powers; Well-Versed; Damage Reduction",
        "summary": "Some skalds internalize the saddest and must mournful  of stories, so much that they are able to manifest the emotions caused by these tales in physical form."
      },
      {
        "name": "Fated Champion",
        "replaces": "Well-Versed; Spell Kenning; Dirge of Doom; Master Skald",
        "summary": "Among cultures where skalds are the keepers of lore and wisdom, there are those who learn to read the winds of fate and take up the mantle of the fated champion, knowing and embracing their destined paths with strength borne of conviction."
      },
      {
        "name": "Herald of the Horn",
        "replaces": "Scribe Scroll; 5th, 11th, and 17th-level Spell Kenning; Lore Master",
        "summary": "Whether with the polished metal trumpet of a standing army or the crude curved animal horn of savage raiders, a herald of the horn sounds his raging song with thunderous blasts, which can bolster allies or shatter castle walls."
      },
      {
        "name": "Hunt Caller",
        "replaces": "Well-Versed; Song of Strength; Song of the Fallen; 6th, 18th-leve Rage Power; Spell Kenning",
        "summary": "Hunt callers are skalds whose songs draw their allies into the animal world."
      },
      {
        "name": "Instigator",
        "replaces": "Spell Kenning; Dirge of Doom; Lore Master",
        "summary": "he instigator influences the will of the people, turning them toward his own purposes."
      },
      {
        "name": "Red Tongue",
        "replaces": "Bardic Knowledge; 7th, 12th, 17th-level Versatile Performance",
        "summary": "The tengu tendency toward dramatic flourishes and rhetoric creates an environment in which political clubs led by hot-blooded firebrands—referred to as red tongues in polite company—dominate the political scene by swaying emotions in the moment and wielding magic in the shadows."
      },
      {
        "name": "Serpent Herald",
        "replaces": "3rd-level Rage Power; Spell Kenning",
        "summary": "Warrior bands devoted to Ragadahn are often led by a serpent herald, whose deep roars shake the earth itself."
      },
      {
        "name": "Spell Warrior",
        "replaces": "Scribe Scroll; Inspired Rage; Spell Kenning; Dirge of Doom; Master Skald",
        "summary": "The spell warrior uses his arcane knowledge rather than his rage to turn the tide of battle in favor of himself and his allies."
      },
      {
        "name": "Sunsinger",
        "replaces": "Alignment; Song of Marching; Spell Kenning;",
        "summary": "Qadiran sunsingers are particularly religious skalds of Sarenrae who call down their goddess’s glory to fill soldiers with fire."
      },
      {
        "name": "Totem Channeler",
        "replaces": "Bardic Knowledge; Rage Powers; Spell Kenning; Damage Reduction",
        "summary": "Some Shoanti skalds discover deeper truths in their tribes’ totems. These skalds, known as totem channelers, learn how to share the totems’ gifts with their allies in the heat of battle."
      },
      {
        "name": "Totemic Skald",
        "replaces": "3rd-level Rage Power; Uncanny Dodge; Improved Uncanny Dodge; Spell Kenning",
        "summary": "The totemic skald forms a close connection to an animal totem. Through the power of this mystical ally, the skald can change shapes, assuming its form as his own."
      },
      {
        "name": "Twilight Speaker",
        "replaces": "Alignment; Deity; Bardic Knowledge; Inspired Rage; Song of Strength; Dirge of Doom; Versatile Performance; Well-Versed; Lore Master; Master Skald",
        "summary": "(Elf Only) Twilight speakers are elven skalds of Findeladlara who consider it a sacred duty to seek out and befriend non-elven communities"
      },
      {
        "name": "Undying Word",
        "replaces": "Scribe Scroll; Lore Master; Inspired Rage; Song of Strength; Dirge of Doom; Spell Kenning",
        "summary": "Some who have survived the Mana Wastes cannot accept defeat, and those who have learned to speak the undying word can lend others the strength to endure"
      },
      {
        "name": "Urban Skald",
        "replaces": "Weapon/Armor Proficiencies; Inspired Rage; Song of Marching; Damage Reduction; Dirge of Doom",
        "summary": "The urban skald finds that challenging and mocking foes is sometimes more effective than inspiring uncontrolled rage in a city."
      },
      {
        "name": "War Painter",
        "replaces": "Raging Song; Spell Kenning; Lore Master",
        "summary": "(Grippli only) The gripplis of the Valashmai Jungle exhibit savage strength for their size—attributed in part to the frightful magical pigments applied to their skin by the tribes’ mystical lore keepers."
      },
      {
        "name": "Warlord",
        "replaces": "Scribe Scroll; Well-Versed; Spell Kenning; Lore Master; Improved Uncanny Dodge",
        "summary": "The warlord wields his force of personality like a weapon, intimidating his allies and ensuring that his followers heed his commands."
      },
      {
        "name": "Wyrm Singer",
        "replaces": "Inspired Rage; Song of the Fallen; 12th-level rage power",
        "summary": "Wyrm singers spin fragments of the story of the ongoing struggle between noble Apsu and wicked Dahak."
      }
    ]
  } ,
  
  { "name"       : "Slayer" ,
  
    "description": 
    [
      "Skilled at tracking down targets, slayers are consummate hunters, living for the chase and the deadly stroke that brings it to a close. Slayers spend most of their time honing their weapon skills, studying the habits and anatomy of foes, and practicing combat maneuvers."
    ],
    
    "role": 
    [
      "The slayer is elusive, and good at finding the opportune time and location to strike. Combining the deadliest talents of rangers and rogues, a slayer’s abilities are all about getting into combat, dealing with a target, and then getting back out again."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Ankou's Shadow",
        "replaces": "Studied Target; Stalker; Quarry; Improved Quarry",
        "summary": "Ankou’s shadow practice the deadliest skills of the First World’s most feared enforcers: terrifying, winged fey assassins dispatched by the greatest lords of the First World to eliminate their rivals"
      },
      {
        "name": "Avalancher",
        "replaces": "Studied Target; Track; Swift Tracker; Stalker; Quarry; Improved Quarry; Master Slayer",
        "summary": "Avalanchers attack from overhead cliffs and mesas like a landslide of arrows and blades."
      },
      {
        "name": "Bloody Jake",
        "replaces": "Alignment; Weapon and Armor Proficiency; Studied Target; 4th, 6th, 8th, 12th, 16th-level Slayer Talents; Swift Tracker; Slayer's Advance",
        "summary": "Bloody jakes are cruel backwoods folk who prey upon their country cousins while terrorizing civilized people who venture into their rural range."
      },
      {
        "name": "Bounty Hunter",
        "replaces": "Weapon/Armor Proficiencies; 2nd, 6th, and 10th-level Slayer Talents",
        "summary": "Whether tasked with bringing in wanted criminals or paid to drag debtors back to their loan sharks, bounty hunters are valued for their ability to capture targets alive."
      },
      {
        "name": "Butterfly Blade",
        "replaces": "Studied Target; Track; Sneak Attack; Stalker; Swift Tracker; Quarry; Improved Quarry",
        "summary": "Butterfly blades work in the shadows, eliminating threats with their namesake weapons and intimidating troublesome nobles."
      },
      {
        "name": "Cleaner",
        "replaces": "Track; 4th-level Slayer Talent; Stalker",
        "summary": "A cleaner is responsible for destroying or removing incriminating evidence from a crime scene, disposing of corpses and eliminating witnesses to make a crime look like an accident or a mere disappearance."
      },
      {
        "name": "Covenbane",
        "replaces": "Track; 2nd-level Slayer Talent; Stalker; Swift Tracker",
        "summary": "Covenbane slayers are scarred by arcane magic at a young age, and that resonance gives them supernatural insight into the psychic bonds between others."
      },
      {
        "name": "Cutthroat",
        "replaces": "Class Skills; Track; 2nd and 6th-level Slayer Talents",
        "summary": "Street-smart and extremely resourceful, cutthroats stalk city streets and alleyways, preying on those unfortunate enough to catch their eye."
      },
      {
        "name": "Deliverer",
        "replaces": "Weapon/Armor Proficiencies; 2nd, 6th, and 10th-level Slayer Talents",
        "summary": "Also known as a divine assassin, god’s blade, or wrath-bringer, a deliverer is a weapon chosen by a god to punish those who have committed an affront to that deity."
      },
      {
        "name": "Dune Rider",
        "replaces": "Track; Swift Tracker; Studied Target; Stalker, 4th, 8th-level Slayer Talent; Master Slayer",
        "summary": "Mounted harriers, saboteurs, and skirmishers, dune riders can disrupt even the most organized opposition."
      },
      {
        "name": "Family Hunter",
        "replaces": "2nd, 6th-level Slayer Talent; Sneak Attack; Studied Target",
        "summary": "Most slayers focus their efforts on single targets, but family hunters try to root out every branch of a tainted tree of life."
      },
      {
        "name": "Grave Warden",
        "replaces": "2nd and 10th-level Slayer Talents; Stalker;",
        "summary": "While paladins and inquisitors use their connection with the divine to fight undead hordes and other horrors of the night, a grave warden relies on knowledge, skill with weapons, and tenacity to put an end to these night-born terrors."
      },
      {
        "name": "Guerrilla",
        "replaces": "Track; Swift Tracker; 6th-level Slayer Talent; Quarry; Improved Quarry",
        "summary": "Slayers characterized by cunning and patience, guerrillas specialize in ambush and harassment of enemies."
      },
      {
        "name": "Pureblade",
        "replaces": "Track; 2nd and 8th-level Slayer Talents; Stalker; Master Slayer",
        "summary": "In Numeria, Pureblades are skilled at slaying naturally arising aberrations and any creatures that have been mutated by exposure to the bizarre alien technology that pervades the land. Pureblades from Alkenstar and Nex lead forays into the magic-starved Mana Wastes to eliminate aberrations before the creatures can threaten their lands."
      },
      {
        "name": "Sczarni Executioner",
        "replaces": "Class Skills; Studied Target; 4th-level Slayer Talent; Swift Tracker; Quarry; Improved Quarry",
        "summary": "These professional killers are trained and used almost exclusively by the various Sczarni crime families."
      },
      {
        "name": "Sniper",
        "replaces": "Track; 2nd-level Slayer Talent",
        "summary": "Whether it’s with a bullet from a sling, a quarrel from a crossbow, or even an expertly thrown dagger, the sniper ensures that a single shot disables his targets."
      },
      {
        "name": "Spawn Slayer",
        "replaces": "Studied Target; Stalker; Master Slayer",
        "summary": "Generations of Ninshaburian warriors fought the Spawn of Rovagug, holding the line against impossible odds. Some of their ancient techniques persist to this day."
      },
      {
        "name": "Spiritslayer",
        "replaces": "2nd level Slayer Talent; Stalker",
        "summary": "Slayers that focus in culling ghosts, shadow demons, and other incorporeal creatures."
      },
      {
        "name": "Stygian Slayer",
        "replaces": "Armor Proficiencies; 4th and 10th-level Slayer Talents; Stalker",
        "summary": "A stygian slayer crawls out of the darkest shadows to strike fear into the hearts of civilized folk."
      },
      {
        "name": "Toxic Sniper",
        "replaces": "Weapon and Armor Proficiencies; Track; Studied Target; Slayer Talents",
        "summary": "Followers of the daemonic harbinger Cixyron hide throughout the Mana Wastes, scavenging for guns. With significant firepower in hand, the Furious Thunder’s snipers bring poisonous death to the wastes."
      },
      {
        "name": "Turncoat",
        "replaces": "Track; Stalker; Quarry; Improved Quarry",
        "summary": "The turncoat’s natural talents for deception and treachery are fitting when negotiating with the untrustworthy individuals and his ability to adapt allows him to preempt opponents’ schemes."
      },
      {
        "name": "Vanguard",
        "replaces": "Track; 2nd and 4th-level Slayer Talents; Stalker",
        "summary": "Vanguards are battlefield commanders who focus on the brutality of combat and lead their allies to bloody victory."
      },
      {
        "name": "Velvet Blade",
        "replaces": "Class Skills; Armor Proficiency; Studied Target; Track; Swift Tracker",
        "summary": "Velvet blades specialize in infiltrating the upper echelons of society, mingling with nobles and courtiers, and killing them."
      },
      {
        "name": "Witch Killer",
        "replaces": "Class Skills; Studied Target; 4th, 10th-level Slayer Talent",
        "summary": "Born into cultures where magic users are hated and feared, witch killers devote their lives to purge the arcane taint from the world."
      },
      {
        "name": "Woodland Sniper",
        "replaces": "Track; Sneak Attack; Stalker; Swift Tracker; Slayer's Advance",
        "summary": "Woodland snipers are guardians of forest and grove, keeping vigil on their borders and hunting bounties and trespassers from the shelter of sturdy branches."
      }
    ]
  } ,
  
  { "name"       : "Sorcerer" ,
    
    "description": 
    [
      "Scions of innately magical bloodlines, the chosen of deities, the spawn of monsters, pawns of fate and destiny, or simply flukes of fickle magic, sorcerers look within themselves for arcane prowess and draw forth might few mortals can imagine. Emboldened by lives ever threatening to be consumed by their innate powers, these magic-touched souls endlessly indulge in and refine their mysterious abilities, gradually learning how to harness their birthright and coax forth ever greater arcane feats. Just as varied as these innately powerful spellcasters' abilities and inspirations are the ways in which they choose to utilize their gifts. While some seek to control their abilities through meditation and discipline, becoming masters of their fantastic birthright, others give in to their magic, letting it rule their lives with often explosive results. Regardless, sorcerers live and breathe that which other spellcasters devote their lives to mastering, and for them magic is more than a boon or a field of study; it is life itself."
    ],
    
    "role": 
    [
      "Sorcerers excel at casting a selection of favored spells frequently, making them powerful battle mages. As they become familiar with a specific and ever-widening set of spells, sorcerers often discover new and versatile ways of making use of magics other spellcasters might overlook. Their bloodlines also grant them additional abilities, assuring that no two sorcerers are ever quite alike."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Crossblooded",
        "replaces": "Spells Known",
        "summary": "A crossblooded bloodline combines the powers of two distinct heritages."
      },
      {
        "name": "Dragon Drinker",
        "replaces": "Bloodline Arcana; Claws Bloodline Power; 7th, 13th, and 19th-level Bloodline Feats",
        "summary": "(Requires Draconic Bloodline) The blood of dragons not only flows through a dragon\n drinker’s veins, but also empowers her spells and\n magical abilities when consumed."
      },
      {
        "name": "Eldritch Scrapper",
        "replaces": "1st, 9th, and 15th-level Bloodline Powers",
        "summary": "An eldritch scrapper is usually spoiling for a fight, looking to prove that she’s just as tough as a martial character."
      },
      {
        "name": "Mongrel Mage",
        "replaces": "Bloodline; Bloodline Powers; Bloodline Spells; 7th, 13th, and 19th-level Bloodline Feats",
        "summary": "A mongrel mage is a sorcerer whose bloodline is so weak, or mixed with so many others, that her power isn’t clearly associated with any bloodline source."
      },
      {
        "name": "Nine-Tailed Heir",
        "replaces": "Bloodline Spell",
        "summary": "(Kitsune only) Tian stories often tell of kitsune with multiple tails who have a magical quirk in their blood or have been blessed by their race’s deific matron, Daikitsu"
      },
      {
        "name": "Razmiran Priest",
        "replaces": "Eschew Materials; 3rd-level Bloodline Spell; 5th-level Bloodline Spell; 9th-level Bloodline Power",
        "summary": "The Razmiran priest is a magical charlatan, missionary servant of the Living God."
      },
      {
        "name": "Seeker",
        "replaces": "Eschew Materials, 3rd-level Bloodline Power, 15th-level Bloodline Power",
        "summary": "The seeker is obsessed with learning about their heritage and history, researching ancient texts and obscure ruins for clues."
      },
      {
        "name": "Sorcerer of Sleep",
        "replaces": "Bloodline Arcana; Eschew Materials; 1st-level Bloodline Power",
        "summary": "Some sorcerers have trouble accessing their innate gifts and must find another way to unlock them. For a sorcerer of sleep, the mind-altering drug pesh is the key."
      },
      {
        "name": "Stone Warder",
        "replaces": "Eschew Materials; 3rd-level Bloodline Spell; 7th-level Bloodline Feat",
        "summary": "Stone warders have an innate ability to create runes that allow them to ward areas with magic traps built from their spells. These sorcerers are most common among dwarves, but have been known to appear among other races who have strong ties to earth, rock, stone, mountains, and the Darklands."
      },
      {
        "name": "Tattooed Sorcerer",
        "replaces": "1st-level Bloodline Power; Eschew Materials; 7th-level Bloodline Feat; 9th-level Bloodline Power",
        "summary": "The tattooed sorcerer has embraced the ancient traditions of Varisian spellcasting, and uses colorful and intricate tattoos to enhance her magical powers."
      },
      {
        "name": "Umbral Scion",
        "replaces": "Bloodline (Shadow Only); Spellcasting; Shadowstrike Bloodline Power; 7th and 13th-level Bloodline Feats",
        "summary": "Umbral scions are sorcerers who are able to expertly control their especially potent shadow heritage. The majority of umbral sorcerers hail from the Darklands."
      },
      {
        "name": "Wishcrafter",
        "replaces": "Bloodline Arcana; Bloodline Bonus Spells; 7th, 13th, 19th-level Bloodline Bonus Feats",
        "summary": "(Ifrit Only) Wishcrafters are born with a talent for manipulating reality inherited from their efreeti ancestors."
      }
    ]
  } ,
  
  { "name"       : "Spiritualist" ,
    
    "description": 
    [
      "Becoming a spiritualist is not a calling—it’s a phenomenon. When a creature dies, its spirit flees its body and begins the next stage of its existence. Debilitating emotional attachments during life and other psychic corruptions cause some spirits to drift into the Ethereal Plane and descend toward the Negative Energy Plane. Some of these spirits are able to escape the pull of undeath and make their way back to the Material Plane, seeking refuge in a psychically attuned mind. Such a fusing of consciousnesses creates a spiritualist—the master of a single powerful phantom whom the spiritualist can manifest to do her bidding."
    ],
    
    "role": 
    [
      "The spiritualist seeks the occult and esoteric truth about life, death, and the passage beyond, using her phantom as a guide and tool. The connection with her phantom allows her to harness the powers of life and death, thought and nightmare, shadow and revelation."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Drowned Channeler",
        "replaces": "Class Skills; Phantom; Shared Consciousness; Etheric Tether; Bonded Manifestation; Bonded Senses; Detect Undead; Calm Spirit; See Invisibility; Call Spirit",
        "summary": "When a drowned spirit doomed to a watery grave descends toward the evil of undeath and seeks refuge in a mortal shell, the result is an unusual spiritualist with powers that resonate with the drowned spirit’s demise."
      },
      {
        "name": "Ectoplasmatist",
        "replaces": "Etheric Tether; Phantom; Shared Consciousness; Fused Consciousness; Spiritual Bond; Empowered Consciousness; Bonded Manifestation; Phantom Recall; Dual Bond; Spiritual Interference; Greater Spiritual Interference",
        "summary": "Instead of calling upon a phantom from the Ethereal Plane, an ectoplasmatist infuses herself with the mysterious substance called ectoplasm."
      },
      {
        "name": "Exciter",
        "replaces": "Phantom; Emotional Focus; Phantom Recall; Etheric Tether; Bonded Senses; Spiritual Bond; Spiritual Interference; Fused Consciousness; Spiritual Interference;",
        "summary": "The phantom that accompanies the exciter fills him with unbridled exultation, as he lets feeling and passion rule and sharpen his mind and body into a glorious fusion."
      },
      {
        "name": "Fated Guide",
        "replaces": "Antagonistic; Bonded Manifestation; See Invisibility; Call Spirit",
        "summary": "Not all phantoms are restless dead escaping the afterlife. On rare occasions, Pharasma returns a judged soul to the Material Plane—linking the spirit to a devout believer—to complete some final task, make amends for a crime, or grant a sharply divided soul a second chance."
      },
      {
        "name": "Fractured Mind",
        "replaces": "Spellcasting; Detect Undead; Calm Spirit; See Invisibility; Call Spirit",
        "summary": "Most spiritualists harbor the spirits of the deceased in their psyches, but a small number of them—known as fractured minds—draw their powers instead from a fraction of their own souls that resonates with extremely powerful emotions."
      },
      {
        "name": "Geist Channeler",
        "replaces": "Phantom; Emotional Focus; Bonded Manifestation",
        "summary": "Some phantoms retain less of their personalities and memories than others. Though most phantoms maintain some semblance of their former selves, others of their kind, known as geists, came close to being lost forever before they became phantoms."
      },
      {
        "name": "Hag-Haunted",
        "replaces": "Phantom; Shared Consciousness; Fused Consciousness; Spells; Spiritual Interference; Greater Spiritual Interference",
        "summary": "A hag who dies with a curse on her breath is often anchored to the Ethereal Plane by the power of her hatred— similar to vile and angry mortal souls—and some even claw their way back to the living world through the souls of those they despised or ruined... or those unfortunate souls they birthed. Hag-haunted spiritualists are tethered to these spiteful spirits, anchoring them once again in the world of the living."
      },
      {
        "name": "Haunted",
        "replaces": "Bonded Manifestation; Dual Bond",
        "summary": "The haunted are a dangerous breed of spellcasters bound to temperamental and unpredictable phantoms that leech power from their spiritualists."
      },
      {
        "name": "Involutionist",
        "replaces": "Spellcasting; Phantom; Emotional Focus; Bonded Manifestation; Detect Undead, 11th, 15th, 17th-level uses of Calm Spirit",
        "summary": "Rather than bond with an existing spirit as most Rivethun eventually do, the involutionist creates a spirit from a piece of her own soul."
      },
      {
        "name": "Necrologist",
        "replaces": "Alignment; Share Consciousness; Share Spells; 5th, 13th-level slam damage increase; Devotion; Bonded Manifestation; Spiritual Interference; Greater Spiritual Interference",
        "summary": "The vile spiritualists known as necrologists reach toward the Negative Energy Plane and for whatever evil purpose, they bring back malevolent spirits whose passions have turned to vengeance and hate for all life."
      },
      {
        "name": "Onmyoji",
        "replaces": "Spellcasting; Shared Consciousness; Fused Consciousness; Spiritual Interference; Greater Spiritual Interference",
        "summary": "Though most spiritualists are chosen by their phantoms, others deliberately call phantoms to them through years of careful preparation and study in obscure divine traditions."
      },
      {
        "name": "Phantom Blade",
        "replaces": "Weapon and Armor Proficiencies; Phantom; Phantom Recall; Spiritual Bond; Dual Bond; Etheric Tether; Shared Consciousness; Fused Consciousness; Empowered Consciousness; Bonded Senses; Bonded Manifestation; Spiritual Interference; Greater Spiritual Interference",
        "summary": "A small selection of spiritualists are connected to spirits of combat and warfare, and manifest a weapon instead of a phantom."
      },
      {
        "name": "Quintessentialist",
        "replaces": "Spellcasting; Phantom",
        "summary": "The quintessentialist learns to project her best self—her exemplar—as an independent being, but in doing so leaves only the weakest and basest aspects behind in her body."
      },
      {
        "name": "Scourge",
        "replaces": "Spiritual Interference; Devotion; Calm Spirit; Greater Spiritual Interference",
        "summary": "Scourges are students of pain and have a rare connection to tormented and wracked spirits."
      },
      {
        "name": "Seeker of Enlightenment",
        "replaces": "Shared Consciousness; Detect Undead; Calm Spirit; See Invisibility; Fused Consciousness; Call Spirit",
        "summary": "Sometimes a spiritualist is so haunted by a past life’s failure to reach enlightenment that the past life is reborn not as a new creature but as a phantom in a spiritualist’s consciousness."
      },
      {
        "name": "Shadow Caller",
        "replaces": "Phantom; Emotional Focus; Shared Consciousness; Etheric Tether; Phantom Recall; See Invisibility; Fused Consciousness; Empowered Consciousness",
        "summary": "While most spiritualists form a bond with the remnants of a creature’s soul, some explore ways to bind ephemeral shadows to their own souls in exchange for power."
      },
      {
        "name": "Soul Warden",
        "replaces": "Phantom; Etheric Tether; Shared Consciousness; Spiritual Interference; Fused Consciousness; Greater Spiritual Interference; Bonded Senses; Phantom Recall; Bonded Manifestation; Dual Bond; Empowered Consciousness",
        "summary": "Soul wardens have helped their phantoms pass on and have become wardens of the soulstream, serving Pharasma and working with psychopomps to protect vulnerable souls from those who seek to capture, corrupt, or devour them."
      },
      {
        "name": "Totem Spiritualist",
        "replaces": "Phantom; Shared Consiousness; See Invisibility; Dual Bond",
        "summary": "These specialized spiritualists call upon phantoms that are manifestations of animals and personifications of nature."
      },
      {
        "name": "Usher of Lost Souls",
        "replaces": "Bonded Senses; Spiritual Interference; Greater Spiritual Interference; See Invisibility; Spiritual Bond",
        "summary": "Ushers of lost souls are spiritualists who focus on bringing the souls of the dead to their final judgments at the end of the River of Souls."
      },
      {
        "name": "Zeitgeist Binder",
        "replaces": "Phantom;  Detect Undead; Calm Spirit; See Invisibility; Call Spirit; Bonded Senses; Fused Consciousness",
        "summary": "Zeitgeist binders channel the emotional connections of a group of people into a unique phantom that personifies a community."
      }
    ]
  } ,
  
  { "name"       : "Summoner" ,
  
    "description": 
    [
      "While many who dabble in the arcane become adept at beckoning monsters from the farthest reaches of the planes, none are more skilled at it than the summoner. This practitioner of the arcane arts forms a close bond with one particular outsider, known as an eidolon, who gains power as the summoner becomes more proficient at his summoning. Over time, the two become linked, eventually even sharing a shard of the same soul. But this power comes with a price: the summoner’s spells and abilities are limited due to his time spent enhancing the power and exploring the nature of his eidolon."
    ],
    
    "role": 
    [
      "Summoners spend much of their time exploring the arcane arts alongside their eidolons. While their power comes from within, they rely heavily on their eidolon companions in dangerous situations. While a summoner and his eidolon function as individuals, their true power lies in what they can accomplish together."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Blood God Disciple",
        "replaces": "Summon Monster",
        "summary": "(Half-Orc) A half-orc summoner who devotes himself to one of the bloody orc gods may believe his eidolon is an avatar of that god rather than a mere supernatural creature."
      },
      {
        "name": "Blood Summoner",
        "replaces": "Class Skills; Shield Ally; Transposition; Greater Shield Ally; Merge Forms",
        "summary": "A blood summoner conjures an eidolon born from violence and blood."
      },
      {
        "name": "Broodmaster",
        "replaces": "Eidolon; Life Link; Life Bond; Merge Forms",
        "summary": "Most summoners bond with one eidolon for their entire lives, but the broodmaster forges a link with multiple smaller eidolons that make up his brood."
      },
      {
        "name": "Counter-Summoner",
        "replaces": "Summon Monster; Bond Senses; Aspect; Greater Aspect",
        "summary": "While most summoners excel at conjuring monsters, there are those who focus instead on disrupting the conjurations of opponents."
      },
      {
        "name": "Evolutionist",
        "replaces": "Maker’s Call; Transposition; Greater Shield Ally",
        "summary": "An evolutionist possesses greater power over his eidolon’s form, and is able to evolve his eidolon and its abilities to meet any challenge or face any threat as it comes up, seemingly on a whim."
      },
      {
        "name": "First Worlder",
        "replaces": "Summon Monster I; Eidolon",
        "summary": "A first worlder summoner has a more primal connection to nature, their power being tied to the First World."
      },
      {
        "name": "God Caller",
        "replaces": "Class Skills; Life Link; Transposition; Aspect; Greater Aspect; Twin Eidolon",
        "summary": "od callers follow a fractured tradition that originated in the now-lost nation of Sarkoris. They speak to an assortment of ancient divine powers to lead their communities and sometimes stir up reformations in faiths with ideals similar to their personal convictions."
      },
      {
        "name": "Leshy Caller",
        "replaces": "Eidolon; Summon Monster",
        "summary": "A leshy caller summons creatures from the First World and forges a bond with a leshy eidolon."
      },
      {
        "name": "Master Summoner",
        "replaces": "Summon Monster I; Shield Ally; Bond Senses",
        "summary": "The master summoner sacrifices the power of his eidolon in favor of summoning a plethora of otherworldly creatures to aid him."
      },
      {
        "name": "Morphic Savant",
        "replaces": "Eidolon; Summon Monster; Spells",
        "summary": "A morphic savant is an agent of change who draws power from the Abyss, Elysium, or the Maelstrom to fulfill whatever goals strike his fancy."
      },
      {
        "name": "Naturalist",
        "replaces": "Summon Monster; Shield Ally; Greater Shield Ally; Aspect Summoner; Life Bond; Greater Aspect",
        "summary": "A naturalist is a summoner who is in tune with the natural world, using his magic like a lens to focus various animal aspects onto his eidolon."
      },
      {
        "name": "Pyroclast",
        "replaces": "Spellcasting; Eidolon; Maker’s Call; Transposition",
        "summary": "Pyroclasts harness the primal elemental energy of magma. Their eidolons often resemble elemental beings."
      },
      {
        "name": "Shadow Caller",
        "replaces": "Class Skills; Summon Monster; Eidolon",
        "summary": "(Fetchling Only) While most summoners can call any manner of creature from across the planes to serve them in combat, supplementing the skills of their eidolon with a diverse range of creatures, others eschew this broad utility and instead concentrate upon calling forth entities from the Shadow Plane."
      },
      {
        "name": "Shaitan Binder",
        "replaces": "Share Spells; Shield Ally; Greater Shield Ally; Aspect; Greater Aspect; Twin Eidolon",
        "summary": "(Oread Only) Shaitan binders call upon a reflection of their genie ancestors to serve as their eidolons."
      },
      {
        "name": "Spirit Summoner",
        "replaces": "Summon Monster; Eidolon; Aspect; Maker’s Call; Merge Forms; Transposition",
        "summary": "A spirit summoner is an arcane spellcaster whose eidolon is a manifestation of a shamanic spirit."
      },
      {
        "name": "Storm Caller",
        "replaces": "Eidolon; Summon Monster; Shield Ally; Greater Shield Ally; Maker's Call; Transposition",
        "summary": "Many summoners beckon monsters from the Elemental Planes, but few are as specialized as storm callers, who channel the elemental energies of the Plane of Air."
      },
      {
        "name": "Story Summoner",
        "replaces": "Eidolon; Bond Senses; Transposition",
        "summary": "Story summoners rely on the harrow to weave the paths they walk, turning their tales into reality. They channel magic through their harrow decks to influence the strange extraplanar beings they summon, bringing familiar and fateful characters to life."
      },
      {
        "name": "Synthesist",
        "replaces": "Eidolon; Life Link; Shield Ally; Maker’s Call; Transposition; Greater Shield Ally; Merge Forms",
        "summary": "Rather than summon an eidolon to serve by his side, the synthesist fuses his eidolon’s essence to his own."
      },
      {
        "name": "Unwavering Conduit",
        "replaces": "Eidolon; Summon Monster; Spells",
        "summary": "Unwavering conduits work to keep everything ordered and regimented, drawing on power from the Eternal City of Axis, Heaven, or Hell to enforce whichever laws the summoner finds paramount."
      },
      {
        "name": "Wild Caller",
        "replaces": "Eidolon; Summon Monster; Aspect; Greater Aspect",
        "summary": "A wild caller summons creatures from the First World and forges a bond with an eidolon with a plant body."
      },
      {
        "name": "Wild Caller (Half-Elf)",
        "replaces": "Summon Monster; Eidolon",
        "summary": "(Half-Elf Only) The wild caller calls eidolons that take more natural and savage forms and summons from nature rather than the Great Beyond."
      }
    ]
  } ,
  
  { "name"       : "Swashbuckler" ,
  
    "description": 
    [
      "Whereas many warriors brave battle encased in suits of armor and wielding large and powerful weapons, swashbucklers rely on speed, agility, and panache. Swashbucklers dart in and out of the fray, wearing down opponents with lunges and feints, all while foiling the powerful attacks against them with a flick of the wrist and a flash of the blade. Their deft parries and fatal ripostes are carnage elevated to an art form. Some may be arrogant and devil-may-care, but behind this veneer lie people deeply dedicated to their craft. Those of smaller races are particularly driven to prove that the right mix of discipline and daring is the perfect counter to size and strength, and enjoy nothing more than taking down lumbering brutes and bullies."
    ],
    
    "role": 
    [
      "Combining fancy footwork with quick and precise lunges, swashbucklers dart in and out of battle, harassing and thwarting their opponents. These fast and agile combatants serve as protectors for spellcasters and flank mates for rogues and slayers, while waiting for the opportunity to show panache and score the killing blow on some lumbering hulk. Swashbucklers often face death with wry humor, mocking it with jabbing wit."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Arrow Champion",
        "replaces": "Panache; Opportune Parry and Riposte; Precise Strike; Swashbuckler's Initiative; Swashbuckler Weapon Training; Swashbuckler Weapon Mastery",
        "summary": "Arrow champions combine a swashbuckler’s agile style of combat with mastery over the bow"
      },
      {
        "name": "Azatariel",
        "replaces": "Alignment; Menacing Swordplay; Precise Strike; Targeted Strike; Bleeding Wound; Charmed Life; Nimble; Bonus Feats",
        "summary": "Azatariels are the champions of Elysium, dedicated to spreading its unpredictable whimsy and capricious goodness across the planes."
      },
      {
        "name": "Courser",
        "replaces": "Opportune Parry and Riposte; Nimble; Menacing Swordplay; Superior Feint; Bleedoung Wound",
        "summary": "Coursers move with grace and ease, racing across rooftops, dashing up walls, and clearing vast gaps between buildings."
      },
      {
        "name": "Daring Infiltrator",
        "replaces": "Class Skills; Bonus Feat; Swashbuckler Initiative; Menacing Swordplay; Bleeding Wound",
        "summary": "Not known for their flashy entrances or for standing out in a crowd, a daring infiltrator uses stealth, disguise, and ruthless guile to pursue her goals."
      },
      {
        "name": "Dashing Thief",
        "replaces": "Class Skills; Derring-Do; Swashbuckler's Edge; Panache; Bonus Feats; Menacing Swordplay; Dizzying Defense",
        "summary": "The dashing thief relies on swift swordplay, dazzling charm, and spirited courage to commit audacious acts of thievery."
      },
      {
        "name": "Flying Blade",
        "replaces": "Panache; Dodging Panache; Kip-Up; Menacing Swordplay; Targeted Strike; Bleeding Wound; Perfect Thrust; Swashbuckler Weapon Training; Swashbuckler Weapon Mastery",
        "summary": "While most swashbucklers prefer their battles up close, others prefer dealing death from a distance."
      },
      {
        "name": "Guiding Blade",
        "replaces": "Bonus Feats; 1st, 7th, 15th-level Deeds; Charmed Life; Nimble; Kip-up",
        "summary": "Instead of parrying attacks against her, a guiding blade redirects her enemies’ ire away from her allies, interfering with enemies who attack her allies, whether that attack comes by blade or by spell."
      },
      {
        "name": "Inspired Blade",
        "replaces": "Panache; Swashbuckler Finesse; Bleeding Wound; Swashbuckler Weapon Training; Swashbuckler Weapon Mastery",
        "summary": "An inspired blade is both a force of personality and a sage of swordplay dedicated to the perfection of combat with the rapier."
      },
      {
        "name": "Mouser",
        "replaces": "Opportune Parry and Riposte; Menacing Swordplay; Targeted Strike; Bleeding Wound",
        "summary": "In the hands of a trained warrior, a well-sharpened blade is deadly regardless of size. A mouser moves in close, using her size and skill as an advantage."
      },
      {
        "name": "Musketeer",
        "replaces": "Weapon Proficiencies; Swashbuckler Finesse; Dodging Panache",
        "summary": "A number of organizations and kingdoms search for warriors who are brave (or foolish) enough to wield firearms on the battlefield."
      },
      {
        "name": "Mysterious Avenger",
        "replaces": "Alignment; Class Skills; Weapon/Armor Proficiencies; Swashbuckler Finesse; Nimble; 4th-level Bonus Feat; Swashbuckler Weapon Training",
        "summary": "While some swashbucklers fight for queen and country, and others for coin, glory, or just the enhancement of their own reputations, the mysterious avenger fights directly for a cause."
      },
      {
        "name": "Noble Fencer",
        "replaces": "Dodging Panache; Superior Feint; Subtle Blade; Charmed Life",
        "summary": "Noble fencers use their quick wits and panache in both physical and social confrontations, and they rely on their training and discipline to emerge victorious, rather than merely trusting to luck."
      },
      {
        "name": "Picaroon",
        "replaces": "Weapon Proficiencies; Panache; Opportune Parry and Riposte; Kip-Up; Superior Feint; Bleeding Wound; Swashbuckler Finesse",
        "summary": "While some swashbucklers take pride in their ability to wear down an opponent with great skill at arms and clever positioning, there are those who use firearms to get in close and hit hard."
      },
      {
        "name": "Rondelero Swashbuckler",
        "replaces": "Derring-Do; Kip-Up; Bleeding Wound; Perfect Thrust; Charmed Life",
        "summary": "Rondelero swashbucklers are Taldan specialists in an aggressive, lightly armored fighting style that utilizes the falcata and buckler."
      },
      {
        "name": "Rostland Bravo",
        "replaces": "Class Skills; Armor Proficiency; Menacing Swordplay; Superior Feint; Bleeding Wound; Swashbuckler's Edge",
        "summary": "While some duelists favor more technical approaches, others study flashier maneuvers, wielding the curved blade with artful flair. Disdainfully called “bravos” by classically trained rivals, students of this approach have claimed the label with pride."
      },
      {
        "name": "Shackles Corsair",
        "replaces": "Nimble; Swashbuckler Initiative; Targeted Strike",
        "summary": "A Shackles corsair’s debonair charm and style make her a paradoxical celebrity even among the nations whose ships she plunders."
      },
      {
        "name": "Veiled Blade",
        "replaces": "Class Skills; Opportune Parry and Riposte; Menacing Swordplay; Swashbuckler's Grace; Swashbuckler's Edge",
        "summary": "Veiled blades specialize in subtlety, not through clandestine sneaking but simply by appearing to be someone harmless and unarmed."
      },
      {
        "name": "Whirling Dervish",
        "replaces": "Swashbuckler Finesse; Panache; Superior Feint; Targeted Strike; Bleeding Wound; Deadly Stab",
        "summary": "In Qadira and throughout the Padishah Empire, Sarenrae’s worshipers praise the Dawnflower through dance. Her more warlike followers adapted these dances into graceful martial forms, and their swashbuckling style is feared throughout the Inner Sea region and beyond for its ability to devastate foes with a scimitar through motion and agility regardless of strength of arms."
      },
      {
        "name": "Wildstrider",
        "replaces": "Class Skills; Dodging Panache; Derring-Do; Swashbuckler's Edge; Kip-Up; Subtle Blade",
        "summary": "Most swashbucklers call cities their home, but some prefer deserts, marshlands, mountains, or woods, where the rough terrain grants them an advantage, and have little interest in the comforts of an urban lifestyle."
      }
    ]
  } ,
  
  { "name"       : "Vigilante" ,
  
    "description": 
    [
      "Life can be unfair. Think of the starving peasants forced to toil for the local baron or the common laborers tasked with building the king’s newest palace for a mere handful of copper pieces each week. There are those who see these injustices and do nothing. There are those who are willing to reap the rewards obtained through the suffering of others. Then there are those who see inequality and find themselves driven to take action, outside the law if necessary. These vigilantes operate in plain sight, hiding behind respectable personas by day, but donning alternate guises by night to right the wrongs they see all around them.",
      "Not all vigilantes are out to make the world a better place. Some criminals hide behind the pretense of being ordinary folk, only to become terrors in the shadows, stealing and killing to fulfill some dark agenda. In either case, the vigilante is a character of two natures—the face that everyone knows and the mask that inspires fear."
    ],
    
    "role": 
    [
      "A vigilante can take on many tasks within a group. Most are skilled at negotiating delicate social situations and courtly intrigue, but they can also serve as stealthy spies or even brutish warriors in dangerous environments."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Agathiel",
        "replaces": "Dual Identity; Vigilante Specialization; 1st-level Social Talent; 6th-level Vigilante Talent",
        "summary": "Agathiels surrender a portion of their immortal souls to Nirvana in exchange for a measure of animalistic might to aid them in their righteous crusades."
      },
      {
        "name": "Anaphexia Thought-Killer",
        "replaces": "2nd, 6th-level Social Talent; 7th, 15th-level Vigilante Talent",
        "summary": "Anaphexia thought-killers cut out their own tongues to gain magical protection from exposure and hunt down secrets to steal before they can be spread"
      },
      {
        "name": "Avenging Beast",
        "replaces": "Class Skills; Skill Ranks; Dual Identity; 4th, 7th, 10th ,14th, 16th-level Vigilante Talents; Vigilante Specialization; Startling Appearance; Frightening Appearance; Stunning Appearance",
        "summary": "Some vigilantes turn to natural traditions and supernatural forces to transform into beasts, unleashing a primal fury on their foes before returning to an ordinary guise."
      },
      {
        "name": "Bellflower Harvester",
        "replaces": "Dual Identity; Vigilante Specialization; 1st-level Social Talent; 2nd-level Vigilante Talent",
        "summary": "Bellflower harvesters are the front-line operatives of the secretive Bellflower Network"
      },
      {
        "name": "Brute",
        "replaces": "Alignment; Base Saving Throws; Weapon and Armor Proficiency; Vigilante Specialization; Vengeance Strike",
        "summary": "Some vigilantes can transform into brutish versions of themselves, becoming larger, more terrifying in appearance, and far more formidable in combat—though at a price."
      },
      {
        "name": "Cabalist",
        "replaces": "Class Skills; Skill Ranks; Weapon and Armor Proficiency; 4th, 8th, 10th, 14th, 16th-level Vigilante Talent; Vigilante Specialization; Startling Appearance; Frightening Appearance; Stunning Appearance",
        "summary": "Practice with blood sacrifices, necromancy, and shadow magic gives a cabalist a reputation as a sinister and dangerous vigilante."
      },
      {
        "name": "Darklantern",
        "replaces": "Creature Type; Dual Identity; 1st-level Social Talent; 4th-level Vigilante Talent",
        "summary": "Select members of the Lantern Bearers undergo a horrific ritual allowing them to temporarily experience the dark transformation into a drow, but at the cost of their sanity."
      },
      {
        "name": "Dragonscale Loyalist",
        "replaces": "1st-level Social Talent; Unshakable; Startling Appearance; Frightening Appearance; Stunning Appearance",
        "summary": "Dragonscale loyalists serve the throne of Brevoy. When not acting as courtiers, these agents don fearsome draconic masks, becoming anonymous protectors of the king-regent’s rule."
      },
      {
        "name": "Experimenter",
        "replaces": "Alignment; Vigilatne Specialization; 1st-level Social Talent; Unshakable; Startling Appearance; Frightening Appearance; Stunning Appearance",
        "summary": "Some vigilantes adopt lives of secrecy to hide their strange experiments from public view."
      },
      {
        "name": "Faceless Enforcer",
        "replaces": "Weapon and Armor Proficiencies; Dual Identity; 2nd, 6th-level Vigilante Talent; 5th, 11th, 17th-level Social Talent",
        "summary": "Unyielding warriors, faceless enforcers lock their identities behind implacable helms."
      },
      {
        "name": "Ferocious Hunter",
        "replaces": "Dual Identity; 2nd, 8th-level Vigilante Talent; Unshakable",
        "summary": "Some half-orcs have such distant orc ancestry that they have the ability to move through the world without experiencing the same discrimination many of their kin, yet many of these half-orcs still take great pride in their heritage and have a powerful desire to show the world that half-orcs are deserving of respect"
      },
      {
        "name": "Gunmaster",
        "replaces": "Weapon and Armor Proficiency; Vigilante Specialization; Unshakable",
        "summary": "Gunmasters brandish firearms like extensions of their will, taking down their foes with deadly accuracy and skill."
      },
      {
        "name": "Half-Elf Double Scion",
        "replaces": "Dual Identity",
        "summary": "The deception of hiding their true heritage can take a toll on some half-elves, and some form alternate identities to let the suppressed side of their heritage be known."
      },
      {
        "name": "Hangman",
        "replaces": "Weapon and Armor Proficiencies; Vigilante Specialization; 2nd, 4th-level Vigilante Talent; Unshakable; Startling Appearance; Frightening Appearance; Stunning Appearance",
        "summary": "Wherever the guilty walk free, the hangman brings judgment."
      },
      {
        "name": "Hidden Current",
        "replaces": "1st-level Social Talent; 2nd-level Vigilante Talent; Frightening Appearance",
        "summary": "The hidden current operates above and below the sea."
      },
      {
        "name": "Imperial Agent",
        "replaces": "1st, 5th-level Social Talent; Unshakable",
        "summary": "Imperial agents are often the descendants of nobility and generals from Lung Wa, devoted to reuniting the empire by conquering Lung Wa’s successor states"
      },
      {
        "name": "Magical Child",
        "replaces": "Class Skills; Skill Ranks; Weapon and Armor Proficiency; 4th, 8th, 14th, 16th-level Vigilante Talents; Vigilante Specialization",
        "summary": "Some vigilantes, no matter their age, carry a spark of capricious whimsy under which flows a powerful current of magic and wonder."
      },
      {
        "name": "Masked Maiden",
        "replaces": "Weapon and Armor Proficiencies; Dual Identity; Seamless Guise; 3rd, 7th, 11th, 15th, 19th-level Social Talents",
        "summary": "Masked maidens find themselves leading a double life: ordinary (albeit troubled) citizen by day, faceless warrior by night. In the most tragic cases, the identities entirely disassociate, with the maiden experiencing unexplained exhaustion and injuries upon awakening."
      },
      {
        "name": "Mounted Fury",
        "replaces": "Class Skills; Vigilante Specialization; 6th, 12th-level Vigilante Talent; Vengeance Strike",
        "summary": "Some vigilantes form special bonds with the creatures they use as steeds, considering these loyal and trusted mounts just as much heroes or antiheroes as they might be."
      },
      {
        "name": "Mutated Defender",
        "replaces": "Vigilante Specialization; Vigilante Talents",
        "summary": "Occasionally a mutation takes hold of the body of a vigilante, but he learns to hide his maladies, usually through alchemical concoctions or magical concealment"
      },
      {
        "name": "Psychometrist",
        "replaces": "Class Skills; 1st-level Social Talent; 2nd, 6th, 12th, 18th-level Vigilante Talent; Unshakable",
        "summary": "Psychometrists aren’t spellcasters; instead, they collect strange items or create their own uncanny gadgets that seem to only work for them."
      },
      {
        "name": "Serial Killer",
        "replaces": "Alignment; Vigilante Specialization; Unshakable; 4th, 6th, 14th-level Vigilante Talent; 7th, 9th, 19th-level Social Talent; Startling Appearance; Frighting Appearance; Stunning Appearance",
        "summary": "Some vigilantes adopt an innocent guise to cloak their acts of brutal murder."
      },
      {
        "name": "Splintersoul",
        "replaces": "Dual Identity; Unshakable; 3rd, 7th-level Social Talents; Startling Appearance; Frightening Appearance; Stunning Appearance",
        "summary": "A splintersoul pushes the boundaries of what it means to have two separate identities."
      },
      {
        "name": "Teisatsu",
        "replaces": "Weapon and Armor Proficiency; Vigilante Specialization; 2nd-level Vigilante Specialization; Vigilante Talents",
        "summary": "Teisatsu are specialized vigilantes who focus on infiltrating social scenes and high-society gatherings on behalf of the feuding lords of Minkai."
      },
      {
        "name": "Warlock",
        "replaces": "Class Skills; Skill Ranks; Armor Proficiency; 4th, 8th, 10th, 14th, 16th-level Vigilante Talent; Vigilante Specialization; Unshakable",
        "summary": "Practicing magic in secret, the warlock obscures her arcane scholarship from public view."
      },
      {
        "name": "Wildsoul",
        "replaces": "Vigilante Specialization; 2nd, 6th, 12th, 18th-level Vigilante Talent",
        "summary": "Within some vigilantes are incredible innate abilities that, although normally the domain of natural beasts, inexplicably aid them in fighting their enemies."
      },
      {
        "name": "Zealot",
        "replaces": "Class Skills; Skill Ranks; Weapon Proficieny; 4th, 8th, 10th, 14th, 16th-level Vigilante Talent; Alignment; Vigilante Specialization;",
        "summary": "Dedicated to a single deity, the zealot hunts the enemies of his faith in secret, often because his religion is outlawed or persecuted in the region."
      }
    ]
  } ,
  
  { "name"       : "Warpriest" ,
  
    "description": 
    [
      "Capable of calling upon the power of the gods in the form of blessings and spells, warpriests blend divine magic with martial skill. They are unf linching bastions of their faith, shouting gospel as they pummel foes into submission, and never shy away from a challenge to their beliefs. While clerics might be subtle and use diplomacy to accomplish their aims, warpriests aren’t above using violence whenever the situation warrants it. In many faiths, warpriests form the core of the church’s martial forces—reclaiming lost relics, rescuing captured clergy, and defending the church’s tenets from all challenges."
    ],
    
    "role": 
    [
      "Warpriests can serve as capable healers or spellcasters, calling upon their divine powers from the center of the fight, where their armor and martial skills are put to the test."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Calamity Caller",
        "replaces": "Blessings; Focus Weapon; Sacred Weapon; Bonus Feats; Aspect of War",
        "summary": "(Elf Only) While all elves feel a deep connection to nature, some elven priests take this bond further, using their link to call down the wrath of nature upon their enemies"
      },
      {
        "name": "Champion of the Faith",
        "replaces": "Sacred Weapon; 3rd-level Bonus Feat; Channel Energy",
        "summary": "Champions of the faith are crusaders who use the power of their divine patron to annihilate the faith’s enemies."
      },
      {
        "name": "Cult Leader",
        "replaces": "Class Skills; Skill Ranks; Weapon/Armor Proficiencies; Focus Weapon; 3rd, 9th, 12th, and 15th-level Bonus Feats; Channel Energy",
        "summary": "Referred to as fanatics, lunatics, or obsessives, cultists see themselves as genuine devotees of their deity."
      },
      {
        "name": "Disenchanter",
        "replaces": "Bonus Feats; Channel Energy; 6th-level Bonus Feat",
        "summary": "While many warpriests focus on threats to the body, the disenchanter focuses on dangers to the mind and the soul."
      },
      {
        "name": "Divine Champion",
        "replaces": "3rd, 6th, 9th, 12th, 18th-level Bonus Feat",
        "summary": "Divine champions are unswervingly devoted to their causes, and specialize in bringing battle to the enemies of their faiths."
      },
      {
        "name": "Divine Commander",
        "replaces": "Blessings; 3rd, 6th, 12th, and 15th-level Bonus Feats",
        "summary": "Some warpriests are called to lead great armies and face legions of foes. These divine commanders live for war and fight for glory."
      },
      {
        "name": "Feral Champion",
        "replaces": "Blessings; Sacred Weapon; Sacred Armor",
        "summary": "When a warpriest devotes himself to a god of the natural world, he is sometimes blessed with supernatural powers that allow him to evoke animalistic power and fury."
      },
      {
        "name": "Fist of the Godclaw",
        "replaces": "Alignment; Deities; Blessings; 3rd, 6th, 12th-level Bonus Feat; Aspect of War",
        "summary": "Devoted to the divine control of law above all else, these zealots seek to establish absolute order."
      },
      {
        "name": "Forgepriest",
        "replaces": "Blessings; Spells; Bonus Feats; 3rd and 6th-level Bonus Feats; Channel Energy",
        "summary": "Armorers of exquisite skill, forgepriests take inspiration from their deity to produce the most perfect weapons and armor they can, the better to equip the armies of the faithful."
      },
      {
        "name": "Jistkan Magistrate",
        "replaces": "Class Skilss; Blessings; Spontaneous Casting; Bonus Languages; Channel Energy",
        "summary": "Some warpriests study the ancient magic that the Jistkan magistrates used to bind elementals and make pacts with genies."
      },
      {
        "name": "Liberty's Blade",
        "replaces": "Blessings; Sacred Weapon; Channel Energy; Sacred Armor",
        "summary": "There are some who find in the call to freedom something primal and spiritual, even more so than other Andorens."
      },
      {
        "name": "Mantis Zealot",
        "replaces": "Deity; Alignment; Weapon and Armor Proficiencies; Sacred Weapon; Sacred Armor; Aspect of War",
        "summary": "Among the Red Mantis worshipers of Achaekek, some hold such strong faith in their assassin god that they gain divine power."
      },
      {
        "name": "Molthuni Arsenal Chaplain",
        "replaces": "Blessing; Sacred Armor; Sacred Weapon; Channel Energy",
        "summary": "Molthuni arsenal chaplains are warpriests trained in the Arsenal District in Korholm. They bolster their nation’s military by focusing on the militant aspects of their gods."
      },
      {
        "name": "Proclaimer",
        "replaces": "Alignment; Deity; Spellcasting; Fervor; Sacred Armor; Channel Energy",
        "summary": "A proclaimer rushes into Abyss-twisted wastes with nothing but his weapon in his hand and his faith in his heart, shouting his deity’s name to the skies"
      },
      {
        "name": "Proselytizer",
        "replaces": "Weapon/Armor Proficiencies; Sacred Armor; 3rd-level Bonus Feat; Sacred Weapon; Blessings; Blessings (Major)",
        "summary": "The proselytizer is the perfect militant missionary. He seeks to win the hearts and lay claim to the souls of those he meets, and—failing that—spreads the word of his deity at the edge of the sword."
      },
      {
        "name": "Sacred Fist",
        "replaces": "Class Skills; Weapon/Armor Proficiencies; Sacred Weapon; Focus Weapon; 3rd, 6th, 9th, 12th, and 18th-level Bonus Feats; Sacred Armor",
        "summary": "Unlike many warpriests, sacred fists leave behind armor and shield and instead rely on their fists and whatever protection their deity bestows on them."
      },
      {
        "name": "Shieldbearer",
        "replaces": "Focus Weapon; Sacred Weapon; Sacred Armor;",
        "summary": "Shieldbearers are divine warriors who stand on the front lines of battle, shoulder to shoulder with the soldiers of their people."
      },
      {
        "name": "Sixth Wing Bulwark",
        "replaces": "Armor Proficiencies; Focus Weapon; Sacred Weapon; Sacred Armor; 6-th, 12th-, 18th-level Bonus Feats",
        "summary": "The Sixth Wing bulwark are followers of Ragathiel that train to hold the line and defend against the incursion of evil forces, fortifying herself and her allies to stand strong in the face of any opposition, no matter how dire."
      }
    ]
  } ,
  
  { "name"       : "Witch" ,
  
    "description": 
    [
      "Some gain power through study, some through devotion, others through blood, but the witch gains power from her communion with the unknown. Generally feared and misunderstood, the witch draws her magic from a pact made with an otherworldly power. Communing with that source, using her familiar as a conduit, the witch gains not only a host of spells, but a number of strange abilities known as hexes. As a witch grows in power, she might learn about the source of her magic, but some remain blissfully unaware. Some are even afraid of that source, fearful of what it might be or where its true purposes lie."
    ],
    
    "role": 
    [
      "While many witches are recluses, living on the edge of civilization, some live within society, openly or in hiding. The blend of witches’ spells makes them adept at filling a number of different roles, from seer to healer, and their hexes grant them a number of abilities that are useful in a fight. Some witches travel about, seeking greater knowledge and better understanding of the mysterious powers that guide them."
    ],

    "archetypes" : 
    [
      {
        "name": "undefined",
        "replaces": "undefined",
        "summary": "undefined"
      },
      {
        "name": "Alley Witch",
        "replaces": "Familiar; 1st and 6th-level Hexes",
        "summary": "Some witches find their spark of magic in the long, dark shadows and forgotten places within the city."
      },
      {
        "name": "Ashiftah",
        "replaces": "Familiar; 2nd, 6th-level Hex",
        "summary": "Known in Taldane as a “battle witch,” an ashiftah drifts like a phantom among the enemy armies, calling down disaster upon their heads and weakening their resolve."
      },
      {
        "name": "Beast-Bonded",
        "replaces": "4th-level Hex; 8th-level Hex; 10th-level Major Hex",
        "summary": "While all witches are intimately tied to their familiars, a beast-bonded witch’s craft focuses specifically on her familiar bond and developing the relationship with her patron through her familiar."
      },
      {
        "name": "Bonded Witch",
        "replaces": "Familiar",
        "summary": "(Half-Elf Only) While all witches commune with the unknown, the blend of human ingenuity and adept learning mixed with elven blood gives some half-elves a unique conduit to channel the powers of the arcane."
      },
      {
        "name": "Bouda",
        "replaces": "Alignment; Familiar; 1st-level Hex; 10-level Major Hex",
        "summary": "These strange and often solitary witches have a strong connection to curses, the evil eye, and hyenas."
      },
      {
        "name": "Cartomancer",
        "replaces": "Familiar; 2nd-level Hex",
        "summary": "A witch who serves the spirits of the harrow in exchange for mystical power is known as a cartomancer."
      },
      {
        "name": "Coral Witch",
        "replaces": "Patron; Familiar; 8th-level Hex",
        "summary": "Coral witches use their magic to fashion familiars from living coral and emulate the unyielding tenacity of these durable marine organisms."
      },
      {
        "name": "Demon-Sworn",
        "replaces": "Patron Spells; 6th-level Hex",
        "summary": "In the depths of the Darklands, as well as similarly inhospitable locales on Golarion, many seek the succor of demons as a means of survival."
      },
      {
        "name": "Dimensional Occultist",
        "replaces": "2nd-level Hex, 8th-level Hex, 12th-level Hex",
        "summary": "The dimensional occultist sacrifices some of her mastery over hexes in return for much increased planar lore."
      },
      {
        "name": "Dreamweaver",
        "replaces": "Class Skills; Patron Spells; 2nd, 6th, 10th-level Hexes",
        "summary": "(Changeling Only) A changeling dreamweaver draws upon her hag heritage to ply the dream realms in order to touch mortal minds and souls, for good or ill."
      },
      {
        "name": "Flood Walker",
        "replaces": "Alignment; Class Skills; 4th, 10th, 16th, 18th-level Patron Spells; 1st, 6th, 10th-level Hex",
        "summary": "Witches who dwell in floodplains or along the banks of predictably dangerous rivers can tap into the underlying potential of surging waters in order to enhance their eerie powers."
      },
      {
        "name": "Gingerbread Witch",
        "replaces": "Familiar; 1st, 4th, 8th, 10th, 12th, 16th-level Hex",
        "summary": "A sweet tooth lures the gingerbread witch’s victims to doom."
      },
      {
        "name": "Gravewalker",
        "replaces": "Patron Spells; Familiar; 1st-level Hex; 4th-level Hex; 8th-level Hex",
        "summary": "Having much in common with necromancers, the gravewalker is obsessed with the occult manipulations of the dead, particularly mindless undead such as zombies."
      },
      {
        "name": "Hag of Gyronna",
        "replaces": "Patron; Spells; 2nd, 8th, 12th-level Hexes",
        "summary": "Only female witches dare dedicate themselves to the Angry Hag, and those who do so are feared for their ability to bend minds and sow discord."
      },
      {
        "name": "Hagbound",
        "replaces": "1st, 2nd, 4th, 8th, 10th, 12th, 14th, and 20th--level Hexes",
        "summary": "Whether a changeling in the process of succumbing to her mother’s call, a witch cursed by a hag to become her instrument of torment, a vain and petty witch overeager for power, or some other unfortunate soul, a hagbound witch finds its soul has been infected by a hag’s spite and powerful, corrupt arcane magic."
      },
      {
        "name": "Havocker",
        "replaces": "Hexes",
        "summary": "Although most witches are guided to subtle curses and debilitating hexes by their mysterious patrons, some are instead taught the secrets of harnessing raw, destructive elemental power."
      },
      {
        "name": "Hedge Witch",
        "replaces": "4th-level Hex; 8th-level Hex",
        "summary": "Among witches, there are those who devote themselves to the care of others and restrict their practices to the healing arts."
      },
      {
        "name": "Herb Witch",
        "replaces": "Patron; 1st, 2nd, 10th-level Hex",
        "summary": "Herb witches brew foul-tasting medicines, sweet poisons, and other concoctions from the untamed plants of the wild."
      },
      {
        "name": "Hex Channeler",
        "replaces": "2nd-level Hex",
        "summary": "A hex channeler is a witch who devotes herself to either life—healing the wounded and destroying the undead—or death, slaying the living and aiding undead."
      },
      {
        "name": "Invoker",
        "replaces": "1st, 8th, 10th, and 16th level Hex",
        "summary": "The invoker uses her familiar to summon facets of her mysterious patron directly into her body, enhancing her skills and granting her powerful abilities."
      },
      {
        "name": "Jinx Witch",
        "replaces": "Class Skills; 2nd, 6th, 10th-level Hex",
        "summary": "Jinx witches specialize in calling down subtle misfortunes and deceiving enemies and allies alike. While they lack any ability to truly eliminate bad luck, they are uniquely gifted at making others believe otherwise."
      },
      {
        "name": "Ley Line Guardian",
        "replaces": "Spellcasting; Familiar; 1st and 8th-level Hexes",
        "summary": "Some witches tap into the power of their patrons not through a special connection with a familiar, but rather directly through the vast network of ley lines that crosses the planes."
      },
      {
        "name": "Medium",
        "replaces": "Patron; 2nd, 6th, 20th-level Hexes",
        "summary": "Mediums tap into the spiritual power of those who have yet to find their final rest. Their ability to interact with these souls allows mediums to learn about the physical world through the experiences of those who came before them."
      },
      {
        "name": "Mirror Witch",
        "replaces": "Familiar",
        "summary": "Mirror witches eschew animal familiars and isntead talk to their patrons via mirror magic"
      },
      {
        "name": "Mountain Witch",
        "replaces": "Spells; Hex; 2nd-level Hex",
        "summary": "Mountains can be sanctuaries for witches hunted by society. Here they form bonds with the spirits of the lofty reaches."
      },
      {
        "name": "Nexian Spellspy",
        "replaces": "Deliver Touch Spells; 4th-level Hex",
        "summary": "Nexian spellspies are witches who use their familiars and divining talents to spy on their rivals and protect themselves from similar intrusions."
      },
      {
        "name": "Pact Witch",
        "replaces": "Alignment; Patron; Familar; 6th-level Hex",
        "summary": "Though all witches forge bonds with mysterious powers known as patrons, a pact witch takes this bond to an extreme by forging an inexorable pact with the Outer Planes."
      },
      {
        "name": "Putrefactor",
        "replaces": "Familiar; Patron; 1st, 2nd, 4th, 6th, 10th, and 16th-level Hexes",
        "summary": "Some witches find their patrons while in the throes of despair and grief, when all they desire is to see the veneer of civilization peel back to reveal the filth and rot that underlies all things."
      },
      {
        "name": "Rhetorician",
        "replaces": "1st-level Hex; Spells",
        "summary": "Rhetoricians feel driven to engage in debate, learn as much as they can about their potential foes, and seek ways to use information and quick talking to handle problems before resorting to raw violence."
      },
      {
        "name": "Scarred Witch Doctor",
        "replaces": "Spellcasting; Hexes; Familiar; 1st-level Hex",
        "summary": "(Orc Only) The scarred witch doctor draws power from her ability to endure pain and suffering."
      },
      {
        "name": "Sea Witch",
        "replaces": "Patron Spells; 1st-level Hex",
        "summary": "A sea witch’s affinities are tied to the vast oceans and the rolling waves."
      },
      {
        "name": "Season Witch",
        "replaces": "Patron; 1st-level Hex",
        "summary": "Season witches gain their power from the cyclical and mystical exchange of energy passed from one season of nature to another."
      },
      {
        "name": "Seducer",
        "replaces": "Patron; Key Ability Score; 1st, 6th, 8th-level Hex",
        "summary": "These charismatic witches, often devotees of the Green Mother, rely on their otherworldly charms to achieve their aims."
      },
      {
        "name": "Synergist",
        "replaces": "1st, 8th, and 14th-level Hexes",
        "summary": "Synergists gain the ability to combine their forms with their familiars’ in order to create something more powerful than either alone."
      },
      {
        "name": "Tatterdemalion",
        "replaces": "Weapon Proficiencies; Cantrips; 1st, 4th, 8th, 12th, 16th-level Hex",
        "summary": "Some witches can bend the warp and weft of fabric and thread."
      },
      {
        "name": "Vellemancer",
        "replaces": "Class Skills; 2nd, 6th, and 8th-level Hexes",
        "summary": "While the popular stereotype envisions witches as wicked spellcasters sowing misery, many people turn to the arcane to heal others and better the world. The vellemancer is a guide, using her witchcraft to empower and teach others."
      },
      {
        "name": "Veneficus Witch",
        "replaces": "2nd and 10th-level Hexes",
        "summary": "Veneficus witches specialize in poisons—brewing both magical and traditional concoctions, and applying them to weapons, traps or even her potent hexes."
      },
      {
        "name": "Venom Siphoner",
        "replaces": "1st, 2nd, 6th-level Hex; Alertness",
        "summary": "Witches are no strangers to poisons, using them alongside their various brews, curses, spells, and other tools of the trade."
      },
      {
        "name": "White-Haired Witch",
        "replaces": "Hex; Major Hex; Grand Hex",
        "summary": "A white-haired witch concentrates her mysterious powers on improving her prowess in melee, using feats of agility and her prehensile hair to deal extreme damage."
      },
      {
        "name": "Winter Witch",
        "replaces": "Familiar; Patron; 4th-level Hex",
        "summary": "The descendents of Baba Yaga rule the frozen realm of Irrisen, and possess a unique power stemming from their otherworldly origin and their ties to cold magic."
      },
      {
        "name": "Witch-Watcher",
        "replaces": "Spells per Day",
        "summary": "For reasons known only to them, witch-watchers offer protection to nobles across Golarion."
      },
      {
        "name": "Wyrm Witch",
        "replaces": "Patron; Familiar",
        "summary": "Some witch covens have learned to use treasure to access other draconic powers."
      }
    ]
  } ,
  
  { "name"       : "Wizard" ,
  
    "description": 
    [
      "Beyond the veil of the mundane hide the secrets of absolute power. The works of beings beyond mortals, the legends of realms where gods and spirits tread, the lore of creations both wondrous and terrible—such mysteries call to those with the ambition and the intellect to rise above the common folk to grasp true might. Such is the path of the wizard. These shrewd magic-users seek, collect, and covet esoteric knowledge, drawing on cultic arts to work wonders beyond the abilities of mere mortals. While some might choose a particular field of magical study and become masters of such powers, others embrace versatility, reveling in the unbounded wonders of all magic. In either case, wizards prove a cunning and potent lot, capable of smiting their foes, empowering their allies, and shaping the world to their every desire."
    ],
    
    "role": 
    [
      "While universalist wizards might study to prepare themselves for any manner of danger, specialist wizards research schools of magic that make them exceptionally skilled within a specific focus. Yet no matter their specialty, all wizards are masters of the impossible and can aid their allies in overcoming any danger."
    ],

    "archetypes" : 
    [
      {
        "name": "Absalom: Arcanamirium Crafter",
        "replaces": "Hand of the Apprentice",
        "summary": "One trained by the Arcanamirium, a college specializing in the universalist school of magic and the art of crafting magical items."
      },
      {
        "name": "Arcane Bomber",
        "replaces": "Arcane Bond; Cantrips; Arcane School",
        "summary": "To many wizards, the experimentation of the alchemist seems quaint, if not dangerous or frightening. A few wizards take up the secrets of the bomb, however, fusing alchemy with their already considerable magical power."
      },
      {
        "name": "Arcane Physician",
        "replaces": "Arcane School; Scribe Scroll",
        "summary": "Arcane physicians use their scholarly knowledge and arcane mastery to achieve incredible feats of medicine."
      },
      {
        "name": "Arcane Warden",
        "replaces": "Arcane School; Class Skills; Scribe Scroll; Bonus Feats; Hand of the Apprentice; Metamagic Mastery",
        "summary": "Arcane wardens are wizards who specialize in the discovery or generation of places of safety and refuge."
      },
      {
        "name": "Bonded Wizard",
        "replaces": "Scribe Scroll; 5th, 10th, and 15th-level Bonus Feats",
        "summary": "Many wizards form an arcane bond with an item, but for some this bond becomes a powerful mystic union."
      },
      {
        "name": "Cheliax: Egorian Academy Infernal Binder",
        "replaces": "Acid Dart, Dimensional Steps",
        "summary": "A wizard trained by the prestigious Egorian Academy, best known for its Infernal Binding program in the school of conjuration."
      },
      {
        "name": "Chronomancer",
        "replaces": "Arcane Bond; 10th, 15th, 20th-level Bonus Feats",
        "summary": "Rare arcane scholars known as chronomancers demonstrate the ability to shift themselves in short bursts between the past, future, and alternate presents."
      },
      {
        "name": "Cruoromancer",
        "replaces": "Arcane Bond; 5th, 10th, 15th, 20th-level Bonus Feat",
        "summary": "(Dhampir Only) A cruoromancer infuses his necromantic magic with the power of his unique mixture of living blood and undead ichor."
      },
      {
        "name": "Elder Mythos Scholar",
        "replaces": "Arcane Bond; 1st, 8th-level Arcane School Ability; Spellbook; Scribe Scroll; 5th, 10th-level Bonus feats",
        "summary": "Elder Mythos scholars risk their sanity to seek knowledge of alien and awful entities from beyond the stars."
      },
      {
        "name": "Exploiter Wizard",
        "replaces": "Arcane Bond; Arcane School",
        "summary": "Contrary to traditional wizardly study, an exploiter wizard forgoes the tried and true methods of arcane focus and arcane schools for the exploits favored by an arcanist."
      },
      {
        "name": "Familiar Adept",
        "replaces": "Scribe Scroll; 5th and 10th-level Bonus Feats; Arcane Bond; Spellbooks",
        "summary": "Many wizards employ familiars to assist them, but only a few have unlocked the true power of their school of magic through the familiar itself."
      },
      {
        "name": "First World Caller",
        "replaces": "Arcane Bond; Arcane School; Scribe Scroll; 10th, 15th-level Bonus Feats",
        "summary": "Some wizards, typically First World gnomes, have mystical ties with the First World, the primordial home of the fey"
      },
      {
        "name": "Hallowed Necromancer",
        "replaces": "Arcane School; Spells; Power Over Undead; Grave Touch; Scribe Scroll; 5th, 10th, 15th-level Bonus Feat",
        "summary": "Many wizards study necromancy to create undead, but some study the same arts to purge the stain of undeath."
      },
      {
        "name": "Instructor",
        "replaces": "Arcane Bond; 5th, 10th, 15th, and 20th-level Bonus Feats",
        "summary": "Whether serving as staff at a formal school of magic or simply acting as a wandering teacher, an instructor has an apprentice who trades service to the instructor for lessons in magic."
      },
      {
        "name": "Pact Wizard (FF)",
        "replaces": "Arcane Bond; Arcane School",
        "summary": "Some wizards make bargains with beings from other realms in order to gain arcane power. These pact wizards have unparalleled access to extraplanar allies, but these bonds never come without strings attached."
      },
      {
        "name": "Pact Wizard (HHH)",
        "replaces": "Spellcasting; Scribe Scroll; 5th, 10th, 15th, and 20th level Bonus Feats",
        "summary": "Wizards who seek mastery of arcane power without tedious study and monotonous research."
      },
      {
        "name": "Poleiheira Adherent",
        "replaces": "Arcane Bond; Arcane School",
        "summary": "Poleiheira adherents are wizards who wish to emulate the explorations and discoveries of Arustun and partake in great odysseys as they seek to imitate his achievements."
      },
      {
        "name": "Primalist",
        "replaces": "Arcane Bond, 5th-level Bonus Feat, 10th-level Bonus Feat",
        "summary": "A primalist is a wizard who has spent a considerable amount of time studying the chaos that is primal magic."
      },
      {
        "name": "Qadira: Mage of the Veil",
        "replaces": "Blinding Ray, Invisibility Field",
        "summary": "Rather than controlling the elements or transforming the environment, mages of the veil focus on much more subtle magic."
      },
      {
        "name": "Runesage",
        "replaces": "Arcane Bond; Arcane School",
        "summary": "Runesages draw upon the mystic energies of ancient Thassilon."
      },
      {
        "name": "Scroll Scholar",
        "replaces": "Diviner's Fortune (diviner) or Hand of the Apprentice (universalist), 5th-level Bonus Feat, 4th-level spell slot",
        "summary": "Those who trade some of their potential to better understand ancient texts and scrolls can become learned scroll scholars."
      },
      {
        "name": "Scrollmaster",
        "replaces": "Arcane Bond; 10th-level Bonus Feat",
        "summary": "To some wizards, a scroll is not just a written form of a spell, it is a physical weapon meant to be used in combat like a sword or a shield."
      },
      {
        "name": "Shadowcaster",
        "replaces": "Arcane Bond; 5th-level Bonus Feat; 10th-level Bonus Feat",
        "summary": "Trained in the dark mysteries of Nidal's Umbral Court, the shadowcaster harnesses the power of shadows to bolster their spellcasting."
      },
      {
        "name": "Siege Mage",
        "replaces": "Scribe Scroll; Arcane Bond; Cantrips; Arcane School",
        "summary": "The siege mage combines his arcane mastery with a supernatural link to siege engines."
      },
      {
        "name": "Spell Sage",
        "replaces": "Arcane Bond; Arcane School",
        "summary": "A spell sage has mastered spells of all types, and is able to increase the effectiveness of his own spells and eventually even cast spells from other classes’ spell lists."
      },
      {
        "name": "Spellbinder",
        "replaces": "Arcane Bond",
        "summary": "(Elf Only) A spellbinder is an elven wizard who forges an arcane bond between himself and one or more wizard spells."
      },
      {
        "name": "Spellslinger",
        "replaces": "Arcane Bond; Scribe Scroll; Cantrips; Arcane School",
        "summary": "While few contest the seductive allure of commanding arcane and occult powers, there are those wizards who become obsessed with the natural mysteries of black powder."
      },
      {
        "name": "Spirit Binder",
        "replaces": "Arcane Bond; Arcane School; Scribe Scroll; Bonus Feats",
        "summary": "While most wizards learn their arts through gradual study, spirit binders have made a sudden arcane breakthrough due to the traumatic experience of losing a loved one."
      },
      {
        "name": "Spirit Whisperer",
        "replaces": "Arcane Bond; Spellbooks; Arcane School; Bonus Feats; 20th-level Bonus Feat",
        "summary": "Spirit whisperers are a breed apart among wizards, and are often mistaken for witches."
      },
      {
        "name": "Sword Binder",
        "replaces": "Arcane Bond; Arcane School; Bonus School Spell Slots; 10th-level Bonus Feat",
        "summary": "Sword binders follow a tradition of martial wizards who often worked with the Church of Aroden and the crowns of Taldor and then Cheliax."
      },
      {
        "name": "Thassilonian Specialist",
        "replaces": "Lose access to two schools of magic",
        "summary": "Specialist in a Thassilonian school of magic, this specialist sacrifices his connection with two schools in order to greatly strengthen his chosen specialty."
      },
      {
        "name": "Undead Master",
        "replaces": "Alignment; Arcane School; Arcane Bond; Scribe Scroll; 5th, 10th, 15th, 20th-level Bonus Feats",
        "summary": "Undead masters have great power over undeath."
      },
      {
        "name": "Wind Listener",
        "replaces": "Class Skills; Arcane School; Arcane Bond; 5th, 10th, 15th-level Bonus Feat",
        "summary": "(Sylph Only) The wind listener takes a sylph’s natural curiosity to the extreme, enhancing his natural skill at subterfuge and eavesdropping with potent arcane magic."
      },
      {
        "name": "Worldseeker",
        "replaces": "Scribe Scroll; 6th/8th-level School Ability; Arcane Bond; 5th, 15th-level Bonus Feat",
        "summary": "Worldseekers are wizards who travel to all corners of the Great Beyond."
      }
    ]
  } ,
];