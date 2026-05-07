/* --- CONFIGURATION GLOBALE --- */
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initDarkMode();
    initRobloxStatus();
    initSettingsMenu();
});

/* --- GESTION DE LA NAVIGATION --- */
function initNavigation() {
    const navUl = document.querySelector('nav ul');
    if (!navUl) return;

    // 1. Ajouter l'onglet gestion si connecté
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const contactLi = navUl.lastElementChild;
        const gestionLi = document.createElement('li');
        gestionLi.innerHTML = '<a href="gestion.html" style="color: #e67e22; font-weight: bold;">GESTION</a>';
        navUl.insertBefore(gestionLi, contactLi);
    }

    // 2. Automatiser la classe .active (plus besoin de la mettre à la main dans le HTML)
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* --- MODE SOMBRE --- */
function initDarkMode() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

function initSettingsMenu() {
    document.addEventListener('click', (e) => {
        const btn = document.getElementById('settings-btn');
        const dropdown = document.getElementById('settings-dropdown');
        if (!btn || !dropdown) return;

        if (e.target.closest('#settings-btn')) {
            e.preventDefault(); // Empêche le saut de page avec le href="#"
            dropdown.classList.toggle('show');
        } else if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
}

function openLoginModal() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        if (confirm("Déconnexion du terminal sécurisé ?")) {
            localStorage.removeItem('isLoggedIn');
            window.location.href = "index.html";
        }
    } else {
        let user = prompt("Identifiant :");
        let pass = prompt("Mot de passe :");
        if (user === "admin" && pass === "site01") {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.reload();
        } else if (user !== null) {
            alert("Accès refusé. Tentative enregistrée.");
        }
    }
}

/* --- STATUT ROBLOX (SÉCURISÉ) --- */
async function initRobloxStatus() {
    const statusElement = document.getElementById('server-status');
    const syncElement = document.getElementById('sync-date');
    
    // Si on n'est pas sur la page d'accueil, on arrête la fonction ici sans erreur
    if (!statusElement) return; 

    const universeId = "6688757041";
    const apiUrl = `https://games.roproxy.com/v1/games?universeIds=${universeId}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            const game = data.data[0];
            statusElement.innerText = game.playing > 0 ? "OPÉRATIONNEL" : "HORS-LIGNE";
            statusElement.className = game.playing > 0 ? "status-online" : "status-offline";
        }
    } catch (e) {
        statusElement.innerText = "ERREUR LIAISON";
        statusElement.className = "status-offline";
    }

    if (syncElement) {
        syncElement.innerText = new Date().toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
        });
    }
}

function toggleArchiveText(button) {
    // On récupère le conteneur de texte juste avant le bouton
    const container = button.previousElementSibling;
    
    // On bascule la classe 'expanded'
    container.classList.toggle('expanded');
    
    // On change le texte du bouton selon l'état
    if (container.classList.contains('expanded')) {
        button.innerText = "Voir moins";
        // Optionnel : déplace le bouton en bas si le texte est très long
        button.style.display = "block"; 
    } else {
        button.innerText = "Voir plus";
    }
}

document.getElementById('archive-search').addEventListener('input', function() {
    const query = this.value.toUpperCase();
    const mode = document.getElementById('search-mode').value;
    const items = document.querySelectorAll('.news-item');

    items.forEach(item => {
        let textToCompare = "";

        if (mode === 'date') {
            textToCompare = item.querySelector('.news-date').innerText;
        } else if (mode === 'category') {
            textToCompare = item.querySelector('.archive-category-prefix').innerText;
        } else {
            textToCompare = item.innerText; // Recherche dans tout le bloc
        }

        if (textToCompare.toUpperCase().includes(query)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
});
/* ============================================================
   LOGISTIQUE - Chargement dynamique depuis GitHub
   À AJOUTER dans script.js, à la fin du fichier
   ============================================================ */

async function initLogistique() {
    // On vérifie qu'on est bien sur la page logistique
    const tbody = document.getElementById('chantiers-tbody');
    const grid  = document.getElementById('ressources-grid');
    if (!tbody || !grid) return;

    // URL raw GitHub de votre fichier JSON (se met à jour automatiquement quand vous modifiez le JSON sur GitHub)
    const JSON_URL = 'https://raw.githubusercontent.com/ADERBEZ/SP01-GESTION-PLANNIFICATION/main/logistique.json';

    try {
        const response = await fetch(JSON_URL + '?t=' + Date.now()); // ?t= évite le cache
        if (!response.ok) throw new Error('Fichier introuvable');
        const data = await response.json();

        // --- 1. Remplir le tableau des chantiers ---
        tbody.innerHTML = '';
        data.chantiers.forEach(c => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${c.projet}</td>
                <td>${c.zone}</td>
                <td>${c.responsable}</td>
                <td>${c.avancement}%</td>
                <td><span class="status-tag ${c.statut}">${c.statut_label}</span></td>
            `;
            tbody.appendChild(tr);
        });

        // --- 2. Remplir les barres de progression ---
        grid.innerHTML = '';
        data.ressources.forEach(r => {
            const card = document.createElement('div');
            card.className = 'member-card';
            card.innerHTML = `
                <h4>${r.nom}</h4>
                <div class="progress-container">
                    <div class="progress-label">
                        <span>${r.nom === 'Unités de Confinement' ? 'Capacité Occupée' : 'Stock Actuel'}</span>
                        <span>${r.valeur}%</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: 0%;"></div>
                    </div>
                </div>
                <p style="margin-top: 10px; font-size: 0.85rem; color: var(--text-muted);">${r.description}</p>
            `;
            grid.appendChild(card);

            // Animation de la barre après insertion dans le DOM
            setTimeout(() => {
                card.querySelector('.progress-bar-fill').style.width = r.valeur + '%';
            }, 100);
        });

        // --- 3. Afficher la date de sync ---
        const syncEl = document.getElementById('last-sync');
        if (syncEl) {
            syncEl.innerText = new Date().toLocaleDateString('fr-FR', {
                day: 'numeric', month: 'long', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
        }

    } catch (e) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; color: #e74c3c; padding: 30px;">
                    ⚠️ Impossible de charger les données. Vérifiez que <code>logistique.json</code> est bien présent sur GitHub.
                </td>
            </tr>
        `;
        console.error('Erreur chargement logistique.json :', e);
    }
}

// Appel de la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    initLogistique();
});
