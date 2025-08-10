const offresScript = document.getElementById("offres-data");
const offresData = offresScript ? JSON.parse(offresScript.textContent) : [];
window.offresData = offresData; // si tu veux le garder global

/**Système de filtrage pour le comparateur de prix */

document.addEventListener('DOMContentLoaded', function () {
    // Vérifier qu'on est bien sur la page comparateur
    if (!document.getElementById('filtersContainer')) {
        return;
    }

    // Récupérer toutes les offres (données initiales)
    const toutesLesOffres = window.offresData || [];
    let offresFiltered = [...toutesLesOffres];

    // Éléments du DOM
    const elements = {
        transporteurSelect: document.getElementById('transporteurSelect'),
        sortBySelect: document.getElementById('sortBySelect'),
        resetBtn: document.getElementById('resetFilters'),
        shareBtn: document.getElementById('shareFilters'),
        resultCount: document.getElementById('resultCount'),
        resultsList: document.querySelector('.results')
    };

    // Vérifier que les éléments essentiels sont présents
    const requiredElements = ['transporteurSelect', 'sortBySelect', 'resultsList'];
    const missingElements = requiredElements.filter(key => !elements[key]);
    if (missingElements.length > 0) {
        console.error('Éléments manquants:', missingElements);
        return;
    }

    function appliquerFiltres() {
        let offres = [...toutesLesOffres];

        // Filtre par transporteur
        const transporteur = elements.transporteurSelect.value;
        if (transporteur) {
            offres = offres.filter(offre => offre.transporteur === transporteur);
        }

        // Tri
        const sortBy = elements.sortBySelect.value;
        offres.sort((a, b) => {
            switch (sortBy) {
                case 'prix-asc':
                    return parseFloat(a.prix_ttc) - parseFloat(b.prix_ttc);
                case 'prix-desc':
                    return parseFloat(b.prix_ttc) - parseFloat(a.prix_ttc);
                case 'delai-asc':
                    return parseInt(a.temps_livraison_jours) - parseInt(b.temps_livraison_jours);
                case 'delai-desc':
                    return parseInt(b.temps_livraison_jours) - parseInt(a.temps_livraison_jours);
                default:
                    return 0;
            }
        });

        offresFiltered = offres;
        mettreAJourAffichage();
        mettreAJourURL();
    }

    function mettreAJourAffichage() {
        // Met à jour le nombre de résultats si tu as un compteur
        if (elements.resultCount) {
            elements.resultCount.textContent = offresFiltered.length;
        }

        // Vide la liste des résultats
        elements.resultsList.innerHTML = '';

        // Ajoute les offres filtrées
        if (offresFiltered.length === 0) {
            afficherMessageAucunResultat();
            return;
        }

        offresFiltered.forEach((offre, index) => {
            const offreElement = creerElementOffre(offre, index);
            elements.resultsList.appendChild(offreElement);
        });

        // Ré-attache les listeners pour l'animation de redirection
        if (window.attachRedirectionListeners) {
            window.attachRedirectionListeners();
        }
    }

    function creerElementOffre(offre, index) {
        // Structure Bootstrap .result-card > .row > .col
        const card = document.createElement('div');
        card.className = 'result-card mb-3';

        const row = document.createElement('div');
        row.className = 'row align-items-center';

        // Transporteur/logo
        const colLogo = document.createElement('div');
        colLogo.className = 'col text-center transporteur-col';
        const img = document.createElement('img');
        img.src = offre.logo || '/images/default-logo.png';
        img.alt = offre.transporteur;
        img.className = 'transporteur-logo';
        colLogo.appendChild(img);

        // Délai
        const colDelai = document.createElement('div');
        colDelai.className = 'col text-center delai-col';
        const spanDelai = document.createElement('span');
        spanDelai.className = 'value-highlight';
        spanDelai.textContent = offre.temps_livraison_jours;
        colDelai.appendChild(spanDelai);
        const spanUnit = document.createElement('span');
        spanUnit.className = 'value-unit';
        spanUnit.textContent = 'jours';
        colDelai.appendChild(spanUnit);

        // Prix
        const colPrix = document.createElement('div');
        colPrix.className = 'col text-center prix-col';
        const spanPrix = document.createElement('span');
        spanPrix.className = 'prix-value';
        spanPrix.textContent = offre.prix_ttc;
        colPrix.appendChild(spanPrix);
        const spanCurrency = document.createElement('span');
        spanCurrency.className = 'prix-currency';
        spanCurrency.textContent = '€';
        colPrix.appendChild(spanCurrency);

        // Livraison estimée
        const colLivraison = document.createElement('div');
        colLivraison.className = 'col text-center livraison-col';
        const spanLivraison = document.createElement('span');
        spanLivraison.className = 'livraison-date';
        spanLivraison.textContent = offre.livraison_estimee || 'Date inconnue';
        colLivraison.appendChild(spanLivraison);

        // Actions
        const colAction = document.createElement('div');
        colAction.className = 'col text-center action-col';
        const aSite = document.createElement('button');
        aSite.type = 'button';  
        aSite.className = 'btn btn-action-primary reserve-btn mb-2'; // <-- ajoute reserve-btn
        aSite.setAttribute('data-url', offre.site_url || 'https://www.boxtal.com/fr/fr/tarifs-expedition');       // <-- ajoute data-url
        aSite.setAttribute('title', 'Ce lien ouvre le site du transporteur dans un nouvel onglet');
        aSite.innerHTML = '<i class="fa-solid fa-external-link-alt me-1"></i>Réserver';
        colAction.appendChild(aSite);

        const btnDetails = document.createElement('button');
        btnDetails.className = 'btn btn-action-secondary';
        btnDetails.type = 'button';
        btnDetails.setAttribute('data-bs-toggle', 'collapse');
        btnDetails.setAttribute('data-bs-target', `#collapse-offre-${index}`);
        btnDetails.innerHTML = '<i class="fa-solid fa-info-circle me-1"></i>Détails';
        colAction.appendChild(btnDetails);

        // Ajout des colonnes à la ligne
        row.appendChild(colLogo);
        row.appendChild(colDelai);
        row.appendChild(colPrix);
        row.appendChild(colLivraison);
        row.appendChild(colAction);

        card.appendChild(row);

        // Détails (collapse)
        const collapse = document.createElement('div');
        collapse.className = 'collapse result-details';
        collapse.id = `collapse-offre-${index}`;

        const detailsContent = document.createElement('div');
        detailsContent.className = 'details-content';

        // Informations
        const infoSection = document.createElement('div');
        infoSection.className = 'detail-section mb-2';
        infoSection.innerHTML = `
            <h6 class="detail-section-title">
                <i class="fa-solid fa-info-circle me-2"></i>Informations
            </h6>
            <div class="detail-item">
                <span class="detail-label">Transporteur :</span>
                <span class="detail-value">${offre.transporteur}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Service :</span>
                <span class="detail-value">${offre.service || ''}</span>
            </div>
        `;
        detailsContent.appendChild(infoSection);

        // Caractéristiques
        if (offre.characteristics_labels && offre.characteristics_labels.length) {
            const caracSection = document.createElement('div');
            caracSection.className = 'detail-section';
            caracSection.innerHTML = `
                <h6 class="detail-section-title">
                    <i class="fa-solid fa-list-check me-2"></i>Services inclus
                </h6>
                <div class="characteristics-grid">
                    ${offre.characteristics_labels.map(label =>
                        `<div class="characteristic-item">
                            <i class="fa-solid fa-check characteristic-check"></i>
                            <span>${label}</span>
                        </div>`
                    ).join('')}
                </div>
            `;
            detailsContent.appendChild(caracSection);
        }

        collapse.appendChild(detailsContent);
        card.appendChild(collapse);

        return card;
    }

    function afficherMessageAucunResultat() {
        const noResultElement = document.createElement('div');
        noResultElement.className = 'result-card text-center py-5';

        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-search fa-3x text-muted mb-3';
        noResultElement.appendChild(icon);

        const h5 = document.createElement('h5');
        h5.className = 'text-muted mb-2';
        h5.textContent = 'Aucune offre trouvée';
        noResultElement.appendChild(h5);

        const p = document.createElement('p');
        p.className = 'text-muted mb-3';
        p.textContent = 'Aucune offre ne correspond à vos critères de recherche.';
        noResultElement.appendChild(p);

        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-primary';
        btn.innerHTML = '<i class="fa-solid fa-rotate-left me-1"></i>Réinitialiser les filtres';
        btn.onclick = function () {
            elements.resetBtn.click();
        };
        noResultElement.appendChild(btn);

        elements.resultsList.appendChild(noResultElement);
    }

    function mettreAJourURL() {
        const urlParams = new URLSearchParams(window.location.search);

        if (elements.transporteurSelect.value) {
            urlParams.set('transporteur', elements.transporteurSelect.value);
        } else {
            urlParams.delete('transporteur');
        }
        if (elements.sortBySelect.value !== 'prix-asc') {
            urlParams.set('sortBy', elements.sortBySelect.value);
        } else {
            urlParams.delete('sortBy');
        }

        const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
        window.history.replaceState({}, '', newUrl);
    }

    function initialiserDepuisURL() {
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.get('transporteur')) {
            elements.transporteurSelect.value = urlParams.get('transporteur');
        }
        if (urlParams.get('sortBy')) {
            elements.sortBySelect.value = urlParams.get('sortBy');
        }
    }

    // Event listeners
    elements.transporteurSelect.addEventListener('change', appliquerFiltres);
    elements.sortBySelect.addEventListener('change', appliquerFiltres);

    elements.resetBtn.addEventListener('click', function () {
        elements.transporteurSelect.value = '';
        elements.sortBySelect.value = 'prix-asc';
        appliquerFiltres();
    });

    elements.shareBtn.addEventListener('click', function () {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href)
                .then(() => {
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fa-solid fa-check me-1"></i>Copié !';
                    this.classList.add('btn-success');
                    this.classList.remove('btn-outline-info');
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.classList.remove('btn-success');
                        this.classList.add('btn-outline-info');
                    }, 2000);
                })
                .catch(() => {
                    alert('Impossible de copier le lien automatiquement');
                });
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = window.location.href;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Lien copié !');
        }
    });

    // Initialisation
    initialiserDepuisURL();
    appliquerFiltres();
});