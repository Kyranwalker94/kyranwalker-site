// ── Config ────────────────────────────────────────────────────────────────

const CLUES = { easy: 40, medium: 32, hard: 26, expert: 22 };

// ── State ─────────────────────────────────────────────────────────────────

let grid     = [];    // 81 × { value, solution, given, notes: Set, error }
let selected = -1;
let notesMode   = false;
let timerSecs   = 0;
let timerInterval = null;
let isWon       = false;

// ── Boot ──────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('new-game-btn').addEventListener('click', newGame);

  document.getElementById('notes-btn').addEventListener('click', () => {
    notesMode = !notesMode;
    const btn = document.getElementById('notes-btn');
    btn.textContent = notesMode ? '✏️ Notes: On' : '✏️ Notes: Off';
    btn.classList.toggle('active', notesMode);
  });

  document.getElementById('sudoku-erase-btn').addEventListener('click', () => fillCell(0));

  document.querySelectorAll('.sudoku-num-btn').forEach(btn =>
    btn.addEventListener('click', () => fillCell(parseInt(btn.dataset.num)))
  );

  document.getElementById('sudoku-play-again-btn').addEventListener('click', () => {
    document.getElementById('sudoku-modal').classList.add('hidden');
    newGame();
  });

  document.addEventListener('keydown', keyHandler);

  newGame();
});

// ── Game lifecycle ─────────────────────────────────────────────────────────

function newGame() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerSecs  = 0;
  isWon      = false;
  selected   = -1;
  notesMode  = false;

  document.getElementById('sudoku-timer').textContent = '0:00';
  document.getElementById('notes-btn').textContent    = '✏️ Notes: Off';
  document.getElementById('notes-btn').classList.remove('active');
  document.getElementById('sudoku-modal').classList.add('hidden');

  const diff             = document.getElementById('difficulty-select').value;
  const { puzzle, solution } = generatePuzzle(diff);
  buildGrid(puzzle, solution);
  renderBoard();
}

// ── Puzzle generation ─────────────────────────────────────────────────────

function generatePuzzle(diff) {
  const solution = generateComplete();
  const puzzle   = [...solution];

  const positions = shuffle([...Array(81).keys()]);
  const toRemove  = 81 - CLUES[diff];
  positions.slice(0, toRemove).forEach(p => { puzzle[p] = 0; });

  return { puzzle, solution };
}

function generateComplete() {
  const g = Array(81).fill(0);
  fillGrid(g);
  return g;
}

function fillGrid(g) {
  const empty = g.indexOf(0);
  if (empty === -1) return true;

  const nums = shuffle([1,2,3,4,5,6,7,8,9]);
  for (const n of nums) {
    if (canPlace(g, empty, n)) {
      g[empty] = n;
      if (fillGrid(g)) return true;
      g[empty] = 0;
    }
  }
  return false;
}

function canPlace(g, pos, num) {
  const r = Math.floor(pos / 9);
  const c = pos % 9;
  const br = Math.floor(r / 3) * 3;
  const bc = Math.floor(c / 3) * 3;

  for (let i = 0; i < 9; i++) {
    if (g[r * 9 + i] === num) return false;
    if (g[i * 9 + c] === num) return false;
  }
  for (let dr = 0; dr < 3; dr++)
    for (let dc = 0; dc < 3; dc++)
      if (g[(br + dr) * 9 + bc + dc] === num) return false;

  return true;
}

// ── Grid state ─────────────────────────────────────────────────────────────

function buildGrid(puzzle, solution) {
  grid = puzzle.map((val, i) => ({
    value:    val,
    solution: solution[i],
    given:    val !== 0,
    notes:    new Set(),
    error:    false,
  }));
}

// ── Rendering ─────────────────────────────────────────────────────────────

function renderBoard() {
  const board = document.getElementById('sudoku-board');
  board.innerHTML = '';

  grid.forEach((cell, i) => {
    const r  = Math.floor(i / 9);
    const c  = i % 9;
    const el = document.createElement('div');
    el.className    = 'sudoku-cell';
    el.dataset.idx  = i;
    if (cell.given) el.classList.add('given');
    if (r === 2 || r === 5) el.classList.add('box-bottom');
    if (c === 2 || c === 5) el.classList.add('box-right');
    el.addEventListener('click', () => selectCell(i));
    paintCell(el, cell);
    board.appendChild(el);
  });
}

function paintCell(el, cell) {
  el.innerHTML = '';
  el.classList.remove('error', 'filled');

  if (cell.value !== 0) {
    el.textContent = cell.value;
    if (!cell.given) el.classList.add('filled');
    if (cell.error)  el.classList.add('error');
  } else if (cell.notes.size > 0) {
    const wrap = document.createElement('div');
    wrap.className = 'sudoku-notes';
    for (let n = 1; n <= 9; n++) {
      const nd = document.createElement('div');
      nd.className   = 'sudoku-note';
      nd.textContent = cell.notes.has(n) ? n : '';
      wrap.appendChild(nd);
    }
    el.appendChild(wrap);
  }
}

function refreshCell(i) {
  const el = document.querySelector(`.sudoku-cell[data-idx="${i}"]`);
  if (el) paintCell(el, grid[i]);
}

// ── Selection & highlighting ──────────────────────────────────────────────

function selectCell(i) {
  selected = i;
  highlight();
}

function highlight() {
  const cells = document.querySelectorAll('.sudoku-cell');
  if (selected === -1) {
    cells.forEach(el => el.classList.remove('selected','related','same-digit'));
    return;
  }

  const sr  = Math.floor(selected / 9);
  const sc  = selected % 9;
  const sbr = Math.floor(sr / 3) * 3;
  const sbc = Math.floor(sc / 3) * 3;
  const sv  = grid[selected].value;

  cells.forEach((el, i) => {
    const r  = Math.floor(i / 9);
    const c  = i % 9;
    const br = Math.floor(r / 3) * 3;
    const bc = Math.floor(c / 3) * 3;

    el.classList.remove('selected','related','same-digit');

    if (i === selected) {
      el.classList.add('selected');
    } else if (r === sr || c === sc || (br === sbr && bc === sbc)) {
      el.classList.add('related');
    }

    if (sv && grid[i].value === sv) el.classList.add('same-digit');
  });
}

// ── Input ─────────────────────────────────────────────────────────────────

function fillCell(num) {
  if (selected === -1 || grid[selected].given || isWon) return;
  const cell = grid[selected];

  if (num === 0) {
    cell.value = 0;
    cell.notes.clear();
    cell.error = false;
  } else if (notesMode && cell.value === 0) {
    cell.notes.has(num) ? cell.notes.delete(num) : cell.notes.add(num);
  } else {
    if (!timerInterval) startTimer();
    cell.value = num;
    cell.notes.clear();
    cell.error = num !== cell.solution;
    checkWin();
  }

  refreshCell(selected);
  highlight();
}

function keyHandler(e) {
  if (!document.getElementById('sudoku-modal').classList.contains('hidden')) return;

  if (e.key >= '1' && e.key <= '9') { e.preventDefault(); fillCell(parseInt(e.key)); }
  else if (e.key === '0' || e.key === 'Backspace' || e.key === 'Delete') fillCell(0);
  else if (e.key.toLowerCase() === 'n') document.getElementById('notes-btn').click();
  else if (e.key === 'ArrowUp'    && selected >= 9)  selectCell(selected - 9);
  else if (e.key === 'ArrowDown'  && selected <= 71) selectCell(selected + 9);
  else if (e.key === 'ArrowLeft'  && selected % 9 > 0) selectCell(selected - 1);
  else if (e.key === 'ArrowRight' && selected % 9 < 8) selectCell(selected + 1);
}

// ── Win detection ─────────────────────────────────────────────────────────

function checkWin() {
  if (grid.every(c => c.value !== 0 && !c.error)) {
    isWon = true;
    clearInterval(timerInterval);
    timerInterval = null;
    setTimeout(showWin, 300);
  }
}

function showWin() {
  document.getElementById('sudoku-modal-message').textContent =
    `Solved in ${fmtTime(timerSecs)}! 🎉`;
  document.getElementById('sudoku-modal').classList.remove('hidden');
}

// ── Timer ─────────────────────────────────────────────────────────────────

function startTimer() {
  timerSecs = 0;
  timerInterval = setInterval(() => {
    timerSecs++;
    document.getElementById('sudoku-timer').textContent = fmtTime(timerSecs);
  }, 1000);
}

function fmtTime(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

// ── Helpers ───────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
