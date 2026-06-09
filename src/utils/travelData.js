// ============================================================
//  YatraVista — Comprehensive India State-wise Travel Data
//  All 28 States + 8 UTs | 100+ Destinations | INR Pricing
// ============================================================

export const INDIA_STATES = [
  { id: 'rajasthan',        label: 'Rajasthan',             region: 'north',  emoji: '🏰' },
  { id: 'himachal',         label: 'Himachal Pradesh',      region: 'north',  emoji: '🏔️' },
  { id: 'uttarakhand',      label: 'Uttarakhand',           region: 'north',  emoji: '🕉️' },
  { id: 'punjab',           label: 'Punjab',                region: 'north',  emoji: '🌾' },
  { id: 'jammu',            label: 'J&K / Ladakh',         region: 'north',  emoji: '🏕️' },
  { id: 'up',               label: 'Uttar Pradesh',         region: 'north',  emoji: '🕌' },
  { id: 'haryana',          label: 'Haryana',               region: 'north',  emoji: '🦅' },
  { id: 'delhi',            label: 'Delhi',                 region: 'north',  emoji: '🌆' },
  { id: 'gujarat',          label: 'Gujarat',               region: 'west',   emoji: '🦁' },
  { id: 'maharashtra',      label: 'Maharashtra',           region: 'west',   emoji: '🌊' },
  { id: 'goa',              label: 'Goa',                   region: 'west',   emoji: '🏖️' },
  { id: 'mp',               label: 'Madhya Pradesh',        region: 'central',emoji: '🐯' },
  { id: 'chhattisgarh',     label: 'Chhattisgarh',          region: 'central',emoji: '🌿' },
  { id: 'kerala',           label: 'Kerala',                region: 'south',  emoji: '🌴' },
  { id: 'karnataka',        label: 'Karnataka',             region: 'south',  emoji: '☕' },
  { id: 'tamilnadu',        label: 'Tamil Nadu',            region: 'south',  emoji: '🛕' },
  { id: 'andhra',           label: 'Andhra Pradesh',        region: 'south',  emoji: '⛩️' },
  { id: 'telangana',        label: 'Telangana',             region: 'south',  emoji: '🏯' },
  { id: 'odisha',           label: 'Odisha',                region: 'east',   emoji: '🌊' },
  { id: 'westbengal',       label: 'West Bengal',           region: 'east',   emoji: '🐅' },
  { id: 'bihar',            label: 'Bihar',                 region: 'east',   emoji: '☸️' },
  { id: 'jharkhand',        label: 'Jharkhand',             region: 'east',   emoji: '🌲' },
  { id: 'sikkim',           label: 'Sikkim',                region: 'northeast', emoji: '🏔️' },
  { id: 'assam',            label: 'Assam',                 region: 'northeast', emoji: '🦏' },
  { id: 'meghalaya',        label: 'Meghalaya',             region: 'northeast', emoji: '☁️' },
  { id: 'arunachal',        label: 'Arunachal Pradesh',     region: 'northeast', emoji: '🌄' },
  { id: 'manipur',          label: 'Manipur',               region: 'northeast', emoji: '💃' },
  { id: 'nagaland',         label: 'Nagaland',              region: 'northeast', emoji: '🎭' },
  { id: 'andaman',          label: 'Andaman & Nicobar',     region: 'island', emoji: '🐠' },
  { id: 'lakshadweep',      label: 'Lakshadweep',           region: 'island', emoji: '🏝️' },
];

export const REGION_LABELS = {
  north: '🧭 North India',
  west: '🌅 West India',
  central: '🌳 Central India',
  south: '🌞 South India',
  east: '🌄 East India',
  northeast: '🌿 North-East India',
  island: '🏝️ Island Territories',
};

// ── Type tags ──────────────────────────────────────────────────────────────
export const TRAVEL_TYPES = [
  { id: 'all',        label: 'All Places' },
  { id: 'heritage',   label: '🏛️ Heritage' },
  { id: 'adventure',  label: '🧗 Adventure' },
  { id: 'beach',      label: '🏖️ Beaches' },
  { id: 'wildlife',   label: '🐯 Wildlife' },
  { id: 'spiritual',  label: '🕉️ Spiritual' },
  { id: 'hill',       label: '🏔️ Hill Stations' },
  { id: 'luxury',     label: '👑 Luxury' },
];

// ── Main destinations database ─────────────────────────────────────────────
export const ALL_DESTINATIONS = [

  // ══════════ RAJASTHAN ══════════
  {
    id: 'raj-1', state: 'rajasthan', stateName: 'Rajasthan', type: 'heritage',
    title: 'Jaipur — Pink City', nearbyPlaces: ['Amber Fort', 'Hawa Mahal', 'City Palace'],
    description: 'The Pink City dazzles with magnificent forts, vibrant bazaars, and royal palaces. A UNESCO World Heritage City.',
    distance: '270 km from Delhi', hotelName: 'Samode Haveli', price: 6800, rating: 4.9, season: 'Oct – Mar',
    highlights: ['Amber Fort', 'Hawa Mahal', 'Jantar Mantar', 'Jal Mahal'],
  },
  {
    id: 'raj-2', state: 'rajasthan', stateName: 'Rajasthan', type: 'heritage',
    title: 'Udaipur — City of Lakes', nearbyPlaces: ['Pichola Lake', 'Sajjangarh Palace', 'Nathdwara'],
    description: 'Shimmering lakes, white marble palaces, and romantic sunsets define this "Venice of the East".',
    distance: '650 km from Delhi', hotelName: 'The Leela Palace Udaipur', price: 15000, rating: 4.9, season: 'Oct – Mar',
    highlights: ['Lake Palace', 'City Palace', 'Sajjangarh Fort', 'Jagdish Temple'],
  },
  {
    id: 'raj-3', state: 'rajasthan', stateName: 'Rajasthan', type: 'adventure',
    title: 'Jaisalmer — Golden Desert', nearbyPlaces: ['Sam Sand Dunes', 'Kuldhara Village', 'Longewala'],
    description: 'Sleep under the stars on Thar Desert dunes, ride camels at sunset, and explore the living fort.',
    distance: '900 km from Delhi', hotelName: 'Suryagarh Jaisalmer', price: 9500, rating: 4.8, season: 'Oct – Feb',
    highlights: ['Sam Dunes', 'Jaisalmer Fort', 'Patwon Ki Haveli', 'Camel Safari'],
  },
  {
    id: 'raj-4', state: 'rajasthan', stateName: 'Rajasthan', type: 'wildlife',
    title: 'Ranthambore National Park', nearbyPlaces: ['Sawai Madhopur', 'Karauli', 'Bundi'],
    description: 'One of India\'s best tiger reserves with ancient fort ruins inside the jungle making it uniquely photogenic.',
    distance: '400 km from Delhi', hotelName: 'Aman-i-Khas', price: 45000, rating: 4.9, season: 'Oct – Jun',
    highlights: ['Tiger Safari', 'Ranthambore Fort', 'Padam Lake', 'Raj Bagh Ruins'],
  },

  // ══════════ HIMACHAL PRADESH ══════════
  {
    id: 'him-1', state: 'himachal', stateName: 'Himachal Pradesh', type: 'hill',
    title: 'Shimla — Queen of Hills', nearbyPlaces: ['Kufri', 'Chail', 'Naldehra'],
    description: 'Colonial-era architecture, toy train rides, and Himalayan panoramas make Shimla eternally charming.',
    distance: '360 km from Delhi', hotelName: 'Wildflower Hall', price: 18000, rating: 4.8, season: 'Mar – Jun, Sep – Nov',
    highlights: ['The Ridge', 'Mall Road', 'Jakhu Temple', 'Kufri Snow Park'],
  },
  {
    id: 'him-2', state: 'himachal', stateName: 'Himachal Pradesh', type: 'adventure',
    title: 'Manali — Adventure Capital', nearbyPlaces: ['Solang Valley', 'Rohtang Pass', 'Spiti Valley'],
    description: 'Snow sports, river rafting, trekking to Rohtang, and cozy wood-cabin stays in pine-scented valleys.',
    distance: '540 km from Delhi', hotelName: 'The Whispering Pines', price: 5400, rating: 4.8, season: 'Mar – Jun, Oct – Jan',
    highlights: ['Rohtang Pass', 'Solang Valley', 'Hadimba Temple', 'Old Manali'],
  },
  {
    id: 'him-3', state: 'himachal', stateName: 'Himachal Pradesh', type: 'hill',
    title: 'Dharamshala — Dalai Lama\'s Abode', nearbyPlaces: ['McLeod Ganj', 'Bhagsu Falls', 'Kangra Fort'],
    description: 'Tibetan culture, Buddhist monasteries, mountain cricket grounds, and stunning Dhauladhar views.',
    distance: '475 km from Delhi', hotelName: 'Fortune Park Moksha', price: 4200, rating: 4.7, season: 'Mar – Jun, Sep – Dec',
    highlights: ['Namgyal Monastery', 'Bhagsu Waterfall', 'Dal Lake', 'Triund Trek'],
  },
  {
    id: 'him-4', state: 'himachal', stateName: 'Himachal Pradesh', type: 'adventure',
    title: 'Spiti Valley', nearbyPlaces: ['Kaza', 'Key Monastery', 'Chandratal Lake'],
    description: 'A cold desert mountain valley with ancient monasteries, pristine lakes, and fossils from prehistoric seas.',
    distance: '700 km from Delhi', hotelName: 'Kaza Retreat', price: 3200, rating: 4.9, season: 'Jun – Sep',
    highlights: ['Key Monastery', 'Chandratal Lake', 'Dhankar Fort', 'Hikkim Post Office'],
  },

  // ══════════ UTTARAKHAND ══════════
  {
    id: 'utt-1', state: 'uttarakhand', stateName: 'Uttarakhand', type: 'spiritual',
    title: 'Rishikesh — Yoga Capital', nearbyPlaces: ['Haridwar', 'Neelkanth Temple', 'Rajaji NP'],
    description: 'World\'s yoga capital with the Ganges flowing through, riverside ashrams, and thrilling white-water rafting.',
    distance: '250 km from Delhi', hotelName: 'Ananda in the Himalayas', price: 22000, rating: 4.9, season: 'Feb – Jun, Sep – Nov',
    highlights: ['Laxman Jhula', 'Beatles Ashram', 'Ganga Aarti', 'River Rafting'],
  },
  {
    id: 'utt-2', state: 'uttarakhand', stateName: 'Uttarakhand', type: 'spiritual',
    title: 'Kedarnath & Char Dham', nearbyPlaces: ['Badrinath', 'Gangotri', 'Yamunotri'],
    description: 'Sacred Himalayan shrines at over 3,500m altitude — one of India\'s most profound pilgrimage circuits.',
    distance: '475 km from Delhi', hotelName: 'GMVN Kedarnath', price: 2800, rating: 4.8, season: 'May – Nov',
    highlights: ['Kedarnath Temple', 'Vasuki Tal Trek', 'Chorabari Glacier', 'Bhairavnath Temple'],
  },
  {
    id: 'utt-3', state: 'uttarakhand', stateName: 'Uttarakhand', type: 'wildlife',
    title: 'Jim Corbett National Park', nearbyPlaces: ['Nainital', 'Ramnagar', 'Lansdowne'],
    description: 'India\'s oldest national park and premier tiger reserve in the Terai forests at the Himalayan foothills.',
    distance: '285 km from Delhi', hotelName: 'Jim\'s Jungle Retreat', price: 8500, rating: 4.8, season: 'Nov – Jun',
    highlights: ['Tiger Safari', 'Dhikala Zone', 'Corbett Museum', 'Kosi River'],
  },

  // ══════════ J&K / LADAKH ══════════
  {
    id: 'lad-1', state: 'jammu', stateName: 'J&K / Ladakh', type: 'adventure',
    title: 'Leh — Land of High Passes', nearbyPlaces: ['Nubra Valley', 'Pangong Lake', 'Khardung La'],
    description: 'Dramatic moonscapes, Buddhist monasteries perched on cliffs, and crystal-clear high-altitude lakes.',
    distance: '1,000 km from Delhi', hotelName: 'The Grand Dragon Ladakh', price: 7200, rating: 4.9, season: 'Jun – Sep',
    highlights: ['Pangong Lake', 'Nubra Valley', 'Khardung La Pass', 'Thiksey Monastery'],
  },
  {
    id: 'lad-2', state: 'jammu', stateName: 'J&K / Ladakh', type: 'adventure',
    title: 'Kashmir — Paradise on Earth', nearbyPlaces: ['Gulmarg', 'Pahalgam', 'Sonamarg'],
    description: 'Floating gardens on Dal Lake, gondola rides to glaciers, and saffron fields in the Valley of Kashmir.',
    distance: '880 km from Delhi', hotelName: 'Lalit Grand Palace Srinagar', price: 12000, rating: 4.8, season: 'Apr – Oct',
    highlights: ['Dal Lake Shikara', 'Gulmarg Gondola', 'Pahalgam Meadows', 'Sonamarg Glacier'],
  },

  // ══════════ UTTAR PRADESH ══════════
  {
    id: 'up-1', state: 'up', stateName: 'Uttar Pradesh', type: 'heritage',
    title: 'Agra — Taj Mahal', nearbyPlaces: ['Agra Fort', 'Fatehpur Sikri', 'Mathura'],
    description: 'The Taj Mahal at sunrise is India\'s most iconic experience — a marble marvel of Mughal architecture.',
    distance: '230 km from Delhi', hotelName: 'ITC Mughal Agra', price: 9500, rating: 4.9, season: 'Oct – Mar',
    highlights: ['Taj Mahal', 'Agra Fort', 'Mehtab Bagh', 'Fatehpur Sikri'],
  },
  {
    id: 'up-2', state: 'up', stateName: 'Uttar Pradesh', type: 'spiritual',
    title: 'Varanasi — Oldest Living City', nearbyPlaces: ['Sarnath', 'Ramnagar Fort', 'Chunar'],
    description: 'Ghats, Ganga aarti, silk weaving, and ancient temples — Varanasi is India\'s spiritual heartbeat.',
    distance: '820 km from Delhi', hotelName: 'Brijrama Palace', price: 8000, rating: 4.8, season: 'Oct – Mar',
    highlights: ['Dashashwamedh Ghat', 'Ganga Aarti', 'Kashi Vishwanath', 'Boat Ride at Sunrise'],
  },

  // ══════════ GOA ══════════
  {
    id: 'goa-1', state: 'goa', stateName: 'Goa', type: 'beach',
    title: 'North Goa — Beach Party Capital', nearbyPlaces: ['Baga', 'Calangute', 'Anjuna', 'Vagator'],
    description: 'Vibrant beach shacks, trance music festivals, water sports, and Portuguese colonial forts.',
    distance: 'Direct Flights Available', hotelName: 'Taj Fort Aguada', price: 12000, rating: 4.7, season: 'Nov – Feb',
    highlights: ['Baga Beach', 'Fort Aguada', 'Anjuna Flea Market', 'Dudhsagar Falls'],
  },
  {
    id: 'goa-2', state: 'goa', stateName: 'Goa', type: 'luxury',
    title: 'South Goa — Serene Escape', nearbyPlaces: ['Palolem', 'Colva', 'Cabo de Rama'],
    description: 'Quiet white-sand coves, dolphin spotting, Konkani seafood, and luxury boutique resorts.',
    distance: 'Direct Flights Available', hotelName: 'Taj Exotica Goa', price: 18000, rating: 4.9, season: 'Nov – Feb',
    highlights: ['Palolem Beach', 'Cabo de Rama Fort', 'Butterfly Beach', 'Dolphin Spotting'],
  },

  // ══════════ MAHARASHTRA ══════════
  {
    id: 'mah-1', state: 'maharashtra', stateName: 'Maharashtra', type: 'heritage',
    title: 'Aurangabad — Ajanta & Ellora', nearbyPlaces: ['Ajanta Caves', 'Ellora Caves', 'Daulatabad Fort'],
    description: 'UNESCO World Heritage cave temples with 2,000-year-old Buddhist, Hindu, and Jain rock-cut art.',
    distance: '340 km from Mumbai', hotelName: 'Vivanta Aurangabad', price: 6500, rating: 4.8, season: 'Oct – Mar',
    highlights: ['Ajanta Caves', 'Ellora Caves', 'Bibi Ka Maqbara', 'Daulatabad Fort'],
  },
  {
    id: 'mah-2', state: 'maharashtra', stateName: 'Maharashtra', type: 'adventure',
    title: 'Lonavala & Khandala', nearbyPlaces: ['Bhushi Dam', 'Rajmachi Fort', 'Karla Caves'],
    description: 'Misty Sahyadri passes, ancient rock-cut caves, chikki sweets, and monsoon waterfall treks.',
    distance: '85 km from Mumbai / Pune', hotelName: 'Lonavala Vista Mountain Lodge', price: 5800, rating: 4.7, season: 'Jun – Sep, Nov – Jan',
    highlights: ['Bhushi Dam', 'Tiger\'s Leap', 'Karla-Bhaja Caves', 'Duke\'s Nose Trek'],
  },
  {
    id: 'mah-3', state: 'maharashtra', stateName: 'Maharashtra', type: 'hill',
    title: 'Mahabaleshwar', nearbyPlaces: ['Pratapgad Fort', 'Panchgani', 'Wai'],
    description: 'Strawberry farms, misty viewpoints, horse rides, and luxury mountain resort stays in the Sahyadris.',
    distance: '280 km from Mumbai', hotelName: 'The Brightland Resort', price: 7200, rating: 4.8, season: 'Feb – Jun, Oct – Jan',
    highlights: ['Arthur\'s Seat', 'Venna Lake', 'Pratapgad Fort', 'Strawberry Picking'],
  },

  // ══════════ GUJARAT ══════════
  {
    id: 'guj-1', state: 'gujarat', stateName: 'Gujarat', type: 'wildlife',
    title: 'Gir National Park', nearbyPlaces: ['Somnath Temple', 'Diu Island', 'Sasan Gir'],
    description: 'The last wild home of Asiatic lions — experience safari drives through dry teak and acacia forests.',
    distance: '360 km from Ahmedabad', hotelName: 'The Gateway Hotel Gir Forest', price: 7500, rating: 4.8, season: 'Dec – Jun',
    highlights: ['Asiatic Lion Safari', 'Sinh Sadan Museum', 'Somnath Temple', 'Devalia Safari Park'],
  },
  {
    id: 'guj-2', state: 'gujarat', stateName: 'Gujarat', type: 'heritage',
    title: 'Rann of Kutch', nearbyPlaces: ['Bhuj', 'Dholavira', 'Mandvi Beach'],
    description: 'Endless white salt desert, full moon nights at Rann Utsav, and unique Kutchi handicrafts.',
    distance: '400 km from Ahmedabad', hotelName: 'Rann Riders Resort', price: 8000, rating: 4.9, season: 'Nov – Feb',
    highlights: ['White Rann Sunrise', 'Rann Utsav Festival', 'Dholavira IVC Site', 'Kalo Dungar'],
  },

  // ══════════ MADHYA PRADESH ══════════
  {
    id: 'mp-1', state: 'mp', stateName: 'Madhya Pradesh', type: 'wildlife',
    title: 'Kanha National Park', nearbyPlaces: ['Bandhavgarh', 'Pench', 'Mandla'],
    description: 'The inspiration for Rudyard Kipling\'s Jungle Book — dense sal forests with barasingha and tigers.',
    distance: '260 km from Jabalpur', hotelName: 'Kanha Earth Lodge', price: 9200, rating: 4.9, season: 'Oct – Jun',
    highlights: ['Tiger Safari', 'Barasingha Meadows', 'Jungle Book Trail', 'Kanha Meadow'],
  },
  {
    id: 'mp-2', state: 'mp', stateName: 'Madhya Pradesh', type: 'heritage',
    title: 'Khajuraho Temples', nearbyPlaces: ['Panna National Park', 'Raneh Falls', 'Orchha'],
    description: 'UNESCO-listed medieval temple complex adorned with exquisite erotic sculptures and artistic masterpieces.',
    distance: '620 km from Delhi', hotelName: 'Taj Chandela Khajuraho', price: 7800, rating: 4.8, season: 'Oct – Mar',
    highlights: ['Western Temple Group', 'Eastern Temple Group', 'Sound & Light Show', 'Panna Tiger Reserve'],
  },
  {
    id: 'mp-3', state: 'mp', stateName: 'Madhya Pradesh', type: 'heritage',
    title: 'Orchha — Medieval Heritage', nearbyPlaces: ['Chanderi', 'Datia', 'Jhansi'],
    description: 'A forgotten Bundela capital with palaces, chhatris, and temples rising from the Betwa riverbanks.',
    distance: '420 km from Delhi', hotelName: 'Orchha Resort by MPTDC', price: 4500, rating: 4.7, season: 'Oct – Mar',
    highlights: ['Jehangir Mahal', 'Ram Raja Temple', 'Chhatris on Betwa', 'Orchha Wildlife Sanctuary'],
  },

  // ══════════ KERALA ══════════
  {
    id: 'ker-1', state: 'kerala', stateName: 'Kerala', type: 'luxury',
    title: 'Alleppey Backwaters', nearbyPlaces: ['Kottayam', 'Kumarakom', 'Ambalapuzha'],
    description: 'Float along tranquil lagoons on a traditional kettuvallam houseboat surrounded by coconut palms.',
    distance: '85 km from Cochin', hotelName: 'CGH Coconut Lagoon', price: 11000, rating: 4.9, season: 'Sep – Mar',
    highlights: ['Houseboat Cruise', 'Vembanad Lake', 'Ambalapuzha Temple', 'Bird Watching'],
  },
  {
    id: 'ker-2', state: 'kerala', stateName: 'Kerala', type: 'hill',
    title: 'Munnar Tea Estates', nearbyPlaces: ['Eravikulam NP', 'Mattupetty', 'Top Station'],
    description: 'Rolling hills carpeted in emerald tea gardens, rare Neelakurinji flowers, and mist-draped forests.',
    distance: '130 km from Cochin', hotelName: 'Tea Valley Heritage Bungalow', price: 6100, rating: 4.9, season: 'Sep – Mar',
    highlights: ['Tea Plantation Walk', 'Eravikulam NP', 'Echo Point', 'Top Station Viewpoint'],
  },
  {
    id: 'ker-3', state: 'kerala', stateName: 'Kerala', type: 'wildlife',
    title: 'Wayanad Wildlife Sanctuary', nearbyPlaces: ['Chembra Peak', 'Banasura Sagar', 'Edakkal Caves'],
    description: 'Bamboo forest treehouses, elephant corridors, waterfalls, and prehistoric Edakkal cave carvings.',
    distance: '100 km from Calicut', hotelName: 'Wayanad Canopy Treehouse', price: 9500, rating: 4.8, season: 'Oct – May',
    highlights: ['Chembra Peak Trek', 'Banasura Dam', 'Edakkal Caves', 'Muthanga Safari'],
  },
  {
    id: 'ker-4', state: 'kerala', stateName: 'Kerala', type: 'beach',
    title: 'Varkala Cliff Beaches', nearbyPlaces: ['Thiruvananthapuram', 'Kovalam', 'Papanasam Beach'],
    description: 'Red laterite cliffs dropping to pristine beaches, mineral springs, and chilled cafe strips.',
    distance: '50 km from Thiruvananthapuram', hotelName: 'Taj Green Cove Kovalam', price: 8500, rating: 4.7, season: 'Oct – Mar',
    highlights: ['Varkala Cliff Walk', 'Papanasam Beach', 'Janardanaswamy Temple', 'Sunset Watching'],
  },

  // ══════════ KARNATAKA ══════════
  {
    id: 'kar-1', state: 'karnataka', stateName: 'Karnataka', type: 'heritage',
    title: 'Hampi — Vijayanagara Empire', nearbyPlaces: ['Hospet', 'Badami', 'Pattadakal'],
    description: 'UNESCO ruins of the Vijayanagara Empire spread across surreal boulder landscapes on the Tungabhadra river.',
    distance: '340 km from Bangalore', hotelName: 'Evolve Back Hampi', price: 22000, rating: 4.9, season: 'Oct – Mar',
    highlights: ['Virupaksha Temple', 'Stone Chariot', 'Vittala Temple', 'Hemakuta Hill'],
  },
  {
    id: 'kar-2', state: 'karnataka', stateName: 'Karnataka', type: 'luxury',
    title: 'Coorg Coffee Estates', nearbyPlaces: ['Madikeri', 'Abbey Falls', 'Raja\'s Seat'],
    description: 'Luxuriate in colonial planter bungalows, walk through aromatic coffee and spice estates, spot elephants.',
    distance: '270 km from Bangalore', hotelName: 'The Coffee Estate Premium Stays', price: 8200, rating: 4.9, season: 'Oct – May',
    highlights: ['Coffee Plantation Walk', 'Abbey Falls', 'Namdroling Monastery', 'Iruppu Falls'],
  },
  {
    id: 'kar-3', state: 'karnataka', stateName: 'Karnataka', type: 'heritage',
    title: 'Mysuru Palace City', nearbyPlaces: ['Brindavan Gardens', 'Chamundi Hills', 'Srirangapatna'],
    description: 'India\'s most illuminated palace, silk sarees, Dasara procession, and royal Mysuru pak sweets.',
    distance: '140 km from Bangalore', hotelName: 'The Royal Mysore Heritage Inn', price: 4200, rating: 4.7, season: 'Year-round',
    highlights: ['Mysore Palace', 'Brindavan Gardens', 'Chamundi Hill', 'Devaraja Market'],
  },

  // ══════════ TAMIL NADU ══════════
  {
    id: 'tn-1', state: 'tamilnadu', stateName: 'Tamil Nadu', type: 'spiritual',
    title: 'Madurai — Temple City', nearbyPlaces: ['Rameshwaram', 'Kodaikanal', 'Alagarkoil'],
    description: 'The Meenakshi Amman Temple\'s soaring gopurams and corridor of thousand pillars are awe-inspiring.',
    distance: '500 km from Chennai', hotelName: 'Heritage Madurai', price: 5800, rating: 4.8, season: 'Oct – Apr',
    highlights: ['Meenakshi Temple', 'Thirumalai Nayakkar Palace', 'Gandhi Museum', 'Alagar Kovil'],
  },
  {
    id: 'tn-2', state: 'tamilnadu', stateName: 'Tamil Nadu', type: 'hill',
    title: 'Ooty — Queen of Nilgiris', nearbyPlaces: ['Coonoor', 'Doddabetta Peak', 'Mudumalai NP'],
    description: 'Toy train through tea gardens, Nilgiri Biosphere meadows, Dodda Betta summit, and rose gardens.',
    distance: '300 km from Bangalore', hotelName: 'Fernhills Royal Palace', price: 6500, rating: 4.7, season: 'Oct – Jun',
    highlights: ['Ooty Lake', 'Nilgiri Mountain Railway', 'Botanical Gardens', 'Doddabetta Peak'],
  },
  {
    id: 'tn-3', state: 'tamilnadu', stateName: 'Tamil Nadu', type: 'beach',
    title: 'Rameswaram — Pamban Island', nearbyPlaces: ['Dhanushkodi', 'Adam\'s Bridge', 'Pamban Bridge'],
    description: 'Sacred Ramanathaswamy Temple, India\'s longest road-sea bridge, and the ghost town of Dhanushkodi.',
    distance: '170 km from Madurai', hotelName: 'Hyatt Place Rameswaram', price: 5200, rating: 4.7, season: 'Oct – Apr',
    highlights: ['Ramanathaswamy Temple', 'Pamban Bridge', 'Dhanushkodi', 'Agnitheertham Beach'],
  },

  // ══════════ ANDHRA PRADESH ══════════
  {
    id: 'ap-1', state: 'andhra', stateName: 'Andhra Pradesh', type: 'spiritual',
    title: 'Tirupati — Balaji Temple', nearbyPlaces: ['Chandragiri Fort', 'Sri Kalahasti', 'Horsley Hills'],
    description: 'The richest temple in the world atop Tirumala Hills draws millions of pilgrims every year.',
    distance: '160 km from Chennai', hotelName: 'Marasa Sarovar Premiere', price: 4800, rating: 4.8, season: 'Year-round',
    highlights: ['Venkateswara Temple', 'Akasaganga Theertham', 'Padmavathi Temple', 'TTD Museum'],
  },

  // ══════════ TELANGANA ══════════
  {
    id: 'tel-1', state: 'telangana', stateName: 'Telangana', type: 'heritage',
    title: 'Hyderabad — City of Pearls', nearbyPlaces: ['Charminar', 'Golconda Fort', 'Nagarjunasagar'],
    description: 'Biryani, Charminar, Golconda\'s diamond legacy, and the historic Nizam\'s treasures.',
    distance: 'Direct Flights Available', hotelName: 'Taj Falaknuma Palace', price: 28000, rating: 4.9, season: 'Oct – Mar',
    highlights: ['Charminar', 'Golconda Fort', 'Ramoji Film City', 'Hussain Sagar Lake'],
  },

  // ══════════ ODISHA ══════════
  {
    id: 'odi-1', state: 'odisha', stateName: 'Odisha', type: 'spiritual',
    title: 'Puri — Lord Jagannath', nearbyPlaces: ['Konark Sun Temple', 'Chilika Lake', 'Bhubaneswar'],
    description: 'Home to the famous Rath Yatra, Jagannath Temple, and the UNESCO-listed Konark Sun Temple.',
    distance: '500 km from Kolkata', hotelName: 'Mayfair Beach Resort Puri', price: 5500, rating: 4.7, season: 'Oct – Feb',
    highlights: ['Jagannath Temple', 'Puri Beach', 'Konark Sun Temple', 'Chilika Lake Birds'],
  },

  // ══════════ WEST BENGAL ══════════
  {
    id: 'wb-1', state: 'westbengal', stateName: 'West Bengal', type: 'wildlife',
    title: 'Sundarbans Mangroves', nearbyPlaces: ['Gosaba', 'Sajnekhali', 'Bali Island'],
    description: 'UNESCO World Heritage mangrove delta — home to the Royal Bengal Tiger and the Irrawaddy dolphin.',
    distance: '120 km from Kolkata', hotelName: 'Sundarbans Tiger Camp', price: 6800, rating: 4.8, season: 'Sep – Mar',
    highlights: ['Royal Bengal Tiger Trail', 'Mangrove Safari', 'Crocodile Creek', 'Bird Watching'],
  },
  {
    id: 'wb-2', state: 'westbengal', stateName: 'West Bengal', type: 'hill',
    title: 'Darjeeling — Tea & Himalayas', nearbyPlaces: ['Tiger Hill', 'Mirik Lake', 'Kalimpong'],
    description: 'Toy train, Kangchenjunga views, first-flush Darjeeling tea, and misty hillside monasteries.',
    distance: '650 km from Kolkata', hotelName: 'Windamere Hotel', price: 8500, rating: 4.8, season: 'Mar – May, Sep – Dec',
    highlights: ['Tiger Hill Sunrise', 'Darjeeling Tea Estate', 'Batasia Loop', 'Peace Pagoda'],
  },

  // ══════════ SIKKIM ══════════
  {
    id: 'sik-1', state: 'sikkim', stateName: 'Sikkim', type: 'adventure',
    title: 'Gangtok & North Sikkim', nearbyPlaces: ['Tsomgo Lake', 'Nathula Pass', 'Gurudongmar Lake'],
    description: 'Buddhist monasteries, alpine lakes on the China border, and the third highest peak Kangchenjunga.',
    distance: '100 km from Bagdogra', hotelName: 'Mayfair Spa Resort Gangtok', price: 7200, rating: 4.8, season: 'Mar – May, Sep – Dec',
    highlights: ['Tsomgo Lake', 'Rumtek Monastery', 'Nathula Pass', 'Gurudongmar Lake'],
  },

  // ══════════ ASSAM ══════════
  {
    id: 'asm-1', state: 'assam', stateName: 'Assam', type: 'wildlife',
    title: 'Kaziranga National Park', nearbyPlaces: ['Majuli Island', 'Sibsagar', 'Tezpur'],
    description: 'UNESCO site with the world\'s largest population of one-horned rhinoceroses in tall elephant grass.',
    distance: '250 km from Guwahati', hotelName: 'Iora The Retreat Kaziranga', price: 8500, rating: 4.9, season: 'Nov – Apr',
    highlights: ['One-Horned Rhino Safari', 'Elephant Ride', 'Brahmaputra Cruise', 'Wild Buffalo Sighting'],
  },

  // ══════════ MEGHALAYA ══════════
  {
    id: 'meg-1', state: 'meghalaya', stateName: 'Meghalaya', type: 'adventure',
    title: 'Meghalaya — Abode of Clouds', nearbyPlaces: ['Cherrapunji', 'Living Root Bridges', 'Dawki'],
    description: 'Living root bridges, crystal-clear Dawki river, world\'s wettest place, and glowing caves.',
    distance: '100 km from Guwahati', hotelName: 'Ri Kynmaw Resort Shillong', price: 4500, rating: 4.8, season: 'Oct – Apr',
    highlights: ['Double Decker Root Bridge', 'Mawlynnong Village', 'Dawki River', 'Mawsmai Cave'],
  },

  // ══════════ ARUNACHAL ══════════
  {
    id: 'aru-1', state: 'arunachal', stateName: 'Arunachal Pradesh', type: 'adventure',
    title: 'Tawang — Buddhist Frontier', nearbyPlaces: ['Sela Pass', 'Nuranang Falls', 'Madhuri Lake'],
    description: 'India\'s largest Buddhist monastery at 3,000m altitude with frozen lakes and dramatic Himalayan views.',
    distance: '180 km from Tezpur', hotelName: 'Tawang Inn', price: 3200, rating: 4.7, season: 'Apr – Oct',
    highlights: ['Tawang Monastery', 'Sela Pass', 'Nuranang Falls', 'Madhuri Lake'],
  },

  // ══════════ BIHAR ══════════
  {
    id: 'bih-1', state: 'bihar', stateName: 'Bihar', type: 'spiritual',
    title: 'Bodh Gaya — Enlightenment Site', nearbyPlaces: ['Rajgir', 'Nalanda', 'Gaya'],
    description: 'Where Buddha attained enlightenment under the Bodhi Tree — the holiest site in Buddhism.',
    distance: '250 km from Patna', hotelName: 'Royal Residency Bodhgaya', price: 3500, rating: 4.8, season: 'Oct – Mar',
    highlights: ['Mahabodhi Temple', 'Bodhi Tree', 'Great Buddha Statue', 'Thai Monastery'],
  },

  // ══════════ ANDAMAN ══════════
  {
    id: 'and-1', state: 'andaman', stateName: 'Andaman & Nicobar', type: 'beach',
    title: 'Havelock Island', nearbyPlaces: ['Radhanagar Beach', 'Elephant Beach', 'Neil Island'],
    description: 'Asia\'s best beach (Radhanagar), bioluminescent plankton, coral reefs, and pristine tropical waters.',
    distance: 'Direct Flights to Port Blair', hotelName: 'Taj Exotica Andamans', price: 18000, rating: 4.9, season: 'Nov – Apr',
    highlights: ['Radhanagar Beach', 'Elephant Beach Snorkeling', 'Havelock Scuba', 'Sea Walk'],
  },
  {
    id: 'and-2', state: 'andaman', stateName: 'Andaman & Nicobar', type: 'heritage',
    title: 'Port Blair — Cellular Jail', nearbyPlaces: ['Ross Island', 'North Bay Island', 'Viper Island'],
    description: 'Colonial Cellular Jail\'s sound-and-light show narrates India\'s freedom struggle.',
    distance: 'Direct Flights Available', hotelName: 'Fortune Resort Bay Island', price: 7500, rating: 4.7, season: 'Nov – Apr',
    highlights: ['Cellular Jail', 'Ross Island Ruins', 'Light & Sound Show', 'Corbyn\'s Cove Beach'],
  },

  // ══════════ LAKSHADWEEP ══════════
  {
    id: 'lak-1', state: 'lakshadweep', stateName: 'Lakshadweep', type: 'beach',
    title: 'Agatti & Bangaram Islands', nearbyPlaces: ['Kavaratti', 'Minicoy', 'Kalpeni'],
    description: 'Untouched coral atolls, turquoise lagoons, and the clearest sea waters in India — a paradise preserved.',
    distance: '460 km from Kochi', hotelName: 'Bangaram Island Resort', price: 22000, rating: 4.9, season: 'Oct – May',
    highlights: ['Coral Reef Snorkeling', 'Glass-Bottom Boat', 'Lagoon Kayaking', 'Underwater Observatory'],
  },

  // ══════════ JHARKHAND ══════════
  {
    id: 'jha-1', state: 'jharkhand', stateName: 'Jharkhand', type: 'adventure',
    title: 'Betla National Park', nearbyPlaces: ['Netarhat', 'Hundru Falls', 'Patratu Valley'],
    description: 'Dense Palamau forests with elephants, leopards, and the ruins of Palamau Fort in a pristine jungle.',
    distance: '170 km from Ranchi', hotelName: 'Van Vihar Resort Betla', price: 3200, rating: 4.6, season: 'Oct – Jun',
    highlights: ['Elephant Safari', 'Palamau Fort Ruins', 'Crocodile Spotting', 'Bird Watching'],
  },

  // ══════════ CHHATTISGARH ══════════
  {
    id: 'chh-1', state: 'chhattisgarh', stateName: 'Chhattisgarh', type: 'adventure',
    title: 'Chitrakote Falls — India\'s Niagara', nearbyPlaces: ['Jagdalpur', 'Bastar', 'Tirathgarh Falls'],
    description: 'The widest waterfall in India with tribal Bastar art, terracotta crafts, and jungle treks.',
    distance: '340 km from Raipur', hotelName: 'Jungle Retreat Chitrakote', price: 3500, rating: 4.7, season: 'Jul – Mar',
    highlights: ['Chitrakote Falls', 'Tribal Haat Market', 'Tirathgarh Falls', 'Kanger Valley NP'],
  },

  // ══════════ PUNJAB ══════════
  {
    id: 'pun-1', state: 'punjab', stateName: 'Punjab', type: 'spiritual',
    title: 'Amritsar — Golden Temple', nearbyPlaces: ['Wagah Border', 'Jallianwala Bagh', 'Anandpur Sahib'],
    description: 'The magnificent Golden Temple, langar for 100,000 daily, and the emotional Wagah Border ceremony.',
    distance: '450 km from Delhi', hotelName: 'Taj Swarna Amritsar', price: 7500, rating: 4.9, season: 'Oct – Mar',
    highlights: ['Golden Temple', 'Wagah Border Parade', 'Jallianwala Bagh', 'Gobindgarh Fort'],
  },

  // ══════════ HARYANA ══════════
  {
    id: 'har-1', state: 'haryana', stateName: 'Haryana', type: 'heritage',
    title: 'Kurukshetra — Mahabharata Land', nearbyPlaces: ['Panipat', 'Sultanpur Bird Sanctuary', 'Morni Hills'],
    description: 'The mythological battlefield of the Mahabharata with sacred tanks, museums, and Vedic heritage.',
    distance: '170 km from Delhi', hotelName: 'Hotel Lark Kurukshetra', price: 2800, rating: 4.5, season: 'Oct – Mar',
    highlights: ['Brahma Sarovar', 'Krishna Museum', 'Jyotisar', 'Sannihit Sarovar'],
  },

  // ══════════ DELHI ══════════
  {
    id: 'del-4', state: 'delhi', stateName: 'Delhi', type: 'heritage',
    title: 'Old Delhi — Mughal Heritage Walk', nearbyPlaces: ['Red Fort', 'Jama Masjid', 'Chandni Chowk'],
    description: 'Lanes of Old Delhi hold Mughal architecture, street food legends, and centuries-old spice markets.',
    distance: 'Delhi NCR', hotelName: 'The Imperial New Delhi', price: 16000, rating: 4.9, season: 'Oct – Mar',
    highlights: ['Red Fort', 'Jama Masjid', 'Chandni Chowk Food Tour', 'Humayun\'s Tomb'],
  },

  // ══════════ NAGALAND ══════════
  {
    id: 'nag-1', state: 'nagaland', stateName: 'Nagaland', type: 'heritage',
    title: 'Hornbill Festival — Kohima', nearbyPlaces: ['Dzükou Valley', 'Kisama', 'Mon District'],
    description: 'India\'s most colorful tribal festival with warrior dances, Naga cuisine, and indigenous crafts.',
    distance: '75 km from Dimapur', hotelName: 'Hotel Japfu Kohima', price: 4500, rating: 4.8, season: 'Nov – Feb',
    highlights: ['Hornbill Festival', 'Kohima War Cemetery', 'Dzükou Valley Trek', 'Naga Cultural Show'],
  },

  // ══════════ MANIPUR ══════════
  {
    id: 'man-1', state: 'manipur', stateName: 'Manipur', type: 'adventure',
    title: 'Loktak Lake & Keibul Lamjao', nearbyPlaces: ['Imphal', 'Moreh', 'Kangla Fort'],
    description: 'The floating national park on the world\'s only floating lake — home to the endangered Brow-Antlered Deer.',
    distance: '50 km from Imphal', hotelName: 'Classic Hotel Imphal', price: 3200, rating: 4.6, season: 'Oct – Apr',
    highlights: ['Floating Park Safari', 'Sangai Deer Spotting', 'Phumdis Walk', 'Sendra Island'],
  },
];

// ── Hub-based destinations (geolocation-driven quick picks) ───────────────
export const destinationsData = {
  delhi: ALL_DESTINATIONS.filter(d =>
    ['raj-1','raj-3','him-2','utt-1','utt-3','up-1','up-2','lad-1','pun-1','del-4'].includes(d.id)
  ).slice(0, 6),
  mumbai: ALL_DESTINATIONS.filter(d =>
    ['mah-1','mah-2','mah-3','goa-1','goa-2','guj-1','guj-2','ker-1'].includes(d.id)
  ).slice(0, 6),
  bangalore: ALL_DESTINATIONS.filter(d =>
    ['kar-1','kar-2','kar-3','ker-1','ker-2','ker-3','tn-2','goa-2'].includes(d.id)
  ).slice(0, 6),
  general: ALL_DESTINATIONS.filter(d =>
    ['raj-2','him-4','lad-1','goa-2','ker-1','kar-1','wb-2','meg-1','and-1','asm-1','tn-1','bih-1'].includes(d.id)
  ).slice(0, 6),
};

export const travelHubs = [
  { id: 'delhi',     label: 'Delhi (North Hub)' },
  { id: 'mumbai',   label: 'Mumbai (West Hub)' },
  { id: 'bangalore',label: 'Bangalore (South Hub)' },
  { id: 'general',  label: 'All India Escapes' },
];

// Group all destinations by state for state-wise browsing
export const getDestinationsByState = (stateId) =>
  ALL_DESTINATIONS.filter(d => d.state === stateId);

export const getDestinationsByType = (type) =>
  type === 'all' ? ALL_DESTINATIONS : ALL_DESTINATIONS.filter(d => d.type === type);
