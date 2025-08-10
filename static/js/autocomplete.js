// Fonction de nettoyage et comparaison (issue de test3.js)
function normalize(str) {
  return (str || '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/['’`´]/g, '')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim().toLowerCase();
}

// Validation robuste (issue de test3.js)
function isValidQuery(str) {
  const query = str.trim();
  return query.length >= 2 && (/[a-zA-Z]{2,}/.test(query) || /\d{2,}/.test(query));
}

// ✅ Déclare la fonction en haut niveau, accessible partout
function setupAutocomplete(inputId, resultsId, countrySelectorId = null) {
  const input = document.getElementById(inputId);
  const results = document.getElementById(resultsId);
  const countrySelector = countrySelectorId ? document.getElementById(countrySelectorId) : null;

  if (!input || !results) {
    console.warn(`autocomplete.js : éléments #${inputId} ou #${resultsId} non trouvés`);
    return;
  }

  let debounceTimer;
  let focusedItemIndex = -1;

  function resetDisplay() {
    results.innerHTML = '';
    focusedItemIndex = -1;
  }

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const query = input.value.trim();
    if (!isValidQuery(query)) {
      resetDisplay();
      return;
    }

    debounceTimer = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);
  });

  input.addEventListener('keydown', function (e) {
    const items = results.getElementsByTagName('li');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusedItemIndex = (focusedItemIndex + 1) % items.length;
      setActive(items, focusedItemIndex);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusedItemIndex = (focusedItemIndex - 1 + items.length) % items.length;
      setActive(items, focusedItemIndex);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedItemIndex > -1 && items[focusedItemIndex]) {
        items[focusedItemIndex].click();
        focusedItemIndex = -1;
      }
    }
  });

  async function fetchSuggestions(query) {
    resetDisplay();

    const country = countrySelector ? (countrySelector.value || 'FR') : 'FR';

    try {
      const res = await fetch(`/api/autocomplete?query=${encodeURIComponent(query)}&country=${encodeURIComponent(country)}`);
      const data = await res.json();

      if (data && Array.isArray(data)) {
        // Optionnel : filtrage supplémentaire côté client avec normalize
        const normQuery = normalize(query);
        const filtered = data.filter(item => {
          const normPlace = normalize(item.name);
          const normPostal = normalize(item.postal || '');
          // On accepte si la ville OU le code postal contient la requête
          return normPlace.includes(normQuery) || normPostal.includes(normQuery);
        });

        // On affiche les résultats filtrés (ou tous si aucun filtré)
        (filtered.length ? filtered : data).slice(0, 5).forEach(item => {
          const li = document.createElement('li');
          li.textContent = `${item.name}, ${item.region}, ${item.postal}, ${item.country}`;
          li.classList.add('list-group-item', 'autocomplete-item');
          li.addEventListener('click', () => {
            input.value = `${item.name}, ${item.postal}, ${item.country}`;
            resetDisplay();
          });
          results.appendChild(li);
        });
      }
    } catch (err) {
      console.error('Erreur fetch autocomplete :', err);
    }
  }

  function setActive(items, index) {
    if (!items.length) return;
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('autocomplete-active');
    }
    items[index].classList.add('autocomplete-active');
    // Optionnel : met à jour le champ avec la valeur de l'élément actif
    input.value = items[index].textContent;
  }

  document.addEventListener('click', (e) => {
    if (e.target !== input) {
      resetDisplay();
    }
  });
}

// ✅ Quand le DOM est prêt, initialise les champs de base
document.addEventListener('DOMContentLoaded', () => {

  setupAutocomplete('ville-origine', 'results-origine');
  setupAutocomplete('ville-destination', 'results-destination', 'destination-avance');

  // 🔍 Observe l’ouverture de la modale
  const modale = document.getElementById('modaleModification');

  if (!modale) {
    return;
  }

  modale.addEventListener('shown.bs.modal', () => {

    // ✅ Initialise les champs DANS la modale
    setupAutocomplete('ville-origine-modal', 'results-origine-modal');
    setupAutocomplete('ville-destination-modal', 'results-destination-modal', 'destination-modal');
  });
});





