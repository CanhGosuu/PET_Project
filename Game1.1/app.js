/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
"use strict";
var score, roundScore, activePlayer, continueGame;
newGame();
// gán event cho .btn-roll
document.querySelector(".btn-roll").addEventListener("click", () => {
  if (continueGame) {
    var dice = Math.floor(Math.random() * 10) + 1;
    console.log(dice);

    var diceDOM = document.querySelector(".dice");
    if (dice < 7) {
      diceDOM.src = "dice-" + dice + ".png";
    } else {
      diceDOM.src = "dice-7.png";
    }
    diceDOM.style.display = "block";
    //update the round score
    //active player shows
    if (dice < 7) {
      roundScore += dice;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // document.querySelector(`.player-${activePlayer}-panel`).classList.toggle("active");
      nextPlayer();
    }
  }
});
document.querySelector(".btn-hold").addEventListener("click", () => {
  if (continueGame) {
    nextPlayer();
  }
});

function nextPlayer() {
  score[activePlayer] += roundScore;
  document.getElementById("score-" + activePlayer).textContent =
    score[activePlayer];
  if (score[activePlayer] >= 10) {
    document.getElementById("name-" + activePlayer).textContent = "WINNER";
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add("winner");
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.remove("active");
    continueGame = false;
  } else {
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = 0;
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.toggle("active");
    activePlayer = (activePlayer + 1) % 2;
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.toggle("active");
  }
}
document.querySelector(".btn-new").addEventListener("click", newGame);
function newGame() {
  score = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  continueGame = true;
  document.querySelector(".dice").src = "dice-7.png";
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.add("active");
  document
    .querySelector(`.player-${(activePlayer + 1) % 2}-panel`)
    .classList.remove("active");
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
}
