const regionWord      = document.getElementById('region-word');
const answer          = document.getElementById('answer');
const keyboardButtons = document.querySelectorAll(".key");
const manLimbs        = document.querySelectorAll(".man");
const tipField        = document.getElementById('tip');

const canvas   = document.getElementById('canvas');
const head     = document.getElementById("head");
const body     = document.getElementById("body");
const leftArm  = document.getElementById("left-arm");
const rightArm = document.getElementById("right-arm");
const leftLeg  = document.getElementById("left-leg");
const rightleg = document.getElementById("right-leg");

window.onload = function() {
    generate();
};

function generate() {
    randomNumberTip   = getRandomInt(0, words.length);
    randomNumberWords = getRandomInt(0, words[randomNumberTip].words.length);

    const tip  = words[randomNumberTip].tip;
    const word = words[randomNumberTip].words[randomNumberWords];

    refresh(tip, word);
}

function refresh(tip, word) {
    word = word.toUpperCase();
    answer.value = word;

    enableKeyboard();

    setTip(tip);

    regionWord.replaceChildren();

    console.log(word)
        
    let divWord = document.createElement("div");
    divWord.setAttribute("class", "div-word");

    for (let i = 0; i < word.length; i++) {

        if (word[i] == ' ') {
            regionWord.appendChild(divWord);

            divWord = document.createElement("div");
            divWord.setAttribute("class", "div-word");
        } else {
            const letter = document.createElement("p");

            letter.setAttribute("id",    "letter-" + i);
            letter.setAttribute("class", "letter");

            divWord.appendChild(letter);
        }
    }
    regionWord.appendChild(divWord);

    drawMan();
}

function keyClick(element) {
    const key = element.innerText;
    
    if (answer.value.includes(key)) {
        for (let i = 0; i < answer.value.length; i++) {
            if (key == answer.value[i]) {
                const correctLetter = document.getElementById("letter-" + i);
                correctLetter.innerText = key;

            }
        }
    } else {
        removeLimb();
    }
    element.disabled = true;
}

document.addEventListener("keypress", (event) => {
    let keyTyped = event.key.toUpperCase();

    if (answer.value.includes(keyTyped)) {
        for (let i = 0; i < answer.value.length; i++) {
            if (keyTyped == answer.value[i]) {
                const correctLetter = document.getElementById("letter-" + i);
                correctLetter.innerText = keyTyped;

                keyboardButtons.forEach(button => {
                    if (keyTyped == button.innerText) {
                        button.disabled = true;
                    }
                });
            }
        }
    } else {
        removeLimb();
    }
})

function enableKeyboard() {
    keyboardButtons.forEach(button => {
        button.disabled = false;
    });
}

function setTip(tip) {
    tipField.innerText = 'Tip: ' + tip;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function removeLimb() {
    for (const limb of manLimbs) {
        if (limb.style.stroke == 'black') {
            limb.style.stroke = 'red';

            break;
        }
    }
}

function drawMan() {
    head.style.stroke     = "black";
    body.style.stroke     = "black";
    leftArm.style.stroke  = "black";
    rightArm.style.stroke = "black";
    leftLeg.style.stroke  = "black";
    rightleg.style.stroke = "black";
}

const words = [
    {
        tip: "Fruits",
        words: [
        "apple", "banana", "orange", "strawberry", "grape", "watermelon", "pineapple", "mango", "peach", "pear",
        "cherry", "blueberry", "raspberry", "blackberry", "kiwi", "plum", "lemon", "lime", "coconut", "papaya",
        "fig", "pomegranate", "apricot", "avocado", "cantaloupe", "dragonfruit", "guava", "lychee", "passionfruit", "persimmon",
        "tangerine", "grapefruit", "cranberry", "date", "elderberry", "gooseberry", "jackfruit", "kumquat", "mulberry", "nectarine",
        "quince", "starfruit", "rambutan", "durian", "soursop", "breadfruit", "boysenberry", "plantain", "currant", "clementine",
        "damson", "feijoa", "jabuticaba", "longan", "loquat", "maracuja", "mangosteen", "marula", "medlar", "miracle fruit",
        "monstera", "mulberry", "olive", "pawpaw", "pepino", "pitaya", "plumcot", "salak", "satsuma", "tamarind", "ugli fruit",
        "yuzu", "ackee", "bilberry", "blackcurrant", "cloudberry", "crowberry", "huckleberry", "lingonberry", "marionberry", "redcurrant",
        "salalberry", "sea buckthorn", "serviceberry", "salmonberry", "tayberry", "thimbleberry", "wineberry", "barberry", "chokeberry", "dewberry",
        "honeyberry", "jostaberry", "loganberry", "naranjilla", "pitanga", "surinam cherry", "yangmei", "white currant", "yellow watermelon", "blood orange"
        ]
    },
    {
        tip: "Professions",
        words: [
        "teacher", "programmer", "doctor", "nurse", "engineer", "architect", "lawyer", "chef", "artist", "musician",
        "pilot", "firefighter", "police officer", "dentist", "pharmacist", "veterinarian", "accountant", "actor", "journalist", "photographer",
        "mechanic", "electrician", "plumber", "carpenter", "baker", "barber", "tailor", "librarian", "psychologist", "scientist",
        "biologist", "chemist", "physicist", "astronomer", "geologist", "economist", "historian", "translator", "writer", "editor",
        "designer", "illustrator", "animator", "filmmaker", "director", "producer", "detective", "judge", "politician", "diplomat",
        "real estate agent", "salesperson", "banker", "financial analyst", "receptionist", "flight attendant", "waiter", "bartender", "gardener", "farmer",
        "fisherman", "miner", "welder", "machinist", "mason", "painter", "surveyor", "urban planner", "sociologist", "archaeologist",
        "anthropologist", "philosopher", "mathematician", "statistician", "data analyst", "system administrator", "cybersecurity specialist", "web developer", "game developer", "devops engineer",
        "paramedic", "surgeon", "optometrist", "physiotherapist", "radiologist", "anesthesiologist", "pediatrician", "dermatologist", "neurologist", "psychiatrist",
        "flight engineer", "air traffic controller", "ship captain", "bus driver", "train conductor", "truck driver", "courier", "logistics manager", "event planner", "human resources manager"
        ]
    },
    {
        tip: "Animals",
        words: [
        "lion", "tiger", "elephant", "giraffe", "zebra", "cheetah", "leopard", "bear", "wolf", "fox",
        "kangaroo", "koala", "panda", "monkey", "gorilla", "chimpanzee", "hippopotamus", "rhinoceros", "crocodile", "alligator",
        "dolphin", "whale", "shark", "octopus", "squid", "seal", "walrus", "penguin", "eagle", "falcon", "owl", "hawk", "flamingo", "peacock", "parrot", "canary", "pigeon", "sparrow", "woodpecker", "hummingbird",
        "snake", "lizard", "chameleon", "turtle", "tortoise", "frog", "toad", "salamander", "beaver", "otter",
        "raccoon", "skunk", "squirrel", "chipmunk", "hedgehog", "porcupine", "bat", "sloth", "armadillo", "anteater",
        "camel", "llama", "alpaca", "yak", "bison", "buffalo", "moose", "deer", "antelope", "gazelle",
        "goat", "sheep", "cow", "horse", "donkey", "pig", "rabbit", "guinea pig", "hamster", "rat",
        "mouse", "cat", "dog", "hyena", "jackal", "dingo", "meerkat", "mongoose", "lemur", "capybara",
        "platypus", "tasmanian devil", "wombat", "wallaby", "cassowary", "emu", "ostrich", "kiwi", "pelican", "albatross"
        ]
    },
    {
        tip: "Countries",
        words: [
        "United States", "Canada", "Brazil", "Argentina", "Mexico", "United Kingdom", "France", "Germany", "Italy", "Spain",
        "Portugal", "Russia", "China", "Japan", "South Korea", "India", "Australia", "New Zealand", "Egypt", "South Africa",
        "Nigeria", "Kenya", "Morocco", "Saudi Arabia", "Turkey", "Greece", "Netherlands", "Belgium", "Switzerland", "Austria",
        "Sweden", "Norway", "Finland", "Denmark", "Ireland", "Poland", "Ukraine", "Czech Republic", "Hungary", "Romania",
        "Thailand", "Vietnam", "Indonesia", "Malaysia", "Singapore", "Philippines", "Pakistan", "Bangladesh", "Iran", "Iraq",
        "Colombia", "Peru", "Chile", "Venezuela", "Ecuador", "Bolivia", "Uruguay", "Paraguay", "Costa Rica", "Panama",
        "Cuba", "Jamaica", "Dominican Republic", "Algeria", "Tunisia", "Ghana", "Ethiopia", "Uganda", "Tanzania", "Zimbabwe",
        "Israel", "Jordan", "Lebanon", "United Arab Emirates", "Qatar", "Kuwait", "Oman", "Kazakhstan", "Uzbekistan", "Mongolia",
        "Nepal", "Sri Lanka", "Myanmar", "Cambodia", "Laos", "Croatia", "Serbia", "Slovakia", "Slovenia", "Bulgaria",
        "Iceland", "Luxembourg", "Malta", "Cyprus", "Estonia", "Latvia", "Lithuania", "Albania", "Georgia", "Armenia"
        ]
    },
    {
        tip: "Cities",
        words: [
        "New York", "London", "Tokyo", "Paris", "Berlin", "Rome", "Madrid", "Beijing", "Moscow", "Sydney",
        "Los Angeles", "Chicago", "Toronto", "Sao Paulo", "Buenos Aires", "Rio de Janeiro", "Mexico City", "Cairo", "Istanbul", "Dubai",
        "Seoul", "Singapore", "Hong Kong", "Bangkok", "Mumbai", "Delhi", "Shanghai", "Vienna", "Amsterdam", "Brussels",
        "Prague", "Budapest", "Warsaw", "Stockholm", "Oslo", "Copenhagen", "Helsinki", "Dublin", "Lisbon", "Barcelona",
        "Venice", "Florence", "Milan", "Munich", "Frankfurt", "Zurich", "Geneva", "Toronto", "Vancouver", "Montreal",
        "San Francisco", "Seattle", "Miami", "Las Vegas", "Washington", "Boston", "Houston", "Dallas", "Atlanta", "Philadelphia",
        "Melbourne", "Brisbane", "Auckland", "Wellington", "Cape Town", "Johannesburg", "Nairobi", "Casablanca", "Riyadh", "Doha",
        "Kuala Lumpur", "Jakarta", "Manila", "Hanoi", "Ho Chi Minh City", "Taipei", "Osaka", "Kyoto", "Santiago", "Lima", "Bogota", "Quito", "Montevideo", "Caracas", "Athens", "Dublin", "Edinburgh", "Manchester", "Liverpool", "Birmingham",
        "Reykjavik", "Tallinn", "Riga", "Vilnius", "Bratislava", "Ljubljana", "Zagreb", "Belgrade", "Bucharest", "Sofia"
        ]
    },
    {
        tip: "Sports",
        words: [
        "soccer", "basketball", "tennis", "volleyball", "baseball", "american football", "rugby", "cricket", "golf", "table tennis",
        "badminton", "ice hockey", "field hockey", "swimming", "athletics", "boxing", "judo", "karate", "taekwondo", "wrestling",
        "gymnastics", "skiing", "snowboarding", "skateboarding", "surfing", "cycling", "rowing", "canoeing", "kayaking", "fencing",
        "archery", "shooting", "weightlifting", "powerlifting", "crossfit", "triathlon", "marathon", "sailing", "equestrian", "polo",
        "squash", "racquetball", "handball", "water polo", "diving", "synchronised swimming", "figure skating", "speed skating", "bobsleigh", "curling",
        "lacrosse", "ultimate frisbee", "bowling", "billiards", "snooker", "darts", "motorcycling", "formula 1", "rally racing", "motocross",
        "parkour", "rock climbing", "bouldering", "mountaineering", "trail running", "orienteering", "kickboxing", "muay thai", "brazilian jiu jitsu", "mma",
        "sumo", "kendo", "aikido", "sambo", "capoeira", "paddle tennis", "pickleball", "dodgeball", "rounders", "netball",
        "korfball", "sepak takraw", "footvolley", "beach volleyball", "beach soccer", "futnet", "padel", "wheelchair basketball", "goalball", "boccia",
        "biathlon", "modern pentathlon", "nordic combined", "ski jumping", "luge", "skeleton", "wakeboarding", "kitesurfing", "windsurfing", "stand up paddleboarding"
        ]
    },
    {
        tip: "Colors",
        words: [
        "red", "blue", "yellow", "green", "orange", "purple", "pink", "brown", "black", "white",
        "gray", "violet", "indigo", "cyan", "magenta", "turquoise", "teal", "maroon", "navy blue", "gold",
        "silver", "bronze", "beige", "ivory", "amber", "amethyst", "aquamarine", "azure", "burgundy", "charcoal",
        "coral", "crimson", "emerald", "fuchsia", "jade", "lavender", "lime green", "mauve", "mustard", "olive",
        "peach", "periwinkle", "plum", "ruby", "salmon", "sapphire", "scarlet", "tan", "taupe", "topaz",
        "vermilion", "ochre", "sepia", "chartreuse", "cerulean", "khaki", "mint", "rose", "rust", "sand",
        "sea green", "sky blue", "slate", "copper", "brass", "champagne", "denim", "eggplant", "flax", "honeydew",
        "lemon", "lilac", "linen", "mahogany", "moss green", "mustard green", "orchid", "pistachio", "plum", "pumpkin",
        "raspberry color", "saffron", "sage", "sienna", "tangerine color", "thistle", "tomato color", "wheat", "wisteria", "zinc",
        "almond color", "apricot color", "avocado color", "baby blue", "baby pink", "chocolate", "cinnamon", "coffee color", "cream", "dandelion"
        ]
    },
    {
        tip: "Clothing",
        words: [
        "shirt", "t-shirt", "pants", "jeans", "shorts", "skirt", "dress", "suit", "jacket", "coat",
        "sweater", "hoodie", "cardigan", "blazer", "vest", "socks", "shoes", "sneakers", "boots", "sandals",
        "flip-flops", "slippers", "hat", "cap", "beanie", "scarf", "gloves", "mittens", "belt", "tie",
        "bow tie", "pajamas", "robe", "underwear", "bra", "panties", "boxers", "briefs", "swimsuit", "bikini", "trunks", "overalls", "raincoat", "trench coat", "parka", "windbreaker", "poncho", "leggings", "tights", "stockings",
        "kimono", "sari", "kilt", "tuxedo", "ball gown", "cocktail dress", "sundress", "tank top", "crop top", "polo shirt",
        "blouse", "tunic", "tracksuit", "leotard", "nightgown", "corset", "suspender", "earmuffs", "bandana", "beret",
        "fedora", "sombrero", "visor", "apron", "uniform", "wet suit", "dry suit", "cardigan", "overcoat", "pea coat",
        "duffle coat", "fleece jacket", "leather jacket", "denim jacket", "bomber jacket", "puffer jacket", "sweatpants", "chinos", "trousers", "cargo pants",
        "dungarees", "romper", "jumpsuit", "thermal underwear", "high heels", "loafers", "oxfords", "moccasins", "espadrilles", "clogs"
        ]
    },
    {
        tip: "Food",
        words: [
        "pizza", "burger", "pasta", "spaghetti", "sushi", "tacos", "burrito", "sandwich", "salad", "soup",
        "steak", "french fries", "pancakes", "waffles", "omelet", "ramen", "dumplings", "curry", "paella", "risotto",
        "lasagna", "macaroni and cheese", "fried chicken", "hot dog", "nachos", "quesadilla", "falafel", "hummus", "kebab", "shawarma",
        "pad thai", "pho", "spring rolls", "dim sum", "gyoza", "tempura", "sashimi", "ceviche", "empanada", "arepa",
        "fajitas", "chili con carne", "meatballs", "roast beef", "pork chops", "bbq ribs", "fish and chips", "clam chowder", "gumbo", "jambalaya",
        "pot roast", "shepherd's pie", "beef wellington", "chicken parmesan", "chicken tikka masala", "butter chicken", "biryani", "samosa", "naan", "pita",
        "croissant", "bagel", "pretzel", "crepe", "quiche", "fondue", "raclette", "gnocchi", "ravioli", "tortellini",
        "paella", "tapas", "gazpacho", "moussaka", "souvlaki", "tzatziki", "baba ghanoush", "tabbouleh", "stuffed peppers", "meatloaf",
        "casserole", "stew", "goulash", "bortsch", "pierogi", "schnitzel", "bratwurst", "sauerkraut", "poutine", "lobster roll",
        "crab cake", "shrimp cocktail", "oysters", "mussels", "calamari", "ceviche", "poke bowl", "teriyaki chicken", "tonkatsu", "yakitori"
        ]
    },
    {
        tip: "Desserts",
        words: [
        "cake", "ice cream", "chocolate", "cookie", "brownie", "cupcake", "donut", "pie", "tart", "pudding",
        "cheesecake", "muffin", "macaron", "eclair", "cinnamon roll", "churro", "waffle", "crepe", "sundae", "gelato",
        "sorbet", "mousse", "tiramisu", "panna cotta", "creme brulee", "souffle", "baklava", "fudge", "truffle", "marshmallow",
        "caramel", "toffee", "brittle", "candy", "lollipop", "gummy bear", "jelly", "custard", "flan", "pavlova",
        "apple pie", "pumpkin pie", "pecan pie", "lemon meringue pie", "key lime pie", "blueberry muffin", "chocolate chip cookie", "oatmeal raisin cookie", "snickerdoodle", "shortbread",
        "gingerbread", "biscotti", "fruitcake", "pound cake", "sponge cake", "red velvet cake", "carrot cake", "angel food cake", "lava cake", "black forest cake",
        "profiterole", "cannoli", "sfogliatella", "panettone", "stollen", "strudel", "trifle", "banoffee pie", "sticky toffee pudding", "eclair",
        "meringue", "baked alaska", "parfait", "frozen yogurt", "milkshake", "granita", "halva", "turkish delight", "blini", "churros with chocolate",
        "profiteroles", "zeppole", "beignet", "bavarian cream", "clafoutis", "financier", "madeleine", "operacake", "praline", "turnover",
        "danish pastry", "croissant", "pain au chocolat", "monkey bread", "funnel cake", "bear claw", "poached pear", "compote", "candied fruit", "marshmallow fluff"
        ]
    },
    {
        tip: "Drinks",
        words: [
        "water", "coffee", "tea", "milk", "juice", "soda", "lemonade", "iced tea", "espresso", "cappuccino",
        "latte", "macchiato", "mocha", "americano", "hot chocolate", "smoothie", "milkshake", "beer", "wine", "champagne",
        "whiskey", "vodka", "rum", "tequila", "gin", "cocktail", "margarita", "martini", "mojito", "sangria",
        "cider", "sparkling water", "tonic water", "energy drink", "sports drink", "coconut water", "green tea", "black tea", "herbal tea", "chai",
        "matcha", "kombucha", "kefir", "eggnog", "mulled wine", "prosecco", "cava", "cider", "sake", "soju",
        "bourbon", "scotch", "brandy", "cognac", "vermouth", "absinthe", "liqueur", "baileys", "amaretto", "schnapps",
        "piña colada", "bloody mary", "daiquiri", "old fashioned", "negroni", "cosmopolitan", "espresso martini", "manhattan", "whiskey sour", "gin and tonic",
        "apple juice", "orange juice", "cranberry juice", "pineapple juice", "grapefruit juice", "tomato juice", "mango juice", "pomegranate juice", "carrot juice", "vegetable juice",
        "flat white", "cortado", "cold brew", "nitro cold brew", "frappuccino", "bubble tea", "root beer", "ginger ale", "club soda", "flavored water",
        "almond milk", "soy milk", "oat milk", "rice milk", "coconut milk", "horchata", "agua fresca", "lassi", "mate", "iced coffee"
        ]
    },
    {
        tip: "Vehicles",
        words: [
        "car", "truck", "bus", "motorcycle", "bicycle", "scooter", "train", "subway", "tram", "airplane",
        "helicopter", "boat", "ship", "yacht", "submarine", "van", "pickup truck", "suv", "convertible", "sports car",
        "electric car", "hybrid car", "ambulance", "fire truck", "police car", "taxi", "tractor", "bulldozer", "excavator", "crane",
        "forklift", "garbage truck", "cement mixer", "dump truck", "limousine", "camper van", "rv", "trailer", "golf cart", "snowmobile",
        "jet ski", "hovercraft", "hot air balloon", "glider", "blimp", "rocket", "spaceship", "ferry", "cruise ship", "cargo ship",
        "tugboat", "speedboat", "sailboat", "canoe", "kayak", "gondola", "rickshaw", "monorail", "trolley", "cable car",
        "moped", "dirt bike", "atv", "quad bike", "segway", "skateboard", "roller skates", "hoverboard", "tricycle", "unicycle",
        "hearse", "street sweeper", "snowplow", "armored car", "tank", "armored personnel carrier", "fighter jet", "bomber", "cargo plane", "drone",
        "paddleboat", "rowboat", "catamaran", "houseboat", "barge", "dredger", "icebreaker", "steamboat", "galleon", "rowingboat",
        "handcart", "horse-drawn carriage", "sleigh", "bullet train", "freight train", "locomotive", "funicular", "trolleybus", "double-decker bus", "minibus"
        ]
    },
    {
        tip: "Furniture",
        words: [
        "chair", "table", "sofa", "couch", "bed", "desk", "bookshelf", "wardrobe", "closet", "cabinet",
        "dresser", "nightstand", "armchair", "bench", "stool", "barstool", "coffee table", "dining table", "side table", "tv stand",
        "bookcase", "cupboard", "drawers", "ottoman", "recliner", "futon", "bunk bed", "cradle", "crib", "mattress",
        "headboard", "vanity", "sideboard", "buffet", "credenza", "filing cabinet", "coat rack", "shoe rack", "hat stand", "folding chair",
        "folding table", "rocking chair", "beanbag", "chaise longue", "hammock", "patio table", "deck chair", "sunbed", "display cabinet", "china cabinet",
        "pantry cabinet", "corner cabinet", "medicine cabinet", "desk chair", "office chair", "gaming chair", "massage chair", "swivel chair", "bench seat", "lounger",
        "nesting tables", "console table", "end table", "drafting table", "worktable", "dressing table", "changing table", "high chair", "canopy bed", "daybed",
        "sofa bed", "trundle bed", "waterbed", "storage bench", "hall tree", "magazine rack", "wine rack", "bar cart", "room divider", "screen",
        "mirror frame", "easel", "pedestal", "shelf unit", "modular sofa", "sectional couch", "loveseat", "accent chair", "wingback chair", "club chair",
        "papasan chair", "director's chair", "folding stool", "step stool", "footstool", "pouf", "bench cushion", "headboard storage", "under-bed storage", "wall shelf"
        ]
    },
    {
        tip: "Appliances",
        words: [
        "refrigerator", "freezer", "microwave", "oven", "stove", "dishwasher", "washing machine", "dryer", "vacuum cleaner", "air conditioner",
        "heater", "fan", "blender", "toaster", "coffee maker", "kettle", "food processor", "juicer", "air fryer", "slow cooker",
        "pressure cooker", "rice cooker", "deep fryer", "electric grill", "waffle maker", "sandwich maker", "mixer", "hand mixer", "stand mixer", "dehydrator",
        "ice maker", "water dispenser", "garbage disposal", "trash compactor", "range hood", "induction cooktop", "toaster oven", "popcorn maker", "bread maker", "ice cream maker",
        "steam iron", "ironing machine", "clothes steamer", "robot vacuum", "handheld vacuum", "air purifier", "humidifier", "dehumidifier", "electric blanket", "space heater",
        "radiator", "water heater", "hair dryer", "electric razor", "epilator", "electric toothbrush", "water flosser", "foot massager", "sewing machine", "laminator",
        "paper shredder", "espresso machine", "milk frother", "electric kettle", "wine cooler", "beverage fridge", "minibar", "chest freezer", "steam mop", "carpet cleaner",
        "pressure washer", "leaf blower", "lawn mower", "hedge trimmer", "string trimmer", "chainsaw", "snow blower", "garage door opener", "ceiling fan", "exhaust fan",
        "towel warmer", "wine opener", "can opener", "electric knife", "meat grinder", "pasta maker", "sous vide precision cooker", "immersion blender", "fondue pot", "hot plate",
        "tanning bed", "massage chair", "sauna heater", "pool heater", "sump pump", "generator", "voltage regulator", "uninterruptible power supply", "smart plug", "thermostat"
        ]
    },
    {
        tip: "Electronics",
        words: [
        "smartphone", "laptop", "desktop computer", "tablet", "smartwatch", "television", "monitor", "keyboard", "mouse", "headphones",
        "earphones", "speakers", "microphone", "webcam", "printer", "scanner", "router", "modem", "projector", "camera",
        "digital camera", "action camera", "drone", "game console", "controller", "vr headset", "smart speaker", "e-reader", "power bank", "charger", "hard drive", "solid state drive", "flash drive", "memory card", "graphics card", "processor", "motherboard", "ram module", "power supply", "computer case",
        "soundbar", "amplifier", "receiver", "subwoofer", "record player", "cd player", "dvd player", "blu-ray player", "streaming stick", "smart hub",
        "smart lock", "smart doorbell", "security camera", "baby monitor", "gps navigator", "fitness tracker", "smart ring", "walkie-talkie", "radio", "radar",
        "calculator", "digital watch", "electric scooter", "electric bike", "3d printer", "laser engraver", "stylus pen", "drawing tablet", "docking station", "kvm switch",
        "surge protector", "extension cord", "hdmi cable", "usb cable", "ethernet cable", "audio cable", "adapter", "converter", "capture card", "network switch",
        "wireless access point", "range extender", "bluetooth adapter", "fm transmitter", "car stereo", "dash cam", "radar detector", "thermal camera", "oscilloscope", "multimeter",
        "soldering iron", "electronic tuner", "metronome", "synthesizer", "midi controller", "drum machine", "audio interface", "mixing console", "studio monitor", "headphone amp"
        ]
    },
    {
        tip: "Tools",
        words: [
        "hammer", "screwdriver", "pliers", "wrench", "adjustable wrench", "tape measure", "level", "utility knife", "hand saw", "hacksaw",
        "circular saw", "jigsaw", "drill", "impact driver", "drill bit", "chisel", "file", "rasp", "sander", "angle grinder",
        "workbench", "vise", "clamp", "toolbox", "flashlight", "headlamp", "ladder", "stepladder", "wheelbarrow", "shovel",
        "spade", "rake", "hoe", "hoe", "pitchfork", "pruning shears", "hedge shears", "loppers", "axe", "hatchet", "sledgehammer", "crowbar", "pry bar", "putty knife", "scraper", "trowel", "caulking gun", "wire stripper", "wire cutter", "crimper",
        "soldering iron", "multimeter", "voltage tester", "stud finder", "plunger", "drain snake", "pipe wrench", "basin wrench", "allen wrench", "socket wrench",
        "torque wrench", "ratchet", "c-clamp", "bar clamp", "spring clamp", "bench grinder", "table saw", "miter saw", "band saw", "drill press", "router tool", "heat gun", "paint roller", "paint brush", "paint sprayer", "air compressor", "pneumatic nailer", "staple gun", "rivet gun", "hot glue gun",
        "utility shears", "tin snips", "glass cutter", "tile cutter", "pipe cutter", "reamer", "tap and die set", "caliper", "micrometer", "plumb bob",
        "chalk line", "work light", "extension ladder", "sawhorse", "tool belt", "safety glasses", "work gloves", "dust mask", "ear protection", "hard hat"
        ]
    },
    {
        tip: "Body Parts",
        words: [
        "head", "hair", "face", "forehead", "eye", "eyebrow", "eyelash", "eyelid", "ear", "nose",
        "cheek", "mouth", "lip", "tooth", "tongue", "jaw", "chin", "neck", "throat", "shoulder",
        "arm", "elbow", "forearm", "wrist", "hand", "finger", "thumb", "fingernail", "chest", "breast",
        "rib", "abdomen", "belly", "navel", "waist", "hip", "back", "spine", "buttocks", "leg",
        "thigh", "knee", "shin", "calf", "ankle", "foot", "toe", "toenail", "heel", "sole",
        "brain", "heart", "lung", "liver", "kidney", "stomach", "intestine", "bladder", "pancreas", "spleen",
        "gallbladder", "vein", "artery", "capillary", "blood", "muscle", "tendon", "ligament", "bone", "skeleton",
        "skull", "collarbone", "shoulder blade", "humerus", "radius", "ulna", "pelvis", "femur", "patella", "tibia",
        "fibula", "skin", "pore", "nerve", "gland", "tonsils", "appendix", "thyroid", "diaphragm", "esophagus",
        "trachea", "larynx", "pharynx", "aorta", "cornea", "retina", "eardrum", "cuticle", "knuckle", "palm"
        ]
    },
    {
        tip: "Animals - Birds",
        words: [
        "eagle", "hawk", "falcon", "owl", "parrot", "macaw", "cockatoo", "parakeet", "canary", "finch",
        "sparrow", "pigeon", "dove", "flamingo", "peacock", "penguin", "pelican", "albatross", "seagull", "swan",
        "goose", "duck", "turkey", "chicken", "rooster", "hen", "quail", "pheasant", "partridge", "ostrich",
        "emu", "cassowary", "kiwi", "woodpecker", "hummingbird", "kingfisher", "toucan", "hornbill", "raven", "crow",
        "magpie", "jay", "starlin", "blackbird", "robin", "bluebird", "cardinal", "goldfinch", "nightingale", "swallow",
        "swift", "martin", "wren", "thrush", "chickadee", "nuthatch", "titmouse", "mockingbird", "catbird", "whippoorwill",
        "cuckoo", "roadrunner", "heron", "egret", "bittern", "stork", "ibis", "spoonbill", "crane", "rail",
        "coot", "cormorant", "gannet", "booby", "frigatebird", "puffin", "auk", "murre", "sandpiper", "plover",
        "snipe", "curlew", "godwit", "turnstone", "phalarope", "skua", "tern", "black skimmer", "vulture", "condor",
        "buzzard", "harrier", "kite", "osprey", "caracara", "secretary bird", "lyrebird", "bowerbird", "paradise bird", "hoopoe"
        ]
    },
    {
        tip: "Marine Life",
        words: [
        "dolphin", "whale", "blue whale", "humpback whale", "orca", "sperm whale", "shark", "great white shark", "hammerhead shark", "whale shark",
        "octopus", "squid", "giant squid", "cuttlefish", "jellyfish", "sea turtle", "lobster", "crab", "hermit crab", "shrimp",
        "prawn", "krill", "sea star", "sea urchin", "sea cucumber", "coral", "sea anemone", "sponge", "seahorse", "sea dragon",
        "stingray", "manta ray", "electric ray", "eel", "moray eel", "barracuda", "tuna", "salmon", "trout", "cod",
        "haddock", "halibut", "flounder", "sole", "swordfish", "marlin", "sailfish", "snapper", "grouper", "sea bass",
        "mahi mahi", "anchovy", "sardine", "herring", "mackerel", "flying fish", "anglerfish", "viperfish", "blobfish", "goblin shark",
        "clam", "mussel", "oyster", "scallop", "barnacle", "limpet", "sea snail", "nudibranch", "dugong", "manatee",
        "walrus", "sea lion", "fur seal", "harbor seal", "elephant seal", "sea otter", "lionfish", "clownfish", "damselfish", "tang",
        "butterflyfish", "angel fish", "parrotfish", "wrass", "triggerfish", "boxfish", "pufferfish", "porcupinefish", "stonefish", "scorpionfish",
        "pipefish", "remora", "tarpon", "bonefish", "permit", "giant trevally", "amberjack", "pompano", "wahoo", "kingfish"
        ]
    },
    {
        tip: "Insects and Bugs",
        words: [
        "ant", "bee", "honeybee", "bumblebee", "wasp", "hornet", "yellowjacket", "butterfly", "moth", "caterpillar",
        "dragonfly", "damselfly", "grasshopper", "cricket", "locust", "beetle", "ladybug", "firefly", "scarab", "dung beetle",
        "stag beetle", "weevil", "cockroach", "termite", "mantis", "praying mantis", "walking stick", "leaf insect", "flea", "louse",
        "bedbug", "mosquito", "fly", "housefly", "fruitfly", "horsefly", "blowfly", "gnat", "midged", "tick",
        "mite", "spider", "tarantula", "black widow", "brown recluse", "jumping spider", "wolf spider", "daddy longlegs", "scorpion", "centipede",
        "millipede", "silverfish", "earwig", "cicada", "aphid", "scale insect", "whitefly", "mealybug", "stink bug", "shield bug",
        "assassin bug", "water strider", "giant water bug", "backswimmer", "whirligig beetle", "diving beetle", "glowworm", "click beetle", "longhorn beetle", "jewel beetle",
        "flea beetle", "ground beetle", "tiger beetle", "rove beetle", "carrion beetle", "blister beetle", "soldier beetle", "checkered beetle", "leaf beetle", "tortoise beetle",
        "swallowtail butterfly", "monarch butterfly", "painted lady", "admiral butterfly", "cabbage white", "sulfur butterfly", "blue butterfly", "copper butterfly", "hair-streak", "skipper butterfly",
        "hawk moth", "silk moth", "atlas moth", "luna moth", "cecropia moth", "polyphemus moth", "imperial moth", "rosy maple moth", "underwing moth", "clearwing moth"
        ]
    },
    {
        tip: "Trees and Plants",
        words: [
        "oak", "maple", "pine", "birch", "willow", "cedar", "redwood", "sequoia", "spruce", "fir",
        "cypress", "palm", "coconut tree", "bamboo", "eucalyptus", "elm", "ash", "beech", "poplar", "aspen",
        "magnolia", "cherry blossom", "apple tree", "orange tree", "olive tree", "fig tree", "lemon tree", "baobab", "banyan", "bonsai",
        "fern", "moss", "lichen", "ivy", "cactus", "succulent", "aloe vera", "agave", "brier", "bramble",
        "sunflower", "rose bush", "lavender", "rosemary", "thyme", "basil", "mint", "oregano", "sage", "parsley",
        "cilantro", "dill", "chives", "tarragon", "marjoram", "lemongrass", "grass", "clover", "dandelion", "weed",
        "reed", "cattail", "bamboo shoot", "sugarcane", "cotton plant", "tobacco plant", "tea plant", "coffee plant", "cocoa tree", "rubber tree",
        "ginkgo biloba", "dogwood", "sycamore", "chestnut", "walnut tree", "hazelnut tree", "pecan tree", "almond tree", "pistachio tree", "hickory",
        "alder", "hornbeam", "linden", "rowan", "hawthorn", "blackthorn", "elderberry bush", "juniper", "yew", "holly",
        "boxwood", "privet", "rhododendron", "azalea", "camellia", "hydrangea", "lilac bush", "jasmine vine", "wisteria vine", "bougainvillea"
        ]
    },
    {
        tip: "Flowers",
        words: [
        "rose", "tulip", "daisy", "sunflower", "lily", "orchid", "daffodil", "carnation", "chrysanthemum", "dahlia",
        "peony", "hydrangea", "lavender", "iris", "poppy", "violet", "marigold", "jasmine", "hibiscus", "magnolia",
        "cherry blossom", "lotus", "water lily", "azalea", "rhododendron", "begonia", "geranium", "petunia", "pansy", "snapdragon",
        "zinnia", "aster", "amaryllis", "anemone", "buttercup", "calla lily", "camellia", "clover blossom", "columbine", "cornflower",
        "crocus", "cyclamen", "delphinium", "freesia", "fuchsia", "gladiolus", "heather", "heliotrope", "hollyhock", "hyacinth",
        "impatiens", "lantana", "larkspur", "lilac", "lily of the valley", "lobelia", "lupine", "mimosa", "morning glory", "narcissus",
        "nasturtium", "forget-me-not", "foxglove", "frangipani", "gardenia", "gentian", "plumeria", "ranunculus", "scabiosa", "snowdrop",
        "statice", "stock flower", "sweet pea", "thistle", "trillium", "verbena", "speedwell", "wallflower", "yarrow", "passion flower",
        "bird of paradise", "bleeding heart", "bluebell", "bougainvillea", "clematis", "cosmos", "daphne", "daylily", "echinacea", "edweiss",
        "gaillardia", "gazania", "globe thistle", "goldenrod", "hawthorn blossom", "honeysuckle", "kalanchoe", "monkshood", "nightshade flower", "oleander"
        ]
    },
    {
        tip: "Weather and Nature",
        words: [
        "sun", "sunshine", "rain", "raindrop", "rainfall", "shower", "downpour", "drizzle", "storm", "thunderstorm",
        "thunder", "lightning", "cloud", "cumulus", "stratus", "cirrus", "fog", "mist", "haze", "smog",
        "wind", "breeze", "gale", "gust", "hurricane", "typhoon", "cyclone", "tornado", "twister", "whirlwind",
        "snow", "snowflake", "snowstorm", "blizzard", "sleet", "hail", "hailstone", "frost", "ice", "icicle",
        "dew", "rainbow", "aurora", "northern lights", "atmosphere", "climate", "temperature", "humidity", "pressure", "barometer",
        "sunrise", "dawn", "daybreak", "sunset", "dusk", "twilight", "moon", "moonlight", "crescent", "full moon",
        "star", "starlight", "sky", "horizon", "ocean", "sea", "wave", "tide", "tsunami", "current",
        "river", "stream", "creek", "brook", "waterfall", "lake", "pond", "lagoon", "swamp", "marsh",
        "mountain", "peak", "summit", "volcano", "lava", "ash", "magma", "earthquake", "tremor", "landslide",
        "avalanche", "desert", "sand dune", "oasis", "canyon", "valley", "gorge", "cave", "cavern", "glacier"
        ]
    },
    {
        tip: "Space and Astronomy",
        words: [
        "sun", "moon", "planet", "star", "mercury", "venus", "earth", "mars", "jupiter", "saturn",
        "uranus", "neptune", "pluto", "dwarf planet", "asteroid", "comet", "meteor", "meteorite", "meteoroid", "meteor shower",
        "galaxy", "milky way", "andromeda", "nebula", "black hole", "supernova", "pulsar", "quasarl", "white dwarf", "red giant",
        "neutron star", "constellation", "orion", "ursa major", "ursa minor", "cassiopeia", "zodiac", "solar system", "orbit", "gravity",
        "eclipse", "solar eclipse", "lunar eclipse", "light year", "parsec", "astronomical unit", "space", "cosmos", "universe", "exoplanet",
        "telescope", "space station", "satellite", "rocket", "spacecraft", "space shuttle", "rover", "probe", "astronaut", "cosmonaut",
        "spacewalk", "launchpad", "mission control", "space suit", "zero gravity", "microgravity", "vacuum", "dark matter", "dark energy", "cosmic ray",
        "gamma ray burst", "event horizon", "singularity", "wormhole", "space-time", "interstellar", "intergalactic", "deep space", "Kuiper belt", "Oort cloud",
        "asteroid belt", "solar flare", "sunspot", "solar wind", "aurora borealis", "aurora australis", "magnetosphere", "ionosphere", "exosphere", "celestial body",
        "zenith", "nadir", "equinox", "solstice", "perihelion", "aphelion", "retrograde", "transit", "occultation", "parallax"
        ]
    },
    {
        tip: "Geography Terms",
        words: [
        "continent", "island", "peninsula", "archipelago", "isthmus", "cape", "bay", "gulf", "strait", "channel",
        "ocean", "sea", "lake", "pond", "lagoon", "river", "tributary", "estuary", "delta", "waterfall",
        "mountain", "mountain range", "peak", "summit", "ridge", "valley", "canyon", "gorge", "ravine", "plateau",
        "plain", "prairie", "savanna", "steppe", "tundra", "desert", "oasis", "dune", "glacier", "iceberg", "ice sheet", "fiord", "coast", "coastline", "shore", "beach", "cliff", "reef", "atoll", "volcano",
        "crater", "geyser", "hot spring", "cave", "cavern", "sinkhole", "swamp", "marsh", "bog", "wetland",
        "forest", "rainforest", "jungle", "woodland", "taiga", "equator", "tropic of cancer", "tropic of capricorn", "prime meridian", "latitude",
        "longitude", "hemisphere", "north pole", "south pole", "arctic circle", "antarctic circle", "timezone", "elevation", "altitude", "sea level",
        "topography", "cartography", "map", "globe", "compass", "border", "boundary", "territory", "province", "state",
        "county", "district", "municipality", "capital", "metropolis", "suburb", "rural area", "urban area", "archipelago", "basin"
        ]
    },
    {
        tip: "Materials and Substances",
        words: [
        "wood", "timber", "lumber", "plywood", "metal", "iron", "steel", "stainless steel", "copper", "brass",
        "bronze", "aluminum", "gold", "silver", "platinum", "lead", "zinc", "tin", "nickel", "titanium",
        "plastic", "polyethylene", "pvc", "acrylic", "nylon", "polyester", "silicone", "rubber", "latex", "glass",
        "fiberglass", "ceramic", "porcelain", "clay", "brick", "concrete", "cement", "asphalt", "stone", "rock",
        "granite", "marble", "limestone", "sandstone", "slate", "basalt", "quartz", "paper", "cardboard", "leather",
        "suede", "cotton", "wool", "silk", "linen", "velvet", "satin", "denim", "canvas", "fleece",
        "cashmere", "rayon", "spandex", "carbon fiber", "wax", "paraffin", "oil", "petroleum", "gasoline", "diesel",
        "kerosene", "natural gas", "coal", "charcoal", "tar", "pitch", "resin", "amber", "foam", "sponge",
        "gel", "powder", "dust", "sand", "gravel", "soil", "dirt", "mud", "clay", "ash",
        "salt", "sugar", "water", "ice", "steam", "air", "oxygen", "nitrogen", "carbon", "hydrogen"
        ]
    },
    {
        tip: "Kitchen Tools",
        words: [
        "knife", "chef's knife", "paring knife", "bread knife", "carving knife", "cleaver", "cutting board", "peeler", "grater", "can opener",
        "bottle opener", "corkscrew", "measuring cups", "measuring spoons", "mixing bowl", "whisk", "spatula", "ladle", "slotted spoon", "tongs",
        "rolling pin", "colander", "strainer", "sieve", "funnel", "pastry brush", "garlic press", "potato masher", "meat tenderizer", "kitchen shears",
        "pizza cutter", "apple corer", "ice cream scoop", "nutcracker", "citrus juicer", "mandoline", "timer", "kitchen scale", "thermometer", "baking sheet",
        "cake pan", "muffin tin", "pie dish", "casserole dish", "roasting pan", "frying pan", "skillet", "saucepan", "stockpot", "dutch oven",
        "wok", "griddle", "steamer basket", "double boiler", "pressure cooker", "slow cooker", "blender", "food processor", "hand mixer", "stand mixer",
        "toaster", "toaster oven", "microwave", "kettle", "coffee maker", "espresso machine", "spice grinder", "mortar and pestle", "salad spinner", "basting brush",
        "cookie cutters", "piping bag", "cooling rack", "pot holder", "oven mitt", "apron", "kitchen towel", "dish rack", "sponge", "scrub brush",
        "trash can", "compost bin", "tupperware", "aluminum foil", "plastic wrap", "parchment paper", "wax paper", "zip bag", "bread box", "paper towel holder",
        "knife block", "utensil holder", "spice rack", "recipe book", "egg separator", "cherry pitter", "melon baller", "avocado slicer", "egg slicer", "cheese slicer"
        ]
    },
    {
        tip: "Bathroom Items",
        words: [
        "soap", "bar soap", "liquid soap", "hand soap", "body wash", "shower gel", "shampoo", "conditioner", "face wash", "exfoliator",
        "toothpaste", "toothbrush", "electric toothbrush", "dental floss", "mouthwash", "towel", "bath towel", "hand towel", "washcloth", "bathrobe",
        "bath mat", "shower curtain", "showerliner", "shower head", "bathtub", "shower", "sink", "faucet", "tap", "toilet",
        "toilet paper", "bidet", "toilet brush", "plunger", "mirror", "medicine cabinet", "vanity", "scale", "hair dryer", "straightener",
        "curling iron", "razor", "shaving cream", "aftershave", "comb", "hairbrush", "tweezers", "nail clippers", "nail file", "scissors",
        "cotton swabs", "cotton balls", "cotton pads", "tissue", "lotion", "moisturizer", "sunscreen", "deodorant", "perfume", "cologne",
        "bath salts", "bubble bath", "bath bomb", "essential oil", "loofah", "sponge", "pumice stone", "shower cap", "headband", "hair ties",
        "bobby pins", "makeup remover", "cleanser", "toner", "serum", "face mask", "eye cream", "lip balm", "q-tips", "first aid kit",
        "bandages", "rubbing alcohol", "hydrogen peroxide", "thermometer", "hampers", "laundry basket", "soap dispenser", "soap dish", "toothbrush holder", "towel rack",
        "towel hook", "toilet paper holder", "trash can", "cleaning spray", "glass cleaner", "disinfectant", "bleach", "air freshener", "candle", "matchbook"
        ]
    },
    {
        tip: "Bedroom Items",
        words: [
        "bed", "mattress", "box spring", "bed frame", "headboard", "footboard", "pillow", "pillowcase", "sheet", "fitted sheet",
        "flat sheet", "blanket", "comforter", "duvet", "duvet cover", "quilt", "bedspread", "throw blanket", "pillow sham", "cushion",
        "nightstand", "bedside table", "alarm clock", "lamp", "bedside lamp", "dresser", "drawers", "chest of drawers", "wardrobe", "closet",
        "clothes hanger", "mirror", "full-length mirror", "vanity", "dressing table", "bench", "chair", "armchair", "ottoman", "rug",
        "carpet", "curtains", "drapes", "blinds", "window shade", "fan", "ceiling fan", "air conditioner", "heater", "air purifier",
        "humidifier", "television", "tv stand", "bookshelf", "desk", "desk chair", "desk lamp", "trash can", "laundry basket", "clothes hamper",
        "jewelry box", "safe", "tissue box", "picture frame", "wall art", "poster", "wall clock", "string lights", "diffuser", "candle",
        "sleep mask", "earplugs", "white noise machine", "heating pad", "hot water bottle", "slipper", "pajamas", "robe", "extra blankets", "bed canopy",
        "under-bed storage", "shoe rack", "coat rack", "hat rack", "catchall tray", "charging station", "power strip", "extension cord", "smart speaker", "e-reader",
        "book", "magazine", "journal", "pen", "water glass", "water carafe", "snooze button", "headphone stand", "ambient light", "bed caddy"
        ]
    },
    {
        tip: "Living Room Items",
        words: [
        "sofa", "couch", "sectional", "loveseat", "armchair", "recliner", "accent chair", "ottoman", "pouf", "coffee table",
        "side table", "end table", "console table", "tv stand", "entertainment center", "media console", "television", "soundbar", "speakers", "subwoofer",
        "fireplace", "mantel", "bookshelf", "bookcase", "display cabinet", "credenza", "sideboard", "rug", "area rug", "carpet",
        "curtains", "drapes", "blinds", "throw pillow", "cushion", "throw blanket", "floor lamp", "table lamp", "chandelier", "pendant light",
        "wall sconce", "ceiling fan", "picture frame", "wall art", "painting", "photo print", "mirror", "clock", "wall clock", "vase",
        "indoor plant", "planter", "sculpture", "figurine", "candle", "candle holder", "coasters", "tray", "magazine rack", "newspaper",
        "board game", "playing cards", "remote control", "gaming console", "controller", "streaming device", "record player", "vinyl records", "cds", "dvds",
        "air conditioner", "heater", "air purifier", "diffuser", "smart speaker", "window sill", "entryway bench", "coat rack", "shoe storage", "key holder",
        "throw rug", "doormat", "floor cushion", "beanbag", "nesting tables", "bar cart", "wine rack", "decanter", "curio cabinet", "room divider"
        ]
    },
    {
        tip: "Office Supplies",
        words: [
        "pen", "ballpoint pen", "gel pen", "fountain pen", "pencil", "mechanical pencil", "colored pencils", "marker", "highlighter", "permanent marker",
        "dry erase marker", "chalk", "eraser", "pencil sharpener", "paper", "copy paper", "printer paper", "notebook", "notepad", "legal pad",
        "sticky notes", "post-it notes", "index cards", "envelope", "letter", "mailing label", "folder", "manila folder", "hanging folder", "binder",
        "ring binder", "binder clip", "paper clip", "stapler", "staples", "staple remover", "hole punch", "tape", "clear tape", "masking tape",
        "double-sided tape", "tape dispenser", "glue", "glue stick", "liquid glue", "scissors", "utility knife", "paper cutter", "ruler", "protractor",
        "compass", "calculator", "desk organizer", "pencil holder", "letter tray", "file cabinet", "push pins", "thumbtacks", "thumb tacks", "corkboard",
        "whiteboard", "whiteboard eraser", "blackboard", "bulletin board", "clipboard", "rubber bands", "correction tape", "correction fluid", "stamps", "ink pad",
        "rubber stamp", "shredder", "laminator", "laminating pouches", "label maker", "label tape", "desk mat", "mouse pad", "bookend", "business cards",
        "business card holder", "calendar", "desk calendar", "planner", "diary", "organizer", "filing box", "storage bin", "trash can", "recycling bin"
        ]
    },
    {
        tip: "Buildings and Structures",
        words: [
        "house", "apartment", "building", "skyscraper", "cottage", "villa", "mansion", "palace", "castle", "fortress",
        "cabin", "hut", "shack", "bungalow", "duplex", "townhouse", "condominium", "dormitory", "hotel", "motel", "hostel", "resort", "hospital", "clinic", "school", "university", "college", "library", "museum", "art gallery",
        "theater", "cinema", "stadium", "arena", "gymnasium", "sports complex", "church", "cathedral", "chapel", "mosque",
        "synagogue", "temple", "monastery", "shrine", "pagoda", "bank", "post office", "police station", "fire station", "courthouse",
        "city hall", "capitol", "parliament", "embassy", "prison", "jail", "factory", "plant", "warehouse", "depot",
        "hangar", "barn", "silo", "stable", "greenhouse", "shed", "garage", "carport", "windmill", "watermill",
        "lighthouse", "observatory", "planetarium", "aquarium", "zoo", "shopping mall", "supermarket", "store", "shop", "restaurant",
        "cafe", "bakery", "bar", "pub", "nightclub", "casino", "gas station", "train station", "subway station", "bus terminal",
        "airport terminal", "port", "dock", "pier", "wharf", "bridge", "dam", "monument", "memorial", "tower"
        ]
    },
    {
        tip: "Tools and Hardware",
        words: [
        "screw", "bolt", "nut", "washer", "nail", "tack", "staple", "pin", "anchor", "wall anchor",
        "drywall anchor", "toggle bolt", "rivet", "hook", "eye hook", "screw hook", "hinge", "latch", "lock", "padlock",
        "deadbolt", "door handle", "doorknob", "drawer slide", "bracket", "corner brace", "shelf bracket", "pipe", "tube", "fitting",
        "elbow fitting", "tee fitting", "coupling", "adapter", "valve", "ball valve", "gate valve", "faucet valve", "gasket", "o-ring",
        "washer", "sealant", "caulk", "silicone caulk", "expanding foam", "glue", "epoxy", "wood glue", "super glue", "contact cement",
        "threadlocker", "grease", "lubricant", "wd-40", "sandpaper", "emery cloth", "steel wool", "wire brush", "buffing wheel", "polishing compound",
        "chain", "cable", "wire", "rope", "cord", "twine", "bungee cord", "ratchet strap", "zip tie", "cable tie",
        "electrical tape", "duct tape", "masking tape", "painter's tape", "plumber's tape", "teflon tape", "wire nut", "electrical box", "conduit", "switch",
        "outlet", "plug", "fuse", "circuit breaker", "light socket", "junction box", "turnbuckle", "carabiner", "shackle", "pulley"
        ]
    },
    {
        tip: "Musical Instruments",
        words: [
        "piano", "grand piano", "upright piano", "digital piano", "keyboard", "synthesizer", "organ", "accordion", "melodica", "harmonica",
        "acoustic guitar", "electric guitar", "bass guitar", "classical guitar", "12-string guitar", "ukulele", "banjo", "mandolin", "lute", "harp",
        "violin", "viola", "cello", "double bass", "fiddle", "sitar", "balalaika", "flute", "piccolo", "recorder", "clarinet", "bass clarinet", "oboe", "english horn", "bassoon", "contrabassoon", "saxophone", "alto saxophone", "tenor saxophone", "baritone saxophone",
        "trumpet", "cornet", "flugelhorn", "trombone", "bass trombone", "french horn", "tuba", "euphonium", "sousaphone", "bugle",
        "drums", "drum kit", "snare drum", "bass drum", "tom-tom", "hi-hat", "cymbal", "ride cymbal", "crash cymbal", "tambourine",
        "bongo drums", "conga drums", "djembe", "cajon", "timpani", "xylophone", "marimba", "vibraphone", "glockenspiel", "chimes",
        "triangle", "castanets", "maracas", "cabasa", "guiro", "cowbell", "gong", "sleigh bells", "steel drum", "kalimba",
        "handpan", "theremin", "bagpipes", "didgeridoo", "kazoo", "jaw harp", "ocarina", "pan flute", "shakuhachi", "koto",
        "shamisen", "erhu", "guzheng", "pipa", "tabla", "santoor", "sarod", "shehnai", "bodhran", "hurdy-gurdy"
        ]
    },
    {
        tip: "Types of Music",
        words: [
        "pop", "rock", "hard rock", "soft rock", "classic rock", "alternative rock", "indie rock", "punk rock", "pop punk", "heavy metal",
        "thrash metal", "death metal", "black metal", "power metal", "nu metal", "hip hop", "rap", "trap", "boom bap", "r&b",
        "contemporary r&b", "soul", "neo soul", "funk", "disco", "jazz", "smooth jazz", "bebop", "cool jazz", "free jazz",
        "blues", "delta blues", "chicago blues", "electric blues", "country", "bluegrass", "folk", "indie folk", "reggae", "dub",
        "dancehall", "ska", "soca", "calypso", "afrobeats", "highlife", "afrobeat", "latin", "salsa", "merengue",
        "bachata", "cumbia", "reggaeton", "tango", "samba", "bossa nova", "mpb", "flamenco", "classical", "baroque",
        "romantic music", "chamber music", "opera", "choral music", "symphony", "electronic", "house", "techno", "trance", "dubstep",
        "drum and bass", "ambient", "downtempo", "chillout", "synthwave", "electro", "edm", "hardstyle", "garage", "grime",
        "gospel", "christian rock", "celtic music", "world music", "klezmer", "polka", "mariachi", "fado", "flamenco", "country pop"
        ]
    },
    {
        tip: "Hobbies and Activities",
        words: [
        "reading", "writing", "drawing", "painting", "sketching", "sculpting", "pottery", "knitting", "crocheting", "sewing",
        "embroidery", "quilting", "crafting", "origami", "photography", "videography", "filmmaking", "cooking", "baking", "gardening",
        "hiking", "camping", "backpacking", "fishing", "hunting", "bird watching", "stargazing", "astronomy", "geocaching", "rock climbing",
        "mountaineering", "running", "jogging", "cycling", "swimming", "surfing", "skateboarding", "skiing", "snowboarding", "ice skating",
        "dancing", "ballet", "salsa dancing", "tango dancing", "hip hop dancing", "singing", "playing instrument", "acting", "puppetry", "magic tricks",
        "juggling", "yoga", "pilates", "meditation", "weightlifting", "crossfit", "martial arts", "chess", "checkers", "backgammon",
        "dominoes", "puzzles", "jigsaw puzzles", "crossword puzzles", "sudoku", "board gaming", "card games", "poker", "video gaming", "tabletop rpgs",
        "collecting stamps", "collecting coins", "collecting vinyl", "collecting cards", "model building", "model trains", "rc cars", "drone flying", "metal detecting", "foraging",
        "fermenting", "cheesemaking", "homebrewing", "winemaking", "soapmaking", "candlemaking", "woodworking", "carpentry", "blacksmithing", "leatherworking"
        ]
    },
    {
        tip: "Toys and Games",
        words: [
        "doll", "barbie", "action figure", "teddy bear", "stuffed animal", "plushie", "building blocks", "lego", "duplo", "puzzle",
        "jigsaw puzzle", "rubik's cube", "board game", "chess", "checkers", "monopoly", "scrabble", "clue", "catan", "risk",
        "card game", "playing cards", "uno", "poker chips", "dominoes", "dice", "marbles", "yo-yo", "top", "spinning top",
        "frisbee", "boomerang", "kite", "hula hoop", "jump rope", "water gun", "nerf gun", "slingshot", "slinky", "silly putty",
        "play-doh", "slime", "kinetic sand", "kaleidoscope", "jack-in-the-box", "toy car", "hot wheels", "matchbox", "remote control car", "toy train",
        "model train", "toy plane", "toy boat", "toy robot", "tamagotchi", "handheld console", "game boy", "nintendo switch", "playstation", "xbox",
        "arcade game", "pinball machine", "foosball", "air hockey", "ping pong table", "darts", "dartboard", "bean bag toss", "cornhole", "lawn darts",
        "ring toss", "twister", "jenga", "operation game", "connect four", "battleship", "sorry game", "trouble game", "hi ho cherry-o", "candy land",
        "chutes and ladders", "hungry hungry hippos", "mousetrap", "guess who", "trivial pursuit", "pictionary", "cranium", "apples to apples", "cards against humanity", "exploding kittens",
        "ticket to ride", "carcassonne", "pandemic game", "7 wonders", "splendor", "dungeons and dragons", "magic the gathering", "pokemon cards", "yugioh cards", "bayblade"
        ]
    },
    {
        tip: "Science Specialties",
        words: [
        "physics", "astrophysics", "quantum physics", "nuclear physics", "theoretical physics", "particle physics", "mechanics", "thermodynamics", "optics", "acoustics",
        "chemistry", "organic chemistry", "inorganic chemistry", "biochemistry", "physical chemistry", "analytical chemistry", "geochemistry", "astrochemistry", "polymer chemistry", "electrochemistry",
        "biology", "molecular biology", "cell biology", "microbiology", "genetics", "evolutionary biology", "ecology", "botany", "zoology", "marine biology",
        "anatomy", "physiology", "neuroscience", "immunology", "pathology", "pharmacology", "toxicology", "epidemiology", "biotechnology", "bioinformatics",
        "geology", "geophysics", "seismology", "volcanology", "petrology", "mineralogy", "sedimentology", "paleontology", "oceanography", "climatology",
        "meteorology", "hydrology", "environmental science", "soil science", "astronomy", "cosmology", "planetary science", "astrobiology", "space science", "mathematics",
        "algebra", "geometry", "calculus", "trigonometry", "statistics", "probability", "topology", "number theory", "logic", "applied mathematics",
        "computer science", "artificial intelligence", "machine learning", "data science", "robotics", "cybernetics", "cryptography", "software engineering", "information theory", "systems science",
        "anthropology", "archaeology", "sociology", "psychology", "cognitive science", "linguistics", "economics", "political science", "criminology", "demography"
        ]
    },
    {
        tip: "Math Terms",
        words: [
        "addition", "subtraction", "multiplication", "division", "sum", "difference", "product", "quotient", "equals", "equation",
        "inequality", "variable", "constant", "coefficient", "exponent", "power", "square root", "cube root", "fraction", "numerator",
        "denominator", "decimal", "percentage", "ratio", "proportion", "integer", "whole number", "natural number", "rational number", "irrational number",
        "real number", "complex number", "prime number", "composite number", "even number", "odd number", "factor", "multiple", "gcd", "lcm",
        "algebra", "geometry", "trigonometry", "calculus", "statistics", "probability", "matrix", "vector", "determinant", "function",
        "domain", "range", "graph", "axis", "x-axis", "y-axis", "coordinate", "origin", "slope", "intercept",
        "angle", "degree", "radian", "triangle", "square", "rectangle", "circle", "radius", "diameter", "circumference",
        "area", "perimeter", "volume", "surface area", "polygon", "cube", "sphere", "cylinder", "cone", "pyramid",
        "sine", "cosine", "tangent", "logarithm", "limit", "derivative", "integral", "theorem", "proof", "axiom",
        "formula", "sequence", "series", "mean", "median", "mode", "standard deviation", "variance", "set", "venn diagram"
        ]
    },
    {
        tip: "Literature Genres",
        words: [
        "fiction", "non-fiction", "novel", "novella", "short story", "poetry", "drama", "play", "prose", "essay",
        "biography", "autobiography", "memoir", "history", "fantasy", "high fantasy", "urban fantasy", "dark fantasy", "epic fantasy", "fairy tale",
        "folklore", "mythology", "fable", "legend", "science fiction", "hard sci-fi", "soft sci-fi", "cyberpunk", "steampunk", "dystopian",
        "utopian", "space opera", "post-apocalyptic", "mystery", "detective fiction", "cozy mystery", "crime fiction", "thriller", "psychological thriller", "suspense",
        "horror", "gothic horror", "supernatural", "cosmic horror", "slasher", "romance", "historical romance", "contemporary romance", "paranormal romance", "romantic comedy",
        "historical fiction", "adventure", "action", "western", "young adult", "middle grade", "children's literature", "graphic novel", "comic book", "manga",
        "satire", "parody", "comedy", "tragedy", "tragicomedy", "absurdist literature", "literary fiction", "magical realism", "realism", "surrealism",
        "true crime", "self-help", "philosophy", "religion", "spirituality", "travel literature", "guidebook", "cookbook", "art book", "photography book",
        "science book", "business book", "finance book", "parenting book", "crafts book", "textbook", "encyclopedia", "dictionary", "thesaurus", "anthology",
        "journalism", "literary criticism", "monograph", "manifesto", "screenplay", "teleplay", "libretto", "epic poem", "sonnet", "haiku"
        ]
    },
    {
        tip: "Emotions and Feelings",
        words: [
        "happy", "joyful", "delighted", "cheerful", "ecstatic", "content", "satisfied", "pleased", "glad", "thrilled",
        "sad", "unhappy", "depressed", "gloomy", "miserable", "sorrowful", "heartbroken", "melancholy", "despondent", "disappointed",
        "angry", "furious", "enraged", "irritated", "annoyed", "frustrated", "bitter", "resentful", "indignant", "outraged",
        "fearful", "scared", "frightened", "terrified", "petrified", "anxious", "nervous", "apprehensive", "worried", "panicked",
        "surprised", "amazed", "astonished", "astounded", "shocked", "stunned", "bewildered", "confused", "perplexed", "puzzled",
        "disgusted", "revolted", "repulsed", "sickened", "appalled", "contemptuous", "scornful", "loving", "affectionate", "fond",
        "passionate", "adoring", "caring", "compassionate", "empathetic", "sympathetic", "hopeful", "optimistic", "confident", "proud",
        "embarrassed", "ashamed", "guilty", "remorseful", "humiliated", "jealous", "envious", "suspicious", "skeptical", "distrustful",
        "bored", "apathetic", "indifferent", "lethargic", "calm", "peaceful", "serene", "relaxed", "tranquil", "relieved", "eager", "enthusiastic", "excited", "zealous", "inspired", "grateful", "thankful", "humbled", "overwhelmed", "nostalgic"
        ]
    },
    {
        tip: "Personality Traits",
        words: [
        "kind", "generous", "honest", "sincere", "loyal", "faithful", "trustworthy", "reliable", "dependable", "caring",
        "thoughtful", "considerate", "polite", "courteous", "respectful", "humble", "modest", "patient", "tolerant", "forgiving",
        "brave", "courageous", "fearless", "bold", "adventurous", "confident", "assertive", "ambitious", "driven", "determined",
        "persistent", "stubborn", "creative", "imaginative", "innovative", "intelligent", "smart", "clever", "wise", "perceptive",
        "observant", "curious", "inquisitive", "witty", "funny", "humorous", "cheerful", "optimistic", "pessimistic", "enthusiastic",
        "friendly", "outgoing", "extroverted", "introverted", "shy", "timid", "quiet", "reserved", "calm", "composed",
        "emotional", "sensitive", "passionate", "impulsive", "cautious", "careful", "prudent", "practical", "realistic", "rational",
        "logical", "analytical", "organized", "meticulous", "tidy", "careless", "lazy", "hardworking", "diligent", "efficient",
        "adaptable", "flexible", "stubborn", "cooperative", "selfish", "unselfish", "altruistic", "greedy", "arrogant", "conceited",
        "vain", "proud", "boastful", "cynical", "sarcastic", "naive", "gullible", "charming", "charismatic", "empathetic"
        ]
    },
    {
        tip: "Verbs - Action",
        words: [
        "run", "walk", "jog", "sprint", "jump", "hop", "leap", "skip", "climb", "crawl",
        "swim", "dive", "fly", "glide", "slide", "fall", "drop", "throw", "catch", "pitch",
        "kick", "hit", "strike", "punch", "slap", "push", "pull", "drag", "lift", "carry",
        "hold", "grab", "grasp", "seize", "drop", "release", "cut", "slice", "chop", "carve",
        "break", "smash", "crush", "squeeze", "twist", "bend", "fold", "stretch", "shake", "wave",
        "bend", "bow", "kneel", "sit", "stand", "lie", "tilt", "turn", "rotate", "spin",
        "twist", "roll", "bounce", "drive", "ride", "steer", "sail", "row", "paddle", "fly",
        "build", "construct", "create", "make", "assemble", "repair", "fix", "mend", "destroy", "demolish",
        "write", "draw", "paint", "sketch", "carve", "sculpt", "cook", "bake", "fry", "boil",
        "wash", "clean", "scrub", "wipe", "sweep", "mop", "vacuum", "dust", "polish", "rinse"
        ]
    },
    {
        tip: "Adjectives - Describing Things",
        words: [
        "big", "huge", "large", "gigantic", "enormous", "massive", "small", "tiny", "little", "miniature",
        "microscopic", "tall", "short", "high", "low", "long", "short", "wide", "narrow", "broad",
        "thick", "thin", "heavy", "light", "hard", "soft", "solid", "liquid", "firm", "flexible", "stiff", "rigid", "rough", "smooth", "sharp", "dull", "hot", "warm", "cool", "cold",
        "freezing", "boiling", "dry", "wet", "damp", "moist", "soaked", "clean", "dirty", "filthy",
        "spotless", "bright", "dim", "dark", "shiny", "dull", "colorful", "colorless", "loud", "quiet",
        "silent", "noisy", "fast", "quick", "slow", "rapid", "swift", "sweet", "sour", "bitter",
        "salty", "spicy", "savory", "delicious", "tasty", "bland", "fresh", "stale", "rotten", "fragrant",
        "smelly", "stinky", "new", "old", "ancient", "modern", "young", "recent", "expensive", "cheap"
        ]
    },
    {
        tip: "Adverbs",
        words: [
        "quickly", "slowly", "swiftly", "rapidly", "hastily", "gradually", "suddenly", "abruptly", "immediately", "instantly",
        "carefully", "carelessly", "cautiously", "recklessly", "quietly", "loudly", "noisily", "silently", "softly", "gently",
        "harshly", "roughly", "smoothly", "easily", "effortlessly", "hard", "well", "badly", "poorly", "perfectly",
        "correctly", "incorrectly", "wrongly", "accurately", "precisely", "clearly", "vaguely", "definitely", "certainly", "probably",
        "possibly", "maybe", "always", "usually", "often", "frequently", "sometimes", "occasionally", "rarely", "seldom",
        "hardly", "barely", "scarcely", "never", "everywhere", "somewhere", "anywhere", "nowhere", "here", "there",
        "inside", "outside", "upstairs", "downstairs", "indoors", "outdoors", "abroad", "away", "back", "forward",
        "backward", "sideways", "completely", "totally", "entirely", "fully", "partially", "partly", "slightly", "nearly",
        "almost", "virtually", "practically", "extremely", "incredibly", "very", "really", "quite", "rather", "fairly",
        "pretty", "too", "enough", "so", "more", "most", "less", "least", "together", "alone"
        ]
    },
    {
        tip: "Medical Terms",
        words: [
        "hospital", "clinic", "emergency room", "intensive care unit", "operating room", "doctor", "physician", "surgeon", "nurse", "patient",
        "disease", "illness", "infection", "virus", "bacteria", "fungus", "parasite", "symptom", "diagnosis", "prognosis",
        "treatment", "therapy", "medication", "medicine", "drug", "prescription", "antibiotic", "painkiller", "vaccine", "injection",
        "shot", "infusion", "iv drip", "surgery", "operation", "biopsy", "transplant", "amputation", "bandage", "dressing",
        "gauze", "plaster", "cast", "splint", "crutches", "wheelchair", "stretcher", "ambulance", "stethoscope", "thermometer",
        "blood pressure cuff", "syringe", "needle", "scalpel", "forceps", "x-ray", "ct scan", "mri", "ultrasound", "electrocardiogram",
        "blood test", "urine test", "swab", "fever", "cough", "sneezing", "pain", "ache", "headache", "sore throat",
        "nausea", "vomiting", "diarrhea", "dizziness", "fatigue", "inflammation", "swelling", "rash", "allergy", "asthma",
        "diabetes", "cancer", "tumor", "stroke", "heart attack", "hypertension", "anemia", "arthritis", "fracture", "sprain",
        "wound", "cut", "burn", "bruise", "scar", "suture", "stitches", "pulse", "blood pressure", "heart rate"
        ]
    },
    {
        tip: "Legal Terms",
        words: [
        "law", "statute", "regulation", "ordinance", "constitution", "court", "courthouse", "judge", "magistrate", "jury",
        "juror", "lawyer", "attorney", "prosecutor", "defense attorney", "plaintiff", "defendant", "witness", "testimony", "evidence",
        "exhibit", "subpoena", "summons", "warrant", "search warrant", "arrest warrant", "bail", "bond", "custody", "arrest",
        "charge", "indictment", "trial", "hearing", "arraignment", "plea", "guilty", "not guilty", "verdict", "sentence",
        "conviction", "acquittal", "appeal", "overruled", "sustained", "objection", "contempt of court", "perjury", "crime", "felony",
        "misdemeanor", "infraction", "tort", "contract", "breach of contract", "liability", "negligence", "damages", "compensation", "settlement",
        "lawsuit", "litigation", "arbitration", "mediation", "notary", "affidavit", "power of attorney", "will", "testament", "estate",
        "trust", "probate", "deed", "title", "lease", "mortgage", "bankruptcy", "patent", "trademark", "copyright",
        "intellectual property", "fraud", "embezzlement", "bribery", "extortion", "blackmail", "forgery", "perjury", "homicide", "manslaughter"
        ]
    },
    {
        tip: "Business and Finance",
        words: [
        "bank", "account", "bank account", "savings account", "checking account", "deposit", "withdrawal", "transfer", "balance", "overdraft",
        "credit card", "debit card", "loan", "mortgage", "interest", "interest rate", "debt", "credit", "credit score", "bankruptcy",
        "money", "currency", "cash", "coin", "banknote", "capital", "investment", "investor", "stocks", "shares",
        "bonds", "mutual fund", "portfolio", "stock market", "wall street", "dividend", "yield", "profit", "revenue", "income",
        "expense", "loss", "budget", "forecast", "accounting", "bookkeeping", "audit", "tax", "income tax", "sales tax",
        "invoice", "receipt", "bill", "payment", "salary", "wage", "bonus", "commission", "pension", "retirement",
        "company", "corporation", "business", "enterprise", "startup", "partnership", "sole proprietorship", "franchise", "merger", "acquisition",
        "management", "executive", "ceo", "cfo", "manager", "employee", "employer", "workforce", "human resources", "marketing",
        "sales", "advertising", "public relations", "customer", "client", "consumer", "market", "supply", "demand", "product"
        ]
    },
    {
        tip: "Computer Hardware",
        words: [
        "processor", "cpu", "graphics card", "gpu", "motherboard", "ram", "memory", "hard drive", "hdd", "solid state drive",
        "ssd", "power supply", "psu", "cooling fan", "heat sink", "liquid cooling", "computer case", "chassis", "monitor", "display",
        "keyboard", "mechanical keyboard", "mouse", "optical mouse", "trackball", "touchpad", "webcam", "microphone", "headphones", "headset",
        "speakers", "sound card", "network card", "wi-fi card", "router", "modem", "ethernet cable", "usb flash drive", "external hard drive", "sd card",
        "microSD card", "card reader", "optical drive", "dvd drive", "blu-ray drive", "printer", "laser printer", "inkjet printer", "scanner", "3d printer",
        "drawing tablet", "stylus", "vr headset", "joystick", "gamepad", "kvm switch", "docking station", "surge protector", "ups", "uninterruptible power supply",
        "power strip", "hdmi cable", "displayport cable", "vga cable", "dvi cable", "usb cable", "usb-c cable", "thunderbolt cable", "power cord", "adapter",
        "connector", "jumper wire", "sata cable", "pci express slot", "ram slot", "cpu socket", "cmos battery", "bios chip", "thermal paste", "dust filter",
        "cable tie", "standoff", "screw", "case fan", "rgb controller", "fan hub", "capture card", "soundboard", "expansion card", "fingerprint reader"
        ]
    },
    {
        tip: "Software and Web",
        words: [
        "operating system", "windows", "macos", "linux", "android", "ios", "application", "app", "mobile app", "desktop app",
        "web app", "software", "program", "code", "source code", "programming language", "html", "css", "javascript", "python",
        "java", "c++", "c#", "php", "ruby", "sql", "database", "database management", "mysql", "postgresql",
        "mongodb", "server", "web server", "cloud server", "backend", "frontend", "full stack", "api", "rest api", "framework",
        "library", "react", "angular", "vue", "node.js", "django", "laravel", "compiler", "interpreter", "ide",
        "text editor", "git", "github", "version control", "repository", "bug", "debugging", "patch", "update", "upgrade",
        "installer", "driver", "firmware", "browser", "web browser", "chrome", "firefox", "safari", "edge", "website",
        "webpage", "domain", "domain name", "url", "ip address", "dns", "http", "https", "ssl certificate", "firewall",
        "antivirus", "malware", "virus", "trojan", "spyware", "ransomware", "phishing", "encryption", "decryption", "password",
        "two-factor authentication", "user interface", "ui", "user experience", "ux", "cloud storage", "saas", "algorithm", "data structure", "machine learning"
        ]
    },
    {
        tip: "Sports Equipment",
        words: [
        "ball", "soccer ball", "basketball", "tennis ball", "volleyball", "baseball", "softball", "football", "rugby ball", "golf ball",
        "ping pong ball", "bowling ball", "bat", "baseball bat", "cricket bat", "racket", "tennis racket", "badminton racket", "squash racket", "paddle",
        "ping pong paddle", "pickleball paddle", "golf club", "driver", "iron", "putter", "hockey stick", "lacrosse stick", "curling broom", "billiards cue",
        "net", "soccer net", "tennis net", "volleyball net", "basketball hoop", "backboard", "goalpost", "puck", "shuttlecock", "bowling pin",
        "glove", "baseball glove", "boxing glove", "goalkeeper glove", "golf glove", "helmet", "football helmet", "cycling helmet", "hockey helmet", "pads",
        "shin guards", "knee pads", "elbow pads", "shoulder pads", "mouthguard", "goggles", "swimming goggles", "ski goggles", "cleats", "running shoes",
        "skates", "ice skates", "roller skates", "inline skates", "skateboard", "snowboard", "skis", "ski poles", "surfboard", "wakeboard",
        "kayak", "canoe", "paddle", "life jacket", "wetsuit", "barbell", "dumbbell", "kettlebell", "weight bench", "treadmill",
        "exercise bike", "rowing machine", "resistance band", "jump rope", "yoga mat", "foam roller", "stopwatch", "whistle", "scoreboard", "target"
        ]
    },
    {
        tip: "Tools for Art",
        words: [
        "pencil", "graphite pencil", "charcoal", "colored pencil", "pastel", "oil pastel", "chalk", "crayon", "marker", "fineliner",
        "ink", "india ink", "fountain pen", "calligraphy pen", "brush", "paint brush", "watercolor brush", "oil brush", "acrylic brush", "palette knife",
        "palette", "mixing palette", "easel", "studio easel", "table easel", "canvas", "stretched canvas", "canvas board", "paper", "watercolor paper",
        "sketchbook", "drawing pad", "tracing paper", "drawing board", "paint", "oil paint", "acrylic paint", "watercolor paint", "gouache", "tempera",
        "spray paint", "fixative", "varnish", "turpentine", "mineral spirits", "linseed oil", "gesso", "clay", "modeling clay", "polymer clay",
        "air-dry clay", "sculpting tools", "wire armature", "pottery wheel", "kiln", "carving tools", "woodcut tools", "linoleum block", "linocut roller", "brayer",
        "printing ink", "etching needle", "lightbox", "proportional divider", "mannequin", "grid ruler", "cutting mat", "x-acto knife", "craft knife", "scissors",
        "glue", "mod podge", "glitter", "beads", "sequins", "stencils", "stamps", "ink pad", "fabric paint", "dyes",
        "sewing needle", "thread", "embroidery hoop", "yarn", "crochet hook", "knitting needles", "loom", "raw canvas", "gesso primer", "art binder"
        ]
    },
    {
        tip: "Household Cleaning",
        words: [
        "broom", "dustpan", "mop", "sponge mop", "steam mop", "bucket", "vacuum cleaner", "robot vacuum", "handheld vacuum", "feather duster",
        "microfiber cloth", "rag", "sponge", "scrub sponge", "scrub brush", "scouring pad", "steel wool", "squeegee", "plunger", "toilet brush",
        "trash can", "garbage can", "trash bag", "recycling bin", "spray bottle", "cleaning solution", "all-purpose cleaner", "disinfectant", "bleach", "ammonia",
        "glass cleaner", "window cleaner", "toilet bowl cleaner", "drain cleaner", "degreaser", "furniture polish", "wood cleaner", "carpet cleaner", "stain remover", "laundry detergent",
        "fabric softener", "dryer sheets", "bleach alternative", "washing soda", "baking soda", "vinegar", "white vinegar", "lemon juice", "dish soap", "dishwasher detergent",
        "rinse aid", "hand soap", "air freshener", "room spray", "odor eliminator", "rubber gloves", "cleaning gloves", "apron", "dust mask", "paper towels",
        "lint roller", "carpet sweeper", "steam cleaner", "pressure washer", "mop bucket", "wringer", "cleaning caddy", "scrubbing pad", "pumice stone", "grout brush",
        "chamoix cloth", "polishing cloth", "dusting spray", "floor wax", "wax stripper", "disinfecting wipes", "antibacterial spray", "descaler", "oven cleaner", "stainless steel cleaner",
        "tarnishing remover", "silver polish", "brass polish", "shoe polish", "shoe brush", "fabric refresher", "mothballs", "mold remover", "mildew remover", "lime scale remover"
        ]
    },
    {
        tip: "Garden and Yard",
        words: [
        "lawn mower", "riding mower", "hedge trimmer", "string trimmer", "weed whacker", "leaf blower", "chainsaw", "pruning shears", "secateurs", "loppers",
        "hedge shears", "grass shears", "axe", "hatchet", "shovel", "spade", "garden fork", "pitchfork", "rake", "leaf rake", "hoe", "garden hoe", "cultivator", "trowel", "hand trowel", "transplanter", "weeder", "dibber", "soil scoop", "wheelbarrow",
        "garden cart", "compost bin", "composter", "watering can", "garden hose", "hose nozzle", "sprinkler", "drip irrigation", "water timer", "rain barrel",
        "garden gloves", "knee pads", "kneeling pad", "greenhouse", "cold frame", "raised bed", "planter", "flower pot", "hanging basket", "trellis",
        "arbor", "pergola", "fence", "garden gate", "picket fence", "bird feeder", "bird bath", "bird house", "gnome", "garden statuary", "stepping stones", "garden path", "mulch", "wood chips", "gravel", "topsoil", "compost", "fertilizer", "plant food", "pesticide",
        "insecticide", "fungicide", "herbicide", "weed killer", "potting soil", "perlite", "vermiculite", "peat moss", "seed tray", "seedling",
        "seeds", "bulb", "plant marker", "plant tie", "garden stake", "tomato cage", "pruning saw", "edger", "lawn aerator", "thatcher"
        ]
    },
    {
        tip: "Types of Shoes",
        words: [
        "sneakers", "running shoes", "tennis shoes", "basketball shoes", "cross trainers", "walking shoes", "skate shoes", "high tops", "low tops", "slip-ons",
        "boots", "ankle boots", "combat boots", "cowboy boots", "chelsea boots", "hiking boots", "work boots", "rain boots", "snow boots", "riding boots",
        "knee-high boots", "thigh-high boots", "dress shoes", "oxfords", "derbies", "brogues", "loafers", "penny loafers", "monk straps", "moccasins",
        "boat shoes", "deck shoes", "espadrilles", "sandals", "flip-flops", "gladiator sandals", "slide sandals", "strappy sandals", "wedge sandals", "platform sandals",
        "high heels", "stilettos", "pumps", "kitten heels", "wedge heels", "block heels", "mules", "clogs", "ballet flats", "flats",
        "mary janes", "slingbacks", "peep-toe heels", "t-strap shoes", "dance shoes", "pointe shoes", "tap shoes", "bowling shoes", "golf shoes", "cycling shoes",
        "cleats", "soccer cleats", "football cleats", "baseball cleats", "climbing shoes", "water shoes", "slippers", "house shoes", "flip flops", "crocs",
        "platform shoes", "creepers", "saddle shoes", "wingtips", "huaraches", "churros shoes", "desert boots", "chukka boots", "duck boots", "wellingtons",
        "gaiters", "galoshes", "overshoes", "barefoot shoes", "track spikes", "wrestling shoes", "boxing shoes", "weightlifting shoes", "snowshoes", "ice skates"
        ]
    },
    {
        tip: "Bags and Luggage",
        words: [
        "backpack", "rucksack", "daypack", "handbag", "purse", "tote bag", "shoulder bag", "crossbody bag", "clutch", "evening bag",
        "satchel", "messenger bag", "briefcase", "laptop bag", "duffel bag", "gym bag", "weekender bag", "holdall", "suitcase", "trolley bag",
        "carry-on", "checked luggage", "garment bag", "trunk", "chest", "fanny pack", "belt bag", "waist pack", "drawstring bag", "sackpack",
        "tote", "canvas tote", "shopping bag", "grocery bag", "reusable bag", "beach bag", "diaper bag", "camera bag", "cooler bag", "picnic basket",
        "cosmetic bag", "toiletry bag", "dopp kit", "makeup case", "pencil case", "coin purse", "wallet", "billfold", "card holder", "passport holder",
        "money belt", "dry bag", "waterproof bag", "dry sack", "hydration pack", "ski bag", "snowboard bag", "golf bag", "racket bag", "instrument case",
        "gig bag", "hatbox", "shoebag", "laundry bag", "garment sleeve", "rolling suitcase", "spinner luggage", "hard shell suitcase", "soft shell suitcase", "duffle",
        "bagpack", "knapsack", "pouch", "wristlet", "bucket bag", "hobo bag", "baguette bag", "saddle bag", "doctor bag", "bowling bag",
        "barrel bag", "minaudiere", "envelope clutch", "pouch bag", "drawstring pouch", "belt pouch", "tactical backpack", "hiking pack", "expedition pack", "frame pack"
        ]
    },
    {
        tip: "Jewelry and Accessories",
        words: [
        "necklace", "pendant", "choker", "chain", "locket", "pearl necklace", "collar necklace", "ring", "wedding ring", "engagement ring",
        "signet ring", "cocktail ring", "band", "earrings", "stud earrings", "hoop earrings", "drop earrings", "dangle earrings", "chandelier earrings", "cufflinks",
        "bracelet", "bangle", "charm bracelet", "cuff bracelet", "tennis bracelet", "anklet", "brooch", "pin", "lapel pin", "tie clip",
        "tie pin", "watch", "wristwatch", "pocket watch", "smartwatch", "tiara", "diadem", "crown", "hairpin", "hair clip",
        "barrette", "headband", "scrunchie", "hair tie", "fascinator", "sunglasses", "eyeglasses", "spectacles", "monocle", "magnifying glass",
        "belt", "leather belt", "chain belt", "suspenders", "scarf", "silk scarf", "wool scarf", "infinity scarf", "shawl", "wrap",
        "stole", "bandana", "handkerchief", "gloves", "leather gloves", "lace gloves", "fingerless gloves", "mittens", "hat", "cap",
        "beanie", "fedora", "beret", "sombrero", "panama hat", "bowler hat", "top hat", "sun hat", "bucket hat", "visor",
        "umbrella", "parasol", "fan", "folding fan", "keychain", "key ring", "lanyard", "compact mirror", "pill box", "card holder"
        ]
    },
    {
        tip: "Seasons and Holidays",
        words: [
        "spring", "summer", "autumn", "fall", "winter", "new year", "new year's eve", "new year's day", "martin luther king day", "valentine's day",
        "presidents' day", "st. patrick's day", "easter", "easter sunday", "good friday", "earth day", "april fools' day", "cinco de mayo", "mother's day", "memorial day",
        "father's day", "juneteenth", "independence day", "fourth of july", "labor day", "patriot day", "columbus day", "indigenous peoples' day", "halloween", "all saints' day",
        "veterans day", "thanksgiving", "black friday", "cyber monday", "hanukkah", "christmas", "christmas eve", "boxing day", "kwanzaa", "new year's eve",
        "solstice", "summer solstice", "winter solstice", "equinox", "spring equinox", "autumnal equinox", "carnival", "mardi gras", "ash wednesday", "lent", "palm sunday", "passover", "ramadan", "eid al-fitr", "eid al-adha", "diwali", "holi", "chinese new year", "lunar new year", "lantern festival",
        "mid-autumn festival", "dragon boat festival", "day of the dead", "bonfire night", "guy fawkes night", "thanksgiving dinner", "harvest festival", "oktoberfest", "groundhog day", "arbor day",
        "flag day", "constitution day", "pi day", "star wars day", "talk like a pirate day", "super bowl sunday", "spring break", "summer vacation", "winter break", "holiday season",
        "advent", "twelve days of christmas", "yule", "vernal equinox", "indian summer", "dog days of summer", "white christmas", "festivus", "bank holiday", "national day"
        ]
    }
];