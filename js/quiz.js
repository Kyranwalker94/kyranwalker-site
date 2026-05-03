const QUIZ_LB_URL = 'https://wordle-leaderboard.kyranwalker94.workers.dev/quiz';
const TIMER_SECS  = 30;

let streak      = 0;
let questions   = [];
let qIndex      = 0;
let timeLeft    = TIMER_SECS;
let timerInterval = null;
let isAnswering = false;
let leaderboard = [];

// ── Boot ──────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  fetchLeaderboard();

  document.getElementById('new-game-btn').addEventListener('click', startGame);

  document.getElementById('quiz-play-again-btn').addEventListener('click', () => {
    document.getElementById('quiz-modal').classList.add('hidden');
    startGame();
  });

  document.getElementById('quiz-submit-btn').addEventListener('click', async () => {
    const input = document.getElementById('quiz-name-input');
    const name  = input.value.trim().slice(0, 3) || 'AAA';
    input.value = '';
    document.getElementById('quiz-name-section').classList.add('hidden');
    await postScore(name, streak);
  });

  // 1–4 keyboard shortcuts for answer buttons
  document.addEventListener('keydown', e => {
    if (document.getElementById('quiz-modal').classList.contains('hidden') === false) return;
    if (!['1','2','3','4'].includes(e.key)) return;
    const btns = document.querySelectorAll('.quiz-answer-btn');
    if (btns[parseInt(e.key) - 1]) btns[parseInt(e.key) - 1].click();
  });

  startGame();
});

// ── Game flow ─────────────────────────────────────────────────────────────

async function startGame() {
  streak = 0;
  questions = [];
  qIndex = 0;
  clearInterval(timerInterval);
  isAnswering = false;
  updateStreakDisplay();
  setTimerDisplay(TIMER_SECS, 100);

  showLoading();
  questions = await fetchQuestions();
  if (!questions.length) { showError(); return; }
  showQuestion();
}

async function fetchQuestions() {
  try {
    const cat  = document.getElementById('category-select').value;
    const diff = document.getElementById('difficulty-select').value;
    let url = 'https://opentdb.com/api.php?amount=10&type=multiple';
    if (cat  !== '0')   url += `&category=${cat}`;
    if (diff !== 'any') url += `&difficulty=${diff}`;
    const res  = await fetch(url);
    const data = await res.json();
    return data.results || [];
  } catch {
    return [];
  }
}

function showLoading() {
  document.getElementById('quiz-category').textContent = '';
  document.getElementById('quiz-question').textContent = 'Loading questions…';
  document.getElementById('quiz-answers').innerHTML = '';
}

function showError() {
  document.getElementById('quiz-question').textContent = 'Could not load questions — check your connection and try again.';
}

function showQuestion() {
  if (qIndex >= questions.length) {
    showLoading();
    fetchQuestions().then(qs => {
      if (qs.length) { questions = qs; qIndex = 0; showQuestion(); }
      else showError();
    });
    return;
  }

  isAnswering = false;
  const q       = questions[qIndex];
  const answers = shuffle([q.correct_answer, ...q.incorrect_answers]);

  document.getElementById('quiz-category').textContent = decode(q.category);
  document.getElementById('quiz-question').textContent = decode(q.question);

  const box = document.getElementById('quiz-answers');
  box.innerHTML = '';
  box.style.pointerEvents = '';
  answers.forEach(ans => {
    const btn = document.createElement('button');
    btn.className    = 'quiz-answer-btn';
    btn.textContent  = decode(ans);
    btn.dataset.ans  = ans;
    btn.addEventListener('click', () => handleAnswer(btn, q.correct_answer));
    box.appendChild(btn);
  });

  startTimer();
}

// ── Input ─────────────────────────────────────────────────────────────────

function handleAnswer(btn, correct) {
  if (isAnswering) return;
  isAnswering = true;
  clearInterval(timerInterval);

  lockAnswers();

  if (btn.dataset.ans === correct) {
    btn.classList.add('quiz-correct');
    streak++;
    updateStreakDisplay();
    setTimeout(() => {
      btn.classList.remove('quiz-correct');
      qIndex++;
      showQuestion();
    }, 700);
  } else {
    btn.classList.add('quiz-wrong');
    revealCorrect(correct);
    setTimeout(gameOver, 1600);
  }
}

function handleTimeout() {
  if (isAnswering) return;
  isAnswering = true;
  lockAnswers();
  // show correct without revealing which was chosen
  const q = questions[qIndex];
  revealCorrect(q.correct_answer);
  setTimeout(gameOver, 1600);
}

function lockAnswers() {
  document.getElementById('quiz-answers').style.pointerEvents = 'none';
}

function revealCorrect(correct) {
  document.querySelectorAll('.quiz-answer-btn').forEach(btn => {
    if (btn.dataset.ans === correct) btn.classList.add('quiz-correct');
  });
}

// ── Timer ─────────────────────────────────────────────────────────────────

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = TIMER_SECS;
  setTimerDisplay(TIMER_SECS, 100);

  timerInterval = setInterval(() => {
    timeLeft--;
    const pct = (timeLeft / TIMER_SECS) * 100;
    setTimerDisplay(timeLeft, pct);
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function setTimerDisplay(secs, pct) {
  document.getElementById('timer-num').textContent = secs;
  const fill = document.getElementById('timer-fill');
  fill.style.width = pct + '%';
  fill.style.background =
    secs > 15 ? 'var(--green)' :
    secs > 8  ? 'var(--yellow)' :
                'var(--red)';
}

// ── Modal ─────────────────────────────────────────────────────────────────

function gameOver() {
  const modal       = document.getElementById('quiz-modal');
  const msg         = document.getElementById('quiz-modal-message');
  const nameSection = document.getElementById('quiz-name-section');
  const finalStreak = streak;

  if (finalStreak === 0) {
    msg.textContent = 'Unlucky — no streak this time!';
    nameSection.classList.add('hidden');
  } else {
    const rating =
      finalStreak >= 30 ? '🔥 Legendary!' :
      finalStreak >= 20 ? '⭐ Outstanding!' :
      finalStreak >= 10 ? '💪 Impressive!' :
      finalStreak >= 5  ? 'Solid effort' : 'Good start';
    msg.textContent = `Streak: ${finalStreak}\n${rating}`;

    const qualifies =
      leaderboard.length < 10 ||
      finalStreak > leaderboard[leaderboard.length - 1].score;

    if (qualifies && finalStreak > 0) {
      nameSection.classList.remove('hidden');
      document.getElementById('quiz-name-input').focus();
    } else {
      nameSection.classList.add('hidden');
    }
  }

  streak = 0;
  modal.classList.remove('hidden');
}

// ── Streak ────────────────────────────────────────────────────────────────

function updateStreakDisplay() {
  document.getElementById('streak-num').textContent = streak;
}

// ── Leaderboard ───────────────────────────────────────────────────────────

async function fetchLeaderboard() {
  try {
    const res = await fetch(QUIZ_LB_URL);
    leaderboard = await res.json();
    renderLeaderboard();
  } catch {
    leaderboard = [];
  }
}

async function postScore(name, score) {
  try {
    const res  = await fetch(QUIZ_LB_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, score }),
    });
    const data = await res.json();
    if (data.status === 'success') {
      leaderboard = data.leaderboard;
      renderLeaderboard();
    }
  } catch { /* silent */ }
}

function renderLeaderboard() {
  const list = document.getElementById('quiz-leaderboard-list');
  list.innerHTML = '';
  if (!leaderboard.length) {
    const li = document.createElement('li');
    li.className   = 'lb-empty';
    li.textContent = 'No scores yet — be first!';
    list.appendChild(li);
    return;
  }
  leaderboard.forEach(({ name, score }, i) => {
    const li    = document.createElement('li');
    const nSpan = document.createElement('span');
    nSpan.className   = 'lb-name';
    nSpan.textContent = `${i + 1}. ${name}`;
    const sSpan = document.createElement('span');
    sSpan.className   = 'lb-score';
    sSpan.textContent = score;
    li.append(nSpan, sSpan);
    list.appendChild(li);
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────

function decode(str) {
  const txt   = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
