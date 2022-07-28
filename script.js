const messages = {
  amongus: {
    loss: "Can't believe a damn stone is stronger than me!!",
    win: "This week's menu: rabbit stew",
    sound: "./amongus.mp3"
  },
  moai: {
    loss: "",
    win: "The might of human is minuscule compared to the ALMIGHTY MOAI",
    sound: "./boom-sound.mp3"
  },
  chungus: {
    loss: "",
    win: "",
    sound: "./chungus.mp3"
  },
  impostor: {
    win: "Computer was the impostor, the RNG gods were not on your side",
    sound: "./impostor-kill.mp3"
  }
};

const pngPaths = {
  moai: "./moai.png",
  chungus: "./chungus.png",
  amongus: "./sus-blue.png",
  impostor: "./sus-red.png"
};

const players = ["user", "computer"],
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
  document.getElementById(`${who}-wasted`).style.display = "initial";
}

function removeWasted() {
  document.getElementById("user-wasted").style.display = "none";
  document.getElementById("computer-wasted").style.display = "none";
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

function displayMessage(message) {
  removeArenaBorderRadius();
  const messageBox = document.getElementById("message-box");
  messageBox.classList.add("active");
  messageBox.children[0].innerText = message;

  setTimeout(() => {
    messageBox.classList.remove("active");
    addArenaBorderRadius();
  }, 5000);
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
  setScore(players[winner], score);
  setWasted(players[1 - winner]);
  playSound(sound);
  displayMessage(message);
  document.body.style.pointerEvents = "none";
}

document.getElementsByTagName("audio")[0].addEventListener("ended", () => {
  document.body.style.pointerEvents = "initial";
});

function playRound(userSelection) {
  removeWasted();

  const computerSelection =
    Math.random() > 0.95
      ? "impostor" // 5% chance to get impostor
      : Object.keys(messages)[Math.floor(Math.random() * 3)];

  setFighter("user", userSelection);
  setFighter("computer", computerSelection);

  if (computerSelection === "impostor")
    return updateUI(
      COMPUTER,
      ++computerScore,
      messages.impostor.win,
      messages.impostor.sound
    );

  const userSelectionIndex = getIndex(userSelection),
    computerSelectionIndex = getIndex(computerSelection);

  if (userSelectionIndex === computerSelectionIndex)
    return displayMessage("It's a tie!");

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
