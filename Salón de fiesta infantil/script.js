document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Handle window resize for responsive menu
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
    
    // Dropdown functionality
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            // Add dropdown menu functionality here if needed
        });
    }
    
    // Gallery modal functionality for all pages
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const modal = document.getElementById('gallery-modal');
    
    if (galleryItems.length > 0 && modal) {
        const modalImg = document.getElementById('modal-image');
        
        // Add click event to each gallery image
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                modal.style.display = 'flex';
                modalImg.src = this.src;
            });
        });
        
        // Close modal when clicking outside the image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Carousel and Gallery functionality for decoraciones.html
    if (document.querySelector('.gallery-section')) {
        // Variables para el carrusel
        const galleryItems = document.querySelectorAll('.gallery-item img');
        const fullImgBox = document.getElementById('fullImgBox');
        
        if (fullImgBox) {
            const fullImg = fullImgBox.querySelector('.galery-img');
            const closeBtn = document.getElementById('closeImg');
            const prevBtn = fullImgBox.querySelector('img[alt="prev-btn"]');
            const nextBtn = fullImgBox.querySelector('img[alt="next-btn"]');
            let currentIndex = 0;
            const images = [];
            
            // Recopilar todas las imágenes y sus rutas
            galleryItems.forEach((item, index) => {
                images.push({
                    src: item.src,
                    alt: item.alt
                });
                
                // Agregar evento de clic a cada imagen de la galería
                item.addEventListener('click', function() {
                    currentIndex = index;
                    // Asegurar que la imagen se muestre correctamente desde el primer clic
                    fullImg.style.maxWidth = '80%';
                    fullImg.style.maxHeight = '80vh';
                    updateCarouselImage();
                    fullImgBox.style.display = 'flex';
                });
            });
            
            // Función para actualizar la imagen del carrusel
            function updateCarouselImage() {
                // Asegurar que la imagen mantiene su tamaño correcto
                fullImg.src = images[currentIndex].src;
                fullImg.alt = images[currentIndex].alt;
                fullImg.style.maxWidth = '80%';
                fullImg.style.maxHeight = '80vh';
            }
            
            // Evento para el botón de cerrar
            closeBtn.addEventListener('click', function() {
                fullImgBox.style.display = 'none';
            });
            
            // Evento para el botón anterior
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateCarouselImage();
            });
            
            // Evento para el botón siguiente
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % images.length;
                updateCarouselImage();
            });
            
            // Cerrar el carrusel al hacer clic fuera de la imagen
            fullImgBox.addEventListener('click', function(e) {
                if (e.target === fullImgBox) {
                    fullImgBox.style.display = 'none';
                }
            });
            
            // Navegación con teclado cuando el carrusel está abierto
            document.addEventListener('keydown', function(e) {
                if (fullImgBox.style.display === 'flex') {
                    if (e.key === 'ArrowLeft') {
                        currentIndex = (currentIndex - 1 + images.length) % images.length;
                        updateCarouselImage();
                    } else if (e.key === 'ArrowRight') {
                        currentIndex = (currentIndex + 1) % images.length;
                        updateCarouselImage();
                    } else if (e.key === 'Escape') {
                        fullImgBox.style.display = 'none';
                    }
                }
            });
        }
        
        // Gallery modal functionality
        const modal = document.getElementById('gallery-modal');
        if (modal) {
            const modalImg = document.getElementById('modal-image');
            
            // Close modal when clicking outside the image
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    }
});