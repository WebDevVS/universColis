(function () {
    'use strict';

    // ===== ÉLÉMENTS DU DOM =====
    const searchInput = document.getElementById('decoderSearch');
    const clearBtn = document.getElementById('decoderClear');
    const tabsContainer = document.getElementById('decoderTabs');
    const metaEl = document.getElementById('decoderMeta');
    const cardsBody = document.querySelector('.decoder-cards');

    if (!searchInput || !cardsBody) return;

    const allCards = Array.from(document.querySelectorAll('.mcard'));

    // ===== ÉTAT =====
    let activePhase = 'all';
    let searchQ = '';

    // ===== CONFIG PHASES =====
    const PHASES = [
        { id: 'all', label: 'Tous', icon: 'fa-solid fa-box' },
        { id: 'avant', label: 'Avant envoi', icon: 'fa-solid fa-clock' },
        { id: 'transit', label: 'Transit', icon: 'fa-solid fa-truck' },
        { id: 'douane', label: 'Douane', icon: 'fa-solid fa-passport' },
        { id: 'livraison', label: 'Livraison', icon: 'fa-solid fa-house' },
        { id: 'probleme', label: 'Problèmes', icon: 'fa-solid fa-triangle-exclamation' },
    ];

    // ===== NORMALISATION (accents + casse) =====
    function norm(str) {
        return (str || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[.,;:!?«»"'()\-]/g, '')
            .trim();
    }

    // ===== MATCH UNE CARD =====
    function matchCard(card, q) {
        if (!q) return true;
        const fields = [
            card.dataset.fr || '',
            card.dataset.en || '',
            card.dataset.tags || '',
            card.querySelector('.mexplication')?.textContent || '',
            card.querySelector('.maction-text')?.textContent || '',
        ];
        return fields.some(f => norm(f).includes(q));
    }

    // ===== FILTRAGE PRINCIPAL =====
    function filterCards() {
        const q = norm(searchQ);
        let visible = 0;

        buildTabs();

        allCards.forEach(card => {
            const phaseOk = activePhase === 'all' || card.dataset.phase === activePhase;
            const searchOk = matchCard(card, q);
            const show = phaseOk && searchOk;

            card.style.display = show ? '' : 'none';
            if (show) visible++;
        });

        // Masquer les sections de phase vides
        document.querySelectorAll('.phase-section').forEach(section => {
            const hasVisible = Array.from(section.querySelectorAll('.mcard'))
                .some(c => c.style.display !== 'none');
            section.style.display = hasVisible ? '' : 'none';
        });

        // Gérer l'empty state
        let emptyEl = document.getElementById('decoderEmpty');
        if (visible === 0) {
            if (!emptyEl) {
                emptyEl = document.createElement('div');
                emptyEl.id = 'decoderEmpty';
                emptyEl.className = 'decoder-empty';
                emptyEl.innerHTML = '<div class="decoder-empty-icon">🔍</div><p>Aucun statut ne correspond.<br>Essayez d\'autres mots-clés.</p>';
                cardsBody.querySelector('.container').appendChild(emptyEl);
            }
            emptyEl.style.display = '';

            // Log les recherches sans résultat
            if (q && typeof clarity === 'function') {
                clarity('event', 'statut_non_trouve', { query: searchQ });
            }

        } else if (emptyEl) {
            emptyEl.style.display = 'none';
        }

        // Meta résultats
        if (metaEl) {
            metaEl.textContent = q
                ? `${visible} résultat${visible > 1 ? 's' : ''} pour « ${searchQ} »`
                : '';
        }

        // Si la barre est sticky et qu'il y a une recherche, scroller vers les cards
        if (q && searchZone.classList.contains('is-sticky')) {
            const firstVisible = allCards.find(c => c.style.display !== 'none');
            if (firstVisible) {
                firstVisible.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        highlightCards(q);
    }

    function highlight(str, q) {
        if (!q || !str) return str;
        const safe = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Cherche sur le texte normalisé mais surligne le texte original
        const normStr = norm(str);
        const re = new RegExp(safe, 'gi');
        let result = '';
        let lastIndex = 0;
        let match;
        while ((match = re.exec(normStr)) !== null) {
            result += str.slice(lastIndex, match.index);
            result += `<mark>${str.slice(match.index, match.index + match[0].length)}</mark>`;
            lastIndex = match.index + match[0].length;
        }
        result += str.slice(lastIndex);
        return result;
    }

    function highlightCards(q) {
        allCards.forEach(card => {
            if (card.style.display === 'none') return;

            const frEl = card.querySelector('.mcard-fr');
            const enEl = card.querySelector('.mcard-en');
            const exEl = card.querySelector('.mexplication');

            if (!card._originalFr) {
                card._originalFr = frEl?.innerHTML || '';
                card._originalEn = enEl?.innerHTML || '';
                card._originalEx = exEl?.innerHTML || '';
            }

            if (q) {
                if (frEl) frEl.innerHTML = highlight(card._originalFr, q);
                if (enEl) enEl.innerHTML = highlight(card._originalEn, q);
                if (exEl) exEl.innerHTML = highlight(card._originalEx, q);
            } else {
                if (frEl) frEl.innerHTML = card._originalFr;
                if (enEl) enEl.innerHTML = card._originalEn;
                if (exEl) exEl.innerHTML = card._originalEx;
            }
        });
    }

    // ===== CONSTRUCTION DES ONGLETS =====
    function buildTabs() {
        if (!tabsContainer) return;

        const q = norm(searchQ);

        tabsContainer.innerHTML = PHASES.map(p => {
            const isActive = activePhase === p.id;

            // Compteur uniquement si recherche active
            let countHtml = '';
            if (q) {
                const count = p.id === 'all'
                    ? allCards.filter(c => matchCard(c, q)).length
                    : allCards.filter(c => c.dataset.phase === p.id && matchCard(c, q)).length;
                countHtml = `<span class="decoder-tab-count">${count}</span>`;
            }

            return `<button
      class="decoder-tab${isActive ? ' active' : ''}"
      data-phase="${p.id}"
      aria-pressed="${isActive}"
    ><i class="${p.icon}"></i> ${p.label}${countHtml}</button>`;
        }).join('');

        tabsContainer.querySelectorAll('.decoder-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                activePhase = tab.dataset.phase;
                buildTabs();
                filterCards();
            });
        });
    }

    // ===== ACCORDÉON =====
    cardsBody.addEventListener('click', e => {
        const card = e.target.closest('.mcard');
        if (!card) return;

        const wasOpen = card.classList.contains('open');

        // Fermer toutes les cards ouvertes
        allCards.forEach(c => c.classList.remove('open'));

        // Ouvrir celle cliquée si elle était fermée
        if (!wasOpen) {
            card.classList.add('open');
        }
    });

    // Accessibilité clavier
    cardsBody.addEventListener('keydown', e => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const card = e.target.closest('.mcard');
        if (!card) return;
        e.preventDefault();
        card.click();
    });

    // ===== RECHERCHE =====
    searchInput.addEventListener('input', () => {
        searchQ = searchInput.value;
        clearBtn.classList.toggle('visible', !!searchQ);
        filterCards();
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQ = '';
        clearBtn.classList.remove('visible');
        searchInput.focus();
        filterCards();
    });

    // ===== INIT =====
    buildTabs();
    filterCards();

    // ===== ACCORDÉON FAQ =====
    document.querySelectorAll('.decoder-faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const isOpen = btn.getAttribute('aria-expanded') === 'true';
            const answer = btn.nextElementSibling;

            // Fermer toutes les autres
            document.querySelectorAll('.decoder-faq-question').forEach(b => {
                b.setAttribute('aria-expanded', 'false');
                b.nextElementSibling.classList.remove('open');
            });

            // Ouvrir celle cliquée si elle était fermée
            if (!isOpen) {
                btn.setAttribute('aria-expanded', 'true');
                answer.classList.add('open');
            }
        });
    });

    // ===== STICKY SEARCH =====
    const searchZone = document.querySelector('.decoder-search-zone');
    const faqSection = document.querySelector('.decoder-faq');

    if (searchZone) {
        const searchOffset = searchZone.offsetTop;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const faqTop = faqSection ? faqSection.offsetTop - 100 : Infinity;

            if (scrollY > searchOffset && scrollY < faqTop) {
                searchZone.classList.add('is-sticky');
            } else {
                searchZone.classList.remove('is-sticky');
            }
        }, { passive: true });
    }

})();