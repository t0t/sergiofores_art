// Configuración inicial
const config = {
    categories: {
        all: 'Todos',
        pinturas: 'Óleos',
        '3d': '3D',
        tinta: 'Tinta'
    },
    placeholderImage: './images/placeholder.png',
    artworks: [
        // Video presentación
        {
            title: 'Obra Plástica I',
            description: 'Presentación Narrada',
            type: 'video',
            videoUrl: '/videos/Sergio Forés - Obra Plástica I (Presentación Narrada).mp4',
            category: '3d'
        },
        // Óleos
        {
            title: 'Autoocultamiento',
            description: 'Óleo sobre lienzo',
            image: '/images/projects/oil/autoocultamiento.png',
            category: 'pinturas'
        },
        {
            title: 'Beraja',
            description: 'Óleo sobre lienzo',
            image: '/images/projects/oil/beraja.png',
            category: 'pinturas'
        },
        {
            title: 'Luz II',
            description: 'Óleo sobre lienzo',
            image: '/images/projects/oil/luz2.png',
            category: 'pinturas'
        },
        {
            title: 'Mente Acústica Literal I',
            description: 'Óleo sobre lienzo',
            image: '/images/projects/oil/menteacusticaliteral1.png',
            category: 'pinturas'
        },
        {
            title: 'Proceso II',
            description: 'Óleo sobre lienzo',
            image: '/images/projects/oil/proceso2.png',
            category: 'pinturas'
        },
        {
            title: 'Proceso III',
            description: 'Óleo sobre lienzo',
            image: '/images/projects/oil/proceso3.png',
            category: 'pinturas'
        },
        {
            title: 'Shejina',
            description: 'Óleo sobre lienzo',
            image: '/images/projects/oil/shejina.png',
            category: 'pinturas'
        },
        {
            title: 'Tres I',
            description: 'Óleo sobre lienzo',
            image: '/images/projects/oil/tres1.png',
            category: 'pinturas'
        },
        {
            title: '291224a',
            description: 'Óleo sobre lienzo',
            image: '/images/projects/oil/291224a.png',
            category: 'pinturas'
        },
        {
            title: '2911a',
            description: 'Óleo sobre lienzo',
            image: '/images/projects/oil/2911a.png',
            category: 'pinturas'
        },
        // 3D Prints
        {
            title: 'Escultura Digital 1',
            description: 'Impresión 3D en PLA',
            image: '/images/projects/3dprinting/IMG_0864.JPG',
            category: '3d'
        },
        {
            title: 'Escultura Digital 2',
            description: 'Impresión 3D en PLA',
            image: '/images/projects/3dprinting/IMG_0869.JPG',
            category: '3d'
        },
        {
            title: 'Escultura Digital 3',
            description: 'Impresión 3D en PLA',
            image: '/images/projects/3dprinting/IMG_0943.jpg',
            category: '3d'
        },
        {
            title: 'Escultura Digital 4',
            description: 'Impresión 3D en PLA',
            image: '/images/projects/3dprinting/IMG_7883.JPG',
            category: '3d'
        },
        {
            title: 'Escultura Digital 5',
            description: 'Impresión 3D en PLA',
            image: '/images/projects/3dprinting/IMG_8631.JPG',
            category: '3d'
        },
        {
            title: 'Escultura Digital 6',
            description: 'Impresión 3D en PLA',
            image: '/images/projects/3dprinting/3955C791-B166-42B0-AA5B-065B6CBC2DC0.JPG',
            category: '3d'
        },
        {
            title: 'Escultura Digital 7',
            description: 'Impresión 3D en PLA',
            image: '/images/projects/3dprinting/87368654_498661417692348_2165792891719385088_o.jpg',
            category: '3d'
        }
    ]
};

class Gallery {
    constructor() {
        this.currentVideo = null;
        this.scrollHandler = this.handleScroll.bind(this);
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupFooterYear();
        this.setupGallery();
        this.setupBackToTop();
        this.setupEventListeners();
    }

    handleScroll() {
        requestAnimationFrame(() => {
            const nav = document.querySelector('.main-nav');
            const backToTopButton = document.getElementById('back-to-top');
            
            if (nav) {
                nav.classList.toggle('scrolled', window.scrollY > 100);
            }
            
            if (backToTopButton) {
                backToTopButton.classList.toggle('visible', window.scrollY > 300);
            }
        });
    }

    lazyLoadImage(img) {
        if (!img) return;
        
        // Establecer el placeholder inmediatamente
        img.src = config.placeholderImage;

        // Configurar el manejo de errores antes de cargar la imagen real
        img.onerror = function() {
            if (this.src !== config.placeholderImage) {
                console.error('Error loading image:', this.dataset.src);
                this.src = config.placeholderImage;
            }
            this.onerror = null; // Prevenir bucles infinitos
        };

        if ('loading' in HTMLImageElement.prototype) {
            img.loading = 'lazy';
            const actualSrc = img.dataset.src.startsWith('/') ? '.' + img.dataset.src : img.dataset.src;
            img.src = actualSrc;
        } else {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const actualSrc = img.dataset.src.startsWith('/') ? '.' + img.dataset.src : img.dataset.src;
                        img.src = actualSrc;
                        observer.unobserve(img);
                    }
                });
            });
            observer.observe(img);
        }
    }

    handleVideo(videoElement) {
        if (!videoElement) return;
        
        videoElement.addEventListener('play', () => {
            if (this.currentVideo && this.currentVideo !== videoElement) {
                this.currentVideo.pause();
            }
            this.currentVideo = videoElement;
        });

        videoElement.addEventListener('pause', () => {
            if (this.currentVideo === videoElement) {
                this.currentVideo = null;
            }
        });
    }

    handleVideoPlay(videoElement) {
        if (!videoElement) return;
        
        if (this.currentVideo && this.currentVideo !== videoElement) {
            this.currentVideo.pause();
        }

        if (videoElement.paused) {
            videoElement.play();
            const overlay = videoElement.parentElement.querySelector('.video-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
        } else {
            videoElement.pause();
            const overlay = videoElement.parentElement.querySelector('.video-overlay');
            if (overlay) {
                overlay.style.display = 'flex';
            }
        }
    }

    setupNavigation() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                    // Close mobile menu if open
                    const navLinks = document.querySelector('.nav-links');
                    const menuToggle = document.querySelector('.menu-toggle');
                    if (navLinks && menuToggle) {
                        navLinks.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                }
            });
        });
    }

    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            });

            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
    }

    setupFooterYear() {
        const currentYear = document.getElementById('currentYear');
        if (currentYear) {
            currentYear.textContent = new Date().getFullYear();
        }
    }

    setupGallery() {
        const galleryGrid = document.querySelector('.gallery-grid');
        const filterButtons = document.querySelector('.filter-buttons');
        
        if (!galleryGrid || !filterButtons) return;

        // Crear botones de filtrado
        Object.entries(config.categories).forEach(([category, name]) => {
            const button = document.createElement('button');
            button.className = 'filter-btn' + (category === 'all' ? ' active' : '');
            button.dataset.category = category;
            button.textContent = name;
            button.addEventListener('click', () => this.filterGallery(category));
            filterButtons.appendChild(button);
        });

        this.createGallery(galleryGrid);
    }

    createGallery(galleryGrid) {
        if (!galleryGrid) return;

        config.artworks.forEach(artwork => {
            const card = document.createElement('div');
            card.className = 'artwork-card';
            card.dataset.category = artwork.category;

            if (artwork.type === 'video') {
                const videoUrl = artwork.videoUrl.startsWith('/') ? '.' + artwork.videoUrl : artwork.videoUrl;
                card.innerHTML = `
                    <div class="artwork-video">
                        <video preload="metadata">
                            <source src="${videoUrl}" type="video/mp4">
                        </video>
                        <div class="video-overlay">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="artwork-info">
                        <h3>${artwork.title}</h3>
                        <p>${artwork.description}</p>
                    </div>
                `;
                const video = card.querySelector('video');
                if (video) {
                    this.handleVideo(video);
                    video.addEventListener('click', () => this.handleVideoPlay(video));
                }
            } else {
                const imgSrc = artwork.image.startsWith('/') ? '.' + artwork.image : artwork.image;
                card.innerHTML = `
                    <div class="artwork-image">
                        <img 
                            src="${config.placeholderImage}" 
                            data-src="${imgSrc}" 
                            alt="${artwork.title}"
                        />
                    </div>
                    <div class="artwork-info">
                        <h3>${artwork.title}</h3>
                        <p>${artwork.description}</p>
                    </div>
                `;
                const img = card.querySelector('img');
                if (img) {
                    this.lazyLoadImage(img);
                }
            }

            galleryGrid.appendChild(card);
        });
    }

    filterGallery(category) {
        const cards = document.querySelectorAll('.artwork-card');
        const buttons = document.querySelectorAll('.filter-btn');
        let hasVisibleCards = false;

        // Actualizar botones
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });

        // Filtrar tarjetas
        cards.forEach(card => {
            const shouldShow = category === 'all' || card.dataset.category === category;
            card.style.display = shouldShow ? '' : 'none';
            if (shouldShow) hasVisibleCards = true;
        });

        // Mostrar mensaje si no hay resultados
        const noResults = document.querySelector('.no-results');
        if (!hasVisibleCards) {
            if (!noResults) {
                const message = document.createElement('div');
                message.className = 'no-results';
                message.textContent = 'No se encontraron obras en esta categoría.';
                cards[0].parentNode.appendChild(message);
            }
        } else if (noResults) {
            noResults.remove();
        }
    }

    setupBackToTop() {
        const backToTopButton = document.getElementById('back-to-top');
        if (!backToTopButton) return;

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupEventListeners() {
        // Un solo event listener para el scroll
        window.addEventListener('scroll', this.scrollHandler, { passive: true });

        // Limpiar recursos al cerrar
        window.addEventListener('beforeunload', () => {
            if (this.currentVideo) {
                this.currentVideo.pause();
                this.currentVideo = null;
            }
            // Eliminar el event listener de scroll
            window.removeEventListener('scroll', this.scrollHandler);
        });
    }
}

// Inicializar la galería cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const gallery = new Gallery();
});
