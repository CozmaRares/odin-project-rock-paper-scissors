const fighters = {
    amongus: {
      loss: '"Can\'t believe a damn stone is stronger than me!!"',
      win: "This week's menu: rabbit stew",
      sound: "./sounds/amongus.mp3",
      png: "./images/sus-blue.png"
    },
    moai: {
      loss: '"NOOOO, I am the ALMIGHTY MOAI, you can\'t just sit on me!!!"',
      win: "The might of human is minuscule compared to the ALMIGHTY MOAI",
      sound: "./sounds/boom-sound.mp3",
      png: "./images/moai.png"
    },
    chungus: {
      loss: "OmegaLuL imagine killing this absolute unit",
      win: '"Ohh, look! I found a stone big enough to sit on"',
      sound: "./sounds/chungus.mp3",
      png: "./images/chungus.png"
    }
  },
  fighterNames = Object.keys(fighters);

const special = {
  amongus: {
    message: "Computer was the impostor, the RNG gods were not on your side",
    sound: "./sounds/impostor-kill.mp3",
    png: "./images/sus-red.png"
  },
  moai: {
    message:
      '"Once anyone witnesses King Crimson... they no longer exist in this world."',
    sound: "./sounds/king-crimson.mp3",
    png: "./images/moai-king-crimson.png"
  },
  chungus: {
    message:
      '"Poor old Bugs. But, any way you look at it, it\'s better he should suffer."',
    sound: "./sounds/daffy.mp3",
    png: "./images/daffy.png"
  },
  tie: {
    message: "Mind reading??!?!?!?",
    sound: "./sounds/illuminati.mp3"
  }
};

const players = ["user", "computer"],
  NONE = -1,
  USER = 0,
  COMPUTER = 1;

let userScore = 0,
  computerScore = 0;

function setFighter(who, pngPath) {
  document.getElementById(`${who}-fighter`).setAttribute("src", pngPath);
}

function setScore(who, score) {
  document.getElementById(`${who}-score`).innerText = score;
}

function setWasted(who) {
  document.getElementById(`${who}-wasted`).style.opacity = "1";
  document.getElementById(`${who}-wasted`).classList.add("active");
}

function removeWasted() {
  document.getElementById("user-wasted").style.opacity = "0";
  document.getElementById("user-wasted").classList.remove("active");

  document.getElementById("computer-wasted").style.opacity = "0";
  document.getElementById("computer-wasted").classList.remove("active");
}

function addArenaBorderRadius() {
  const arena = document.getElementById("arena");

  const value = arena.style["border-top-left-radius"];

  arena.style["border-bottom-left-radius"] = value;
  arena.style["border-bottom-right-radius"] = value;
}

function removeArenaBorderRadius() {
  const arena = document.getElementById("arena");

  arena.style["border-bottom-left-radius"] = "0px";
  arena.style["border-bottom-right-radius"] = "0px";
}

function displayMessage(message, delay) {
  removeArenaBorderRadius();
  const messageBox = document.getElementById("message-box");
  messageBox.classList.add("active");
  messageBox.children[0].innerText = message;

  setTimeout(() => {
    messageBox.classList.remove("active");
    addArenaBorderRadius();
  }, delay);
}

function getIndex(choice) {
  return Object.keys(fighters).indexOf(choice);
}

function playSound(source) {
  const audio = document.getElementsByTagName("audio")[0];
  audio.src = source;
  audio.play();
}

function stopSound() {
  document.getElementsByTagName("audio")[0].pause();
}

function updateUI(winner, score, message, sound) {
  const delay = 5000;

  document.body.style.pointerEvents = "none";

  if (winner != NONE) {
    setScore(players[winner], score);
    setWasted(players[1 - winner]);
  }

  playSound(sound);
  displayMessage(message, delay);

  setTimeout(
    () => (document.body.style.pointerEvents = "initial"),
    delay + 500
  );
}

function getFighter(idx) {
  if (typeof idx !== "number") return;

  return fighters[fighterNames[idx]];
}

function playRound(userSelection) {
  removeWasted();

  const computerSelection =
    Math.random() > 0.9 ? "special" : Math.floor(Math.random() * 3);

  const userFighter = getFighter(userSelection);
  const computerFighter =
    typeof computerSelection === "number"
      ? getFighter(computerSelection)
      : special[fighterNames[userSelection]];

  setFighter("user", userFighter.png);
  setFighter("computer", computerFighter.png);

  if (computerSelection === "special") {
    return updateUI(
      COMPUTER,
      ++computerScore,
      computerFighter.message,
      computerFighter.sound
    );
  }

  if (userSelection === computerSelection)
    return updateUI(NONE, 0, special.tie.message, special.tie.sound);

  if (Math.abs(userSelection - computerSelection) === 1)
    if (userSelection > computerSelection)
      return updateUI(
        USER,
        ++userScore,
        userFighter.win,
        userFighter.sound
      );
    else
      return updateUI(
        COMPUTER,
        ++computerScore,
        userFighter.loss,
        computerFighter.sound
      );

  if (userSelection < computerSelection)
    return updateUI(
      USER,
      ++userScore,
      userFighter.win,
      userFighter.sound
    );
  else
    return updateUI(
      COMPUTER,
      ++computerScore,
      userFighter.loss,
      computerFighter.sound
    );
}

document.getElementsByTagName("audio")[0].volume = 0.5;
