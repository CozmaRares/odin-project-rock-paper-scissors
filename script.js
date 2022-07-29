const messages = {
  amongus: {
    loss: '"Can\'t believe a damn stone is stronger than me!!"',
    win: "This week's menu: rabbit stew",
    sound: "./sounds/amongus.mp3"
  },
  moai: {
    loss: '"NOOOO, I am the ALMIGHTY MOAI, you can\'t just sit on me!!!"',
    win: "The might of human is minuscule compared to the ALMIGHTY MOAI",
    sound: "./sounds/boom-sound.mp3"
  },
  chungus: {
    loss: "OmegaLuL imagine killing this absolute unit",
    win: '"Ohh, look! I found a stone big enough to sit on"',
    sound: "./sounds/chungus.mp3"
  },
  impostor: {
    message: "Computer was the impostor, the RNG gods were not on your side",
    sound: "./sounds/impostor-kill.mp3"
  },
  tie: {
    message: "Mind reading??!?!?!?",
    sound: "./sounds/illuminati.mp3"
  }
};

const pngPaths = {
  moai: "./images/moai.png",
  chungus: "./images/chungus.png",
  amongus: "./images/sus-blue.png",
  impostor: "./images/sus-red.png"
};

const players = ["user", "computer"],
  NONE = -1,
  USER = 0,
  COMPUTER = 1;

let userScore = 0,
  computerScore = 0;

function setFighter(who, shitpost) {
  document
    .getElementById(`${who}-fighter`)
    .setAttribute("src", pngPaths[shitpost]);
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
  return Object.keys(messages).indexOf(choice);
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
    Math.random() > 0.9
      ? "impostor" // 10% chance to get impostor
      : Object.keys(messages)[Math.floor(Math.random() * 3)];

  setFighter("user", userSelection);
  setFighter("computer", computerSelection);

  if (computerSelection === "impostor")
    return updateUI(
      COMPUTER,
      ++computerScore,
      messages.impostor.message,
      messages.impostor.sound
    );

  const userSelectionIndex = getIndex(userSelection),
    computerSelectionIndex = getIndex(computerSelection);

  if (userSelectionIndex === computerSelectionIndex)
    return updateUI(NONE, 0, messages.tie.message, messages.tie.sound);

  if (Math.abs(userSelectionIndex - computerSelectionIndex) === 1)
    if (userSelectionIndex > computerSelectionIndex)
      return updateUI(
        USER,
        ++userScore,
        messages[userSelection].win,
        messages[userSelection].sound
      );
    else
      return updateUI(
        COMPUTER,
        ++computerScore,
        messages[userSelection].loss,
        messages[computerSelection].sound
      );

  if (userSelectionIndex < computerSelectionIndex)
    return updateUI(
      USER,
      ++userScore,
      messages[userSelection].win,
      messages[userSelection].sound
    );
  else
    return updateUI(
      COMPUTER,
      ++computerScore,
      messages[userSelection].loss,
      messages[computerSelection].sound
    );
}
