// ─────────────────────────────────────────────────────────────
// VoyageRoots — shared destination data
// Import this in both the listing page and the detail page
// ─────────────────────────────────────────────────────────────

export const destinations = [
  {
    "id": 1,
    "slug": "kyoto",
    "name": "Kyoto",
    "country": "Japan",
    "region": "Asia",
    "tags": [
      "Culture",
      "City"
    ],
    "rating": 4.9,
    "reviews": 3241,
    "price": 1200,
    "duration": "7 days",
    "featured": true,
    "badge": "Staff Pick",
    "badgeColor": "badge-primary",
    "description": "Ancient temples, bamboo forests and a culinary tradition unlike anywhere else on earth.",
    "gradient": "from-rose-900 via-red-800 to-orange-700",
    "gradientHex": [
      "#4C0519",
      "#991B1B",
      "#B45309"
    ],
    "emoji": "⛩️",
    "overview": "Kyoto was Japan\"s imperial capital for over a thousand years, and it shows. Nowhere else in the world packs this density of UNESCO-listed temples, perfectly raked zen gardens, and living cultural traditions into a single city. Geisha still walk the stone lanes of Gion at dusk. Monks still rake gravel at Ryōan-ji at dawn. And the food — from kaiseki multi-course dinners to hand-rolled matcha soba — is quietly one of the world\"s great culinary traditions. Kyoto rewards slowness. The more time you give it, the more it gives back.",
    "highlights": [
      "Arashiyama Bamboo Grove",
      "Fushimi Inari Shrine",
      "Gion District",
      "Nishiki Market",
      "Philosopher's Path"
    ],
    "bestTime": "March–May (cherry blossoms) or October–November (autumn foliage)",
    "language": "Japanese",
    "currency": "Japanese Yen (¥)",
    "timezone": "JST (UTC+9)",
    "climate": "Temperate — four distinct seasons",
    "quickFacts": [
      {
        "label": "Capital of",
        "value": "Kyoto Prefecture"
      },
      {
        "label": "Population",
        "value": "1.46 million"
      },
      {
        "label": "Founded",
        "value": "794 AD"
      },
      {
        "label": "UNESCO Sites",
        "value": "17"
      }
    ],
    "experiences": [
      {
        "id": "e1-1",
        "title": "Private Tea Ceremony in a 200-Year-Old Machiya",
        "type": "Culture",
        "duration": "2 hours",
        "groupSize": "Up to 6",
        "price": 95,
        "rating": 4.9,
        "reviews": 412,
        "emoji": "🍵",
        "description": "Step inside a restored townhouse hidden behind bamboo gates and learn the ancient art of chado — the way of tea — from a third-generation tea master. Includes seasonal wagashi sweets and a guided garden walk.",
        "tags": [
          "Intimate",
          "Cultural",
          "Hands-on"
        ],
        "highlight": true
      },
      {
        "id": "e1-2",
        "title": "Sunrise Hike on the Fushimi Inari Trail",
        "type": "Adventure",
        "duration": "3 hours",
        "groupSize": "Up to 8",
        "price": 55,
        "rating": 4.8,
        "reviews": 887,
        "emoji": "⛩️",
        "description": "Beat the crowds and climb 10,000 vermillion torii gates before the city wakes. Your local guide shares folklore, hidden shrines, and the best viewpoint over Kyoto as dawn breaks.",
        "tags": [
          "Early Morning",
          "Photography",
          "Spiritual"
        ],
        "highlight": false
      },
      {
        "id": "e1-3",
        "title": "Nishiki Market Food Walk",
        "type": "Food",
        "duration": "2.5 hours",
        "groupSize": "Up to 10",
        "price": 75,
        "rating": 4.7,
        "reviews": 654,
        "emoji": "🥢",
        "description": "Wind through the narrow \"Kitchen of Kyoto\" with a chef-guide, tasting pickled vegetables, fresh tofu, dashi-soaked skewers, and inventive matcha sweets at over a dozen stalls.",
        "tags": [
          "Food & Drink",
          "Local Life",
          "Walking"
        ],
        "highlight": false
      },
      {
        "id": "e1-4",
        "title": "Geisha District Evening Walk & Dinner",
        "type": "Culture",
        "duration": "4 hours",
        "groupSize": "Up to 12",
        "price": 130,
        "rating": 5,
        "reviews": 298,
        "emoji": "🏮",
        "description": "Stroll stone-paved Gion lanes with a historian, then dine in a private kappo restaurant reserved exclusively for VoyageRoots guests — with sake pairings and a chance to meet a maiko apprentice.",
        "tags": [
          "Evening",
          "Exclusive",
          "Dining"
        ],
        "highlight": true
      },
      {
        "id": "e1-5",
        "title": "Calligraphy & Ikebana Half-Day Workshop",
        "type": "Culture",
        "duration": "3 hours",
        "groupSize": "Up to 8",
        "price": 85,
        "rating": 4.8,
        "reviews": 201,
        "emoji": "🖌️",
        "description": "Learn shodo (brush calligraphy) and ikebana (flower arranging) side by side in a serene studio inside a former imperial villa. Take home your artwork and a seasonal flower arrangement.",
        "tags": [
          "Creative",
          "Relaxing",
          "Souvenir"
        ],
        "highlight": false
      }
    ]
  },
  {
    "id": 2,
    "slug": "santorini",
    "name": "Santorini",
    "country": "Greece",
    "region": "Europe",
    "tags": [
      "Beach",
      "Culture"
    ],
    "rating": 4.8,
    "reviews": 5102,
    "price": 1650,
    "duration": "5 days",
    "featured": true,
    "badge": "Trending",
    "badgeColor": "badge-secondary",
    "description": "Clifftop villages, volcanic beaches and sunsets that look too beautiful to be real.",
    "gradient": "from-blue-900 via-indigo-700 to-sky-500",
    "gradientHex": [
      "#1E3A5F",
      "#3730A3",
      "#0EA5E9"
    ],
    "emoji": "🏛️",
    "overview": "Santorini sits atop a half-submerged ancient caldera, which explains everything — the dramatic cliffs, the black sand beaches, the crystal-clear Aegean waters in hues that range from deep sapphire to glittering turquoise. The white-washed villages of Oia and Fira cling precariously to cliff edges, their blue-domed churches reflected in every photograph. But beyond the Instagram-famous sunset: Santorini is a wine island with indigenous grape varieties grown in volcanic soil, a rich Minoan history at Akrotiri, and a slower pace of life that makes everything feel earned.",
    "highlights": [
      "Oia Sunset Viewpoint",
      "Red Beach",
      "Akrotiri Archaeological Site",
      "Fira Caldera Walk",
      "Amoudi Bay"
    ],
    "bestTime": "April–June or September–October (less crowded, perfect weather)",
    "language": "Greek",
    "currency": "Euro (€)",
    "timezone": "EET (UTC+2)",
    "climate": "Mediterranean — hot, dry summers; mild winters",
    "quickFacts": [
      {
        "label": "Island type",
        "value": "Volcanic caldera"
      },
      {
        "label": "Area",
        "value": "73 km²"
      },
      {
        "label": "Highest point",
        "value": "Mt. Profitis Ilias (567m)"
      },
      {
        "label": "Famous for",
        "value": "Sunsets & Assyrtiko wine"
      }
    ],
    "experiences": [
      {
        "id": "e2-1",
        "title": "Sunset Catamaran Cruise with Dinner",
        "type": "Adventure",
        "duration": "5 hours",
        "groupSize": "Up to 12",
        "price": 145,
        "rating": 4.9,
        "reviews": 1203,
        "emoji": "⛵",
        "description": "Sail the caldera aboard a private catamaran, snorkel in volcanic hot springs, swim off the Red Beach, and watch the legendary Oia sunset from the water with a candlelit BBQ dinner on deck.",
        "tags": [
          "Sunset",
          "Swimming",
          "Dinner"
        ],
        "highlight": true
      },
      {
        "id": "e2-2",
        "title": "Akrotiri Archaeological Site Private Tour",
        "type": "Culture",
        "duration": "2.5 hours",
        "groupSize": "Up to 8",
        "price": 80,
        "rating": 4.8,
        "reviews": 542,
        "emoji": "🏺",
        "description": "A classicist-archaeologist unlocks the \"Pompeii of the Aegean\" — a 3,600-year-old Minoan city frozen in time by a volcanic eruption. See frescoes, storage jars, and two-storey houses that predate most of recorded history.",
        "tags": [
          "History",
          "Expert Guide",
          "Archaeology"
        ],
        "highlight": false
      },
      {
        "id": "e2-3",
        "title": "Volcano Hike & Hot Springs",
        "type": "Adventure",
        "duration": "4 hours",
        "groupSize": "Up to 15",
        "price": 65,
        "rating": 4.7,
        "reviews": 789,
        "emoji": "🌋",
        "description": "Hike to the crater of Nea Kameni volcano — still active — for panoramic caldera views, then soak in the warm, sulphur-rich waters of the adjacent hot springs by traditional wooden boat.",
        "tags": [
          "Hiking",
          "Nature",
          "Unique"
        ],
        "highlight": false
      },
      {
        "id": "e2-4",
        "title": "Assyrtiko Wine & Food Pairing at a Cliff-Edge Winery",
        "type": "Food",
        "duration": "3 hours",
        "groupSize": "Up to 10",
        "price": 110,
        "rating": 5,
        "reviews": 315,
        "emoji": "🍷",
        "description": "Santorini\"s indigenous Assyrtiko grape grows in basket-weave vines that have survived the volcanic soil for centuries. Tour the estate, taste five vintages, and pair them with local cheeses, fava, and sundried tomatoes at a clifftop table.",
        "tags": [
          "Wine",
          "Scenic",
          "Gourmet"
        ],
        "highlight": true
      }
    ]
  },
  {
    "id": 3,
    "slug": "patagonia",
    "name": "Patagonia",
    "country": "Argentina",
    "region": "Americas",
    "tags": [
      "Adventure",
      "Mountains",
      "Wildlife"
    ],
    "rating": 4.9,
    "reviews": 1876,
    "price": 2100,
    "duration": "10 days",
    "featured": false,
    "badge": "Wild",
    "badgeColor": "badge-accent",
    "description": "Glaciers, granite towers and total silence. The edge of the world, in the best way.",
    "gradient": "from-slate-800 via-teal-900 to-cyan-800",
    "gradientHex": [
      "#1E293B",
      "#134E4A",
      "#164E63"
    ],
    "emoji": "🏔️",
    "overview": "Patagonia is the kind of place that recalibrates your sense of scale. The granite spires of Torres del Paine rise almost vertically from the steppe. The Perito Moreno glacier groans and calves car-sized icebergs into turquoise water. Condors drift overhead without a wingbeat. This is the southern edge of the Americas, shared between Argentina and Chile, and it is one of the last truly wild places on earth. It demands physical effort and rewards it with landscapes that feel like they belong to another planet.",
    "highlights": [
      "Torres del Paine",
      "Perito Moreno Glacier",
      "Los Glaciares National Park",
      "Tierra del Fuego",
      "El Chaltén"
    ],
    "bestTime": "November–March (Southern Hemisphere summer)",
    "language": "Spanish",
    "currency": "Argentine Peso (ARS)",
    "timezone": "ART (UTC−3)",
    "climate": "Sub-polar — unpredictable, with four seasons in a day",
    "quickFacts": [
      {
        "label": "Area",
        "value": "1 million km²"
      },
      {
        "label": "UNESCO Sites",
        "value": "Los Glaciares (1981)"
      },
      {
        "label": "Famous trek",
        "value": "W-Circuit (5 days)"
      },
      {
        "label": "Wildlife",
        "value": "Puma, condor, guanaco"
      }
    ],
    "experiences": [
      {
        "id": "e3-1",
        "title": "Ice Trek on Perito Moreno Glacier",
        "type": "Adventure",
        "duration": "Full day",
        "groupSize": "Up to 10",
        "price": 180,
        "rating": 5,
        "reviews": 634,
        "emoji": "🧊",
        "description": "Strap on crampons and walk across one of the world\"s few advancing glaciers with a certified mountain guide. Navigate crevasses, ice tunnels, and vivid blue meltwater pools — then toast with a whisky cooled by 10,000-year-old ice.",
        "tags": [
          "Bucket List",
          "Physical",
          "Epic"
        ],
        "highlight": true
      },
      {
        "id": "e3-2",
        "title": "W-Circuit Guided Trek (5 Days)",
        "type": "Adventure",
        "duration": "5 days",
        "groupSize": "Up to 8",
        "price": 1100,
        "rating": 4.9,
        "reviews": 412,
        "emoji": "🥾",
        "description": "The classic Torres del Paine traverse. Five days of world-class hiking through granite towers, emerald lakes, and the Grey Glacier — with all permits, refugio accommodation, and a bilingual naturalist guide included.",
        "tags": [
          "Multi-Day",
          "Trekking",
          "All-Inclusive"
        ],
        "highlight": false
      },
      {
        "id": "e3-3",
        "title": "Puma-Tracking at Dawn in Patagonian Steppe",
        "type": "Wildlife",
        "duration": "6 hours",
        "groupSize": "Up to 6",
        "price": 220,
        "rating": 4.9,
        "reviews": 187,
        "emoji": "🐾",
        "description": "Join wildlife photographer-guides before dawn to track puma in the rolling steppe outside Torres del Paine. Patagonia has one of the world\"s highest-density puma populations, and sighting rates in season exceed 85%.",
        "tags": [
          "Wildlife",
          "Photography",
          "Rare"
        ],
        "highlight": true
      },
      {
        "id": "e3-4",
        "title": "Kayak the Grey Lake Among Icebergs",
        "type": "Adventure",
        "duration": "4 hours",
        "groupSize": "Up to 8",
        "price": 135,
        "rating": 4.8,
        "reviews": 298,
        "emoji": "🛶",
        "description": "Paddle silently among turquoise icebergs calved from the Grey Glacier. Your guide explains glaciology, Patagonian ecology, and how each iceberg\"s colour reveals its age and density.",
        "tags": [
          "Kayaking",
          "Scenic",
          "Nature"
        ],
        "highlight": false
      }
    ]
  },
  {
    "id": 4,
    "slug": "marrakech",
    "name": "Marrakech",
    "country": "Morocco",
    "region": "Africa",
    "tags": [
      "Culture",
      "Food",
      "City"
    ],
    "rating": 4.7,
    "reviews": 2930,
    "price": 890,
    "duration": "6 days",
    "featured": true,
    "badge": "Hot Deal",
    "badgeColor": "badge-warning",
    "description": "Medinas, souks, tagines and riads — a full sensory overload in the most wonderful sense.",
    "gradient": "from-orange-900 via-amber-700 to-yellow-600",
    "gradientHex": [
      "#7C2D12",
      "#B45309",
      "#CA8A04"
    ],
    "emoji": "🕌",
    "overview": "Marrakech has been a crossroads of culture, trade, and art for nearly a thousand years, and that energy is still palpable the moment you pass through the Medina walls. The souks are a labyrinth of leather-workers, spice merchants, lantern-makers, and weavers — all negotiating in at least three languages. Jemaa el-Fna square transforms from a juice-and-food market by day to a spectacle of storytellers, acrobats, and snake-charmers by night. Behind ornate wooden doors, riads offer cool courtyards and silence so complete it feels deliberate. Marrakech is an assault on the senses and one of the world\"s most rewarding cities to get lost in.",
    "highlights": [
      "Jemaa el-Fna Square",
      "Majorelle Garden",
      "Bahia Palace",
      "Souk Semmarine",
      "Koutoubia Mosque"
    ],
    "bestTime": "March–May or September–November (cooler temps)",
    "language": "Arabic, Berber, French",
    "currency": "Moroccan Dirham (MAD)",
    "timezone": "WET (UTC+1)",
    "climate": "Semi-arid — hot summers, mild winters",
    "quickFacts": [
      {
        "label": "Old city",
        "value": "UNESCO World Heritage Site"
      },
      {
        "label": "Founded",
        "value": "1070 AD"
      },
      {
        "label": "Famous for",
        "value": "Souks & riads"
      },
      {
        "label": "Day trip",
        "value": "Atlas Mountains (1hr)"
      }
    ],
    "experiences": [
      {
        "id": "e4-1",
        "title": "Souk Secrets Food & Craft Walk",
        "type": "Food",
        "duration": "3 hours",
        "groupSize": "Up to 10",
        "price": 65,
        "rating": 4.8,
        "reviews": 921,
        "emoji": "🧆",
        "description": "A local artisan and chef guide you through the spice souks, a traditional hammam neighborhood, and into a family home for a cooking demonstration and shared lunch of pastilla, harira, and fresh-baked msemen.",
        "tags": [
          "Food",
          "Local Life",
          "Authentic"
        ],
        "highlight": true
      },
      {
        "id": "e4-2",
        "title": "Sunset Camel Trek in the Palmeraie",
        "type": "Adventure",
        "duration": "2.5 hours",
        "groupSize": "Up to 12",
        "price": 55,
        "rating": 4.6,
        "reviews": 1102,
        "emoji": "🐪",
        "description": "Ride through the ancient palmeraie north of the Medina as the sun drops behind the Atlas Mountains, painting everything amber and rose. Mint tea and dates served at a Berber tent at the turnaround point.",
        "tags": [
          "Sunset",
          "Classic",
          "Family-Friendly"
        ],
        "highlight": false
      },
      {
        "id": "e4-3",
        "title": "Hammam & Argan Massage Ritual",
        "type": "Wellness",
        "duration": "2 hours",
        "groupSize": "Private",
        "price": 90,
        "rating": 4.9,
        "reviews": 543,
        "emoji": "🛁",
        "description": "Experience the centuries-old Moroccan bathing ritual at a traditional hammam — kessa scrub, rhassoul clay mask, and a full-body massage using locally pressed argan oil. Arranged in an authentic local hammam (not a tourist spa).",
        "tags": [
          "Wellness",
          "Traditional",
          "Private"
        ],
        "highlight": false
      },
      {
        "id": "e4-4",
        "title": "Majorelle Garden & YSL Museum Private Evening",
        "type": "Culture",
        "duration": "3 hours",
        "groupSize": "Up to 8",
        "price": 120,
        "rating": 4.9,
        "reviews": 312,
        "emoji": "🌿",
        "description": "After the crowds leave, a curator walks you privately through Jacques Majorelle\"s electric-blue garden and the adjoining Yves Saint Laurent Museum — with the story of how two Frenchmen fell in love with Marrakech and transformed its cultural landscape.",
        "tags": [
          "Art",
          "After-Hours",
          "Exclusive"
        ],
        "highlight": true
      },
      {
        "id": "e4-5",
        "title": "Atlas Mountains Day Trek & Berber Village Lunch",
        "type": "Adventure",
        "duration": "Full day",
        "groupSize": "Up to 10",
        "price": 95,
        "rating": 4.8,
        "reviews": 478,
        "emoji": "⛰️",
        "description": "Drive an hour to the Ourika Valley and hike through terraced Berber villages, walnut groves, and mountain streams to a waterfall. Lunch at a family home: lamb couscous, fresh bread, and a view worth a thousand photos.",
        "tags": [
          "Hiking",
          "Cultural",
          "Day Trip"
        ],
        "highlight": false
      }
    ]
  },
  {
    "id": 5,
    "slug": "bali",
    "name": "Bali",
    "country": "Indonesia",
    "region": "Asia",
    "tags": [
      "Beach",
      "Culture",
      "Adventure"
    ],
    "rating": 4.8,
    "reviews": 7841,
    "price": 980,
    "duration": "8 days",
    "featured": false,
    "badge": null,
    "badgeColor": "",
    "description": "Terraced rice paddies, sacred temples and surf breaks that make mornings feel infinite.",
    "gradient": "from-green-900 via-emerald-800 to-lime-700",
    "gradientHex": [
      "#14532D",
      "#065F46",
      "#3F6212"
    ],
    "emoji": "🌴",
    "overview": "Bali is many things at once: a surfer\"s paradise in Canggu, a spiritual heartland in Ubud, a beach resort in Seminyak, and an ancient Hindu kingdom in Besakih. What ties it all together is a deeply felt culture of ceremony and offering — canang sari flower baskets appear on every threshold, gamelan music drifts from temple courtyards, and every full moon brings festivals that fill the streets with incense and color. The rice paddies of Tegallalang, carved in perfect terraces into hillsides, tell the story of a civilisation that has shaped its landscape for a thousand years.",
    "highlights": [
      "Tegallalang Rice Terraces",
      "Uluwatu Temple",
      "Seminyak Beach",
      "Sacred Monkey Forest",
      "Mount Batur Volcano"
    ],
    "bestTime": "April–October (dry season)",
    "language": "Balinese, Indonesian",
    "currency": "Indonesian Rupiah (IDR)",
    "timezone": "WITA (UTC+8)",
    "climate": "Tropical — distinct wet and dry seasons",
    "quickFacts": [
      {
        "label": "Religion",
        "value": "Balinese Hinduism"
      },
      {
        "label": "Surf season",
        "value": "May–September"
      },
      {
        "label": "Ceremonies",
        "value": "Year-round, ~20,000/year"
      },
      {
        "label": "Famous dish",
        "value": "Babi guling (suckling pig)"
      }
    ],
    "experiences": [
      {
        "id": "e5-1",
        "title": "Mount Batur Sunrise Trek",
        "type": "Adventure",
        "duration": "6 hours",
        "groupSize": "Up to 10",
        "price": 45,
        "rating": 4.8,
        "reviews": 3201,
        "emoji": "🌋",
        "description": "Begin hiking at 2am, reach the active volcano\"s rim just as the sky turns pink and gold over Lake Batur. A local Batur tribe guide leads the way; breakfast of eggs cooked in volcanic steam at the summit.",
        "tags": [
          "Sunrise",
          "Hiking",
          "Volcanic"
        ],
        "highlight": true
      },
      {
        "id": "e5-2",
        "title": "Ubud Cooking Class with Market Visit",
        "type": "Food",
        "duration": "4 hours",
        "groupSize": "Up to 8",
        "price": 55,
        "rating": 4.9,
        "reviews": 1845,
        "emoji": "🥘",
        "description": "Shop at Ubud\"s dawn market with a Balinese chef, selecting fresh spices and produce. Then cook six traditional dishes — satay lilit, black rice pudding, sambal matah — in an open-air kitchen surrounded by rice paddies.",
        "tags": [
          "Cooking",
          "Market",
          "Traditional"
        ],
        "highlight": false
      },
      {
        "id": "e5-3",
        "title": "Sacred Temples & Offerings Ceremony Walk",
        "type": "Culture",
        "duration": "3 hours",
        "groupSize": "Up to 8",
        "price": 60,
        "rating": 4.9,
        "reviews": 967,
        "emoji": "🙏",
        "description": "Walk with a pemangku (temple priest) through Ubud\"s most sacred sites, learn the meaning behind daily offerings and ceremony dress, and participate in a traditional blessing ritual at Tirta Empul holy spring.",
        "tags": [
          "Spiritual",
          "Immersive",
          "Respectful"
        ],
        "highlight": true
      },
      {
        "id": "e5-4",
        "title": "Surf Lesson at Echo Beach, Canggu",
        "type": "Adventure",
        "duration": "2.5 hours",
        "groupSize": "Up to 6",
        "price": 40,
        "rating": 4.7,
        "reviews": 2134,
        "emoji": "🏄",
        "description": "Canggu\"s black-sand beach breaks are perfect for learning. An ISA-certified local instructor gets even complete beginners standing in one session, then guides you to the best lunch warung on the beach.",
        "tags": [
          "Surfing",
          "Beginner-Friendly",
          "Beach"
        ],
        "highlight": false
      }
    ]
  },
  {
    "id": 6,
    "slug": "queenstown",
    "name": "Queenstown",
    "country": "New Zealand",
    "region": "Oceania",
    "tags": [
      "Adventure",
      "Mountains"
    ],
    "rating": 4.9,
    "reviews": 2214,
    "price": 1870,
    "duration": "7 days",
    "featured": false,
    "badge": "Adventure Hub",
    "badgeColor": "badge-info",
    "description": "Bungee jumping, skiing, and lake views so dramatic they almost feel staged.",
    "gradient": "from-sky-900 via-blue-800 to-indigo-700",
    "gradientHex": [
      "#0C4A6E",
      "#1E40AF",
      "#3730A3"
    ],
    "emoji": "🪂",
    "overview": "Queenstown sits on the shores of Lake Wakatipu, cradled by the jagged Remarkables mountain range, in New Zealand\"s South Island. It invented modern adventure tourism — the world\"s first commercial bungee jump happened here in 1988 — and it has never looked back. But Queenstown is more than adrenaline: it\"s also a wine destination (Central Otago pinot noir is world-class), a gateway to Milford Sound, and a town with a genuine culinary scene punching well above its small-city weight. The scenery is the kind that makes you stop mid-sentence to just stare.",
    "highlights": [
      "Kawarau Bungee Bridge",
      "Milford Sound",
      "The Remarkables Ski Area",
      "Queenstown Hill Track",
      "Gibbston Valley Wineries"
    ],
    "bestTime": "December–February (summer) or June–August (ski season)",
    "language": "English, Māori",
    "currency": "New Zealand Dollar (NZD)",
    "timezone": "NZST (UTC+12)",
    "climate": "Alpine — warm summers, snowy winters",
    "quickFacts": [
      {
        "label": "Bungee born",
        "value": "1988, Kawarau Bridge"
      },
      {
        "label": "Wine region",
        "value": "Central Otago Pinot Noir"
      },
      {
        "label": "Closest fjord",
        "value": "Milford Sound (4hr drive)"
      },
      {
        "label": "Airport",
        "value": "Queenstown Airport (ZQN)"
      }
    ],
    "experiences": [
      {
        "id": "e6-1",
        "title": "Original Kawarau Bridge Bungee Jump",
        "type": "Adventure",
        "duration": "2 hours",
        "groupSize": "Individual",
        "price": 165,
        "rating": 4.9,
        "reviews": 5421,
        "emoji": "🪂",
        "description": "Jump from the original 1988 bungee site — a 43m drop above the turquoise Kawarau River. AJ Hackett\"s crew have run over 500,000 jumps without a serious incident. Includes riverside viewing deck for your group.",
        "tags": [
          "Adrenaline",
          "Iconic",
          "Bucket List"
        ],
        "highlight": true
      },
      {
        "id": "e6-2",
        "title": "Milford Sound Cruise & Overnight Stay",
        "type": "Nature",
        "duration": "2 days",
        "groupSize": "Up to 12",
        "price": 390,
        "rating": 5,
        "reviews": 812,
        "emoji": "🚢",
        "description": "Drive the dramatic Homer Tunnel road to Milford Sound — a UNESCO World Heritage fjord of sheer cliffs, waterfalls, and resident dolphins — then overnight on a small vessel anchored in the fjord for a silent, starlit evening.",
        "tags": [
          "Overnight",
          "Nature",
          "UNESCO"
        ],
        "highlight": true
      },
      {
        "id": "e6-3",
        "title": "Heli-Ski on the Remarkables",
        "type": "Adventure",
        "duration": "Full day",
        "groupSize": "Up to 4",
        "price": 850,
        "rating": 5,
        "reviews": 234,
        "emoji": "🎿",
        "description": "A helicopter drops you on untouched powder runs at 2,000m+ with a certified ski guide. South Island snowpack is legendary — deep, dry, and consistent. For intermediate-to-expert skiers only.",
        "tags": [
          "Skiing",
          "Heli",
          "Expert"
        ],
        "highlight": false
      },
      {
        "id": "e6-4",
        "title": "Central Otago Pinot Noir Vineyard Tour",
        "type": "Food",
        "duration": "4 hours",
        "groupSize": "Up to 10",
        "price": 145,
        "rating": 4.8,
        "reviews": 441,
        "emoji": "🍇",
        "description": "Visit three Gibbston Valley estates — the world\"s southernmost wine region — with a sommelier guide. Taste barrel samples, meet winemakers, and pair Otago pinot with local cheeses in a historic schist stone cellar.",
        "tags": [
          "Wine",
          "Scenic",
          "Gourmet"
        ],
        "highlight": false
      }
    ]
  },
  {
    "id": 7,
    "slug": "tuscany",
    "name": "Tuscany",
    "country": "Italy",
    "region": "Europe",
    "tags": [
      "Food",
      "Culture"
    ],
    "rating": 4.8,
    "reviews": 4102,
    "price": 1540,
    "duration": "9 days",
    "featured": false,
    "badge": null,
    "badgeColor": "",
    "description": "Rolling vineyards, Renaissance art, and food so good you'll restructure your entire life around it.",
    "gradient": "from-amber-900 via-orange-800 to-red-700",
    "gradientHex": [
      "#78350F",
      "#9A3412",
      "#B91C1C"
    ],
    "emoji": "🍷",
    "overview": "Tuscany is a civilisation as much as a place. Its hilltop towns — Siena, San Gimignano, Montepulciano — were built during the Renaissance and have barely changed since. The Val d\"Orcia, a UNESCO landscape of cypress-lined roads and rolling ochre hills, looks exactly like a Renaissance painting because that\"s exactly what it is: painters worked from life here for centuries. The food and wine have an authority that comes from doing the same thing for generations: Chianti, Brunello di Montalcino, bistecca Fiorentina, ribollita, pici. It is a region where eating well is considered a form of cultural participation.",
    "highlights": [
      "Val d'Orcia",
      "Florence's Uffizi Gallery",
      "Siena's Piazza del Campo",
      "Chianti Wine Route",
      "San Gimignano Towers"
    ],
    "bestTime": "April–June or September–October (harvest season)",
    "language": "Italian",
    "currency": "Euro (€)",
    "timezone": "CET (UTC+1)",
    "climate": "Mediterranean — hot summers, mild winters",
    "quickFacts": [
      {
        "label": "UNESCO sites",
        "value": "7 in Tuscany alone"
      },
      {
        "label": "Wine DOCGs",
        "value": "Chianti, Brunello, Morellino"
      },
      {
        "label": "Harvest season",
        "value": "September–October"
      },
      {
        "label": "Truffle season",
        "value": "White: Oct–Dec, Black: Nov–Mar"
      }
    ],
    "experiences": [
      {
        "id": "e7-1",
        "title": "Chianti Classico Wine Harvest Experience",
        "type": "Food",
        "duration": "Full day",
        "groupSize": "Up to 8",
        "price": 185,
        "rating": 4.9,
        "reviews": 634,
        "emoji": "🍇",
        "description": "Join a working harvest at a fifth-generation Chianti estate (September–October). Pick grapes by hand, stomp them in the traditional way, tour the cantina, then lunch with the family on homemade pici, wild boar ragù, and estate wine.",
        "tags": [
          "Seasonal",
          "Hands-On",
          "Family Farm"
        ],
        "highlight": true
      },
      {
        "id": "e7-2",
        "title": "Private Uffizi Gallery Early Access Tour",
        "type": "Culture",
        "duration": "3 hours",
        "groupSize": "Up to 6",
        "price": 160,
        "rating": 5,
        "reviews": 421,
        "emoji": "🎨",
        "description": "Before the gallery opens to the public, your private art historian guide leads you through Botticelli, Leonardo, Caravaggio, and Raphael without the crowds. Includes breakfast in the gallery\"s loggia overlooking the Arno.",
        "tags": [
          "Art",
          "Early Access",
          "Exclusive"
        ],
        "highlight": true
      },
      {
        "id": "e7-3",
        "title": "Truffle Hunt in the Crete Senesi",
        "type": "Food",
        "duration": "4 hours",
        "groupSize": "Up to 8",
        "price": 130,
        "rating": 4.8,
        "reviews": 312,
        "emoji": "🍄",
        "description": "Hunt for white and black truffles with a trifolao and his trained dogs in the forested hills south of Siena. Return to his farmhouse for a truffle-forward lunch: bruschetta, risotto, pasta, all with fresh-shaved truffles.",
        "tags": [
          "Foraging",
          "Seasonal",
          "Gourmet"
        ],
        "highlight": false
      },
      {
        "id": "e7-4",
        "title": "Cooking Class in a Val d'Orcia Farmhouse",
        "type": "Food",
        "duration": "4 hours",
        "groupSize": "Up to 8",
        "price": 110,
        "rating": 4.9,
        "reviews": 541,
        "emoji": "🫕",
        "description": "A nonnas and Michelin-trained chef collaborate to teach the soul of Tuscan cooking: fresh pasta from scratch, ribollita, cantucci, vin santo — in a stone farmhouse with a terrace looking out over the UNESCO Val d'Orcia landscape.",
        "tags": [
          "Cooking",
          "Scenic",
          "Traditional"
        ],
        "highlight": false
      }
    ]
  },
  {
    "id": 8,
    "slug": "serengeti",
    "name": "Serengeti",
    "country": "Tanzania",
    "region": "Africa",
    "tags": [
      "Wildlife",
      "Adventure"
    ],
    "rating": 5,
    "reviews": 987,
    "price": 3200,
    "duration": "8 days",
    "featured": true,
    "badge": "Once in a Lifetime",
    "badgeColor": "badge-secondary",
    "description": "The Great Migration. Predators at dawn. Horizons that stretch beyond imagination.",
    "gradient": "from-yellow-900 via-amber-800 to-orange-600",
    "gradientHex": [
      "#78350F",
      "#92400E",
      "#EA580C"
    ],
    "emoji": "🦁",
    "overview": "The Serengeti is the oldest and largest unbroken ecosystem in the world. Across 30,000 km² of golden savannah, acacia woodland, and granite kopjes, 2 million wildebeest, zebra, and gazelle move in an annual clockwise loop following rainfall — the Great Migration, the largest overland migration of animals on the planet. At the crossings, Nile crocodiles wait in the Mara River. Lions and cheetah hunt at dawn. Elephants move in family groups through the acacia corridors. This is natural history at a scale that erases every other benchmark you have for wildlife.",
    "highlights": [
      "Wildebeest River Crossings",
      "Ngorongoro Crater",
      "Serengeti Central Plains",
      "Grumeti Corridor",
      "Balloon Safari at Dawn"
    ],
    "bestTime": "July–October (Great Migration river crossings) or Jan–Feb (calving)",
    "language": "Swahili, English",
    "currency": "Tanzanian Shilling (TZS)",
    "timezone": "EAT (UTC+3)",
    "climate": "Tropical savannah — two wet seasons, two dry",
    "quickFacts": [
      {
        "label": "Size",
        "value": "30,000 km² national park"
      },
      {
        "label": "UNESCO status",
        "value": "World Heritage Site"
      },
      {
        "label": "Big Five",
        "value": "All present"
      },
      {
        "label": "Migration animals",
        "value": "~2 million"
      }
    ],
    "experiences": [
      {
        "id": "e8-1",
        "title": "Hot Air Balloon Safari at Sunrise",
        "type": "Adventure",
        "duration": "4 hours",
        "groupSize": "Up to 12",
        "price": 550,
        "rating": 5,
        "reviews": 712,
        "emoji": "🎈",
        "description": "Float silently above the plains at dawn as the Serengeti wakes below — herds moving, predators finishing nighttime hunts, the horizon blazing orange. Includes a Champagne bush breakfast after landing in the wilderness.",
        "tags": [
          "Dawn",
          "Aerial",
          "Champagne"
        ],
        "highlight": true
      },
      {
        "id": "e8-2",
        "title": "Great Migration River Crossing Game Drive",
        "type": "Wildlife",
        "duration": "Full day",
        "groupSize": "Up to 6",
        "price": 320,
        "rating": 5,
        "reviews": 534,
        "emoji": "🦬",
        "description": "Position at the Mara River crossing points for hours-long vigils as thousands of wildebeest work up the courage to cross — and crocodiles explode from the water. Your naturalist guide tracks migration patterns via daily radio reports from the field.",
        "tags": [
          "Bucket List",
          "Wildlife",
          "Migration"
        ],
        "highlight": true
      },
      {
        "id": "e8-3",
        "title": "Walking Safari with Maasai Warrior Guide",
        "type": "Culture",
        "duration": "3 hours",
        "groupSize": "Up to 6",
        "price": 145,
        "rating": 4.9,
        "reviews": 287,
        "emoji": "🚶",
        "description": "Walk the bush at a human pace with a Maasai warrior-guide who reads tracks, dung, and broken grass to tell the story of what passed in the night. A profoundly different experience from a vehicle — every sense switched on.",
        "tags": [
          "Walking",
          "Cultural",
          "Immersive"
        ],
        "highlight": false
      },
      {
        "id": "e8-4",
        "title": "Ngorongoro Crater Full-Day Game Drive",
        "type": "Wildlife",
        "duration": "Full day",
        "groupSize": "Up to 6",
        "price": 280,
        "rating": 4.9,
        "reviews": 423,
        "emoji": "🐘",
        "description": "Descend into the world\"s largest intact volcanic caldera — a natural enclosure for one of the densest concentrations of wildlife on earth, including black rhino, lion, elephant, and flamingo on a soda lake. One of Africa\"s great wildlife spectacles.",
        "tags": [
          "UNESCO",
          "Big Five",
          "Day Trip"
        ],
        "highlight": false
      }
    ]
  },
  {
    "id": 9,
    "slug": "lisbon",
    "name": "Lisbon",
    "country": "Portugal",
    "region": "Europe",
    "tags": [
      "City",
      "Culture",
      "Food"
    ],
    "rating": 4.7,
    "reviews": 3511,
    "price": 1100,
    "duration": "5 days",
    "featured": false,
    "badge": "Underrated",
    "badgeColor": "badge-primary",
    "description": "Trams, fado, pastel de nata, and seven hills worth of wandering. Europe's most soulful city.",
    "gradient": "from-blue-900 via-violet-800 to-purple-700",
    "gradientHex": [
      "#1E3A5F",
      "#4C1D95",
      "#6D28D9"
    ],
    "emoji": "🚃",
    "overview": "Lisbon is the kind of European capital that still feels like a secret even when it isn\"t. Built across seven hills above the Tagus estuary, it rewards walking with constant surprise: a miradouro terrace with pastéis de nata and a 360-degree view, a tile-covered building that turns out to be a train station, a fado bar so small you have to hold your drink above your head to let the singer through. It is Portugal\"s window on the Atlantic — the city that launched the Age of Discovery and still carries a certain melancholy grandeur in its Manueline architecture, its azulejo tile traditions, and the aching longing of fado music.",
    "highlights": [
      "Belém Tower",
      "Alfama District",
      "LX Factory",
      "Time Out Market",
      "Sintra Day Trip"
    ],
    "bestTime": "March–May or September–November",
    "language": "Portuguese",
    "currency": "Euro (€)",
    "timezone": "WET (UTC+0)",
    "climate": "Mediterranean — mild and sunny most of the year",
    "quickFacts": [
      {
        "label": "Oldest capital",
        "value": "Oldest in Western Europe"
      },
      {
        "label": "Famous pastry",
        "value": "Pastel de nata"
      },
      {
        "label": "Music genre",
        "value": "Fado (UNESCO Heritage)"
      },
      {
        "label": "Day trip",
        "value": "Sintra (40min by train)"
      }
    ],
    "experiences": [
      {
        "id": "e9-1",
        "title": "Alfama Fado Evening: Dinner & Live Performance",
        "type": "Culture",
        "duration": "4 hours",
        "groupSize": "Up to 10",
        "price": 105,
        "rating": 5,
        "reviews": 1102,
        "emoji": "🎸",
        "description": "Dine on petiscos (Portuguese tapas) in a family-run Alfama tasca while a guitarist and two fadistas perform the saudade-soaked traditional songs that gave this neighbourhood its soul. One of the most atmospheric evenings in Europe.",
        "tags": [
          "Music",
          "Dinner",
          "Authentic"
        ],
        "highlight": true
      },
      {
        "id": "e9-2",
        "title": "Time Out Market & Bairro Alto Food Crawl",
        "type": "Food",
        "duration": "3 hours",
        "groupSize": "Up to 10",
        "price": 70,
        "rating": 4.8,
        "reviews": 876,
        "emoji": "🥐",
        "description": "A local chef takes you through Time Out Market for the best bites — Joao Rodrigues\"s croquettes, Henrique Sá Pessoa\"s octopus — then into Bairro Alto\"s tiny grocery bars for ginjinha, petiscos, and the stories behind them.",
        "tags": [
          "Food",
          "Market",
          "Neighbourhood"
        ],
        "highlight": false
      },
      {
        "id": "e9-3",
        "title": "Sintra Palaces & Pena Park Private Tour",
        "type": "Culture",
        "duration": "Full day",
        "groupSize": "Up to 8",
        "price": 130,
        "rating": 4.9,
        "reviews": 654,
        "emoji": "🏰",
        "description": "A 40-minute train ride delivers you to a UNESCO mountain village of Romantic palaces, Arabian-style castles, and English-style gardens. Your private guide navigates the park\"s secrets and avoids the worst tourist bottlenecks.",
        "tags": [
          "UNESCO",
          "Day Trip",
          "History"
        ],
        "highlight": true
      },
      {
        "id": "e9-4",
        "title": "Azulejo Tile Workshop in a 19th-Century Factory",
        "type": "Culture",
        "duration": "2.5 hours",
        "groupSize": "Up to 8",
        "price": 75,
        "rating": 4.7,
        "reviews": 389,
        "emoji": "🔷",
        "description": "Learn the 500-year art of hand-painting azulejo tiles at a workshop inside a working 19th-century factory. Design, fire, and take home your own panel. Includes a curator-led walk through the factory\"s extraordinary historic tile collection.",
        "tags": [
          "Art",
          "Hands-On",
          "Souvenir"
        ],
        "highlight": false
      }
    ]
  }
]

export function getDestinationById(id) {
  return destinations.find((d) => d.id === Number(id)) ?? null;
}

export function getDestinationBySlug(slug) {
  return destinations.find((d) => d.slug === slug) ?? null;
}