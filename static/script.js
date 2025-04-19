let balance = 1000;
let gridSize = 5;
let landmineCount = 3;
let betAmount = 100;
let landminePositions = new Set();
let clicked = new Set();
let profit = 0;
let safeClicks = 0;
let gameStarted = false;

const balanceEl = document.getElementById("balance");
const profitEl = document.getElementById("profit");
const landmineInput = document.getElementById("landmineCount");
const betInput = document.getElementById("betAmount");
const gridContainer = document.getElementById("gridContainer");
const message = document.getElementById("message");
const cashoutBtn = document.getElementById("cashout");

document.getElementById("startGame").onclick = () => {
  landmineCount = parseInt(landmineInput.value);
  betAmount = parseInt(betInput.value);
  if (betAmount > balance) {
    alert("Not enough balance");
    return;
  }

  balance -= betAmount;
  balanceEl.innerText = balance;
  profit = 0;
  profitEl.innerText = profit;
  landminePositions = new Set();
  clicked = new Set();
  safeClicks = 0;
  message.innerText = "";
  gameStarted = true;
  cashoutBtn.disabled = false;

  generateLandmines();
  drawGrid();
};

document.getElementById("cashout").onclick = () => {
  balance += profit;
  balanceEl.innerText = balance;
  message.innerText = `You cashed out ₹${profit}!`;
  gameStarted = false;
  cashoutBtn.disabled = true;
};

function generateLandmines() {
  while (landminePositions.size < landmineCount) {
    landminePositions.add(Math.floor(Math.random() * gridSize * gridSize));
  }
}

function drawGrid() {
  gridContainer.innerHTML = "";
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.onclick = () => cellClick(i, cell);
    gridContainer.appendChild(cell);
  }
}

function cellClick(index, cell) {
  if (!gameStarted || clicked.has(index)) return;

  clicked.add(index);
  if (landminePositions.has(index)) {
    cell.classList.add("mine");
    message.innerText = "💥 You hit a landmine! You lost!";
    profit = 0;
    profitEl.innerText = profit;
    gameStarted = false;
    cashoutBtn.disabled = true;
  } else {
    cell.classList.add("safe");
    safeClicks++;
    profit = Math.floor(betAmount * (1 + (safeClicks * landmineCount / 25)));
    profitEl.innerText = profit;
  }
}
