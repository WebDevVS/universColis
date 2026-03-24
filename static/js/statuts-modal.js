(function () {
  'use strict';

  const overlay = document.getElementById('decoderOverlay');
  const openBtn = document.getElementById('openDecoderModal');
  const closeBtn = document.getElementById('closeDecoderModal');
  const modalSearch = document.getElementById('modalSearch');
  const modalClear = document.getElementById('modalClear');
  const modalTabs = document.getElementById('modalTabs');
  const modalBody = document.getElementById('modalBody');

  if (!overlay || !openBtn) return;

  const PHASES = [
    { id: 'all', label: 'Tous', icon: 'fa-solid fa-box' },
    { id: 'avant', label: 'Avant envoi', icon: 'fa-solid fa-clock' },
    { id: 'transit', label: 'Transit', icon: 'fa-solid fa-truck' },
    { id: 'douane', label: 'Douane', icon: 'fa-solid fa-passport' },
    { id: 'livraison', label: 'Livraison', icon: 'fa-solid fa-house' },
    { id: 'probleme', label: 'Problèmes', icon: 'fa-solid fa-triangle-exclamation' },
  ];

  const URGENCE = {
    attendre: { label: 'Patienter', cls: 'pill-attendre', dot: '#16a34a', icon: 'fa-solid fa-check', color: '#16a34a' },
    verifier: { label: 'Vérifier', cls: 'pill-verifier', dot: '#2563eb', icon: 'fa-solid fa-circle-info', color: '#2563eb' },
    action: { label: 'À faire', cls: 'pill-action', dot: '#ea580c', icon: 'fa-solid fa-arrow-right', color: '#ea580c' },
    urgent: { label: 'Urgent', cls: 'pill-urgent', dot: '#dc2626', icon: 'fa-solid fa-circle-exclamation', color: '#dc2626' },
  };

  let statuts = [];
  let activePhase = 'all';
  let searchQ = '';
  let loaded = false;

  // ===== NORMALISATION =====
  function norm(str) {
    return (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[.,;:!?«»"'()\-]/g, '').trim();
  }

  // ===== CHARGEMENT DES STATUTS =====
  async function loadStatuts() {
    if (loaded) return;
    try {
      const res = await fetch('/suivi/statuts-colis/api');
      const data = await res.json();
      statuts = data;
      loaded = true;
      renderModal();
    } catch (e) {
      modalBody.innerHTML = '<p style="text-align:center;padding:20px;color:#999;font-size:0.85rem">Impossible de charger les statuts.</p>';
    }
  }

  // ===== MATCH =====
  function matchStatut(s, q) {
    if (!q) return true;
    return [s.fr, s.en, (s.tags || []).join(' '), s.explication, s.action]
      .some(f => norm(f).includes(q));
  }

  // ===== CARD HTML =====
  function cardHTML(s) {
    const u = URGENCE[s.urgence] || URGENCE.attendre;
    return `
      <div class="mcard" data-u="${s.urgence}" data-phase="${s.phase}" tabindex="0">
        <div class="mcard-top">
          <span class="mu-dot" style="background:${u.dot}"></span>
          <div class="mcard-labels">
            <div class="mcard-fr">${s.fr}</div>
            ${s.en ? `<div class="mcard-en">${s.en}</div>` : ''}
            ${s.transporteur ? `<span class="mcard-transporteur">${s.transporteur}</span>` : ''}
          </div>
          <span class="mpill ${u.cls}">${u.label}</span>
          <div class="mchevron"><i class="fa-solid fa-chevron-down"></i></div>
        </div>
        <div class="mcard-body">
          <p class="mexplication">${s.explication}</p>
          <div class="maction maction-${s.urgence}">
            <i class="${u.icon}" style="color:${u.color};flex-shrink:0;margin-top:2px;font-size:0.85rem"></i>
            <div class="maction-text"><strong>Que faire ?</strong> ${s.action}</div>
          </div>
        </div>
      </div>`;
  }

  // ===== RENDER =====
  function renderModal() {
    const q = norm(searchQ);
    const filtered = statuts.filter(s =>
      (activePhase === 'all' || s.phase === activePhase) && matchStatut(s, q)
    );

    if (!filtered.length) {
      modalBody.innerHTML = `
        <div style="text-align:center;padding:30px 20px;color:#999;font-size:0.85rem">
          <div style="font-size:1.8rem;margin-bottom:8px">🔍</div>
          Aucun statut trouvé.<br>Essayez d'autres mots-clés.
        </div>`;

      // Log les recherches sans résultat
      if (searchQ && typeof clarity === 'function') {
        clarity('event', 'statut_non_trouve', { query: searchQ });
      }


      buildModalTabs();
      return;
    }

    // Grouper par phase si pas de filtre actif
    if (activePhase === 'all' && !q) {
      modalBody.innerHTML = PHASES.filter(p => p.id !== 'all').map(p => {
        const items = filtered
          .filter(s => s.phase === p.id)
          .sort((a, b) => a.fr.localeCompare(b.fr, 'fr'));
        if (!items.length) return '';
        return `
          <div class="phase-section">
            <div class="phase-header" style="margin-top:16px">
              <span class="phase-label">
                <i class="${p.icon}"></i> ${p.label}
              </span>
              <span class="phase-count">${items.length}</span>
            </div>
            ${items.map(cardHTML).join('')}
          </div>`;
      }).join('');
    } else {
      modalBody.innerHTML = filtered
        .sort((a, b) => a.fr.localeCompare(b.fr, 'fr')) // ← AJOUTER
        .map(cardHTML).join('');
    }

    // Accordéon
    modalBody.querySelectorAll('.mcard').forEach(card => {
      card.addEventListener('click', () => {
        const wasOpen = card.classList.contains('open');
        modalBody.querySelectorAll('.mcard.open').forEach(c => c.classList.remove('open'));
        if (!wasOpen) card.classList.add('open');
      });
    });

    buildModalTabs();
  }

  // ===== ONGLETS =====
  function buildModalTabs() {
    const q = norm(searchQ);
    modalTabs.innerHTML = PHASES.map(p => {
      const isActive = activePhase === p.id;
      let countHtml = '';
      if (q) {
        const count = p.id === 'all'
          ? statuts.filter(s => matchStatut(s, q)).length
          : statuts.filter(s => s.phase === p.id && matchStatut(s, q)).length;
        countHtml = `<span class="decoder-tab-count">${count}</span>`;
      }
      return `<button class="decoder-modal-tab${isActive ? ' active' : ''}" data-phase="${p.id}">
        <i class="${p.icon}"></i> ${p.label}${countHtml}
      </button>`;
    }).join('');

    modalTabs.querySelectorAll('.decoder-modal-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activePhase = tab.dataset.phase;
        renderModal();
      });
    });
  }

  // ===== OPEN / CLOSE =====
  function openModal() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    loadStatuts();
    setTimeout(() => modalSearch?.focus(), 300);
  }

  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', () => {
    if (typeof clarity === 'function') {
      clarity('event', 'decoder_modal_opened');
    }
    openModal();
  });
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ===== RECHERCHE =====
  modalSearch.addEventListener('input', () => {
    searchQ = modalSearch.value;
    modalClear.classList.toggle('visible', !!searchQ);
    renderModal();
  });

  modalClear.addEventListener('click', () => {
    modalSearch.value = '';
    searchQ = '';
    modalClear.classList.remove('visible');
    modalSearch.focus();
    renderModal();
  });

})();