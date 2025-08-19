// Dane gry - miasta z wskazówkami
const gameData = [
    {
        city: "nowy dwór mazowiecki",
        clues: ["Marcel", "Modlin Airport", "Dębinka"]
    },
    {
        city: "sopot",
        clues: ["Oliwier", "Molo", "Krzywy domek"]
    },
    {
        city: "bańkowszczyzna",
        clues: ["Bańki", "Las", "Ukraina"]
    },
    {
        city: "konin",
        clues: ["Ola", "Fagata", "Jezioro Turkusowe"]
    },
    {
        city: "świebodzin",
        clues: ["Brunet", "Pomnik Jezusa", "Trasa S3"]
    },
    {
        city: "nowy dwór gdański",
        clues: ["Miki BSP", "Kawa z rana", "Moderator dis"]
    },
    {
        city: "chełm",
        clues: ["206", "Wzgórze katedralne", "Lubelskie"]
    },
    {
        city: "warszawa",
        clues: ["Biały kloc", "Łazienki", "Bulwary wiślane"]
    },
    {
        city: "kraków",
        clues: ["Genzie", "Smok", "Faza"]
    },
    {
        city: "mońki",
        clues: ["Paniczko", "Podlasie", "Guessr"]
    },
    {
        city: "toruń",
        clues: ["Pierniki", "Kopernik", "Krzywa wieża"]
    },
    {
        city: "tczew",
        clues: ["Dżelifrucik", "Przejazd pociągiem", "Chusteczki"]
    },
    {
        city: "chęciny",
        clues: ["Zamek", "Bartek Kubicki", "Jaskinie"]
    },
    {
        city: "cyców",
        clues: ["Dudek", "Piersi", "Lubelskie"]
    },
    {
        city: "ciechocinek",
        clues: ["Rankingi", "Tego to ja nie znam", "Tężnie"]
    },
    {
        city: "wrocław",
        clues: ["Krasnale", "Odra", "Hala stulecia"]
    },
    {
        city: "bytom",
        clues: ["Śląsk", "Adiko", "Kamienice"]
    },
    {
        city: "lublin",
        clues: ["SNS", "Cebularz", "Majdanek"]
    },
    {
        city: "gdańsk",
        clues: ["Wybuch w biedronce", "Stocznia", "Krewetka"]
    },
    {
        city: "kopenhaga",
        clues: ["Rowery", "Lego", "Msp ApS"]
    },
    {
        city: "marsa alam",
        clues: ["Morze", "Rafa koralowa", "Pustynia"]
    },
    {
        city: "kwidzyn",
        clues: ["Kopuła", "Kebab", "Katedra"]
    },
    {
        city: "rozłogi",
        clues: ["Stary adres", "Zadupie", "Lubuskie"]
    },
    {
        city: "stegna",
        clues: ["Gosia", "Bałtyk", "Plażowanie"]
    },
    {
        city: "tomaszów mazowiecki",
        clues: ["Daniel", "Lena", "Pilica"]
    },
    {
        city: "piotrków trybunalski",
        clues: ["Zamek", "Alkohol Trybunał", "Rynek"]
    },
    {
        city: "skierniewice",
        clues: ["Kwiatki", "Facebook", "Balkon"]
    },
    {
        city: "słupca",
        clues: ["Ola", "Dożynki", "Wielkopolska"]
    },
    {
        city: "wadowice",
        clues: ["Daniel", "Kremówka", "Papież"]
    },
    {
        city: "białystok",
        clues: ["Obok Moniek", "puszcza Białowieska", "Pałac Branickich"]
    },
    {
        city: "rawicz",
        clues: ["Więzienie", "Wielkopolska", "Zakład karny"]
    },
    {
        city: "włocławek",
        clues: ["Filiżanki", "Chemia", "Więzienie"]
    },
    {
        city: "kołobrzeg",
        clues: ["Latarnia Morska", "Uzdrowisko", "Emeryci"]
    },
    {
        city: "paryż",
        clues: ["Sekawana", "Luwr", "Moda"]
    },
    {
        city: "burgas",
        clues: ["Morze czarne", "Lotnisko", "Obozy"]
    },
    {
        city: "londyn",
        clues: ["Fabi", "Korona", "Red"]
    },
    {
        city: "amsterdam",
        clues: ["Koncert", "Tulipany", "Kanały"]
    },
    {
        city: "radom",
        clues: ["Lotnisko", "Mazowieckie", "AirShow"]
    },
    {
        city: "gdynia",
        clues: ["Dar Pomorza", "Opener", "Sea Tower"]
    },
    {
        city: "łomża",
        clues: ["Piwo", "Narwiański park", "Narew"]
    },
    {
        city: "łowicz",
        clues: ["Folklor", "Danusia", "Dżemy"]
    },
    {
        city: "zakroczym",
        clues: ["Stolica przez 1 dzień", "Fabi", "Powiat Nowodworski"]
    },
    {
        city: "poznań",
        clues: ["Rozkopany", "Koziołki", "Rogale"]
    }
];

let currentScore = 0;
let currentXP = 0;
let currentLevel = 1;
let currentCityIndex = 0;
let usedCities = [];
let currentHintLevel = 0;
let currentShuffledClues = [];
let gameTimer = null;
let timeLeft = 30;
let hasVip = false;
let hasExpert = false;
let hasMystery = false;
let isHardcoreMode = false;
// System osiągnięć - kompletna implementacja z dostosowanymi nagrodami
const achievements = [
    {
        id: 'firststep',
        name: 'Pierwszy Krok',
        icon: '🎉',
        description: 'Zgadnij swoje pierwsze miasto',
        reward: '10 XP i 10 punktów',
        xpReward: 10,
        pointsReward: 10,
        checkCondition: () => playerStats.totalCitiesGuessed >= 1
    },
    {
        id: 'genius',
        name: 'Geniusz',
        icon: '🧠',
        description: 'Zgadnij miasto bez dodatkowych wskazówek',
        reward: '15 XP i 15 punktów',
        xpReward: 15,
        pointsReward: 15,
        checkCondition: () => playerStats.guessedWithoutHints > 0
    },
    {
        id: 'capitalexplorer',
        name: 'Odkrywca Stolic',
        icon: '🏛️',
        description: 'Zgadnij swoją pierwszą stolicę',
        reward: '15 XP i 15 punktów',
        xpReward: 15,
        pointsReward: 15,
        checkCondition: () => playerStats.totalCapitalsGuessed >= 1
    },
    {
        id: 'beginnersmaster',
        name: 'Początkujący Mistrz',
        icon: '🎯',
        description: 'Osiągnij poziom 10',
        reward: '25 XP i 25 punktów',
        xpReward: 25,
        pointsReward: 25,
        checkCondition: () => currentLevel >= 10
    },
    {
        id: 'hotstreak',
        name: 'Gorąca Passa',
        icon: '🔥',
        description: 'Zgadnij 5 miast z rzędu',
        reward: '20 XP i 20 punktów',
        xpReward: 20,
        pointsReward: 20,
        checkCondition: () => playerStats.maxStreak >= 5
    },
    {
        id: 'lightning',
        name: 'Błyskawica',
        icon: '⚡',
        description: 'Zgadnij miasto w <5s w trybie podpowiedzi',
        reward: '25 XP i 25 punktów',
        xpReward: 25,
        pointsReward: 25,
        checkCondition: () => playerStats.fastestGuessClues < 5
    },
    {
        id: 'eagleeye',
        name: 'Oko Sokoła',
        icon: '📸',
        description: 'Zgadnij miasto <5s w trybie zdjęć',
        reward: '30 XP i 30 punktów',
        xpReward: 30,
        pointsReward: 30,
        checkCondition: () => playerStats.fastestGuessPhoto < 5
    },
    {
        id: 'speedydiplomat',
        name: 'Szybki Dyplomata',
        icon: '🏃',
        description: 'Zgadnij stolicę w <5s',
        reward: '30 XP i 30 punktów',
        xpReward: 30,
        pointsReward: 30,
        checkCondition: () => playerStats.fastestGuessCapital < 5
    },
    {
        id: 'hardcorewarrior',
        name: 'Wojownik Hardcore',
        icon: '💀',
        description: 'Zgadnij pierwsze miasto w trybie hardcore',
        reward: '30 XP i 30 punktów',
        xpReward: 30,
        pointsReward: 30,
        checkCondition: () => playerStats.hardcoreCitiesGuessed >= 1
    },
    {
        id: 'traveler',
        name: 'Podróżnik',
        icon: '🌍',
        description: 'Zgadnij łącznie 50 miast',
        reward: '35 XP i 35 punktów',
        xpReward: 35,
        pointsReward: 35,
        checkCondition: () => playerStats.totalCitiesGuessed >= 50
    },
    {
        id: 'europeanexpert',
        name: 'Ekspert Europy',
        icon: '🇪🇺',
        description: 'Zgadnij 25 stolic europejskich',
        reward: '40 XP i 40 punktów',
        xpReward: 40,
        pointsReward: 40,
        checkCondition: () => playerStats.totalCapitalsGuessed >= 25
    },
    {
        id: 'asianexplorer',
        name: 'Odkrywca Azji',
        icon: '🏯',
        description: 'Zgadnij swoją pierwszą azjatycką stolicę',
        reward: '35 XP i 35 punktów',
        xpReward: 35,
        pointsReward: 35,
        checkCondition: () => playerStats.totalAsianCapitalsGuessed >= 1
    },
    {
        id: 'hardcorelightning',
        name: 'Błyskawica Hardcore',
        icon: '⚡',
        description: 'Zgadnij miasto w <5s w trybie hardcore',
        reward: '35 XP i 35 punktów',
        xpReward: 35,
        pointsReward: 35,
        checkCondition: () => playerStats.hardcoreFastestGuess < 5
    },
    {
        id: 'geographyexpert',
        name: 'Ekspert Geografii',
        icon: '🏆',
        description: 'Osiągnij poziom 20',
        reward: '40 XP i 40 punktów',
        xpReward: 40,
        pointsReward: 40,
        checkCondition: () => currentLevel >= 20
    },
    {
        id: 'thousander',
        name: 'Tysiącnik',
        icon: '💰',
        description: 'Zgromadź 1000 punktów',
        reward: '40 XP i 40 punktów',
        xpReward: 40,
        pointsReward: 40,
        checkCondition: () => currentScore >= 1000
    },
    {
        id: 'hardcoresurvival',
        name: 'Przetrwanie Hardcore',
        icon: '⚰️',
        description: 'Osiągnij serię 10 w trybie hardcore',
        reward: '40 XP i 40 punktów',
        xpReward: 40,
        pointsReward: 40,
        checkCondition: () => playerStats.hardcoreMaxStreak >= 10
    },
    {
        id: 'perfectionist',
        name: 'Perfekcjonista',
        icon: '🌟',
        description: 'Zgadnij wszystkie miasta w rundzie podpowiedzi',
        reward: '45 XP i 45 punktów',
        xpReward: 45,
        pointsReward: 45,
        checkCondition: () => playerStats.perfectRoundsClues > 0
    },
    {
        id: 'imagemaster',
        name: 'Mistrz Obrazów',
        icon: '🎨',
        description: 'Zgadnij wszystkie miasta w rundzie z trybem zdjęć',
        reward: '45 XP i 45 punktów',
        xpReward: 45,
        pointsReward: 45,
        checkCondition: () => playerStats.perfectRoundsPhoto > 0
    },
    {
        id: 'asianscholar',
        name: 'Azjatycki Uczony',
        icon: '🥋',
        description: 'Zgadnij 25 azjatyckich stolic',
        reward: '45 XP i 45 punktów',
        xpReward: 45,
        pointsReward: 45,
        checkCondition: () => playerStats.totalAsianCapitalsGuessed >= 25
    },
    {
        id: 'geographer',
        name: 'Geograf',
        icon: '🗺️',
        description: 'Zgadnij łącznie 100 miast',
        reward: '50 XP i 50 punktów',
        xpReward: 50,
        pointsReward: 50,
        checkCondition: () => playerStats.totalCitiesGuessed >= 100
    },
    {
        id: 'hardcoremaster',
        name: 'Mistrz Hardcore',
        icon: '🔥',
        description: 'Zgadnij 50 miast w trybie hardcore',
        reward: '50 XP i 50 punktów',
        xpReward: 50,
        pointsReward: 50,
        checkCondition: () => playerStats.hardcoreCitiesGuessed >= 50
    },
    {
        id: 'capitalmaster',
        name: 'Mistrz Stolic',
        icon: '👑',
        description: 'Zgadnij wszystkie stolice Europy',
        reward: '60 XP i 60 punktów',
        xpReward: 60,
        pointsReward: 60,
        checkCondition: () => playerStats.perfectRoundsCapitals > 0
    },
    {
        id: 'dragonmaster',
        name: 'Mistrz Smoków',
        icon: '🐉',
        description: 'Zgadnij wszystkie stolice Azji',
        reward: '70 XP i 70 punktów',
        xpReward: 70,
        pointsReward: 70,
        checkCondition: () => playerStats.perfectRoundsAsianCapitals > 0
    },
    {
        id: 'samurai',
        name: 'Samuraj',
        icon: '⚔️',
        description: 'Zgadnij azjatycką stolicę w <3s',
        reward: '60 XP i 60 punktów',
        xpReward: 60,
        pointsReward: 60,
        checkCondition: () => playerStats.fastestGuessAsianCapital < 3
    }
];

let unlockedAchievements = new Set();

// Rozszerzone statystyki gracza
let playerStats = {
    // Podstawowe statystyki miast
    totalCitiesGuessed: 0,
    totalCitiesFailed: 0,
    currentStreak: 0,
    maxStreak: 0,
    fastestGuessClues: 999,
    fastestGuessPhoto: 999,
    fastestGuessCapital: 999,
    fastestGuessAsianCapital: 999,
    perfectRoundsClues: 0,
    perfectRoundsPhoto: 0,
    perfectRoundsCapitals: 0,
    perfectRoundsAsianCapitals: 0,
    totalCapitalsGuessed: 0,
    totalAsianCapitalsGuessed: 0,
    usedHints: false,
    guessedWithoutHints: 0,
    
    // Nowe statystyki
    totalPointsEarned: 0,
    totalPointsSpent: 0,
    shopPurchases: 0,
    gameSessions: 0,
    gameStarts: 0,
    firstGameDate: null,
    totalPhotoCitiesGuessed: 0,
    
    // Punkty tracone
    pointsLostTimeouts: 0,
    pointsLostSkips: 0,
    pointsLostWrong: 0,
    
    // Statystyki trybu hardcore
    hardcoreCitiesGuessed: 0,
    hardcoreCitiesFailed: 0,
    hardcoreCurrentStreak: 0,
    hardcoreMaxStreak: 0,
    hardcoreFastestGuess: 999,
    hardcorePointsLost: 0,
    hardcoreTimeOuts: 0
};
let currentRiddle = 0;
let riddleAnswers = [
    { question: "Jak nazywa się pies, który spierdala?", answer: "gengar" },
    { question: "Czy Danusia wygrała 2 edycję FARMY?", answer: "nie" },
    { question: "Jaki jest najlepszy serwer w Minecraft?", answers: ["hankowice", "zebowice"] }
];

// Liczniki zgadniętych miast
let correctlyGuessedCities = 0;
let correctlyGuessedPhotoCities = 0;

// Dane dla trybu gry ze zdjęciami
const photoGameData = [
    { city: "chełm", image: "miasta/chelm.PNG" },
    { city: "częstochowa", image: "miasta/czestochowa.PNG" },
    { city: "gdańsk", image: "miasta/gdansk.PNG" },
    { city: "kraków", image: "miasta/krakow.PNG" },
    { city: "nowy dwór mazowiecki", image: "miasta/ndm.PNG" },
    { city: "piotrków trybunalski", image: "miasta/piotrkow.PNG" },
    { city: "poznań", image: "miasta/poznan.PNG" },
    { city: "sopot", image: "miasta/sopot.PNG" },
    { city: "świebodzin", image: "miasta/swiebodzin.PNG" },
    { city: "szczecin", image: "miasta/szczecin.PNG" },
    { city: "wadowice", image: "miasta/wadowice.PNG" },
    { city: "warszawa", image: "miasta/warszawa.PNG" },
    { city: "wrocław", image: "miasta/wroclaw.PNG" }
];

// Dane dla trybu gry ze stolicami - Europa i Azja
const capitalGameData = {
    europa: [
        { country: "Polska", capital: "warszawa" },
        { country: "Niemcy", capital: "berlin" },
        { country: "Francja", capital: "paryż" },
        { country: "Hiszpania", capital: "madryt" },
        { country: "Włochy", capital: "rzym" },
        { country: "Wielka Brytania", capital: "londyn" },
        { country: "Norwegia", capital: "oslo" },
        { country: "Szwecja", capital: "sztokholm" },
        { country: "Dania", capital: "kopenhaga" },
        { country: "Finlandia", capital: "helsinki" },
        { country: "Czechy", capital: "praga" },
        { country: "Słowacja", capital: "bratysława" },
        { country: "Węgry", capital: "budapeszt" },
        { country: "Austria", capital: "wiedeń" },
        { country: "Szwajcaria", capital: "berno" },
        { country: "Holandia", capital: "amsterdam" },
        { country: "Belgia", capital: "bruksela" },
        { country: "Luksemburg", capital: "luksemburg" },
        { country: "Portugalia", capital: "lizbona" },
        { country: "Grecja", capital: "ateny" },
        { country: "Rumunia", capital: "bukareszt" },
        { country: "Bułgaria", capital: "sofia" },
        { country: "Chorwacja", capital: "zagrzeb" },
        { country: "Serbia", capital: "belgrad" },
        { country: "Słowenia", capital: "lublana" },
        { country: "Bosnia i Hercegowina", capital: "sarajewo" },
        { country: "Czarnogóra", capital: "podgorica" },
        { country: "Albania", capital: "tirana" },
        { country: "Macedonia Północna", capital: "skopje" },
        { country: "Kosowo", capital: "prisztina" },
        { country: "Litwa", capital: "wilno" },
        { country: "Łotwa", capital: "ryga" },
        { country: "Estonia", capital: "tallin" },
        { country: "Białoruś", capital: "mińsk" },
        { country: "Ukraina", capital: "kijów" },
        { country: "Rosja", capital: "moskwa" },
        { country: "Mołdawia", capital: "kiszyniów" },
        { country: "Irlandia", capital: "dublin" },
        { country: "Islandia", capital: "rejkjavik" },
        { country: "Malta", capital: "valletta" },
        { country: "Cypr", capital: "nikozja" },
        { country: "Andora", capital: "andora" },
        { country: "Monako", capital: "monako" },
        { country: "San Marino", capital: "san marino" },
        { country: "Watykan", capital: "watykan" },
        { country: "Liechtenstein", capital: "vaduz" },
        { country: "Turcja", capital: "ankara" }
    ],
    azja: [
        { country: "Chiny", capital: "pekin" },
        { country: "Japonia", capital: "tokio" },
        { country: "Korea Południowa", capital: "seul" },
        { country: "Korea Północna", capital: "pjongjang" },
        { country: "Mongolia", capital: "ułan bator" },
        { country: "Indie", capital: "nowe delhi" },
        { country: "Pakistan", capital: "islamabad" },
        { country: "Bangladesz", capital: "dhaka" },
        { country: "Sri Lanka", capital: "kolombo" },
        { country: "Nepal", capital: "katmandu" },
        { country: "Bhutan", capital: "thimphu" },
        { country: "Afganistan", capital: "kabul" },
        { country: "Iran", capital: "teheran" },
        { country: "Irak", capital: "bagdad" },
        { country: "Turcja", capital: "ankara" },
        { country: "Syria", capital: "damaszek" },
        { country: "Liban", capital: "bejrut" },
        { country: "Jordania", capital: "amman" },
        { country: "Izrael", capital: "jerozolima" },
        { country: "Palestyna", capital: "ramallah" },
        { country: "Arabia Saudyjska", capital: "rijad" },
        { country: "Jemen", capital: "sana" },
        { country: "Oman", capital: "maskat" },
        { country: "Zjednoczone Emiraty Arabskie", capital: "abu zabi" },
        { country: "Katar", capital: "doha" },
        { country: "Bahrajn", capital: "manama" },
        { country: "Kuwejt", capital: "kuwejt" },
        { country: "Kazachstan", capital: "nur-sułtan" },
        { country: "Uzbekistan", capital: "taszkent" },
        { country: "Turkmenistan", capital: "aszchabad" },
        { country: "Tadżykistan", capital: "duszanbe" },
        { country: "Kirgistan", capital: "biszkek" },
        { country: "Azerbejdżan", capital: "baku" },
        { country: "Armenia", capital: "erewan" },
        { country: "Gruzja", capital: "tbilisi" },
        { country: "Tajlandia", capital: "bangkok" },
        { country: "Wietnam", capital: "hanoi" },
        { country: "Laos", capital: "wientian" },
        { country: "Kambodża", capital: "phnom penh" },
        { country: "Myanmar", capital: "naypyidaw" },
        { country: "Malezja", capital: "kuala lumpur" },
        { country: "Singapur", capital: "singapur" },
        { country: "Indonezja", capital: "dżakarta" },
        { country: "Brunei", capital: "bandar seri begawan" },
        { country: "Filipiny", capital: "manila" },
        { country: "Timor Wschodni", capital: "dili" },
        { country: "Mjanma", capital: "naypyidaw" },
        { country: "Maldawy", capital: "male" }
    ]
};

let photoCurrentCityIndex = 0;
let photoUsedCities = [];
let hasPhotoMode = false;

// Zmienne dla trybu gry ze stolicami
let capitalCurrentCountryIndex = 0;
let capitalUsedCountries = [];
let currentContinent = 'europa';
let capitalGameAvailable = false;
let correctlyGuessedCapitals = 0;

// Elementy DOM
const lobbyScreen = document.getElementById('lobby');
const gameModeScreen = document.getElementById('gameMode');
const gameScreen = document.getElementById('game');
const photoGameScreen = document.getElementById('photoGame');
const shopScreen = document.getElementById('shop');
const riddleScreen = document.getElementById('riddle');
const codesScreen = document.getElementById('codes');
const playButton = document.getElementById('playButton');
const cluesGameButton = document.getElementById('cluesGameButton');
const photoGameButton = document.getElementById('photoGameButton');
const shopButton = document.getElementById('shopButton');
const mysteryButton = document.getElementById('mysteryButton');
const codesButton = document.getElementById('codesButton');
const achievementsButton = document.getElementById('achievementsButton');
const achievementsScreen = document.getElementById('achievements');
const statisticsButton = document.getElementById('statisticsButton');
const statisticsScreen = document.getElementById('statistics');
const scoreElement = document.getElementById('score');
const lobbyScoreElement = document.getElementById('lobbyScore');
const shopScoreElement = document.getElementById('shopScore');
const lobbyLevelElement = document.getElementById('lobbyLevel');
const levelElement = document.getElementById('level');
const xpElement = document.getElementById('xp');
const remainingCitiesElement = document.getElementById('remainingCities');
const vipStatusElement = document.getElementById('vipStatus');
const clue1 = document.getElementById('clue1');
const clue2 = document.getElementById('clue2');
const clue3 = document.getElementById('clue3');
const cityInput = document.getElementById('cityInput');
const submitButton = document.getElementById('submitButton');
const nextButton = document.getElementById('nextButton');
const hintButton = document.getElementById('hintButton');
const skipButton = document.getElementById('skipButton');
const timerElement = document.getElementById('timer');
const messageElement = document.getElementById('message');
const backToLobby = document.getElementById('backToLobby');
const backToLobbyFromShop = document.getElementById('backToLobbyFromShop');
const buyVipButton = document.getElementById('buyVip');
const buyPhotoModeButton = document.getElementById('buyPhotoMode');
const buyExpertButton = document.getElementById('buyExpert');
const buyMysteryButton = document.getElementById('buyMystery');
const vipItem = document.getElementById('vipItem');
const photoModeItem = document.getElementById('photoModeItem');
const expertItem = document.getElementById('expertItem');
const mysteryItem = document.getElementById('mysteryItem');
const riddleQuestion = document.getElementById('riddleQuestion');
const riddleInput = document.getElementById('riddleInput');
const riddleSubmit = document.getElementById('riddleSubmit');
const riddleMessage = document.getElementById('riddleMessage');
const riddleProgress = document.getElementById('riddleProgress');
const backToLobbyFromRiddle = document.getElementById('backToLobbyFromRiddle');
const codesScoreElement = document.getElementById('codesScore');
const codeInput = document.getElementById('codeInput');
const codeSubmit = document.getElementById('codeSubmit');
const codeMessage = document.getElementById('codeMessage');
const backToLobbyFromCodes = document.getElementById('backToLobbyFromCodes');

// Elementy trybu gry ze stolicami
const continentSelectionScreen = document.getElementById('continentSelection');
const capitalGameScreen = document.getElementById('capitalGame');
const capitalGameButton = document.getElementById('capitalGameButton');
const europeButton = document.getElementById('europeButton');
const backToGameModeFromContinent = document.getElementById('backToGameModeFromContinent');
const capitalGameScoreElement = document.getElementById('capitalGameScore');
const capitalGameLevelElement = document.getElementById('capitalGameLevel');
const capitalGameXpElement = document.getElementById('capitalGameXp');
const capitalGameRemainingCitiesElement = document.getElementById('capitalGameRemainingCities');
const countryNameElement = document.getElementById('countryName');
const capitalGameInput = document.getElementById('capitalGameInput');
const capitalGameSubmitButton = document.getElementById('capitalGameSubmitButton');
const capitalGameNextButton = document.getElementById('capitalGameNextButton');
const capitalGameSkipButton = document.getElementById('capitalGameSkipButton');
const capitalGameMessageElement = document.getElementById('capitalGameMessage');
const capitalGameTimerElement = document.getElementById('capitalGameTimer');
const backToContinentFromCapitalGame = document.getElementById('backToContinentFromCapitalGame');

// Elementy trybu fotograficznego
const photoGameScoreElement = document.getElementById('photoGameScore');
const photoGameLevelElement = document.getElementById('photoGameLevel');
const photoGameXpElement = document.getElementById('photoGameXp');
const photoGameRemainingCitiesElement = document.getElementById('photoGameRemainingCities');
const photoGameCityInput = document.getElementById('photoGameCityInput');
const photoGameSubmitButton = document.getElementById('photoGameSubmitButton');
const photoGameNextButton = document.getElementById('photoGameNextButton');
const photoGameSkipButton = document.getElementById('photoGameSkipButton');
const photoGameMessageElement = document.getElementById('photoGameMessage');
const photoGameCityImage = document.getElementById('photoGameCityImage');
const photoGameTimerElement = document.getElementById('photoGameTimer');
const backToLobbyFromGameMode = document.getElementById('backToLobbyFromGameMode');
const backToGameModeFromPhotoGame = document.getElementById('backToGameModeFromPhotoGame');

// ESC key handler for returning to lobby
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Check which screen is currently visible and return to lobby
        if (!achievementsScreen.classList.contains('hidden')) {
            achievementsScreen.classList.add('hidden');
            lobbyScreen.classList.remove('hidden');
            const animations = ['lobby-entrance-slide', 'lobby-entrance-zoom', 'lobby-entrance-rotate', 'lobby-transition'];
            const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
            lobbyScreen.classList.add(randomAnimation);
            setTimeout(() => lobbyScreen.classList.remove(randomAnimation), 1200);
            updateLobbyScore();
        } else if (!statisticsScreen.classList.contains('hidden')) {
            statisticsScreen.classList.add('hidden');
            lobbyScreen.classList.remove('hidden');
            const animations = ['lobby-entrance-slide', 'lobby-entrance-zoom', 'lobby-entrance-rotate', 'lobby-transition'];
            const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
            lobbyScreen.classList.add(randomAnimation);
            setTimeout(() => lobbyScreen.classList.remove(randomAnimation), 1200);
            updateLobbyScore();
        } else if (!shopScreen.classList.contains('hidden')) {
            shopScreen.classList.add('hidden');
            lobbyScreen.classList.remove('hidden');
            const animations = ['lobby-entrance-slide', 'lobby-entrance-zoom', 'lobby-entrance-rotate', 'lobby-transition'];
            const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
            lobbyScreen.classList.add(randomAnimation);
            setTimeout(() => lobbyScreen.classList.remove(randomAnimation), 1200);
            updateLobbyScore();
        } else if (!codesScreen.classList.contains('hidden')) {
            codesScreen.classList.add('hidden');
            lobbyScreen.classList.remove('hidden');
            const animations = ['lobby-entrance-slide', 'lobby-entrance-zoom', 'lobby-entrance-rotate', 'lobby-transition'];
            const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
            lobbyScreen.classList.add(randomAnimation);
            setTimeout(() => lobbyScreen.classList.remove(randomAnimation), 1200);
            updateLobbyScore();
        } else if (!gameModeScreen.classList.contains('hidden')) {
            gameModeScreen.classList.add('hidden');
            lobbyScreen.classList.remove('hidden');
            const animations = ['lobby-entrance-slide', 'lobby-entrance-zoom', 'lobby-entrance-rotate', 'lobby-transition'];
            const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
            lobbyScreen.classList.add(randomAnimation);
            setTimeout(() => lobbyScreen.classList.remove(randomAnimation), 1200);
            updateLobbyScore();
        }
    }
});

// Event listeners
if (playButton) playButton.addEventListener('click', showGameModeSelection);
if (cluesGameButton) cluesGameButton.addEventListener('click', startGame);
if (photoGameButton) photoGameButton.addEventListener('click', startPhotoGame);
if (capitalGameButton) capitalGameButton.addEventListener('click', showContinentSelection);
if (shopButton) shopButton.addEventListener('click', showShop);
if (mysteryButton) mysteryButton.addEventListener('click', showRiddle);
if (codesButton) codesButton.addEventListener('click', showCodes);
if (achievementsButton) achievementsButton.addEventListener('click', showAchievements);
if (statisticsButton) statisticsButton.addEventListener('click', showStatistics);

// Back button from achievements
const backToLobbyFromAchievements = document.getElementById('backToLobbyFromAchievements');
if (backToLobbyFromAchievements) backToLobbyFromAchievements.addEventListener('click', () => {
        achievementsScreen.classList.add('hidden');
        lobbyScreen.classList.remove('hidden');

        // Losowa animacja powrotu
        const animations = ['lobby-entrance-slide', 'lobby-entrance-zoom', 'lobby-entrance-rotate', 'lobby-transition'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

        lobbyScreen.classList.add(randomAnimation);
        setTimeout(() => lobbyScreen.classList.remove(randomAnimation), 1200);
        updateLobbyScore();
    });

// Back button from statistics
const backToLobbyFromStatistics = document.getElementById('backToLobbyFromStatistics');
if (backToLobbyFromStatistics) backToLobbyFromStatistics.addEventListener('click', () => {
        statisticsScreen.classList.add('hidden');
        lobbyScreen.classList.remove('hidden');

        // Losowa animacja powrotu
        const animations = ['lobby-entrance-slide', 'lobby-entrance-zoom', 'lobby-entrance-rotate', 'lobby-transition'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

        lobbyScreen.classList.add(randomAnimation);
        setTimeout(() => lobbyScreen.classList.remove(randomAnimation), 1200);
        updateLobbyScore();
    });

// Elements for hardcore mode
const hardcoreModeButton = document.getElementById('hardcoreModeButton');
const hardcoreModeIndicator = document.getElementById('hardcoreModeIndicator');
const hardcoreModeIndicatorGameMode = document.getElementById('hardcoreModeIndicatorGameMode');
const hardcoreModeIndicatorGame = document.getElementById('hardcoreModeIndicatorGame');
const hardcoreModeIndicatorPhotoGame = document.getElementById('hardcoreModeIndicatorPhotoGame');
const hardcoreModeIndicatorContinent = document.getElementById('hardcoreModeIndicatorContinent');
const hardcoreModeIndicatorCapitalGame = document.getElementById('hardcoreModeIndicatorCapitalGame');

// Reset statistics button
const resetStatsButton = document.getElementById('resetStatsButton');
if (resetStatsButton) resetStatsButton.addEventListener('click', resetStatistics);
if (submitButton) submitButton.addEventListener('click', checkAnswer);
if (nextButton) nextButton.addEventListener('click', nextCity);
if (hintButton) hintButton.addEventListener('click', showNextHint);
if (skipButton) skipButton.addEventListener('click', skipCity);
if (backToLobby) backToLobby.addEventListener('click', returnToLobby);
if (backToLobbyFromShop) backToLobbyFromShop.addEventListener('click', returnToLobbyFromShop);
if (backToLobbyFromRiddle) backToLobbyFromRiddle.addEventListener('click', returnToLobbyFromRiddle);
if (backToLobbyFromCodes) backToLobbyFromCodes.addEventListener('click', returnToLobbyFromCodes);
if (buyVipButton) buyVipButton.addEventListener('click', buyVip);
if (buyPhotoModeButton) buyPhotoModeButton.addEventListener('click', buyPhotoMode);
if (buyExpertButton) buyExpertButton.addEventListener('click', buyExpert);
if (buyMysteryButton) buyMysteryButton.addEventListener('click', buyMystery);
if (riddleSubmit) riddleSubmit.addEventListener('click', checkRiddleAnswer);
if (codeSubmit) codeSubmit.addEventListener('click', checkCode);
if (cityInput) cityInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

if (riddleInput) riddleInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkRiddleAnswer();
    }
});

if (codeInput) codeInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkCode();
    }
});

if (backToLobbyFromGameMode) backToLobbyFromGameMode.addEventListener('click', () => {
        gameModeScreen.classList.add('hidden');
        lobbyScreen.classList.remove('hidden');

        // Losowa animacja powrotu
        const animations = ['lobby-entrance-slide', 'lobby-entrance-zoom', 'lobby-entrance-rotate', 'lobby-transition'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

        lobbyScreen.classList.add(randomAnimation);
        setTimeout(() => lobbyScreen.classList.remove(randomAnimation), 1200);
        updateLobbyScore();
    });
if (backToGameModeFromPhotoGame) backToGameModeFromPhotoGame.addEventListener('click', returnToGameModeFromPhotoGame);
if (photoGameSubmitButton) photoGameSubmitButton.addEventListener('click', checkPhotoGameAnswer);
if (photoGameNextButton) photoGameNextButton.addEventListener('click', nextPhotoGameCity);
if (photoGameSkipButton) photoGameSkipButton.addEventListener('click', skipPhotoGameCity);

if (photoGameCityInput) photoGameCityInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPhotoGameAnswer();
    }
});

// Event listeners dla trybu stolic
if (europeButton) europeButton.addEventListener('click', () => startCapitalGame('europa'));
const asiaButton = document.getElementById('asiaButton');
const africaButton = document.getElementById('africaButton');
const americaButton = document.getElementById('americaButton');

if (asiaButton) asiaButton.addEventListener('click', () => {
    if (currentLevel >= 10) {
        startCapitalGame('azja');
    } else {
        showLevelRequirementMessage('Azja', 10);
    }
});
if (africaButton) africaButton.addEventListener('click', () => showFutureUpdateMessage('Afryka'));
if (americaButton) americaButton.addEventListener('click', () => showFutureUpdateMessage('Ameryka'));

if (backToGameModeFromContinent) backToGameModeFromContinent.addEventListener('click', returnToGameModeFromContinent);
if (capitalGameSubmitButton) capitalGameSubmitButton.addEventListener('click', checkCapitalGameAnswer);
if (capitalGameNextButton) capitalGameNextButton.addEventListener('click', nextCapitalGameCountry);
if (capitalGameSkipButton) capitalGameSkipButton.addEventListener('click', skipCapitalGameCountry);
if (backToContinentFromCapitalGame) backToContinentFromCapitalGame.addEventListener('click', returnToContinentFromCapitalGame);

if (capitalGameInput) capitalGameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkCapitalGameAnswer();
    }
});

if (hardcoreModeButton) hardcoreModeButton.addEventListener('click', toggleHardcoreMode);

// Funkcja do normalizacji tekstu (usuwanie polskich znaków)
function normalizeText(text) {
    return text.toLowerCase()
        .replace(/ą/g, 'a')
        .replace(/ć/g, 'c')
        .replace(/ę/g, 'e')
        .replace(/ł/g, 'l')
        .replace(/ń/g, 'n')
        .replace(/ó/g, 'o')
        .replace(/ś/g, 's')
        .replace(/ź/g, 'z')
        .replace(/ż/g, 'z');
}

// Funkcja do poprawnego formatowania nazwy miasta
function formatCityName(cityName) {
    return cityName.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Funkcja do pokazywania powiadomień
function showNotification(text, type = '') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = text;
    document.body.appendChild(notification);

    const duration = type === 'achievement' ? 3000 : 2000;
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, duration);
}

// Funkcja timera
function startTimer() {
    timeLeft = isHardcoreMode ? 10 : 30;
    updateTimerDisplay();

    gameTimer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 5) {
            timerElement.classList.add('warning');
        }

        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            timeUp();
        }
    }, 1000);
}

function startPhotoGameTimer() {
    timeLeft = isHardcoreMode ? 10 : 30;
    updatePhotoGameTimerDisplay();

    gameTimer = setInterval(() => {
        timeLeft--;
        updatePhotoGameTimerDisplay();

        if (timeLeft <= 5) {
            photoGameTimerElement.classList.add('warning');
        }

        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            photoGameTimeUp();
        }
    }, 1000);
}

function updateTimerDisplay() {
    timerElement.textContent = `Czas: ${timeLeft}s`;
}

function updatePhotoGameTimerDisplay() {
    photoGameTimerElement.textContent = `Czas: ${timeLeft}s`;
}

function stopTimer() {
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
    if (timerElement) timerElement.classList.remove('warning');
    if (photoGameTimerElement) photoGameTimerElement.classList.remove('warning');
}

function photoGameTimeUp() {
    // Gracz traci punkty gdy czas minie - więcej w trybie hardcore
    const pointsLost = isHardcoreMode ? 50 : 3;
    currentScore -= pointsLost;
    updatePhotoGameScore();

    if (isHardcoreMode) {
        playerStats.hardcoreCurrentStreak = 0;
        playerStats.hardcoreTimeOuts++;
        playerStats.hardcorePointsLost += pointsLost;
    }

    showNotification(`Twój czas minął! Tracisz ${pointsLost} punktów!`, 'timeout');
    showPhotoGameMessage(`Nie zdążyłeś! Poprawna odpowiedź to: ${formatCityName(photoGameData[photoCurrentCityIndex].city)}`, 'error');

    photoGameSubmitButton.style.display = 'none';
    photoGameNextButton.classList.remove('hidden');
    photoGameSkipButton.classList.add('hidden');
    photoGameCityInput.disabled = true;
}

function timeUp() {
    // Gracz traci punkty gdy czas minie - więcej w trybie hardcore
    const pointsLost = isHardcoreMode ? 50 : 5;
    currentScore -= pointsLost;
    updateScore();
    playerStats.currentStreak = 0; // Reset streak on timeout
    
    if (isHardcoreMode) {
        playerStats.hardcoreCurrentStreak = 0;
        playerStats.hardcoreTimeOuts++;
        playerStats.hardcorePointsLost += pointsLost;
    }

    showNotification(`Twój czas minął! Tracisz ${pointsLost} punktów!`, 'timeout');
    showMessage(`Nie zdążyłeś! Poprawna odpowiedź to: ${formatCityName(gameData[currentCityIndex].city)}`, 'error');

    submitButton.style.display = 'none';
    nextButton.classList.remove('hidden');
    hintButton.classList.add('hidden');
    skipButton.classList.add('hidden');
    cityInput.disabled = true;
}

function skipCity() {
    const pointsLost = isHardcoreMode ? 50 : 5;
    currentScore -= pointsLost;
    updateScore();
    playerStats.currentStreak = 0; // Reset streak on skip
    
    if (isHardcoreMode) {
        playerStats.hardcoreCurrentStreak = 0;
        playerStats.hardcorePointsLost += pointsLost;
    }
    
    stopTimer();

    showNotification(`Straciłeś ${pointsLost} punktów!`);
    showMessage(`Pominięto miasto! Poprawna odpowiedź to: ${formatCityName(gameData[currentCityIndex].city)}`, 'error');

    submitButton.style.display = 'none';
    nextButton.classList.remove('hidden');
    hintButton.classList.add('hidden');
    skipButton.classList.add('hidden');
    cityInput.disabled = true;
}

// Funkcja do mieszania tablicy
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function showGameModeSelection() {
    lobbyScreen.classList.add('hidden');
    gameModeScreen.classList.remove('hidden');
    gameModeScreen.classList.add('gamemode-transition');
    setTimeout(() => gameModeScreen.classList.remove('gamemode-transition'), 800);
    updateGameModeButtons();
    createJoysticks();
    updateHardcoreModeDisplay(); // Show hardcore indicator
}

function returnToGameMode() {
    stopTimer();
    gameScreen.classList.add('hidden');
    gameModeScreen.classList.remove('hidden');
    gameModeScreen.classList.add('gamemode-transition');
    setTimeout(() => gameModeScreen.classList.remove('gamemode-transition'), 800);
    updateGameModeButtons();
    resetGame();
}

function returnToGameModeFromPhotoGame() {
    stopTimer();
    photoGameScreen.classList.add('hidden');
    gameModeScreen.classList.remove('hidden');
    gameModeScreen.classList.add('gamemode-transition');
    setTimeout(() => gameModeScreen.classList.remove('gamemode-transition'), 800);
    updateGameModeButtons();
    resetPhotoGame();
}

function updateGameModeButtons() {
    // Aktualizuj przyciski trybu gry
    if (!hasPhotoMode) {
        photoGameButton.classList.add('locked');
        photoGameButton.innerHTML = '🔒 Zgadnij miasto po zdjęciu!';
    } else {
        photoGameButton.classList.remove('locked');
        photoGameButton.innerHTML = '📸 Zgadnij miasto po zdjęciu!';
    }

    // Aktualizuj przycisk trybu stolic
    if (currentLevel < 8) {
        capitalGameButton.classList.add('locked');
        capitalGameButton.innerHTML = '🔒 Zgadnij stolicę po kraju!';
    } else {
        capitalGameButton.classList.remove('locked');
        capitalGameButton.innerHTML = '🌍 Zgadnij stolicę po kraju!';
        capitalGameAvailable = true;
    }
}

function startGame() {
    gameModeScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    updateScore();
    updateLevelDisplay();
    updateRemainingCities();
    showVipStatus(); // Update VIP status for game mode immediately
    updateHardcoreModeDisplay(); // Show hardcore indicator
    loadRandomCity();
}

function startPhotoGame() {
    if (!hasPhotoMode) {
        showNotification('🔒 Musisz najpierw kupić ten tryb w sklepie!', 'error');
        return;
    }

    gameModeScreen.classList.add('hidden');
    photoGameScreen.classList.remove('hidden');
    updatePhotoGameScore();
    updatePhotoGameLevelDisplay();
    updatePhotoGameRemainingCities();
    showVipStatus();
    updateHardcoreModeDisplay(); // Show hardcore indicator
    loadRandomPhotoGameCity();
}

function returnToLobby() {
    stopTimer();
    gameScreen.classList.add('hidden');
    lobbyScreen.classList.remove('hidden');
    lobbyScreen.classList.add('lobby-transition');
    setTimeout(() => lobbyScreen.classList.remove('lobby-transition'), 800);
    updateLobbyScore();
    showVipStatus(); // Update VIP status for lobby mode immediately
    resetGame();
}

function returnToLobbyFromGameMode() {
    gameModeScreen.classList.add('hidden');
    lobbyScreen.classList.remove('hidden');
    lobbyScreen.classList.add('lobby-transition');
    setTimeout(() => lobbyScreen.classList.remove('lobby-transition'), 800);
    updateLobbyScore();
    showVipStatus();
}

function showShop() {
    lobbyScreen.classList.add('hidden');
    shopScreen.classList.remove('hidden');
    updateShopScore();
    updateShopItems();
    createShopStars();
}

function returnToLobbyFromShop() {
    shopScreen.classList.add('hidden');
    lobbyScreen.classList.remove('hidden');
    lobbyScreen.classList.add('lobby-transition');
    setTimeout(() => lobbyScreen.classList.remove('lobby-transition'), 800);
    updateLobbyScore();
}

function showRiddle() {
    lobbyScreen.classList.add('hidden');
    riddleScreen.classList.remove('hidden');
    riddleScreen.classList.add('riddle-transition');
    setTimeout(() => riddleScreen.classList.remove('riddle-transition'), 1200);
    createQuestionMarks();
    resetRiddle();
}

function returnToLobbyFromRiddle() {
    riddleScreen.classList.add('hidden');
    lobbyScreen.classList.remove('hidden');
    lobbyScreen.classList.add('lobby-transition');
    setTimeout(() => lobbyScreen.classList.remove('lobby-transition'), 800);
    updateLobbyScore();
}

function showCodes() {
    lobbyScreen.classList.add('hidden');
    codesScreen.classList.remove('hidden');
    codesScreen.classList.add('codes-transition');
    setTimeout(() => codesScreen.classList.remove('codes-transition'), 800);
    updateCodesScore();
    createMatrixBackground();
    resetCodesInput();
}

function returnToLobbyFromCodes() {
    codesScreen.classList.add('hidden');
    lobbyScreen.classList.remove('hidden');
    lobbyScreen.classList.add('lobby-transition');
    setTimeout(() => lobbyScreen.classList.remove('lobby-transition'), 800);
    updateLobbyScore();
}

function showAchievements() {
    lobbyScreen.classList.add('hidden');
    achievementsScreen.classList.remove('hidden');
    achievementsScreen.classList.add('achievements-transition');
    setTimeout(() => achievementsScreen.classList.remove('achievements-transition'), 800);
    createAchievementsBackground();
    loadAchievements();
}

function returnToLobbyFromAchievements() {
    achievementsScreen.classList.add('hidden');
    lobbyScreen.classList.remove('hidden');
    lobbyScreen.classList.add('lobby-transition');
    setTimeout(() => lobbyScreen.classList.remove('lobby-transition'), 800);
    updateLobbyScore();
}

function checkAchievements() {
    achievements.forEach(achievement => {
        if (!unlockedAchievements.has(achievement.id) && achievement.checkCondition()) {
            unlockAchievement(achievement);
        }
    });
}

function unlockAchievement(achievement) {
    unlockedAchievements.add(achievement.id);

    // Nagroda za osiągnięcie - używaj właściwych wartości
    const pointsReward = achievement.pointsReward || 20;
    const xpReward = achievement.xpReward || 20;
    
    currentScore += pointsReward;
    addXP(xpReward);

    // Aktualizuj wyświetlanie punktów we wszystkich trybach gry
    updateScore();
    updatePhotoGameScore();
    updateCapitalGameScore();
    updateLobbyScore();
    updateShopScore();
    updateCodesScore();

    showAchievementNotification(achievement);
    createAchievementConfetti();

    console.log(`Osiągnięcie odblokowane: ${achievement.name} - ${pointsReward} punktów, ${xpReward} XP`);
}

function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';

    const icon = document.createElement('div');
    icon.className = 'achievement-icon';
    icon.textContent = achievement.icon;

    const content = document.createElement('div');
    content.className = 'achievement-content';

    const title = document.createElement('div');
    title.className = 'achievement-title';
    title.textContent = 'OSIĄGNIĘCIE ODBLOKOWANE!';

    const name = document.createElement('div');
    name.className = 'achievement-name';
    name.textContent = `${achievement.icon} ${achievement.name}`;

    const description = document.createElement('div');
    description.className = 'achievement-description';
    description.textContent = achievement.description;

    const reward = document.createElement('div');
    reward.className = 'achievement-reward';
    const pointsReward = achievement.pointsReward || 20;
    const xpReward = achievement.xpReward || 20;
    reward.textContent = `+${xpReward} XP i +${pointsReward} punktów!`;

    content.appendChild(title);
    content.appendChild(name);
    content.appendChild(description);
    content.appendChild(reward);

    notification.appendChild(icon);
    notification.appendChild(content);

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 4000);
}

function createAchievementConfetti() {
    const numberOfConfetti = 60;
    const colors = ['#FFD700', '#FF6B6B', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0'];

    for (let i = 0; i < numberOfConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'achievement-confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 4 + 2) + 's';

        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }

        document.body.appendChild(confetti);

        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 6000);
    }
}

function loadAchievements() {
    const achievementsList = document.getElementById('achievementsList');
    const unlockedCount = document.getElementById('unlockedCount');
    const totalCount = document.getElementById('totalCount');
    const progressPercent = document.getElementById('progressPercent');

    if (!achievementsList || !unlockedCount || !totalCount || !progressPercent) return;

    achievementsList.innerHTML = '';

    // Sprawdź osiągnięcia przed pokazaniem
    checkAchievements();

    achievements.forEach(achievement => {
        const achievementElement = document.createElement('div');
        const isUnlocked = unlockedAchievements.has(achievement.id);

        achievementElement.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;

        achievementElement.innerHTML = `
            <div class="achievement-main-content">
                <div class="achievement-icon-display">${achievement.icon}</div>
                <div class="achievement-info">
                    <div class="achievement-name-display">${achievement.name}</div>
                    <div class="achievement-description-display">${achievement.description}</div>
                    <div class="achievement-reward-display">${achievement.reward}</div>
                </div>
            </div>
            <div class="achievement-status">${isUnlocked ? '✅ ODBLOKOWANE' : '🔒 ZABLOKOWANE'}</div>
        `;

        achievementsList.appendChild(achievementElement);
    });

    // Aktualizuj statystyki
    const unlockedAchievementsCount = unlockedAchievements.size;
    const totalAchievements = achievements.length;
    const progress = Math.round((unlockedAchievementsCount / totalAchievements) * 100);

    unlockedCount.textContent = unlockedAchievementsCount;
    totalCount.textContent = totalAchievements;
    progressPercent.textContent = progress;

    console.log(`Załadowano osiągnięć: ${totalAchievements}`);
    console.log('Osiągnięcia:', achievements.map(a => `${a.icon} ${a.name}`));
}

function createAchievementsBackground() {
    const achievementsBg = document.getElementById('achievementsBg');
    if (!achievementsBg || achievementsBg.children.length > 0) return;

    const numberOfTrophies = 15;
    const trophyEmojis = ['🏆', '🥇', '🎖️', '👑', '⭐', '🌟'];

    for (let i = 0; i < numberOfTrophies; i++) {
        const trophy = document.createElement('div');
        trophy.className = 'trophy-float';
        trophy.textContent = trophyEmojis[Math.floor(Math.random() * trophyEmojis.length)];
        trophy.style.left = Math.random() * 100 + '%';
        trophy.style.top = Math.random() * 100 + '%';
        trophy.style.animationDelay = Math.random() * 6 + 's';
        trophy.style.animationDuration = (Math.random() * 4 + 4) + 's';
        achievementsBg.appendChild(trophy);
    }
}

function resetCodesInput() {
    codeInput.value = '';
    codeMessage.textContent = '';
    codeMessage.className = 'message';
    codeInput.focus();
}

function checkCode() {
    const code = codeInput.value.trim().toLowerCase();

    if (code === 'coppergolem' || code === 'debil') {
        codeMessage.textContent = '⚠️ Ten kod jest już nieaktualny!';
        codeMessage.className = 'message error';
        codeInput.value = '';
    } else if (code === 'reliableperson') {
        currentScore += 1000;
        updateCodesScore();
        updateLobbyScore();
        codeMessage.textContent = '✅ Kod aktywowany! Otrzymałeś 1000 punktów!';
        codeMessage.className = 'message success';
        showNotification('🎉 Kod aktywowany! +1000 punktów! 🎉', 'achievement');
        codeInput.value = '';
    } else if (code === 'stezenieprocentowe') {
        // Dodaj 10 poziomów (1000 XP, bo każdy poziom to 100 XP)
        addXP(1000);
        updateCodesScore();
        updateLobbyScore();
        codeMessage.textContent = '✅ Kod aktywowany! Otrzymałeś 10 poziomów!';
        codeMessage.className = 'message success';
        showNotification('🎉 Kod aktywowany! +10 poziomów! 🎉', 'achievement');
        codeInput.value = '';
    } else if (code === '') {
        codeMessage.textContent = '❌ Wprowadź kod!';
        codeMessage.className = 'message error';
    } else {
        codeMessage.textContent = '❌ Nieprawidłowy kod!';
        codeMessage.className = 'message error';
    }
}

function resetRiddle() {
    currentRiddle = 0;
    updateRiddleDisplay();
    riddleInput.value = '';
    riddleMessage.textContent = '';
    riddleMessage.className = 'message';
}

function updateRiddleDisplay() {
    riddleProgress.textContent = `Zagadka ${currentRiddle + 1}/3`;
    riddleQuestion.textContent = riddleAnswers[currentRiddle].question;
}

function checkRiddleAnswer() {
    const userAnswer = normalizeText(riddleInput.value.trim());
    const riddle = riddleAnswers[currentRiddle];

    let isCorrect = false;

    if (riddle.answers) {
        // Multiple correct answers
        isCorrect = riddle.answers.some(answer => normalizeText(answer) === userAnswer);
    } else {
        // Single correct answer
        isCorrect = normalizeText(riddle.answer) === userAnswer;
    }

    if (isCorrect) {
        currentRiddle++;
        riddleInput.value = '';
        riddleMessage.textContent = '';
        riddleMessage.className = 'message';

        if (currentRiddle >= riddleAnswers.length) {
            showRiddleCompletion();
        } else {
            updateRiddleDisplay();
            showNotification('✅ Poprawna odpowiedź!', 'success');
        }
    } else {
        riddleMessage.textContent = 'Błędna odpowiedź!';
        riddleMessage.className = 'message error';
    }
}

function showRiddleCompletion() {
    // Create confetti
    createConfetti();

    const completionDiv = document.createElement('div');
    completionDiv.className = 'riddle-complete';

    // Add the zagadki reward image
    const rewardImg = document.createElement('img');
    rewardImg.src = './zagadki.png';
    rewardImg.alt = 'Nagroda za zagadki!';
    rewardImg.style.maxWidth = '300px';
    rewardImg.style.width = '100%';
    rewardImg.style.height = 'auto';
    rewardImg.style.borderRadius = '15px';
    rewardImg.style.marginBottom = '20px';
    rewardImg.style.animation = 'imageZoom 0.5s ease-out';

    // Fallback jeśli obrazek się nie załaduje
    rewardImg.onerror = function() {
        this.style.display = 'none';
    };

    // Add congratulations image
    const congratsImg = document.createElement('img');
    congratsImg.src = 'congratulations.jpg';
    congratsImg.alt = 'Congratulations!';
    congratsImg.style.maxWidth = '200px';
    congratsImg.style.width = '100%';
    congratsImg.style.height = 'auto';
    congratsImg.style.borderRadius = '10px';
    congratsImg.style.marginBottom = '15px';
    congratsImg.style.animation = 'imageZoom 0.5s ease-out';

    // Hide congratulations image after 2/3 seconds
    setTimeout(() => {
        if (congratsImg.parentNode) {
            congratsImg.style.opacity = '0';
            congratsImg.style.transform = 'scale(0.8)';
            congratsImg.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            setTimeout(() => {
                if (congratsImg.parentNode) {
                    congratsImg.parentNode.removeChild(congratsImg);
                }
            }, 300);
        }
    }, 667); // 2/3 seconds

    const title = document.createElement('h2');
    title.textContent = '🎉 Gratulacje! Wszystkie zagadki rozwiązane! 🎉';
    title.style.color = '#8B0000';
    title.style.marginBottom = '10px';
    title.style.fontSize = '2rem';
    title.style.textAlign = 'center';

    const text = document.createElement('p');
    text.textContent = 'Jesteś prawdziwym mistrzem zagadek! Oto twoja nagroda!';
    text.style.fontSize = '1.2rem';
    text.style.color = '#333';
    text.style.textAlign = 'center';

    completionDiv.appendChild(congratsImg);
    completionDiv.appendChild(rewardImg);
    completionDiv.appendChild(title);
    completionDiv.appendChild(text);

    document.body.appendChild(completionDiv);

    setTimeout(() => {
        if (completionDiv.parentNode) {
            completionDiv.parentNode.removeChild(completionDiv);
        }
        resetRiddle();
    }, 8000);
}

function buyVip() {
    if (currentScore >= 50 && !hasVip) {
        currentScore -= 50;
        trackPointsSpent(50);
        trackShopPurchase();
        hasVip = true;
        updateShopScore();
        updateLobbyScore();
        updateShopItems();
        showNotification('👑 Gratulacje! Jesteś teraz VIP! 👑', 'achievement');
    }
}

function buyPhotoMode() {
    if (currentScore >= 100 && !hasPhotoMode) {
        currentScore -= 100;
        trackPointsSpent(100);
        trackShopPurchase();
        hasPhotoMode = true;
        updateShopScore();
        updateLobbyScore();
        updateShopItems();
        showNotification('📸 Gratulacje! Odblokowałeś nowy tryb gry! 📸', 'achievement');
    }
}

function buyExpert() {
    if (currentScore >= 150 && !hasExpert) {
        currentScore -= 150;
        trackPointsSpent(150);
        trackShopPurchase();
        hasExpert = true;
        updateShopScore();
        updateLobbyScore();
        updateShopItems();
        showNotification('⚡ Gratulacje! Jesteś teraz EKSPERT! ⚡', 'achievement');
    }
}

function buyMystery() {
    if (currentScore >= 200 && !hasMystery) {
        currentScore -= 200;
        trackPointsSpent(200);
        trackShopPurchase();
        hasMystery = true;
        updateShopScore();
        updateLobbyScore();
        updateShopItems();
        showMysteryButton();
        showNotification('🔮 Gratulacje! Odkryłeś TAJEMNICĘ! 🔮', 'achievement');
    }
}

function showVipStatus() {
    if (hasVip) {
        vipStatusElement.classList.remove('hidden');
        vipStatusElement.style.display = 'block';
        // Add game-mode class when in game screen, photo game screen, or capital game screen
        if (!gameScreen.classList.contains('hidden') || !photoGameScreen.classList.contains('hidden') || !capitalGameScreen.classList.contains('hidden')) {
            vipStatusElement.classList.add('game-mode');
        } else {
            vipStatusElement.classList.remove('game-mode');
        }
    } else {
        vipStatusElement.classList.add('hidden');
        vipStatusElement.style.display = 'none';
        vipStatusElement.classList.remove('game-mode');
    }
}

function showMysteryButton() {
    if (hasMystery) {
        mysteryButton.classList.remove('hidden');
    }
}

function updateShopItems() {
    // VIP Item
    if (hasVip) {
        vipItem.classList.add('owned');
        buyVipButton.textContent = 'Posiadasz';
        buyVipButton.disabled = true;
    } else {
        buyVipButton.disabled = currentScore < 50;
    }

    // Photo Mode Item
    if (hasPhotoMode) {
        photoModeItem.classList.add('owned');
        buyPhotoModeButton.textContent = 'Posiadasz';
        buyPhotoModeButton.disabled = true;
    } else {
        buyPhotoModeButton.disabled = currentScore < 100;
    }

    // Expert Item
    if (hasExpert) {
        expertItem.classList.add('owned');
        buyExpertButton.textContent = 'Posiadasz';
        buyExpertButton.disabled = true;
    } else {
        buyExpertButton.disabled = currentScore < 150;
    }

    // Mystery Item
    if (hasMystery) {
        mysteryItem.classList.add('owned');
        buyMysteryButton.textContent = 'Posiadasz';
        buyMysteryButton.disabled = true;
    } else {
        buyMysteryButton.disabled = currentScore < 200;
    }
}

function showAllCitiesCompleted() {
    // Dodaj 50 punktów za ukończenie wszystkich miast
    currentScore += 50;
    updateScore();

    // Sprawdź czy wszystkie miasta zostały zgadnięte (perfect round)
    if (correctlyGuessedCities === usedCities.length) {
        playerStats.perfectRoundsClues++;
    }

    // Stwórz konfetti
    createConfetti();

    // Pokaż komunikat o ukończeniu wszystkich miast
    const completionDiv = document.createElement('div');
    completionDiv.className = 'all-cities-complete';
    completionDiv.style.position = 'fixed';
    completionDiv.style.top = '50%';
    completionDiv.style.left = '50%';
    completionDiv.style.transform = 'translate(-50%, -50%)';
    completionDiv.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    completionDiv.style.color = 'white';
    completionDiv.style.padding = '30px';
    completionDiv.style.borderRadius = '20px';
    completionDiv.style.textAlign = 'center';
    completionDiv.style.zIndex = '1000';
    completionDiv.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    completionDiv.style.animation = 'bounceIn 0.8s ease-out';

    const title = document.createElement('h2');
    title.textContent = '🎉 GRATULACJE! 🎉';
    title.style.fontSize = '2.5rem';
    title.style.marginBottom = '15px';
    title.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
    title.style.color = 'white';
    title.style.fontWeight = '300';

    const text = document.createElement('p');
    text.textContent = 'Zgadłeś wszystkie miasta w grze!';
    text.style.fontSize = '1.3rem';
    text.style.marginBottom = '10px';
    text.style.color = 'white';
    text.style.fontWeight = '300';

    // Dodaj statystyki dotyczące zgadniętych miast
    const statsText = document.createElement('p');
    statsText.textContent = `Zgadnięto ${correctlyGuessedCities} z ${usedCities.length} miast w tej rundzie!`;
    statsText.style.fontSize = '1.1rem';
    statsText.style.fontWeight = '300';
    statsText.style.marginBottom = '15px';
    statsText.style.color = 'white';

    const reward = document.createElement('p');
    reward.textContent = '+50 punktów za niesamowite osiągnięcie!';
    reward.style.fontSize = '1.1rem';
    reward.style.fontWeight = '300';
    reward.style.marginBottom = '15px';
    reward.style.color = 'white';

    const continueText = document.createElement('p');
    continueText.textContent = 'Możesz grać dalej - miasta będą się powtarzać.';
    continueText.style.fontSize = '1rem';
    continueText.style.opacity = '0.9';
    continueText.style.color = 'white';
    continueText.style.fontWeight = '300';

    completionDiv.appendChild(title);
    completionDiv.appendChild(text);
    completionDiv.appendChild(statsText);
    completionDiv.appendChild(reward);
    completionDiv.appendChild(continueText);

    document.body.appendChild(completionDiv);

    // Usuń komunikat po 7 sekundach
    setTimeout(() => {
        if (completionDiv.parentNode) {
            completionDiv.style.opacity = '0';
            completionDiv.style.transform = 'translate(-50%, -50%) scale(0.8)';
            completionDiv.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            setTimeout(() => {
                if (completionDiv.parentNode) {
                    completionDiv.parentNode.removeChild(completionDiv);
                }
            }, 300);
        }
    }, 7000);
}

function resetGame() {
    stopTimer();
    usedCities = [];
    correctlyGuessedCities = 0;
    cityInput.value = '';
    cityInput.disabled = false;
    messageElement.textContent = '';
    messageElement.className = 'message';
    nextButton.classList.add('hidden');
    submitButton.style.display = 'inline-block';
    currentHintLevel = 0;
    skipButton.classList.add('hidden');
}

function loadRandomCity() {
    // Sprawdź czy zostały jakieś miasta
    if (usedCities.length >= gameData.length) {
        // Gracz zgadnął wszystkie miasta!
        showAllCitiesCompleted();
        usedCities = []; // Reset dla dalszej gry
        correctlyGuessedCities = 0; // Reset licznika zgadniętych miast
    }

    let availableCities = gameData.filter((_, index) => !usedCities.includes(index));
    let randomIndex = Math.floor(Math.random() * availableCities.length);
    let selectedCity = availableCities[randomIndex];

    // Znajdź oryginalny indeks
    currentCityIndex = gameData.indexOf(selectedCity);
    usedCities.push(currentCityIndex);

    // Aktualizuj licznik pozostałych miast
    updateRemainingCities();

    // Wymieszaj wskazówki
    currentShuffledClues = shuffleArray(selectedCity.clues);

    // Reset interfejsu
    currentHintLevel = 1;
    playerStats.usedHints = false; // Reset flagi używania wskazówek
    clue1.textContent = currentShuffledClues[0];
    clue1.classList.remove('hidden');
    clue2.classList.add('hidden');
    clue3.classList.add('hidden');
    hintButton.classList.remove('hidden');
    hintButton.textContent = 'Pokaż kolejną wskazówkę';
    skipButton.classList.remove('hidden');

    cityInput.value = '';
    cityInput.disabled = false;
    cityInput.focus();
    messageElement.textContent = '';
    messageElement.className = 'message';
    nextButton.classList.add('hidden');
    submitButton.style.display = 'inline-block';

    // Uruchom timer
    startTimer();
}

function showNextHint() {
    currentHintLevel++;
    playerStats.usedHints = true; // Gracz użył dodatkowych wskazówek

    if (currentHintLevel === 1) {
        clue1.textContent = currentShuffledClues[0];
        clue1.classList.remove('hidden');
        hintButton.textContent = 'Pokaż kolejną wskazówkę';
    } else if (currentHintLevel === 2) {
        clue2.textContent = currentShuffledClues[1];
        clue2.classList.remove('hidden');
        hintButton.textContent = 'Pokaż ostatnią wskazówkę';
    } else if (currentHintLevel === 3) {
        clue3.textContent = currentShuffledClues[2];
        clue3.classList.remove('hidden');
        hintButton.textContent = 'Brak więcej wskazówek';

    }
}

function checkAnswer() {
    const userAnswer = normalizeText(cityInput.value.trim());
    const correctAnswer = normalizeText(gameData[currentCityIndex].city);

    const timeTaken = 30 - timeLeft;
    stopTimer();

    if (userAnswer === correctAnswer) {
        // Poprawna odpowiedź - punkty zależne od liczby wskazówek
        let points = 0;
        if (currentHintLevel === 1) {
            points = 5;
        } else if (currentHintLevel === 2) {
            points = 4;
        } else if (currentHintLevel === 3) {
            points = 3;
        }

        // Podwójne punkty dla ekspertów
        if (hasExpert) {
            points *= 2;
        }

        // Calculate XP based on hint level
        const xpGained = calculateXP(currentHintLevel);

        currentScore += points;
        addXP(xpGained);
        updateScore();

        // Śledź statystyki punktów
        trackPointsEarned(points);

        // Zwiększ licznik zgadniętych miast
        correctlyGuessedCities++;

        // Aktualizuj statystyki gracza
        playerStats.totalCitiesGuessed++;
        playerStats.currentStreak++;
        if (playerStats.currentStreak > playerStats.maxStreak) {
            playerStats.maxStreak = playerStats.currentStreak;
        }
        
        // Śledź statystyki hardcore
        trackHardcoreCityGuessed();

        // Sprawdź najszybszy czas w trybie podpowiedzi
        if (timeTaken < playerStats.fastestGuessClues) {
            playerStats.fastestGuessClues = timeTaken;
        }

        // Sprawdź czy zgadnięto bez dodatkowych wskazówek
        if (currentHintLevel === 1 && !playerStats.usedHints) {
            playerStats.guessedWithoutHints++;
        }

        // Sprawdź osiągnięcia
        checkAchievements();

        const bonusText = hasExpert ? ` (podwójne punkty!)` : '';
        showMessage(`Brawo! Zgadłeś! Poprawna odpowiedź to: ${formatCityName(gameData[currentCityIndex].city)}. +${points} punktów, +${xpGained} XP${bonusText}`, 'success');
    } else {
        // Niepoprawna odpowiedź - traci punkty (więcej w trybie hardcore)
        const pointsLost = isHardcoreMode ? 50 : 5;
        currentScore -= pointsLost;
        updateScore();

        // Śledź nieudane próby
        trackCityFailed();
        playerStats.pointsLostWrong += pointsLost;

        // Reset streak
        playerStats.currentStreak = 0;
        
        if (isHardcoreMode) {
            playerStats.hardcoreCurrentStreak = 0;
            playerStats.hardcoreCitiesFailed++;
            playerStats.hardcorePointsLost += pointsLost;
        }

        showNotification(`Straciłeś ${pointsLost} punktów!`);
        showMessage(`Nie zgadłeś! Poprawna odpowiedź to: ${formatCityName(gameData[currentCityIndex].city)}`, 'error');
    }

    submitButton.style.display = 'none';
    nextButton.classList.remove('hidden');
    hintButton.classList.add('hidden');
    skipButton.classList.add('hidden');
    cityInput.disabled = true;
}

function showMessage(text, type) {
    messageElement.textContent = text;
    messageElement.className = `message ${type}`;
}

function nextCity() {
    loadRandomCity();
}

function loadRandomPhotoGameCity() {
    // Sprawdź czy zostały jakieś miasta
    if (photoUsedCities.length >= photoGameData.length) {
        // Gracz zgadnął wszystkie miasta!
        showAllPhotoGameCitiesCompleted();
        photoUsedCities = []; // Reset dla dalszej gry
        correctlyGuessedPhotoCities = 0; // Reset licznika zgadniętych miast
    }

    let availableCities = photoGameData.filter((_, index) => !photoUsedCities.includes(index));
    let randomIndex = Math.floor(Math.random() * availableCities.length);
    let selectedCity = availableCities[randomIndex];

    // Znajdź oryginalny indeks
    photoCurrentCityIndex = photoGameData.indexOf(selectedCity);
    photoUsedCities.push(photoCurrentCityIndex);

    // Aktualizuj licznik pozostałych miast
    updatePhotoGameRemainingCities();

    // Rozpocznij wcześniejsze ładowanie zdjęcia
    photoGameCityImage.style.opacity = '0';
    photoGameCityImage.style.transform = 'scale(0.9)';

    // Natychmiast rozpocznij ładowanie nowego zdjęcia
    photoGameCityImage.src = selectedCity.image;
    photoGameCityImage.alt = 'Zdjęcie miasta do zgadnięcia';

    // Pokaż zdjęcie gdy zostanie załadowane
    photoGameCityImage.onload = function() {
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
    };

    // Reset interfejsu
    photoGameCityInput.value = '';
    photoGameCityInput.disabled = false;
    photoGameCityInput.focus();
    photoGameMessageElement.textContent = '';
    photoGameMessageElement.className = 'message';
    photoGameNextButton.classList.add('hidden');
    photoGameSubmitButton.style.display = 'inline-block';
    photoGameSkipButton.classList.remove('hidden');

    // Uruchom timer dla trybu fotograficznego
    startPhotoGameTimer();
}

function checkPhotoGameAnswer() {
    const userAnswer = normalizeText(photoGameCityInput.value.trim());
    const correctAnswer = normalizeText(photoGameData[photoCurrentCityIndex].city);

    const timeTaken = 30 - timeLeft;

    // Zatrzymaj timer dla trybu fotograficznego
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
    if (photoGameTimerElement) photoGameTimerElement.classList.remove('warning');

    if (userAnswer === correctAnswer) {
        // Poprawna odpowiedź - 5 punktów i 10 XP
        let points = 5;

        // Podwójne punkty dla ekspertów
        if (hasExpert) {
            points *= 2;
        }

        const xpGained = 10;

        currentScore += points;
        addXP(xpGained);
        updatePhotoGameScore();
        updatePhotoGameLevelDisplay();

        // Śledź statystyki punktów
        trackPointsEarned(points);

        // Zwiększ licznik zgadniętych miast
        correctlyGuessedPhotoCities++;

        // Aktualizuj statystyki gracza
        playerStats.totalCitiesGuessed++;
        playerStats.totalPhotoCitiesGuessed++;
        trackPhotoCityGuessed();
        playerStats.currentStreak++;
        if (playerStats.currentStreak > playerStats.maxStreak) {
            playerStats.maxStreak = playerStats.currentStreak;
        }
        
        // Śledź statystyki hardcore
        trackHardcoreCityGuessed();

        // Sprawdź najszybszy czas w trybie fotograficznym
        if (timeTaken < playerStats.fastestGuessPhoto) {
            playerStats.fastestGuessPhoto = timeTaken;
        }

        // Sprawdź osiągnięcia
        checkAchievements();

        const bonusText = hasExpert ? ` (podwójne punkty!)` : '';
        showPhotoGameMessage(`Brawo! Zgadłeś! Poprawna odpowiedź to: ${formatCityName(photoGameData[photoCurrentCityIndex].city)}. +${points} punktów, +${xpGained} XP${bonusText}`, 'success');
    } else {
        // Niepoprawna odpowiedź - traci punkty (więcej w trybie hardcore)
        const pointsLost = isHardcoreMode ? 50 : 3;
        currentScore -= pointsLost;
        updatePhotoGameScore();

        // Śledź nieudane próby
        trackCityFailed();
        playerStats.pointsLostWrong += pointsLost;

        // Reset streak
        playerStats.currentStreak = 0;
        
        if (isHardcoreMode) {
            playerStats.hardcoreCurrentStreak = 0;
            playerStats.hardcoreCitiesFailed++;
            playerStats.hardcorePointsLost += pointsLost;
        }

        showNotification(`Straciłeś ${pointsLost} punktów!`);
        showPhotoGameMessage(`Nie zgadłeś! Poprawna odpowiedź to: ${formatCityName(photoGameData[photoCurrentCityIndex].city)}`, 'error');
    }

    photoGameSubmitButton.style.display = 'none';
    photoGameNextButton.classList.remove('hidden');
    photoGameSkipButton.classList.add('hidden');
    photoGameCityInput.disabled = true;
}

function skipPhotoGameCity() {
    const pointsLost = isHardcoreMode ? 50 : 3;
    currentScore -= pointsLost;
    updatePhotoGameScore();
    playerStats.currentStreak = 0; // Reset streak on skip
    
    if (isHardcoreMode) {
        playerStats.hardcoreCurrentStreak = 0;
        playerStats.hardcorePointsLost += pointsLost;
    }

    // Zatrzymaj timer dla trybu fotograficznego
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
    if (photoGameTimerElement) photoGameTimerElement.classList.remove('warning');

    showNotification(`Straciłeś ${pointsLost} punktów!`);
    showPhotoGameMessage(`Pominięto miasto! Poprawna odpowiedź to: ${formatCityName(photoGameData[photoCurrentCityIndex].city)}`, 'error');

    photoGameSubmitButton.style.display = 'none';
    photoGameNextButton.classList.remove('hidden');
    photoGameSkipButton.classList.add('hidden');
    photoGameCityInput.disabled = true;
}

function nextPhotoGameCity() {
    loadRandomPhotoGameCity();
}

function showPhotoGameMessage(text, type) {
    photoGameMessageElement.textContent = text;
    photoGameMessageElement.className = `message ${type}`;
}

function updatePhotoGameScore() {
    photoGameScoreElement.textContent = currentScore;
}

function updatePhotoGameLevelDisplay() {
    if (photoGameLevelElement) {
        photoGameLevelElement.textContent = currentLevel;
    }
    if (photoGameXpElement) {
        const xpInCurrentLevel = currentXP % 100;
        photoGameXpElement.textContent = `${xpInCurrentLevel}/100 XP`;
    }
}

function updatePhotoGameRemainingCities() {
    const remaining = photoGameData.length - photoUsedCities.length;
    const total = photoGameData.length;
    photoGameRemainingCitiesElement.textContent = `Pozostało miast: ${remaining}/${total}`;
}

function resetPhotoGame() {
    stopTimer();
    photoUsedCities = [];
    correctlyGuessedPhotoCities = 0;
    photoGameCityInput.value = '';
    photoGameCityInput.disabled = false;
    photoGameMessageElement.textContent = '';
    photoGameMessageElement.className = 'message';
    photoGameNextButton.classList.add('hidden');
    photoGameSubmitButton.style.display = 'inline-block';
    photoGameSkipButton.classList.add('hidden');
}

function showAllPhotoGameCitiesCompleted() {
    // Dodaj 50 punktów za ukończenie wszystkich miast
    currentScore += 50;
    updatePhotoGameScore();

    // Sprawdź czy wszystkie miasta zostały zgadnięte (perfect round)
    if (correctlyGuessedPhotoCities === photoUsedCities.length) {
        playerStats.perfectRoundsPhoto++;
    }

    // Stwórz konfetti
    createConfetti();

    // Pokaż komunikat o ukończeniu wszystkich miast
    const completionDiv = document.createElement('div');
    completionDiv.className = 'all-cities-complete';
    completionDiv.style.position = 'fixed';
    completionDiv.style.top = '50%';
    completionDiv.style.left = '50%';
    completionDiv.style.transform = 'translate(-50%, -50%)';
    completionDiv.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    completionDiv.style.color = 'white';
    completionDiv.style.padding = '30px';
    completionDiv.style.borderRadius = '20px';
    completionDiv.style.textAlign = 'center';
    completionDiv.style.zIndex = '1000';
    completionDiv.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    completionDiv.style.animation = 'bounceIn 0.8s ease-out';

    const title = document.createElement('h2');
    title.textContent = '🎉 GRATULACJE! 🎉';
    title.style.fontSize = '2.5rem';
    title.style.marginBottom = '15px';
    title.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
    title.style.color = 'white';
    title.style.fontWeight = '300';

    const text = document.createElement('p');
    text.textContent = 'Zgadłeś wszystkie miasta ze zdjęć!';
    text.style.fontSize = '1.3rem';
    text.style.marginBottom = '10px';
    text.style.color = 'white';
    text.style.fontWeight = '300';

    // Dodaj statystyki dotyczące zgadniętych miast
    const statsText = document.createElement('p');
    statsText.textContent = `Zgadnięto ${correctlyGuessedPhotoCities} z ${photoUsedCities.length} miast w tej rundzie!`;
    statsText.style.fontSize = '1.1rem';
    statsText.style.fontWeight = '300';
    statsText.style.marginBottom = '15px';
    statsText.style.color = 'white';

    const reward = document.createElement('p');
    reward.textContent = '+50 punktów za niesamowite osiągnięcie!';
    reward.style.fontSize = '1.1rem';
    reward.style.fontWeight = '300';
    reward.style.marginBottom ='15px';
    reward.style.color = 'white';

    const continueText = document.createElement('p');
    continueText.textContent = 'Możesz grać dalej - miasta będą się powtarzać.';
    continueText.style.fontSize = '1rem';
    continueText.style.opacity = '0.9';
    continueText.style.color = 'white';
    continueText.style.fontWeight = '300';

    completionDiv.appendChild(title);
    completionDiv.appendChild(text);
    completionDiv.appendChild(statsText);
    completionDiv.appendChild(reward);
    completionDiv.appendChild(continueText);

    document.body.appendChild(completionDiv);

    // Usuń komunikat po 7 sekundach
    setTimeout(() => {
        if (completionDiv.parentNode) {
            completionDiv.style.opacity = '0';
            completionDiv.style.transform = 'translate(-50%, -50%) scale(0.8)';
            completionDiv.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            setTimeout(() => {
                if (completionDiv.parentNode) {
                    completionDiv.parentNode.removeChild(completionDiv);
                }
            }, 300);
        }
    }, 7000);
}

// Funkcje dla trybu gry ze stolicami
function showContinentSelection() {
    if (!capitalGameAvailable) {
        showNotification('🔒 Musisz osiągnąć poziom 8, aby odblokować ten tryb!', 'error');
        return;
    }

    gameModeScreen.classList.add('hidden');
    continentSelectionScreen.classList.remove('hidden');
    continentSelectionScreen.classList.add('continent-transition');
    setTimeout(() => continentSelectionScreen.classList.remove('continent-transition'), 800);
    updateContinentButtons();
    createContinentFlags();
    updateHardcoreModeDisplay(); // Show hardcore indicator
}

function showFutureUpdateMessage(continentName) {
    showNotification(`🚧 ${continentName} zostanie dodana w przyszłych aktualizacjach! 🚧`, 'error');
}

function showLevelRequirementMessage(continentName, requiredLevel) {
    showNotification(`🔒 ${continentName} zostanie odblokowana po osiągnięciu poziomu ${requiredLevel}! 🔒`, 'error');
}

function returnToGameModeFromContinent() {
    continentSelectionScreen.classList.add('hidden');
    gameModeScreen.classList.remove('hidden');
    gameModeScreen.classList.add('gamemode-transition');
    setTimeout(() => gameModeScreen.classList.remove('gamemode-transition'), 800);
    updateGameModeButtons();
}

function startCapitalGame(continent) {
    currentContinent = continent;
    continentSelectionScreen.classList.add('hidden');
    capitalGameScreen.classList.remove('hidden');
    capitalGameScreen.classList.add('capital-game-transition');
    setTimeout(() => capitalGameScreen.classList.remove('capital-game-transition'), 800);
    updateCapitalGameScore();
    updateCapitalGameLevelDisplay();
    updateCapitalGameRemainingCountries();
    showVipStatus();
    updateHardcoreModeDisplay(); // Show hardcore indicator
    
    // Różne animacje dla różnych kontynentów
    if (continent === 'europa') {
        createEuropeanStars();
    } else if (continent === 'azja') {
        createAsianStars();
    }
    
    loadRandomCapitalGameCountry();
}

function returnToContinentFromCapitalGame() {
    stopTimer();
    capitalGameScreen.classList.add('hidden');
    continentSelectionScreen.classList.remove('hidden');
    continentSelectionScreen.classList.add('gamemode-transition');
    setTimeout(() => continentSelectionScreen.classList.remove('gamemode-transition'), 800);
    resetCapitalGame();
}

function loadRandomCapitalGameCountry() {
    const continentData = capitalGameData[currentContinent];
    
    // Sprawdź czy zostały jakieś kraje
    if (capitalUsedCountries.length >= continentData.length) {
        // Gracz zgadnął wszystkie kraje!
        showAllCapitalGameCountriesCompleted();
        capitalUsedCountries = []; // Reset dla dalszej gry
        correctlyGuessedCapitals = 0; // Reset licznika zgadniętych krajów
    }

    let availableCountries = continentData.filter((_, index) => !capitalUsedCountries.includes(index));
    let randomIndex = Math.floor(Math.random() * availableCountries.length);
    let selectedCountry = availableCountries[randomIndex];

    // Znajdź oryginalny indeks
    capitalCurrentCountryIndex = continentData.indexOf(selectedCountry);
    capitalUsedCountries.push(capitalCurrentCountryIndex);

    // Aktualizuj licznik pozostałych krajów
    updateCapitalGameRemainingCountries();

    // Wyświetl nazwę kraju
    countryNameElement.textContent = selectedCountry.country;

    // Reset interfejsu
    capitalGameInput.value = '';
    capitalGameInput.disabled = false;
    capitalGameInput.focus();
    capitalGameMessageElement.textContent = '';
    capitalGameMessageElement.className = 'message';
    capitalGameNextButton.classList.add('hidden');
    capitalGameSubmitButton.style.display = 'inline-block';
    capitalGameSkipButton.classList.remove('hidden');

    // Uruchom timer
    startCapitalGameTimer();
}

function startCapitalGameTimer() {
    timeLeft = isHardcoreMode ? 10 : 30;
    updateCapitalGameTimerDisplay();

    gameTimer = setInterval(() => {
        timeLeft--;
        updateCapitalGameTimerDisplay();

        if (timeLeft <= 5) {
            capitalGameTimerElement.classList.add('warning');
        }

        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            capitalGameTimeUp();
        }
    }, 1000);
}

function updateCapitalGameTimerDisplay() {
    capitalGameTimerElement.textContent = `Czas: ${timeLeft}s`;
}

function capitalGameTimeUp() {
    // Gracz traci punkty gdy czas minie - więcej w trybie hardcore
    const pointsLost = isHardcoreMode ? 50 : 5;
    currentScore -= pointsLost;
    updateCapitalGameScore();
    playerStats.currentStreak = 0; // Reset streak on timeout
    
    if (isHardcoreMode) {
        playerStats.hardcoreCurrentStreak = 0;
        playerStats.hardcoreTimeOuts++;
        playerStats.hardcorePointsLost += pointsLost;
    }

    showNotification(`Twój czas minął! Tracisz ${pointsLost} punktów!`, 'timeout');
    showCapitalGameMessage(`Nie zdążyłeś! Poprawna odpowiedź to: ${formatCityName(capitalGameData[currentContinent][capitalCurrentCountryIndex].capital)}`, 'error');

    capitalGameSubmitButton.style.display = 'none';
    capitalGameNextButton.classList.remove('hidden');
    capitalGameSkipButton.classList.add('hidden');
    capitalGameInput.disabled = true;
}

function checkCapitalGameAnswer() {
    const userAnswer = normalizeText(capitalGameInput.value.trim());
    const correctAnswer = normalizeText(capitalGameData[currentContinent][capitalCurrentCountryIndex].capital);

    const timeTaken = 30 - timeLeft;
    stopTimer();

    if (userAnswer === correctAnswer) {
        // Poprawna odpowiedź - 5 punktów i 10 XP
        let points = 5;

        // Podwójne punkty dla ekspertów
        if (hasExpert) {
            points *= 2;
        }

        const xpGained = 10;

        currentScore += points;
        addXP(xpGained);
        updateCapitalGameScore();
        updateCapitalGameLevelDisplay();

        // Zwiększ licznik zgadniętych krajów
        correctlyGuessedCapitals++;

        // Aktualizuj statystyki gracza dla stolic
        playerStats.totalCitiesGuessed++;
        playerStats.totalCapitalsGuessed++;
        
        // Aktualizuj statystyki dla Azji jeśli to azjatycka stolica
        if (currentContinent === 'azja') {
            playerStats.totalAsianCapitalsGuessed++;
            if (timeTaken < playerStats.fastestGuessAsianCapital) {
                playerStats.fastestGuessAsianCapital = timeTaken;
            }
        }
        
        playerStats.currentStreak++;
        if (playerStats.currentStreak > playerStats.maxStreak) {
            playerStats.maxStreak = playerStats.currentStreak;
        }
        
        // Śledź statystyki hardcore
        trackHardcoreCityGuessed();

        // Sprawdź najszybszy czas w trybie stolic
        if (timeTaken < playerStats.fastestGuessCapital) {
            playerStats.fastestGuessCapital = timeTaken;
        }

        // Sprawdź osiągnięcia
        checkAchievements();

        const bonusText = hasExpert ? ` (podwójne punkty!)` : '';
        showCapitalGameMessage(`Brawo! Zgadłeś! Poprawna odpowiedź to: ${formatCityName(capitalGameData[currentContinent][capitalCurrentCountryIndex].capital)}. +${points} punktów, +${xpGained} XP${bonusText}`, 'success');
    } else {
        // Niepoprawna odpowiedź - traci punkty (więcej w trybie hardcore)
        const pointsLost = isHardcoreMode ? 50 : 5;
        currentScore -= pointsLost;
        updateCapitalGameScore();

        // Śledź nieudane próby
        trackCityFailed();
        playerStats.pointsLostWrong += pointsLost;

        // Reset streak
        playerStats.currentStreak = 0;
        
        if (isHardcoreMode) {
            playerStats.hardcoreCurrentStreak = 0;
            playerStats.hardcoreCitiesFailed++;
            playerStats.hardcorePointsLost += pointsLost;
        }

        showNotification(`Straciłeś ${pointsLost} punktów!`);
        showCapitalGameMessage(`Nie zgadłeś! Poprawna odpowiedź to: ${formatCityName(capitalGameData[currentContinent][capitalCurrentCountryIndex].capital)}`, 'error');
    }

    capitalGameSubmitButton.style.display = 'none';
    capitalGameNextButton.classList.remove('hidden');
    capitalGameSkipButton.classList.add('hidden');
    capitalGameInput.disabled = true;
}

function skipCapitalGameCountry() {
    const pointsLost = isHardcoreMode ? 50 : 5;
    currentScore -= pointsLost;
    updateCapitalGameScore();
    playerStats.currentStreak = 0; // Reset streak on skip
    
    if (isHardcoreMode) {
        playerStats.hardcoreCurrentStreak = 0;
        playerStats.hardcorePointsLost += pointsLost;
    }
    
    stopTimer();

    showNotification(`Straciłeś ${pointsLost} punktów!`);
    showCapitalGameMessage(`Pominięto kraj! Poprawna odpowiedź to: ${formatCityName(capitalGameData[currentContinent][capitalCurrentCountryIndex].capital)}`, 'error');

    capitalGameSubmitButton.style.display = 'none';
    capitalGameNextButton.classList.remove('hidden');
    capitalGameSkipButton.classList.add('hidden');
    capitalGameInput.disabled = true;
}

function nextCapitalGameCountry() {
    loadRandomCapitalGameCountry();
}

function showCapitalGameMessage(text, type) {
    capitalGameMessageElement.textContent = text;
    capitalGameMessageElement.className = `message ${type}`;
}

function updateCapitalGameScore() {
    capitalGameScoreElement.textContent = currentScore;
}

function updateCapitalGameLevelDisplay() {
    if (capitalGameLevelElement) {
        capitalGameLevelElement.textContent = currentLevel;
    }
    if (capitalGameXpElement) {
        const xpInCurrentLevel = currentXP % 100;
        capitalGameXpElement.textContent = `${xpInCurrentLevel}/100 XP`;
    }
}

function updateCapitalGameRemainingCountries() {
    const remaining = capitalGameData[currentContinent].length - capitalUsedCountries.length;
    const total = capitalGameData[currentContinent].length;
    capitalGameRemainingCitiesElement.textContent = `Pozostało krajów: ${remaining}/${total}`;
}

function resetCapitalGame() {
    stopTimer();
    capitalUsedCountries = [];
    correctlyGuessedCapitals = 0;
    capitalGameInput.value = '';
    capitalGameInput.disabled = false;
    capitalGameMessageElement.textContent = '';
    capitalGameMessageElement.className = 'message';
    capitalGameNextButton.classList.add('hidden');
    capitalGameSubmitButton.style.display = 'inline-block';
    capitalGameSkipButton.classList.add('hidden');
}

function showAllCapitalGameCountriesCompleted() {
    // Dodaj 50 punktów za ukończenie wszystkich krajów
    currentScore += 50;
    updateCapitalGameScore();

    // Sprawdź czy wszystkie stolice zostały zgadnięte (perfect round)
    if (correctlyGuessedCapitals === capitalUsedCountries.length) {
        if (currentContinent === 'europa') {
            playerStats.perfectRoundsCapitals++;
        } else if (currentContinent === 'azja') {
            playerStats.perfectRoundsAsianCapitals++;
        }
    }

    // Stwórz konfetti
    createConfetti();

    // Pokaż komunikat o ukończeniu wszystkich krajów
    const completionDiv = document.createElement('div');
    completionDiv.className = 'all-cities-complete';
    completionDiv.style.position = 'fixed';
    completionDiv.style.top = '50%';
    completionDiv.style.left = '50%';
    completionDiv.style.transform = 'translate(-50%, -50%)';
    completionDiv.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    completionDiv.style.color = 'white';
    completionDiv.style.padding = '30px';
    completionDiv.style.borderRadius = '20px';
    completionDiv.style.textAlign = 'center';
    completionDiv.style.zIndex = '1000';
    completionDiv.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    completionDiv.style.animation = 'bounceIn 0.8s ease-out';

    const title = document.createElement('h2');
    title.textContent = '🎉 GRATULACJE! 🎉';
    title.style.fontSize = '2.5rem';
    title.style.marginBottom = '15px';
    title.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
    title.style.color = 'white';
    title.style.fontWeight = '300';

    const text = document.createElement('p');
    const continentName = currentContinent === 'europa' ? 'Europie' : 'Azji';
    text.textContent = `Zgadłeś wszystkie stolice w ${continentName}!`;
    text.style.fontSize = '1.3rem';
    text.style.marginBottom = '10px';
    text.style.color = 'white';
    text.style.fontWeight = '300';

    // Dodaj statystyki dotyczące zgadniętych krajów
    const statsText = document.createElement('p');
    statsText.textContent = `Zgadnięto ${correctlyGuessedCapitals} z ${capitalUsedCountries.length} krajów w tej rundzie!`;
    statsText.style.fontSize = '1.1rem';
    statsText.style.fontWeight = '300';
    statsText.style.marginBottom = '15px';
    statsText.style.color = 'white';

    const reward = document.createElement('p');
    reward.textContent = '+50 punktów za niesamowite osiągnięcie!';
    reward.style.fontSize = '1.1rem';
    reward.style.fontWeight = '300';
    reward.style.marginBottom = '15px';
    reward.style.color = 'white';

    const continueText = document.createElement('p');
    continueText.textContent = 'Możesz grać dalej - kraje będą się powtarzać.';
    continueText.style.fontSize = '1rem';
    continueText.style.opacity = '0.9';
    continueText.style.color = 'white';
    continueText.style.fontWeight = '300';

    completionDiv.appendChild(title);
    completionDiv.appendChild(text);
    completionDiv.appendChild(statsText);
    completionDiv.appendChild(reward);
    completionDiv.appendChild(continueText);

    document.body.appendChild(completionDiv);

    // Usuń komunikat po 7 sekundach
    setTimeout(() => {
        if (completionDiv.parentNode) {
            completionDiv.style.opacity = '0';
            completionDiv.style.transform = 'translate(-50%, -50%) scale(0.8)';
            completionDiv.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            setTimeout(() => {
                if (completionDiv.parentNode) {
                    completionDiv.parentNode.removeChild(completionDiv);
                }
            }, 300);
        }
    }, 7000);
}

function updateScore() {
    scoreElement.textContent = currentScore;
}

function updateRemainingCities() {
    const remaining = gameData.length - usedCities.length;
    const total = gameData.length;
    remainingCitiesElement.textContent = `Pozostało miast: ${remaining}/${total}`;
}

function calculateXP(hintLevel) {
    if (hintLevel === 1) return 15;
    if (hintLevel === 2) return 10;
    if (hintLevel === 3) return 5;
    return 5;
}

function addXP(xpAmount) {
    const oldLevel = currentLevel;
    currentXP += xpAmount;

    // Calculate new level (100 XP per level)
    const newLevel = Math.floor(currentXP / 100) + 1;

    if (newLevel > oldLevel) {
        // Level up!
        currentLevel = newLevel;
        const levelDifference = newLevel - oldLevel;

        // Give 10 points per level gained
        const pointsGained = levelDifference * 10;
        currentScore += pointsGained;

        showLevelUpNotification(newLevel, pointsGained);
        //showNotification(`🎉 Poziom ${newLevel}! +${pointsGained} punktów! 🎉`, 'achievement'); //remove duplicate notification
    }

    updateLevelDisplay();
    updateLobbyLevel();
}

function updateLevelDisplay() {
    if (levelElement) {
        levelElement.textContent = currentLevel;
    }
    if (xpElement) {
        const xpInCurrentLevel = currentXP % 100;
        xpElement.textContent = `${xpInCurrentLevel}/100 XP`;
    }
}

function updateLobbyLevel() {
    if (lobbyLevelElement) {
        const xpInCurrentLevel = currentXP % 100;
        lobbyLevelElement.innerHTML = `
            <div class="level-number">Poziom ${currentLevel}</div>
            <div class="xp-progress">
                <div class="xp-bar">
                    <div class="xp-fill" style="width: ${xpInCurrentLevel}%"></div>
                </div>
                <div class="xp-text">${xpInCurrentLevel}/100 XP</div>
            </div>
        `;
    }
}

function showLevelUpNotification(newLevel, pointsGained) {
    // Create confetti
    createLevelUpConfetti();

    // Create level up notification
    const levelUpDiv = document.createElement('div');
    levelUpDiv.className = 'level-up-notification';

    const title = document.createElement('h2');
    title.textContent = '🎉 LEVEL UP! 🎉';
    title.className = 'level-up-title';

    const levelText = document.createElement('div');
    levelText.textContent = `Poziom ${newLevel}`;
    levelText.className = 'level-up-level';
    levelText.style.fontWeight = 'lighter'; //chudsza czcionka

    const pointsText = document.createElement('div');
    pointsText.textContent = `+${pointsGained} punktów za awans!`;
    pointsText.className = 'level-up-points';

    const xpText = document.createElement('div');
    xpText.textContent = 'Gratulacje! Stajesz się coraz lepszy!';
    xpText.className = 'level-up-message';

    levelUpDiv.appendChild(title);
    levelUpDiv.appendChild(levelText);
    levelUpDiv.appendChild(pointsText);
    levelUpDiv.appendChild(xpText);

    document.body.appendChild(levelUpDiv);

    // Remove notification after animation
    setTimeout(() => {
        if (levelUpDiv.parentNode) {
            levelUpDiv.style.opacity = '0';
            levelUpDiv.style.transform = 'translate(-50%, -50%) scale(0.7) rotateY(90deg)';
            levelUpDiv.style.transition = 'all 0.5s ease-out';
            setTimeout(() => {
                if (levelUpDiv.parentNode) {
                    levelUpDiv.parentNode.removeChild(levelUpDiv);
                }
            }, 500);
        }
    }, 5000);
}

function createLevelUpConfetti() {
    const numberOfConfetti = 80;
    const colors = ['#FFD700', '#FF6B6B', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#00BCD4'];

    for (let i = 0; i < numberOfConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'level-up-confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';

        // Random shapes
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        } else {
            confetti.style.transform = 'rotate(45deg)';
        }

        document.body.appendChild(confetti);

        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 6000);
    }
}

function updateLobbyScore() {
    lobbyScoreElement.textContent = currentScore;
    updateLobbyLevel();
    showVipStatus();
}

function updateShopScore() {
    shopScoreElement.textContent = currentScore;
}

function updateCodesScore() {
    codesScoreElement.textContent = currentScore;
}

// Funkcja do tworzenia animowanych gwiazd
function createStars() {
    const starsContainer = document.getElementById('stars');
    const numberOfStars = 80;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        starsContainer.appendChild(star);
    }
}

// Funkcja do tworzenia spadających dużych gwiazd
function createLargeStars() {
    const starsContainer = document.getElementById('stars');

    setInterval(() => {
        if (!lobbyScreen.classList.contains('hidden')) {
            const largeStar = document.createElement('div');
            largeStar.className = 'large-star';
            largeStar.style.left = Math.random() * 100 + '%';
            largeStar.style.animationDelay = Math.random() * 2 + 's';
            largeStar.style.animationDuration = (Math.random() * 4 + 10) + 's';
            starsContainer.appendChild(largeStar);

            // Usuń gwiazdę po animacji
            setTimeout(() => {
                if (largeStar.parentNode) {
                    largeStar.parentNode.removeChild(largeStar);
                }
            }, 15000);
        }
    }, 3000); // Co 3 sekundy
}

// Funkcja do tworzenia animowanych kół
function createCircles() {
    const circlesContainer = document.getElementById('circles');
    const numberOfCircles = 30;

    for (let i = 0; i < numberOfCircles; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        const size = Math.random() * 80 + 15;
        circle.style.width = size + 'px';
        circle.style.height = size + 'px';
        circle.style.left = Math.random() * 100 + '%';
        circle.style.top = Math.random() * 100 + '%';
        circle.style.animationDelay = Math.random() * 6 + 's';
        circle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        circlesContainer.appendChild(circle);
    }
}

// Funkcja do tworzenia animowanych joysticków
function createJoysticks() {
    const joysticksContainer = document.getElementById('joysticks');
    if (joysticksContainer.children.length > 0) return; // Nie twórz ponownie

    const numberOfJoysticks = 8;

    for (let i = 0; i < numberOfJoysticks; i++) {
        const joystick = document.createElement('div');
        joystick.className = 'joystick';
        joystick.innerHTML = '🎮';
        joystick.style.left = Math.random() * 100 + '%';
        joystick.style.top = Math.random() * 100 + '%';
        joystick.style.animationDelay = Math.random() * 4 + 's';
        joystick.style.animationDuration = (Math.random() * 3 + 5) + 's';
        joysticksContainer.appendChild(joystick);
    }
}

// Funkcja do tworzenia gwiazd dla sklepu
function createShopStars() {
    const shopStarsContainer = document.getElementById('shopStars');
    if (shopStarsContainer.children.length > 0) return; // Nie twórz ponownie

    const numberOfStars = 80;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        shopStarsContainer.appendChild(star);
    }
}

// Funkcja do tworzenia animowanych znaków zapytania
function createQuestionMarks() {
    const questionMarksContainer = document.getElementById('questionMarks');
    if (questionMarksContainer.children.length > 0) return; // Nie twórz ponownie

    const numberOfMarks = 20;

    for (let i = 0; i < numberOfMarks; i++) {
        const mark = document.createElement('div');
        mark.className = 'question-mark';
        mark.textContent = '?';
        mark.style.left = Math.random() * 100 + '%';
        mark.style.top = Math.random() * 100 + '%';
        mark.style.animationDelay = Math.random() * 4 + 's';
        mark.style.animationDuration = (Math.random() * 3 + 3) + 's';
        questionMarksContainer.appendChild(mark);
    }
}

// Funkcja do tworzenia animowanego tła Matrix
function createMatrixBackground() {
    const matrixContainer = document.getElementById('matrixBg');
    if (matrixContainer.children.length > 0) return; // Nie twórz ponownie

    const numberOfColumns = 30;
    const binaryChars = ['0', '1'];

    for (let i = 0; i < numberOfColumns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = (i * (100 / numberOfColumns)) + '%';
        column.style.animationDelay = Math.random() * 2 + 's';
        column.style.animationDuration = (Math.random() * 3 + 2) + 's';

        // Dodaj cyfry do kolumny
        for (let j = 0; j < 15; j++) {
            const digit = document.createElement('span');
            digit.className = 'matrix-digit';
            digit.textContent = binaryChars[Math.floor(Math.random() * binaryChars.length)];
            digit.style.animationDelay = (j * 0.1) + 's';
            column.appendChild(digit);
        }

        matrixContainer.appendChild(column);
    }
}

// Funkcja do tworzenia animowanych flag krajów
function createContinentFlags() {
    const continentJoysticksContainer = document.getElementById('continentJoysticks');
    if (!continentJoysticksContainer || continentJoysticksContainer.children.length > 0) return;

    const numberOfFlags = 15;
    const flagEmojis = ['🇵🇱', '🇩🇪', '🇫🇷', '🇮🇹', '🇪🇸', '🇬🇧', '🇳🇴', '🇸🇪', '🇩🇰', '🇫🇮', '🇨🇿', '🇦🇹', '🇨🇳', '🇯🇵', '🇰🇷'];

    for (let i = 0; i < numberOfFlags; i++) {
        const flag = document.createElement('div');
        flag.className = 'continent-flag';
        flag.textContent = flagEmojis[Math.floor(Math.random() * flagEmojis.length)];
        flag.style.left = Math.random() * 100 + '%';
        flag.style.top = Math.random() * 100 + '%';
        flag.style.animationDelay = Math.random() * 4 + 's';
        flag.style.animationDuration = (Math.random() * 3 + 5) + 's';
        continentJoysticksContainer.appendChild(flag);
    }
}

function updateContinentButtons() {
    const asiaButton = document.getElementById('asiaButton');
    
    if (currentLevel < 10) {
        asiaButton.classList.add('locked');
        asiaButton.innerHTML = '🔒 Azja <span class="level-requirement">Poziom 10</span>';
    } else {
        asiaButton.classList.remove('locked');
        asiaButton.innerHTML = '🏯 Azja';
    }
}

// Funkcja do tworzenia konfetti
function createConfetti() {
    const numberOfConfetti = 50;

    for (let i = 0; i < numberOfConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

        document.body.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

// Funkcja do tworzenia gwiazd europejskich
function createEuropeanStars() {
    const capitalGameCirclesContainer = document.getElementById('capitalGameCircles');
    if (!capitalGameCirclesContainer || capitalGameCirclesContainer.children.length > 0) return;

    const numberOfStars = 12; // 12 gwiazd jak na fladze UE
    const starEmojis = ['⭐', '🌟', '✨'];

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'european-star';
        star.textContent = starEmojis[Math.floor(Math.random() * starEmojis.length)];
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 4 + 's';
        star.style.animationDuration = (Math.random() * 3 + 4) + 's';
        capitalGameCirclesContainer.appendChild(star);
    }
}

function createAsianStars() {
    const capitalGameCirclesContainer = document.getElementById('capitalGameCircles');
    if (!capitalGameCirclesContainer || capitalGameCirclesContainer.children.length > 0) return;

    const numberOfStars = 15;
    const asianEmojis = ['🏮', '🎋', '🌸', '🍜', '🥋', '🏯', '🐉', '🥢'];

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'asian-star';
        star.textContent = asianEmojis[Math.floor(Math.random() * asianEmojis.length)];
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 4 + 's';
        star.style.animationDuration = (Math.random() * 3 + 4) + 's';
        capitalGameCirclesContainer.appendChild(star);
    }
}

// Functions for statistics
function showStatistics() {
    lobbyScreen.classList.add('hidden');
    statisticsScreen.classList.remove('hidden');
    statisticsScreen.classList.add('statistics-transition');
    setTimeout(() => statisticsScreen.classList.remove('statistics-transition'), 800);
    createStatisticsBackground();
    updateStatisticsDisplay();
}

function updateStatisticsDisplay() {
    // Podstawowe statystyki
    const totalPointsEarned = document.getElementById('totalPointsEarned');
    const currentLevelDisplay = document.getElementById('currentLevelDisplay');
    
    if (totalPointsEarned) totalPointsEarned.textContent = currentScore;
    if (currentLevelDisplay) currentLevelDisplay.textContent = currentLevel;

    // Statystyki miast
    const citiesGuessed = document.getElementById('citiesGuessed');
    const citiesFailed = document.getElementById('citiesFailed');
    const citiesSuccessRate = document.getElementById('citiesSuccessRate');
    const fastestCityGuess = document.getElementById('fastestCityGuess');
    
    if (citiesGuessed) citiesGuessed.textContent = playerStats.totalCitiesGuessed;
    if (citiesFailed) citiesFailed.textContent = playerStats.totalCitiesFailed;
    if (citiesSuccessRate) {
        const total = playerStats.totalCitiesGuessed + playerStats.totalCitiesFailed;
        const rate = total > 0 ? Math.round((playerStats.totalCitiesGuessed / total) * 100) : 0;
        citiesSuccessRate.textContent = rate + '%';
    }
    if (fastestCityGuess) {
        const fastest = playerStats.fastestGuessClues < 999 ? playerStats.fastestGuessClues + 's' : 'Brak';
        fastestCityGuess.textContent = fastest;
    }

    // Statystyki stolic
    const capitalsGuessed = document.getElementById('capitalsGuessed');
    const europeanCapitals = document.getElementById('europeanCapitals');
    const asianCapitals = document.getElementById('asianCapitals');
    const fastestCapitalGuess = document.getElementById('fastestCapitalGuess');
    
    if (capitalsGuessed) capitalsGuessed.textContent = playerStats.totalCapitalsGuessed;
    if (europeanCapitals) europeanCapitals.textContent = playerStats.totalCapitalsGuessed - playerStats.totalAsianCapitalsGuessed;
    if (asianCapitals) asianCapitals.textContent = playerStats.totalAsianCapitalsGuessed;
    if (fastestCapitalGuess) {
        const fastest = playerStats.fastestGuessCapital < 999 ? playerStats.fastestGuessCapital + 's' : 'Brak';
        fastestCapitalGuess.textContent = fastest;
    }

    // Statystyki zdjęć
    const photoGuessed = document.getElementById('photoGuessed');
    const photoSuccessRate = document.getElementById('photoSuccessRate');
    const fastestPhotoGuess = document.getElementById('fastestPhotoGuess');
    
    if (photoGuessed) photoGuessed.textContent = playerStats.totalPhotoCitiesGuessed;
    if (photoSuccessRate) {
        // Oblicz procent skuteczności dla zdjęć (załóżmy że nieudane próby to część ogólnych nieudanych prób)
        const totalPhotoAttempts = playerStats.totalPhotoCitiesGuessed + Math.floor(playerStats.totalCitiesFailed / 3); // Przybliżona kalkulacja
        const rate = totalPhotoAttempts > 0 ? Math.round((playerStats.totalPhotoCitiesGuessed / totalPhotoAttempts) * 100) : 0;
        photoSuccessRate.textContent = rate + '%';
    }
    if (fastestPhotoGuess) {
        const fastest = playerStats.fastestGuessPhoto < 999 ? playerStats.fastestGuessPhoto + 's' : 'Brak';
        fastestPhotoGuess.textContent = fastest;
    }

    // Serie i rekordy
    const longestStreak = document.getElementById('longestStreak');
    const currentStreakDisplay = document.getElementById('currentStreakDisplay');
    const withoutHints = document.getElementById('withoutHints');
    
    if (longestStreak) longestStreak.textContent = playerStats.maxStreak;
    if (currentStreakDisplay) currentStreakDisplay.textContent = playerStats.currentStreak;
    if (withoutHints) withoutHints.textContent = playerStats.guessedWithoutHints;

    // Ekonomia
    const currentBalance = document.getElementById('currentBalance');
    const totalSpent = document.getElementById('totalSpent');
    const shopPurchases = document.getElementById('shopPurchases');
    
    if (currentBalance) currentBalance.textContent = currentScore;
    if (totalSpent) totalSpent.textContent = playerStats.totalPointsSpent;
    if (shopPurchases) shopPurchases.textContent = playerStats.shopPurchases;

    // Statystyki hardcore
    const hardcoreCitiesGuessedEl = document.getElementById('hardcoreCitiesGuessed');
    const hardcoreCitiesFailedEl = document.getElementById('hardcoreCitiesFailed');
    const hardcoreMaxStreakEl = document.getElementById('hardcoreMaxStreak');
    const hardcoreFastestGuessEl = document.getElementById('hardcoreFastestGuess');
    const hardcorePointsLostEl = document.getElementById('hardcorePointsLost');
    
    if (hardcoreCitiesGuessedEl) hardcoreCitiesGuessedEl.textContent = playerStats.hardcoreCitiesGuessed;
    if (hardcoreCitiesFailedEl) hardcoreCitiesFailedEl.textContent = playerStats.hardcoreCitiesFailed;
    if (hardcoreMaxStreakEl) hardcoreMaxStreakEl.textContent = playerStats.hardcoreMaxStreak;
    if (hardcoreFastestGuessEl) {
        const fastest = playerStats.hardcoreFastestGuess < 999 ? playerStats.hardcoreFastestGuess + 's' : 'Brak';
        hardcoreFastestGuessEl.textContent = fastest;
    }
    if (hardcorePointsLostEl) hardcorePointsLostEl.textContent = playerStats.hardcorePointsLost;

    
}



function resetStatistics() {
    if (confirm('Czy na pewno chcesz zresetować wszystkie statystyki? Ta akcja jest nieodwracalna!')) {
        // Reset wszystkich statystyk
        playerStats = {
            totalCitiesGuessed: 0,
            totalCitiesFailed: 0,
            currentStreak: 0,
            maxStreak: 0,
            fastestGuessClues: 999,
            fastestGuessPhoto: 999,
            fastestGuessCapital: 999,
            fastestGuessAsianCapital: 999,
            perfectRoundsClues: 0,
            perfectRoundsPhoto: 0,
            perfectRoundsCapitals: 0,
            perfectRoundsAsianCapitals: 0,
            totalCapitalsGuessed: 0,
            totalAsianCapitalsGuessed: 0,
            usedHints: false,
            guessedWithoutHints: 0,
            totalPointsEarned: 0,
            totalPointsSpent: 0,
            shopPurchases: 0,
            gameSessions: 0,
            gameStarts: 0,
            firstGameDate: null,
            totalPhotoCitiesGuessed: 0,
            pointsLostTimeouts: 0,
            pointsLostSkips: 0,
            pointsLostWrong: 0,
            
            // Statystyki trybu hardcore
            hardcoreCitiesGuessed: 0,
            hardcoreCitiesFailed: 0,
            hardcoreCurrentStreak: 0,
            hardcoreMaxStreak: 0,
            hardcoreFastestGuess: 999,
            hardcorePointsLost: 0,
            hardcoreTimeOuts: 0
        };

        // Reset osiągnięć
        unlockedAchievements.clear();

        // Aktualizuj wyświetlanie
        updateStatisticsDisplay();
        showNotification('🗑️ Statystyki zostały zresetowane!', 'achievement');
    }
}

function createStatisticsBackground() {
    const statisticsBg = document.getElementById('statisticsBg');
    if (!statisticsBg || statisticsBg.children.length > 0) return;

    const numberOfCharts = 12;
    const chartEmojis = ['📊', '📈', '📉', '💹', '🎯', '📋', '🔢', '⚡', '💎', '🏆', '🎪', '🎨'];

    for (let i = 0; i < numberOfCharts; i++) {
        const chart = document.createElement('div');
        chart.className = 'chart-float';
        chart.textContent = chartEmojis[Math.floor(Math.random() * chartEmojis.length)];
        chart.style.left = Math.random() * 100 + '%';
        chart.style.top = Math.random() * 100 + '%';
        chart.style.animationDelay = Math.random() * 6 + 's';
        chart.style.animationDuration = (Math.random() * 4 + 4) + 's';
        statisticsBg.appendChild(chart);
    }
}

function initializePlayerStats() {
    if (!playerStats.firstGameDate) {
        playerStats.firstGameDate = new Date().toISOString();
    }
    playerStats.gameStarts++;
}

// Funkcje pomocnicze do śledzenia statystyk
function trackPointsEarned(points) {
    if (points > 0) {
        playerStats.totalPointsEarned += points;
    }
}

function trackPointsSpent(points) {
    playerStats.totalPointsSpent += points;
}

function trackShopPurchase() {
    playerStats.shopPurchases++;
}

function trackCityFailed() {
    playerStats.totalCitiesFailed++;
}

function trackPhotoCityGuessed() {
    playerStats.totalPhotoCitiesGuessed++;
}

// This analysis confirms that the code fixes achievement checking and incorporates all the required components.
function toggleHardcoreMode() {
    isHardcoreMode = !isHardcoreMode;
    
    if (isHardcoreMode) {
        activateHardcoreMode();
    } else {
        deactivateHardcoreMode();
    }
    
    updateHardcoreModeDisplay();
}

function activateHardcoreMode() {
    lobbyScreen.classList.add('hardcore-mode');
    hardcoreModeButton.textContent = 'Tryb Normalny';
    createBrokenHearts();
    showNotification('🔥 TRYB HARDCORE AKTYWOWANY! 🔥', 'achievement');
}

function deactivateHardcoreMode() {
    lobbyScreen.classList.remove('hardcore-mode');
    hardcoreModeButton.textContent = 'Tryb Hardcore';
    clearBrokenHearts();
    showNotification('✅ Powrót do trybu normalnego', 'success');
}

function updateHardcoreModeDisplay() {
    const indicators = [
        hardcoreModeIndicator,
        hardcoreModeIndicatorGameMode,
        hardcoreModeIndicatorGame,
        hardcoreModeIndicatorPhotoGame,
        hardcoreModeIndicatorContinent,
        hardcoreModeIndicatorCapitalGame
    ];
    
    indicators.forEach(indicator => {
        if (indicator) {
            if (isHardcoreMode) {
                indicator.classList.remove('hidden');
            } else {
                indicator.classList.add('hidden');
            }
        }
    });
}

function createBrokenHearts() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    // Clear existing broken hearts
    clearBrokenHearts();
    
    // Create interval for spawning broken hearts
    window.brokenHeartInterval = setInterval(() => {
        if (!lobbyScreen.classList.contains('hidden') && isHardcoreMode) {
            const brokenHeart = document.createElement('div');
            brokenHeart.className = 'broken-heart';
            brokenHeart.textContent = '💔';
            brokenHeart.style.left = Math.random() * 100 + '%';
            brokenHeart.style.animationDelay = Math.random() * 2 + 's';
            brokenHeart.style.animationDuration = (Math.random() * 4 + 8) + 's';
            starsContainer.appendChild(brokenHeart);

            // Remove broken heart after animation
            setTimeout(() => {
                if (brokenHeart.parentNode) {
                    brokenHeart.parentNode.removeChild(brokenHeart);
                }
            }, 12000);
        }
    }, 2000); // Every 2 seconds
}

function clearBrokenHearts() {
    if (window.brokenHeartInterval) {
        clearInterval(window.brokenHeartInterval);
    }
    
    const starsContainer = document.getElementById('stars');
    if (starsContainer) {
        const brokenHearts = starsContainer.querySelectorAll('.broken-heart');
        brokenHearts.forEach(heart => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        });
    }
}

function trackHardcoreCityGuessed() {
    if (isHardcoreMode) {
        playerStats.hardcoreCitiesGuessed++;
        playerStats.hardcoreCurrentStreak++;
        
        if (playerStats.hardcoreCurrentStreak > playerStats.hardcoreMaxStreak) {
            playerStats.hardcoreMaxStreak = playerStats.hardcoreCurrentStreak;
        }
        
        const timeTaken = (isHardcoreMode ? 10 : 30) - timeLeft;
        if (timeTaken < playerStats.hardcoreFastestGuess) {
            playerStats.hardcoreFastestGuess = timeTaken;
        }
    }
}

// Inicjalizacja
document.addEventListener('DOMContentLoaded', function() {
    // Gra zaczyna się w lobby
    if (gameModeScreen) gameModeScreen.classList.add('hidden');
    if (gameScreen) gameScreen.classList.add('hidden');
    if (photoGameScreen) photoGameScreen.classList.add('hidden');
    if (continentSelectionScreen) continentSelectionScreen.classList.add('hidden');
    if (capitalGameScreen) capitalGameScreen.classList.add('hidden');
    if (shopScreen) shopScreen.classList.add('hidden');
    if (riddleScreen) riddleScreen.classList.add('hidden');
    if (codesScreen) codesScreen.classList.add('hidden');
    if (achievementsScreen) achievementsScreen.classList.add('hidden');
    if (statisticsScreen) statisticsScreen.classList.add('hidden');
    
    // Inicjalizuj statystyki
    initializePlayerStats();
    
    updateLobbyScore();
    updateLevelDisplay();
    createStars();
    createLargeStars();
    createCircles();
    showVipStatus();
    showMysteryButton();

    // Gra gotowa do działania
});
