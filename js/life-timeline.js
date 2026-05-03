// ─────────────────────────────────────────────────────────────────────────────
//  LIFE TIMELINE DATA
//  Edit the arrays below to update what shows for each year.
//  Ranged entries need `start` and `end` (inclusive).
//  Point-in-time entries (achievements, travel) use a single `year`.
// ─────────────────────────────────────────────────────────────────────────────

const BIRTH_YEAR = 1994;

const TIMELINE = {

  living: [
    {
      start: 1994, end: 1998,
      location: 'Uckfield, East Sussex',
      detail: 'Born and raised in Uckfield — a picturesque market town in East Sussex, known for its historic buildings and close-knit community.',
    },
    {
      start: 1999, end: 2005,
      location: 'Towyn, Wales',
      detail: 'Moved to the coastal town of Towyn (Kinmel Bay) in North Wales — a charming seaside community with beautiful coastal views.',
    },
    {
      start: 2006, end: 2011,
      location: 'Abu Dhabi, UAE 🇦🇪',
      detail: 'Moved abroad with family to Abu Dhabi — the capital of the United Arab Emirates, known for its modern architecture and vibrant international community.',
    },
    {
      start: 2012, end: 2016,
      location: 'Eastbourne, East Sussex',
      detail: 'Based in Eastbourne during university and early career years — a popular seaside town with a beautiful coastline.',
    },
    {
      start: 2017, end: 2018,
      location: 'Round the World + Auckland, New Zealand 🇳🇿',
      detail: 'An 18-month round the world trip. Started with three months volunteering at a big cat reserve in South Africa, two weeks in Ecuador and Peru including the Salkantay trek, three months in the USA from Vegas to Key West, then nine months living and working in Auckland, New Zealand. One of the best decisions I ever made.',
    },
    {
      start: 2019, end: 2020,
      location: 'Eastbourne, East Sussex',
      detail: '',
    },
    {
      start: 2021, end: 2023,
      location: 'Milton Keynes, England',
      detail: 'Relocated to Milton Keynes for the Openreach role — a modern city with a strong emphasis on technology and innovation.',
    },
    {
      start: 2024, end: 2024,
      location: 'Roxton, Bedfordshire',
      detail: 'A quaint village with a rich history, providing a peaceful rural setting with a close-knit community feel.',
    },
    {
      start: 2025, end: 2026,
      location: 'Hailsham, East Sussex',
      detail: 'Settled back in East Sussex.',
    },
  ],

  // Annual travel
  travel: [
    { year: 1994, destination: 'Turkey' },
    {
      year: 1995,
      destination: 'France',
      detail: 'Camping trip to the south of France with family.',
    },
    { year: 1996, destination: 'Spain' },
    {
      year: 1997,
      destination: 'France',
      detail: 'Camping trip to the south of France with family.',
    },
    { year: 1998, destination: 'Spain' },
    {
      year: 2000,
      destination: 'Majorca, Spain',
      detail: 'All-inclusive family holiday - kids club, swimming, and a shopping trip in Palma.',
    },
    {
      year: 2002,
      destination: 'Minorca, Spain',
      detail: 'All-inclusive family holiday - kids clubs and long days by the pool.',
    },
    {
      year: 2003,
      destination: 'Tunisia',
      detail: 'All-inclusive trip with family and friends - lots of swimming and kids clubs.',
    },
    {
      year: 2005,
      destination: 'Poland',
      detail: 'Trip with my grandmother to visit cousins - Warsaw, Lublin, and Pulawy.',
    },
    {
      year: 2006,
      destination: 'France',
      detail: 'Trip to Paris with family.',
    },
    {
      year: 2007,
      destination: 'Poland',
      detail: 'Trip with my grandmother to visit cousins - Krakow.',
    },
    {
      year: 2007,
      destination: 'Qatar',
      detail: 'Football tournament for Raha International School.',
    },
    {
      year: 2008,
      destination: 'Switzerland',
      detail: 'Snowboarding school trip to Verbier.',
    },
    {
      year: 2009,
      destination: 'Canada',
      detail: 'Trip to Toronto and the Lakes with Cole, best friend from school in Abu Dhabi.',
    },
    {
      year: 2009,
      destination: 'France',
      detail: 'School trip to Paris - Cole and Amira were both on the same trip.',
    },
    {
      year: 2010,
      destination: 'Nepal',
      detail: 'School trip to Kathmandu, a flight over Everest, and three days hiking in the Himalayas.',
    },
    {
      year: 2009,
      destination: 'Romania',
      detail: 'New Year in Romania visiting family - Bucharest and Transylvania in winter. Visited Bran Castle.',
    },
    {
      year: 2011,
      destination: 'USA',
      detail: 'Global Young Leaders Conference - New York, Washington, and Philadelphia. Debated in the United Nations HQ building in New York.',
    },
    {
      year: 2011,
      destination: 'France',
      detail: 'Trip to Lion-sur-Mer, Normandy - staying in a cottage near the beach.',
    },
    {
      year: 2013,
      destination: 'France',
      detail: 'Trip to Montpellier and Magalas in the south of France.',
    },
    {
      year: 2012,
      destination: 'Thailand',
      detail: 'Post-graduation trip with Cole - Koh Samui and the Full Moon Party on Koh Phangan.',
    },
    {
      year: 2017,
      destination: 'South Africa, South America, USA, New Zealand 🌍',
      detail: 'Round the world: three months volunteering at a big cat reserve in South Africa, two weeks in Ecuador and Peru (Salkantay trail, condors, markets, cuy), three months in the USA (Vegas, Wyoming wilderness survival, road trip to Key West, Venice Beach), then nine months living in Auckland, New Zealand.',
    },
    {
      year: 2024,
      destination: 'Devon, UK',
      detail: 'Short trip to Devon - stayed in an Eco Lodge. Less travel this year to keep the Defender fund topped up.',
    },
    {
      year: 2023,
      destination: 'Greece',
      detail: 'Trip to Crete with Cole - five days staying in Chania.',
    },
    {
      year: 2025,
      destination: 'Europe 🇪🇺',
      detail: 'Month-long road trip through France, Belgium, the Netherlands, Germany, and Luxembourg in the rebuilt Defender - Amiens, Tournai, Brussels, Middelburg, Vlissingen, Colmar, Konstanz, Munich, Bamberg, Venlo, Luxembourg, and Reims.',
    },
    {
      year: 2026,
      destination: 'New Zealand 🇳🇿',
      detail: 'Flew to New Zealand in March 2026 to get married - full circle from the working holiday in 2017.',
    },
  ],

  working: [
    {
      start: 2015, end: 2016,
      company: 'Eastbourne Motoring Centre',
      role: 'Sales & Purchase Ledger Clerk',
      location: 'Eastbourne',
      detail: 'Processed high-volume invoices, banking, and supplier payments across a multi-dealership group. Prepared accruals, prepayments journals, and ad hoc management reports for the MD.',
    },
    {
      start: 2017, end: 2018,
      company: 'Wynter Recruitment',
      role: 'Associate Recruitment Partner',
      location: 'Auckland, NZ',
      detail: 'Helped establish the Accountancy & Finance desk for a 100% NZ-owned recruitment business. Reviewed CVs, interviewed candidates, and built client relationships across the region.',
    },
    {
      start: 2018, end: 2019,
      company: 'Plummer Parsons',
      role: 'Junior Accountant',
      location: 'Eastbourne',
      detail: 'Compiled statutory accounts for SMEs, conducted company audits (stock-takes, ledger tests, client visits), and managed VAT & Corporation Tax returns for a portfolio of clients across three offices.',
    },
    {
      start: 2020, end: 2020,
      company: 'Mockford Blinds',
      role: 'Bookkeeper & Business Partner',
      location: 'Eastbourne',
      detail: 'Took over all operations during COVID — manufacturing and fitting blinds, managing finances in Xero, building the company website, and running Google & Facebook Ads. Generated £70k in sales over nine months.',
    },
    {
      start: 2021, end: 2021,
      company: 'Openreach',
      role: 'Apprentice FTTP Engineer',
      location: 'Milton Keynes',
      detail: 'Installed fibre-to-the-premises connections at customer properties, ensuring installations met the highest safety and quality standards. Often covered for the Tails Lead, taking on additional leadership responsibilities.',
    },
    {
      start: 2022, end: 2024,
      company: 'Openreach',
      role: 'Advanced FTTP Engineer',
      location: 'Milton Keynes',
      detail: 'Progressed to Advanced Engineer and Patch Lead — coordinating regional FTTP deployments, managing team operations, and developing data tools to improve efficiency and resource allocation.',
    },
    {
      start: 2025, end: 2025,
      company: 'Openreach',
      role: 'Data Analysis Project Lead',
      location: 'Milton Keynes',
      detail: 'Developed internal reporting tools and data processes to optimise FTTP deployment. Managed delayed order administration and coordinated across teams to streamline workflows.',
    },
    {
      start: 2025, end: 2026,
      company: 'Self-Employed',
      role: 'Freelance Bookkeeper & Multi-Service Contractor',
      location: 'Hailsham / Remote',
      detail: 'Remote bookkeeping and self assessment support for individuals and small businesses, alongside a multi-service sole trader offering covering tech, home services, and web design.',
    },
  ],

  learning: [
    {
      start: 1997, end: 1997,
      institution: 'Manor Nursery',
      qualification: 'UK Early Years',
      location: 'Uckfield',
      detail: '',
    },
    {
      start: 1998, end: 1998,
      institution: 'Manor Infants',
      qualification: 'UK Early Years',
      location: 'Uckfield',
      detail: '',
    },
    {
      start: 1999, end: 2000,
      institution: 'Towyn Infants',
      qualification: 'UK Primary',
      location: 'Towyn, Wales',
      detail: '',
    },
    {
      start: 2001, end: 2004,
      institution: 'Towyn Primary',
      qualification: 'UK Primary',
      location: 'Towyn, Wales',
      detail: '',
    },
    {
      start: 2005, end: 2005,
      institution: 'Emrys Ap Iwan',
      qualification: 'UK Secondary',
      location: 'Abergele, Wales',
      detail: '',
    },
    {
      start: 2006, end: 2006,
      institution: 'The Cambridge High School',
      qualification: 'UK Secondary',
      location: 'Abu Dhabi',
      detail: '',
    },
    {
      start: 2007, end: 2009,
      institution: 'Raha International School',
      qualification: 'IB Middle Years Programme (MYP)',
      location: 'Abu Dhabi',
      detail: 'An international school with a focus on global perspectives, academic excellence, and personal development.',
    },
    {
      start: 2010, end: 2012,
      institution: 'Raha International School',
      qualification: 'IB Diploma',
      location: 'Abu Dhabi',
      detail: '',
    },
    {
      start: 2012, end: 2015,
      institution: 'University of Brighton',
      qualification: 'BSc (Hons) Accounting & Finance — 2:1',
      location: 'Brighton',
      detail: '',
    },
    {
      start: 2015, end: 2016,
      institution: 'ACCA',
      qualification: 'ACCA Professional Qualification',
      location: 'UK',
      detail: '',
    },
    {
      start: 2018, end: 2019,
      institution: 'ICAEW',
      qualification: 'ACA Professional Qualification (3 exams)',
      location: 'UK',
      detail: '',
    },
    {
      start: 2020, end: 2020,
      institution: 'Harvard / edX',
      qualification: 'CS50: Introduction to Computer Science',
      location: 'Online',
      detail: 'Harvard\'s renowned introduction to computer science — covering algorithms, data structures, web development, and more.',
    },
    {
      start: 2021, end: 2023,
      institution: 'Openreach / BT Group',
      qualification: 'NVQ Level 3 Telecoms Operative',
      location: 'UK',
      detail: '',
    },
    {
      start: 2022, end: 2022,
      institution: 'edX',
      qualification: '3D Design & CAD',
      location: 'Online',
      detail: '',
    },
    {
      start: 2023, end: 2023,
      institution: 'Harvard / edX',
      qualification: 'CS50 SQL',
      location: 'Online',
      detail: '',
    },
    {
      start: 2024, end: 2024,
      institution: 'edX',
      qualification: 'SOLIDWORKS CAD Fundamentals',
      location: 'Online',
      detail: 'Sketching, extruded features, assemblies, exploded views, and detailed engineering drawings.',
    },
  ],

  // Point-in-time achievements — use `year`, not a range
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
      title: 'BSc 2:1 — Accounting & Finance',
      detail: 'Graduated from the University of Brighton with a 2:1 Honours degree.',
    },
    {
      year: 2018,
      title: 'Round the World Complete 🌍',
      detail: '18 months done: big cat volunteering in South Africa, Salkantay trail in Peru, road trip from Wyoming to Key West, and nine months living and working in Auckland, New Zealand.',
    },
    {
      year: 2020,
      title: 'CS50 Completed',
      detail: 'Finished Harvard\'s CS50 on edX — the course that kicked off serious programming projects.',
    },
    {
      year: 2021,
      title: '£70k in sales 📈',
      detail: 'Designed and launched the Mockford Blinds website, contributing to £70,000 in sales within nine months.',
    },
    {
      year: 2024,
      title: 'Advanced FTTP Engineer',
      detail: 'Completed the full Openreach apprenticeship pathway and qualified as an Advanced FTTP Engineer.',
    },
    {
      year: 2025,
      title: 'Data & Process Lead',
      detail: 'Transitioned into a data analysis and process improvement role at Openreach, building internal tooling and reporting pipelines.',
    },
    {
      year: 2026,
      title: 'Married in New Zealand 💍',
      detail: 'Got married in New Zealand in March 2026 — the destination that has always meant something special, from the working holiday in 2017 to the European road trip in November 2025 that set the scene.',
    },
  ],

  // Projects — shown across the year range they were active
  projects: [
    {
      start: 2014, end: 2014,
      title: 'Samantha (Smart Home)',
      emoji: '🤖',
      detail: 'Voice-controlled personal assistant using VoxCommando, EventGhost, and IFTTT. Controlled lights, plugs, entertainment systems, and my PC using Scarlett Johansson voice clips from Her.',
      link: 'smart-home.html',
    },
    {
      start: 2017, end: 2018,
      title: 'Round the World 2017',
      emoji: '🌍',
      detail: '18-month trip: South Africa (big cat volunteering), Salkantay trail in Peru, USA road trip Wyoming to Key West, and nine months living in Auckland, New Zealand.',
      link: 'round-the-world-2017.html',
    },
    {
      start: 2020, end: 2020,
      title: 'Pokémon Snap',
      emoji: '⚡',
      detail: '2-player Scratch game built for Harvard\'s CS50 — match your Pokémon, first to 10 wins.',
      link: 'pokemon-snap.html',
    },
    {
      start: 2020, end: 2020,
      title: 'Lockdown Quiz',
      emoji: '🎯',
      detail: 'A Scratch quiz game with specialist categories, score tracking, and Twitch streaming support — built during lockdown.',
      link: 'lockdown-quiz.html',
    },
    {
      start: 2020, end: 2021,
      title: 'Mockford Blinds',
      emoji: '🪟',
      detail: 'Built and launched a full business website with Google and Facebook Ads campaign management.',
      link: 'mockford-blinds.html',
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
      start: 2022, end: 2023,
      title: 'Cabinet 3D',
      emoji: '🗄️',
      detail: 'An interactive 3D cabinet viewer running directly in the browser.',
      link: 'cabinet.html',
    },
    {
      start: 2023, end: 2023,
      title: 'Scratchmap',
      emoji: '🗺️',
      detail: 'Two digital world maps showing countries visited by Kyran and Amira, built to update as we go.',
      link: 'scratchmap.html',
    },
    {
      start: 2023, end: 2023,
      title: 'Spirit Level Template',
      emoji: '📐',
      detail: '3D printed drilling template for Openreach — pre-spaced guide holes and an integrated spirit level bubble.',
      link: 'spirit-level-template.html',
    },
    {
      start: 2024, end: 2024,
      title: 'Wordle',
      emoji: '🟩',
      detail: 'Fully playable Wordle clone with score tracking and a live leaderboard.',
      link: 'wordle.html',
    },
    {
      start: 2024, end: 2024,
      title: 'Sudoku',
      emoji: '🔢',
      detail: 'Fully playable Sudoku with four difficulty levels, pencil notes, conflict highlighting, and a timer.',
      link: 'sudoku.html',
    },
    {
      start: 2024, end: 2024,
      title: 'General Knowledge Quiz',
      emoji: '🧠',
      detail: 'Endless multiple-choice quiz with streak tracking and a leaderboard.',
      link: 'quiz.html',
    },
    {
      start: 2024, end: 2024,
      title: '3D Printer Customisation',
      emoji: '🖨️',
      detail: 'Upgraded two Creality Ender 3 V2 printers with silent fans, BLTouch levelling, and custom printed parts.',
      link: '3d-printer.html',
    },
    {
      start: 2024, end: 2025,
      title: 'Land Rover Defender',
      emoji: '🚙',
      detail: 'Restored a 2008 Defender 110 into a camper and expedition vehicle — completed October 2025.',
      link: 'defender.html',
    },
    {
      start: 2025, end: 2025,
      title: 'The Trip 2025',
      emoji: '🗺️',
      detail: 'Month-long European road trip in the Defender — twelve cities, six countries, Christmas markets, and a proposal.',
      link: 'the-trip-2025.html',
    },
    {
      start: 2025, end: 2026,
      title: 'Salsalator',
      emoji: '🌶️',
      detail: 'A salsa recipe calculator that scales ingredient quantities for any crowd size.',
      link: 'salsalator.html',
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

function renderLiving(livingEntries) {
  if (!livingEntries.length) return null;
  const e = livingEntries[0];
  return `
    <div class="tl-row"><span class="tl-row-icon">📍</span><span>${e.location}</span></div>
    ${e.detail ? `<p class="tl-detail">${e.detail}</p>` : ''}
  `;
}

function renderTravel(travelEntries) {
  if (!travelEntries.length) return null;
  return `<div class="tl-multi">${travelEntries.map(t => `
    <div class="tl-multi-item">
      <div class="tl-row"><span class="tl-row-icon">✈️</span><span>${t.destination}</span></div>
      ${t.detail ? `<p class="tl-detail">${t.detail}</p>` : ''}
    </div>
  `).join('')}</div>`;
}

function renderWorking(entries) {
  if (!entries.length) return null;
  return `<div class="tl-multi">${entries.map(e => `
    <div class="tl-multi-item">
      <div class="tl-row"><span class="tl-row-icon">🏢</span><strong>${e.company}</strong></div>
      <div class="tl-row"><span class="tl-row-icon">💼</span><span>${e.role}</span></div>
      <div class="tl-row"><span class="tl-row-icon">📍</span><span>${e.location}</span></div>
      ${e.detail ? `<p class="tl-detail">${e.detail}</p>` : ''}
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
      ${e.detail ? `<p class="tl-detail">${e.detail}</p>` : ''}
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
    box.style.animation = 'none';
    box.offsetHeight; // force reflow to re-trigger animation
    box.style.animation = '';
    content.innerHTML = html;
  }
}

function updateGrid(year) {
  const living       = inRange(TIMELINE.living,       year);
  const travel       = inYear( TIMELINE.travel,       year);
  const working      = inRange(TIMELINE.working,      year);
  const learning     = inRange(TIMELINE.learning,     year);
  const achievements = inYear( TIMELINE.achievements, year);
  const projects     = inRange(TIMELINE.projects,     year);

  setBox('tl-living',       renderLiving(living));
  setBox('tl-travel',       renderTravel(travel));
  setBox('tl-working',      renderWorking(working));
  setBox('tl-learning',     renderLearning(learning));
  setBox('tl-achievements', renderAchievements(achievements));
  setBox('tl-projects',     renderProjects(projects));

  const anyVisible = living.length || travel.length || working.length || learning.length
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
