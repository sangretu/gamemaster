/**
 * data_monster_types.js
 *
 * Just a place to keep monster data for evolution experiment
 *
 * 20200112
 *
 */


{ /* Classes */
	
	{ // Monster

		var Monster = function(arg)
		{
      var arg = arg || Object.create(null);
    
      var type_name    = arg.type_name     || null;
      var thac0        = arg.thac0         || null;
      var max_hp       = arg.max_hp        || null;
      var ac           = arg.ac            || null;
      var damage_range = arg.damage_range  || null;
      
      this.get = function()
      {
        var monster =
        {
          type_name    : type_name,
          thac0        : thac0,
          max_hp       : max_hp,
          ac           : ac,
          damage_range : damage_range
        };
        
        return monster;
      }
		};
    
  }
  
}

{ // Monster types

  var monster_types =
  [
    {
      type_name    : 'goblin',
      thac0        : 21,
      max_hp       : 7,
      ac           : 6,
      damage_range : '1-6'
    },
    {
      type_name    : 'kobold',
      thac0        : 21,
      max_hp       : 4,
      ac           : 7,
      damage_range : '1-4'
    }
  ];

}