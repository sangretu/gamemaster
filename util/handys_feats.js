// stuff that is useful or potentially useful for handy
// manually (heh) filtered
let handysFeats = [
  { "name"          : "Dirty Fighting",
    "prerequisites" : [],
    "description"   : "Ignore a flanking bonus in order to prevent attacks of opportunity on your combat maneuvers",
    "level (est)"   : 1
  },
  { "name"          : "Armor Adept",
    "prerequisites" : [],
    "description"   : "Armor modifications no longer inhibit you",
    "level (est)"   : 1
  },
  { "name"          : "Steadfast Slayer",
    "prerequisites" : [],
    "description"   : "Gain bonuses to damage based on your size",
    "level (est)"   : 1
  },
  { "name"          : "Call Out",
    "prerequisites" : [],
    "description"   : "Force a creature to duel you by using Intimidate",
    "level (est)"   : 1
  },
  { "name"          : "Solo Maneuvers",
    "prerequisites" : [],
    "description"   : "+1 CMB/CMD whenever you are the only one threatening a creature",
    "level (est)"   : 1
  },
  { "name"          : "Combat Reflexes",
    "prerequisites" : [],
    "description"   : "Make additional attacks of opportunity",
    "level (est)"   : 1
  },
  { "name"          : "Death from Above",
    "prerequisites" : [],
    "description"   : "Gain +5 bonus on attack rolls when charging from higher ground or flying",
    "level (est)"   : 1
  },
  { "name"          : "Desperate Battler",
    "prerequisites" : [],
    "description"   : "Gain +1 morale bonus on melee attack and damage when alone",
    "level (est)"   : 1
  },
  { "name"          : "River Raider",
    "prerequisites" : [],
    "description"   : "+2 bonus on Swim and Stealth checks in non-stormy water, can take more actions than normal in surprise rounds where you're in water",
    "level (est)"   : 1
  },
  { "name"          : "Weapon Adept",
    "prerequisites" : [],
    "description"   : "Modified weapons are easy for you to wield",
    "level (est)"   : 1
  },
  { "name"          : "Performance Weapon Mastery",
    "prerequisites" : [],
    "description"   : "All weapons you are proficient with act as if they had the performance quality",
    "level (est)"   : 1
  },
  { "name"          : "Opportunistic Grappler",
    "prerequisites" : [],
    "description"   : "Make a dirty trick maneuver against a creature grappling you",
    "level (est)"   : 1
  },
  { "name"          : "Obscuring Beacon",
    "prerequisites" : [],
    "description"   : "Use your light to dazzle foes",
    "level (est)"   : 1
  },
  { "name"          : "Mutual Hatred",
    "prerequisites" : [],
    "description"   : "Bonus to attack/damage against creatures who hate you",
    "level (est)"   : 1
  },
  { "name"          : "Flanking Foil",
    "prerequisites" : [],
    "description"   : "Foes you strike lose their flanking bonus against you",
    "level (est)"   : 1
  },
  { "name"          : "Focused Discipline",
    "prerequisites" : [],
    "description"   : "Gain temporary combat bonuses after resisting fear effects",
    "level (est)"   : 1
  },
  { "name"          : "Footslasher",
    "prerequisites" : [],
    "description"   : "Target a creature's feet to reduce its speed",
    "level (est)"   : 1
  },
  { "name"          : "Intimidating Prowess",
    "prerequisites" : [],
    "description"   : "Add Str to Intimidate in addition to Cha",
    "level (est)"   : 1
  },
  { "name"          : "Improved Unarmed Strike",
    "prerequisites" : [],
    "description"   : "Always considered armed",
    "level (est)"   : 1
  },
  { "name"          : "Improved Initiative",
    "prerequisites" : [],
    "description"   : "+4 bonus on initiative checks",
    "level (est)"   : 1
  },
  { "name"          : "Implacable",
    "prerequisites" : [],
    "description"   : "Bonus on saving throws against pain, DR/piercing or slashing drunk",
    "level (est)"   : 1
  },
  { "name"          : "Defensive Combat Training",
    "prerequisites" : [],
    "description"   : "Use your total Hit Dice as your base attack bonus for CMD",
    "level (est)"   : 1
  },
  { "name"          : "Blind-Fight",
    "prerequisites" : [],
    "description"   : "Reroll miss chances for concealment",
    "level (est)"   : 1
  },
  { "name"          : "Patient Strike",
    "prerequisites" : [ "Int 13" ],
    "description"   : "Ready an attack as a full-round action for a +2 bonus on the attack",
    "level (est)"   : 1
  },
  { "name"          : "Throat Slicer",
    "prerequisites" : [ "Base attack bonus +1" ],
    "description"   : "Deliver a quick coup-de-grace with lighter weapons",
    "level (est)"   : 1
  },
  { "name"          : "Amateur Swashbuckler",
    "prerequisites" : [ "No levels in a class that has the panache class feature" ],
    "description"   : "Gain a minor pool of panache to use with a 1st-level swashbuckler deed of your choice",
    "level (est)"   : 1
  },
  { "name"          : "Bodyguard",
    "prerequisites" : [ "Combat Reflexes" ],
    "description"   : "Use attack of opportunity to add a bonus to adjacent ally's AC",
    "level (est)"   : 1
  },
  { "name"          : "Step Up",
    "prerequisites" : [ "Base attack bonus +1" ],
    "description"   : "Take a 5-foot step as an immediate action",
    "level (est)"   : 1
  },
  { "name"          : "Stand Still",
    "prerequisites" : [ "Combat Reflexes" ],
    "description"   : "Stop enemies from moving past you",
    "level (est)"   : 1
  },
  { "name"          : "Witchbreaker",
    "prerequisites" : [ "Iron Will" ],
    "description"   : "Gain a +2 bonus on saves against effects from hags and witches; can potentially break their mind-affecting effects on allies with successful critical hits",
    "level (est)"   : 1
  },
  { "name"          : "Spiked Destroyer",
    "prerequisites" : [ "Proficient with armor spikes" ],
    "description"   : "Use your armor spikes against foes you bull rush or overrun",
    "level (est)"   : 1
  },
  { "name"          : "Cleave",
    "prerequisites" : [ "Power Attack" ],
    "description"   : "Make an additional attack if the first one hits",
    "level (est)"   : 1
  },
  { "name"          : "Combat Expertise",
    "prerequisites" : [ "Int 13" ],
    "description"   : "Trade attack bonus for AC bonus",
    "level (est)"   : 1
  },
  { "name"          : "Combat Stamina",
    "prerequisites" : [ "Base attack bonus +1" ],
    "description"   : "Gain a stamina pool to help boost your combat abilities",
    "level (est)"   : 1
  },
  { "name"          : "Combat Vigor",
    "prerequisites" : [ "Con 13" ],
    "description"   : "Gain a vigor pool and heal yourself without magic",
    "level (est)"   : 1
  },
  { "name"          : "Shocking Bellow",
    "prerequisites" : [ "Intimidating Prowess" ],
    "description"   : "Demoralize for free during the surprise round",
    "level (est)"   : 1
  },
  { "name"          : "Dazzling Display",
    "prerequisites" : [ "Weapon Focus" ],
    "description"   : "Intimidate all foes within 30 feet",
    "level (est)"   : 1
  },
  { "name"          : "Shadow Strike",
    "prerequisites" : [ "Base attack bonus +1" ],
    "description"   : "Deal precision damage against targets with concealment",
    "level (est)"   : 1
  },
  { "name"          : "Death from Below",
    "prerequisites" : [ "Base attack bonus +1" ],
    "description"   : "+2 bonus on readied/opportunity attacks against flying opponents",
    "level (est)"   : 1
  },
  { "name"          : "Searing Distraction",
    "prerequisites" : [ "Catch Off-Guard" ],
    "description"   : "Blind and dazzle creatures with a torch",
    "level (est)"   : 1
  },
  { "name"          : "Improved Bull Rush",
    "prerequisites" : [ "Power Attack" ],
    "description"   : "+2 bonus on bull rush attempts, no attack of opportunity",
    "level (est)"   : 1
  },
  { "name"          : "Dedicated Adversary",
    "comments": [ "'Human' is not a legal choice for the Dedicated Adversary feat, but a human ethnicity such as 'Ulfen' is legal" ],
    "prerequisites" : [ "No levels in a class that has the favored enemy class feature" ],
    "description"   : "Gain a favored enemy",
    "level (est)"   : 1
  },
  { "name"          : "Amateur Gunslinger",
    "prerequisites" : [ "You have no levels in a class that has the grit class feature" ],
    "description"   : "Gain limited amount of grit and access to gunslinger deeds",
    "level (est)"   : 1
  },
  { "name"          : "Scorching Weapons",
    "prerequisites" : [ "Ifrit" ],
    "description"   : "+2 save vs. fire/light spells, deal fire damage with weapons you wield",
    "level (est)"   : 1
  },
  { "name"          : "Armor Trick",
    "prerequisites" : [ "Base attack bonus +1." ],
    "description"   : "Learn armor tricks with a specific style of armor",
    "level (est)"   : 1
  },
  { "name"          : "Artful Dodge",
    "prerequisites" : [ "Int 13" ],
    "description"   : "Gain a dodge bonus to AC when you are the only threatening opponent",
    "level (est)"   : 1
  },
  { "name"          : "Visceral Threat",
    "prerequisites" : [ "Intimidating Prowess" ],
    "description"   : "Use Intimidate instead of Bluff to feint",
    "level (est)"   : 1
  },
  { "name"          : "Resisting Grappler",
    "prerequisites" : [ "Dex 13" ],
    "description"   : "Creatures attempting to grab you provoke an attack of opportunity",
    "level (est)"   : 1
  },
  { "name"          : "Disruptive",
    "prerequisites" : [ "6th-level fighter" ],
    "description"   : "Increases the DC to cast spells adjacent to you",
    "level (est)"   : 1
  },
  { "name"          : "Dodge",
    "prerequisites" : [ "Dex 13" ],
    "description"   : "+1 dodge bonus to AC",
    "level (est)"   : 1
  },
  { "name"          : "Quillbreaker Defense",
    "prerequisites" : [ "Proficiency with armor spikes" ],
    "description"   : "Use your armor spikes to reduce damage",
    "level (est)"   : 1
  },
  { "name"          : "Prone Shooter",
    "prerequisites" : [ "Base attack bonus +1" ],
    "description"   : "Increase your AC while prone",
    "level (est)"   : 1
  },
  { "name"          : "Phalanx Formation",
    "prerequisites" : [ "Base attack bonus +1" ],
    "description"   : "When wielding reach weapons, allies do not provide soft cover",
    "level (est)"   : 1
  },
  { "name"          : "Bloody Mess",
    "prerequisites" : [ "Skill Focus (Intimidate)" ],
    "description"   : "Once per round, demoralize a creature that made you bleed as an immediate action",
    "level (est)"   : 1
  },
  { "name"          : "Two-Weapon Fighting",
    "prerequisites" : [ "Dex 15" ],
    "description"   : "Reduce two-weapon fighting penalties",
    "level (est)"   : 1
  },
  { "name"          : "Enforcer",
    "prerequisites" : [ "Intimidate 1 rank" ],
    "description"   : "Demoralize opponent as free action when you inflict nonlethal damage",
    "level (est)"   : 1
  },
  { "name"          : "Equipment Trick",
    "prerequisites" : [ "Base attack bonus +1" ],
    "description"   : "Learn unique tricks with a piece of equipment",
    "level (est)"   : 1
  },
  { "name"          : "Two-Weapon Defense",
    "prerequisites" : [ "Two-Weapon Fighting" ],
    "description"   : "Gain +1 shield bonus when fighting with two weapons",
    "level (est)"   : 1
  },
  { "name"          : "Befuddling Initiative",
    "prerequisites" : [ "Improved Initiative" ],
    "description"   : "Treat all opponents as flat-footed during the surprise round",
    "level (est)"   : 1
  },
  { "name"          : "Multiattack",
    "prerequisites" : [ "Three or more natural attacks" ],
    "description"   : "Reduce the penalty of your secondary attacks from -5 to -2.",
    "level (est)"   : 1
  },
  { "name"          : "Modified Weapon Proficiency",
    "prerequisites" : [ "Proficiency with the selected weapon" ],
    "description"   : "Always have proficiency with modified versions of a single weapon",
    "level (est)"   : 1
  },
  { "name"          : "Mobility",
    "prerequisites" : [ "Dodge" ],
    "description"   : "+4 AC against attacks of opportunity from movement",
    "level (est)"   : 1
  },
  { "name"          : "Flagbearer",
    "prerequisites" : [ "Cha 15" ],
    "description"   : "Grant bonuses to allies who see your flag",
    "level (est)"   : 1
  },
  { "name"          : "Twinned Feint",
    "prerequisites" : [ "Cha 13" ],
    "description"   : "After succeeding at a feint, you can attempt a feint against a second target",
    "level (est)"   : 1
  },
  { "name"          : "Belier's Bite",
    "prerequisites" : [ "Improved Unarmed Strike" ],
    "description"   : "Deal 1d4 bleed damage with your unarmed strikes",
    "level (est)"   : 1
  },
  { "name"          : "Fortified Armor Training",
    "prerequisites" : [ "Proficient with armor or shield" ],
    "description"   : "Break armor or shield to turn critical hit into a normal hit",
    "level (est)"   : 1
  },
  { "name"          : "Frightening Ambush",
    "prerequisites" : [ "Intimidate 1 rank" ],
    "description"   : "Use Intimidate to demoralize for free when attacking flat-footed creatures",
    "level (est)"   : 1
  },
  { "name"          : "Fury's Fall",
    "prerequisites" : [ "Improved Trip" ],
    "description"   : "Add your dexterity bonus to your CMB when making a trip attempt",
    "level (est)"   : 1
  },
  { "name"          : "Weapon Trick",
    "prerequisites" : [ "Base attack bonus +1" ],
    "description"   : "Learn weapon tricks with a specific style of weapon",
    "level (est)"   : 1
  },
  { "name"          : "In Harm's Way",
    "prerequisites" : [ "Bodyguard" ],
    "description"   : "Take the damage of a successful attack upon an adjacent ally",
    "level (est)"   : 1
  },
  { "name"          : "Weathered Warrior",
    "prerequisites" : [ "Endurance" ],
    "description"   : "Avoid some penalties on your ranged attacks in strong or severe winds",
    "level (est)"   : 1
  },
  { "name"          : "Improved Trip",
    "prerequisites" : [ "Combat Expertise" ],
    "description"   : "+2 bonus on trip attempts, no attack of opportunity",
    "level (est)"   : 1
  },
  { "name"          : "Improved Sunder",
    "prerequisites" : [ "Power Attack" ],
    "description"   : "+2 bonus on sunder attempts, no attack of opportunity",
    "level (est)"   : 1
  },
  { "name"          : "Ground-Grabber",
    "prerequisites" : [ "Con 13" ],
    "description"   : "+2 CMD against larger enemies",
    "level (est)"   : 1
  },
  { "name"          : "Grudge Fighter",
    "prerequisites" : [ "Orc" ],
    "description"   : "+1 attack/damage against those who attack you",
    "level (est)"   : 1
  },
  { "name"          : "Improved Shield Bash",
    "prerequisites" : [ "Shield Proficiency" ],
    "description"   : "Keep your shield bonus when shield bashing",
    "level (est)"   : 1
  },
  { "name"          : "Improved Overrun",
    "prerequisites" : [ "Power Attack" ],
    "description"   : "+2 bonus on overrun attempts, no attack of opportunity",
    "level (est)"   : 1
  },
  { "name"          : "Traditional Weapons",
    "prerequisites" : [ "Int 13" ],
    "description"   : "Gain a bonus to CMB and CMD against creatures wielding exotic weapons",
    "level (est)"   : 1
  },
  { "name"          : "Improved Feint",
    "prerequisites" : [ "Combat Expertise" ],
    "description"   : "Feint as a move action",
    "level (est)"   : 1
  },
  { "name"          : "Improved Disarm",
    "prerequisites" : [ "Combat Expertise" ],
    "description"   : "+2 bonus on disarm attempts, no attack of opportunity",
    "level (est)"   : 1
  },
  { "name"          : "Hook Fighter",
    "prerequisites" : [ "Base attack bonus +1" ],
    "description"   : "Use a grappling hook as a one-handed weapon",
    "level (est)"   : 1
  },
  { "name"          : "Horn Rider",
    "prerequisites" : [ "Base attack bonus +1" ],
    "description"   : "Defend yourself using the horn/tusk of your mount",
    "level (est)"   : 1
  },
  { "name"          : "Deceitful Incompetence",
    "prerequisites" : [ "Combat Reflexes" ],
    "description"   : "Gain a cumulative insight bonus to attack rolls of attacks of opportunity for every time you miss an attack of opportunity",
    "level (est)"   : 1
  },
  { "name"          : "Scorpion Style",
    "prerequisites" : [ "Improved Unarmed Strike" ],
    "description"   : "Reduce target's speed to 5 ft.",
    "level (est)"   : 1
  },
  { "name"          : "Ki Throw",
    "prerequisites" : [ "Improved Trip", "Improved Unarmed Strike" ],
    "description"   : "Throw opponent into adjacent square with a trip attack",
    "level (est)"   : 1
  },
  { "name"          : "Lob Shot",
    "prerequisites" : [ "Far Shot", "Point-Blank Shot" ],
    "description"   : "Ignore all cover bonuses when making a ranged attack unless they have cover from above",
    "level (est)"   : 1
  },
  { "name"          : "Low Profile",
    "prerequisites" : [ "Dex 13", "Small size or smaller" ],
    "description"   : "+1 dodge bonus to AC against ranged attacks",
    "level (est)"   : 1
  },
  { "name"          : "Greater Penetrating Strike",
    "prerequisites" : [ "Penetrating Strike", "16th-level fighter" ],
    "description"   : "Your attacks ignore 10 points of damage reduction",
    "level (est)"   : 1
  },
  { "name"          : "Gory Finish",
    "prerequisites" : [ "Dazzling Display", "Weapon Focus" ],
    "description"   : "Make an Intimidate check if you reduce an opponent to negative hit points",
    "level (est)"   : 1
  },
  { "name"          : "Serpent Lash",
    "prerequisites" : [ "Weapon Finesse", "proficient in whip" ],
    "description"   : "Make additional disarm/trip attempts with a whip after you successfully disarm/trip",
    "level (est)"   : 1
  },
  { "name"          : "Improved Grapple",
    "prerequisites" : [ "Dex 13", "Improved Unarmed Strike" ],
    "description"   : "+2 bonus on grapple attempts, no attack of opportunity",
    "level (est)"   : 1
  },
  { "name"          : "Armor Focus",
    "prerequisites" : [ "Base attack bonus +1", "proficiency with selected armor." ],
    "description"   : "Increase one type of armor's AC bonus by 1",
    "level (est)"   : 1
  },
  { "name"          : "Shrewd Tactician",
    "prerequisites" : [ "Alertness", "Combat Reflexes" ],
    "description"   : "Flanking is less efficient against you",
    "level (est)"   : 1
  },
  { "name"          : "Armor Proficiency, Heavy",
    "prerequisites" : [ "Armor Proficiency", "Medium" ],
    "description"   : "No penalties on attack rolls while wearing heavy armor",
    "level (est)"   : 1
  },
  { "name"          : "Gang Up",
    "prerequisites" : [ "Int 13", "Combat Expertise" ],
    "description"   : "Flank an opponent if at least two allies are adjacent to it",
    "level (est)"   : 1
  },
  { "name"          : "Armor Proficiency, Medium",
    "prerequisites" : [ "Armor Proficiency", "Light" ],
    "description"   : "No penalties on attack rolls while wearing medium armor",
    "level (est)"   : 1
  },
  { "name"          : "Improved Bravery",
    "prerequisites" : [ "Cha 13", "bravery class feature" ],
    "description"   : "Bravery applies to against all mind-affecting effects",
    "level (est)"   : 1
  },
  { "name"          : "Tracer Fire",
    "prerequisites" : [ "Point-Blank Shot", "Precise Shot" ],
    "description"   : "Glowing ammunition makes an enemy easier to hit",
    "level (est)"   : 1
  },
  { "name"          : "Hurtful",
    "prerequisites" : [ "Str 13", "Power Attack" ],
    "description"   : "Make a melee attack after a succesful intimidation",
    "level (est)"   : 1
  },
  { "name"          : "Deflect Arrows",
    "prerequisites" : [ "Dex 13", "Improved Unarmed Strike" ],
    "description"   : "Avoid one ranged attack per round",
    "level (est)"   : 1
  },
  { "name"          : "Improved Charging Hurler",
    "prerequisites" : [ "Charging Hurler", "Point-Blank Shot" ],
    "description"   : "Your target may be at any range",
    "level (est)"   : 1
  },
  { "name"          : "Horn Rider's Charge",
    "prerequisites" : [ "Horn Rider", "base attack bonus +1" ],
    "description"   : "Use your mount’s momentum as part of your own attack",
    "level (est)"   : 1
  },
  { "name"          : "Deadly Aim",
    "prerequisites" : [ "Dex 13", "base attack bonus +1" ],
    "description"   : "Trade ranged attack bonus for damage",
    "level (est)"   : 1
  },
  { "name"          : "Sympathetic Rage",
    "prerequisites" : [ "Half-orc or orc", "nonlawful" ],
    "description"   : "Enter a rage-like state when a nearby ally rages",
    "level (est)"   : 1
  },
  { "name"          : "Advanced Armor Training",
    "prerequisites" : [ "Armor training class feature", "fighter level 3rd." ],
    "description"   : "Gain an advanced armor training option",
    "level (est)"   : 1
  },
  { "name"          : "Sweeping Dodge",
    "prerequisites" : [ "Dex 13", "Dodge" ],
    "description"   : "Gain evasion when making a dueling dodge while wearing a cloak",
    "level (est)"   : 1
  },
  { "name"          : "Rat Catcher",
    "prerequisites" : [ "Knowledge (dungeoneering) 1 rank", "base attack bonus +1" ],
    "description"   : "Gain a bonus when fighting much smaller creatures; take less damage from a swarm",
    "level (est)"   : 1
  },
  { "name"          : "Blinding Flash",
    "prerequisites" : [ "Dex 13", "Combat Expertise" ],
    "description"   : "Angle the light's reflection into your opponent's eyes to dazzle them.",
    "level (est)"   : 1
  },
  { "name"          : "Sunder Blessing",
    "prerequisites" : [ "Disruptive", "fighter level 8th" ],
    "description"   : "Sunder ongoing divine spells or effects",
    "level (est)"   : 1
  },
  { "name"          : "Hex Strike",
    "prerequisites" : [ "Hex class feature", "Improved Unarmed Strike" ],
    "description"   : "Upon successful unarmed strike, you may use a hex",
    "level (est)"   : 1
  },
  { "name"          : "Improved Dirty Trick",
    "prerequisites" : [ "Int 13", "Combat Expertise" ],
    "description"   : "+2 bonus on dirty trick attempts, no attack of opportunity",
    "level (est)"   : 1
  },
  { "name"          : "Wave Strike",
    "prerequisites" : [ "Weapon expertise class feature or Quick Draw", "Bluff 1 rank" ],
    "description"   : "Spend a swift action to make a Bluff check to feint",
    "level (est)"   : 1
  },
  { "name"          : "Stone-Handed",
    "prerequisites" : [ "Str 13", "Stunning Fist" ],
    "description"   : "Make an attack that ignores hardness",
    "level (est)"   : 1
  },
  { "name"          : "Vicious Stomp",
    "prerequisites" : [ "Combat Reflexes", "Improved Unarmed Strike" ],
    "description"   : "When opponent falls prone, it provokes an attack of opportunity from you",
    "level (est)"   : 1
  },
  { "name"          : "Punishing Step",
    "prerequisites" : [ "Dex 13", "Dodge" ],
    "description"   : "Gain a +2 circumstance bonus to attack against creatures that fail to use a maneuver on you",
    "level (est)"   : 1
  },
  { "name"          : "Unyielding Ferocity",
    "prerequisites" : [ "Con 19", "ferocity" ],
    "description"   : "Make a full attack when reduced to 0 or fewer hit points, with restrictions",
    "level (est)"   : 1
  },
  { "name"          : "Shared Quarry",
    "prerequisites" : [ "Hunter’s bond class feature", "quarry class feature" ],
    "description"   : "Animal companion or allies gain the benefit of quarry",
    "level (est)"   : 1
  },
  { "name"          : "Power Attack",
    "prerequisites" : [ "Str 13", "base attack bonus +1" ],
    "description"   : "Trade melee attack bonus for damage",
    "level (est)"   : 1
  },
  { "name"          : "Bullying Blow",
    "prerequisites" : [ "Intimidate 1 rank", "orc" ],
    "description"   : "Intimidate creatures while attacking them",
    "level (est)"   : 1
  },
  { "name"          : "Improved Ki Throw",
    "prerequisites" : [ "Improved Bull Rush", "Ki Throw" ],
    "description"   : "Throw opponent into occupied square as a bull rush",
    "level (est)"   : 1
  },
  { "name"          : "Pin Down",
    "prerequisites" : [ "Combat Reflexes", "fighter level 11th" ],
    "description"   : "Opponents that take 5-foot step or withdraw provoke attack of opportunity from you",
    "level (est)"   : 1
  },
  { "name"          : "Butterfly's Sting",
    "prerequisites" : [ "Combat Expertise", "worshiper of Desna" ],
    "description"   : "Grant confirmed critical hit to an ally instead",
    "level (est)"   : 1
  },
  { "name"          : "Unseat",
    "prerequisites" : [ "Improved Bull Rush", "Mounted Combat" ],
    "description"   : "Knock opponents from their mounts",
    "level (est)"   : 1
  },
  { "name"          : "Hamatulatsu",
    "prerequisites" : [ "Improved Unarmed Strike", "Weapon Focus (unarmed strike)" ],
    "description"   : "Unarmed attacks can inflict piercing damage and sicken foes",
    "level (est)"   : 1
  },
  { "name"          : "Penetrating Strike",
    "prerequisites" : [ "Weapon Focus", "12th-level fighter" ],
    "description"   : "Your attacks ignore 5 points of damage reduction",
    "level (est)"   : 1
  },
  { "name"          : "Underfoot (BotB)",
    "prerequisites" : [ "Dodge", "swarming racial trait" ],
    "description"   : "Can share a space with an enemy",
    "level (est)"   : 1
  },
  { "name"          : "Improved Parry",
    "prerequisites" : [ "Int 13", "Combat Expertise" ],
    "description"   : "Parry an opponent to make it flat-footed",
    "level (est)"   : 1
  },
  { "name"          : "Orc Weapon Expertise",
    "prerequisites" : [ "Base attack bonus +1", "orc" ],
    "description"   : "Learn unique abilities with orc weapons",
    "level (est)"   : 1
  },
  { "name"          : "Weapon Specialization",
    "prerequisites" : [ "Weapon Focus", "4th-level fighter" ],
    "description"   : "+2 bonus on damage rolls with one weapon",
    "level (est)"   : 1
  },
  { "name"          : "Chairbreaker",
    "prerequisites" : [ "Catch Off-Guard", "base attack bonus +1" ],
    "description"   : "Break improvised weapons to deal more damage",
    "level (est)"   : 1
  },
  { "name"          : "Uncivilized Tactics",
    "prerequisites" : [ "Str 13", "Power Attack" ],
    "description"   : "Prevent a target from using certain limbs/attacks with combat maneuvers",
    "level (est)"   : 1
  },
  { "name"          : "Aquadynamic Focus",
    "prerequisites" : [ "Weapon Focus", "base attack bonus +1" ],
    "description"   : "Use bludgeoning and slashing weapons normally underwater",
    "level (est)"   : 1
  },
  { "name"          : "Spellbreaker",
    "prerequisites" : [ "Disruptive", "10th-level fighter" ],
    "description"   : "Enemies provoke attacks if their spells fail",
    "level (est)"   : 1
  },
  { "name"          : "Improved Reposition",
    "prerequisites" : [ "Int 13", "Combat Expertise" ],
    "description"   : "+2 bonus on reposition attempts, no attack of opportunity",
    "level (est)"   : 1
  },
  { "name"          : "Feral Combat Training",
    "prerequisites" : [ "Improved Unarmed Strike", "Weapon Focus with selected natural weapon" ],
    "description"   : "Use Improved Unarmed Strike feats with natural weapons",
    "level (est)"   : 1
  },
  { "name"          : "Monkey Lunge",
    "prerequisites" : [ "Lunge", "Acrobatics 1 rank" ],
    "description"   : "Use Lunge without lowering your AC",
    "level (est)"   : 1
  },
  { "name"          : "Filthy Weapons",
    "prerequisites" : [ "Knowledge (dungeoneering) 1 rank", "Knowledge (nature) 1 rank" ],
    "description"   : "Cover your weapons in disgusting filth",
    "level (est)"   : 1
  },
  { "name"          : "Smiting Reversal",
    "prerequisites" : [ "Power Attack", "Toughness" ],
    "description"   : "Get an attack of opportunity when targeted with a smite attack",
    "level (est)"   : 1
  },
  { "name"          : "Advanced Weapon Training",
    "prerequisites" : [ "Fighter level 5th", "weapon training class feature" ],
    "description"   : "Gain an advanced weapon training option",
    "level (est)"   : 1
  },
  { "name"          : "Weapon Focus",
    "prerequisites" : [ "Proficiency with weapon", "base attack bonus +1" ],
    "description"   : "+1 bonus on attack rolls with one weapon",
    "level (est)"   : 1
  },
  { "name"          : "Greater Weapon Specialization",
    "prerequisites" : [ "Weapon Specialization", "12th-level fighter" ],
    "description"   : "+2 bonus on damage rolls with one weapon",
    "level (est)"   : 1
  },
  { "name"          : "Weapon Versatility",
    "prerequisites" : [ "Weapon Focus", "base attack bonus +1" ],
    "description"   : "Deal different types of damage with your favored weapon",
    "level (est)"   : 1
  },
  { "name"          : "Greater Weapon Focus",
    "prerequisites" : [ "Weapon Focus", "8th-level fighter" ],
    "description"   : "+1 bonus on attack rolls with one weapon",
    "level (est)"   : 1
  },
  { "name"          : "Crushing Blow",
    "prerequisites" : [ "Improved Unarmed Strike", "Stunning Fist" ],
    "description"   : "Stunning Fist reduces target's AC",
    "level (est)"   : 1
  },
  { "name"          : "Following Step",
    "prerequisites" : [ "Dex 13", "Step Up." ],
    "description"   : "Move up to 10 feet as an immediate action",
    "level (est)"   : 1
  },
  { "name"          : "Inspiring Bravery",
    "prerequisites" : [ "Cha 13", "bravery class feature" ],
    "description"   : "Grant your bravery to allies within 30 feet",
    "level (est)"   : 1
  },
  { "name"          : "Fox Insight",
    "prerequisites" : [ "Int 13", "Fox Style" ],
    "description"   : "You are difficult to feint against and demoralize",
    "level (est)"   : 1
  },
  { "name"          : "Measure Foe",
    "prerequisites" : [ "Street Smarts", "base attack bonus +1" ],
    "description"   : "Measure a foe's combat prowess and gain bonuses",
    "level (est)"   : 1
  },
  { "name"          : "Deadly Grappler",
    "prerequisites" : [ "Dex 13", "Improved Grapple", "Improved Unarmed Strike" ],
    "description"   : "Deal more damage with attacks during a grapple",
    "level (est)"   : 1
  },
  { "name"          : "Shrapnel Strike",
    "prerequisites" : [ "Str 15", "Improved Sunder", "Power Attack" ],
    "description"   : "Gain a bonus to break objects which can shatter",
    "level (est)"   : 1
  },
  { "name"          : "Furious Focus",
    "prerequisites" : [ "Str 13", "Power Attack", "base attack bonus +1" ],
    "description"   : "Do not take the Power Attack penalty on the first attack each round",
    "level (est)"   : 1
  },
  { "name"          : "Landing Roll",
    "prerequisites" : [ "Dex 13", "Dodge", "Mobility" ],
    "description"   : "If tripped, move 5 feet as an immediate action",
    "level (est)"   : 1
  },
  { "name"          : "Just Out of Reach",
    "prerequisites" : [ "Dex 13", "Dodge", "Mobility" ],
    "description"   : "+4 dodge bonus to AC vs. melee attacks with > 5 ft. reach",
    "level (est)"   : 1
  },
  { "name"          : "Fortuitous Vigor",
    "prerequisites" : [ "Con 13", "Combat Vigor", "character level 4th" ],
    "description"   : "Spend vigor when you roll a natural 20",
    "level (est)"   : 1
  },
  { "name"          : "Vigilant Charger",
    "prerequisites" : [ "Str 13", "Dex 13", "Combat Reflexes" ],
    "description"   : "Ready an action to charge an enemy",
    "level (est)"   : 1
  },
  { "name"          : "Merciless Beating",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Gang UpAPG" ],
    "description"   : "Forgo a flanking bonus to grant +1 to the attacks of two other allies",
    "level (est)"   : 1
  },
  { "name"          : "Inner Flame",
    "prerequisites" : [ "Scorching Weapons", "character level 7th", "ifrit" ],
    "description"   : "+4 save vs. fire/light spells, deal extra damage with Scorching Weapons",
    "level (est)"   : 1
  },
  { "name"          : "Modification Trainer",
    "prerequisites" : [ "Cha 13", "Armor Adept or Weapon Adept", "fighter level 4th" ],
    "description"   : "You can train others to use modified armor or weapons",
    "level (est)"   : 1
  },
  { "name"          : "Armored Athlete",
    "prerequisites" : [ "Light armor proficiency", "medium armor proficiency", "3 ranks in any Dexterity- or Strength-based skill" ],
    "description"   : "Reduce your armor check penalty on certain skills",
    "level (est)"   : 1
  },
  { "name"          : "Motivating Display",
    "prerequisites" : [ "Cha 13", "Dazzling Display", "Weapon Focus" ],
    "description"   : "Motivate your allies while demoralizing your foes",
    "level (est)"   : 1
  },
  { "name"          : "Improved Awesome Blow",
    "prerequisites" : [ "Str 13", "Awesome Blow or awesome blow class feature", "Power Attac" ],
    "description"   : "+2 on awesome blow combat maneuver checks and to CMD against such attacks, and movement due to awesome blow provokes from allies",
    "level (est)"   : 1
  },
  { "name"          : "Feinting Flurry",
    "prerequisites" : [ "Dex 15", "flurry of blows class feature", "Combat Expertise" ],
    "description"   : "Weave a feint attempt with your flurry of blows.",
    "level (est)"   : 1
  },
  { "name"          : "Adder Strike",
    "prerequisites" : [ "Poison use class feature", "Craft (alchemy) 1 rank", "Improved Unarmed Strike" ],
    "description"   : "May apply contact poison to unarmed strikes",
    "level (est)"   : 1
  },
  { "name"          : "Improved Uncivilized Tactics",
    "prerequisites" : [ "Str 13", "Power Attack", "Uncivilized Tactics" ],
    "description"   : "+2 bonus to use Uncivilized Tactics, stop provoking attacks when using",
    "level (est)"   : 1
  },
  { "name"          : "Tactical Reposition",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Improved RepositionAPG" ],
    "description"   : "Use reposition to move enemies into hazardous areas",
    "level (est)"   : 1
  },
  { "name"          : "Arcane Armor Training",
    "prerequisites" : [ "Armor Proficiency", "Light", "caster level 3rd" ],
    "description"   : "Reduce your arcane spell failure chance by 10%",
    "level (est)"   : 1
  },
  { "name"          : "Stunning Pin",
    "prerequisites" : [ "Improved Grapple", "Improved Unarmed Strike", "Stunning Fist" ],
    "description"   : "Use Stunning Fist against pinned opponents",
    "level (est)"   : 1
  },
  { "name"          : "Pile On",
    "prerequisites" : [ "Str 13", "Hurtful", "Power Attack" ],
    "description"   : "Deal less damage in order to extend the duration of a fear condition",
    "level (est)"   : 1
  },
  { "name"          : "Aldori Dueling Disciple",
    "prerequisites" : [ "Exotic Weapon Proficiency (Aldori dueling sword)", "Weapon Finesse", "Weapon Focus (Aldori dueling sword)" ],
    "description"   : "Gain bonuses on Intimidate checks",
    "level (est)"   : 1
  },
  { "name"          : "Haunted Gnome",
    "prerequisites" : [ "Cha 13", "gnome magic racial trait", "Knowledge (arcana) 1 rank" ],
    "description"   : "Gain haunted fey aspect",
    "level (est)"   : 1
  },
  { "name"          : "Bushwhack",
    "prerequisites" : [ "Dex 13", "Improved Grapple", "Improved Unarmed Strike" ],
    "description"   : "Grapple and pin with a surprise action",
    "level (est)"   : 1
  },
  { "name"          : "Wilding Strike",
    "prerequisites" : [ "Str 13", "Improved Unarmed Strike", "Wilding" ],
    "description"   : "Your unarmed strike damage increases to 1d6 (or 1d4 if you are Small)",
    "level (est)"   : 1
  },
  { "name"          : "Hellcat Pounce",
    "prerequisites" : [ "Hellcat Stealth", "Skill Focus (Stealth)", "sneak attack +2d6" ],
    "description"   : "Make a second attack in the surprise round",
    "level (est)"   : 1
  },
  { "name"          : "Push the Limits",
    "prerequisites" : [ "Con 13", "Combat Stamina", "base attack bonus +1" ],
    "description"   : "Gain a secondary stamina pool to use in the event your primary runs out",
    "level (est)"   : 1
  },
  { "name"          : "Pushing Assault",
    "prerequisites" : [ "Str 15", "Power Attack", "base attack bonus +1" ],
    "description"   : "Push a foe back with a two-handed weapon",
    "level (est)"   : 1
  },
  { "name"          : "Improved Drag",
    "prerequisites" : [ "Str 13", "Power Attack", "base attack bonus +1" ],
    "description"   : "+2 bonus on drag attempts, no attack of opportunity",
    "level (est)"   : 1
  },
  { "name"          : "Claw Wrench",
    "prerequisites" : [ "Dex 13", "Improved Grapple", "Improved Unarmed Strike" ],
    "description"   : "Grapple a creature to break its own grab or negate bite attacks",
    "level (est)"   : 1
  },
  { "name"          : "Felling Escape",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Improved Trip" ],
    "description"   : "Trip a foe when you break a grapple",
    "level (est)"   : 1
  },
  { "name"          : "Sidestep",
    "prerequisites" : [ "Dex 13", "Dodge", "Mobility" ],
    "description"   : "Make 5-foot step immediately after an opponent misses",
    "level (est)"   : 1
  },
  { "name"          : "Destructive Persuasion",
    "prerequisites" : [ "Str 13", "Power Attack", "Intimidate 1 rank" ],
    "description"   : "Smash objects to gain bonuses on Intimidate",
    "level (est)"   : 1
  },
  { "name"          : "Slashing Grace",
    "prerequisites" : [ "Dex 13", "Weapon Finesse", "Weapon Focus with chosen weapon" ],
    "description"   : "Treat a slashing weapon as a piercing melee weapon",
    "level (est)"   : 1
  },
  { "name"          : "Reverse-Feint",
    "prerequisites" : [ "Toughness", "base attack bonus +1", "orc" ],
    "description"   : "Allow an opponent to easily hit you so you can make a quick counter attack",
    "level (est)"   : 1
  },
  { "name"          : "Drag Down",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Improved Trip" ],
    "description"   : "If tripped, you can attempt a trip against that foe",
    "level (est)"   : 1
  },
  { "name"          : "Disengaging Feint",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Improved Feint" ],
    "description"   : "Feint lets you move your speed without provoking attacks of opportunity",
    "level (est)"   : 1
  },
  { "name"          : "Redirect Attack",
    "prerequisites" : [ "Dex 15", "Int 15", "Dodge" ],
    "description"   : "Redirect attacks to target other foes",
    "level (est)"   : 1
  },
  { "name"          : "Cleaving Finish",
    "prerequisites" : [ "Str 13", "Cleave", "Power Attack" ],
    "description"   : "Make additional attack if opponent is knocked out.",
    "level (est)"   : 1
  },
  { "name"          : "Horrific Gorging",
    "prerequisites" : [ "Bite attack", "Large or larger", "swallow whole universal monster ability" ],
    "description"   : "Swallow one foe to make its allies shaken",
    "level (est)"   : 1
  },
  { "name"          : "Charge Through",
    "prerequisites" : [ "Str 13", "Improved Overrun", "Power Attack", "base attack bonus +1" ],
    "description"   : "Make overrun as free action while charging",
    "level (est)"   : 1
  },
  { "name"          : "Wings of the Androsphinx",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Improved Reposition", "base attack bonus +1 or monk level 1st" ],
    "description"   : "Gain +2 AC against charging foes, use reposition as an immediate action against a failed charge",
    "level (est)"   : 1
  },
  { "name"          : "Elephant Stomp",
    "prerequisites" : [ "Str 13", "Power Attack", "Improved Overrun", "base attack bonus +1" ],
    "description"   : "Get an immediate attack against an opponent you overrun",
    "level (est)"   : 1
  },
  { "name"          : "Swift Refuge",
    "prerequisites" : [ "Str 13", "Dex 13", "Swift Iron Style", "proficiency with medium armor" ],
    "description"   : "Take minimum damage from an attack",
    "level (est)"   : 1
  },
  { "name"          : "Surprise Follow-Through",
    "prerequisites" : [ "Str 13", "Cleave", "Power Attack", "base attack bonus +1" ],
    "description"   : "Deny an opponent his Dex bonus when cleaving",
    "level (est)"   : 1
  },
  { "name"          : "Two-Weapon Feint",
    "prerequisites" : [ "Dex 15", "Int 13", "Combat Expertise", "Two-Weapon Fighting" ],
    "description"   : "Forgo first melee attack to feint",
    "level (est)"   : 1
  },
  { "name"          : "Panther Claw",
    "prerequisites" : [ "Wis 15", "Combat Reflexes", "Improved Unarmed Strike", "Panther Style" ],
    "description"   : "Retaliate as a free action instead of as a swift action",
    "level (est)"   : 1
  },
  { "name"          : "Startoss Comet",
    "prerequisites" : [ "Dex 13", "Point-Blank Shot", "Startoss Style", "Weapon Focus with the chosen weapon" ],
    "description"   : "Make an extra attack with thrown weapon as a standard action",
    "level (est)"   : 1
  },
  { "name"          : "Hurricane Punch",
    "prerequisites" : [ "Str 13", "Improved Bull Rush", "Improved Unarmed Strike", "Power Attack" ],
    "description"   : "Bull rush a creature you strike multiple times",
    "level (est)"   : 1
  },
  { "name"          : "Binding Throw",
    "prerequisites" : [ "Improved Grapple", "Improved Trip", "Improved Unarmed Strike", "Ki Throw" ],
    "description"   : "After successful Ki Throw, you may attempt to grapple",
    "level (est)"   : 1
  },
  { "name"          : "Juke",
    "prerequisites" : [ "Dex 13", "Dodge", "Mobility", "SidestepAPG" ],
    "description"   : "Dodge charging opponents",
    "level (est)"   : 1
  },
  { "name"          : "Gate Breaker",
    "prerequisites" : [ "Str 13", "Improved Sunder", "Power Attack", "base attack bonus +1" ],
    "description"   : "Deal bonus damage to objects",
    "level (est)"   : 1
  },
  { "name"          : "Vanguard Ward",
    "prerequisites" : [ "BodyguardAPG", "Combat Reflexes", "Vanguard Style", "proficiency with light or heavy shields." ],
    "description"   : "Use Bodyguard and Vanguard Style with the same action",
    "level (est)"   : 1
  },
  { "name"          : "Smashing Crush",
    "prerequisites" : [ "Str 13", "Improved Sunder", "Smashing Style", "Weapon Focus with the chosen weapon" ],
    "description"   : "Reduce the hardness of objects you sunder",
    "level (est)"   : 1
  },
  { "name"          : "Disengaging Flourish",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Disengaging Feint", "Improved Feint" ],
    "description"   : "Successful feint causes your starting square to not count as threatened",
    "level (est)"   : 1
  },
  { "name"          : "Improved Sidestep",
    "prerequisites" : [ "Dex 15", "Dodge", "Mobility", "Sidestep" ],
    "description"   : "Sidestep without using your 5-foot step on your next turn",
    "level (est)"   : 1
  },
  { "name"          : "Explosive Escape",
    "prerequisites" : [ "Dex 13", "Str 13", "Improved Grapple", "Improved Unarmed Strike" ],
    "description"   : "Send your opponents flying when breaking a grapple",
    "level (est)"   : 1
  },
  { "name"          : "Slayer's Feint",
    "prerequisites" : [ "Dex 15", "Acrobatic or slayer level 1st", "Combat Expertise", "Acrobatics 1 rank" ],
    "description"   : "Use Acrobatics instead of Bluff to feint",
    "level (est)"   : 1
  },
  { "name"          : "Greater Uncivilized Tactics",
    "prerequisites" : [ "Str 13", "Improved Uncivilized Tactics", "Power Attack", "Uncivilized Tactics" ],
    "description"   : "+2 bonus to use Uncivilized Tactics, foes take longer to recover limbs or attacks affected",
    "level (est)"   : 1
  },
  { "name"          : "Unbreakable",
    "prerequisites" : [ "Con 13", "Endurance", "Toughness", "fighter level 4th" ],
    "description"   : "Gain additional hp from favored classes",
    "level (est)"   : 1
  },
  { "name"          : "Relic Breaker",
    "prerequisites" : [ "Str 13", "Gate Breaker", "Improved Sunder", "Power Attack", "base attack bonus +1" ],
    "description"   : "When you sunder objects, creature holding them catches of fire",
    "level (est)"   : 1
  },
  { "name"          : "Stag Horns",
    "prerequisites" : [ "Dex 13", "Charging Stag Style", "Dodge", "Improved Unarmed Strike", "Mobility" ],
    "description"   : "Attempt a free grapple check at the end of an unarmed attack with charging stag style",
    "level (est)"   : 1
  },
  { "name"          : "Break Guard",
    "prerequisites" : [ "Dex 15", "Int 13", "Combat Expertise", "Improved Disarm", "Two-Weapon Fighting" ],
    "description"   : "May attack opponent you attempted to disarm with your second weapon",
    "level (est)"   : 1
  },
  { "name"          : "Outslug Weave",
    "prerequisites" : [ "Int 13", "Combat Expertise or brawler’s cunningACG class feature", "Lunge", "Outslug Style", "Weapon Focus with the chosen weapon" ],
    "description"   : "No penalty to AC when using Lunge with Outslug Style; +2 to AC/damage from Outslug Style instead of +1",
    "level (est)"   : 1
  },
  { "name"          : "Spinning Throw",
    "prerequisites" : [ "Combat Expertise", "Improved Bull Rush", "Improved Trip", "Improved Unarmed Strike", "Ki Throw" ],
    "description"   : "Spend a swift action to bull rush opponent, move it, then knock it prone",
    "level (est)"   : 1
  },
  { "name"          : "Panther Parry",
    "prerequisites" : [ "Wis 15", "Combat Reflexes", "Improved Unarmed Strike", "Panther Claw", "Panther Style" ],
    "description"   : "Retaliatory attacks are resolved before the attack",
    "level (est)"   : 1
  },
  { "name"          : "Stag Submission",
    "prerequisites" : [ "Charging Stag Style", "Dodge", "Improved Unarmed Strike", "Mobility", "Stag Horns" ],
    "description"   : "After successfully pinning an opponent with charging stag style, additionally knock them prone or deal more damage",
    "level (est)"   : 1
  },
  { "name"          : "Rebuffing Reduction",
    "prerequisites" : [ "Str 13", "damage reduction", "Improved Bull Rush", "Power Attack", "base attack bonus +1" ],
    "description"   : "Bull Rush opponent who fails to pierce your DR",
    "level (est)"   : 1
  },
  { "name"          : "Illusive Gnome Surprise",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Gnome Weapon FocusARG", "Illusive Gnome Style", "Improved Feint" ],
    "description"   : "+2 bonus on dirty tricks and Bluff checks to feint; additional benefits with Illusive Gnome Style",
    "level (est)"   : 1
  },
  { "name"          : "Swift Sprint",
    "prerequisites" : [ "Str 13", "Dex 13", "Swift Iron Style", "Swift Refuge", "proficiency with medium armor" ],
    "description"   : "Ignore the speed penalty on your armor",
    "level (est)"   : 1
  },
  { "name"          : "Fox Trickery",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Fox Insight", "Fox Style", "Improved Dirty TrickAPG" ],
    "description"   : "Perform dirty tricks as attacks of opportunity",
    "level (est)"   : 1
  },
  { "name"          : "Outslug Sprint",
    "prerequisites" : [ "Int 13", "Combat Expertise or brawler’s cunningACG class feature", "Lunge", "Outslug Style", "Outslug Weave", "Weapon Focus with the chosen weapon" ],
    "description"   : "Move an additional 5 feet when making a 5-foot step with Outslug Style",
    "level (est)"   : 1
  },
  { "name"          : "Disengaging Shot",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Disengaging Feint", "Dodge", "Improved Feint", "Mobility" ],
    "description"   : "When using Disengaging Flourish, you may make a single attack",
    "level (est)"   : 1
  },
  { "name"          : "Unfair Grip",
    "prerequisites" : [ "Str 13", "Dex 13", "Improved Grapple", "Improved Unarmed Strike", "Power Attack", "base attack bonus +1" ],
    "description"   : "Gain a bonus on checks to maintain grapples, those grappled take a penalty to escape",
    "level (est)"   : 1
  },
  { "name"          : "Vanguard Hustle",
    "prerequisites" : [ "Dex 13", "BodyguardAPG", "Combat PatrolAPG", "Combat Reflexes", "Mobility", "Saving ShieldAPG", "Vanguard Style", "Vanguard Ward", "proficiency with light or heavy shields." ],
    "description"   : "Add half your shields enhancement bonus when using Saving Shield",
    "level (est)"   : 1
  },
  { "name"          : "Blood Spurt",
    "prerequisites" : [ "Base attack bonus +2", "susceptibility to bleed damage" ],
    "description"   : "Adjacent foes risk being blinded when dealing you bleed damage",
    "level (est)"   : 2
  },
  { "name"          : "Aldori Artistry",
    "prerequisites" : [ "Exotic Weapon Proficiency (Aldori dueling sword)", "Weapon Finesse", "base attack bonus +2" ],
    "description"   : "Gain a+2 bonus on a combat maneuver when using an Aldori dueling sword",
    "level (est)"   : 2
  },
  { "name"          : "Rubble Skirmisher",
    "prerequisites" : [ "Dex 13", "Nimble Moves", "base attack bonus +2" ],
    "description"   : "Gain a +2 bonus on combat maneuver checks and CMD when in naturally occuring difficult terrain",
    "level (est)"   : 2
  },
  { "name"          : "Staggering Fist",
    "prerequisites" : [ "Dex 13", "Wis 13", "Improved Unarmed Strike", "base attack bonus +2" ],
    "description"   : "Stagger foes with unarmed strikes",
    "level (est)"   : 2
  },
  { "name"          : "Reap the Infirm",
    "prerequisites" : [ "Base attack bonus +3" ],
    "description"   : "Deal extra damage to diseased creatures",
    "level (est)"   : 3
  },
  { "name"          : "Holy Water Assault",
    "prerequisites" : [ "Base attack bonus +1", "Knowledge (religion) 3 ranks" ],
    "description"   : "Use holy water for a variety of other special effects",
    "level (est)"   : 3
  },
  { "name"          : "Stunning Fist Adept",
    "prerequisites" : [ "Stunning Fist", "base attack bonus +3" ],
    "description"   : "Add +1 to the saving throw DC of stunning fist.",
    "level (est)"   : 3
  },
  { "name"          : "Surprising Combatant",
    "prerequisites" : [ "Improved Initiative", "Bluff 3 ranks" ],
    "description"   : "Trick your foes into discounting you as a combatant",
    "level (est)"   : 3
  },
  { "name"          : "Press to the Wall",
    "prerequisites" : [ "Step Up", "base attack bonus +3" ],
    "description"   : "Gain flank bonuses when your opponent is up against an object",
    "level (est)"   : 3
  },
  { "name"          : "Shielded Stand",
    "prerequisites" : [ "Shield Focus", "base attack bonus +3 or fighter level 1st." ],
    "description"   : "Guard yourself or an ally while standing up",
    "tags": [ "combat feat", "shield mastery feat" ],
    "level (est)"   : 3
  },
  { "name"          : "Improved Beast Hunter",
    "prerequisites" : [ "Beast Hunter", "base attack bonus +3", "Knowledge (nature) or Survival 3 ranks" ],
    "description"   : "Gain bonuses on combat maneuver checks, CMD, and Reflex saves when fighting animals larger than you in chosen terrain",
    "level (est)"   : 3
  },
  { "name"          : "Bristling Drag",
    "prerequisites" : [ "Str 13", "Improved Drag", "Power Attack", "base attack bonus +3" ],
    "description"   : "Deal additional damage to a foe when you drag it through difficult terrain",
    "level (est)"   : 3
  },
  { "name"          : "Bristling Bull Rush",
    "prerequisites" : [ "Str 13", "Improved Bull Rush", "Power Attack", "base attack bonus +3" ],
    "description"   : "Deal additional damage to a foe when you successfully bull rush it through difficult terrain",
    "level (est)"   : 3
  },
  { "name"          : "Snapping Turtle Clutch",
    "prerequisites" : [ "Snapping Turtle Style", "Improved Grapple", "Improved Unarmed Strike", "base attack bonus +3 or monk level 3rd" ],
    "description"   : "Your shield bonus applies to your CMD and touch AC",
    "level (est)"   : 3
  },
  { "name"          : "Tatzlwyrm Grappler",
    "prerequisites" : [ "Dex 13", "Improved Grapple", "Improved Unarmed Strike", "Tatzlwyrm Claw Style", "Escape Artist 3 ranks" ],
    "description"   : "Use Escape Artist instead of CMD when resisting a grapple.",
    "level (est)"   : 3
  },
  { "name"          : "Moonlight Stalker",
    "prerequisites" : [ "Int 13", "Blind-Fight", "Combat Expertise", "Bluff 3 ranks", "darkvision or low-light vision racial trait" ],
    "description"   : "Gain +2 on damage and attack rolls when you have concealment vs. foe",
    "level (est)"   : 3
  },
  { "name"          : "Kitsune Tricks",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Improved Dirty TrickAPG", "Kitsune Style", "base attack bonus +3 or monk level 3rd" ],
    "description"   : "Apply two conditions with a single dirty trick",
    "level (est)"   : 3
  },
  { "name"          : "Jaguar Pounce",
    "prerequisites" : [ "Base attack bonus +4" ],
    "description"   : "Gain benefits of Improved Critical feat when charging or Spring Attacking a flat-footed or helpless foe",
    "level (est)"   : 4
  },
  { "name"          : "Spring Attack",
    "prerequisites" : [ "Mobility", "base attack bonus +4" ],
    "description"   : "Move before and after melee attack",
    "level (est)"   : 4
  },
  { "name"          : "Greater Serpent Lash",
    "prerequisites" : [ "Serpent Lash", "base attack bonus +4" ],
    "description"   : "Reposition enemies with Serpent Lash",
    "level (est)"   : 4
  },
  { "name"          : "Thrill of the Hunt",
    "prerequisites" : [ "Survival 1 rank", "base attack bonus +4 or track class feature" ],
    "description"   : "Designate a creature you are tracking as your prize to gain bonuses against it",
    "level (est)"   : 4
  },
  { "name"          : "But a Scratch",
    "prerequisites" : [ "Cha 13", "Bluff 4 ranks" ],
    "description"   : "Demoralize foes by playing down a mighty blow",
    "level (est)"   : 4
  },
  { "name"          : "Great Cleave",
    "prerequisites" : [ "Cleave", "base attack bonus +4" ],
    "description"   : "Make an additional attack after each attack hits",
    "level (est)"   : 4
  },
  { "name"          : "Improved Low Blow",
    "prerequisites" : [ "Base attack bonus +4", "halfling", "low-blow racial trait" ],
    "description"   : "+2 critical confirmation against larger opponents, 1/day reroll a confirmation roll",
    "level (est)"   : 4
  },
  { "name"          : "Mirror Move",
    "prerequisites" : [ "Int 13", "Combat Expertise", "base attack bonus +4" ],
    "description"   : "Mirror uses of your opponents’ feats",
    "level (est)"   : 4
  },
  { "name"          : "Aquadynamic Shot",
    "prerequisites" : [ "Far Shot", "Point-Blank Shot", "base attack bonus +4" ],
    "description"   : "Halve penalties for using projectile weapons underwater",
    "level (est)"   : 4
  },
  { "name"          : "Voracious Blade",
    "prerequisites" : [ "Weapon Focus (rhoka sword)", "base attack bonus +4", "urdefhan" ],
    "description"   : "Channel your daemonic energy through a rhoka sword",
    "level (est)"   : 4
  },
  { "name"          : "Shot on the Run",
    "prerequisites" : [ "Dex 13", "Mobility", "Point-Blank Shot", "base attack bonus +4" ],
    "description"   : "Make ranged attack at any point during movement",
    "level (est)"   : 4
  },
  { "name"          : "Skyseeker Thrash",
    "prerequisites" : [ "Con 13", "Skyseeker Style", "Step Up", "base attack bonus +4" ],
    "description"   : "Gain a damage bonus against larger creatures",
    "level (est)"   : 4
  },
  { "name"          : "Subjective Slam",
    "prerequisites" : [ "Con 13", "Wis 13", "Subjective Mobility", "base attack bonus +4 or monk level 3rd" ],
    "description"   : "Take half falling damage and you can intentionally fall against targets to damage them while on planes with subjective directional gravity",
    "level (est)"   : 4
  },
  { "name"          : "Misdirection Tactics",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Deceitful", "Bluff 4 ranks" ],
    "description"   : "While using total defense, use Bluff to negate a hit",
    "level (est)"   : 4
  },
  { "name"          : "Dazing Fist",
    "prerequisites" : [ "Dex 13", "Wis 13", "Improved Unarmed Strike", "base attack bonus +4" ],
    "description"   : "Daze with unarmed strikes",
    "level (est)"   : 4
  },
  { "name"          : "Archon Diversion",
    "prerequisites" : [ "Archon Style", "Combat Expertise", "Combat Reflexes", "base attack bonus +4 or monk level 3rd" ],
    "description"   : "Redirect an attack from an opponent to yourself to grant several allies attacks of opporunity",
    "level (est)"   : 4
  },
  { "name"          : "Whirlwind Attack",
    "prerequisites" : [ "Dex 13", "Combat Expertise", "Spring Attack", "base attack bonus +4" ],
    "description"   : "Make one melee attack against all foes within reach",
    "level (est)"   : 4
  },
  { "name"          : "Startoss Shower",
    "prerequisites" : [ "Dex 13", "Point-Blank Shot", "Startoss Comet", "Startoss Style", "Weapon Focus with the chosen weapon", "base attack bonus +4" ],
    "description"   : "Make attacks at other opponents near initial target while using Startoss Style",
    "level (est)"   : 4
  },
  { "name"          : "Sisterhood Rampart",
    "prerequisites" : [ "Cha 13", "Shield Focus", "Shield WallAPG", "Sisterhood Style", "Weapon Focus (longsword)", "base attack bonus +4" ],
    "description"   : "Grant adjacent female allies greater protection from Shield Wall",
    "level (est)"   : 4
  },
  { "name"          : "Martial Focus",
    "prerequisites" : [ "Base attack bonus +5" ],
    "description"   : "+1 damage with a weapon group; access Weapon Mastery for that group",
    "level (est)"   : 5
  },
  { "name"          : "Position of Strength",
    "prerequisites" : [ "Intimidate 5 ranks" ],
    "description"   : "Gain bonuses to Intimidate when you are armed and target is not",
    "level (est)"   : 5
  },
  { "name"          : "Defensive Weapon Training",
    "prerequisites" : [ "Int 13", "base attack bonus +5" ],
    "description"   : "Gain +2 dodge bonus against a single fighter weapon group",
    "level (est)"   : 5
  },
  { "name"          : "Terrifying Assault",
    "prerequisites" : [ "Frightening Ambush", "Intimidate 5 ranks" ],
    "description"   : "Make a target frightened instead of shaken when demoralizing",
    "level (est)"   : 5
  },
  { "name"          : "Battle Cry",
    "prerequisites" : [ "Cha 13", "base attack bonus +5 or Perform (act, oratory, or sing) 5 ranks" ],
    "description"   : "Let out a cry that grants allies a +1 bonus on attack rolls and +4 bonus on saves against fear",
    "level (est)"   : 5
  },
  { "name"          : "Martial Dominance",
    "prerequisites" : [ "Base attack bonus +5", "Intimidate 1 rank" ],
    "description"   : "Intimidate with martial training and on critical hits",
    "level (est)"   : 5
  },
  { "name"          : "Canny Tumble",
    "prerequisites" : [ "Dodge", "Mobility", "Acrobatics 5 ranks" ],
    "description"   : "Gain a bonus on melee attack rolls when you use Acrobatics to avoid attacks of opportunity",
    "level (est)"   : 5
  },
  { "name"          : "Cudgeler Sweep",
    "prerequisites" : [ "Bludgeoner", "Cudgeler Style", "base attack bonus +5 or monk level 5th" ],
    "description"   : "Attempt to trip your foes on a charge with Cudgeler Style",
    "level (est)"   : 5
  },
  { "name"          : "Winter's Strike",
    "prerequisites" : [ "Nature Magic or the ability to cast druid or ranger spells", "Vital Strike", "Knowledge (nature) 5 ranks" ],
    "description"   : "Target of your Vital Strike must successfully save or become fatigued",
    "level (est)"   : 5
  },
  { "name"          : "Ascetic Form",
    "prerequisites" : [ "Ascetic Style", "Weapon Focus with the chosen melee weapon", "base attack bonus +5 or monk level 5th" ],
    "description"   : "Use a new melee weapon with unarmed class abilities",
    "level (est)"   : 5
  },
  { "name"          : "Rhino Charge",
    "prerequisites" : [ "Power Attack", "Improved Bull Rush", "base attack bonus +5" ],
    "description"   : "Gain the ability to ready charge attacks",
    "level (est)"   : 5
  },
  { "name"          : "Stunning Irruption",
    "prerequisites" : [ "Str 15", "Power Attack", "base attack bonus +5" ],
    "description"   : "Stun your opponents by breaking through objects",
    "level (est)"   : 5
  },
  { "name"          : "Combat Patrol",
    "prerequisites" : [ "Combat Reflexes", "Mobility", "base attack bonus +5" ],
    "description"   : "Increase threatened area for attack of opportunity",
    "level (est)"   : 5
  },
  { "name"          : "Improved Whip Mastery",
    "prerequisites" : [ "Weapon Focus (whip)", "Whip Mastery", "base attack bonus +5" ],
    "description"   : "Threaten with your whip and grasp Tiny objects",
    "level (est)"   : 5
  },
  { "name"          : "Improved Position of Strength",
    "prerequisites" : [ "Position of Strength", "Two-Weapon Fighting or Multiattack", "Intimidate 5 ranks" ],
    "description"   : "Gain the bonus from Position of Strength even when target is armed",
    "level (est)"   : 5
  },
  { "name"          : "Crane Wing",
    "prerequisites" : [ "Crane Style", "Dodge", "Improved Unarmed Strike", "base attack bonus +5 or monk level 5th" ],
    "description"   : "May deflect one attack per round while fighting defensively or using total defense",
    "level (est)"   : 5
  },
  { "name"          : "Brutal Coup de Grace",
    "prerequisites" : [ "Dazzling Display", "Weapon Focus", "base attack bonus +5", "proficiency with the selected weapon" ],
    "description"   : "Successful coup de grace disheartens nearby enemies",
    "level (est)"   : 5
  },
  { "name"          : "Demonic Momentum",
    "prerequisites" : [ "Demonic Style", "Improved Bull Rush", "Power Attack", "base attack bonus +5" ],
    "description"   : "Gain damage bonus based on how far you charge when you bull rush",
    "level (est)"   : 5
  },
  { "name"          : "Kraken Throttle",
    "prerequisites" : [ "Wis 13", "Improved Grapple", "Improved Unarmed Strike", "Kraken Style", "base attack bonus +5 or monk level 5th" ],
    "description"   : "Choke your opponent while grappling",
    "level (est)"   : 5
  },
  { "name"          : "Orc Rampage",
    "prerequisites" : [ "Bullying BlowARG", "Intimidating Prowess", "Orc Fury Style", "Intimidate 5 ranks", "weapon familiarity racial trait" ],
    "description"   : "Bonus to attack/damage against shaken opponents",
    "level (est)"   : 5
  },
  { "name"          : "Dragon Ferocity",
    "prerequisites" : [ "Str 15", "Improved Unarmed Strike", "Dragon Style", "Stunning Fist", "Acrobatics 5 ranks" ],
    "description"   : "Gain bonus on unarmed attacks, and you can cause opponents to be shaken",
    "level (est)"   : 5
  },
  { "name"          : "Snapping Turtle Shell",
    "prerequisites" : [ "Snapping Turtle Clutch", "Snapping Turtle Style", "Improved Grapple", "Improved Unarmed Strike", "base attack bonus +5 or monk level 5th" ],
    "description"   : "AC bonus increases by 2, and opponents receive –4 on critical confirmations",
    "level (est)"   : 5
  },
  { "name"          : "Horn of the Criosphinx",
    "prerequisites" : [ "Base attack bonus +6 or monk level 6th" ],
    "description"   : "Add double your Strength bonus to damage when charging with a two-handed weapon",
    "level (est)"   : 6
  },
  { "name"          : "Hammer the Gap",
    "prerequisites" : [ "Base attack bonus +6" ],
    "description"   : "With a full-attack action, each hit against the same opponent deals extra damage",
    "level (est)"   : 6
  },
  { "name"          : "Lunge",
    "prerequisites" : [ "Base attack bonus +6" ],
    "description"   : "Take a –2 penalty to your AC to attack with reach",
    "level (est)"   : 6
  },
  { "name"          : "Vital Strike",
    "prerequisites" : [ "Base attack bonus +6" ],
    "description"   : "Deal twice the normal damage on a single attack",
    "level (est)"   : 6
  },
  { "name"          : "Defended Movement",
    "prerequisites" : [ "Shield Focus", "base attack bonus +6 or fighter level 4th." ],
    "description"   : "Gain +2 AC vs attacks of opportunity",
    "tags": [ "combat feat", "shield mastery feat" ],
    "level (est)"   : 6
  },
  { "name"          : "Greater Feint",
    "prerequisites" : [ "Improved Feint", "base attack bonus +6" ],
    "description"   : "Enemies you feint lose their Dex bonus for 1 round",
    "level (est)"   : 6
  },
  { "name"          : "Armor Material Expertise",
    "prerequisites" : [ "Base attack bonus +6 or fighter level 4th", "armor training class feature." ],
    "description"   : "Gain a benefit based on your armor's special material",
    "tags": [ "combat feat", "armor mastery feat" ],
    "level (est)"   : 6
  },
  { "name"          : "Cornugon Smash",
    "prerequisites" : [ "Power Attack", "Intimidate 6 ranks" ],
    "description"   : "Make intimidate checks along with power attacks",
    "level (est)"   : 6
  },
  { "name"          : "Greater Disarm",
    "prerequisites" : [ "Improved Disarm", "base attack bonus +6" ],
    "description"   : "Disarmed weapons are knocked away from your enemy",
    "level (est)"   : 6
  },
  { "name"          : "Greater Sunder",
    "prerequisites" : [ "Improved Sunder", "base attack bonus +6" ],
    "description"   : "Damage from sunder attempts transfers to your enemy",
    "level (est)"   : 6
  },
  { "name"          : "Greater Bull Rush",
    "prerequisites" : [ "Improved Bull Rush", "base attack bonus +6" ],
    "description"   : "Enemies you bull rush provoke attacks of opportunity",
    "level (est)"   : 6
  },
  { "name"          : "Shatter Defenses",
    "prerequisites" : [ "Dazzling Display", "base attack bonus +6" ],
    "description"   : "Hindered foes are flat-footed",
    "level (est)"   : 6
  },
  { "name"          : "Horse Master",
    "comments": [ "A cavalier of 4th level or higher may take the Horse Master trait, ignoring the expert trainer class feature. A cavalier who trades this class feature for another as part of an archetype can not take the Horse Master feat." ],
    "prerequisites" : [ "Expert trainer class feature (Advanced Player’s Guide 33)", "Ride 6 ranks" ],
    "description"   : "Use your character level to determine powers and abilities for your mount",
    "level (est)"   : 6
  },
  { "name"          : "Strike True",
    "prerequisites" : [ "Combat Expertise", "base attack bonus +6" ],
    "description"   : "Gain +4 bonus on next melee attack as a move action",
    "level (est)"   : 6
  },
  { "name"          : "Greater Grapple",
    "prerequisites" : [ "Improved Grapple", "base attack bonus +6" ],
    "description"   : "Maintain your grapple as a move action",
    "level (est)"   : 6
  },
  { "name"          : "Greater Trip",
    "prerequisites" : [ "Improved Trip", "base attack bonus +6" ],
    "description"   : "Enemies you trip provoke attacks of opportunity",
    "level (est)"   : 6
  },
  { "name"          : "Gorgon's Fist",
    "prerequisites" : [ "Scorpion Style", "base attack bonus +6" ],
    "description"   : "Stagger a foe whose speed is reduced",
    "level (est)"   : 6
  },
  { "name"          : "Greater Overrun",
    "prerequisites" : [ "Improved Overrun", "base attack bonus +6" ],
    "description"   : "Enemies you overrun provoke attacks of opportunity",
    "level (est)"   : 6
  },
  { "name"          : "Soulwrecking Strike",
    "prerequisites" : [ "Vital Strike", "base attack bonus +6" ],
    "description"   : "Damage a possessing creature by attacking its host",
    "level (est)"   : 6
  },
  { "name"          : "Bloody Assault",
    "prerequisites" : [ "Str 13", "Power Attack", "base attack bonus +6" ],
    "description"   : "Trade melee attack bonus for bleed damage",
    "level (est)"   : 6
  },
  { "name"          : "Poised Bearing",
    "prerequisites" : [ "Base attack bonus +6 or fighter level 4th", "armor training class feature", "proficiency with medium or heavy armor." ],
    "description"   : "Treat your size as one category larger for combat maneuvers",
    "tags": [ "combat feat", "armor mastery feat" ],
    "level (est)"   : 6
  },
  { "name"          : "Tiger Claws",
    "prerequisites" : [ "Improved Unarmed Strike", "Tiger Style", "base attack bonus +6 or monk level 5th" ],
    "description"   : "Make a single attack with both hands, and combine the results",
    "level (est)"   : 6
  },
  { "name"          : "Porcupine Defense",
    "prerequisites" : [ "Combat Expertise", "Combat Reflexes", "base attack bonus +6" ],
    "description"   : "Raise your defenses against combat maneuvers from larger creatures",
    "level (est)"   : 6
  },
  { "name"          : "Jawbreaker",
    "prerequisites" : [ "Improved Unarmed Strike", "Stunning Fist", "Heal 6 ranks" ],
    "description"   : "With successful Stunning Fist, you may cripple opponent's mouth",
    "level (est)"   : 6
  },
  { "name"          : "Improved Two-Weapon Fighting",
    "prerequisites" : [ "Dex 17", "Two-Weapon Fighting", "base attack bonus +6" ],
    "description"   : "Gain additional off-hand attack",
    "level (est)"   : 6
  },
  { "name"          : "Improved Intercept Blow",
    "prerequisites" : [ "Intercept Blow", "base attack bonus +6", "animal companion" ],
    "description"   : "Further reduce damage while using Intercept Blows",
    "level (est)"   : 6
  },
  { "name"          : "Wind Stance",
    "prerequisites" : [ "Dex 15", "Dodge", "base attack bonus +6" ],
    "description"   : "Gain 20% concealment if you move",
    "level (est)"   : 6
  },
  { "name"          : "Chokehold",
    "prerequisites" : [ "Improved Grapple", "Improved Unarmed Strike", "base attack bonus +6 or monk level 5th" ],
    "description"   : "May pin grappled opponent one size category larger than you",
    "level (est)"   : 6
  },
  { "name"          : "Ironclad Reactions",
    "prerequisites" : [ "Base attack bonus +6 or fighter level 4th", "armor training class feature", "proficiency with medium armor." ],
    "description"   : "Take a bonus 5-foot step when struck in combat",
    "tags": [ "combat feat", "armor mastery feat" ],
    "level (est)"   : 6
  },
  { "name"          : "Violent Display",
    "prerequisites" : [ "Dazzling Display", "Weapon Focus", "base attack bonus +6" ],
    "description"   : "Use Dazzling Display whenever you land a sneak attack or confirm a critical hit",
    "level (est)"   : 6
  },
  { "name"          : "Boar Ferocity",
    "prerequisites" : [ "Improved Unarmed Strike", "Boar Style", "Intimidate 6 ranks" ],
    "description"   : "Add piercing damage to unarmed attacks, and demoralize opponents",
    "level (est)"   : 6
  },
  { "name"          : "Woodland Wraith",
    "prerequisites" : [ "Dex 15", "Dodge", "base attack bonus +6" ],
    "description"   : "Gain concealment when withdrawing or taking multiple actions and ending movement in naturally occurring difficult terrain",
    "level (est)"   : 6
  },
  { "name"          : "Shield Slam",
    "prerequisites" : [ "Improved Shield Bash", "Two-Weapon Fighting", "base attack bonus +6" ],
    "description"   : "Free bull rush with a bash attack",
    "level (est)"   : 6
  },
  { "name"          : "Combat Style Master",
    "prerequisites" : [ "Improved Unarmed Strike", "two or more style feats", "base attack bonus +6 or monk level 5th" ],
    "description"   : "May switch styles as a free action",
    "level (est)"   : 6
  },
  { "name"          : "Eldritch Claws",
    "prerequisites" : [ "Str 15", "natural weapons", "base attack bonus +6" ],
    "description"   : "Natural weapons treated as magic and silver",
    "level (est)"   : 6
  },
  { "name"          : "Death or Glory",
    "prerequisites" : [ "Str 13", "Power Attack", "base attack bonus +6" ],
    "description"   : "Gain +4 on attack, damage, and critical rolls vs. Large or larger opponents",
    "level (est)"   : 6
  },
  { "name"          : "Second Chance",
    "prerequisites" : [ "Int 13", "Combat Expertise", "base attack bonus +6" ],
    "description"   : "Exchange later attacks to reroll missed first attack",
    "level (est)"   : 6
  },
  { "name"          : "Snake Sidewind",
    "prerequisites" : [ "Improved Unarmed Strike", "Snake Style", "Acrobatics 3 ranks", "Sense Motive 6 ranks" ],
    "description"   : "Gain a bonus to avoid being knocked prone, and use Sense Motive check to confirm critical hits",
    "level (est)"   : 6
  },
  { "name"          : "Team Up",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Gang Up", "base attack bonus +6" ],
    "description"   : "Aid another as a move action with two adjacent allies",
    "level (est)"   : 6
  },
  { "name"          : "Divert Harm",
    "prerequisites" : [ "Int 13", "Combat Expertise", "base attack bonus +6", "evasion class feature" ],
    "description"   : "Pull an opponent into an area-of-effect attack to take damage in your place",
    "level (est)"   : 6
  },
  { "name"          : "Disheartening Display",
    "prerequisites" : [ "Dazzling Display", "Weapon Focus", "base attack bonus +6", "proficiency with chosen weapon" ],
    "description"   : "Use Dazzling Display to increase a fear effect",
    "level (est)"   : 6
  },
  { "name"          : "Quick Reposition",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Improved Reposition", "base attack bonus +6" ],
    "description"   : "May reposition in place of one of your melee attacks",
    "level (est)"   : 6
  },
  { "name"          : "Quick Drag",
    "prerequisites" : [ "Str 13", "Improved Drag", "Power Attack", "base attack bonus +6" ],
    "description"   : "May perform a drag maneuver in place of one of your melee attacks",
    "level (est)"   : 6
  },
  { "name"          : "Quick Dirty Trick",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Improved Dirty Trick", "base attack bonus +6" ],
    "description"   : "May perform a dirty trick in place of one of your melee attacks",
    "level (est)"   : 6
  },
  { "name"          : "Quick Bull Rush",
    "prerequisites" : [ "Str 13", "Improved Bull Rush", "Power Attack", "base attack bonus +6" ],
    "description"   : "May bull rush in place of one of your melee attacks",
    "level (est)"   : 6
  },
  { "name"          : "Greater Reposition",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Improved Reposition", "base attack bonus +6" ],
    "description"   : "Enemies you reposition provoke attacks of opportunity",
    "level (est)"   : 6
  },
  { "name"          : "Greater Dirty Trick",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Improved Dirty Trick", "base attack bonus +6" ],
    "description"   : "Dirty trick penalty lasts 1d4 rounds",
    "level (est)"   : 6
  },
  { "name"          : "Step Up and Strike",
    "prerequisites" : [ "Dex 13", "Following Step", "Step Up", "base attack bonus +6" ],
    "description"   : "Follow adjacent creature and attack as an immediate action",
    "level (est)"   : 6
  },
  { "name"          : "Shark Tear",
    "prerequisites" : [ "Improved Unarmed Strike", "Shark Style", "Swim 6 ranks", "base attack bonus +6 or monk level 6th" ],
    "description"   : "Gain scent and combat bonuses against bleeding creatures",
    "level (est)"   : 6
  },
  { "name"          : "Body Shield",
    "prerequisites" : [ "Dex 13", "Improved Grapple", "Improved Unarmed Strike", "base attack bonus +6" ],
    "description"   : "Gain cover against attacks while grappling",
    "level (est)"   : 6
  },
  { "name"          : "Mantis Wisdom",
    "prerequisites" : [ "Improved Unarmed Strike", "Mantis Style", "Stunning Fist", "Heal 6 ranks" ],
    "description"   : "Treat half your non-monk levels as monk levels for Stunning Fist effects",
    "level (est)"   : 6
  },
  { "name"          : "Dolphin Dart",
    "prerequisites" : [ "Dolphin Style", "Improved Unarmed Strike", "Swim 6 ranks", "base attack bonus +6 or monk level 6th" ],
    "description"   : "Swim before and after melee attack",
    "level (est)"   : 6
  },
  { "name"          : "Greater Drag",
    "prerequisites" : [ "Str 13", "Improved Drag", "Power Attack", "base attack bonus +6" ],
    "description"   : "Enemies you drag provoke attacks of opportunity",
    "level (est)"   : 6
  },
  { "name"          : "Incite Paranoia",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Deceitful Greater Feint", "Improved Feint", "base attack bonus +6" ],
    "description"   : "Ruin your foes' teamwork and spread doubt among them",
    "level (est)"   : 6
  },
  { "name"          : "Indomitable Mountain Peak",
    "prerequisites" : [ "Wis 15", "Combat Reflexes", "Improved Unarmed Strike", "Indomitable Mountain Style", "base attack bonus +6" ],
    "description"   : "Gain +2 to CMD against combat manuever checks or Acrobatics checks to avoid provoking your attacks of opportunity when a previous attempt succeeds",
    "level (est)"   : 6
  },
  { "name"          : "Ready for Anything",
    "prerequisites" : [ "Alertness", "Improved Initiative", "Lightning Reflexes", "Quick Draw", "base attack bonus +6 or uncanny dodge class feature" ],
    "description"   : "Always act on the surprise round",
    "level (est)"   : 6
  },
  { "name"          : "Dirty Disarm",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Improved Dirty TrickAPG", "Improved Disarm", "base attack bonus +6" ],
    "description"   : "Learn to perform a combined dirty trick and disarm",
    "level (est)"   : 6
  },
  { "name"          : "Azata Mischief",
    "prerequisites" : [ "Agile Maneuvers", "Azata Style", "Dodge", "Mobility", "base attack bonus +6" ],
    "description"   : "You can trip those whose attacks of opportunity against you miss",
    "level (est)"   : 6
  },
  { "name"          : "Circling Mongoose",
    "prerequisites" : [ "Dex 13", "Dodge", "Mobility", "Spring Attack", "base attack bonus +6" ],
    "description"   : "Circle your opponent while attacking",
    "level (est)"   : 6
  },
  { "name"          : "Street Sweep",
    "prerequisites" : [ "Str 15", "Improved Bull Rush", "Improved Unarmed Strike", "Power Attack", "Street Style", "base attack bonus +6 or monk level 5th" ],
    "description"   : "Follow up attack to knock bull-rushed foes prone",
    "level (est)"   : 6
  },
  { "name"          : "Improved Cleaving Finish",
    "prerequisites" : [ "Str 13", "Cleave", "Cleaving Finish", "Great Cleave", "Power Attack", "base attack bonus +6" ],
    "description"   : "May use Cleaving Finish any number of times/round",
    "level (est)"   : 6
  },
  { "name"          : "Deathless Initiate",
    "prerequisites" : [ "Str 13", "Con 13", "orc or half-orc", "Diehard", "Endurance", "base attack bonus +6" ],
    "description"   : "Not staggered while using Diehard; gain +2 on melee damage rolls",
    "level (est)"   : 6
  },
  { "name"          : "Parting Shot",
    "prerequisites" : [ "Dex 13", "Dodge", "Mobility", "Point Blank Shot", "Shot on the Run", "base attack bonus +6." ],
    "description"   : "Make a ranged attack when withdrawing",
    "level (est)"   : 6
  },
  { "name"          : "Felling Smash",
    "prerequisites" : [ "Int 13", "Str 13", "Combat Expertise", "Improved Trip", "Power Attack", "base attack bonus +6" ],
    "description"   : "Trip a foe when you make a power attack",
    "level (est)"   : 6
  },
  { "name"          : "Smashing Dent",
    "prerequisites" : [ "Str 13", "Improved Sunder", "Smashing Crush", "Smashing Style", "Weapon Focus with the chosen weapon", "base attack bonus +6" ],
    "description"   : "Reduce the armor bonus of armor you sunder and increase the armor check penalty",
    "level (est)"   : 6
  },
  { "name"          : "Crashing Wave Buffet",
    "prerequisites" : [ "Wis 15", "Crashing Wave Style", "Improved Drag", "Improved Reposition", "Improved Unarmed Strike", "base attack bonus +6" ],
    "description"   : "Disorient an opponent when you drag or reposition it",
    "level (est)"   : 6
  },
  { "name"          : "Kitsune Vengeance",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Improved Dirty TrickAPG", "Kitsune Style", "Kitsune Tricks", "base attack bonus +6 or monk level 6th" ],
    "description"   : "Use dirty tricks with attacks of opportunity",
    "level (est)"   : 6
  },
  { "name"          : "Dirty Grapple",
    "prerequisites" : [ "Dex 13", "Int 13", "Combat Expertise", "Improved Dirty TrickAPG", "Improved Grapple", "Improved Unarmed Strike", "base attack bonus +6" ],
    "description"   : "Combine a dirty trick and grapple combat maneuver",
    "level (est)"   : 6
  },
  { "name"          : "Moonlight Stalker Feint",
    "prerequisites" : [ "Int 13", "Blind-Fight", "Combat Expertise", "Improved Feint", "Moonlight Stalker", "Bluff 6 ranks", "darkvision or low-light vision racial trait" ],
    "description"   : "Make a Bluff check to feint with concealment vs. foe",
    "level (est)"   : 6
  },
  { "name"          : "Improved Two-Weapon Feint",
    "prerequisites" : [ "Dex 17", "Int 13", "Combat Expertise", "Improved Two-Weapon Fighting", "Two-Weapon Feint", "Two-Weapon Fighting", "base attack bonus +6" ],
    "description"   : "Make a Bluff check instead of your first attack",
    "level (est)"   : 6
  },
  { "name"          : "Blood Frenzy Assault",
    "prerequisites" : [ "Str 17", "Blood Frenzy Strike", "Blood Frenzy Style", "Bloody Assault", "Improved Unarmed Strike", "Power Attack", "base attack bonus +6", "aquatic subtype" ],
    "description"   : "Gain additional attacks per round against bleeding creatures when using Bloody Frenzy Style",
    "level (est)"   : 6
  },
  { "name"          : "Improved Hammer Throw",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Hammer Throw", "Improved Trip", "Point-Blank Shot", "Precise Shot", "base attack bonus +6", "dwarf" ],
    "description"   : "Trip larger opponents from further away when using Hammer Throw",
    "level (est)"   : 6
  },
  { "name"          : "Hamatula Strike",
    "prerequisites" : [ "Improved Grapple", "Strength 13", "Base Attack Bonus +7" ],
    "description"   : "Impale creatures with piercing weapons",
    "level (est)"   : 7
  },
  { "name"          : "Ascetic Strike",
    "prerequisites" : [ "Ascetic Form", "Ascetic Style", "Weapon Focus with the chosen weapon", "base attack bonus +7 or monk level 7th" ],
    "description"   : "Use unarmed damage of a lower level monk instead of the weapon’s base damage",
    "level (est)"   : 7
  },
  { "name"          : "Anticipate Dodge",
    "prerequisites" : [ "Dodge", "Mobility", "base attack bonus +7", "brawler level 4th", "or monk level 4th" ],
    "description"   : "Gain up to a +2 bonus on attack rolls against creatures with a dodge bonus",
    "level (est)"   : 7
  },
  { "name"          : "Diva Strike",
    "prerequisites" : [ "Cha 15", "Combat Expertise", "Diva Style", "Improved Feint", "base attack bonus +7 or bard level 7th" ],
    "description"   : "Deal additional damage t o a target that is denied its Dex bonus to AC",
    "level (est)"   : 7
  },
  { "name"          : "Kraken Wrack",
    "prerequisites" : [ "Wis 13", "Improved Grapple", "Improved Unarmed Strike", "Kraken Style", "base attack bonus +7 or monk level 7th" ],
    "description"   : "Crush your opponent while grappling, damaging their gear",
    "level (est)"   : 7
  },
  { "name"          : "Orc Snarl",
    "prerequisites" : [ "Bullying BlowARG", "Intimidating Prowess", "Orc Fury Style", "Orc Rampage", "Intimidate 7 ranks", "weapon familiarity racial trait" ],
    "description"   : "+4 save vs. effects created by shaken foes",
    "level (est)"   : 7
  },
  { "name"          : "Spring-Heeled Sprint",
    "prerequisites" : [ "Dex 15", "Dodge", "Mobility", "Shot on the Run or Spring Attack", "Spring-Heeled Style", "base attack bonus +7", "proficiency with light armor" ],
    "description"   : "Move up to twice your speed when using Shot on the Run or Spring Attack",
    "level (est)"   : 7
  },
  { "name"          : "Improved Critical",
    "prerequisites" : [ "Proficiency with weapon", "base attack bonus +8" ],
    "description"   : "Double the threat range of one weapon",
    "level (est)"   : 8
  },
  { "name"          : "Osyluth Guile",
    "prerequisites" : [ "Bluff 8 ranks", "Dodge" ],
    "description"   : "Add your Charisma bonus to AC when fighting defensively",
    "level (est)"   : 8
  },
  { "name"          : "Sleeper Hold",
    "prerequisites" : [ "Greater Grapple", "base attack bonus +8" ],
    "description"   : "Put your opponent to sleep when grappled.",
    "level (est)"   : 8
  },
  { "name"          : "Betraying Blow",
    "prerequisites" : [ "Solo Maneuvers", "base attack bonus +8" ],
    "description"   : "Deal extra nonlethal damage by bluffing your opponent",
    "level (est)"   : 8
  },
  { "name"          : "Befuddling Strike",
    "prerequisites" : [ "Dex 13", "Wis 13", "Improved Unarmed Strike", "base attack bonus +8" ],
    "description"   : "Confuse opponent with unarmed strike",
    "level (est)"   : 8
  },
  { "name"          : "Staggering Blow",
    "prerequisites" : [ "Str 13", "Power Attack", "Vital Strike", "base attack bonus +8" ],
    "description"   : "Use your vital strike to stagger an opponent",
    "level (est)"   : 8
  },
  { "name"          : "Punishing Kick",
    "prerequisites" : [ "Con 13", "Wis 13", "Improved Unarmed Strike", "base attack bonus +8" ],
    "description"   : "Knock down or push back foes with unarmed strikes",
    "level (est)"   : 8
  },
  { "name"          : "Joyless Toil",
    "prerequisites" : [ "Dex 13", "Wis 13", "Improved Unarmed Strike", "base attack bonus +8" ],
    "description"   : "Nauseate a creature that you strike",
    "level (est)"   : 8
  },
  { "name"          : "Stunning Fist",
    "prerequisites" : [ "Dex 13", "Wis 13", "Improved Unarmed Strike", "base attack bonus +8" ],
    "description"   : "Stun opponent with an unarmed strike",
    "level (est)"   : 8
  },
  { "name"          : "Perfect Strike",
    "prerequisites" : [ "Dex 13", "Wis 13", "Improved Unarmed Strike", "base attack bonus +8" ],
    "description"   : "Roll twice for attacks with monk weapons and take the better roll",
    "level (est)"   : 8
  },
  { "name"          : "Elemental Fist",
    "prerequisites" : [ "Con 13", "Wis 13", "Improved Unarmed Strike", "base attack bonus +8" ],
    "description"   : "Deal 1d6 energy damage with an unarmed strike",
    "level (est)"   : 8
  },
  { "name"          : "Improved Punishing Step",
    "prerequisites" : [ "Dex 13", "Dodge", "Punishing Step", "base attack bonus +8" ],
    "description"   : "Creature's that charge you and miss are flat-footed against your attacks",
    "level (est)"   : 8
  },
  { "name"          : "Diabolic Humiliation",
    "prerequisites" : [ "Combat Reflexes", "Diabolic Style", "Vital Strike", "Improved Unarmed Strike or Weapon Focus (unarmed strike)", "base attack bonus +8 or monk level 7th" ],
    "description"   : "Gain enhanced effects when you use Diabolic Style to humiliate a target",
    "level (est)"   : 8
  },
  { "name"          : "All-Consuming Swing",
    "prerequisites" : [ "Str 13", "Power Attack", "Cleave", "Vital Strike", "base attack bonus +8" ],
    "description"   : "Apply Vital Strike to a Cleave attack, but take the Vital Strike damage yourself as well",
    "level (est)"   : 8
  },
  { "name"          : "Crane Riposte",
    "prerequisites" : [ "Crane Style", "Crane Wing", "Dodge", "Improved Unarmed Strike", "base attack bonus +8 or monk level 7th" ],
    "description"   : "When you deflect an attack, you may make an attack of opportunity",
    "level (est)"   : 8
  },
  { "name"          : "Superior Dirty Trick",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Greater Dirty TrickAPG", "Improved Dirty TrickAPG", "base attack bonus +8" ],
    "description"   : "Targets must spend a full-round action to remove some of your dirty tricks",
    "level (est)"   : 8
  },
  { "name"          : "Archon Justice",
    "prerequisites" : [ "Archon Diversion", "Archon Style", "Combat Expertise", "Combat Reflexes", "base attack bonus +8 or monk level 7th" ],
    "description"   : "Redirect an attack from an opponent to yourself to grant an ally an attack of opportunity",
    "level (est)"   : 8
  },
  { "name"          : "Dragon Roar",
    "prerequisites" : [ "Str 15", "Improved Unarmed Strike", "Dragon Style", "Stunning Fist", "Acrobatics 8 ranks" ],
    "description"   : "Gain +1 use of Stunning Fist per day, and you can emit a concussive roar",
    "level (est)"   : 8
  },
  { "name"          : "Greater Subjective Slam",
    "prerequisites" : [ "Con 15", "Wis 15", "Subjective Mobility", "Subjective Slam", "base attack bonus +8 or monk level 7th" ],
    "description"   : "Lessen check penalty and increase maximum damage when using Subjective Slam",
    "level (est)"   : 8
  },
  { "name"          : "Grabbing Drag",
    "prerequisites" : [ "Grabbing Style", "Improved Grapple", "base attack bonus +8", "brawler level 4th", "or monk level 4th" ],
    "description"   : "Move farther with dragged foes",
    "level (est)"   : 8
  },
  { "name"          : "Improved Surprise Follow-Through",
    "prerequisites" : [ "Str 13", "Cleave", "Great Cleave", "Power Attack", "Surprise Follow Through", "base attack bonus +8" ],
    "description"   : "Deny opponents their Dex bonus when using Great Cleave",
    "level (est)"   : 8
  },
  { "name"          : "Tatzlwyrm Rake",
    "prerequisites" : [ "Dex 13", "Improved Grapple", "Improved Unarmed Strike", "Tatzlwyrm Claw Style", "Tatzlwyrm Grappler", "Escape Artist 8 ranks" ],
    "description"   : "Maintain a grapple without using your hands",
    "level (est)"   : 8
  },
  { "name"          : "Twin Fang Lunge",
    "prerequisites" : [ "Dex 15", "Quick Draw", "Twin Fang Strike", "Twin Fang Style", "Two-Weapon Fighting", "Acrobatics 8 ranks", "base attack bonus +8 or monk level 8th" ],
    "description"   : "Move up to twice your speed and use Twin Fang Strike",
    "level (est)"   : 8
  },
  { "name"          : "Bull-Catcher Toss",
    "prerequisites" : [ "Dex 13", "Bull-Catcher Style", "Improved Grapple", "Improved Unarmed Strike", "base attack bonus +8", "brawlerACG level 4th", "or monk level 4th" ],
    "description"   : "Reposition creatures you grab a creature with Bull-Catcher Style",
    "level (est)"   : 8
  },
  { "name"          : "Street Carnage",
    "prerequisites" : [ "Str 15", "Improved Bull Rush", "Improved Unarmed Strike", "Power Attack", "Street Style", "Street Sweep", "base attack bonus +8 or monk level 7th" ],
    "description"   : "Gain x3 critical multiplier with unamed strike",
    "level (est)"   : 8
  },
  { "name"          : "Brute Stomp",
    "prerequisites" : [ "Str 19", "Int 13", "Brute Style", "Combat Reflexes", "Improved Overrun", "Improved Trip", "Improved Unarmed Strike", "Vicious Stomp", "base attack bonus +8" ],
    "description"   : "Make an extra unarmed attack when starting next to a prone foe",
    "level (est)"   : 8
  },
  { "name"          : "Wingclipper",
    "prerequisites" : [ "Base attack bonus +9" ],
    "description"   : "Forgo critical damage to prevent your enemy from flying",
    "level (est)"   : 9
  },
  { "name"          : "Devastating Strike",
    "prerequisites" : [ "Vital Strike", "base attack bonus +9" ],
    "description"   : "Deal extra damage when using Vital Strike bonus",
    "level (est)"   : 9
  },
  { "name"          : "Improved Rending Fury",
    "prerequisites" : [ "Rending Fury", "base attack bonus +9", "rend special attack" ],
    "description"   : "Deal extra damage on a successful rend",
    "level (est)"   : 9
  },
  { "name"          : "Psychovore Strike",
    "prerequisites" : [ "Improved Unarmed Strike", "Psychovore Style", "Sense Motive 9 ranks" ],
    "description"   : "Confuse creatures you attack while you are in Psychovore Style",
    "level (est)"   : 9
  },
  { "name"          : "Disarming Strike",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Improved Disarm", "base attack bonus +9" ],
    "description"   : "Attempt a disarm on a successful critical hit",
    "level (est)"   : 9
  },
  { "name"          : "Tripping Strike",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Improved Trip", "base attack bonus +9" ],
    "description"   : "Attempt a trip attack on a successful critical hit",
    "level (est)"   : 9
  },
  { "name"          : "Sundering Strike",
    "prerequisites" : [ "Str 13", "Improved Sunder", "Power Attack", "base attack bonus +9" ],
    "description"   : "Attempt a sunder attack on a successful critical hit",
    "level (est)"   : 9
  },
  { "name"          : "Boar Shred",
    "prerequisites" : [ "Improved Unarmed Strike", "Boar Ferocity", "Boar Style", "Intimidate 9 ranks" ],
    "description"   : "Unarmed attacks cause bleed damage",
    "level (est)"   : 9
  },
  { "name"          : "Repositioning Strike",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Improved Trip", "base attack bonus +9" ],
    "description"   : "Attempt a reposition attack on a successful critical hit",
    "level (est)"   : 9
  },
  { "name"          : "Untwisting Iron Strength",
    "prerequisites" : [ "Str 15", "Wis 13", "Perfect Style", "base attack bonus +9 or monk level 9th" ],
    "description"   : "Ignore some of target's hardness",
    "level (est)"   : 9
  },
  { "name"          : "Bull Rush Strike",
    "prerequisites" : [ "Str 13", "Improved Bull Rush", "Power Attack", "base attack bonus +9" ],
    "description"   : "Attempt a bull rush on a successful critical hit",
    "level (est)"   : 9
  },
  { "name"          : "Hamatula Grasp",
    "prerequisites" : [ "Hamatula Strike", "Improved Grapple", "Strength 13", "base attack bonus +9" ],
    "description"   : "Lower the penalty to attack an impaled creature and deal more damage",
    "level (est)"   : 9
  },
  { "name"          : "Cudgeler Takedown",
    "prerequisites" : [ "Bludgeoner", "Cudgeler Style", "Cudgeler Sweep", "base attack bonus +9 or monk level 9th" ],
    "description"   : "Improve your Cudgeler Style and Sweep",
    "level (est)"   : 9
  },
  { "name"          : "Tiger Pounce",
    "prerequisites" : [ "Improved Unarmed Strike", "Power Attack", "Tiger Claws", "Tiger Style", "base attack bonus +9 or monk level 8th" ],
    "description"   : "May apply the penalty from Power Attack to AC",
    "level (est)"   : 9
  },
  { "name"          : "Pinning Knockout",
    "prerequisites" : [ "Dex 13", "Greater Grapple", "Improved Grapple", "Improved Unarmed Strike", "base attack bonus +9 or monk level 9th" ],
    "description"   : "Against a pinned opponent, you may double nonlethal damage with grapple check",
    "level (est)"   : 9
  },
  { "name"          : "Mantis Torment",
    "prerequisites" : [ "Heal 9 ranks", "Improved Unarmed Strike", "Mantis Style", "Mantis Wisdom", "Stunning Fist" ],
    "description"   : "Gain +1 use of Stunning Fist per day, and may dazzle and stagger, then fatigue an opponent",
    "level (est)"   : 9
  },
  { "name"          : "Linnorm Wrath",
    "prerequisites" : [ "Wis 13", "Improved Unarmed Strike", "Linnorm Style", "Linnorm Vengeance", "base attack bonus +9 or monk level 9th" ],
    "description"   : "When you use the Linnorm Vengeance feat to allow an enemy to hit you, you can make a retaliatory unarmed strike attack against that opponent as an immediate action. This acts as an attack of opportunity, and counts against the number of attacks of opportunity you can make each round. Additionally, once per day when a melee attack deals enough damage to knock you unconscious or kill you, the attacker must succeed at a Fortitude saving throw (DC = 10 + 1/2 your character level + your Wisdom modifier) or be stunned for 1 round. This save occurs after you make the retaliatory unarmed strike granted by the Linnorm Vengeance feat.",
    "level (est)"   : 9
  },
  { "name"          : "Unblinking Flame Feint",
    "prerequisites" : [ "Int 13", "Wis 13", "Combat Expertise", "Perfect Style", "base attack bonus +9 or monk level 9th" ],
    "description"   : "Use Wis mod instead of Cha mod to feint",
    "level (est)"   : 9
  },
  { "name"          : "Rapid Grappler",
    "prerequisites" : [ "Dex 13", "Greater Grapple", "Improved Grapple", "Improved Unarmed Strike", "base attack bonus +9 or monk level 9th" ],
    "description"   : "Spend a swift action to make a combat maneuver check to grapple while using Greater Grapple.",
    "level (est)"   : 9
  },
  { "name"          : "Pinning Rend",
    "prerequisites" : [ "Dex 13", "Greater Grapple", "Improved Grapple", "Improved Unarmed Strike", "base attack bonus +9 or monk level 9th" ],
    "description"   : "Against pinned opponent, you may deal bleed damage with Grapple check",
    "level (est)"   : 9
  },
  { "name"          : "Skyseeker Impact",
    "prerequisites" : [ "Con 13", "Skyseeker Style", "Skyseeker Thrash", "Step Up", "base attack bonus +9" ],
    "description"   : "Treat your weapon as one size category larger against creatures larger than yourself",
    "level (est)"   : 9
  },
  { "name"          : "Bonebreaker",
    "prerequisites" : [ "Dex 13", "Improved Grapple", "Improved Unarmed Strike", "Jawbreaker", "Stunning Fist", "Heal 9 ranks" ],
    "description"   : "Deal Str or Dex damage when using Stunning Fist",
    "level (est)"   : 9
  },
  { "name"          : "Counter Reflexes",
    "prerequisites" : [ "Anticipate Dodge", "Dodge", "Mobility", "base attack bonus +9", "brawler level 6th", "or monk level 6th" ],
    "description"   : "Opponents with Mobility do not gain a bonus when they provoke attacks of opportunity from you",
    "level (est)"   : 9
  },
  { "name"          : "Indomitable Mountain Avalanche",
    "prerequisites" : [ "Wis 15", "Combat Reflexes", "Improved Unarmed Strike", "Indomitable Mountain Peak", "Indomitable Mountain Style", "base attack bonus +9" ],
    "description"   : "Make attack of opportunity to push back a foe when a foe fails a combat maneuver against you",
    "level (est)"   : 9
  },
  { "name"          : "Improved Spring Attack",
    "prerequisites" : [ "Dex 15", "Dodge", "Mobility", "Nimble Moves", "Spring Attack", "base attack bonus +9" ],
    "description"   : "Attack up to two targets intead of one when you use Spring Attack",
    "level (est)"   : 9
  },
  { "name"          : "Snake Fang",
    "prerequisites" : [ "Combat Reflexes", "Improved Unarmed Strike", "Snake Sidewind", "Snake Style", "Acrobatics 6 ranks", "Sense Motive 9 ranks" ],
    "description"   : "If opponent misses you, make an attack of opportunity as an immediate action",
    "level (est)"   : 9
  },
  { "name"          : "Beastmaster Ire",
    "prerequisites" : [ "Cha 13", "Alertness", "Beastmaster Salvation", "Beastmaster Style", "Handle Animal 9 ranks", "Sense Motive 5 ranks" ],
    "description"   : "+2 on attacks and +4 on damage against a target when you activate Beastmastery Style's benefit; bonuses double if an enemy's attack damaged your animal companion",
    "level (est)"   : 9
  },
  { "name"          : "Demonic Slaughter",
    "prerequisites" : [ "Cleave", "Demonic Momentum", "Demonic Style", "Great Cleave", "Improved Bull Rush", "Power Attack", "base attack bonus +9" ],
    "description"   : "Use Great Cleave as part of a charge",
    "level (est)"   : 9
  },
  { "name"          : "Jabbing Dancer",
    "prerequisites" : [ "Dodge", "Improved Unarmed Strike", "Jabbing Style", "Mobility", "base attack bonus +9", "brawler level 5th", "or monk level 5th" ],
    "description"   : "Move 5 feet without provoking attacks of opportunity whenever you hit with an unarmed strike",
    "level (est)"   : 9
  },
  { "name"          : "Crashing Wave Fist",
    "prerequisites" : [ "Wis 15", "Crashing Wave Buffet", "Crashing Wave Style", "Improved Drag", "Improved Reposition", "Improved Unarmed Strike", "base attack bonus +9" ],
    "description"   : "Make an unarmed attack against a foe when you drag or reposition it",
    "level (est)"   : 9
  },
  { "name"          : "Pummeling Bully",
    "prerequisites" : [ "Improved Reposition", "Improved Trip", "Improved Unarmed Strike", "Pummeling Style", "base attack bonus +9", "brawler level 5th", "or monk level 5th" ],
    "description"   : "When using Pummeling Style, attempt a reposition or trip combat maneuver as a free action",
    "level (est)"   : 9
  },
  { "name"          : "Deathless Master",
    "prerequisites" : [ "Str 13", "Con 15", "orc or half-orc", "Deathless Initiate", "Diehard", "Endurance", "Ironhide", "base attack bonus +9" ],
    "description"   : "Do not lose hit points while using Diehard",
    "level (est)"   : 9
  },
  { "name"          : "Moonlight Stalker Master",
    "prerequisites" : [ "Int 13", "Blind-Fight", "Combat Expertise", "Improved Feint", "Moonlight Stalker", "Moonlight Stalker Feint", "Bluff 9 ranks", "darkvision or low-light vision racial trait" ],
    "description"   : "While concealed, miss chance increases by 10%",
    "level (est)"   : 9
  },
  { "name"          : "Hold the Blade",
    "prerequisites" : [ "Improved Disarm", "base attack bonus +10" ],
    "description"   : "Disarm an opponent after being attacked.",
    "level (est)"   : 10
  },
  { "name"          : "Improved Blind-Fight",
    "prerequisites" : [ "Perception 10 ranks", "Blind-Fight" ],
    "description"   : "Ignore miss chance for less than total concealment",
    "level (est)"   : 10
  },
  { "name"          : "Sliding Dash",
    "prerequisites" : [ "Dex 15", "Acrobatics 10 ranks or acrobatic charge class feature", "Bluff 3 ranks" ],
    "description"   : "Charge through a foe for a flank attack",
    "level (est)"   : 10
  },
  { "name"          : "Vulpine Pounce",
    "prerequisites" : [ "Swift Kitsune Shapechanger", "base attack bonus +10", "kitsune" ],
    "description"   : "Gain pounce when charging and shifting in the same round.",
    "level (est)"   : 10
  },
  { "name"          : "Blinded Competence",
    "prerequisites" : [ "Blinded Blade Style", "Blind-Fight", "Improved Blind-FightAPG", "Perception 10 ranks" ],
    "description"   : "Pinpoint creatures without a check while using Blinded Blade Style",
    "level (est)"   : 10
  },
  { "name"          : "Misdirection Redirection",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Misdirection Tactics", "Deceitful", "Bluff 10 ranks" ],
    "description"   : "When using Misdirection Tactics, redirect attack to another creature",
    "level (est)"   : 10
  },
  { "name"          : "Misdirection Attack",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Deceitful", "Misdirection Redirection", "Misdirection Tactics", "Bluff 10 ranks" ],
    "description"   : "When using Misdirection Tactics, attacker provokes an attack of opportunity",
    "level (est)"   : 10
  },
  { "name"          : "Elven Battle Torrent",
    "prerequisites" : [ "Int 13", "Elven Battle Focus", "Elven Battle Style", "Elven Battle TrainingARG", "Weapon Finesse", "base attack bonus +10", "weapon familiarity racial trait" ],
    "description"   : "Enemies provoke attacks while you’re fighting defensively",
    "level (est)"   : 10
  },
  { "name"          : "Azata Sprint",
    "prerequisites" : [ "Agile Maneuvers", "Azata Mischief", "Azata Style", "Dodge", "Mobility", "Wind Stance", "base attack bonus +10" ],
    "description"   : "Your base speed increases by 10 feet and you ignore the first 10 feet of difficult terrain in a round",
    "level (est)"   : 10
  },
  { "name"          : "Brute Assault",
    "prerequisites" : [ "Str 23", "Int 13", "Brute Stomp", "Brute Style", "Combat Reflexes", "Improved Overrun", "Improved Trip", "Improved Unarmed Strike", "Vicious Stomp", "base attack bonus +10" ],
    "description"   : "Weaken tripped foes and reduce their move speed",
    "level (est)"   : 10
  },
  { "name"          : "Deadly Finish",
    "prerequisites" : [ "Base attack bonus +11" ],
    "description"   : "Foes you knock out must make a Fort save or die",
    "level (est)"   : 11
  },
  { "name"          : "Strike Back",
    "prerequisites" : [ "Base attack bonus +11" ],
    "description"   : "Attack foes that strike you while using reach",
    "level (est)"   : 11
  },
  { "name"          : "Disorienting Blow",
    "prerequisites" : [ "Stunning Fist", "base attack bonus +11" ],
    "description"   : "Confuse the enemy with your stunning fist attack.",
    "level (est)"   : 11
  },
  { "name"          : "Medusa's Wrath",
    "prerequisites" : [ "Gorgon's Fist", "base attack bonus +11" ],
    "description"   : "Make 2 extra attacks against a hindered foe",
    "level (est)"   : 11
  },
  { "name"          : "Improved Vital Strike",
    "prerequisites" : [ "Vital Strike", "base attack bonus +11" ],
    "description"   : "Deal three times the normal damage on a single attack",
    "level (est)"   : 11
  },
  { "name"          : "Armor Material Mastery",
    "prerequisites" : [ "Armor Material Expertise", "base attack bonus +11 or fighter level 8th", "armor training class feature." ],
    "description"   : "Use Armor Material Expertise two additional times per day",
    "tags": [ "combat feat", "armor mastery feat" ],
    "level (est)"   : 11
  },
  { "name"          : "Two-Weapon Rend",
    "prerequisites" : [ "Double Slice", "Improved Two-Weapon Fighting", "base attack bonus +11" ],
    "description"   : "Rend a foe hit by both your weapons",
    "level (est)"   : 11
  },
  { "name"          : "Dirty Trick Master",
    "prerequisites" : [ "Greater Dirty Trick", "Improved Dirty Trick", "base attack bonus +11" ],
    "description"   : "Worsen the condition of a previously inflicted dirty trick",
    "level (est)"   : 11
  },
  { "name"          : "Improved Precise Shot",
    "prerequisites" : [ "Dex 19", "Precise Shot", "base attack bonus +11" ],
    "description"   : "No cover or concealment chance on ranged attacks",
    "level (est)"   : 11
  },
  { "name"          : "Dazing Assault",
    "prerequisites" : [ "Str 13", "Power Attack", "base attack bonus +11." ],
    "description"   : "Trade melee attack bonus to daze opponents",
    "level (est)"   : 11
  },
  { "name"          : "Deadly Stroke",
    "prerequisites" : [ "Greater Weapon Focus", "Shatter Defenses", "base attack bonus +11" ],
    "description"   : "Deal double damage plus 1 Con bleed",
    "level (est)"   : 11
  },
  { "name"          : "Greater Two-Weapon Fighting",
    "prerequisites" : [ "Dex 19", "Improved Two-Weapon Fighting", "base attack bonus +11" ],
    "description"   : "Gain a third off-hand attack",
    "level (est)"   : 11
  },
  { "name"          : "Lightning Stance",
    "prerequisites" : [ "Dex 17", "Wind Stance", "base attack bonus +11" ],
    "description"   : "Gain 50% concealment if you move",
    "level (est)"   : 11
  },
  { "name"          : "Sprightly Armor",
    "prerequisites" : [ "Dex 13", "base attack bonus +11 or fighter level 8th", "armor training class feature", "proficiency with light armor." ],
    "description"   : "Gain your armor's enhancement bonus to initiative",
    "tags": [ "combat feat", "armor mastery feat" ],
    "level (est)"   : 11
  },
  { "name"          : "Improved Second Chance",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Second Chance", "base attack bonus +11" ],
    "description"   : "Take a –5 penalty on later attacks to reroll missed attack",
    "level (est)"   : 11
  },
  { "name"          : "Dreadful Carnage",
    "prerequisites" : [ "Str 15", "Power Attack", "Furious Focus", "base attack bonus +11." ],
    "description"   : "Make a free Intimidate check when you knock down a foe",
    "level (est)"   : 11
  },
  { "name"          : "Directed Disarm",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Greater Disarm", "Improved Disarm", "base attack bonus +11" ],
    "description"   : "Disarmed weapons land farther from the wielder",
    "level (est)"   : 11
  },
  { "name"          : "Electric Eel Shock",
    "prerequisites" : [ "Wis 15", "Electric Eel Style", "Elemental FistAPG", "Improved Unarmed Strike", "base attack bonus +11 or monk level 7th" ],
    "description"   : "Stagger foes you hit with Elemental Fist",
    "level (est)"   : 11
  },
  { "name"          : "Diva Advance",
    "prerequisites" : [ "Cha 17", "Combat Expertise Diva Strike", "Diva Style", "Improved Feint", "base attack bonus +11 or bard level 11th" ],
    "description"   : "You don't provoke attacks of opportunity from foes you feinted against",
    "level (est)"   : 11
  },
  { "name"          : "Djinni Spirit",
    "prerequisites" : [ "Con 15", "Wis 15", "Djinni Style", "Elemental Fist", "Improved Unarmed Strike", "base attack bonus +11 or monk level 9th" ],
    "description"   : "Gain 1 additional use of Elemental Fist per day, and electricity resistance",
    "level (est)"   : 11
  },
  { "name"          : "Efreeti Stance",
    "prerequisites" : [ "Con 15", "Wis 15", "Efreeti Style", "Elemental Fist", "Improved Unarmed Strike", "base attack bonus +11 or monk level 9th" ],
    "description"   : "Gain +1 use of Elemental Fist per day and fire resistance",
    "level (est)"   : 11
  },
  { "name"          : "Signature Strike Triumph",
    "prerequisites" : [ "Precise Shot", "Signature Strike Style", "Signature Strike Taunt", "Weapon Focus", "base attack bonus +11", "Intimidate 11 ranks" ],
    "description"   : "Inspire your allies when you use Signature Strike Style",
    "level (est)"   : 11
  },
  { "name"          : "Shaitan Skin",
    "prerequisites" : [ "Con 15", "Wis 15", "Elemental Fist", "Improved Unarmed Strike", "Shaitan Style", "base attack bonus +11 or monk level 9th" ],
    "description"   : "Gain +1 use of Elemental Fist per day, and acid resistance",
    "level (est)"   : 11
  },
  { "name"          : "Marid Spirit",
    "prerequisites" : [ "Con 15", "Wis 15", "Elemental Fist", "Marid Style", "Improved Unarmed Strike", "base attack bonus +11 or monk level 9th" ],
    "description"   : "Gain +1 use of Elemental Fist per day, and cold resistance",
    "level (est)"   : 11
  },
  { "name"          : "Cloak and Dagger Subterfuge",
    "prerequisites" : [ "Int 13", "Cloak and Dagger Style", "Combat Expertise", "Improved Dirty TrickAPG", "Weapon Focus with the chosen weapon", "base attack bonus +11" ],
    "description"   : "Use dirty tricks as free actions with an attack of opportunity",
    "level (est)"   : 11
  },
  { "name"          : "Spring-Heeled Reaping",
    "prerequisites" : [ "Dex 17", "Dodge", "Mobility", "Shot on the Run or Spring Attack", "Spring-Heeled Sprint", "Spring-Heeled Style", "base attack bonus +11", "proficiency with light armor" ],
    "description"   : "Attack two creatures when using Shot on the Run or Spring Attack",
    "level (est)"   : 11
  },
  { "name"          : "Anatomical Savant",
    "prerequisites" : [ "Weapon Focus", "base attack bonus +12" ],
    "description"   : "Sneak attack creatures normally immune or fortified",
    "level (est)"   : 12
  },
  { "name"          : "Greater Rending Fury",
    "prerequisites" : [ "Improved Rending Fury", "Rending Fury", "base attack bonus +12", "rend special attack" ],
    "description"   : "When you rend an opponent, you deal bleed damage",
    "level (est)"   : 12
  },
  { "name"          : "Snoutgrip",
    "prerequisites" : [ "Combat Expertise", "Combat Reflexes", "Improved Grapple", "Improved Unarmed Strike", "base attack bonus +12 or 10th-level monk" ],
    "description"   : "Use your grappling prowess to keep an enemy from opening its mouth",
    "level (est)"   : 12
  },
  { "name"          : "Pummeling Charge",
    "prerequisites" : [ "Improved Unarmed Strike", "Pummeling Style", "base attack bonus +12", "brawler level 8th", "or monk level 8th" ],
    "description"   : "Pummel after a charge",
    "level (est)"   : 12
  },
  { "name"          : "Grabbing Master",
    "prerequisites" : [ "Grabbing Drag", "Grabbing Style", "Improved Grapple", "base attack bonus +12", "brawler level 8th", "or monk level 8th" ],
    "description"   : "Grab two foes instead of just one",
    "level (est)"   : 12
  },
  { "name"          : "Tripping Twirl",
    "prerequisites" : [ "Int 13", "Combat Expertise", "Improved Trip", "Tripping Staff", "Weapon Focus (quarterstaff)", "Weapon Specialization (quarterstaff)", "base attack bonus +12" ],
    "description"   : "Use a quarterstaff to make a trip attempt against all adjacent enemies",
    "level (est)"   : 12
  },
  { "name"          : "Neckbreaker",
    "prerequisites" : [ "Bonebreaker", "Greater Grapple", "Improved Grapple", "Improved Unarmed Strike", "Jawbreaker", "Stunning Fist", "Heal 12 ranks" ],
    "description"   : "May deal Str or Dex damage to pinned opponent",
    "level (est)"   : 12
  },
  { "name"          : "Diabolic Judgement",
    "prerequisites" : [ "Combat Reflexes", "Diabolic Humiliation", "Diabolic Style", "Improved Vital Strike", "Vital Strike", "Improved Unarmed Strike or Weapon Focus (unarmed strike)", "base attack bonus +12 or monk level 11th" ],
    "description"   : "Apply Vital Strike on attacks of opportunity",
    "level (est)"   : 12
  },
  { "name"          : "Bull-Catcher Wrangler",
    "prerequisites" : [ "Dex 13", "Bull-Catcher Style", "Bull-Catcher Toss", "Improved Grapple", "Improved Unarmed Strike", "base attack bonus +12", "brawlerACG level 8th", "or monk level 8th" ],
    "description"   : "Redirect a creature's charge when you grab it with Bull-Catcher Style",
    "level (est)"   : 12
  },
  { "name"          : "Deathless Zealot",
    "prerequisites" : [ "Str 13", "Con 17", "orc or half-orc", "Deathless Initiate", "Deathless Master", "Diehard", "Endurance", "Ironhide", "base attack bonus +12" ],
    "description"   : "Foes must reroll critical confirmation attacks",
    "level (est)"   : 12
  },
  { "name"          : "Jabbing Master",
    "prerequisites" : [ "Dodge", "Improved Unarmed Strike", "Jabbing Dancer", "Jabbing Style", "Mobility", "Power Attack", "base attack bonus +12", "brawler level 8th", "or monk level 8th" ],
    "description"   : "Increase the damage dealt with Jabbing Style",
    "level (est)"   : 12
  },
  { "name"          : "Quivering Palm Versatility",
    "prerequisites" : [ "Quivering palm class feature", "base attack bonus +13" ],
    "description"   : "Alter the way you use your quivering palm.",
    "level (est)"   : 13
  },
  { "name"          : "Improved Devastating Strike",
    "prerequisites" : [ "Devastating Strike", "Vital Strike", "base attack bonus +13" ],
    "description"   : "Gain bonus on rolls to confirm critical hits",
    "level (est)"   : 13
  },
  { "name"          : "Electric Eel Conduit",
    "prerequisites" : [ "Wis 17", "Electric Eel Shock", "Electric Eel Style", "Elemental FistAPG", "Improved Unarmed Strike", "base attack bonus +13 or monk level 9th" ],
    "description"   : "Continuously electrocute a target you have grappled",
    "level (est)"   : 13
  },
  { "name"          : "Untwisting Iron Skin",
    "prerequisites" : [ "Str 15", "Wis 13", "Perfect Style", "Toughness", "Untwisting Iron Strength", "base attack bonus +13 or monk level 13th" ],
    "description"   : "Gain DR/adamantine, and gain DR/— when you break certain objects",
    "level (est)"   : 13
  },
  { "name"          : "Marid Coldsnap",
    "prerequisites" : [ "Con 15", "Wis 17", "Elemental Fist", "Marid Spirit", "Marid Style", "Improved Unarmed Strike", "base attack bonus +13 or monk level 11th" ],
    "description"   : "Unleash a 30-foot line of frigid water",
    "level (est)"   : 13
  },
  { "name"          : "Unblinking Flame Fist",
    "prerequisites" : [ "Int 13", "Wis 13", "Combat Expertise", "Perfect Style", "Stunning Fist", "Unblinking Flame Feint", "base attack bonus +13 or monk level 13th" ],
    "description"   : "Stunning fist save DC is +2 vs flat-footed foes",
    "level (est)"   : 13
  },
  { "name"          : "Efreeti Touch",
    "prerequisites" : [ "Con 15", "Wis 17", "Efreeti Style", "Efreeti Stance", "Elemental Fist", "Improved Unarmed Strike", "base attack bonus +13 or monk level 11th" ],
    "description"   : "Can emit a cone of fire that may light opponents on fire",
    "level (est)"   : 13
  },
  { "name"          : "Shaitan Earthblast",
    "prerequisites" : [ "Con 15", "Wis 17", "Elemental Fist", "Improved Unarmed Strike", "Shaitan Skin", "Shaitan Style", "base attack bonus +13 or monk level 11th" ],
    "description"   : "Unleash a 20-foot column of acid",
    "level (est)"   : 13
  },
  { "name"          : "Djinni Spin",
    "prerequisites" : [ "Con 15", "Wis 17", "Djinni Style", "Djinni Spirit", "Elemental Fist", "Improved Unarmed Strike", "base attack bonus +13 or monk level 11th" ],
    "description"   : "Use Elemental Fist to surround yourself with electricity",
    "level (est)"   : 13
  },
  { "name"          : "Paralyzing Strike",
    "prerequisites" : [ "Dex 13", "Wis 13", "Improved Unarmed Strike", "base attack bonus +14" ],
    "description"   : "Paralyze with unarmed strikes",
    "level (est)"   : 14
  },
  { "name"          : "Deadhand Master",
    "prerequisites" : [ "Wis 23", "Deadhand Initiate", "Deadhand Style", "Improved Unarmed Strike", "Knowledge (religion) 14 ranks", "ki pool class feature", "nongood alignment" ],
    "description"   : "Your unarmed strikes inflict negative levels",
    "level (est)"   : 14
  },
  { "name"          : "Greater Blind-Fight",
    "prerequisites" : [ "Perception 15 ranks", "Improved Blind-Fight" ],
    "description"   : "Total concealment is considered normal concealment",
    "level (est)"   : 15
  },
  { "name"          : "Psychovore Master",
    "prerequisites" : [ "Improved Unarmed Strike", "Psychovore Strike", "Psychovore Style", "Sense Motives 15 ranks" ],
    "description"   : "Inflict Intelligence and Wisdom damage when you confirm a critical hit while using Psychovore Style",
    "level (est)"   : 15
  },
  { "name"          : "Greater Vital Strike",
    "prerequisites" : [ "Improved Vital Strike", "base attack bonus +16" ],
    "description"   : "Deal four times the normal damage on a single attack",
    "level (est)"   : 16
  },
  { "name"          : "Stunning Assault",
    "prerequisites" : [ "Str 13", "Power Attack", "base attack bonus +16" ],
    "description"   : "Trade melee attack bonus to stun opponents",
    "level (est)"   : 16
  },
  { "name"          : "Cockatrice Strike",
    "prerequisites" : [ "Improved Unarmed Strike", "Gorgon’s Fist", "Medusa’s Wrath", "base attack bonus +16" ],
    "description"   : "Turn a target to stone with a critical hit",
    "level (est)"   : 16
  },
  { "name"          : "Counterpunch",
    "prerequisites" : [ "Dex 18", "Combat Reflexes", "Improved Unarmed Strike", "Weapon Focus (unarmed strike)", "base attack bonus +16 or brawler level 12th" ],
    "description"   : "When you fight unarmed and a foe misses with all melee attacks, it provokes attacks of opportunity from you",
    "level (est)"   : 16
  },
  { "name"          : "Cloak and Dagger Tactics",
    "prerequisites" : [ "Int 13", "Cloak and Dagger Style", "Cloak and Dagger Subterfuge", "Combat Expertise", "Improved Dirty TrickAPG", "Vital Strike", "Weapon Focus with the chosen weapon", "base attack bonus +16" ],
    "description"   : "Use free dirty tricks when your opponent is off guard or flanked",
    "level (est)"   : 16
  },
  { "name"          : "Greater Spring Attack",
    "prerequisites" : [ "Dex 17", "Acrobatic Steps", "Dodge", "Improved Spring Attack", "Mobility", "Nimble Moves", "Spring Attack", "base attack bonus +16" ],
    "description"   : "Attack up to three targets instead of one when you use Spring Attack",
    "level (est)"   : 16
  }
]