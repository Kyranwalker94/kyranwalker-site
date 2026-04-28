// ─────────────────────────────
//  RECIPES
//  All amounts are per person at "normal" (1x) portion size
// ─────────────────────────────

const SALSA_RECIPES = {
  pico: {
    name: "Pico de Gallo",
    ingredients: {
      tomatoes:   { amount: 100, unit: "g" },
      onion:      { amount: 30,  unit: "g" },
      lime:       { amount: 0.5, unit: "lime" },
      coriander:  { amount: 5,   unit: "g" },
      chilli:     { amount: 2,   unit: "g", spicy: true },
    }
  },

  guac: {
    name: "Guacamole",
    ingredients: {
      avocado:    { amount: 0.5, unit: "avocado" },
      lime:       { amount: 0.5, unit: "lime" },
      onion:      { amount: 20,  unit: "g" },
      coriander:  { amount: 5,   unit: "g" },
      chilli:     { amount: 2,   unit: "g", spicy: true },
    }
  },

  pineapple: {
    name: "Pineapple Salsa",
    ingredients: {
      pineapple:  { amount: 80,  unit: "g" },
      onion:      { amount: 20,  unit: "g" },
      lime:       { amount: 0.5, unit: "lime" },
      coriander:  { amount: 5,   unit: "g" },
      chilli:     { amount: 2,   unit: "g", spicy: true },
    }
  }
};

// ─────────────────────────────
//  FORMAT HELPERS
// ─────────────────────────────

function formatAmount(amount, unit) {
  if (unit === "lime") {
    const rounded = Math.ceil(amount); // always round up — better to have spare limes
    return `${rounded} ${rounded === 1 ? "lime" : "limes"}`;
  }

  if (unit === "avocado") {
    const rounded = Math.ceil(amount);
    return `${rounded} ${rounded === 1 ? "avocado" : "avocados"}`;
  }

  if (unit === "g") {
    return `${Math.round(amount)}g`;
  }

  return `${amount}`;
}

// ─────────────────────────────
//  CORE CALCULATION
// ─────────────────────────────

function calculateIngredients({ people, portionSize, selectedSalsas, includeCoriander, spiceLevels }) {
  if (!people || people < 1) return {};

  const results = {};

  selectedSalsas.forEach(key => {
    const salsa = SALSA_RECIPES[key];
    if (!salsa) return;

    const scale = people * portionSize;
    const spiceMultiplier = spiceLevels[key] ?? 1;
    const ingredients = {};

    for (const [item, def] of Object.entries(salsa.ingredients)) {
      if (item === "coriander" && !includeCoriander) continue;

      let finalAmount = def.amount * scale;
      if (def.spicy) finalAmount *= spiceMultiplier;

      ingredients[item] = { amount: finalAmount, unit: def.unit };
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

  // Read per-salsa spice sliders if present
  const spiceLevels = {};
  document.querySelectorAll(".spice-slider").forEach(slider => {
    spiceLevels[slider.dataset.salsa] = Number(slider.value);
  });

  // Default to 1x if no slider exists
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
//  AUTO-RECALCULATE ON ANY INPUT CHANGE
// ─────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("change", runCalculator);
    el.addEventListener("input", runCalculator);
  });

  // Run once on load so results show immediately
  runCalculator();
});
