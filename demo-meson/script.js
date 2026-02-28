// Navbar Sticky Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
});

// Mobile Mobile Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'white';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        }
    });
}

// Auto-Scroll Gallery logic (Swipe loop)
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('galleryTrack');

    // Si el usuario nos pasa más fotos, se llenará este contenedor.
    // Para hacer un efecto infinito simple, duplicamos el contenido actual si hay pocos items
    if (track && track.children.length > 0) {
        const itemsToClone = Array.from(track.children);
        itemsToClone.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });

        // Simple Auto-play (deslizamiento continuo)
        let scrollAmount = 0;
        const scrollSpeed = 1; // Pixeles por frame

        function autoScroll() {
            if (!track.matches(':hover')) { // Pausar en hover
                scrollAmount += scrollSpeed;
                track.scrollLeft = scrollAmount;

                // Si llegamos a la mitad (porque lo hemos duplicado), volvemos a 0 sin que se note
                if (track.scrollLeft >= (track.scrollWidth / 2)) {
                    scrollAmount = 0;
                    track.scrollLeft = 0;
                }
            }
            requestAnimationFrame(autoScroll);
        }

        // Iniciar scroll automático
        requestAnimationFrame(autoScroll);
    }
});
