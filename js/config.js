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
  "Enjoy your stay!",
  "This loading screen is made by Exsite."
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
  "bg2.jpg"
];

/**
 * Enable debug messages?
 */
Config.enableDebug = false;

/**
 * прив
 */
 
Config.musicTracks = [
  "track1.mp3",
  "track2.mp3",
  "track3.mp3",
  "track4.mp3"
];