// ─────────────────────────────────────────────────────────────────────────────
//  LIFE TIMELINE DATA
//  Edit the arrays below to update what shows for each year.
//  Each entry needs a `start` and `end` year (inclusive).
//  Achievements use a single `year` instead of a range.
// ─────────────────────────────────────────────────────────────────────────────

const BIRTH_YEAR = 1994;

const TIMELINE = {

  living: [
    {
      start: 1994, end: 2006,
      location: 'East Sussex, UK',
      detail: 'Born and raised in East Sussex.',
    },
    {
      start: 2007, end: 2012,
      location: 'Abu Dhabi, UAE 🇦🇪',
      detail: 'Moved abroad with family — attending Raha International School in the UAE.',
    },
    {
      start: 2012, end: 2015,
      location: 'Brighton, UK',
      detail: 'University life on the south coast.',
    },
    {
      start: 2015, end: 2016,
      location: 'Eastbourne, UK',
      detail: '',
    },
    {
      start: 2017, end: 2018,
      location: 'Auckland, New Zealand 🇳🇿',
      detail: 'Working holiday — one of the best decisions I ever made.',
    },
    {
      start: 2018, end: 2019,
      location: 'Eastbourne, UK',
      detail: '',
    },
    {
      start: 2020, end: 2026,
      location: 'Hailsham, East Sussex',
      detail: 'Settled back in East Sussex.',
    },
  ],

  working: [
    {
      start: 2015, end: 2016,
      company: 'Eastbourne Motoring Centre',
      role: 'Sales & Purchase Ledger Clerk',
      location: 'Eastbourne',
    },
    {
      start: 2017, end: 2018,
      company: 'Wynter Recruitment',
      role: 'Associate Recruitment Partner',
      location: 'Auckland, NZ',
    },
    {
      start: 2018, end: 2019,
      company: 'Plummer Parsons',
      role: 'Junior Accountant',
      location: 'Eastbourne',
    },
    {
      start: 2020, end: 2021,
      company: 'Mockford Blinds',
      role: 'Bookkeeper & Business Partner',
      location: 'Eastbourne',
    },
    {
      start: 2021, end: 2024,
      company: 'Openreach',
      role: 'Apprentice → Advanced FTTP Engineer',
      location: 'Milton Keynes',
    },
    {
      start: 2025, end: 2025,
      company: 'Openreach',
      role: 'Data Analysis Project Lead',
      location: 'Milton Keynes',
    },
  ],

  learning: [
    {
      start: 2007, end: 2012,
      institution: 'Raha International School',
      qualification: 'International Baccalaureate',
      location: 'Abu Dhabi',
    },
    {
      start: 2012, end: 2015,
      institution: 'University of Brighton',
      qualification: 'BSc (Hons) Accounting & Finance',
      location: 'Brighton',
    },
    {
      start: 2018, end: 2020,
      institution: 'ICAEW',
      qualification: 'ACA Professional Qualification (3 exams passed)',
      location: 'UK',
    },
    {
      start: 2021, end: 2023,
      institution: 'Openreach / BT Group',
      qualification: 'NVQ Level 3 Telecoms Operative',
      location: 'UK',
    },
  ],

  // Point-in-time events — use a single `year` field
  achievements: [
    {
      year: 1994,
      title: 'Born 🎉',
      detail: 'First day on the planet.',
    },
    {
      year: 2012,
      title: 'IB Diploma',
      detail: 'Completed the International Baccalaureate at Raha International School, Abu Dhabi.',
    },
    {
      year: 2015,
      title: 'BSc 2:1 Accounting & Finance',
      detail: 'Graduated from the University of Brighton with a 2:1 Honours degree.',
    },
    {
      year: 2021,
      title: '£70k in sales 📈',
      detail: 'Designed and launched the Mockford Blinds website, contributing to £70,000 in sales within nine months.',
    },
    {
      year: 2024,
      title: 'Advanced FTTP Engineer',
      detail: 'Progressed through the full Openreach apprenticeship pathway to Advanced Engineer status.',
    },
    {
      year: 2025,
      title: 'Data & Process Lead',
      detail: 'Moved into a data analysis and process improvement role at Openreach, building internal tooling and reporting pipelines.',
    },
  ],

  // Projects — shown for the year range they were active
  projects: [
    {
      start: 2019, end: 2020,
      title: 'Pokémon Snap',
      emoji: '⚡',
      detail: '2-player Scratch game built for Harvard\'s CS50 — match your Pokémon, first to 10 wins.',
      link: 'pokemon-snap.html',
    },
    {
      start: 2020, end: 2020,
      title: 'Lockdown Quiz',
      emoji: '🎯',
      detail: 'A Scratch quiz game with specialist categories, score tracking, and Twitch streaming support.',
      link: 'lockdown-quiz.html',
    },
    {
      start: 2020, end: 2021,
      title: 'Mockford Blinds',
      emoji: '🪟',
      detail: 'Built and launched a full business website with Google and Facebook Ads campaigns.',
      link: 'mockford-blinds.html',
    },
    {
      start: 2021, end: 2022,
      title: 'Wordle',
      emoji: '🟩',
      detail: 'Fully playable Wordle clone with score tracking and a live leaderboard.',
      link: 'wordle.html',
    },
    {
      start: 2022, end: 2022,
      title: 'Salsalator',
      emoji: '🌶️',
      detail: 'A salsa recipe calculator that scales ingredient quantities for any crowd size.',
      link: 'salsalator.html',
    },
    {
      start: 2022, end: 2023,
      title: 'Sovereign Harbour',
      emoji: '🏗️',
      detail: '3D modelling and animation of Eastbourne\'s Sovereign Harbour in SketchUp and Blender.',
      link: 'sovereign-harbour.html',
    },
    {
      start: 2022, end: 2023,
      title: 'Shepherds Way',
      emoji: '🏠',
      detail: '3D modelled house animation showing different ground floor renovation options.',
      link: 'shepherds-way.html',
    },
    {
      start: 2023, end: 2023,
      title: 'Cabinet 3D',
      emoji: '🗄️',
      detail: 'An interactive 3D cabinet viewer running directly in the browser.',
      link: 'cabinet.html',
    },
    {
      start: 2024, end: 2026,
      title: 'Land Rover Defender',
      emoji: '🚙',
      detail: 'Restoring a 2008 Defender 110 into a camper and expedition vehicle.',
      link: 'defender.html',
    },
    {
      start: 2025, end: 2026,
      title: 'kyranwalker.com Rebuild',
      emoji: '💻',
      detail: 'Full rebuild of this portfolio site from WordPress to a clean static site with Cloudflare.',
      link: '../index.html',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function inRange(entries, year) {
  return entries.filter(e => year >= e.start && year <= e.end);
}

function inYear(entries, year) {
  return entries.filter(e => e.year === year);
}

// ─────────────────────────────────────────────────────────────────────────────
//  RENDERERS
// ─────────────────────────────────────────────────────────────────────────────

function renderLiving(entries) {
  if (!entries.length) return null;
  const e = entries[0];
  return `
    <div class="tl-row"><span class="tl-row-icon">📍</span><span>${e.location}</span></div>
    ${e.detail ? `<p class="tl-detail">${e.detail}</p>` : ''}
  `;
}

function renderWorking(entries) {
  if (!entries.length) return null;
  return `<div class="tl-multi">${entries.map(e => `
    <div class="tl-multi-item">
      <div class="tl-row"><span class="tl-row-icon">🏢</span><strong>${e.company}</strong></div>
      <div class="tl-row"><span class="tl-row-icon">💼</span><span>${e.role}</span></div>
      <div class="tl-row"><span class="tl-row-icon">📍</span><span>${e.location}</span></div>
    </div>
  `).join('')}</div>`;
}

function renderLearning(entries) {
  if (!entries.length) return null;
  return `<div class="tl-multi">${entries.map(e => `
    <div class="tl-multi-item">
      <div class="tl-row"><span class="tl-row-icon">🎓</span><strong>${e.institution}</strong></div>
      <div class="tl-row"><span class="tl-row-icon">📜</span><span>${e.qualification}</span></div>
      <div class="tl-row"><span class="tl-row-icon">📍</span><span>${e.location}</span></div>
    </div>
  `).join('')}</div>`;
}

function renderAchievements(entries) {
  if (!entries.length) return null;
  return `<div class="tl-multi">${entries.map(e => `
    <div class="tl-multi-item">
      <div class="tl-row"><span class="tl-row-icon">⭐</span><strong>${e.title}</strong></div>
      ${e.detail ? `<p class="tl-detail">${e.detail}</p>` : ''}
    </div>
  `).join('')}</div>`;
}

function renderProjects(entries) {
  if (!entries.length) return null;
  return `<div class="tl-multi">${entries.map(e => `
    <div class="tl-multi-item">
      <div class="tl-row"><span class="tl-row-icon">${e.emoji}</span><strong>${e.title}</strong></div>
      ${e.detail ? `<p class="tl-detail">${e.detail}</p>` : ''}
      ${e.link ? `<a href="${e.link}" class="tl-project-link">View project</a>` : ''}
    </div>
  `).join('')}</div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  UPDATE
// ─────────────────────────────────────────────────────────────────────────────

function setBox(id, html) {
  const box     = document.getElementById(id);
  const content = document.getElementById(id + '-content');
  if (!html) {
    box.classList.add('hidden');
  } else {
    box.classList.remove('hidden');
    // Re-trigger entrance animation
    box.style.animation = 'none';
    box.offsetHeight; // force reflow
    box.style.animation = '';
    content.innerHTML = html;
  }
}

function updateGrid(year) {
  const living       = inRange(TIMELINE.living,       year);
  const working      = inRange(TIMELINE.working,      year);
  const learning     = inRange(TIMELINE.learning,     year);
  const achievements = inYear( TIMELINE.achievements, year);
  const projects     = inRange(TIMELINE.projects,     year);

  setBox('tl-living',       renderLiving(living));
  setBox('tl-working',      renderWorking(working));
  setBox('tl-learning',     renderLearning(learning));
  setBox('tl-achievements', renderAchievements(achievements));
  setBox('tl-projects',     renderProjects(projects));

  const anyVisible = living.length || working.length || learning.length
                   || achievements.length || projects.length;
  document.getElementById('tl-empty').classList.toggle('visible', !anyVisible);
}

function updateTrack(slider) {
  const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background =
    `linear-gradient(to right, var(--accent) ${pct}%, var(--border) ${pct}%)`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('tl-slider');
  const yearEl = document.getElementById('tl-year');
  const ageEl  = document.getElementById('tl-age');

  function update() {
    const year = parseInt(slider.value, 10);
    yearEl.textContent = year;
    ageEl.textContent  = year === BIRTH_YEAR ? 'Born' : `Age ${year - BIRTH_YEAR}`;
    updateTrack(slider);
    updateGrid(year);
  }

  slider.addEventListener('input', update);
  update();
});
