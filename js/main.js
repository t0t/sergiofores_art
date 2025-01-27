document.addEventListener('DOMContentLoaded', () => {
    // Navigation scroll effect
    const nav = document.querySelector('.main-nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Initialize footer year
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // All artwork data
    const artworks = [
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
    ];

    // Optimizar carga de imágenes
    function lazyLoadImage(img) {
        if ('loading' in HTMLImageElement.prototype) {
            // Usar lazy loading nativo si está disponible
            img.loading = 'lazy';
            img.src = img.dataset.src;
        } else {
            // Fallback a IntersectionObserver
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        observer.unobserve(img);
                    }
                });
            });
            observer.observe(img);
        }
    }

    // Video handling
    function handleVideo(videoElement) {
        const container = videoElement.closest('.artwork-video');
        
        // Loading state
        container.classList.add('loading');
        
        // Remove loading state when metadata is loaded
        videoElement.addEventListener('loadedmetadata', () => {
            container.classList.remove('loading');
        }, { once: true });

        // Handle video errors
        videoElement.addEventListener('error', (e) => {
            console.error('Error loading video:', e);
            container.innerHTML = `
                <div class="video-error">
                    <p>Error al cargar el video. Por favor, intenta más tarde.</p>
                </div>
            `;
        }, { once: true });

        // Clean up resources when video is not visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && !videoElement.paused) {
                    videoElement.pause();
                }
            });
        }, {
            threshold: 0.2
        });
        
        observer.observe(videoElement);

        // Pause video when switching tabs
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && !videoElement.paused) {
                videoElement.pause();
            }
        });

        // Memory management
        videoElement.addEventListener('pause', () => {
            videoElement.removeAttribute('src');
            videoElement.load();
        });

        return videoElement;
    }

    // Gallery functionality
    function createGallery() {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) return;
        
        galleryGrid.innerHTML = '';

        artworks.forEach(artwork => {
            const card = document.createElement('div');
            card.className = 'artwork-card';
            card.dataset.category = artwork.category;

            if (artwork.type === 'video') {
                card.innerHTML = `
                    <div class="artwork-video">
                        <video 
                            controls 
                            preload="metadata"
                            playsinline
                            controlsList="nodownload"
                            poster="/images/video-poster.jpg"
                        >
                            <source src="${artwork.videoUrl}" type="video/mp4">
                            Tu navegador no soporta el elemento video.
                        </video>
                    </div>
                    <div class="artwork-info">
                        <h3>${artwork.title}</h3>
                        <p>${artwork.description}</p>
                    </div>
                `;
                const video = card.querySelector('video');
                if (video) {
                    handleVideo(video);
                }
            } else {
                const imgSrc = artwork.image || '/images/placeholder.png';
                card.innerHTML = `
                    <div class="artwork-image">
                        <img 
                            src="/images/placeholder.png"
                            data-src="${imgSrc}"
                            alt="${artwork.title}"
                            onerror="this.onerror=null; this.src='/images/placeholder.png';"
                        >
                    </div>
                    <div class="artwork-info">
                        <h3>${artwork.title}</h3>
                        <p>${artwork.description}</p>
                    </div>
                `;
                const img = card.querySelector('img');
                if (img) {
                    lazyLoadImage(img);
                }
            }

            galleryGrid.appendChild(card);
        });
    }

    // Manejar la reproducción de video
    let currentVideo = null;
    window.handleVideoPlay = function(videoElement) {
        // Si hay otro video reproduciéndose, lo pausamos
        if (currentVideo && currentVideo !== videoElement) {
            currentVideo.pause();
        }
        currentVideo = videoElement;
        
        // Reducir la calidad del video si el dispositivo es móvil
        if (window.innerWidth <= 768) {
            videoElement.setAttribute('playbackQuality', 'low');
        }
        
        // Liberar memoria cuando el video termina
        videoElement.addEventListener('ended', function() {
            if (currentVideo === this) {
                currentVideo = null;
            }
        }, { once: true });
    };

    // Limpiar recursos de video al cambiar de página o cerrar
    window.addEventListener('beforeunload', function() {
        if (currentVideo) {
            currentVideo.pause();
            currentVideo = null;
        }
    });

    // Pausar video si el usuario cambia de pestaña
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && currentVideo) {
            currentVideo.pause();
        }
    });

    // Manejar errores de video
    window.addEventListener('error', (e) => {
        if (e.target.tagName === 'VIDEO') {
            console.error('Error loading video:', e.target.querySelector('source').src);
            const videoContainer = e.target.closest('.artwork-video');
            if (videoContainer) {
                videoContainer.innerHTML = `
                    <div class="video-error">
                        <p>Error al cargar el video. Por favor, intenta más tarde.</p>
                    </div>
                `;
            }
        }
    }, true);

    // Manejar errores de carga
    window.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            console.error('Error loading image:', e.target.dataset.src);
            e.target.src = '/images/placeholder.png'; // Asegúrate de tener una imagen placeholder
        }
    }, true);

    function filterGallery(category) {
        const cards = document.querySelectorAll('.artwork-card');
        let hasVisibleCards = false;

        // Pausar todos los videos
        document.querySelectorAll('.artwork-video video').forEach(video => {
            video.pause();
            video.currentTime = 0;
        });

        cards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                hasVisibleCards = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Remove existing placeholder if exists
        const existingPlaceholder = document.querySelector('.empty-category-placeholder');
        if (existingPlaceholder) {
            existingPlaceholder.remove();
        }

        // Add placeholder for empty ink category
        if (category === 'tinta' && !hasVisibleCards) {
            const placeholder = document.createElement('div');
            placeholder.className = 'empty-category-placeholder';
            placeholder.innerHTML = `
                <div class="placeholder-content">
                    <i class="fas fa-pen-nib"></i>
                    <h3>Próximamente</h3>
                    <p>Obras en tinta en proceso de creación...</p>
                </div>
            `;
            document.querySelector('.gallery-grid').appendChild(placeholder);
        }

        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
    }

    // Initialize gallery
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelector('.filter-buttons');

    if (galleryGrid && filterButtons) {
        // Add filter buttons
        const categories = ['all', 'pinturas', '3d', 'tinta'];
        const categoryNames = {
            all: 'Todos',
            pinturas: 'Óleos',
            '3d': '3D',
            tinta: 'Tinta'
        };

        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'filter-btn' + (category === 'all' ? ' active' : '');
            button.dataset.category = category;
            button.textContent = categoryNames[category];
            button.addEventListener('click', () => filterGallery(category));
            filterButtons.appendChild(button);
        });

        createGallery();
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Back to Top functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleBackToTop);
    
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initial check for back to top button
    toggleBackToTop();
});
