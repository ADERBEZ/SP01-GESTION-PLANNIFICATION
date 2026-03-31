// Toggle Menu Déroulant
document.getElementById('settings-btn').onclick = function() {
    document.getElementById('settings-dropdown').classList.toggle('show');
}

// Mode Sombre
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Charger le thème au démarrage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// Simulation Connexion (Ouverture simple d'un prompt pour l'exemple)
function openLoginModal() {
    let user = prompt("Identifiant :");
    let pass = prompt("Mot de passe :");
    
    if(user === "admin" && pass === "site01") {
        localStorage.setItem('isLoggedIn', 'true');
        alert("Connexion réussie. L'onglet GESTION est activé.");
        window.location.reload(); // Pour afficher l'onglet
    } else {
        alert("Accès refusé.");
    }
}