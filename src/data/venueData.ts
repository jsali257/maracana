import { WeeklySpecial, EventItem, MenuItem, GalleryPhoto } from '../types';

export const VENUE_INFO = {
  name: "El Maracaná Sports Bar & Grill",
  tagline: "Eat. Drink. Watch Sports. Live Entertainment.",
  address: "3110 S. Jackson Rd.",
  city: "Hidalgo",
  state: "TX",
  zip: "78557",
  fullAddress: "3110 S. Jackson Rd., Hidalgo, TX",
  phone: "(956) 322-8814",
  phoneRaw: "9563228814",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=3110+S+Jackson+Rd+Hidalgo+TX",
  hours: [
    { days: "Monday – Thursday", time: "11:00 AM – 12:00 AM" },
    { days: "Friday – Saturday", time: "11:00 AM – 2:00 AM" },
    { days: "Sunday", time: "11:00 AM – 12:00 AM" },
  ],
  happyHour: {
    days: "Monday – Friday",
    time: "3:00 PM – 7:00 PM",
    deals: [
      { item: "16 oz Draft Beer", price: "$2.99", note: "Ice cold on tap, domestic & imported favorites" },
      { item: "Margaritas", price: "$4.99", note: "House on the rocks or frozen with tajín rim" },
    ]
  }
};

export const WEEKLY_SPECIALS: WeeklySpecial[] = [
  {
    day: "Monday",
    dayIndex: 1,
    title: "Burger Monday + Monday Night Football",
    badge: "$7.99 Burger Special",
    subtitle: "Fuel up for kickoff with hearty burgers and cold brews",
    priceNote: "$7.99 specials featuring burgers & dogs",
    items: [
      { name: "La Americana Burger", price: "$7.99", description: "Juicy hand-crafted beef patty, melted American cheese, crisp lettuce, tomato, pickles & signature house sauce." },
      { name: "Buffalo Ranch Burger", price: "$7.99", description: "Crisp or grilled patty tossed in zesty buffalo sauce, creamy house buttermilk ranch, pepper jack cheese." },
      { name: "All-Star Hot Dog", price: "$7.99", description: "Jumbo beef frank with grilled onions, jalapeños, warm cheese and crispy fries." }
    ],
    entertainment: "Monday Night Football broadcast live with full audio across all stadium screens.",
    highlightColor: "amber",
    bannerImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80"
  },
  {
    day: "Tuesday",
    dayIndex: 2,
    title: "Taco Tuesday",
    badge: "$0.99 Tacos All Day",
    subtitle: "The Rio Grande Valley's favorite Tuesday tradition",
    priceNote: "$0.99 each tacos",
    items: [
      { name: "Street Tacos Selection", price: "$0.99 ea", description: "Choice of tender bistec, juicy al pastor, or seasoned chicken topped with fresh cilantro, diced onions, lime, and house salsa on warm double corn tortillas." }
    ],
    entertainment: "Live sports broadcasts, Champions League & international soccer replays.",
    highlightColor: "green",
    bannerImage: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1000&q=80"
  },
  {
    day: "Wednesday",
    dayIndex: 3,
    title: "Wing Wednesday",
    badge: "$0.69 Wings All Night",
    subtitle: "Crispy, sauced, and tossed to your favorite heat level",
    priceNote: "$0.69 each wings",
    items: [
      { name: "Jumbo Bone-In or Boneless Wings", price: "$0.69 ea", description: "Crispy fried wings tossed in Mango Habanero, Classic Buffalo, Lemon Pepper, BBQ, Garlic Parmesan, or Spicy Maracaná Fire sauce with celery & ranch." }
    ],
    entertainment: "NBA, midweek soccer matchups, and boxing preview watch party.",
    highlightColor: "red",
    bannerImage: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1000&q=80"
  },
  {
    day: "Thursday",
    dayIndex: 4,
    title: "Thirsty Thursday + DJ Karaoke",
    badge: "50% Off All Appetizers",
    subtitle: "Half-price starters and sing your heart out on the main stage",
    priceNote: "50% OFF All Appetizers + DJ Karaoke Night",
    items: [
      { name: "Triple Play", price: "50% OFF", description: "Sampler of mozzarella sticks, loaded tots, and crispy onion rings with dipping sauces." },
      { name: "Mozzarella Sticks", price: "50% OFF", description: "Golden fried stretchy mozzarella served with warm marinara." },
      { name: "Loaded Tater Tots", price: "50% OFF", description: "Crispy tots smothered in cheddar cheese, crispy bacon bits, jalapeños, and sour cream." },
      { name: "Onion Rings", price: "50% OFF", description: "Beer-battered jumbo sweet onion rings with spicy chipotle dip." },
      { name: "Chips & Cheese / Chips & Salsa", price: "50% OFF", description: "Warm tortilla chips with rich queso dip or roasted molcajete salsa." },
      { name: "Mexican Street Corn", price: "50% OFF", description: "Charred sweet corn coated in cotija cheese, lime crema, and chili powder." }
    ],
    entertainment: "DJ Karaoke starting at 8:00 PM — grab the mic and take the spotlight!",
    highlightColor: "purple",
    bannerImage: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1000&q=80"
  },
  {
    day: "Friday",
    dayIndex: 5,
    title: "Live Music Nights",
    badge: "Live Bands & Nightlife",
    subtitle: "Kick off the weekend with high-energy Banda, Norteño & live performances",
    priceNote: "Happy Hour 3–7 PM: $2.99 Drafts & $4.99 Margaritas",
    items: [
      { name: "Banda & Norteño Showcase", price: "Live", description: "Regional Mexican hits, live brass, accordions, and vibrant dancing right here in Hidalgo." },
      { name: "Maracaná Bucket Specials", price: "Ask Server", description: "Ice cold domestic and import beer buckets to share with your crew." }
    ],
    entertainment: "Banda Sinaloense, Grupo Norteño, and guest headliners every Friday night!",
    highlightColor: "green",
    bannerImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80"
  },
  {
    day: "Saturday",
    dayIndex: 6,
    title: "Live Music, DJ Karaoke & Liga MX",
    badge: "Liga MX + Live Music & DJs",
    subtitle: "The ultimate sports by day, electric nightlife by evening destination",
    priceNote: "All Day Sports & Weekend Party Atmosphere",
    items: [
      { name: "Game Day Parrillada / Platters", price: "Featured", description: "Grilled fajitas, smoked sausages, charro beans, guacamole, and warm tortillas." },
      { name: "Micheladas Especiales", price: "$7.50", description: "Prepared with Clamato, lime juice, Worcestershire, tajín rim, and choice of draft or bottled beer." }
    ],
    entertainment: "Liga MX live match broadcasts with game-time sound, transitioning into live band and DJ dance sets.",
    highlightColor: "blue",
    bannerImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80"
  },
  {
    day: "Sunday",
    dayIndex: 0,
    title: "Football Sunday + NFL RedZone",
    badge: "NFL RedZone Every Touchdown",
    subtitle: "Watch every touchdown from every game across our wall of high-definition screens",
    priceNote: "Tailgate Atmosphere Indoors with AC & Ice Cold Beer",
    items: [
      { name: "NFL Game Day Burger & Wings Combo", price: "Special", description: "Half-pound burger with fries and 6 crispy wings tossed in your favorite sauce." },
      { name: "Draft Pitchers & Buckets", price: "Special", description: "Keep your table fueled all 4 quarters with our rotating draft pitchers." }
    ],
    entertainment: "NFL RedZone, 1:00 PM & 4:00 PM matchups, Sunday Night Football on prime big screens.",
    highlightColor: "amber",
    bannerImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=80"
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: "nfl-sunday-redzone",
    title: "NFL Football Sunday + NFL RedZone",
    subtitle: "Every Game, Every Touchdown, Every Sunday",
    category: "nfl",
    date: "Every Sunday",
    displayDate: "Sundays | All Day",
    time: "11:00 AM – 10:30 PM",
    leagueOrGenre: "NFL Football",
    featuredBadge: "NFL RedZone Live",
    description: "Experience Sunday football the right way with NFL RedZone on our massive main video screens. We show Cowboys, Texans, and all division rivalries simultaneously with dedicated audio!",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=80",
    specialPromo: "All-Day Tailgate Combos & Cold Beer Buckets",
    tvScreenCoverage: "15+ 4K Ultra HD Screens & Stadium Sound"
  },
  {
    id: "ligamx-saturday-matchday",
    title: "Liga MX Super Matchday: América vs. Chivas / Monterrey",
    subtitle: "El Clásico Watch Party with Stadium Atmosphere",
    category: "soccer",
    date: "Saturday Game Day",
    displayDate: "Saturdays | From 5:00 PM",
    time: "5:00 PM & 7:00 PM & 9:00 PM",
    leagueOrGenre: "Liga MX Soccer",
    featuredBadge: "El Clásico Watch Party",
    description: "Nothing matches the passion of Mexican soccer at El Maracaná. Wear your club jersey, enjoy prepared micheladas, and chant with the Hidalgo crowd as every goal shakes the room.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80",
    specialPromo: "$7.50 Prepared Micheladas & Botana Platters",
    tvScreenCoverage: "Main Central Projector + Surround Sound"
  },
  {
    id: "monday-night-football",
    title: "Monday Night Football Watch Party",
    subtitle: "Prime Time Clash with $7.99 Burger & Dog Specials",
    category: "nfl",
    date: "Every Monday Night",
    displayDate: "Mondays | 7:15 PM CST",
    time: "7:00 PM Kickoff",
    leagueOrGenre: "NFL Football",
    featuredBadge: "$7.99 Burger Monday",
    description: "End your Monday on high energy with Monday Night Football. Enjoy $7.99 La Americana Burgers, Buffalo Ranch Burgers, and hot dogs while watching on our multi-screen setup.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80",
    specialPromo: "$7.99 Burgers + $2.99 Drafts during Happy Hour (3-7 PM)",
    tvScreenCoverage: "Full Audio Broadcast on Audio Zone 1"
  },
  {
    id: "friday-banda-norteno-live",
    title: "Viernes de Banda & Norteño Live",
    subtitle: "High-Powered Regional Mexican Live Bands",
    category: "live-music",
    date: "Every Friday Night",
    displayDate: "Fridays | 9:30 PM – 1:30 AM",
    time: "Doors open 11:00 AM | Live Band 9:30 PM",
    leagueOrGenre: "Banda & Norteño",
    featuredBadge: "Live Band Night",
    description: "The premier Friday night destination in Hidalgo. Live brass, accordions, and energetic Latin rhythms with full lighting, dance floor, and bottle service options.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80",
    specialPromo: "VIP Table Reservations & Drink Buckets Available",
    tvScreenCoverage: "Stage Lighting + Live Acoustic PA"
  },
  {
    id: "thursday-dj-karaoke",
    title: "Thirsty Thursday DJ Karaoke Night",
    subtitle: "50% Off All Appetizers + Sing Your Heart Out",
    category: "karaoke",
    date: "Every Thursday",
    displayDate: "Thursdays | 8:00 PM – Midnight",
    time: "8:00 PM – 12:00 AM",
    leagueOrGenre: "DJ Karaoke & Music",
    featuredBadge: "50% Off Appetizers",
    description: "Hidalgo's favorite karaoke night hosted by top resident DJs! Bring your friends, feast on 50% off appetizers like Triple Play, loaded tots and street corn, and sing classic rock, country, and regional hits.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
    specialPromo: "All Starters Half-Off (Mozzarella Sticks, Wings, Street Corn)",
    tvScreenCoverage: "Dual Lyric Monitors & Wireless Mics"
  },
  {
    id: "ufc-boxing-championship",
    title: "Championship Fight Night: UFC & World Boxing",
    subtitle: "Pay-Per-View Main Cards & Title Clashes",
    category: "combat",
    date: "Upcoming Saturday",
    displayDate: "Fight Saturdays | 7:00 PM",
    time: "Prelims 7:00 PM | Main Card 9:00 PM",
    leagueOrGenre: "UFC / Boxing PPV",
    featuredBadge: "Championship PPV",
    description: "Watch explosive knockouts and world title defenses live. Reserve early to lock down prime viewing tables directly facing our massive central display screens.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80",
    specialPromo: "Fight Night Nachos & Tower Drafts",
    tvScreenCoverage: "Every Screen in Venue Synchronized to Main Card"
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // Apps & Wings
  {
    id: "apps-triple-play",
    name: "The Triple Play Sampler",
    category: "apps-wings",
    price: "$14.99",
    description: "The ultimate game-day combo: 2 sliders, 2 chicken strips and mozzarella sticks, or swap in quesadillas.",
    image: "/menu/triple-play.jpg"
  },
  { id: "apps-street-corn", name: "Street Corn", category: "apps-wings", price: "$5.99", image: "/menu/StreetCorn.jpg" },
  { id: "apps-chicken-tenders", name: "Chicken Tenders", category: "apps-wings", price: "$10.99", image: "/menu/ChickenTenders.jpg" },
  { id: "apps-chips-cheese", name: "Chips & Cheese", category: "apps-wings", price: "$4.99" },
  { id: "apps-chips-salsa", name: "Chips And Salsa", category: "apps-wings", price: "$6.99", image: "/menu/Chips.jpg" },
  { id: "apps-onion-rings-ranch", name: "Onion Rings & Ranch", category: "apps-wings", price: "$6.99", image: "/menu/onion-rings.jpg" },

  // Burgers & Tacos
  { id: "bt-tacos-bistec", name: "Orden De Tacos Bistec", category: "burgers-tacos", price: "$12.99", image: "/menu/BistecTacos.jpg", imagePosition: "center 55%" },
  { id: "bt-tacos-pastor", name: "Orden De Tacos Pastor", category: "burgers-tacos", price: "$10.99", image: "/menu/PastorTacos.jpg" },
  {
    id: "bt-la-americana-burger",
    name: "La Americana Burger",
    category: "burgers-tacos",
    image: "/menu/LaAmericanaBurger.jpg"
  },
  {
    id: "bt-grilled-chicken-burger",
    name: "Grilled Chicken Burger",
    category: "burgers-tacos",
    price: "$12.99",
    description: "Toasted buttered bun, grilled chicken patty, cheese, bacon, lettuce, tomato, onion, pickles and mayo.",
    image: "/menu/ChickenBurger.jpg",
    imagePosition: "center 25%"
  },

  // Hot Dogs
  { id: "dog-classic", name: "Classic Hot Dog", category: "hot-dogs", price: "$6.99" },
  { id: "dog-chili-cheese", name: "Chili Cheese Dog", category: "hot-dogs", price: "$7.99", image: "/menu/chili-cheese-dog.jpg" },

  // Steaks
  { id: "steak-arrachera", name: "12 Oz Arrachera", category: "steaks", price: "$23.99" },
  { id: "steak-ribeye", name: "Ribeye Steak", category: "steaks", image: "/menu/ribeye-steak.jpg" },

  // Salads
  {
    id: "salad-house",
    name: "House Salad",
    category: "salads",
    price: "$9.99",
    description: "Lettuce, cherry tomatoes, cucumber, and ranch dressing.",
    image: "/menu/HouseSalad.jpg"
  },
  {
    id: "salad-caesar",
    name: "Caesar Salad",
    category: "salads",
    price: "$9.99",
    description: "Romaine lettuce, cherry tomatoes, croutons, Parmesan cheese, and Caesar dressing."
  },
  {
    id: "salad-strawberry-pecan",
    name: "Strawberry Pecan Salad",
    category: "salads",
    price: "$10.99",
    description: "Lettuce, cherry tomatoes, cucumber, shredded cheese, croutons, grilled chicken, and ranch dressing.",
    image: "/menu/StrawberryPecanSalad.jpg"
  },

  // Sides
  { id: "side-salad", name: "Side Salad", category: "sides", price: "$3.99" },
  {
    id: "side-loaded-fries",
    name: "Loaded French Fries",
    category: "sides",
    price: "$3.99",
    description: "Loaded fries with cheese, bacon, and chili available for an additional charge.",
    image: "/menu/loaded-fries.jpg"
  },
  { id: "side-sweet-potato-fries", name: "Sweet Potato Fries", category: "sides", price: "$3.99" },
  { id: "side-asparagus", name: "Asparagus", category: "sides", price: "$3.99" },
  { id: "side-broccoli", name: "Broccoli", category: "sides", price: "$3.99" },
  { id: "side-onion-rings", name: "Onion Rings", category: "sides", price: "$3.99", image: "/menu/onion-rings.jpg" },
  { id: "side-veggie-sticks", name: "Veggie Sticks", category: "sides", price: "$3.99" },
  { id: "side-mozzarella-sticks", name: "Mozzarella Sticks", category: "sides", price: "$6.99" },
  {
    id: "side-tater-tots",
    name: "Tater Tots",
    category: "sides",
    price: "$3.99",
    description: "Loaded tater tots with cheese, bacon, and chili available for an additional charge."
  },

  // Kids Meals
  { id: "kids-tater-tots", name: "Kids Tater Tots", category: "kids" },
  { id: "kids-side-fries", name: "Kids Side Fries", category: "kids" },
  { id: "kids-jello-cup", name: "Kids Jello Cup", category: "kids" },
  { id: "kids-fruit-cup", name: "Kids Fruit Cup", category: "kids" },
  {
    id: "kids-cheeseburger",
    name: "Kids Cheeseburger",
    category: "kids",
    price: "$7.99",
    description: "Cheese, pickles, mayo and ketchup. Served with a side and kids fountain drink.",
    image: "/menu/KidsBurger.jpg"
  },
  {
    id: "kids-personal-pizza",
    name: "Kids Personal Pizza",
    category: "kids",
    price: "$8.99",
    description: "Pepperoni pizza served with kids side and fountain drink.",
    image: "/menu/kids-pizza.jpg"
  },
  {
    id: "kids-chicken-tenders",
    name: "Kids Chicken Tenders",
    category: "kids",
    price: "$6.99",
    description: "Served with one side and kids fountain drink."
  },

  // Extras
  { id: "extra-blue-cheese", name: "Blue Cheese 6 Oz", category: "extras", price: "$1.99" },
  { id: "extra-fries", name: "Fries", category: "extras", price: "$3.99" },
  { id: "extra-ranch", name: "Ranch 6 Oz", category: "extras", price: "$1.99" },
  { id: "extra-jalapeno", name: "Jalapeno", category: "extras", price: "$0.75" },
  { id: "extra-pechuga", name: "Pechuga", category: "extras", price: "$2.99" },
  { id: "extra-cheese-sauce", name: "Cheese Sauce 6 Oz", category: "extras", price: "$1.99" },

  // Dessert
  { id: "dessert-flan", name: "Flan", category: "dessert", price: "$6.99" },
  { id: "dessert-chocolate-cake", name: "Chocolate Cake", category: "dessert", price: "$9.99", image: "/menu/chocolate-cake.jpg" }
];

// Drink items are kept here for the upcoming drink menu section; they are not shown on the site yet.
export const DRINK_ITEMS: MenuItem[] = [
  // Drinks & Beer
  {
    id: "drink-draft-beer",
    name: "16 oz Ice-Cold Draft Beer",
    category: "drinks",
    price: "$4.75",
    specialPrice: "$2.99 (Happy Hour)",
    isSpecialDay: "Happy Hour Mon-Fri 3-7 PM: $2.99",
    description: "Served in an ice-frosted stadium pint glass. Michelob Ultra, Miller Lite, Bud Light, Dos Equis, Modelo Especial, and Corona Premier.",
    isPopular: true,
    image: "https://images.unsplash.com/photo-1538488881522-4321453a9d70?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "drink-margarita-house",
    name: "El Maracaná House Margarita",
    category: "margaritas",
    price: "$7.50",
    specialPrice: "$4.99 (Happy Hour)",
    isSpecialDay: "Happy Hour Mon-Fri 3-7 PM: $4.99",
    description: "Premium blue agave tequila, fresh-squeezed lime juice, triple sec, and agave nectar. Served on the rocks or frozen with a Tajín or sea-salt rim.",
    isPopular: true,
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "drink-michelada-preparada",
    name: "Michelada Preparada Especial",
    category: "margaritas",
    price: "$7.50",
    description: "Draft or bottled Mexican beer served in a giant 32oz chalice with house Clamato recipe, fresh key limes, Worcestershire, hot sauce, chamoy, and Tajín.",
    isPopular: true
  },
  {
    id: "drink-spicy-mango-rita",
    name: "Spicy Mango Habanero Margarita",
    category: "margaritas",
    price: "$8.99",
    description: "Tequila reposado, natural mango purée, fresh lime juice, habanero infusion, tamarindo stick, and spicy chamoy rim."
  },

  // Non-alcoholic beverages
  { id: "bev-diet-coke", name: "Diet Coke", category: "beverages", price: "$2.99" },
  { id: "bev-red-bull", name: "Red Bull", category: "beverages", price: "$4.50" },
  { id: "bev-bottled-water", name: "Bottled Water", category: "beverages", price: "$3.50" },
  { id: "bev-fanta-orange", name: "Fanta Orange", category: "beverages", price: "$2.99" },
  { id: "bev-lemonade", name: "Lemonade", category: "beverages", price: "$3.99" },
  { id: "bev-topo-chico", name: "Topo Chico", category: "beverages", price: "$3.50" },
  { id: "bev-sprite", name: "Sprite", category: "beverages", price: "$2.99" },
  { id: "bev-kid-drinks", name: "Kid Drinks", category: "beverages", price: "$0.99" },
  { id: "bev-dr-pepper", name: "Dr. Pepper", category: "beverages", price: "$2.99" },
  { id: "bev-fountain-water", name: "Fountain Water", category: "beverages" },
  { id: "bev-coke", name: "Coke", category: "beverages", price: "$2.99" },
  { id: "bev-sprite-zero", name: "Sprite Zero", category: "beverages" },
  { id: "bev-coke-zero", name: "Coke Zero", category: "beverages", price: "$2.99" }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "gal-01",
    title: "Match Day Mascot",
    category: "watch-party",
    imageUrl: "/gallery/web/gallery-01.jpg",
    thumbUrl: "/gallery/web/gallery-01-thumb.jpg",
    width: 1600,
    height: 900,
    caption: "The Mexico-jersey mascot poses with fans in a packed house."
  },
  {
    id: "gal-10",
    title: "Red Jersey Crew",
    category: "fans",
    imageUrl: "/gallery/web/gallery-10.jpg",
    thumbUrl: "/gallery/web/gallery-10-thumb.jpg",
    width: 1200,
    height: 904,
    caption: "A table of fans in red jerseys cheering on the game."
  },
  {
    id: "gal-12",
    title: "Beer Tower Night",
    category: "drinks",
    imageUrl: "/gallery/web/gallery-12.jpg",
    thumbUrl: "/gallery/web/gallery-12-thumb.jpg",
    width: 1600,
    height: 1200,
    caption: "Friends share a tower of cold beer."
  },
  {
    id: "gal-14",
    title: "Fiesta Mexicana",
    category: "watch-party",
    imageUrl: "/gallery/web/gallery-14.jpg",
    thumbUrl: "/gallery/web/gallery-14-thumb.jpg",
    width: 1600,
    height: 1200,
    caption: "Traditional Mexican dresses and green, white and red all around."
  },
  {
    id: "gal-18",
    title: "Cowboys Fans",
    category: "fans",
    imageUrl: "/gallery/web/gallery-18.jpg",
    thumbUrl: "/gallery/web/gallery-18-thumb.jpg",
    width: 1600,
    height: 1200,
    caption: "Cowboys fans with a bucket of beer and the game on."
  },
  {
    id: "gal-09",
    title: "Friends Night Out",
    category: "guests",
    imageUrl: "/gallery/web/gallery-09.jpg",
    thumbUrl: "/gallery/web/gallery-09-thumb.jpg",
    width: 1600,
    height: 900,
    caption: "Friends enjoying a night out at the table."
  },
  {
    id: "gal-03",
    title: "Mexico Match Day",
    category: "watch-party",
    imageUrl: "/gallery/web/gallery-03.jpg",
    thumbUrl: "/gallery/web/gallery-03-thumb.jpg",
    width: 1600,
    height: 900,
    caption: "Green jerseys, big screens and the mascot joining the fun."
  },
  {
    id: "gal-27",
    title: "Club América Flag",
    category: "fans",
    imageUrl: "/gallery/web/gallery-27.jpg",
    thumbUrl: "/gallery/web/gallery-27-thumb.jpg",
    width: 1600,
    height: 1202,
    caption: "Fans proudly hold up the Club América flag."
  },
  {
    id: "gal-15",
    title: "Cheers!",
    category: "drinks",
    imageUrl: "/gallery/web/gallery-15.jpg",
    thumbUrl: "/gallery/web/gallery-15-thumb.jpg",
    width: 1600,
    height: 1200,
    caption: "Raising a cold one in front of the big screens."
  },
  {
    id: "gal-24",
    title: "Fiesta Nights at the Bar",
    category: "watch-party",
    imageUrl: "/gallery/web/gallery-24.jpg",
    thumbUrl: "/gallery/web/gallery-24-thumb.jpg",
    width: 1600,
    height: 1200,
    caption: "Sombrero and traditional dress by the bar."
  },
  {
    id: "gal-20",
    title: "Cowboys Crew",
    category: "fans",
    imageUrl: "/gallery/web/gallery-20.jpg",
    thumbUrl: "/gallery/web/gallery-20-thumb.jpg",
    width: 1600,
    height: 1200,
    caption: "A table of Cowboys fans with a helmet on the table."
  },
  {
    id: "gal-16",
    title: "Game Day Friends",
    category: "guests",
    imageUrl: "/gallery/web/gallery-16.jpg",
    thumbUrl: "/gallery/web/gallery-16-thumb.jpg",
    width: 1600,
    height: 1200,
    caption: "Friends grabbing a table with the game on."
  },
  {
    id: "gal-04",
    title: "Green Jersey Squad",
    category: "watch-party",
    imageUrl: "/gallery/web/gallery-04.jpg",
    thumbUrl: "/gallery/web/gallery-04-thumb.jpg",
    width: 1600,
    height: 900,
    caption: "Fans in Mexico jerseys pose with the mascot."
  },
  {
    id: "gal-11",
    title: "Club América Couple",
    category: "fans",
    imageUrl: "/gallery/web/gallery-11.jpg",
    thumbUrl: "/gallery/web/gallery-11-thumb.jpg",
    width: 1600,
    height: 1202,
    caption: "A couple in Club América jerseys at their table."
  },
  {
    id: "gal-21",
    title: "Table for the Whole Crew",
    category: "guests",
    imageUrl: "/gallery/web/gallery-21.jpg",
    thumbUrl: "/gallery/web/gallery-21-thumb.jpg",
    width: 1600,
    height: 1200,
    caption: "Family and friends sharing food and drinks."
  },
  {
    id: "gal-28",
    title: "Beer Tower Table",
    category: "drinks",
    imageUrl: "/gallery/web/gallery-28.jpg",
    thumbUrl: "/gallery/web/gallery-28-thumb.jpg",
    width: 1600,
    height: 1202,
    caption: "A beer tower on the table for the group."
  },
  {
    id: "gal-06",
    title: "Selfie With the Mascot",
    category: "watch-party",
    imageUrl: "/gallery/web/gallery-06.jpg",
    thumbUrl: "/gallery/web/gallery-06-thumb.jpg",
    width: 1600,
    height: 900,
    caption: "Cold beer, food baskets and a selfie with the mascot."
  },
  {
    id: "gal-22",
    title: "Texans Fans",
    category: "fans",
    imageUrl: "/gallery/web/gallery-22.jpg",
    thumbUrl: "/gallery/web/gallery-22-thumb.jpg",
    width: 1600,
    height: 1200,
    caption: "A Texans jersey and a good time."
  },
  {
    id: "gal-17",
    title: "Cowgirl Night",
    category: "guests",
    imageUrl: "/gallery/web/gallery-17.jpg",
    thumbUrl: "/gallery/web/gallery-17-thumb.jpg",
    width: 1600,
    height: 1202,
    caption: "Cowboy hats and cold beer at the booth."
  },
  {
    id: "gal-07",
    title: "Mexico Fans Unite",
    category: "watch-party",
    imageUrl: "/gallery/web/gallery-07.jpg",
    thumbUrl: "/gallery/web/gallery-07-thumb.jpg",
    width: 1600,
    height: 900,
    caption: "Friends and family in green pose with the mascot."
  },
  {
    id: "gal-29",
    title: "Yellow Jersey Squad",
    category: "fans",
    imageUrl: "/gallery/web/gallery-29.jpg",
    thumbUrl: "/gallery/web/gallery-29-thumb.jpg",
    width: 1600,
    height: 1202,
    caption: "Fans in yellow jerseys with a bucket of cold beers."
  },
  {
    id: "gal-23",
    title: "Dinner and the Game",
    category: "guests",
    imageUrl: "/gallery/web/gallery-23.jpg",
    thumbUrl: "/gallery/web/gallery-23-thumb.jpg",
    width: 1600,
    height: 1202,
    caption: "Friends share food and drinks while the matches play."
  },
  {
    id: "gal-13",
    title: "Fiesta Décor",
    category: "watch-party",
    imageUrl: "/gallery/web/gallery-13.jpg",
    thumbUrl: "/gallery/web/gallery-13-thumb.jpg",
    width: 1200,
    height: 904,
    caption: "Red, white and green balloons and team pennants at the welcome stand."
  },
  {
    id: "gal-19",
    title: "Cowboys Faithful",
    category: "fans",
    imageUrl: "/gallery/web/gallery-19.jpg",
    thumbUrl: "/gallery/web/gallery-19-thumb.jpg",
    width: 1600,
    height: 1200,
    caption: "A Cowboys fan flashes a smile with a cold one."
  },
  {
    id: "gal-25",
    title: "Night Out",
    category: "guests",
    imageUrl: "/gallery/web/gallery-25.jpg",
    thumbUrl: "/gallery/web/gallery-25-thumb.jpg",
    width: 1600,
    height: 1200,
    caption: "Friends gather around the table for food and drinks."
  },
  {
    id: "gal-02",
    title: "Family Photo Time",
    category: "watch-party",
    imageUrl: "/gallery/web/gallery-02.jpg",
    thumbUrl: "/gallery/web/gallery-02-thumb.jpg",
    width: 1600,
    height: 900,
    caption: "Families line up for photos with the mascot on match day."
  },
  {
    id: "gal-26",
    title: "América Fans",
    category: "fans",
    imageUrl: "/gallery/web/gallery-26.jpg",
    thumbUrl: "/gallery/web/gallery-26-thumb.jpg",
    width: 1600,
    height: 1202,
    caption: "Fans in yellow Club América jerseys."
  },
  {
    id: "gal-05",
    title: "Little Fans, Big Game",
    category: "watch-party",
    imageUrl: "/gallery/web/gallery-05.jpg",
    thumbUrl: "/gallery/web/gallery-05-thumb.jpg",
    width: 1600,
    height: 900,
    caption: "A family meets the mascot during the match."
  },
  {
    id: "gal-30",
    title: "Packed House",
    category: "fans",
    imageUrl: "/gallery/web/gallery-30.jpg",
    thumbUrl: "/gallery/web/gallery-30-thumb.jpg",
    width: 1600,
    height: 1202,
    caption: "Screens full of soccer and a crowd enjoying the match."
  },
  {
    id: "gal-08",
    title: "Vamos México!",
    category: "watch-party",
    imageUrl: "/gallery/web/gallery-08.jpg",
    thumbUrl: "/gallery/web/gallery-08-thumb.jpg",
    width: 1600,
    height: 900,
    caption: "Two fans in Mexico jerseys cheer with the mascot."
  }
];

export const SPORTS_FEATURES = [
  {
    title: "NFL Sunday Ticket & RedZone",
    description: "Every game, every tackle, and every touchdown shown live without missing a beat.",
    icon: "Trophy"
  },
  {
    title: "Liga MX & International Soccer",
    description: "The home for soccer lovers with live commentary, chants, and thrilling watch parties.",
    icon: "Flame"
  },
  {
    title: "Boxing & UFC Championship PPVs",
    description: "Catch world title showdowns on our synchronized multi-screen high-definition setup.",
    icon: "Shield"
  },
  {
    title: "College Football & Major Tournaments",
    description: "Saturdays loaded with Big 12, SEC, NCAA March Madness, and NBA playoffs.",
    icon: "Tv"
  }
];
