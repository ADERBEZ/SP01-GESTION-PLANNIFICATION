/* --- GESTION DU MENU DÉROULANT (ENGRENAGE) --- */
document.addEventListener('click', function(event) {
    const btn = document.getElementById('settings-btn');
    const dropdown = document.getElementById('settings-dropdown');

    if (event.target.closest('#settings-btn')) {
        dropdown.classList.toggle('show');
    } else if (dropdown && !dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

/* --- MODE SOMBRE --- */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Charger le thème au démarrage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

/* --- CONNEXION & ONGLET GESTION --- */
function openLoginModal() {
    let user = prompt("Identifiant :");
    let pass = prompt("Mot de passe :");
    if(user === "admin" && pass === "site01") {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.reload();
    } else {
        alert("Accès refusé.");
    }
}

// Ajouter l'onglet gestion si connecté
if (localStorage.getItem('isLoggedIn') === 'true') {
    const navUl = document.querySelector('nav ul');
    if (navUl) {
        const gestionLi = document.createElement('li');
        gestionLi.innerHTML = '<a href="gestion.html" style="color: #e67e22; font-weight: bold;">GESTION</a>';
        navUl.insertBefore(gestionLi, navUl.lastElementChild);
    }
}

/* --- STATUT ROBLOX (Si présent sur la page) --- */
// (Ajoute ici ta fonction checkRobloxStatus qu'on a vu plus haut)