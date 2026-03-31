// Toggle Menu Déroulant
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('settings-btn');
    const dropdown = document.getElementById('settings-dropdown');

    if (btn && dropdown) {
        btn.onclick = function(event) {
            // Empêche la fermeture immédiate
            event.stopPropagation();
            dropdown.classList.toggle('show');
        };
    }

    // Fermer le menu si on clique n'importe où ailleurs sur l'écran
    window.onclick = function(event) {
        if (!event.target.matches('.gear-btn')) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    };
});