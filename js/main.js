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
        // Inicializar variables
        this.currentVideo = null;
        this.scrollHandler = null;
        this.initialized = false;
        
        // Esperar a que el DOM esté completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        try {
            if (this.initialized) return;
            this.initialized = true;

            // Bindear métodos
            this.scrollHandler = this.handleScroll.bind(this);
            
            // Inicializar componentes
            this.setupNavigation();
            this.setupMobileMenu();
            this.setupFooterYear();
            this.setupGallery();
            this.setupBackToTop();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error initializing gallery:', error);
        }
    }

    handleScroll() {
        if (!this.scrollRAF) {
            this.scrollRAF = requestAnimationFrame(() => {
                try {
                    const nav = document.querySelector('.main-nav');
                    const backToTopButton = document.getElementById('back-to-top');
                    
                    if (nav) {
                        nav.classList.toggle('scrolled', window.scrollY > 100);
                    }
                    
                    if (backToTopButton) {
                        backToTopButton.classList.toggle('visible', window.scrollY > 300);
                    }
                } catch (error) {
                    console.error('Error in scroll handler:', error);
                }
                this.scrollRAF = null;
            });
        }
    }

    lazyLoadImage(img) {
        if (!img) return;
        
        try {
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
        } catch (error) {
            console.error('Error in lazyLoadImage:', error);
            img.src = config.placeholderImage;
        }
    }

    handleVideo(videoElement) {
        if (!videoElement) return;
        
        try {
            const playHandler = () => {
                try {
                    if (this.currentVideo && this.currentVideo !== videoElement) {
                        this.currentVideo.pause();
                    }
                    this.currentVideo = videoElement;
                } catch (error) {
                    console.error('Error in video play handler:', error);
                }
            };

            const pauseHandler = () => {
                try {
                    if (this.currentVideo === videoElement) {
                        this.currentVideo = null;
                    }
                } catch (error) {
                    console.error('Error in video pause handler:', error);
                }
            };

            videoElement.addEventListener('play', playHandler);
            videoElement.addEventListener('pause', pauseHandler);
        } catch (error) {
            console.error('Error in handleVideo:', error);
        }
    }

    handleVideoPlay(videoElement) {
        if (!videoElement) return;
        
        try {
            if (this.currentVideo && this.currentVideo !== videoElement) {
                this.currentVideo.pause();
            }

            if (videoElement.paused) {
                videoElement.play().catch(error => {
                    console.error('Error playing video:', error);
                });
                const overlay = videoElement.parentElement?.querySelector('.video-overlay');
                if (overlay) {
                    overlay.style.display = 'none';
                }
            } else {
                videoElement.pause();
                const overlay = videoElement.parentElement?.querySelector('.video-overlay');
                if (overlay) {
                    overlay.style.display = 'flex';
                }
            }
        } catch (error) {
            console.error('Error in handleVideoPlay:', error);
        }
    }

    setupNavigation() {
        try {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    try {
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
                                document.body.style.overflow = '';
                            }
                        }
                    } catch (error) {
                        console.error('Error in navigation click handler:', error);
                    }
                });
            });
        } catch (error) {
            console.error('Error in setupNavigation:', error);
        }
    }

    setupMobileMenu() {
        try {
            const menuToggle = document.querySelector('.menu-toggle');
            const navLinks = document.querySelector('.nav-links');

            if (menuToggle && navLinks) {
                menuToggle.addEventListener('click', () => {
                    try {
                        menuToggle.classList.toggle('active');
                        navLinks.classList.toggle('active');
                        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
                    } catch (error) {
                        console.error('Error in mobile menu toggle:', error);
                    }
                });
            }
        } catch (error) {
            console.error('Error in setupMobileMenu:', error);
        }
    }

    setupFooterYear() {
        try {
            const currentYear = document.getElementById('currentYear');
            if (currentYear) {
                currentYear.textContent = new Date().getFullYear();
            }
        } catch (error) {
            console.error('Error in setupFooterYear:', error);
        }
    }

    setupGallery() {
        try {
            const galleryGrid = document.querySelector('.gallery-grid');
            const filterButtons = document.querySelector('.filter-buttons');
            
            if (!galleryGrid || !filterButtons) return;

            // Crear botones de filtrado
            Object.entries(config.categories).forEach(([category, name]) => {
                try {
                    const button = document.createElement('button');
                    button.className = 'filter-btn' + (category === 'all' ? ' active' : '');
                    button.dataset.category = category;
                    button.textContent = name;
                    button.addEventListener('click', () => this.filterGallery(category));
                    filterButtons.appendChild(button);
                } catch (error) {
                    console.error('Error creating filter button:', error);
                }
            });

            this.createGallery(galleryGrid);
        } catch (error) {
            console.error('Error in setupGallery:', error);
        }
    }

    createGallery(galleryGrid) {
        if (!galleryGrid) return;

        try {
            config.artworks.forEach(artwork => {
                try {
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
                } catch (error) {
                    console.error('Error creating artwork card:', error);
                }
            });
        } catch (error) {
            console.error('Error in createGallery:', error);
        }
    }

    filterGallery(category) {
        try {
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
        } catch (error) {
            console.error('Error in filterGallery:', error);
        }
    }

    setupBackToTop() {
        try {
            const backToTopButton = document.getElementById('back-to-top');
            if (!backToTopButton) return;

            backToTopButton.addEventListener('click', (e) => {
                try {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } catch (error) {
                    console.error('Error in back to top click handler:', error);
                }
            });
        } catch (error) {
            console.error('Error in setupBackToTop:', error);
        }
    }

    setupEventListeners() {
        try {
            // Un solo event listener para el scroll con throttling
            window.addEventListener('scroll', this.scrollHandler, { passive: true });

            // Limpiar recursos al cerrar
            window.addEventListener('beforeunload', () => {
                try {
                    if (this.currentVideo) {
                        this.currentVideo.pause();
                        this.currentVideo = null;
                    }
                    // Eliminar el event listener de scroll
                    window.removeEventListener('scroll', this.scrollHandler);
                } catch (error) {
                    console.error('Error in beforeunload handler:', error);
                }
            });

            // Pausar video cuando la pestaña no está visible
            document.addEventListener('visibilitychange', () => {
                try {
                    if (document.hidden && this.currentVideo) {
                        this.currentVideo.pause();
                    }
                } catch (error) {
                    console.error('Error in visibilitychange handler:', error);
                }
            });
        } catch (error) {
            console.error('Error in setupEventListeners:', error);
        }
    }
}

// Inicializar la galería
const gallery = new Gallery();
