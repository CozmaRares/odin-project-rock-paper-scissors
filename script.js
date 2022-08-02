const data = {
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
  },
  impostor: {
    message: "Computer was the impostor, the RNG gods were not on your side",
    sound: "./sounds/impostor-kill.mp3",
    png: "./images/sus-red.png"
  },
  crimson: {
    message:
      '"Once anyone witnesses King Crimson... they no longer exist in this world."',
    sound: "./sounds/king-crimson.mp3",
    png: "./images/moai-king-crimson.png"
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

function setFighter(who, fighter) {
  document
    .getElementById(`${who}-fighter`)
    .setAttribute("src", data[fighter].png);
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
  return Object.keys(data).indexOf(choice);
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

function playRound(userSelection) {
  removeWasted();

  const computerSelection =
    Math.random() > 0.3
      ? "impostor" // 10% chance to get impostor
      : Object.keys(data)[Math.floor(Math.random() * 3)];

  setFighter("user", userSelection);
  setFighter("computer", computerSelection);

  if (computerSelection === "impostor")
    return updateUI(
      COMPUTER,
      ++computerScore,
      data.impostor.message,
      data.impostor.sound
    );

  const userSelectionIndex = getIndex(userSelection),
    computerSelectionIndex = getIndex(computerSelection);

  if (userSelectionIndex === computerSelectionIndex)
    return updateUI(NONE, 0, data.tie.message, data.tie.sound);

  if (Math.abs(userSelectionIndex - computerSelectionIndex) === 1)
    if (userSelectionIndex > computerSelectionIndex)
      return updateUI(
        USER,
        ++userScore,
        data[userSelection].win,
        data[userSelection].sound
      );
    else
      return updateUI(
        COMPUTER,
        ++computerScore,
        data[userSelection].loss,
        data[computerSelection].sound
      );

  if (userSelectionIndex < computerSelectionIndex)
    return updateUI(
      USER,
      ++userScore,
      data[userSelection].win,
      data[userSelection].sound
    );
  else
    return updateUI(
      COMPUTER,
      ++computerScore,
      data[userSelection].loss,
      data[computerSelection].sound
    );
}

document.getElementsByTagName("audio")[0].volume = 0.5;
