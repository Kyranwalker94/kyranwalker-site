// ─────────────────────────────
//  RECIPES
//  Ratios define the *proportion* of each ingredient within a salsa.
//  The total salsa per person is controlled by TOTAL_GRAMS_PER_PERSON.
//  All weights are relative — they get scaled to fill the allocated share.
// ─────────────────────────────

const TOTAL_GRAMS_PER_PERSON = 200; // total salsa across ALL selected salsas

const SALSA_RECIPES = {
  pico: {
    name: "Pico de Gallo",
    ingredients: {
      tomatoes:  { ratio: 100, unit: "g" },
      onion:     { ratio: 30,  unit: "g" },
      lime:      { ratio: 15,  unit: "lime" },
      coriander: { ratio: 5,   unit: "g" },
      chilli:    { ratio: 2,   unit: "g", spicy: true },
    }
  },

  guac: {
    name: "Guacamole",
    ingredients: {
      avocado:   { ratio: 120, unit: "avocado" },
      lime:      { ratio: 15,  unit: "lime" },
      onion:     { ratio: 20,  unit: "g" },
      coriander: { ratio: 5,   unit: "g" },
      chilli:    { ratio: 2,   unit: "g", spicy: true },
    }
  },

  pineapple: {
    name: "Pineapple Salsa",
    ingredients: {
      pineapple: { ratio: 80,  unit: "g" },
      onion:     { ratio: 20,  unit: "g" },
      lime:      { ratio: 15,  unit: "lime" },
      coriander: { ratio: 5,   unit: "g" },
      chilli:    { ratio: 2,   unit: "g", spicy: true },
    }
  }
};

// ─────────────────────────────
//  FORMAT HELPERS
// ─────────────────────────────

function formatAmount(amount, unit) {
  if (unit === "lime") {
    const limes = Math.ceil(amount / 30);
    return `${Math.max(1, limes)} ${limes === 1 ? "lime" : "limes"}`;
  }

  if (unit === "avocado") {
    const avocados = Math.ceil(amount / 120);
    return `${Math.max(1, avocados)} ${avocados === 1 ? "avocado" : "avocados"}`;
  }

  if (unit === "g") {
    // Round to nearest 5g to avoid ugly numbers
    return `${Math.round(amount / 5) * 5}g`;
  }

  return `${Math.round(amount)}`;
}

// ─────────────────────────────
//  CORE CALCULATION
//
//  Total salsa budget = TOTAL_GRAMS_PER_PERSON × portionSize × people
//  That budget is split EQUALLY between however many salsas are selected.
//  So 1 salsa = 200g each, 2 salsas = 100g each, 3 salsas = 67g each.
//  Each salsa's ingredients are then proportionally scaled to its share.
// ─────────────────────────────

function calculateIngredients({ people, portionSize, selectedSalsas, includeCoriander, spiceLevels }) {
  if (!people || people < 1 || selectedSalsas.length === 0) return {};

  const totalBudget  = TOTAL_GRAMS_PER_PERSON * portionSize * people;
  const sharePerSalsa = totalBudget / selectedSalsas.length;

  const results = {};

  selectedSalsas.forEach(key => {
    const salsa = SALSA_RECIPES[key];
    if (!salsa) return;

    // Sum the ratios of included ingredients to use as the scaling denominator
    const totalRatio = Object.entries(salsa.ingredients)
      .filter(([item]) => !(item === "coriander" && !includeCoriander))
      .reduce((sum, [, def]) => sum + def.ratio, 0);

    const spiceMultiplier = spiceLevels[key] ?? 1;
    const ingredients = {};

    for (const [item, def] of Object.entries(salsa.ingredients)) {
      if (item === "coriander" && !includeCoriander) continue;

      // Scale proportionally within this salsa's allocated share
      let amount = (def.ratio / totalRatio) * sharePerSalsa;

      // Spice just affects chilli quantity — doesn't change total salsa weight
      if (def.spicy) amount *= spiceMultiplier;

      ingredients[item] = { amount, unit: def.unit };
    }

    results[salsa.name] = ingredients;
  });

  return results;
}

// ─────────────────────────────
//  RENDER RESULTS
// ─────────────────────────────

function renderResults(result) {
  const empty   = document.getElementById("resultsEmpty");
  const content = document.getElementById("resultsContent");
  if (!content) return;

  if (Object.keys(result).length === 0) {
    empty.style.display = "block";
    empty.textContent = "Select at least one salsa above.";
    content.innerHTML = "";
    return;
  }

  empty.style.display = "none";
  content.innerHTML = "";

  for (const [salsaName, ingredients] of Object.entries(result)) {
    const block = document.createElement("div");
    block.className = "salsa-result";

    const title = document.createElement("div");
    title.className = "salsa-result-name";
    title.textContent = salsaName;
    block.appendChild(title);

    for (const [item, { amount, unit }] of Object.entries(ingredients)) {
      const row = document.createElement("div");
      row.className = "ingredient-row";
      row.innerHTML = `
        <span class="ingredient-name">${item}</span>
        <span class="ingredient-amount">${formatAmount(amount, unit)}</span>
      `;
      block.appendChild(row);
    }

    content.appendChild(block);
  }
}

// ─────────────────────────────
//  READ INPUTS & RUN
// ─────────────────────────────

function runCalculator() {
  const people      = Number(document.getElementById("people").value);
  const portionSize = Number(document.getElementById("portion").value);

  const selectedSalsas = Array.from(
    document.querySelectorAll(".salsa-checkbox:checked")
  ).map(el => el.value);

  const includeCoriander = document.getElementById("coriander").checked;

  const spiceLevels = {};
  document.querySelectorAll(".spice-slider").forEach(slider => {
    spiceLevels[slider.dataset.salsa] = Number(slider.value);
  });

  ["pico", "guac", "pineapple"].forEach(key => {
    if (!(key in spiceLevels)) spiceLevels[key] = 1;
  });

  const result = calculateIngredients({
    people,
    portionSize,
    selectedSalsas,
    includeCoriander,
    spiceLevels
  });

  renderResults(result);
}

// ─────────────────────────────
//  AUTO-RECALCULATE ON ANY CHANGE
// ─────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("change", runCalculator);
    el.addEventListener("input",  runCalculator);
  });

  runCalculator();
});
