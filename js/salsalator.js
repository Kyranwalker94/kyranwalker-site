const SALSA_RECIPES = {
  pico: {
    name: "Pico de Gallo",
    ingredients: {
      tomatoes: 100,
      onion: 30,
      lime: 0.5,
      coriander: 5,
      chilli: 2
    }
  },

  guac: {
    name: "Guacamole",
    ingredients: {
      avocado: 1,
      lime: 0.5,
      onion: 20,
      coriander: 5,
      chilli: 2
    }
  },

  pineapple: {
    name: "Pineapple Salsa",
    ingredients: {
      pineapple: 80,
      onion: 20,
      lime: 0.5,
      coriander: 5,
      chilli: 2
    }
  }
};

function calculateIngredients({ people, portionSize, selectedSalsas, includeCoriander, spiceLevels }) {
  const results = {};

  selectedSalsas.forEach(key => {
    const salsa = SALSA_RECIPES[key];
    const scale = people * portionSize;

    const ingredients = {};

    for (let [item, amount] of Object.entries(salsa.ingredients)) {

      if (item === "coriander" && !includeCoriander) continue;

      let finalAmount = amount * scale;

      if (item === "chilli") {
        finalAmount *= spiceLevels[key] || 1;
      }

      ingredients[item] = finalAmount;
    }

    results[salsa.name] = ingredients;
  });

  return results;
}

function runCalculator() {
  const people = Number(document.getElementById("people").value);
  const portionSize = Number(document.getElementById("portion").value);

  const selectedSalsas = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map(el => el.value)
   .filter(v => v !== "coriander");

  const includeCoriander = document.getElementById("coriander").checked;

  const spiceLevels = {
    pico: 1,
    guac: 1,
    pineapple: 1
  };

  const result = calculateIngredients({
    people,
    portionSize,
    selectedSalsas,
    includeCoriander,
    spiceLevels
  });

  document.getElementById("output").textContent =
    JSON.stringify(result, null, 2);
}