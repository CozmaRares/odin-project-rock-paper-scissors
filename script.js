const choices = ["rock", "paper", "scissors"];
const numberOfRounds = 5;

function getComputerChoice() {
  return Math.floor(Math.random() * choices.length);
}

function drawMessage() {
  return "It's a draw!";
}

function winMessage() {
  return "You win!";
}

function loseMessage() {
  return "You lose!";
}

function playRound(playerSelection, computerSelection) {
  console.log(`player:${choices[playerSelection]} computer:${choices[computerSelection]}`);

  if (playerSelection === computerSelection) return drawMessage();

  if (Math.abs(playerSelection - computerSelection) === 1)
    return playerSelection > computerSelection ? winMessage() : loseMessage();

  return playerSelection < computerSelection ? winMessage() : loseMessage();
}

function getInput() {
  const choicesString = choices.join(" / ");
  let input = prompt(`Enter your choice (${choicesString}):`),
    idx = choices.indexOf(input);

  while (idx === -1) {
    input = prompt(`Invalid choice, choose again (${choicesString}):`);
    idx = choices.indexOf(input);
  }

  return idx;
}

function gameLoop() {
  for (let i = 0; i < numberOfRounds; i++) {
    const playerSelection = getInput(),
      computerSelection = getComputerChoice(),
      message = playRound(playerSelection, computerSelection);

    console.log(message);
    alert(message);
  }
}
