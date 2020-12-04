/**
 * voices.js
 *
 * GY-64x AI Gamemaster
 *
 * v0.0.0-BLM
 *
 * 20201202 - aaron ward
 * 
 * Manually created from data at https://docs.aws.amazon.com/polly/latest/dg/voicelist.html
 */

var Voice = function(metadata)
{
  this.metadata    = metadata           || Object.create(null);
  
  this.name        = this.metadata.name || 'undefined';
  
  this.voice_open  = function()          { return '<voice name = "' + this.name + '"      >';          };
  this.voice_close = function()          { return '</voice>';                                          };
  
  this.say         = function(utterance) { return this.voice_open() + utterance + this.voice_close();  };
  
  this.announce    = function()          { return this.say('My name is ' + this.name + '.');           };
};

var voices =
{
  Zeina :
  {
    name           : 'Zeina',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Zhiyu :
  {
    name           : 'Zhiyu',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Naja :
  {
    name           : 'Naja',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Mads :
  {
    name           : 'Mads',
    language       : 'undefined',
    gender         : 'Male',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Lotte :
  {
    name           : 'Lotte',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Ruben :
  {
    name           : 'Ruben',
    language       : 'undefined',
    gender         : 'Male',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Nicole :
  {
    name           : 'Nicole',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Olivia :
  {
    name           : 'Olivia',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'Yes',
    has_standard   : 'Yes'
  },
  Russell :
  {
    name           : 'Russell',
    language       : 'undefined',
    gender         : 'Male',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Amy :
  {
    name           : 'Amy',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'Yes',
    has_standard   : 'Yes'
  },
  Emma :
  {
    name           : 'Emma',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'Yes',
    has_standard   : 'Yes'
  },
  Brian :
  {
    name           : 'Brian',
    language       : 'undefined',
    gender         : 'Male',
    has_neural     : 'Yes',
    has_standard   : 'Yes'
  },
  Raveena :
  {
    name           : 'Raveena',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Ivy :
  {
    name           : 'Ivy',
    language       : 'undefined',
    gender         : 'Female (child)',
    has_neural     : 'Yes',
    has_standard   : 'Yes'
  },
  Joanna :
  {
    name           : 'Joanna',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'Yes',
    has_standard   : 'Yes'
  },
  Kendra :
  {
    name           : 'Kendra',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'Yes',
    has_standard   : 'Yes'
  },
  Kimberly :
  {
    name           : 'Kimberly',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'Yes',
    has_standard   : 'Yes'
  },
  Salli :
  {
    name           : 'Salli',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'Yes',
    has_standard   : 'Yes'
  },
  Joey :
  {
    name           : 'Joey',
    language       : 'undefined',
    gender         : 'Male',
    has_neural     : 'Yes',
    has_standard   : 'Yes'
  },
  Justin :
  {
    name           : 'Justin',
    language       : 'undefined',
    gender         : 'Male (child)',
    has_neural     : 'Yes',
    has_standard   : 'Yes'
  },
  Kevin :
  {
    name           : 'Kevin',
    language       : 'undefined',
    gender         : 'Male (child)',
    has_neural     : 'Yes',
    has_standard   : 'No'
  },
  Matthew :
  {
    name           : 'Matthew',
    language       : 'undefined',
    gender         : 'Male',
    has_neural     : 'Yes',
    has_standard   : 'Yes'
  },
  Geraint :
  {
    name           : 'Geraint',
    language       : 'undefined',
    gender         : 'Male',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Celine :
  {
    name           : 'Celine',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Léa :
  {
    name           : 'Léa',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Mathieu :
  {
    name           : 'Mathieu',
    language       : 'undefined',
    gender         : 'Male',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Chantal :
  {
    name           : 'Chantal',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Marlene :
  {
    name           : 'Marlene',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Vicki :
  {
    name           : 'Vicki',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Hans :
  {
    name           : 'Hans',
    language       : 'undefined',
    gender         : 'Male',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Aditi :
  {
    name           : 'Aditi',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Dora :
  {
    name           : 'Dora',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Karl :
  {
    name           : 'Karl',
    language       : 'undefined',
    gender         : 'Male',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Carla :
  {
    name           : 'Carla',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Bianca :
  {
    name           : 'Bianca',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Giorgio :
  {
    name           : 'Giorgio',
    language       : 'undefined',
    gender         : 'Male',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Mizuki :
  {
    name           : 'Mizuki',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Takumi :
  {
    name           : 'Takumi',
    language       : 'undefined',
    gender         : 'Male',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Seoyeon :
  {
    name           : 'Seoyeon',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Liv :
  {
    name           : 'Liv',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Ewa :
  {
    name           : 'Ewa',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Maja :
  {
    name           : 'Maja',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Jacek :
  {
    name           : 'Jacek',
    language       : 'undefined',
    gender         : 'Male',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Jan :
  {
    name           : 'Jan',
    language       : 'undefined',
    gender         : 'Male',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Camila :
  {
    name           : 'Camila',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'Yes',
    has_standard   : 'Yes'
  },
  Vitoria :
  {
    name           : 'Vitoria',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Ricardo :
  {
    name           : 'Ricardo',
    language       : 'undefined',
    gender         : 'Male',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Ines :
  {
    name           : 'Ines',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Cristiano :
  {
    name           : 'Cristiano',
    language       : 'undefined',
    gender         : 'Male',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Carmen :
  {
    name           : 'Carmen',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Tatyana :
  {
    name           : 'Tatyana',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Maxim :
  {
    name           : 'Maxim',
    language       : 'undefined',
    gender         : 'Male',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Conchita :
  {
    name           : 'Conchita',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Lucia :
  {
    name           : 'Lucia',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Enrique :
  {
    name           : 'Enrique',
    language       : 'undefined',
    gender         : 'Male',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Mia :
  {
    name           : 'Mia',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Lupe :
  {
    name           : 'Lupe',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'Yes',
    has_standard   : 'Yes'
  },
  Penelope :
  {
    name           : 'Penelope',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Miguel :
  {
    name           : 'Miguel',
    language       : 'undefined',
    gender         : 'Male',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Astrid :
  {
    name           : 'Astrid',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Filiz :
  {
    name           : 'Filiz',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  },
  Gwyneth :
  {
    name           : 'Gwyneth',
    language       : 'undefined',
    gender         : 'Female',
    has_neural     : 'No',
    has_standard   : 'Yes'
  }
};

module.exports = voices;