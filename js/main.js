"use sctrict";

var isGmod = false;
var isTest = false;
var totalFiles = 50;
var totalCalled = false;
var downloadingFileCalled = false;
var percentage = 0;

/**
 * Gmod Called functions
 */
function GameDetails(
  servername,
  serverurl,
  mapname,
  maxplayers,
  steamid,
  gamemode
) {
  debug("GameDetails called");
  isGmod = true;
  if (!isTest) {
    loadAll();
  }

  if (Config.title) {
    $("#title").html(Config.title);
  } else {
    $("#title").html(servername);
  }
  $("#title").fadeIn();

  if (Config.enableMap) {
    $("#map").append(mapname);
    $("#map").fadeIn();
  } else {
    $("#map").hide();
  }

  if (Config.enableSteamID) {
    $("#steamid").html(steamid);
  }
  $("#steamid").fadeIn();
}

function SetFilesTotal(total) {
  debug("SetFilesTotal called total: " + total);
  totalCalled = true;
  totalFiles = total;
}

function SetFilesNeeded(needed) {
  debug("SetFilesNeeded called needed: " + needed);
  if (totalCalled) {
    var sPercentage = 100 - Math.round((needed / totalFiles) * 100);
    percentage = sPercentage;
    setLoad(sPercentage);
  }
}

var fileCount = 0;
function DownloadingFile(filename) {
  filename = filename.replace("'", "").replace("?", "");
  debug("DownloadingFile called '" + filename + "'");
  downloadingFileCalled = true;
  $("#history").prepend('<div class="history-item">' + filename + "</div>");
  $(".history-item").each(function(i, el) {
    if (i > 10) {
      $(el).remove();
    }
    $(el).css("opacity", "" + 1 - i * 0.1);
  });
}

var allow_increment = true;
function SetStatusChanged(status) {
  debug("SetStatusChanged called '" + status + "'");
  $("#history").prepend('<div class="history-item">' + status + "</div>");
  $(".history-item").each(function(i, el) {
    if (i > 10) {
      $(el).remove();
    }
    $(el).css("opacity", "" + 1 - i * 0.1);
  });
  if (status === "Workshop Complete") {
    allow_increment = false;
    setLoad(80);
  } else if (status === "Client info sent!") {
    allow_increment = false;
    setLoad(95);
  } else if (status === "Starting Lua...") {
    setLoad(100);
  } else {
    if (allow_increment) {
      percentage = percentage + 0.1;
      setLoad(percentage);
    }
  }
}

/**
 * External Functions
 */
function loadAll() {
  $("nav").fadeIn();
  $("main").fadeIn();
 
}
function loadBackground() {
  if (Config.backgroundImages && Config.backgroundImages.length > 0) {

    let current = 0;

    $(".background").css(
      "background-image",
      'url("images/' + Config.backgroundImages[0] + '")'
    );

    setInterval(function () {
      current++;
      if (current >= Config.backgroundImages.length) {
        current = 0;
      }

      $(".background").css(
        "background-image",
        'url("images/' + Config.backgroundImages[current] + '")'
      );

    }, 10000); // 10 секунд
  }
}
function setLoad(percentage) {
  debug(percentage + "%");
  $(".overhaul").css("left", percentage + "%");
}
var permanent = false;
function announce(message, ispermanent) {
  if (Config.enableAnnouncements && !permanent) {
    $("#announcement").hide();
    $("#announcement").html(message);
    $("#announcement").fadeIn();
  }
  if (ispermanent) {
    permanent = true;
  }
}
function debug(message) {
  if (Config.enableDebug) {
    console.log(message);
    $("#debug").prepend(message + "<br>");
  }
}

/**
 * Initial function
 */
$(document).ready(function() {
  // load everything in when ready
  loadBackground();
  loadMusic();
  
  // print announcement messages every few seconds
  if (
  Config.announceMessages &&
  Config.enableAnnouncements &&
  Config.announcementLength
) {
  if (Config.announceMessages.length > 0) {
    let lastIndex = -1;

    setInterval(function() {
      let randomIndex;

      do {
        randomIndex = Math.floor(
          Math.random() * Config.announceMessages.length
        );
      } while (
        Config.announceMessages.length > 1 &&
        randomIndex === lastIndex
      );

      lastIndex = randomIndex;
      announce(Config.announceMessages[randomIndex]);
    }, Config.announcementLength);
  }
}
  // if it isn't loaded by gmod load manually
  setTimeout(function() {
    if (!isGmod) {
      debug("No Garry's mod testing..");
      isTest = true;
      loadAll();

      GameDetails(
        "Servername",
        "Serverurl",
        "Mapname",
        "Maxplayers",
        "SteamID",
        "Gamemode"
      );

      var totalTestFiles = 100;
      SetFilesTotal(totalTestFiles);

      var needed = totalTestFiles;
      setInterval(function() {
        if (needed > 0) {
          needed = needed - 1;
          SetFilesNeeded(needed);
          DownloadingFile("Filename " + needed);
        }
      }, 500);

      SetStatusChanged("Testing..");
    }
  }, 1000);
});


function loadMusic() {
  if (!Config.musicTracks || Config.musicTracks.length === 0) return;

  // Берем случайный объект из списка
  var trackData = Config.musicTracks[Math.floor(Math.random() * Config.musicTracks.length)];
  var audio = new Audio("music/" + trackData.file);
  
  audio.volume = 0.3; // Громкость от 0 до 1
  audio.loop = true;  // Зациклить трек
  
  // Функция для вывода текста на экран
  function showTrackInfo() {
    if (trackData.name && trackData.author) {
      // Проверяем, задан ли цвет в конфиге. Если нет — ставим белый по умолчанию
      var trackColor = trackData.color ? trackData.color : "#ffffff";
      
      // Применяем цвет и динамическое свечение (text-shadow) под этот цвет
      var formattedText = "Сейчас играет:   " + 
                          "<span class='track-name' style='color: " + trackColor + " !important; text-shadow: 0 0 10px " + trackColor + " !important;'>" + trackData.name + "</span>" + 
                          " - " + 
                          "<span class='track-author'>" + trackData.author + "</span>";
                          
      $("#music-info").html(formattedText).fadeIn();
    }
  }

  // Попытка автовоспроизведения
  var playPromise = audio.play();
  
  if (playPromise !== undefined) {
    playPromise.then(_ => {
      debug("Музыка играет: " + trackData.file);
      showTrackInfo();
    }).catch(error => {
      debug("Автовоспроизведение заблокировано браузером");
      // Добавляем обработчик на клик, если автоплей в браузере не сработал
      document.body.addEventListener('click', function() {
        audio.play();
        showTrackInfo();
      }, { once: true });
    });
  }
}
