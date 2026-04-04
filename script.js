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

/* --- CONNEXION & PARAMÈTRES --- */
function initSettingsMenu() {
    document.addEventListener('click', (e) => {
        const btn = document.getElementById('settings-btn');
        const dropdown = document.getElementById('settings-dropdown');
        if (!btn || !dropdown) return;

        if (e.target.closest('#settings-btn')) {
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