// ignore
var Config = {};

/**
 * What should the text in the center of the screen be?
 * if empty it will fill in your Server Name
 */
Config.title = "";

/**
 * Enable map text in the top left corner of the screen?
 */
Config.enableMap = true;

/**
 * Enable steamId text in the top right corner of the screen?
 */
Config.enableSteamID = true;

/**
 * Enable announcements?
 */
Config.enableAnnouncements = true;

/**
 * What messages do you want to show up?
 * only works if enableAnnouncements = true
 */
Config.announceMessages = [
  "Мы все умрем.",
  "Никто не выживет.",
  "Вы больше не вернётесь.",
  "Стоит передумать.",
  "РАЗОРВИ ЦИКЛ.",
  "Вы уверены?",
  "Вы ничего не почувствуете.",
  "Вам здесь не рады.",
  "Вам никто не поможет.",
  "Не верьте никому, верьте только мне.",
    
];

/**
 * How many miliseconds for each announcement?
 * only works if enableAnnouncements = true
 */
Config.announcementLength = 3000;

/**
 * Image Filename
 * DROP IMAGE IN "images" FOLDER
 */
Config.backgroundImages = [
  "bg1.jpg",
  "bg2.jpg",
  "bg3.jpg",
  "bg4.jpg",
  "bg5.jpg",
  "bg6.jpg",
  "bg7.jpg",
  "bg8.jpg",
  "bg9.jpg",
  "bg10.jpg",
  "bg11.jpg"
];

/**
 * Enable debug messages?
 */
Config.enableDebug = false;

/**
 * прив
 */
 
 Config.musicTracks = [
  { file: "track1.mp3", name: "Museum", author: "TREPANG²", },
  { file: "track2.mp3", name: "Pause That", author: "TREPANG²"  },
  { file: "track3.mp3", name: "Take Your Fight", author: "TREPANG²", },
  { file: "track4.mp3", name: "Load Up", author: "TREPANG²", },
  { file: "track5.mp3", name: "Battleworm Rest", author: "TREPANG²", },
  { file: "track6.mp3", name: "Where To Next", author: "TREPANG²"  },
  { file: "track7.mp3", name: "Hazmat Harry", author: "TREPANG²", },
  { file: "track8.mp3", name: "Task Force Friendly Fire", author: "TREPANG²", },
  { file: "track9.mp3", name: "Site 14", author: "TREPANG²", },
];