/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa  = require('ask-sdk-core');

/* Descriptions of stuff */

var descriptions =
[
  {    name        : "Lankhmar",
    source      : "Lankhmar, City of Adventure, pg 14",
    
    description : 
    
    "A narrow, tortuously winding alleyway debouches onto a crowded avenue. Merchants hawk their goods to any who will listen, and to a number who would rather not. Traffic, mostly pedestrian but including an occasional horse or wagon drawn by plodding oxen, fills the road like a babbling stream.\n" +
      
    "You pass among the shops and stalls, dodging the clutching fingers of eager merchants. Strange odors of exotic spices and bizarre incenses fill the air. The noise constantly assaults you at a tumultuous level.\n" +
    
    "You turn a corner, and the clamor of commerce fades into the distance. Now the droning of chants fills the air. Folk in a variety of strange dress beseech the passersby to partake of the delights promised by any number of religions and cults. Indeed, virtually any imaginable god can find worshippers along these crowded blocks.\n" +
    
    "You walk further, and the air changes again, now carrying the scent of murky river water only slightly freshened by a salty breeze. The smells of fish and smoke join to dominate all other scents as you pass among the towering grain silos and crowded warehouses. The cursing of dockworkers, loading and unloading a dozen galleys and river barges, punctuates the background of city sounds.\n" +
    
    "A turn to the north takes you to the luxurious, tree-dappled estates of the wealthy and noble-born. It is possible to forget, for a time, that not far off steams a crowded ghetto as disease-infested and poverty-stricken as any in the world.\n" +
    
    "This is Lankhmar, in all its glory. Rich, poor, religious, debased - all of these and more can be found here.\n" +
    
    "It just depends on where you look."
  },
  
  {    name        : "Character intro",
    source      : "original",
    description : 
    "Lankhmar has never been gentle to you, but it has always been home. Growing up here has left you a little wary; a helping hand often turns into a greedy, grasping one. Moneylenders are all too eager to enslave young folks like you by dangling such enticements to the naive, and using their inability to pay as a way to force them into servitude as allowed by law.\n" +
    
    "Then of course there’s the downright nefarious stuff; being abducted to test new alchemical concoctions on, dragged aboard a departing ship and forced to serve as crew until its return, getting sold to a traveling slavemonger, and of course being fed to the rat god.\n" +
    
    "You’ve managed to avoid such snares (for the most part), and despite being poor, weak, and not terribly bright, managed to secure yourself an apprenticeship with one of the locals. \n" +
    
    "Unfortunately, your master has not been overly impressed by your work thus far, and in addition to the frequent cuffs and angry shouts that are the due of any young apprentice, you are also sporting a fair share of bruises, and find yourself increasingly wondering if you will soon be out on your ass, looking for a new way to get a few coin.\n" +
    
    "(You may choose your apprenticeship. It need not be glamorous. You may also choose your race, sex, and name. Feel free to add more details to your background. More information about the city and its businesses are coming, so you will be able to connect to those if you wish.)"
  },
  
  {    name        : "Lankhmar Districts",
    source      : "original",
    description : 
    "(The city of Lankhmar is defined by its districts, of which there are 11. Following is a brief description of each, along with names of some of its key elements. You may each select a single district which your character will have detailed knowledge of ... except the Citadel District. After you've made your choice, additional details will be provided to you.)\n" +
    
    "The districts of Lankhmar are:\n" +
    " - Park District\n" +
    " - Festival District\n" +
    " - Marsh District\n" +
    " - Plaza District\n" +
    " - Cash District\n" +
    " - Mercantile District\n" +
    " - Tenderloin District\n" +
    " - River District\n" +
    " - Temple District\n" +
    " - Noble District\n" +
    " - Citadel District"
  },

  {    name        : "Park District",
    source      : "Lankhmar, City of Adventure, pg ??",
    description : 
    "Whups, left this one out.\n"
  },

  {    name        : "Marsh District",
    source      : "Lankhmar, City of Adventure, pg 18",
    description : 
    "Without a doubt, this is the smallest district in Lankhmar. It is also the most poverty-stricken. All the buildings are falling apart. A glazed window is considered a luxury here. Great holes open the walls in most buildings. In a few places, even the walls are missing.\n" +
    
    "Centuries ago, this district was attractive and prosperous, with large well-kept buildings. Now, each five- to seven-story building is home to dozens of families. Small shacks and huts have been built onto their sides and roofs. Some people live in the streets, without even a roof over their heads.\n" +
    
    "City guards are rarely seen here. They let the people of the Marsh District settle their own disputes. Gangs of ruffians make the laws, and only a fool would walk through the Marsh District without an armed guard.\n"
  },
  
  {    name        : "Plaza District",
    source      : "Lankhmar, City of Adventure, pg 20",
    description : 
    "One of Lankhmar's most notorious marketplaces is the Plaza of Dark Delights, from which the Plaza District takes its name. By day, the plaza is an exotic market. It is the largest in the city. At night, however, it undergoes a startling transformation.\n" +
    
    "In the moonlight, the Plaza of Dark Delights is a quiet and whispery place. Diffused, muted red light illuminates the faces of patrons who are frequently veiled or otherwise hidden. Nobody runs; the clientele shuffles or scuttles from place to place.\n" +
    
    "The wares sold at night are much more exotic and dangerous than those available during the day. Any form of drink or drug can be purchased here. Artifacts of strange gods can be found, many of which are forbidden within the city. No matter how strange a client's tastes in entertainment, there is always someone in the Plaza of Dark Delights who will accomodate them, for a fee.\n" +
    
    "Anyone venturing here at night has a high chance of being accosted by thieves or pickpockets, for the city guards generally give the plaza a wide berth. Because of the many and varied intoxicants available here, a wide range of strange behavior is tolerated and is no cause for comment or alarm.\n" +
    
    "The plaza is a common meeting ground for the black wizards, or fire magicians, of Lankhmar. These small, huddled groups of black-robed power are avoided by other visitors to the plaza. Magical items, though rare, are perhaps more common in the Plaza of Dark Delights than anywhere else."
  },
  
  {    name        : "Cash District",
    source      : "Lankhmar, City of Adventure, pg 22",
    description : 
    "Some of the wealthiest people in Lankhmar live and work in the Cash District. Bankers, moneylenders, and moneychangers share the streets with fences, loan sharks, and pawnshops. This is the district of shady deals and operators as well as high finance and wealthy patrons."
  },
  
  {    name        : "Mercantile District",
    source      : "Lankhmar, City of Adventure, pg 24",
    description : 
    "Clustered around Craft Street, this district is the center of common trade in Lankhmar. Everyday wares and services can be found here in abundance. It is strategically located next to the River District. Merchants and other visitors to the city have no trouble finding places to spend their coin.\n" +
    
    "The Street of the Thinkers is sandwiched between the Mercantile District and the Temple District, but does not truly belong to either . Not worldly enough for the one, nor holy enough for the other, the scholars and scribes of the Street of the Thinkers inhabit one of the poorer areas of Lankhmar. For simplicity's sake, the south side of this street is included in the Mercantile District, and the north side is covered in the Temple District."
  },
  
  {    name        : "Tenderloin District",
    source      : "Lankhmar, City of Adventure, pg 26",
    description : 
    "One of the most infamous areas of Lankhmar, it contains the dregs of the city. Its residents are not all poor, but most live on the wrong side of the law. Only a fool or a native of the district walks it at night. Even the natives do so only in dire need.\n" +
    
    "Though mostly a residential district, there are quite a few shops. They are usually poorer places than those of the Mercantile District. The Tenderloin is the heart of the black market. It operates openly, selling its wares in the shops."
  },
  
  {    name        : "River District",
    source      : "Lankhmar, City of Adventure, pg 30",
    description : 
    "This is perhaps the busiest district in Lankhmar. The city lives and dies by trading its grain by sea to other cities and nations. The river district is where the ships load and unload, and where the grain is stored in Lankhmar's famous silos.\n" +
    
    "The district is divided into two parts, separated by a finger of land with a tower on it. The north harbor is strictly navy property, where ships are built or repaired. The navy does not dock their ships here. They use the opposite shore of the river for docking or just weigh anchor in the river. Quick loading and unloading can be done here by docking a galley right at the docks.\n" +
    
    "Few merchant ships dock at the city's port because of its small size. Most ships weigh anchor in the river and shuttle crew and cargo to the city. There is a nominal fee for such portage. The ferrying must be done by guilded Lankhmarts.\n" +
    
    "Grain merchants cart their grain in the summer and fall through the Grain Gate, down Grain Street to the grain silos of the river district. For a small fee the grain is stored and sold by the silo keepers."
  },
  
  {    name        : "Temple District",
    source      : "Lankhmar, City of Adventure, pg 32",
    description : 
    "This is the second oldest area of Lankhmar. Only the noble's lands predate it. The temples and religions of Lankhmar have an old and honored history. A new religion entering Lankhmar usually starts out with a small building or stretch of street space near the Marsh Gate. As the church gathers a following, and consequently more money, it moves along the street toward the river.\n" +
    
    "If attendance begins to slack off, a temple may have to start sliding back towards the Marsh Gate. Eventually this can lead to its disappearance, literally falling off the edge of the street and out the gate."
  },
  
  {    name        : "Noble District",
    source      : "Lankhmar, City of Adventure, pg 34",
    description : 
    "It is rare for anyone to move into the noble's district. It is not so uncommon for someone to move out. All the estates there are inherited properties. They belong to the ruling families of Lankhmar.\n" +
    
    "A noble must have money and a title to live in the Noble district. The title is a position granted to the family by the Overlord. Most titles were granted many centuries ago. The head of the family usually inherits the title, with lesser members of the family having related, but lower stature titles.\n" +
    
    "A title means that the noble has certain privileges and few rewponsibilities. A noble is considered to be superior to any ordinary citizen. Therefore, a noble is usually correct in speech and behavior, regardless of what he does. The limiting factor is usually the Overlord, who is considered as far above the Nobles as nobles are above citizens.\n" +
    
    "The noble is allowed to take a hand in running the city. Each Overlord delegates some of his authority to various nobles. For example, a duke might be in charge of the army, or a baron might be responsible for collecting the taxes. The noble usually has the ear of the Overlord, and can recommend courses of action to him.\n" +
    
    "Most nobles own land outside the city. This land is given into their stewardship by the Overlord. They are responsible for its upkeep. Of course, they must also pay its tithes and taxes. The city gets a percentage of everything produced on the land.\n" +
    
    "A noble family can be quite large; all the extended relations may be living on the estate. A family member who falls out of favor may have to leave. Sometimes they may keep their title, but usually they are penniless.\n" +
    
    "On very rare occasions, an act of valor performed by a sufficiently wealthy citizen may prompt the Overlord to grant them a title. With the title comes the right to live in the noble district, and parcel of land outside the city walls. The new noble must purchase their home in the noble district, which may prove difficult.\n" +
    
    "To walk through the noble district without permission is a crime in Lankhmar. Usually the guards are lax about this rule. If the trespasser is making themselves obvious, they chase him off. However, if they are discreet, and have a plausible excuse, they are not bothered.\n" +
    
    "During the night, it is a different matter. The guard is extremely alert. THey maintain a strong vigil against thieves and other trespassers into the district. The Overlord, at the prompting of the nobles, has seen to it that guards that fail live to regret it. Nobles do not like to be victims of the powerful Thieves Guild."
  },
  
  {    name        : "Citadel District",
    source      : "Lankhmar, City of Adventure, pg 36",
    description : 
    "The citadel is usually considered to be the entire walled area north of the Noble District. It contains the North Barracks, the Rainbow Palace, the palace grounds, and the royal docks.\n" +
    
    "The citadel sits on a low hill overlooking the city. It is bordered on two sides by water and cliffs. The cliffs are only 75 feet tall at their highest, however, they are almost totally vertical. The rock is hard and not easily worn down by the sea. It is an excellent place to build a citadel.\n" +
    
    "The great walls around the citadel are the same height and size as the city walls. The curtain walls which surround the docks are only 25 feet high and five feet thick. The gates are stout and well-maintained. Somehow, the Overlord always finds enough money to fund his citadel.\n" +
    
    "The palace grounds are one of the great beauties of Lankhmar. The trees which line the main avenue from the docks to the palace are specially chosen. Each row is a different tree which blossoms in a unique color. In the spring, the effect is that of a rainbow.\n" +
    
    "In the southeast corner of the citadel, just below the docks, is the servants' village. Those servants and slaves who work the grounds and docks live there. Some have been born, lived, and died without even setting foot outside the citadel."
  },
  
  {    name        : "Estate of Duke Danius",
    source      : "Lankhmar, City of Adventure, pg 34",
    description : 
    "The previous duke made the estate into a miniature fortified castle. His obsessive fear of death led Duke Danius to attempt to kill Death himself. The new duke has yet to see fit to bring down the walls.\n" +
    
    "Unlike many of the nobles' estates, the duke's buildings and walls are new. Only parts of the central house are of any great age. The walls and house are in excellent condition, designed and built by the best architects and stone masons of Lankhmar.\n" +
    
    "The old duke had the walls, doors, and windows covered with arcane symbols and nameless dark stains. All of these were to prevent Death from entering his home and taking him. The new duke has painted some of them over. However, he fancies himself a wizard and is studying the inscriptions before completely erasing them.\n"
  },
  
  {    name        : "Estate of Countess Kronia",
    source      : "Lankhmar, City of Adventure, pg 34",
    description : 
    "Nicknamed Countess Kronia of the Seventy-Seven Secret Pockets, she is an amateur thief and quite insane. Apparently it is hereditary, because half of her children are also deranged.\n" +
    
    "The Countess has a unique home in the Noble District. Most of her property is water, in the form of a small lake. In this lake are eight islands, connected by eight bridges. Each island has a building on it devoted to a single purpose. Their functions are kitchen and dining area, sleeping and living quarters, museum and gallery, entertainment (parties and liesure activities), affairs of state, artisans, and servants' quarters.\n" +
    
    "This, of course, only accounts for seven of the eight buildings. As the countess has chosen seven as her personal number, one must always be vacant and not in use. Any servant caught even mentioning the existance of the eighth island and building is punished severely.\n" +
    
    "To make the situation worse, the Countess is continually moving. One day she will race screaming through the estate that the stars, or some other arcane source, have declared that they must switch islands. A new building is now taboo, and the functions of the others have been shuffled. The Countess's parties are of great amusement to her fellow nobles because of this.\n"
  },
  
  {    name        : "Estate of Lord Rannarsh",
    source      : "Lankhmar, City of Adventure, pg 34",
    description : 
    "The nobleman Lord Rannarsh and his family live here. The old lord kept a huge vault in the basement, with a lock to rival that on the great vault of the temple of Votishal.\n" +
    
    "Now that he is dead, his family has let the four-story mansion fall into disrepair. Each has his own pleasures and distractions which keep them from participating as active nobles of Lankhmar. Many nobles have predicted that in another decade, the house of Rannarsh will cease to be a ruling family.\n" +
    "\n"
  },
  
  {    name        : "The Ceremony",
    source      : "original",
    description : 
    "The Countess snatches the tincture from your hand greedily and turns on her heel to make her way to the center of the circle of chanting clerics. They seem unaffected by her abruptness and bluster, swaying rhythmically in their pale robes and pillowed hoods, their soft and soothing tones almost a lullaby. Two acolytes in similar attire step in from opposite ends of the circle, careful not to disturb their elder brethren, and take hold of a pair of handles built into the floor. They each step backward, pulling the floor panels apart and revealing what seems to be a bed of nails. Their task accomplished, they sidle back to the corners of the room. Another acolyte steps up, holding in his hands what is possibly the worst outfit you will ever see. Clearly designed for discomfort in both the physical and the social sense, it covers only enough of a female form to avoid being arrested by the city guards, but what little coverage it provides is done by a course, hairy animal skin turned inside out, in such a way as to guarantee a nasty rash for any dare put it to their flesh. This, he offers reverently to the countess, who, without a thought to her observers, quickly strips herself of all other clothing and wrestles herself into the horrible thing. As if to counter the mesmerizing, relaxing affects of the ongoing serenade, she then proceeds to lay herself flat upon the bed of nails embedded in the floor.\n" +
    
    "While all of this clearly goes well beyond anything you were led to expect upon making tonight‘s delivery, and it is unclear whether your continued presence is desirable, no one has yet dismissed you, nor has an exit been made available. In fact, at the moment, nobody seems to be paying any attention to you whatsoever. While in the presence of one’s betters, of course, this is an ideal state of affairs.\n" +
    
    "Meanwhile, the bizarre behavior of the countess continues; having established a firm presence on the bed of nails, she jerks the crystal plug from the top of the decanter, drops it unceremoniously between the nails beneath her, and proceeds to pour its bluish green, pungent contents into her own open eyes. Having taken part in the preparation of this concoction and with some first hand knowledge of its potency, you are reasonably certain this activity does not produce a pleasant sensation. Nevertheless, she persists. \n" +
    
    "With her mostly bare, hair–suited form supported by a tiny army of floor spikes and her heavily tearing eyes now deeply bloodshot, struggling to breathe normally against the onslaught of fumes, it now appears her preparation for whatever ritual is taking place it is complete. She lays quietly, making neither demands nor judgements of anyone in her presence, perhaps for the first time in many days, while the clerics continue their entrancing melody, somehow managing to make it seem as if all this  might just be a dream. \n" +
    
    "Not wishing to disturb the ceremony and with nowhere else to go, you listen to its pleasant caress until  the familiar surrealness of half-sleep forms a soft fog around you. \n" +
    
    "Roll initiative.\n"
  },
  
  {    name        : "",
    source      : "Lankhmar, City of Adventure, pg xx",
    description : 
    "\n" +
    "\n" +
    "\n"
  },
  
]

var interjections =
{
  abracadabra : 'I can say abracadabra	as, <say-as interpret-as="interjection">abracadabra</say-as>',
  absolutely : 'I can say absolutely	as, <say-as interpret-as="interjection">absolutely</say-as>',
  achoo : 'I can say achoo	as, <say-as interpret-as="interjection">achoo</say-as>',
  ack : 'I can say ack	as, <say-as interpret-as="interjection">ack</say-as>',
  agreed : 'I can say agreed	as, <say-as interpret-as="interjection">agreed</say-as>',
  ah : 'I can say ah	as, <say-as interpret-as="interjection">ah</say-as>',
  aha : 'I can say aha	as, <say-as interpret-as="interjection">aha</say-as>',
  ahem : 'I can say ahem	as, <say-as interpret-as="interjection">ahem</say-as>',
  ahoy : 'I can say ahoy	as, <say-as interpret-as="interjection">ahoy</say-as>',
  alas : 'I can say alas	as, <say-as interpret-as="interjection">alas</say-as>',
  all : 'I can say all righty	as, <say-as interpret-as="interjection">all righty</say-as>',
  aloha : 'I can say aloha	as, <say-as interpret-as="interjection">aloha</say-as>',
  alrighty : 'I can say alrighty	as, <say-as interpret-as="interjection">alrighty</say-as>',
  anyhoo : 'I can say anyhoo	as, <say-as interpret-as="interjection">anyhoo</say-as>',
  anytime : 'I can say anytime	as, <say-as interpret-as="interjection">anytime</say-as>',
  aooga : 'I can say aooga	as, <say-as interpret-as="interjection">aooga</say-as>',
  april : 'I can say april fools\'	as, <say-as interpret-as="interjection">april fools\'</say-as>',
  argh : 'I can say argh	as, <say-as interpret-as="interjection">argh</say-as>',
  arr : 'I can say arr	as, <say-as interpret-as="interjection">arr</say-as>',
  arrivederci : 'I can say arrivederci	as, <say-as interpret-as="interjection">arrivederci</say-as>',
  as : 'I can say as if	as, <say-as interpret-as="interjection">as if</say-as>',
  as : 'I can say as you wish	as, <say-as interpret-as="interjection">as you wish</say-as>',
  attagirl : 'I can say attagirl	as, <say-as interpret-as="interjection">attagirl</say-as>',
  au : 'I can say au revoir	as, <say-as interpret-as="interjection">au revoir</say-as>',
  avast : 'I can say avast ye	as, <say-as interpret-as="interjection">avast ye</say-as>',
  aw : 'I can say aw	as, <say-as interpret-as="interjection">aw</say-as>',
  aw : 'I can say aw man	as, <say-as interpret-as="interjection">aw man</say-as>',
  awesome : 'I can say awesome	as, <say-as interpret-as="interjection">awesome</say-as>',
  aww : 'I can say aww applesauce	as, <say-as interpret-as="interjection">aww applesauce</say-as>',
  aww : 'I can say aww yeah	as, <say-as interpret-as="interjection">aww yeah</say-as>',
  ay : 'I can say ay	as, <say-as interpret-as="interjection">ay</say-as>',
  aye : 'I can say aye	as, <say-as interpret-as="interjection">aye</say-as>',
  baa : 'I can say baa	as, <say-as interpret-as="interjection">baa</say-as>',
  bada : 'I can say bada bing bada boom	as, <say-as interpret-as="interjection">bada bing bada boom</say-as>',
  bah : 'I can say bah humbug	as, <say-as interpret-as="interjection">bah humbug</say-as>',
  bam : 'I can say bam	as, <say-as interpret-as="interjection">bam</say-as>',
  bang : 'I can say bang	as, <say-as interpret-as="interjection">bang</say-as>',
  batter : 'I can say batter up	as, <say-as interpret-as="interjection">batter up</say-as>',
  bazinga : 'I can say bazinga	as, <say-as interpret-as="interjection">bazinga</say-as>',
  beep : 'I can say beep beep	as, <say-as interpret-as="interjection">beep beep</say-as>',
  behold : 'I can say behold	as, <say-as interpret-as="interjection">behold</say-as>',
  bing : 'I can say bing	as, <say-as interpret-as="interjection">bing</say-as>',
  bingo : 'I can say bingo	as, <say-as interpret-as="interjection">bingo</say-as>',
  blah : 'I can say blah	as, <say-as interpret-as="interjection">blah</say-as>',
  blarg : 'I can say blarg	as, <say-as interpret-as="interjection">blarg</say-as>',
  blast : 'I can say blast	as, <say-as interpret-as="interjection">blast</say-as>',
  blimey : 'I can say blimey	as, <say-as interpret-as="interjection">blimey</say-as>',
  boing : 'I can say boing	as, <say-as interpret-as="interjection">boing</say-as>',
  bon : 'I can say bon appetit	as, <say-as interpret-as="interjection">bon appetit</say-as>',
  bon : 'I can say bon voyage	as, <say-as interpret-as="interjection">bon voyage</say-as>',
  bonjour : 'I can say bonjour	as, <say-as interpret-as="interjection">bonjour</say-as>',
  boo : 'I can say boo	as, <say-as interpret-as="interjection">boo</say-as>',
  boo : 'I can say boo hoo	as, <say-as interpret-as="interjection">boo hoo</say-as>',
  boom : 'I can say boom	as, <say-as interpret-as="interjection">boom</say-as>',
  booya : 'I can say booya	as, <say-as interpret-as="interjection">booya</say-as>',
  bravo : 'I can say bravo	as, <say-as interpret-as="interjection">bravo</say-as>',
  brrr : 'I can say brrr	as, <say-as interpret-as="interjection">brrr</say-as>',
  buh : 'I can say buh bye	as, <say-as interpret-as="interjection">buh bye</say-as>',
  bummer : 'I can say bummer	as, <say-as interpret-as="interjection">bummer</say-as>',
  caw : 'I can say caw	as, <say-as interpret-as="interjection">caw</say-as>',
  cha : 'I can say cha ching	as, <say-as interpret-as="interjection">cha ching</say-as>',
  checkmate : 'I can say checkmate	as, <say-as interpret-as="interjection">checkmate</say-as>',
  cheer : 'I can say cheer up	as, <say-as interpret-as="interjection">cheer up</say-as>',
  cheerio : 'I can say cheerio	as, <say-as interpret-as="interjection">cheerio</say-as>',
  cheers : 'I can say cheers	as, <say-as interpret-as="interjection">cheers</say-as>',
  chirp : 'I can say chirp	as, <say-as interpret-as="interjection">chirp</say-as>',
  choo : 'I can say choo choo	as, <say-as interpret-as="interjection">choo choo</say-as>',
  clank : 'I can say clank	as, <say-as interpret-as="interjection">clank</say-as>',
  click : 'I can say click clack	as, <say-as interpret-as="interjection">click clack</say-as>',
  cock : 'I can say cock a doodle doo	as, <say-as interpret-as="interjection">cock a doodle doo</say-as>',
  coo : 'I can say coo	as, <say-as interpret-as="interjection">coo</say-as>',
  cowabunga : 'I can say cowabunga	as, <say-as interpret-as="interjection">cowabunga</say-as>',
  d : 'I can say d\'oh	as, <say-as interpret-as="interjection">d\'oh</say-as>',
  dang : 'I can say dang	as, <say-as interpret-as="interjection">dang</say-as>',
  darn : 'I can say darn	as, <say-as interpret-as="interjection">darn</say-as>',
  ding : 'I can say ding	as, <say-as interpret-as="interjection">ding</say-as>',
  ding : 'I can say ding ding ding	as, <say-as interpret-as="interjection">ding ding ding</say-as>',
  ding : 'I can say ding dong	as, <say-as interpret-as="interjection">ding dong</say-as>',
  ditto : 'I can say ditto	as, <say-as interpret-as="interjection">ditto</say-as>',
  dot : 'I can say dot dot dot	as, <say-as interpret-as="interjection">dot dot dot</say-as>',
  drat : 'I can say drat	as, <say-as interpret-as="interjection">drat</say-as>',
  dude : 'I can say dude	as, <say-as interpret-as="interjection">dude</say-as>',
  duh : 'I can say duh	as, <say-as interpret-as="interjection">duh</say-as>',
  dum : 'I can say dum	as, <say-as interpret-as="interjection">dum</say-as>',
  dun : 'I can say dun dun dun	as, <say-as interpret-as="interjection">dun dun dun</say-as>',
  dynomite : 'I can say dynomite	as, <say-as interpret-as="interjection">dynomite</say-as>',
  eek : 'I can say eek	as, <say-as interpret-as="interjection">eek</say-as>',
  eep : 'I can say eep	as, <say-as interpret-as="interjection">eep</say-as>',
  eggselent : 'I can say eggselent	as, <say-as interpret-as="interjection">eggselent</say-as>',
  eh : 'I can say eh?	as, <say-as interpret-as="interjection">eh?</say-as>',
  ehn : 'I can say ehn	as, <say-as interpret-as="interjection">ehn</say-as>',
  en : 'I can say en gard	as, <say-as interpret-as="interjection">en gard</say-as>',
  encore : 'I can say encore	as, <say-as interpret-as="interjection">encore</say-as>',
  er : 'I can say er	as, <say-as interpret-as="interjection">er</say-as>',
  eureka : 'I can say eureka	as, <say-as interpret-as="interjection">eureka</say-as>',
  excellent : 'I can say excellent	as, <say-as interpret-as="interjection">excellent</say-as>',
  fancy : 'I can say fancy that	as, <say-as interpret-as="interjection">fancy that</say-as>',
  fiddlesticks : 'I can say fiddlesticks	as, <say-as interpret-as="interjection">fiddlesticks</say-as>',
  gadzooks : 'I can say gadzooks	as, <say-as interpret-as="interjection">gadzooks</say-as>',
  gee : 'I can say gee	as, <say-as interpret-as="interjection">gee</say-as>',
  gee : 'I can say gee whiz	as, <say-as interpret-as="interjection">gee whiz</say-as>',
  gee : 'I can say gee willikers	as, <say-as interpret-as="interjection">gee willikers</say-as>',
  geronimo : 'I can say geronimo	as, <say-as interpret-as="interjection">geronimo</say-as>',
  giddy : 'I can say giddy up	as, <say-as interpret-as="interjection">giddy up</say-as>',
  giddyap : 'I can say giddyap	as, <say-as interpret-as="interjection">giddyap</say-as>',
  golly : 'I can say golly	as, <say-as interpret-as="interjection">golly</say-as>',
  good : 'I can say good	as, <say-as interpret-as="interjection">good</say-as>',
  good : 'I can say good afternoon	as, <say-as interpret-as="interjection">good afternoon</say-as>',
  good : 'I can say good call	as, <say-as interpret-as="interjection">good call</say-as>',
  good : 'I can say good evening	as, <say-as interpret-as="interjection">good evening</say-as>',
  good : 'I can say good grief	as, <say-as interpret-as="interjection">good grief</say-as>',
  good : 'I can say good luck	as, <say-as interpret-as="interjection">good luck</say-as>',
  good : 'I can say good morning	as, <say-as interpret-as="interjection">good morning</say-as>',
  good : 'I can say good night	as, <say-as interpret-as="interjection">good night</say-as>',
  good : 'I can say good riddance	as, <say-as interpret-as="interjection">good riddance</say-as>',
  goodbye : 'I can say goodbye	as, <say-as interpret-as="interjection">goodbye</say-as>',
  gosh : 'I can say gosh	as, <say-as interpret-as="interjection">gosh</say-as>',
  gotcha : 'I can say gotcha	as, <say-as interpret-as="interjection">gotcha</say-as>',
  gracious : 'I can say gracious me	as, <say-as interpret-as="interjection">gracious me</say-as>',
  great : 'I can say great	as, <say-as interpret-as="interjection">great</say-as>',
  great : 'I can say great scott	as, <say-as interpret-as="interjection">great scott</say-as>',
  guess : 'I can say guess what	as, <say-as interpret-as="interjection">guess what</say-as>',
  ha : 'I can say ha	as, <say-as interpret-as="interjection">ha</say-as>',
  ha : 'I can say ha ha	as, <say-as interpret-as="interjection">ha ha</say-as>',
  hardy : 'I can say hardy har har	as, <say-as interpret-as="interjection">hardy har har</say-as>',
  he : 'I can say he shoots he scores	as, <say-as interpret-as="interjection">he shoots he scores</say-as>',
  heads : 'I can say heads up	as, <say-as interpret-as="interjection">heads up</say-as>',
  hear : 'I can say hear hear	as, <say-as interpret-as="interjection">hear hear</say-as>',
  heave : 'I can say heave ho	as, <say-as interpret-as="interjection">heave ho</say-as>',
  hee : 'I can say hee-yah	as, <say-as interpret-as="interjection">hee-yah</say-as>',
  hey : 'I can say hey now	as, <say-as interpret-as="interjection">hey now</say-as>',
  hi : 'I can say hi-yah	as, <say-as interpret-as="interjection">hi-yah</say-as>',
  high : 'I can say high five	as, <say-as interpret-as="interjection">high five</say-as>',
  hike : 'I can say hike	as, <say-as interpret-as="interjection">hike</say-as>',
  hip : 'I can say hip hip hooray	as, <say-as interpret-as="interjection">hip hip hooray</say-as>',
  hiss : 'I can say hiss	as, <say-as interpret-as="interjection">hiss</say-as>',
  hiya : 'I can say hiya	as, <say-as interpret-as="interjection">hiya</say-as>',
  hmm : 'I can say hmm	as, <say-as interpret-as="interjection">hmm</say-as>',
  holy : 'I can say holy smoke	as, <say-as interpret-as="interjection">holy smoke</say-as>',
  honk : 'I can say honk	as, <say-as interpret-as="interjection">honk</say-as>',
  howdy : 'I can say howdy	as, <say-as interpret-as="interjection">howdy</say-as>',
  huh : 'I can say huh	as, <say-as interpret-as="interjection">huh</say-as>',
  hurrah : 'I can say hurrah	as, <say-as interpret-as="interjection">hurrah</say-as>',
  hurray : 'I can say hurray	as, <say-as interpret-as="interjection">hurray</say-as>',
  huzzah : 'I can say huzzah	as, <say-as interpret-as="interjection">huzzah</say-as>',
  i : 'I can say i\'m totally kidding	as, <say-as interpret-as="interjection">i\'m totally kidding</say-as>',
  inconceivable : 'I can say inconceivable	as, <say-as interpret-as="interjection">inconceivable</say-as>',
  indeed : 'I can say indeed	as, <say-as interpret-as="interjection">indeed</say-as>',
  interesting : 'I can say interesting	as, <say-as interpret-as="interjection">interesting</say-as>',
  jeepers : 'I can say jeepers creepers	as, <say-as interpret-as="interjection">jeepers creepers</say-as>',
  jeez : 'I can say jeez	as, <say-as interpret-as="interjection">jeez</say-as>',
  jeez : 'I can say jeez louise	as, <say-as interpret-as="interjection">jeez louise</say-as>',
  jiminy : 'I can say jiminy cricket	as, <say-as interpret-as="interjection">jiminy cricket</say-as>',
  jinx : 'I can say jinx	as, <say-as interpret-as="interjection">jinx</say-as>',
  just : 'I can say just joshin\'	as, <say-as interpret-as="interjection">just joshin\'</say-as>',
  just : 'I can say just kidding	as, <say-as interpret-as="interjection">just kidding</say-as>',
  kablam : 'I can say kablam	as, <say-as interpret-as="interjection">kablam</say-as>',
  kaboom : 'I can say kaboom	as, <say-as interpret-as="interjection">kaboom</say-as>',
  kaching : 'I can say kaching	as, <say-as interpret-as="interjection">kaching</say-as>',
  kapow : 'I can say kapow	as, <say-as interpret-as="interjection">kapow</say-as>',
  katchow : 'I can say katchow	as, <say-as interpret-as="interjection">katchow</say-as>',
  kazaam : 'I can say kazaam	as, <say-as interpret-as="interjection">kazaam</say-as>',
  kerbam : 'I can say kerbam	as, <say-as interpret-as="interjection">kerbam</say-as>',
  kerboom : 'I can say kerboom	as, <say-as interpret-as="interjection">kerboom</say-as>',
  kerching : 'I can say kerching	as, <say-as interpret-as="interjection">kerching</say-as>',
  kerchoo : 'I can say kerchoo	as, <say-as interpret-as="interjection">kerchoo</say-as>',
  kerflop : 'I can say kerflop	as, <say-as interpret-as="interjection">kerflop</say-as>',
  kerplop : 'I can say kerplop	as, <say-as interpret-as="interjection">kerplop</say-as>',
  kerplunk : 'I can say kerplunk	as, <say-as interpret-as="interjection">kerplunk</say-as>',
  kerpow : 'I can say kerpow	as, <say-as interpret-as="interjection">kerpow</say-as>',
  kersplat : 'I can say kersplat	as, <say-as interpret-as="interjection">kersplat</say-as>',
  kerthump : 'I can say kerthump	as, <say-as interpret-as="interjection">kerthump</say-as>',
  kidding : 'I can say kidding	as, <say-as interpret-as="interjection">kidding</say-as>',
  knock : 'I can say knock knock	as, <say-as interpret-as="interjection">knock knock</say-as>',
  le : 'I can say le sigh	as, <say-as interpret-as="interjection">le sigh</say-as>',
  legendary : 'I can say legendary	as, <say-as interpret-as="interjection">legendary</say-as>',
  look : 'I can say look out	as, <say-as interpret-as="interjection">look out</say-as>',
  magnificent : 'I can say magnificent	as, <say-as interpret-as="interjection">magnificent</say-as>',
  mamma : 'I can say mamma mia	as, <say-as interpret-as="interjection">mamma mia</say-as>',
  man : 'I can say man overboard	as, <say-as interpret-as="interjection">man overboard</say-as>',
  mazel : 'I can say mazel tov	as, <say-as interpret-as="interjection">mazel tov</say-as>',
  meow : 'I can say meow	as, <say-as interpret-as="interjection">meow</say-as>',
  merci : 'I can say merci	as, <say-as interpret-as="interjection">merci</say-as>',
  mm : 'I can say mm hmm	as, <say-as interpret-as="interjection">mm hmm</say-as>',
  moo : 'I can say moo	as, <say-as interpret-as="interjection">moo</say-as>',
  my : 'I can say my bad	as, <say-as interpret-as="interjection">my bad</say-as>',
  my : 'I can say my goodness	as, <say-as interpret-as="interjection">my goodness</say-as>',
  nanu : 'I can say nanu nanu	as, <say-as interpret-as="interjection">nanu nanu</say-as>',
  neener : 'I can say neener neener	as, <say-as interpret-as="interjection">neener neener</say-as>',
  never : 'I can say never	as, <say-as interpret-as="interjection">never</say-as>',
  no : 'I can say no	as, <say-as interpret-as="interjection">no</say-as>',
  no : 'I can say no way	as, <say-as interpret-as="interjection">no way</say-as>',
  now : 'I can say now now	as, <say-as interpret-as="interjection">now now</say-as>',
  nuh : 'I can say nuh uh	as, <say-as interpret-as="interjection">nuh uh</say-as>',
  oh : 'I can say oh	as, <say-as interpret-as="interjection">oh</say-as>',
  oh : 'I can say oh behave	as, <say-as interpret-as="interjection">oh behave</say-as>',
  oh : 'I can say oh boy	as, <say-as interpret-as="interjection">oh boy</say-as>',
  oh : 'I can say oh brother	as, <say-as interpret-as="interjection">oh brother</say-as>',
  oh : 'I can say oh dear	as, <say-as interpret-as="interjection">oh dear</say-as>',
  oh : 'I can say oh my	as, <say-as interpret-as="interjection">oh my</say-as>',
  oh : 'I can say oh snap	as, <say-as interpret-as="interjection">oh snap</say-as>',
  oh : 'I can say oh well	as, <say-as interpret-as="interjection">oh well</say-as>',
  oink : 'I can say oink	as, <say-as interpret-as="interjection">oink</say-as>',
  okey : 'I can say okey dokey	as, <say-as interpret-as="interjection">okey dokey</say-as>',
  oof : 'I can say oof	as, <say-as interpret-as="interjection">oof</say-as>',
  ooh : 'I can say ooh	as, <say-as interpret-as="interjection">ooh</say-as>',
  ooh : 'I can say ooh la la	as, <say-as interpret-as="interjection">ooh la la</say-as>',
  oops : 'I can say oops	as, <say-as interpret-as="interjection">oops</say-as>',
  open : 'I can say open sesame	as, <say-as interpret-as="interjection">open sesame</say-as>',
  ouch : 'I can say ouch	as, <say-as interpret-as="interjection">ouch</say-as>',
  ow : 'I can say ow	as, <say-as interpret-as="interjection">ow</say-as>',
  oy : 'I can say oy	as, <say-as interpret-as="interjection">oy</say-as>',
  pew : 'I can say pew pew	as, <say-as interpret-as="interjection">pew pew</say-as>',
  phew : 'I can say phew	as, <say-as interpret-as="interjection">phew</say-as>',
  phooey : 'I can say phooey	as, <say-as interpret-as="interjection">phooey</say-as>',
  ping : 'I can say ping	as, <say-as interpret-as="interjection">ping</say-as>',
  play : 'I can say play ball	as, <say-as interpret-as="interjection">play ball</say-as>',
  plop : 'I can say plop	as, <say-as interpret-as="interjection">plop</say-as>',
  poof : 'I can say poof	as, <say-as interpret-as="interjection">poof</say-as>',
  pop : 'I can say pop	as, <say-as interpret-as="interjection">pop</say-as>',
  pow : 'I can say pow	as, <say-as interpret-as="interjection">pow</say-as>',
  puh : 'I can say puh-leeze	as, <say-as interpret-as="interjection">puh-leeze</say-as>',
  quack : 'I can say quack	as, <say-as interpret-as="interjection">quack</say-as>',
  rats : 'I can say rats	as, <say-as interpret-as="interjection">rats</say-as>',
  read : 'I can say read \'em and weep	as, <say-as interpret-as="interjection">read \'em and weep</say-as>',
  really : 'I can say really	as, <say-as interpret-as="interjection">really</say-as>',
  ribbit : 'I can say ribbit	as, <say-as interpret-as="interjection">ribbit</say-as>',
  righto : 'I can say righto	as, <say-as interpret-as="interjection">righto</say-as>',
  roger : 'I can say roger	as, <say-as interpret-as="interjection">roger</say-as>',
  ruh : 'I can say ruh roh	as, <say-as interpret-as="interjection">ruh roh</say-as>',
  schwing : 'I can say schwing	as, <say-as interpret-as="interjection">schwing</say-as>',
  she : 'I can say she shoots she scores	as, <say-as interpret-as="interjection">she shoots she scores</say-as>',
  sheesh : 'I can say sheesh	as, <say-as interpret-as="interjection">sheesh</say-as>',
  shh : 'I can say shh	as, <say-as interpret-as="interjection">shh</say-as>',
  shiver : 'I can say shiver me timbers	as, <say-as interpret-as="interjection">shiver me timbers</say-as>',
  shoot : 'I can say shoot	as, <say-as interpret-as="interjection">shoot</say-as>',
  shucks : 'I can say shucks	as, <say-as interpret-as="interjection">shucks</say-as>',
  shush : 'I can say shush	as, <say-as interpret-as="interjection">shush</say-as>',
  splash : 'I can say splash	as, <say-as interpret-as="interjection">splash</say-as>',
  splendid : 'I can say splendid	as, <say-as interpret-as="interjection">splendid</say-as>',
  spoiler : 'I can say spoiler alert	as, <say-as interpret-as="interjection">spoiler alert</say-as>',
  squee : 'I can say squee	as, <say-as interpret-as="interjection">squee</say-as>',
  stunning : 'I can say stunning	as, <say-as interpret-as="interjection">stunning</say-as>',
  suit : 'I can say suit up	as, <say-as interpret-as="interjection">suit up</say-as>',
  swish : 'I can say swish	as, <say-as interpret-as="interjection">swish</say-as>',
  swoosh : 'I can say swoosh	as, <say-as interpret-as="interjection">swoosh</say-as>',
  ta : 'I can say ta da	as, <say-as interpret-as="interjection">ta da</say-as>',
  ta : 'I can say ta ta	as, <say-as interpret-as="interjection">ta ta</say-as>',
  tee : 'I can say tee hee	as, <say-as interpret-as="interjection">tee hee</say-as>',
  thanks : 'I can say thanks for asking	as, <say-as interpret-as="interjection">thanks for asking</say-as>',
  there : 'I can say there there	as, <say-as interpret-as="interjection">there there</say-as>',
  thump : 'I can say thump	as, <say-as interpret-as="interjection">thump</say-as>',
  tick : 'I can say tick tick tick	as, <say-as interpret-as="interjection">tick tick tick</say-as>',
  tick : 'I can say tick-tock	as, <say-as interpret-as="interjection">tick-tock</say-as>',
  totally : 'I can say totally kidding	as, <say-as interpret-as="interjection">totally kidding</say-as>',
  totally : 'I can say totally kidding of course	as, <say-as interpret-as="interjection">totally kidding of course</say-as>',
  totes : 'I can say totes	as, <say-as interpret-as="interjection">totes</say-as>',
  touche : 'I can say touche	as, <say-as interpret-as="interjection">touche</say-as>',
  tsk : 'I can say tsk tsk	as, <say-as interpret-as="interjection">tsk tsk</say-as>',
  tweet : 'I can say tweet	as, <say-as interpret-as="interjection">tweet</say-as>',
  ugh : 'I can say ugh	as, <say-as interpret-as="interjection">ugh</say-as>',
  uh : 'I can say uh	as, <say-as interpret-as="interjection">uh</say-as>',
  uh : 'I can say uh huh	as, <say-as interpret-as="interjection">uh huh</say-as>',
  uh : 'I can say uh oh	as, <say-as interpret-as="interjection">uh oh</say-as>',
  uh : 'I can say uh uh	as, <say-as interpret-as="interjection">uh uh</say-as>',
  um : 'I can say um	as, <say-as interpret-as="interjection">um</say-as>',
  va : 'I can say va va voom	as, <say-as interpret-as="interjection">va va voom</say-as>',
  very : 'I can say very	as, <say-as interpret-as="interjection">very</say-as>',
  voila : 'I can say voila	as, <say-as interpret-as="interjection">voila</say-as>',
  vroom : 'I can say vroom	as, <say-as interpret-as="interjection">vroom</say-as>',
  wah : 'I can say wah wah	as, <say-as interpret-as="interjection">wah wah</say-as>',
  wahoo : 'I can say wahoo	as, <say-as interpret-as="interjection">wahoo</say-as>',
  watch : 'I can say watch out	as, <say-as interpret-as="interjection">watch out</say-as>',
  way : 'I can say way to go	as, <say-as interpret-as="interjection">way to go</say-as>',
  well : 'I can say well	as, <say-as interpret-as="interjection">well</say-as>',
  well : 'I can say well done	as, <say-as interpret-as="interjection">well done</say-as>',
  well : 'I can say well well	as, <say-as interpret-as="interjection">well well</say-as>',
  wham : 'I can say wham	as, <say-as interpret-as="interjection">wham</say-as>',
  whammo : 'I can say whammo	as, <say-as interpret-as="interjection">whammo</say-as>',
  whee : 'I can say whee	as, <say-as interpret-as="interjection">whee</say-as>',
  whew : 'I can say whew	as, <say-as interpret-as="interjection">whew</say-as>',
  whoa : 'I can say whoa	as, <say-as interpret-as="interjection">whoa</say-as>',
  whoo : 'I can say whoo ah	as, <say-as interpret-as="interjection">whoo ah</say-as>',
  whoops : 'I can say whoops	as, <say-as interpret-as="interjection">whoops</say-as>',
  whoops : 'I can say whoops a daisy	as, <say-as interpret-as="interjection">whoops a daisy</say-as>',
  whoosh : 'I can say whoosh	as, <say-as interpret-as="interjection">whoosh</say-as>',
  woo : 'I can say woo	as, <say-as interpret-as="interjection">woo</say-as>',
  woo : 'I can say woo hoo	as, <say-as interpret-as="interjection">woo hoo</say-as>',
  woof : 'I can say woof	as, <say-as interpret-as="interjection">woof</say-as>',
  wow : 'I can say wow	as, <say-as interpret-as="interjection">wow</say-as>',
  wowza : 'I can say wowza	as, <say-as interpret-as="interjection">wowza</say-as>',
  wowzer : 'I can say wowzer	as, <say-as interpret-as="interjection">wowzer</say-as>',
  yabba : 'I can say yabba dabba doo	as, <say-as interpret-as="interjection">yabba dabba doo</say-as>',
  yadda : 'I can say yadda yadda yadda	as, <say-as interpret-as="interjection">yadda yadda yadda</say-as>',
  yahoo : 'I can say yahoo	as, <say-as interpret-as="interjection">yahoo</say-as>',
  yay : 'I can say yay	as, <say-as interpret-as="interjection">yay</say-as>',
  yeah : 'I can say yeah	as, <say-as interpret-as="interjection">yeah</say-as>',
  yeehaw : 'I can say yeehaw	as, <say-as interpret-as="interjection">yeehaw</say-as>',
  yes : 'I can say yes	as, <say-as interpret-as="interjection">yes</say-as>',
  yikes : 'I can say yikes	as, <say-as interpret-as="interjection">yikes</say-as>',
  yippee : 'I can say yippee	as, <say-as interpret-as="interjection">yippee</say-as>',
  yo : 'I can say yo	as, <say-as interpret-as="interjection">yo</say-as>',
  yoink : 'I can say yoink	as, <say-as interpret-as="interjection">yoink</say-as>',
  yoo : 'I can say yoo hoo	as, <say-as interpret-as="interjection">yoo hoo</say-as>',
  you : 'I can say you bet	as, <say-as interpret-as="interjection">you bet</say-as>',
  you : 'I can say you go girl	as, <say-as interpret-as="interjection">you go girl</say-as>',
  you : 'I can say you rang?	as, <say-as interpret-as="interjection">you rang?</say-as>',
  yowza : 'I can say yowza	as, <say-as interpret-as="interjection">yowza</say-as>',
  yowzer : 'I can say yowzer	as, <say-as interpret-as="interjection">yowzer</say-as>',
  yuck : 'I can say yuck	as, <say-as interpret-as="interjection">yuck</say-as>',
  yum : 'I can say yum	as, <say-as interpret-as="interjection">yum</say-as>',
  zap : 'I can say zap	as, <say-as interpret-as="interjection">zap</say-as>',
  zing : 'I can say zing	as, <say-as interpret-as="interjection">zing</say-as>',
  zoinks : 'I can say zoinks	as, <say-as interpret-as="interjection">zoinks</say-as>',
  zoom : 'I can say zoom	as, <say-as interpret-as="interjection">zoom</say-as>',
  zowie : 'I can say zowie	as, <say-as interpret-as="interjection">zowie</say-as>'
};

var intro_Ivy      = '<voice name = "Ivy"      >My name is Ivy.</voice>';
var intro_Joanna   = '<voice name = "Joanna"   >My name is Joanna.</voice>';
var intro_Kendra   = '<voice name = "Kendra"   >My name is Kendra.</voice>';
var intro_Kimberly = '<voice name = "Kimberly" >My name is Kimberly.</voice>';
var intro_Salli    = '<voice name = "Salli"    >My name is Salli.</voice>';
var intro_Joey     = '<voice name = "Joey"     >My name is Joey.</voice>';
var intro_Justin   = '<voice name = "Justin"   >My name is Justin.</voice>';
var intro_Kevin    = '<voice name = "Kevin"    >My name is Kevin.</voice>';
var intro_Matthew  = '<voice name = "Matthew"  >My name is Matthew.</voice>';

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

var is_admin = false;

const handler_admin_console = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'admin_console';
    },
    handle(handlerInput) {
      
        is_admin = true;
        
        const speakOutput = '<audio src="soundbank://soundlibrary/computers/beeps_tones/beeps_tones_10"/>';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const handler_admin_change_voice = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'admin_change_voice';
    },
    handle(handlerInput) {
      
        //is_admin = true;
        
        const speakOutput = 'Available voices, please sound off. ' + 
          intro_Ivy +
          intro_Joanna +
          intro_Kendra +
          intro_Kimberly +
          intro_Salli +
          intro_Joey +
          intro_Justin +
          intro_Matthew;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// const speakOutput = launch + voice_open + intro_Ivy + description[2].description + voice_close;

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        handler_admin_console,
        handler_admin_change_voice,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();