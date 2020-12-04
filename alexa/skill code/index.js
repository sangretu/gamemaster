/**
 * index.js
 *
 * GY-64x AI Gamemaster
 *
 * v0.0.0-BLM
 *
 * 20201203 - aaron ward
 */
 
const Alexa  = require('ask-sdk-core');

/* Utilities */

var randomElementOfArray = function(arr)
{
  return arr[Math.floor(Math.random()*(arr.length))];
};

/* Classes */

var Voice = function(metadata)
{
  this.metadata    = metadata           || Object.create(null);
  
  this.name        = this.metadata.name || 'undefined';
  
  this.voice_open  = function()          { return '<voice name = "' + this.name + '"      >';          };
  this.voice_close = function()          { return '</voice>';                                          };
  
  this.say         = function(utterance) { return this.voice_open() + utterance + this.voice_close();  };
  
  this.announce    = function()          { return this.say('My name is ' + this.name + '.');           };
};

var SFX = function(metadata)
{
  this.metadata      = metadata                    || Object.create(null);
  
  this.name          = this.metadata.name          || 'undefined';
  this.audioFilePath = this.metadata.audioFilePath || 'undefined';
  this.category      = this.metadata.category      || 'undefined';
  this.duration      = this.metadata.duration      || 'undefined';
  this.tags          = this.metadata.tags          || 'undefined';
  
  this.toString      = function() { return '<audio src="soundbank://soundlibrary/' + this.audioFilePath + '"/>'; };
};

/* Includes */

var data_voices   = require('voices.js');
var interjections = require('interjections.js');
var descriptions  = require('descriptions.js');
var data_sfx      = require('sfx.js');

/* Globals */

var launch = 'I put on my robe and wizard hat.<audio src="soundbank://soundlibrary/magic_spells/magic_spells_05"/>'
var has_launched  = false;

// NOTE: Ooo it looks like reconnecting without redeploying can keep this flag! Does it always! What about for different users? Works after exit too.

// voices

var ivy           = new Voice(data_voices.Ivy);
var joanna        = new Voice(data_voices.Joanna);
var salli         = new Voice(data_voices.Salli);
var justin        = new Voice(data_voices.Justin);

/* Places */

const lobby =
{
  isEnabled : true,
  canHandle(handlerInput)
  {
    return this.isEnabled && Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput)
  {
    
    if (!has_launched)
    {
      has_launched = true;
      return ivy_intro(handlerInput);
    }
    else
    { // lobby is where they can check the status of their game, turn, change orders, etc.
      var utterance = 'You are in the lobby.' + new SFX(randomElementOfArray(data_sfx));
      
      var prompt    = 'This is a large circular room with a wooden floor. It has been (rather hastily) decorated in the manner of an arabian pleasure tent, with big fluffy pillows around the perimeter and tapestries down the walls. This is not the room\'s primary purpose though, and the illusion is far from complete.';
      
      return handlerInput.responseBuilder.speak(launch + utterance).reprompt(prompt).getResponse();
    }
    
  }
};

var ivy_intro = function(handlerInput)
{
  var chirp              = '<audio src="soundbank://soundlibrary/animals/amzn_sfx_bird_forest_short_01"/>';
  var rustle             = '<audio src="soundbank://soundlibrary/various/various_02"/>';
  var footsteps_on_grass = '<audio src="soundbank://soundlibrary/human/amzn_sfx_walking_on_grass_03"/>';
  
  var utterance = chirp
      + ivy    .announce()
      + ivy    .say     ( 'Are you ok? Here. Let me help you out of those bushes.' )
      + rustle
      + ivy    .say     ( 'Is that better? You don\'t look badly hurt, but I should probably take you back to the village so the grown-ups can take care of you.' )
      + footsteps_on_grass
      + ivy    .say     ( 'I\'m a human. Are you human too? Or ... are you something else?' )
      /*
      + ivy    .say     ( 'I grew up on the edge of the forest. My parents are, Joe the blacksmith' )
      + joanna .say     ( 'Joanna. Call me Joanna.' )
      + ivy    .say     ( 'and Salli...' )
      + salli  .say     ( 'Watchyerself, I don\'t need them knowin my name!' )
      + justin .announce()
      + ivy    .say     ( 'Justin, this is not about you.' )
      */
  ;
  
  var prompt    = 'Ivy waits for your reaction.';
  
  return handlerInput.responseBuilder.speak(launch + utterance).reprompt(prompt).getResponse();
};

// TODO: This was the old launch room, reuse it somewhere.

const old_lobby =
{
  isEnabled : true,
  canHandle(handlerInput)
  {
    return this.isEnabled && Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput)
  {
    var utterance = 'You are in the lobby.' + new SFX(randomElementOfArray(data_sfx));
    
    var prompt    = 'This is a large circular room with a wooden floor. It has been (rather hastily) decorated in the manner of an arabian pleasure tent, with big fluffy pillows around the perimeter and tapestries down the walls. This is not the room\'s primary purpose though, and the illusion is far from complete.';
    
    return handlerInput.responseBuilder.speak(utterance).reprompt(prompt).getResponse();
  }
};


// Previously known as the CancelAndStopIntentHandler, triggered by, among other things, "goodbye", but not exit or quit

const oubliette =
{
  isEnabled : true,
  canHandle(handlerInput)
  {
    return this.isEnabled && Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                          && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                          || Alexa.getIntentName(handlerInput.requestEnvelope)  === 'AMAZON.StopIntent');
  },
  handle(handlerInput)
  {
    var utterance  = 'Rocks fall. Everyone dies. <audio src="soundbank://soundlibrary/rocks/drops/drops_10"/>';
    
    return handlerInput.responseBuilder.speak(utterance).getResponse();
  }
};

/* Help */

const help =
{
  isEnabled : true,
  canHandle(handlerInput)
  {
    return this.isEnabled && Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                          && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent');
  },
  handle(handlerInput)
  {
    var advice =
    [
      'You are in an imaginary world. Picture yourself in the situation being described to you, and then tell me what you would like to do in this world. Then I\'ll tell you what happens next, you react to that, and we continue. It\'s a kind of collaborative storytelling. There\'s no wrong way to play, just experiment!',
      
      'You can look around to refresh your memory of your surroundings.',
      
      'This skill works like a tabletop role-playing game, where you, the player, describe your actions and I, the game master, tell you the effects of those actions.',
      
      'Use your imagination.',
      
      'bugger off!'
    ];
    
    var utterance = randomElementOfArray(advice);
    var prompt    = 'Try help again for more advice.';
    
    return handlerInput.responseBuilder.speak(utterance).reprompt(prompt).getResponse();
  }
};

/* Admin console */

var is_admin = false;

const adm_console =
{
  isEnabled : true,
  canHandle(handlerInput)
  {
    return this.isEnabled && Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                          && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'admin_console');
  },
  handle(handlerInput)
  {
    // TODO: Maybe have a different barrier here?
    is_admin = true;
    
    var utterance = '<audio src="soundbank://soundlibrary/computers/beeps_tones/beeps_tones_10"/>';
    var prompt    = 'Admin access granted. Administrative modules are still being loaded, not all functions will be recognized.';
    
    return handlerInput.responseBuilder.speak(utterance).reprompt(prompt).getResponse();
  }
};

const adm_voice_change =
{
  isEnabled : true,
  canHandle(handlerInput)
  {
    return this.isEnabled && is_admin
                          && Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                          && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'admin_change_voice');
  },
  handle(handlerInput)
  {
    var utterance = '<audio src="soundbank://soundlibrary/buzzers_pistols/buzzers_pistols_03"/>The voice changing system is offline.';
    var prompt    = 'The voice changing system is offline.';
    
    return handlerInput.responseBuilder.speak(utterance).reprompt(prompt).getResponse();
  }
};

/* Errors and exceptions */

/**
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */

// TODO: toyota hello gave ... nothing?
const err_restate =
{
  isEnabled : true,
  canHandle(handlerInput)
  {
    return this.isEnabled && Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                          && Alexa.getIntentName (handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput)
  {
    var utterance = '<audio src="soundbank://soundlibrary/musical/amzn_sfx_buzz_electronic_01"/>Unable to comply. Please restate the question.';
    var prompt    = '<audio src="soundbank://soundlibrary/musical/amzn_sfx_buzz_electronic_01"/>Unable to comply.';
    
    return handlerInput.responseBuilder.speak(utterance).reprompt(prompt).getResponse();
  }
};

/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */

const sys_shutdown =
{
  isEnabled : true,
  canHandle(handlerInput)
  {
    return this.isEnabled && Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput)
  {
    console.log('~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}');
    // cleanup
    return handlerInput.responseBuilder.getResponse();
  }
};


/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */

const err_fatal =
{
  isEnabled : true,
  canHandle()
  {
    return true;
  },
  handle(handlerInput, error)
  {
    var utterance = '<audio src="soundbank://soundlibrary/explosions/electrical/electrical_02"/ > ${JSON.stringify(error)';
    
    console.log('~~~~ Error handled: ${JSON.stringify(error)}');
    
    return handlerInput.responseBuilder.speak(utterance).reprompt(utterance).getResponse();
  }
};

/**
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const err_notfound =
{
  isEnabled : true,
  canHandle(handlerInput)
  {
    return this.isEnabled && Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
  },
  handle(handlerInput)
  {
    var intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    var utterance  = `<audio src="soundbank://soundlibrary/musical/amzn_sfx_electronic_beep_01"/>No program found for ${intentName}`;
    // NOTE: back-ticks are needed here
    
    return handlerInput.responseBuilder.speak(utterance).reprompt(utterance).getResponse();
  }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers
  (
    lobby,
    adm_console,
    adm_voice_change,
    help,
    oubliette,
    err_restate,
    sys_shutdown,
    err_notfound
  )
  .addErrorHandlers
  (
    err_fatal
  )
  .withCustomUserAgent('sample/hello-world/v1.2')
  .lambda();