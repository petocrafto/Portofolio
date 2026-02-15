// API Configuration - Ganti dengan URL VPS Anda
const API_CONFIG = {
    baseURL: 'https://your-vps-domain.com/api', // Ganti dengan URL VPS Anda
    endpoints: {
        contact: '/contact',
        blog: '/blog',
        stats: '/stats'
    }
};

// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
});

// Theme Toggle (Dark/Light Mode)
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        
        if (isLight) {
            themeToggle.querySelector('i').classList.remove('fa-moon');
            themeToggle.querySelector('i').classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.querySelector('i').classList.remove('fa-sun');
            themeToggle.querySelector('i').classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initThemeToggle();
    
    // Custom Cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursorDot);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate cursor
    function animateCursor() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        // Faster dot movement
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .dot, .project-link, .scroll-down');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorDot.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorDot.classList.remove('hover');
        });
    });
    
    // Scroll snap functionality
    const sections = document.querySelectorAll('.fullpage-section');
    const dots = document.querySelectorAll('.dot');
    
    // Set first dot as active initially
    if (dots.length > 0) {
        dots[0].classList.add('active');
    }
    
    // Intersection Observer for better scroll detection
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Update active dot
                dots.forEach(dot => {
                    dot.classList.remove('active');
                    if (dot.getAttribute('data-section') === sectionId) {
                        dot.classList.add('active');
                    }
                });
                
                // Add fade-in animation to section
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Handle scroll events (fallback)
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    const scrollPosition = window.pageYOffset + window.innerHeight / 2;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        current = section.getAttribute('id');
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Skills Progress Animation
    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const percent = progressBar.getAttribute('data-percent');
                    progressBar.style.width = percent + '%';
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
    }
    animateSkills();
    
    // Statistics Counter Animation
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const target = parseInt(statNumber.getAttribute('data-target'));
                    animateCounter(statNumber, target);
                    observer.unobserve(statNumber);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target >= 1000 ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target >= 1000 ? '+' : '');
            }
        }, 30);
    }
    animateStats();
    
    // Load Blog Posts from API (Ready for VPS)
    async function loadBlogPosts() {
        const blogContainer = document.getElementById('blogContainer');
        if (!blogContainer) return;
        
        try {
            // Uncomment untuk menggunakan API dari VPS
            // const response = await fetch(API_CONFIG.baseURL + API_CONFIG.endpoints.blog);
            // const posts = await response.json();
            
            // Simulasi data (ganti dengan API call ke VPS)
            const posts = [
                {
                    id: 1,
                    title: 'Belajar Web Development dari Nol',
                    excerpt: 'Panduan lengkap untuk memulai perjalanan sebagai web developer...',
                    date: '2024-01-15',
                    icon: 'fa-code'
                },
                {
                    id: 2,
                    title: 'Tips Mengoptimalkan Website',
                    excerpt: 'Cara-cara untuk membuat website lebih cepat dan efisien...',
                    date: '2024-02-20',
                    icon: 'fa-rocket'
                },
                {
                    id: 3,
                    title: 'Menggunakan VPS untuk Portfolio',
                    excerpt: 'Tutorial setup VPS untuk hosting portfolio website...',
                    date: '2024-03-10',
                    icon: 'fa-server'
                }
            ];
            
            blogContainer.innerHTML = '';
            posts.forEach((post, index) => {
                const blogCard = document.createElement('div');
                blogCard.className = 'blog-card';
                blogCard.style.animationDelay = `${index * 0.1}s`;
                blogCard.innerHTML = `
                    <div class="blog-card-image">
                        <i class="fas ${post.icon}"></i>
                    </div>
                    <div class="blog-card-content">
                        <h3>${post.title}</h3>
                        <p>${post.excerpt}</p>
                        <div class="blog-card-date">${new Date(post.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                        <a href="#" class="blog-card-link">Baca Selengkapnya <i class="fas fa-arrow-right"></i></a>
                    </div>
                `;
                blogContainer.appendChild(blogCard);
            });
        } catch (error) {
            console.error('Error loading blog posts:', error);
            blogContainer.innerHTML = '<div class="blog-loading"><p>Gagal memuat artikel. Silakan coba lagi nanti.</p></div>';
        }
    }
    loadBlogPosts();
    
    // Contact Form with API Integration (Ready for VPS)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('contactName').value.trim(),
                email: document.getElementById('contactEmail').value.trim(),
                subject: document.getElementById('contactSubject').value.trim(),
                message: document.getElementById('contactMessage').value.trim()
            };
            
            // Validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showNotification('Harap isi semua field!', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showNotification('Format email tidak valid!', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            try {
                // Uncomment untuk menggunakan API dari VPS
                // const response = await fetch(API_CONFIG.baseURL + API_CONFIG.endpoints.contact, {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(formData)
                // });
                // 
                // if (!response.ok) {
                //     throw new Error('Gagal mengirim pesan');
                // }
                // 
                // const result = await response.json();
                
                // Simulasi API call (ganti dengan API call ke VPS)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                showNotification(`Terima kasih ${formData.name}! Pesan Anda telah terkirim. Saya akan segera menghubungi Anda melalui ${formData.email}.`, 'success');
                this.reset();
            } catch (error) {
                console.error('Error sending message:', error);
                showNotification('Gagal mengirim pesan. Silakan coba lagi nanti.', 'error');
            } finally {
                btnText.style.display = 'inline-block';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    }
    
    // Smooth scroll for dots
    dots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add parallax effect to home section
    const homeSection = document.getElementById('home');
    if (homeSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                homeSection.style.transform = `translateY(${scrolled * 0.5}px)`;
                homeSection.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
        });
    }
    
    // Add typing effect to home title (optional enhancement)
    const titleElement = document.querySelector('#home h1');
    if (titleElement) {
        const text = titleElement.innerHTML;
        titleElement.style.opacity = '0';
        setTimeout(() => {
            titleElement.style.transition = 'opacity 1s ease-in';
            titleElement.style.opacity = '1';
        }, 300);
    }
});

// Notification function
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);