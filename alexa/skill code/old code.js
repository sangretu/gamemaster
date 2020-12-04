// old code - just a bunch of stuff that I didn't use but don't want to throw away



//const speakOutput = launch + voice_open + chirp + I_grew_up + joanna + salli + intro_Justin + notu + voice_close;
//const speakOutput = 'Response. ' + JSON.stringify(voices);
//const speakOutput = 'Response. ' + JSON.stringify(voices.ivy);
//const speakOutput = 'Response. ' + JSON.stringify(voices.zap);
//const speakOutput = 'Response. ' + JSON.stringify(voices); 
//const speakOutput = 'Response. ' + JSON.stringify(voices.voices.ivy.gender); 
//const speakOutput = 'Response. ' + voices.kimberly.announce();
//const speakOutput = 'Response. ' + data_descriptions[0].description;
//const speakOutput = 'Response. ' + JSON.stringify(new Voice(data_voices.ivy));
//const speakOutput = 'Response. ' + voices.ivy.announce();
//const speakOutput = 'Response. ' + voices.ivy.say('<voice name="Salli"><lang xml:lang="en-US">My name is Salli. I do not speak <lang xml:lang="de-DE">Deutsch</lang> but I do speak English</lang>.</voice>');
//const speakOutput = 'Response. ' + interjections.ding_ding_ding;
//const speakOutput = 'Response. ' + descriptions[11].description;
//const speakOutput = 'Response. ' + new SFX(data_sfx[Math.floor(Math.random()*3009)]);

// var utterance  = 'Rocks fall. Everyone dies. <audio src="soundbank://soundlibrary/rocks/drops/drops_10"/>';
// <audio src="soundbank://soundlibrary/alarms/beeps_and_bloops/bell_06"/>
// <audio src="soundbank://soundlibrary/alarms/beeps_and_bloops/zap_02"/>
// <audio src="soundbank://soundlibrary/alarms/chimes_and_bells/chimes_bells_04"/>
// <audio src="soundbank://soundlibrary/backgrounds_ambience/tones_noises/tones_noises_04"/>
// <audio src="soundbank://soundlibrary/bell/chimes/chimes_03"/>
// really the whole chimes thing, you can literally play it like an instrument in the browser
// <audio src="soundbank://soundlibrary/musical/amzn_sfx_buzz_electronic_01"/>
// also this whole section ^^^ (buzzers pistols)
// <audio src="soundbank://soundlibrary/buzzers_pistols/buzzers_pistols_07"/>
// <audio src="soundbank://soundlibrary/alarms/beeps_and_bloops/buzz_02"/>

    
var launch = 'I put on my robe and wizard hat.<audio src="soundbank://soundlibrary/magic_spells/magic_spells_05"/>'

var voice_open  = '<voice name = "Ivy">';
var voice_close = '</voice>';

var I_grew_up = 'My name is Ivy. I grew up on the edge of the forest. ';
var chirp     = '<audio src="soundbank://soundlibrary/animals/amzn_sfx_bird_forest_short_01"/>';
var joanna    = 'My parents are, Joe the blacksmith <voice name="Joanna">Joanna. Call me Joanna. </voice>';
var salli     = 'and Salli... <voice name="Salli">Watchyerself, I don\'t need them knowin my name!</voice>';
var notu      = ' Justin, this is not about you.';
    
    var intro = launch + voice_open + I_grew_up + voice_close;
    
    
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = launch + voice_open + chirp + I_grew_up + joanna + salli + intro_Justin + notu + voice_close;
        

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//ask about race, use broad conversational support and a race intent.
//use theatre voice for <time passes>