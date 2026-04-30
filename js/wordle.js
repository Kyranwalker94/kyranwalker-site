let words = [];
let currentWordIndex = 0;
let currentGuess = '';
let guesses = [];
const MAX_GUESSES = 6;
let score = 0;
let finalScore = 0;
let leaderboard = [];
let isRevealing = false;

const SCORE_PER_ROUND = [60, 50, 40, 30, 20, 10];

function scoreForAttempt(attempt) {
  return SCORE_PER_ROUND[attempt - 1] ?? 10;
}

function updateScoreDisplay() {
  document.getElementById('score-display').innerText = `Score: ${score}`;
}

document.addEventListener('DOMContentLoaded', () => {
  fetchLeaderboard();
  loadWords().then(() => {
    if (words.length > 0) {
      buildBoard();
      setupPhysicalKeyboard();
      setupModal();
      updateScoreDisplay();
    }
  });
});

// ── Words ──────────────────────────────────────────────────────────────────

async function loadWords() {
  try {
    const res = await fetch('/words.txt');
    const text = await res.text();
    words = text
      .split('\n')
      .map(w => w.trim().toUpperCase())
      .filter(w => w.length === 5 && /^[A-Z]+$/.test(w));
    if (words.length === 0) {
      console.error('No valid 5-letter words found in words.txt');
      return;
    }
    shuffle(words);
  } catch (err) {
    console.error('Failed to load words.txt:', err);
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ── Board ──────────────────────────────────────────────────────────────────

function buildBoard() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  guesses = [];
  currentGuess = '';
  isRevealing = false;

  document.querySelectorAll('.key').forEach(k =>
    k.classList.remove('correct', 'present', 'absent')
  );

  for (let r = 0; r < MAX_GUESSES; r++) {
    const row = document.createElement('div');
    row.className = 'board-row';
    for (let c = 0; c < 5; c++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      row.appendChild(tile);
    }
    board.appendChild(row);
  }
}

function getTile(row, col) {
  return document
    .getElementById('board')
    .children[row].children[col];
}

function refreshCurrentRow() {
  for (let i = 0; i < 5; i++) {
    const tile = getTile(guesses.length, i);
    tile.innerText = currentGuess[i] || '';
    tile.className = currentGuess[i] ? 'tile filled' : 'tile';
  }
}

// ── Input ──────────────────────────────────────────────────────────────────

function setupPhysicalKeyboard() {
  document.addEventListener('keydown', e => {
    if (!document.getElementById('wordle-modal').classList.contains('hidden')) return;
    if (isRevealing) return;

    if (e.key === 'Enter') {
      handleKey('ENTER');
    } else if (e.key === 'Backspace') {
      handleKey('BACK');
    } else if (/^[a-zA-Z]$/.test(e.key)) {
      handleKey(e.key.toUpperCase());
    }
  });

  document.querySelectorAll('.key').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isRevealing) return;
      const k = btn.dataset.key;
      handleKey(k);
    });
  });
}

function handleKey(key) {
  if (key === 'ENTER') {
    if (currentGuess.length === 5) submitGuess();
  } else if (key === 'BACK') {
    if (currentGuess.length > 0) {
      currentGuess = currentGuess.slice(0, -1);
      refreshCurrentRow();
    }
  } else if (currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
    currentGuess += key;
    refreshCurrentRow();
  }
}

// ── Guess logic ────────────────────────────────────────────────────────────

function submitGuess() {
  if (!words.includes(currentGuess)) {
    shakeRow(guesses.length);
    return;
  }

  const word = words[currentWordIndex];
  const results = evaluateGuess(currentGuess, word);

  isRevealing = true;
  revealRow(guesses.length, currentGuess, results, () => {
    updateKeys(currentGuess, results);
    guesses.push(currentGuess);
    currentGuess = '';
    isRevealing = false;

    if (results.every(r => r === 'correct')) {
      score += scoreForAttempt(guesses.length);
      updateScoreDisplay();
      setTimeout(() => showModal(true), 300);
    } else if (guesses.length === MAX_GUESSES) {
      setTimeout(() => showModal(false), 300);
    }
  });
}

function evaluateGuess(guess, word) {
  const results = Array(5).fill('absent');
  const remaining = {};

  for (const ch of word) {
    remaining[ch] = (remaining[ch] || 0) + 1;
  }

  // Correct pass
  for (let i = 0; i < 5; i++) {
    if (guess[i] === word[i]) {
      results[i] = 'correct';
      remaining[guess[i]]--;
    }
  }

  // Present pass
  for (let i = 0; i < 5; i++) {
    if (results[i] !== 'correct' && remaining[guess[i]] > 0) {
      results[i] = 'present';
      remaining[guess[i]]--;
    }
  }

  return results;
}

// ── Tile reveal animation ──────────────────────────────────────────────────

function revealRow(rowIndex, guess, results, onDone) {
  const TILE_DELAY = 300;

  for (let i = 0; i < 5; i++) {
    const tile = getTile(rowIndex, i);
    const result = results[i];
    const delay = i * TILE_DELAY;

    setTimeout(() => {
      // Flip down
      tile.style.transition = 'transform 0.18s ease-in';
      tile.style.transform = 'scaleY(0)';

      setTimeout(() => {
        // Apply colour at mid-flip
        tile.className = `tile ${result}`;
        tile.innerText = guess[i];
        // Flip back up
        tile.style.transition = 'transform 0.18s ease-out';
        tile.style.transform = 'scaleY(1)';

        setTimeout(() => {
          tile.style.transition = '';
          tile.style.transform = '';
          if (i === 4 && onDone) onDone();
        }, 180);
      }, 180);
    }, delay);
  }
}

// ── Keyboard colour tracking ───────────────────────────────────────────────

const KEY_PRIORITY = { correct: 3, present: 2, absent: 1 };

function updateKeys(guess, results) {
  for (let i = 0; i < 5; i++) {
    const letter = guess[i];
    const result = results[i];

    document.querySelectorAll('.key').forEach(btn => {
      if (btn.dataset.key !== letter) return;
      const cur = KEY_PRIORITY[
        btn.classList.contains('correct') ? 'correct' :
        btn.classList.contains('present') ? 'present' :
        btn.classList.contains('absent')  ? 'absent'  : ''
      ] ?? 0;
      if (KEY_PRIORITY[result] > cur) {
        btn.classList.remove('correct', 'present', 'absent');
        btn.classList.add(result);
      }
    });
  }
}

// ── Shake ──────────────────────────────────────────────────────────────────

function shakeRow(rowIndex) {
  const row = document.getElementById('board').children[rowIndex];
  row.classList.add('shake');
  row.addEventListener('animationend', () => row.classList.remove('shake'), { once: true });
}

// ── Modal ──────────────────────────────────────────────────────────────────

function setupModal() {
  document.getElementById('continue-btn').addEventListener('click', () => {
    document.getElementById('wordle-modal').classList.add('hidden');
    nextPuzzle();
  });

  document.getElementById('submit-score-btn').addEventListener('click', async () => {
    const input = document.getElementById('name-input');
    const name = input.value.trim().slice(0, 3) || 'AAA';
    input.value = '';
    document.getElementById('modal-name-section').classList.add('hidden');
    await postScore(name, finalScore);
  });
}

function showModal(won) {
  const modal = document.getElementById('wordle-modal');
  const message = document.getElementById('modal-message');
  const nameSection = document.getElementById('modal-name-section');

  if (won) {
    const pts = scoreForAttempt(guesses.length);
    message.innerText =
      `${guesses.length === 1 ? 'First try!' : `Got it in ${guesses.length}!`}\n+${pts} points · Total: ${score}`;
    nameSection.classList.add('hidden');
  } else {
    const word = words[currentWordIndex];
    finalScore = score;
    message.innerText = `The word was ${word}.\nFinal score: ${score}`;

    const qualifies =
      score > 0 &&
      (leaderboard.length < 10 ||
        score > leaderboard[leaderboard.length - 1].score);

    if (qualifies) {
      nameSection.classList.remove('hidden');
      document.getElementById('name-input').focus();
    } else {
      nameSection.classList.add('hidden');
    }

    score = 0;
    updateScoreDisplay();
  }

  modal.classList.remove('hidden');
}

// ── Leaderboard ────────────────────────────────────────────────────────────

const LEADERBOARD_URL = 'https://wordle-leaderboard.kyranwalker94.workers.dev';

async function fetchLeaderboard() {
  try {
    const res = await fetch(LEADERBOARD_URL);
    leaderboard = await res.json();
    renderLeaderboard();
  } catch (err) {
    console.error('Failed to load leaderboard:', err);
    leaderboard = [];
  }
}

async function postScore(name, scoreValue) {
  try {
    const res = await fetch(LEADERBOARD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, score: scoreValue }),
    });
    const data = await res.json();
    if (data.status === 'success') {
      leaderboard = data.leaderboard;
      renderLeaderboard();
    }
  } catch (err) {
    console.error('Failed to post score:', err);
  }
}

function renderLeaderboard() {
  const list = document.getElementById('leaderboard-list');
  list.innerHTML = '';

  if (!leaderboard.length) {
    const li = document.createElement('li');
    li.className = 'lb-empty';
    li.innerText = 'No scores yet — be first!';
    list.appendChild(li);
    return;
  }

  leaderboard.forEach(({ name, score: s }, i) => {
    const li = document.createElement('li');
    const nameSpan = document.createElement('span');
    nameSpan.className = 'lb-name';
    nameSpan.innerText = `${i + 1}. ${name}`;
    const scoreSpan = document.createElement('span');
    scoreSpan.className = 'lb-score';
    scoreSpan.innerText = s;
    li.append(nameSpan, scoreSpan);
    list.appendChild(li);
  });
}

// ── Next puzzle ────────────────────────────────────────────────────────────

function nextPuzzle() {
  currentWordIndex = (currentWordIndex + 1) % words.length;
  buildBoard();
}
