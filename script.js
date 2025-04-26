document.addEventListener('DOMContentLoaded', function() {
    // Scroll snap functionality
    const sections = document.querySelectorAll('.fullpage-section');
    const dots = document.querySelectorAll('.dot');
    
    // Set first dot as active initially
    dots[0].classList.add('active');
    
    // Handle scroll events
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active dot
        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Harap isi semua field!');
                return;
            }
            
            // Simulate form submission
            alert(`Terima kasih ${name}! Pesan Anda telah terkirim. Saya akan segera menghubungi Anda melalui ${email}.`);
            
            // Reset form
            this.reset();
        });
    }
    
    // Smooth scroll for dots
    dots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});