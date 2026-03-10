document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scroll Effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for Fade-in Animations
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 3. WhatsApp Ordering Logic
    // Replace this with the actual phone number of the business.
    const whatsappNumber = "+34600000000";

    const waButtons = document.querySelectorAll('.ws-order-btn, .btn-outline, .floating-whatsapp');

    waButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            const product = button.getAttribute('data-product');
            let message = "";

            if (product === "Consulta general") {
                message = "¡Hola Qastiza! Me gustaría haceros una consulta sobre vuestros productos.";
            } else {
                message = `¡Hola Qastiza! Estoy muy interesado en encargar una "${product}". ¿Me podéis dar más información de cómo hacer el pedido?`;
            }

            // Encode the message to be URL safe
            const encodedMessage = encodeURIComponent(message);
            const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Open WhatsApp in a new tab
            window.open(waUrl, '_blank');
        });
    });

});
