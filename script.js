const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const winningMessage = document.getElementById('winning-message');
const messageText = document.getElementById('message-text');
const restartButton = document.getElementById('restart-button');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let isCircleTurn;
let xScore = 0;
let oScore = 0;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  isCircleTurn = false;
  cells.forEach(cell => {
    cell.className = 'cell';
    cell.textContent = '';
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  winningMessage.style.display = 'none';
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isCircleTurn ? 'o' : 'x';
  placeMark(cell, currentClass);

  const winInfo = checkWin(currentClass);
  if (winInfo) {
    endGame(false, winInfo);
    updateScore(currentClass);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isCircleTurn = !isCircleTurn;
  }
}

function placeMark(cell, currentClass) {
  cell.textContent = currentClass.toUpperCase();
  cell.classList.add(currentClass);
}

function checkWin(currentClass) {
  for (let combo of WINNING_COMBINATIONS) {
    if (combo.every(i => cells[i].classList.contains(currentClass))) {
      return combo;
    }
  }
  return null;
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains('x') || cell.classList.contains('o')
  );
}

function endGame(draw, winCombo = []) {
  if (draw) {
    messageText.innerText = 'Draw!';
  } else {
    messageText.innerText = `${isCircleTurn ? "O's" : "X's"} Wins!`;
    winCombo.forEach(i => cells[i].classList.add('winner'));
  }
  winningMessage.style.display = 'block';
}

function updateScore(winner) {
  if (winner === 'x') {
    xScore++;
    scoreX.textContent = xScore;
  } else {
    oScore++;
    scoreO.textContent = oScore;
  }
}
