// Room Descriptions:

var room_types = {};

room_types.Amphitheater = 
{
  type        : 'Amphitheater',
  description : "This is an oval or round room filled with seats around a central open area. The general idea is that spectators surround the central area, which is often used for combat.",
  contents    : "arch, armorial bearings, drapery, flag, relief, dirt/mud, dome (ceiling), brazier, coals, torches, scratches, coins, earthy odor, blood, fingers, toes, legs, arms, curtains, manacles, chains, depressions, balcony, tapestry, trash/refuse"
};

room_types.Antechamber = 
{
  type        : 'Antechamber',
  description : "This is a room or chamber that serves as a waiting room or entrance to a larger room or apartment.",
  contents    : "arch, basket, cabinet, chest, pottery, shadow box, clock (mantle, grandfather, wall), drapery, mirror, bench, chair, table, cushion, desk, screen, shelves, quilt, shrine, lamps, flowers, ashtray, wall or shelf decorations (see “Things” under comprehensive list of things in rooms)"
};

room_types.Arena = 
{
  type        : 'Arena',
  description : "This is a central stage, ring, or something similar used for entertainment, often surrounded by seats. Historically this area was sandy and was a place of conflict.",
  contents    : "arch, armorial bearings, drapery, flag, relief, sand, dome (ceiling), brazier, coals, torches, scratches, coins, earthy odor, blood, fingers, toes, legs, arms, curtains, manacles, chains, depressions, balcony, tapestry, trash/refuse"
};

room_types.Armory = 
{
  type        : 'Armory',
  description : "A place where weapons, war equipment and armor are stored. It may also refer to a headquarters or center for drill (practice) of a military unit, or more explicitly a place where arms and armor are manufactured.",
  contents    : "shelves, racks, weapons/armor (all), mat, practice targets, forge, hammer, tongs, furnace, anvil"
};

room_types.Arsenal = 
{
  type        : 'Arsenal',
  description : "A place for the storage and collection of weapons, arms, military equipment and munitions for military service.",
  contents    : "shelves, racks, weapons/armor (all)"
};

room_types.Assemblage = 
{
  type        : 'Assemblage',
  description : "This room can either be a place where people may assemble or gather, or it can be a room where a system of components are assembled together for a specific or particular purpose.",
  contents    : "podium, lectern, benches, carpet, desks, tables, chairs, clock (wall), tapestries or arras, dias, stadium seating, lamps"
};

room_types.Audience_Hall = 
{
  type        : 'Audience Hall',
  description : "This is a room for holding formal interviews or hearings.",
  contents    : "clock, arras, flags, map, relief, painting/fresco, benches, chair, lectern, podium, lamp, candles, books"
};

room_types.Aviary = 
{
  type        : 'Aviary',
  description : "This room or chamber is a place where many birds are kept.",
  contents    : "cages (bird), sand, sundials, birdbath, bags, barrels, bins, basin, bowl, decanter, chest, apron, gloves, smock, dome, font, fountain, chair, cupboard, cabinet, mat, wall basin, workbench, grain, candles, lamp, acrid odors, feathers, birds"
};

room_types.Banquet = 
{
  type        : 'Banquet',
  description : "This room or chamber is designed to accommodate banquets and dining.",
  contents    : "chalice, goblet, vase, flowers, table, bench, chairs, tablecloth, fork, spoon, knife, platters, plates, china, arras, alcohol, food, candles, chandelier, brazier, torches, tapestry, mug, pitcher, tablecloth"
};

room_types.Barn = 
{
  type        : 'Barn',
  description : "A room or building for the storage of animals and livestock as well as their feed.",
  contents    : "cages, bestiaries, dias, pedestal, walking paths, benches, statues"
};

room_types.Barracks = 
{
  type        : 'Barracks',
  description : "A room or structure used to house personnel, traditionally military structure. Due to the unaesthetic nature of these buildings, they are often used to refer to any structure that is large and bleak.",
  contents    : "bed (bunk/single), blanket, trunk/foot locker/sea chest, weapons/armor"
};

room_types.Bathroom = 
{
  type        : 'Bathroom',
  description : "This is a room or chamber designed for taking a bath, shower, or toilet.",
  contents    : "toilet, wall basin, bath, leaves / corncob / sponge on stick in salt water, paper, rope, perfume, cloth"
};

room_types.Bedroom = 
{
  type        : 'Bedroom',
  description : "This is a room or chamber used for the purpose of rest and sleep.",
  contents    : "altar, bed (all), basket, cabinet, chest of drawers, foot locker, hamper, pill box, powder box, vase, clothing (all), closet, furs, blanket, comforter, quilt, tapestry, carpet, rugs, armoire, bookshelves, end table, pillow, stool, lamp, candles"
};

room_types.Bestiary = 
{
  type        : 'Bestiary',
  description : "This room or chamber is a place where a group of magical beasts or creatures are kept.",
  contents    : "cages (animal), butchery, fish, meat, sand, sundials, birdbath, bags, barrels, bins, basin, bowl, decanter, chest, apron, gloves, smock, dome, font, fountain, chair, cupboard, cabinet, mat, wall basin, workbench, grain, candles, lamp, acrid odors, feathers, animals"
};

room_types.Cage = 
{
  type        : 'Cage',
  description : "This room is an enclosure formed of wires, bars, or the like, for displaying birds, animals, or people.",
  contents    : "bench, privy, straw, cot, stool, waste, stale or urine odor, blood, skeletons, manacles, wall cressets, trash/refuse, jug, plate, fork, spoon, file, barred window"
};

room_types.Cell = 
{
  type        : 'Cell',
  description : "This can refer to any small room, but most often refers to a grouping of small rooms.",
  contents    : "pallet, bed, desk, quill, paper, scrolls, books, bench, privy, straw, cot, stool, waste, stale or urine odor, blood, skeletons, manacles, wall cressets, trash/refuse, jug, plate, fork, spoon, file, barred window" 
};

room_types.Chantry = 
{
  type        : 'Chantry',
  description : "This is a place for the singing, mass, or reverence for the souls of founders. '(i.e. ‘chant’ry)' It can refer to a chapel endowed for this purpose. A more general usage is a church used for minor services.",
  contents    : "Altar, arch, drapery, gilt, inlay, relief (all), dias, dome, font, fresco, mosaic, painting, pews, podium, idol, magic, candelabra, lamp, torches, pedestal, pillar, column, tapestry, offertory container, reliquary, offertory dish, oil, perfume, alcove, glass window, incense burner, alcohol, holy symbols"
};

room_types.Chapel = 
{
  type        : 'Chapel',
  description : "This is a room used for private worship. It is often a separate dedicated part of a church and may be used for special services.",
  contents    : "Altar, arch, drapery, gilt, inlay, relief (all), dias, dome, font, fresco, mosaic, painting, pews, podium, idol, magic, candelabra, lamp, torches, pedestal, pillar, column, tapestry, offertory container, reliquary, offertory dish, oil, perfume, alcove, glass window, incense burner, alcohol, holy symbols, pallet, bed, desk, quill, paper, scrolls, books, bench, privy, straw, cot, stool, jug, plate, fork, spoon"
};

room_types.Cistern_Room = 
{
  type        : 'Cistern Room',
  description : "This is a room or chamber containing a tank, reservoir, or container which stores or holds some kind of liquid. It can also be a room with access to an underground reservoir for water.",
  contents    : "Dirt/mud, bang/slam, hissing, bubbling, pipes, protrusions, trash/refuse, wrench, puddle, trickle"
};

room_types.Classroom = 
{
  type        : 'Classroom',
  description : "A room or chamber where classes are held.",
  contents    : "chalkboard, sticks, chairs, desks, chalk, books, bookshelves"
};

room_types.Closet = 
{
  type        : 'Closet',
  description : "This room or chamber is characterized by being small, often enclosed and recessed within a larger room used for clothing, or the storage of food or goods. Sometimes it refers to any small private room often used for study or prayer. It is literally a small enclosure.",
  contents    : "bin, hamper, chest, chest of drawers, iron bar, hangers, clothing, tools (any), things (any)"
};

room_types.Combat_Pit = 
{
  type        : 'Combat Pit',
  description : "This is a lowered area often with a dirt or sand floor where fighting takes place. A combat pit is more likely to have animal or monster opponents than an Arena.",
  contents    : "clay/dirt/mud/sand, brazier, torches, scratches, coins, blood, limbs, bones, skeletons"
};

room_types.Confessional = 
{
  type        : 'Confessional',
  description : "A place designed for the hearing of confessions by a priest.",
  contents    : "bench, screen, closet, cushion, drapery"
};

room_types.Conjuring_Room = 
{
  type        : 'Conjuring Room',
  description : "A room or chamber devoted to the purpose of summoning and binding extra or intradimensional items or forces.",
  contents    : "chalk, runes, summoning runes, brazier, dome, magic"
};

room_types.Courtroom = 
{
  type        : 'Courtroom',
  description : "In this room sessions of legal proceedings occur.",
  contents    : "gavel, clock, arras, flags, map, relief, painting/fresco, benches, chair, lectern, podium, lamp, candles, books"
};

room_types.Crematorium = 
{
  type        : 'Crematorium',
  description : "A place where bodies are cremated (i.e. burned to ashes)",
  contents    : "fireplace, furnace, fire poker, broom, urns, shovel, coals"
};

room_types.Crypt_Human = 
{
  type        : 'Crypt, Human',
  description : "This is a chamber or vault that is underground, often beneath a church used as a burial place, or a place for secret meetings.",
  contents    : "coffin, casket, urn, things (any), corpse, skeleton"
};

room_types.Crypt_Animal = 
{
  type        : 'Crypt, Animal',
  description : "As above, but for animals.",
  contents    : "coffin, casket, urn, things (any), corpse, skeleton"
};

room_types.Den = 
{
  type        : 'Den',
  description : "This room or chamber is designed to provide a quiet, comfortable and informal atmosphere for conversation, reading, writing and other quiet activities. This room is often secluded.",
  contents    : "basket, bin, box, cabinet, chest, chest of drawers, foot locker, lock box, music box, tinder box, trunk, vase, clock (any), cloak, cowl, coat, boots, cap, hood, purse, scarf, mirror, armchair, armoire, blanket, bookshelves, chair, coat-rack, couch, cushion, desk, divan, end table, fireplace, mat, sofa, shrine, table, alcohol, coca, coffee, nuts, candles, lamp, books, hourglass, coins, musical instruments, pets, plants, tapestries, carpets, rugs, paintings, ashtray, cards, comforter, cover, humidor, ice chest, feather duster, file, finger-pick, fire poker, shovel, brush, broom, game pieces, mug, curios, masks, weapons/armor (display), statues, statuary, figurines, oil, trophies, dice, drinking jack/horn"
};

room_types.Dining_Room = 
{
  type        : 'Dining Room',
  description : "This is a room or chamber in which people take their formal or primary meal of the day.",
  contents    : "chalice, goblet, cup, jar, jug, pans, chairs, tables, alcohol, food, lamp, chandeliers, candles, decanter"
};

room_types.Divination_Chamber = 
{
  type        : 'Divination Chamber',
  description : "A room or chamber devoted to the purpose of augury, divination, prophecy, soothsaying, aeromancy (air/sky), tasseography (tea leaves), astrology, and haruspication (inspecting the entrails of animals) as well as many dozens of other methods of predicting the future.",
  contents    : "somewhat dependent on the method. arch, drapery, gilt, inlay, relief (all), dias, dome, font, fresco, mosaic, painting, podium, idol, magic, candelabra, lamp, torches, pedestal, pillar, column, tapestry, oil, perfume, alcove, glass window, incense burner, alcohol"
};

room_types.Dressing_room = 
{
  type        : 'Dressing room',
  description : "This is a literal room or chamber for getting dressed. It is often found where clothes are changed often, backstage at a theater, etc.",
  contents    : "(stool, clothes (all), desk, mirror, pin, clothespin, clothing rack, chest of drawers, closet, chair, lamp, candles, perfume, oils, make-up"
};

room_types.Embalming_Chamber = 
{
  type        : 'Embalming Chamber',
  description : "A room set aside for the embalming of bodies. This process prevents decomposition to assist in the viewing of the body.",
  contents    : "(table, embalming machine, chemicals, tools, hook"
};

room_types.Forge = 
{
  type        : 'Forge',
  description : "A room or workshop that contains a special fireplace, hearth, or furnace where metal is heated before shaping.",
  contents    : "forge, furnace, anvil, hammer, tongs, font"
};

room_types.Foyer = 
{
  type        : 'Foyer',
  description : "This is a lobby, vestibule or entrance chamber to a house, apartment, theater, or hotel. It is a gateway between the interior and exterior of a building. It often has a fireplace.",
  contents    : "arch, basket, cabinet, chest, pottery, shadow box, clock (mantle, grandfather, wall), drapery, mirror, bench, chair, table, cushion, desk, screen, shelves, quilt, shrine, lamps, flowers, ashtray, wall or shelf decorations (see “Things” under Comprehensive List of Things in Rooms)"
};

room_types.Gallery = 
{
  type        : 'Gallery',
  description : "This refers to a variety of rooms and chambers with similar purposes. It is often a raised area with a sloping floor or stairs to accommodate either spectators or an exhibit. It can also be a series of rooms dedicated to the display of art objects or statuary. Corridors of architectural importance are also considered galleries, and finally it may be a raised balcony passage or platform running along an exterior wall of a building.",
  contents    : "box (display), arras, curtains, drapery, dias, dome, fresco, mosaic, painting, idol, braziers, candles, chandelier, lamp, pedestal, pillar, column, plant, alcove, balcony, catwalk, tapestry"
};

room_types.Game_Room = 
{
  type        : 'Game Room',
  description : "This room or chamber is used for recreation and games. It often is a place for noisy activity and games played on tables or sand tables. It is sometimes referred to as a rumpus room.",
  contents    : "bags, boxes, baskets, cabinets, chest, chest of drawers, trunk, curtains, arras, fresco, mosaic, painting, bench, bookshelves, chair, cupboard, cushion, table, candles, lamp, manuals / books, carpets, rugs, balls, beads, blocks, chalk, dolls, doll houses, figurines, marbles, mask, mobile, puppets, ribbon, sand, toys, toy soldiers, trophies, cards, game pieces"
};

room_types.Garage = 
{
  type        : 'Garage',
  description : "An indoor area for the storage of vehicles or transport equipment. The root word means to provide shelter.",
  contents    : "vehicle (any), things/tools (any)"
};

room_types.Great_Hall = 
{
  type        : 'Great Hall',
  description : "This is a principal hall in a mansion or castle. It is often used for dining and entertainment.",
  contents    : "downdraft, basket, chalice, goblet, jar, jug, pans, arras, armorial bearings, flag, benches, chairs, tables, throne, alcohol, food, braziers, chandelier, torches, smoky odor, bones, dung, vomit, rats, plants, balcony, glass window, tapestry, trash/refuse, silverware, plates, platters, tablecloth"
};

room_types.Guardroom = 
{
  type        : 'Guardroom',
  description : "A room used either by military personnel when on duty or a place where military prisoners are kept.",
  contents    : "chair, table, spittoon, cards, dice, alcohol, weapons/armor (all)"
};

room_types.Gymnasium = 
{
  type        : 'Gymnasium',
  description : "A room used for exercise, indoor sports, or physical education, originally from the Greeks who derived it from their word for training in the nude.",
  contents    : "Towel, balls, nets, bars, targets"
};

room_types.Hall = 
{
  type        : 'Hall',
  description : "This is a corridor or passage in a building. It can also colloquially refer to a large building or room for some purpose, most often residence or learning.",
  contents    : "clock (any), arras, flags, maps, relief (any), painting, fresco, mosaic, benches, chair, torches, breeze/downdraft, chill, banners, carpet, rug"
};

room_types.Harem = 
{
  type        : 'Harem',
  description : "This is a room or chamber reserved for women only. It is where they reside, acting as quarters specifically for women. They are often wives and concubines.",
  contents    : "bed (all), basket, cabinet, chalice, chest of drawers, closet, hope chest, jewelry box, music box, vase, wineskin, apron, blouse, coif, corset, dress, frock, garter, girdle, gorget, gown, hose, petticoats, robe, scarf, shawl, shift, slippers, toga, tunic, veil, curtains, drapery, furs, hides, fresco, mosaic, painting, armchair, couch, divan, end table, pillow, mattress, quilt, braziers, candles, chandelier, lamps, books, musical instruments (all), pets, pedestals, plants, flowers, alcove, tapestries, banners, carpets and rugs, comforter, cover, cushion, dye, fake jewelry, headdress, ivory, jewelry, mask, oil, perfume, pipe, ribbon, shears, scissors, yarn, thread, cloth, thimble, needle, pincushion, knitting needle"
};

room_types.Inscription_Chamber = 
{
  type        : 'Inscription Chamber',
  description : "A chamber underground where many people have written upon the walls.",
  contents    : "writing on walls"
};

room_types.Interrogation_Room = 
{
  type        : 'Interrogation Room',
  description : "A room used for the purpose of questioning prisoners, suspects, witnesses and victims. May contain the ability for others to see into the room that cannot be observed, and also, often a way for others to see out into an area that cannot be observed to identify people.",
  contents    : "chair, lamp, table, restraint/torture (any)"
};

room_types.Kennel = 
{
  type        : 'Kennel',
  description : "This room or chamber is a place for sheltering animals kept as pets. These rooms focus on the breeding, raising, and training of the animals",
  contents    : "cages (animal), butchery, fish, meat, sand, sundials, birdbath, bags, barrels, bins, basin, bowl, decanter, chest, apron, gloves, smock, dome, font, fountain, chair, cupboard, cabinet, mat, wall basin, workbench, grain, candles, lamp, acrid odors, feathers, animals"
};

room_types.Kitchen = 
{
  type        : 'Kitchen',
  description : "A place used to prepare food.",
  contents    : "Pots, pans, silverware, cabinets, oven, stove"
};

room_types.Laboratory = 
{
  type        : 'Laboratory',
  description : "A place equipped to conduct any sort of rigorous investigation or observation.",
  contents    : "amblic, beaker, bottle, bowl, cauldron, furnace, decanter, ewer, flask, font, fountain, tables, desk, chair, torches, candles, lamps, astrolabe, alembic, balance & weights, callipers"
};

room_types.Lair = 
{
  type        : 'Lair',
  description : "This room or chamber is the resting place of a wild animal. It is often concealed or secret.",
  contents    : "nest (any), dirt/mud/filth, lake, waste, scratches, stale or urine odor, plants, fungus, trash/refuse, river, stream organic (any)"
};

room_types.Larder_Pantry = 
{
  type        : 'Larder / Pantry',
  description : "The larder is a room where food is stored. It is traditionally “a place for meats”. A pantry is a small room or cupboard which contains provisions, as well as cooking utensils and dishes are kept. It is traditionally a “bread room”, or the office or room of a servant who has charge of food.",
  contents    : "shelves, food (any), broom, dust pan"
};

room_types.Library = 
{
  type        : 'Library',
  description : "A room, chamber, or building set apart to contain books, manuscripts, publications, periodicals, and other material for reading, viewing, listening, study, or references.",
  contents    : "bookshelves, chairs, couches, ladders, books, tomes, manuals, scrolls"
};

room_types.Lounge = 
{
  type        : 'Lounge',
  description : "This room or chamber is a comfortable place to rest. It is designed for sitting, smoking or reading. It often has privies nearby.",
  contents    : "basket, arras, armorial bearings, drapery, fur, hides, fireplace, fresco, mosaic, painting, food (any), waste, torches, lamps, candles, brazier, couch, divan, armchair"
};

room_types.Map_Room = 
{
  type        : 'Map Room',
  description : "A room or chamber for the storage, creation, or display of maps.",
  contents    : "table, chairs, knife, quill, ink pot, maps"
};

room_types.Mass_Grave = 
{
  type        : 'Mass Grave',
  description : "This is a grave containing multiple corpses.",
  contents    : "dirt/filth, corpses, clothing (all), rotted things (any)"
};

room_types.Maze = 
{
  type        : 'Maze',
  description : "This is a system of passageways and chambers designed to be confusing due to their interconnections. This room is also referred to as a labyrinth which originally meant ‘exhausting labor’. The purpose is to disorient, bewilder, and delude those who travel through it.",
  contents    : "this may literally contain any item, though bones, monsters, and refuse/trash are most common"
};

room_types.Meditation_Chamber = 
{
  type        : 'Meditation Chamber',
  description : "A space set aside for the purposes of meditation and solitary spiritual pursuits."
};

room_types.Meeting_Chamber = 
{
  type        : 'Meeting Chamber',
  description : "A space devoted to meeting.",
  contents    : "arch, basket, cabinet, chest, pottery, shadow box, clock (mantle, grandfather, wall), drapery, mirror, bench, chair, table, cushion, desk, screen, shelves, quilt, shrine, lamps, flowers, ashtray, wall or shelf decorations (see “Things” under comprehensive list of things in rooms)"
};

room_types.Mess_Hall = 
{
  type        : 'Mess Hall',
  description : "A room where a group eats with regular frequency.",
  contents    : "cups, jars, jugs, pans, benches, tables, alcohol, food, lamp, torches, decanters"
};

room_types.Mine = 
{
  type        : 'Mine',
  description : "This is a subterranean passage either where minerals are retrieved, or an extension under an enemy’s works or position to either access or destroy their position.",
  contents    : "pick axe, support, ore vein, chest, bag, sack, dust/dirt/grime, fungus"
};

room_types.Monk_Cell = 
{
  type        : 'Monk Cell',
  description : "A small sparse chamber used for rest and habitation for the spiritual disciple.",
  contents    : "pallet, bed, desk, quill, paper, scrolls, books, bench, privy, straw, cot, stool, jug, plate, fork, spoon"
};

room_types.Morgue = 
{
  type        : 'Morgue',
  description : "A place devoted to the storage of bodies, or, less frequently, the place where old records, information, and objects are kept for unexpected but possible future use.",
  contents    : "coffin, casket, urn, things (any), corpse, skeleton"
};

room_types.Museum = 
{
  type        : 'Museum',
  description : "This is a room or chamber where important objects of permanent value are kept. It is literally a place devoted to learning or the arts, a place sacred to the muses.",
  contents    : "arras, armorial bearings, dias, fresco, mosaic, painting, benches, idol, lamps, box, statue, pedestal, column, tapestry"
};

room_types.Music_Room = 
{
  type        : 'Music Room',
  description : "This chamber (literally) is often pertaining to the performance of chamber music. The room is often vaulted for improved acoustics.",
  contents    : "arch, bowl, dias, dome, podium, chairs, benches, pews, stadium seating, lamps, braziers, torches, metronome, money (in bowl), alcove, balcony, musical instruments (any)"
};

room_types.Observatory = 
{
  type        : 'Observatory',
  description : "A room devoted to making observations of natural phenomena. This can include astronomical or meteorological phenomena.",
  contents    : "amblic, beaker, bottle, bowl, cauldron, furnace, decanter, ewer, flask, font, fountain, tables, desk, chair, torches, candles, lamps, astrolabe, alembic, balance & weights, callipers"
};

room_types.Office = 
{
  type        : 'Office',
  description : "A room where the business of a professional person is conducted.",
  contents    : "arch, basket, cabinet, chest, pottery, shadow box, clock (mantle, grandfather, wall), drapery, mirror, bench, chair, table, cushion, desk, screen, shelves, quilt, shrine, lamps, flowers, ashtray, wall or shelf decorations (see “Things” under comprehensive list of things in rooms)"
};

room_types.Oubliette = 
{
  type        : 'Oubliette',
  description : "This is a room or chamber that is a secret dungeon with an opening or trap door only located in the ceiling.",
  contents    : "hazy, dust, cold/damp breeze, filth, waste, scratches, dank odor, blood, skeleton, chains, cressets, hooks, ropes, manacles"
};

room_types.Padded_Room = 
{
  type        : 'Padded Room',
  description : "This is a room or chamber with cushions lining the walls. Also sometimes known as a rubber room.",
  contents    : "walls, padding"
};

room_types.Pen = 
{
  type        : 'Pen',
  description : "This room is often a small enclosure for animals, or occasionally an enclosure created for the purpose of confinement or safekeeping.",
  contents    : "filth, mud/dirt, trough, food/waste, animals"
};

room_types.Planning_Room = 
{
  type        : 'Planning Room',
  description : "This is a room or chamber designed for forming drawings, sketches, and a scheme of action that will form a detailed program intended to be followed.",
  contents    : "trunk, clock (tall, wall), flags, gilt, inlay, map, dias, chairs, table, sand table, torches, lamps"
};

room_types.Pool_Water_Room = 
{
  type        : 'Pool / Water Room',
  description : "A room used for the storage, transport, cleansing, reclamation, or enjoyment of water.",
  contents    : "fountain/lake/pool/font/well/bath/river/stream, tile, towel"
};

room_types.Prison = 
{
  type        : 'Prison',
  description : "This is a room or chamber designed for the purpose of confining people awaiting trial or sentencing.",
  contents    : "pallet, bed, desk, quill, paper, scrolls, books, bench, privy, straw, cot, stool, waste, stale or urine odor, blood, skeletons, manacles, wall cressets, trash/refuse, jug, plate, fork, spoon, file, barred window"
};

room_types.Privy = 
{
  type        : 'Privy',
  description : "This is a room or chamber designed for the elimination of human waste.",
  contents    : "toliet, leaves/sponge on stick/wool/corncob/rope/cloth"
};

room_types.Reception_Chamber = 
{
  type        : 'Reception Chamber',
  description : "this is a room for receiving clients, patients, or visitors for the purposes of official business.",
  contents    : "arch, basket, cabinet, chest, pottery, shadow box, clock (mantle, grandfather, wall), drapery, mirror, bench, chair, table, cushion, desk, screen, shelves, quilt, shrine, lamps, flowers, ashtray, wall or shelf decorations (see “Things” under comprehensive list of things in rooms"
};

room_types.Robing_Room = 
{
  type        : 'Robing Room',
  description : "A room or chamber where official robes of office are donned.",
  contents    : "stool, clothes (all), desk, mirror, pin, clothespin, clothing rack, chest of drawers, closet, chair, lamp, candles, perfume, oils, make-up"
};

room_types.Salon = 
{
  type        : 'Salon',
  description : "This room or chamber is a drawing or reception room. It can also be a place designed for the display of art.",
  contents    : "arras, armorial bearings, dias, fresco, mosaic, painting, benches, idol, lamps, box, statue, pedestal, column, tapestry arch, basket, cabinet, chest, pottery, shadow box, clock (mantle, grandfather, wall), drapery, mirror, bench, chair, table, cushion, desk, screen, shelves, quilt, shrine, lamps, flowers, ashtray, wall or shelf decorations (see “Things” under comprehensive list of things in rooms)"
};

room_types.Scriptorium = 
{
  type        : 'Scriptorium',
  description : "Any room or chamber where manuscripts are stored, read, or copied.",
  contents    : "pallet, desk, shelves, bookshelves, ink, ink pot, blotter, quill, paper, scrolls, books, bench"
};

room_types.Seraglio = 
{
  type        : 'Seraglio',
  description : "This is another word meaning harem, with a word root meaning ‘animal cage’ or from the original Latin, meaning bolt/door bar. The word also has Turkish associations with palace. Often with connotations of restricted freedom in relation to the women.",
  contents    : "padlocks, chains, manicles, stocks, pillory, rope, bed (all), basket, cabinet, chalice, chest of drawers, closet, hope chest, jewelry box, music box, vase, wineskin, apron, blouse, coif, corset, dress, frock, garter, girdle, gorget, gown, hose, petticoats, robe, scarf, shawl, shift, slippers, toga, tunic, veil, curtains, drapery, furs, hides, fresco, mosaic, painting, armchair, couch, divan, end table, pillow, mattress, quilt, braziers, candles, chandelier, lamps, books, musical instruments (all), pets, pedestals, plants, flowers, alcove, tapestries, banners, carpets and rugs, comforter, cover, cushion, dye, fake jewelry, headdress, ivory, jewelry, mask, oil, perfume, pipe, ribbon, shears, scissors, yarn, thread, cloth, thimble, needle, pincushion, knitting needle"
};

room_types.Servants_Dorm = 
{
  type        : 'Servants Dorm',
  description : "This is a living space for servants. They may vary wildly in quality.",
  contents    : "altar, bed (all), basket, cabinet, chest of drawers, foot locker, hamper, pill box, powder box, vase, clothing (all), closet, furs, blanket, comforter, quilt, tapestry, carpet, rugs, armoire, bookshelves, end table, pillow, stool, lamp, candles"
};

room_types.Shrine = 
{
  type        : 'Shrine',
  description : "A structure or building of some sort, often stately or sumptuous in design, character, or architecture, designed for the purpose of either being a consecrated place of a saint, holy person, or deity, or for literally enclosing the remains or relics of the same. Often the place of religious veneration and target of a pilgrimage. Sometimes referred to as a reliquary.",
  contents    : "Altar, arch, drapery, gilt, inlay, relief (all), dias, dome, font, fresco, mosaic, painting, pews, podium, idol, magic, candelabra, lamp, torches, pedestal, pillar, column, tapestry, offertory container, reliquary, offertory dish, oil, perfume, alcove, glass window, incense burner, alcohol, holy symbols, remains"
};

room_types.Smokehouse = 
{
  type        : 'Smokehouse',
  description : "A place where fish, meat, etc. are cured with smoke.",
  contents    : "shelves, food (any), broom, dust pan, hooks, stick, hangers, brazier, coal, fire, smoky"
};

room_types.Solar = 
{
  type        : 'Solar',
  description : "This is any private or upper chamber in a house or domicile.",
  contents    : "altar, bed (all), basket, cabinet, chest of drawers, foot locker, hamper, pill box, powder box, vase, clothing (all), closet, furs, blanket, comforter, quilt, tapestry, carpet, rugs, armoire, bookshelves, end table, pillow, stool, lamp, candles"
};

room_types.Stable = 
{
  type        : 'Stable',
  description : "A space devoted to the lodging and feeding of horse, cattle and other service animals. It usually contains stalls.",
  contents    : "cages (animal), butchery, fish, meat, sand, sundials, birdbath, bags, barrels, bins, basin, bowl, decanter, chest, apron, gloves, smock, dome, font, fountain, chair, cupboard, cabinet, mat, wall basin, workbench, grain, candles, lamp, acrid odors, feathers, animals"
};

room_types.Statuary = 
{
  type        : 'Statuary',
  description : "This is a room or chamber with a group or collection of statues.",
  contents    : "dias, pillar, column, pedestal, statue, fresco, mosaic, painting, bas relief, torches, brazier"
};

room_types.Stockade = 
{
  type        : 'Stockade',
  description : "This is a room or enclosure that is a prison for military personnel. This can refer to a small space surrounded by posts or stakes.",
  contents    : "bench, privy, cot, stool, jug, plate, spoon, fork, canteen"
};

room_types.Storage = 
{
  type        : 'Storage',
  description : "This is self-explanatory. It is a room used for storage.",
  contents    : "bookshelves, shelves, boxes, cans, jars, sea chest, trunk, chest of drawers, stool, candle, lamp"
};

room_types.Study = 
{
  type        : 'Study',
  description : "A room set aside for any sort of private activity, reading, study, writing and similar.",
  contents    : "pallet, chair, cushion, bench, divan, desk, shelves, bookshelves, quill, paper, scrolls, books, bench"
};

room_types.Summoning_Room = 
{
  type        : 'Summoning Room',
  description : "A room or chamber devoted to the purpose of summoning and binding extra or intradimensional beings.",
  contents    : "chalk, runes, summoning runes, brazier, dome, magic, podium, tome"
};

room_types.Tannery = 
{
  type        : 'Tannery',
  description : "A space where skins and hides are tanned.",
  contents    : "skins, furs, animals, corpses (animal), knives, racks, rags, bucket"
};

room_types.Temple = 
{
  type        : 'Temple',
  description : "Any room, chamber, place or structure used for the purpose of service or worship to a deity. It also refers to any large or pretentious building devoted to public use. Traditionally a space set aside (demarcated) by an augur for taking auspices.",
  contents    : "Altar, arch, drapery, gilt, inlay, relief (all), dias, dome, font, fresco, mosaic, painting, pews, podium, idol, magic, candelabra, lamp, torches, pedestal, pillar, column, tapestry, offertory container, reliquary, offertory dish, oil, perfume, alcove, glass window, incense burner, alcohol, holy symbols"
};

room_types.Throne_Room = 
{
  type        : 'Throne Room',
  description : "A room or chamber that contains a throne, used by a king or sovereign. Also a colloquialism for a room that is the location of the actual power or authority of a business or government.",
  contents    : "pedestal, pillar, column, dias, downdraft, basket, chalice, goblet, jar, jug, pans, arras, armorial bearings, flag, benches, chairs, tables, throne, alcohol, food, braziers, chandelier, torches, smoky odor, bones, dung, vomit, rats, plants, balcony, glass window, tapestry, trash/refuse, silverware, plates, platters, tablecloth"
};

room_types.Tomb = 
{
  type        : 'Tomb',
  description : "Simply put, a grave. Any excavation in earth for the purpose of corpse burial. Can also refer to a mausoleum, or chamber used for burial. Often this space commemorates the dead person. Broadly refers to any sepulchral structure (any structure having to do with burial, tombs, storage of the dead, etc.).",
  contents    : "coffin, casket, urn, things (any), corpse, skeleton"
};

room_types.Torture_Chamber = 
{
  type        : 'Torture Chamber',
  description : "This is a room or chamber in which torture is performed.",
  contents    : "“restraints/torture” (any), bucket, stool, brush, broom, weapons, torches, coals, brazier"
};

room_types.Training_Room = 
{
  type        : 'Training Room',
  description : "Self-explanatory. A room used for training.",
  contents    : "weapons/armor (any), mat, training targets"
};

room_types.Treasury = 
{
  type        : 'Treasury',
  description : "A place where funds and money are kept.",
  contents    : "arch, shelves, locks, padlocks, treasure"
};

room_types.Trophy_Room = 
{
  type        : 'Trophy Room',
  description : "This is a room or chamber designated for the display of trophies.",
  contents    : "dias, pedestal, box (glass), shelf, lamp, trophies"
};

room_types.Waiting_Room = 
{
  type        : 'Waiting Room',
  description : "A room used explicitly for the purpose of waiting.",
  contents    : "(bench, chair, end table, books, cushion, lamps, torches, vase with flowers, wall decorations (see “Things” under Comprehensive List of Things in Rooms)"
};

room_types.Wardrobe = 
{
  type        : 'Wardrobe',
  description : "This is a room or place in which to keep costumes or clothing.",
  contents    : "stool, clothes (all), desk, mirror, pin, clothespin, clothing rack, chest of drawers, closet, chair, lamp, candles, perfume, oils, make-up"
};

room_types.Well_Room = 
{
  type        : 'Well Room',
  description : "This is a room where a spring or a well is located, usually referring to a structure built over a natural mineral spring or well.",
  contents    : "well, rope, crank, bucket, iron bar, clay/dirt/mud"
};

room_types.Work_Pit_Workshop = 
{
  type        : 'Work Pit / Workshop',
  description : "a room or grouping of rooms in which work is conducted. Often refers to some sort of mechanical work.",
  contents    : "tables, chairs, lamps, torches, tools (any)"
};

room_types.Vault = 
{
  type        : 'Vault',
  description : "Traditionally this referred to a room with a vaulted or arched ceiling. Since these are very stable structures, this type of architecture was often used for below ground settings, which both tended to be secure and used for the storage of valuable goods. This is a room or compartment reserved for the safekeeping of valuables. It is often underground and lined with metal.",
  contents    : "arch, shelves, locks, padlocks, treasure"
};

room_types.Vestiary = 
{
  type        : 'Vestiary',
  description : "A room for storing clothes or dressing in.",
  contents    : "stool, clothes (all), desk, mirror, pin, clothespin, clothing rack, chest of drawers, closet, chair, lamp, candles, perfume, oils, make-up"
};

room_types.Vestibule = 
{
  type        : 'Vestibule',
  description : "This is a space separating the interior and exterior of a building. It’s often a chamber, hallway or passage. It can also be used to mean any enclosed space forming an approach, bridge, or entrance to any other section or interior space.",
  contents    : "arch, basket, cabinet, chest, pottery, shadow box, clock (mantle, grandfather, wall), drapery, mirror, bench, chair, table, cushion, desk, screen, shelves, quilt, shrine, lamps, flowers, ashtray, wall or shelf decorations (see “Things” under comprehensive list of things in rooms)"
};

room_types.Zoo = 
{
  type        : 'Zoo',
  description : "This room is a park or garden-like area where animals are kept in cages or large enclosures.",
  contents    : "cages, bestiaries, dias, pedestal, walking paths, benches, statues"
}