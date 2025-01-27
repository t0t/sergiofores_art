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

    // All artwork data
    const artworks = [
        // Óleos
        {
            title: 'Autoocultamiento',
            description: 'Óleo sobre lienzo',
            image: 'images/projects/oil/autoocultamiento.png',
            category: 'pinturas'
        },
        {
            title: 'Beraja',
            description: 'Óleo sobre lienzo',
            image: 'images/projects/oil/beraja.png',
            category: 'pinturas'
        },
        {
            title: 'Luz',
            description: 'Óleo sobre lienzo',
            image: 'images/projects/oil/luz2.png',
            category: 'pinturas'
        },
        {
            title: 'Mente Acústica Literal',
            description: 'Óleo sobre lienzo',
            image: 'images/projects/oil/menteacusticaliteral1.png',
            category: 'pinturas'
        },
        {
            title: 'Proceso I',
            description: 'Óleo sobre lienzo',
            image: 'images/projects/oil/proceso2.png',
            category: 'pinturas'
        },
        {
            title: 'Proceso II',
            description: 'Óleo sobre lienzo',
            image: 'images/projects/oil/proceso3.png',
            category: 'pinturas'
        },
        {
            title: 'Shejina',
            description: 'Óleo sobre lienzo',
            image: 'images/projects/oil/shejina.png',
            category: 'pinturas'
        },
        {
            title: 'Tres',
            description: 'Óleo sobre lienzo',
            image: 'images/projects/oil/tres1.png',
            category: 'pinturas'
        },
        {
            title: '291224',
            description: 'Óleo sobre lienzo',
            image: 'images/projects/oil/291224a.png',
            category: 'pinturas'
        },
        {
            title: '2911',
            description: 'Óleo sobre lienzo',
            image: 'images/projects/oil/2911a.png',
            category: 'pinturas'
        },
        // 3D Prints
        {
            title: 'Escultura Digital 1',
            description: 'Impresión 3D en PLA',
            image: 'images/projects/3dprinting/IMG_0864.JPG',
            category: '3d'
        },
        {
            title: 'Escultura Digital 2',
            description: 'Impresión 3D en PLA',
            image: 'images/projects/3dprinting/IMG_0869.JPG',
            category: '3d'
        },
        {
            title: 'Escultura Digital 3',
            description: 'Impresión 3D en PLA',
            image: 'images/projects/3dprinting/IMG_0943.jpg',
            category: '3d'
        },
        {
            title: 'Escultura Digital 4',
            description: 'Impresión 3D en PLA',
            image: 'images/projects/3dprinting/IMG_7883.JPG',
            category: '3d'
        },
        {
            title: 'Escultura Digital 5',
            description: 'Impresión 3D en PLA',
            image: 'images/projects/3dprinting/IMG_8631.JPG',
            category: '3d'
        },
        {
            title: 'Escultura Digital 6',
            description: 'Impresión 3D en PLA',
            image: 'images/projects/3dprinting/3955C791-B166-42B0-AA5B-065B6CBC2DC0.JPG',
            category: '3d'
        },
        {
            title: 'Escultura Digital 7',
            description: 'Impresión 3D en PLA',
            image: 'images/projects/3dprinting/87368654_498661417692348_2165792891719385088_o.jpg',
            category: '3d'
        }
    ];

    // Gallery functionality
    function createArtworkCard(artwork) {
        const card = document.createElement('div');
        card.className = 'artwork-card';
        card.dataset.category = artwork.category;
        card.innerHTML = `
            <div class="artwork-image">
                <img src="${artwork.image}" alt="${artwork.title}" loading="lazy">
            </div>
            <div class="artwork-info">
                <h3>${artwork.title}</h3>
                <p>${artwork.description}</p>
            </div>
        `;
        return card;
    }

    function filterGallery(category) {
        const galleryGrid = document.querySelector('.gallery-grid');
        const cards = document.querySelectorAll('.artwork-card');
        let hasVisibleCards = false;

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
            galleryGrid.appendChild(placeholder);
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

        // Add artwork cards
        artworks.forEach(artwork => {
            galleryGrid.appendChild(createArtworkCard(artwork));
        });
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
});
