
// --- Mobile Menu Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const burgerTop = document.getElementById('burger-top');
    const burgerMiddle = document.getElementById('burger-middle');
    const burgerBottom = document.getElementById('burger-bottom');
    let isMenuOpen = false;

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            
            // Toggle ARIA attributes
            menuBtn.setAttribute('aria-expanded', isMenuOpen);
            mobileMenu.setAttribute('aria-hidden', !isMenuOpen);

            if (isMenuOpen) {
                mobileMenu.classList.remove('translate-x-full');
                document.body.classList.add('overflow-hidden');
                // Burger animation
                burgerTop.setAttribute('y', '11');
                burgerTop.classList.add('rotate-45');
                burgerMiddle.classList.add('opacity-0');
                burgerBottom.setAttribute('y', '11');
                burgerBottom.classList.add('-rotate-45');
            } else {
                mobileMenu.classList.add('translate-x-full');
                document.body.classList.remove('overflow-hidden');
                // Burger reset
                burgerTop.setAttribute('y', '4');
                burgerTop.classList.remove('rotate-45');
                burgerMiddle.classList.remove('opacity-0');
                burgerBottom.setAttribute('y', '18');
                burgerBottom.classList.remove('-rotate-45');
            }
        });

        // Close menu on link click
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                
                // Reset ARIA
                menuBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');

                mobileMenu.classList.add('translate-x-full');
                document.body.classList.remove('overflow-hidden');
                burgerTop.setAttribute('y', '4');
                burgerTop.classList.remove('rotate-45');
                burgerMiddle.classList.remove('opacity-0');
                burgerBottom.setAttribute('y', '18');
                burgerBottom.classList.remove('-rotate-45');
            });
        });
    }

    // --- Cookie Consent Logic ---
    const cookieBanner = document.getElementById('cookie-banner');
    
    if (cookieBanner) {
        const consent = localStorage.getItem('wlu_cookie_consent');
        if (!consent) {
            cookieBanner.classList.remove('hidden');
            // Small timeout to allow transition
            setTimeout(() => {
                cookieBanner.classList.remove('translate-y-full');
            }, 100);
        } else {
            pushToGTM(consent);
        }
    }

    // --- Contact Form Logic (AJAX + Honeypot Anti-Spam) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // 1. Protection Anti-Spam (Honeypot)
            const honeypotField = document.getElementById('professional_website');
            
            // Fonction pour afficher le succès (utilisée pour les humains ET les robots piégés)
            const showSuccess = () => {
                contactForm.innerHTML = `
                    <div class="text-center py-12 animate-fade-in">
                        <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 class="font-serif text-3xl text-ink mb-3">Message envoyé</h3>
                        <p class="text-graphite max-w-md mx-auto">Nous avons bien reçu votre demande et reviendrons vers vous très rapidement pour qualifier votre situation.</p>
                    </div>
                `;
                contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
            };

            // Si le champ caché est rempli, c'est un robot.
            // On fait semblant que ça a marché, mais on ne fait RIEN (pas d'envoi serveur).
            if (honeypotField && honeypotField.value !== "") {
                // console.log("Spam bot detected and blocked.");
                // Petit délai pour simuler un traitement réseau crédible pour le bot
                setTimeout(showSuccess, 500);
                return;
            }

            // 2. Traitement Normal (Humains)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.disabled = true;
            submitBtn.innerText = 'Envoi en cours...';

            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    showSuccess();
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error:', error);
                alert("Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous contacter directement sur LinkedIn.");
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        });
    }
});

function handleConsent(status) {
    const cookieBanner = document.getElementById('cookie-banner');
    localStorage.setItem('wlu_cookie_consent', status);
    
    // Hide Banner
    if (cookieBanner) {
        cookieBanner.classList.add('translate-y-full');
        setTimeout(() => {
            cookieBanner.classList.add('hidden');
        }, 500);
    }

    pushToGTM(status);
}

function pushToGTM(status) {
    window.dataLayer = window.dataLayer || [];
    
    // Push Consent Mode
    window.dataLayer.push({
        'event': status === 'granted' ? 'consent_granted' : 'consent_denied',
        'consent_status': status
    });
    
    // console.log('GTM Consent:', status);
}
