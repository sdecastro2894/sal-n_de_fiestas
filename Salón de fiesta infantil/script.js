document.addEventListener('DOMContentLoaded', function() {
    // Alternar menú móvil
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Manejar el cambio de tamaño de ventana para el menú responsive
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            if (mainNav) {
                mainNav.style.display = 'flex';
            }
        } else {
            if (mainNav) {
                mainNav.style.display = 'none';
            }
        }
    });
    
    // Funcionalidad del menú desplegable
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            // Agregar funcionalidad del menú desplegable aquí si es necesario
        });
    }
    
    // Funcionalidad unificada para galerías y carruseles
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const modal = document.getElementById('gallery-modal');
    const fullImgBox = document.getElementById('fullImgBox');
    
    // Función genérica para cerrar modales al hacer clic fuera
    function setupModalClosing(modalElement) {
        if (modalElement) {
            modalElement.addEventListener('click', function(e) {
                if (e.target === modalElement) {
                    modalElement.style.display = 'none';
                }
            });
        }
    }
    
    // Configurar cierre para ambos tipos de modales
    setupModalClosing(modal);
    setupModalClosing(fullImgBox);
    
    // Funcionalidad del modal de galería para todas las páginas
    if (galleryItems.length > 0 && modal) {
        const modalImg = document.getElementById('modal-image');
        // La funcionalidad de cierre ya está configurada por setupModalClosing
    }

    // Funcionalidad del carrusel y galería para decoraciones.html
    if (document.querySelector('.gallery-section') && fullImgBox) {
        const fullImg = fullImgBox.querySelector('.galery-img');
        const closeBtn = document.getElementById('closeImg');
        const prevBtn = fullImgBox.querySelector('img[alt="prev-btn"]');
        const nextBtn = fullImgBox.querySelector('img[alt="next-btn"]');
        let currentIndex = 0;
        const images = [];
        
        // Función para actualizar la imagen del carrusel
        function updateCarouselImage() {
            if (fullImg && images.length > 0) {
                fullImg.src = images[currentIndex].src;
                fullImg.alt = images[currentIndex].alt;
                fullImg.style.maxWidth = '80%';
                fullImg.style.maxHeight = '80vh';
            }
        }
        
        // Función para navegar por las imágenes
        function navigateCarousel(direction) {
            if (images.length > 0) {
                currentIndex = (currentIndex + direction + images.length) % images.length;
                updateCarouselImage();
            }
        }
        
        // Recopilar todas las imágenes y sus rutas
        galleryItems.forEach((item, index) => {
            images.push({
                src: item.src,
                alt: item.alt
            });
            
            // Agregar evento de clic a cada imagen de la galería
            item.addEventListener('click', function() {
                currentIndex = index;
                updateCarouselImage();
                if (fullImgBox) fullImgBox.style.display = 'flex';
            });
        });
        
        // Evento para el botón de cerrar
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                fullImgBox.style.display = 'none';
            });
        }
        
        // Eventos para navegación
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                navigateCarousel(-1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                navigateCarousel(1);
            });
        }
        
        // Navegación con teclado cuando el carrusel está abierto
        document.addEventListener('keydown', function(e) {
            if (fullImgBox && fullImgBox.style.display === 'flex') {
                if (e.key === 'ArrowLeft') {
                    navigateCarousel(-1);
                } else if (e.key === 'ArrowRight') {
                    navigateCarousel(1);
                } else if (e.key === 'Escape') {
                    fullImgBox.style.display = 'none';
                }
            }
        });
    }
});