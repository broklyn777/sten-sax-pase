const choices = document.querySelectorAll(".choice");
const score = document.getElementById("score");
const result = document.getElementById("result");
const restart = document.getElementById("restart");
const modal = document.querySelector(".modal");
const scoreboard = {
  spelare: 0,
  dator: 0
};

// Play game
function play(e) {
  restart.style.display = "inline-block";
  const spelareChoice = e.target.id;
  const datorChoice = getdatorChoice();
  const winner = getWinner(spelareChoice, datorChoice);
  showWinner(winner, datorChoice);
}

// Get dators choice
function getdatorChoice() {
  const rand = Math.random();
  if (rand < 0.34) {
    return "rock";
  } else if (rand <= 0.67) {
    return "paper";
  } else {
    return "scissors";
  }
}

// Get game winner
function getWinner(p, c) {
  if (p === c) {
    return "draw";
  } else if (p === "rock") {
    if (c === "paper") {
      return "dator";
    } else {
      return "spelare";
    }
  } else if (p === "paper") {
    if (c === "scissors") {
      return "dator";
    } else {
      return "spelare";
    }
  } else if (p === "scissors") {
    if (c === "rock") {
      return "dator";
    } else {
      return "spelare";
    }
  }
}

function showWinner(winner, datorChoice) {
  if (winner === "spelare") {
    // Inc spelare score
    scoreboard.spelare++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-win">Du Vinner</h1>
      <i class="fas fa-hand-${datorChoice} fa-10x"></i>
      <p>dator Chose <strong>${datorChoice.charAt(0).toUpperCase() +
        datorChoice.slice(1)}</strong></p>
    `;
  } else if (winner === "dator") {
    // Inc dator score
    scoreboard.dator++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-lose">Du Förlorar</h1>
      <i class="fas fa-hand-${datorChoice} fa-10x"></i>
      <p>dator Chose <strong>${datorChoice.charAt(0).toUpperCase() +
        datorChoice.slice(1)}</strong></p>
    `;
  } else {
    result.innerHTML = `
      <h1>Oavgjort</h1>
      <i class="fas fa-hand-${datorChoice} fa-10x"></i>
      <p>dator Chose <strong>${datorChoice.charAt(0).toUpperCase() +
        datorChoice.slice(1)}</strong></p>
    `;
  }
  // Show score
  score.innerHTML = `
    <p>Spelare: ${scoreboard.spelare}</p>
    <p>Dator: ${scoreboard.dator}</p>
    `;

  modal.style.display = "block";
}

// Restart game
function restartGame() {
  scoreboard.spelare = 0;
  scoreboard.dator = 0;
  score.innerHTML = `
    <p>spelare: 0</p>
    <p>dator: 0</p>
  `;
}

// Clear modal
function clearModal(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

// Event listeners
choices.forEach(choice => choice.addEventListener("click", play));
window.addEventListener("click", clearModal);
restart.addEventListener("click", restartGame);
