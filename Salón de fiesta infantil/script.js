document.addEventListener('DOMContentLoaded', function() {
    // Configuración del Intersection Observer para efectos de aparición
    const fadeUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: dejar de observar el elemento una vez que ha aparecido
                // fadeUpObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // 10% del elemento visible
        rootMargin: '0px 0px -50px 0px' // Margen negativo para activar antes
    });
    
    // Seleccionar todos los elementos posteriores al hero que queremos animar
    const elementsToAnimate = document.querySelectorAll('.hero ~ section .section-title, .hero ~ section .service-card, .hero ~ section .gallery-item, .hero ~ section .why-choose-us-text, .hero ~ section .cta-text, .hero ~ section .consultation-form');
    
    // Aplicar la clase inicial y observar cada elemento
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-up-element');
        fadeUpObserver.observe(element);
    });
    //Configurar desplazamiento suave para los botones de presupuesto
    const presupuestoLinks = document.querySelectorAll('a[href="#consultation-form"]');
    const presupuestoButtons = document.querySelectorAll('.header-buttons .btn-primary');
    //Botón Ver galería en decoraciones.html
    const verGaleriaButton = document.querySelector('.hero-buttons .btn-dark');
    
    // Función para manejar el desplazamiento suave
    function smoothScrollToForm(e) {
        e.preventDefault();
        const targetElement = document.querySelector('.consultation-form');
        
        if (targetElement) {
            const offset = 80; // Offset para compensar el header fijo
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    }
    
    // Verificar si estamos en la página index.html
    const isIndexPage = window.location.pathname === '/' || 
                        window.location.pathname.endsWith('index.html') || 
                        window.location.pathname.endsWith('/');
    
    // Verificar si estamos en la página decoraciones.html
    const isDecoracionesPage = window.location.pathname.endsWith('decoraciones.html');
    
    // Agregar evento a los enlaces solo en la página index
    if (isIndexPage) {
        presupuestoLinks.forEach(link => {
            link.addEventListener('click', smoothScrollToForm);
        });
        
        // Agregar evento a los botones solo en la página index
        presupuestoButtons.forEach(button => {
            button.addEventListener('click', smoothScrollToForm);
        });
    }
    
    // Función para desplazamiento suave a la galería en decoraciones.html
    function smoothScrollToGallery(e) {
        e.preventDefault();
        const targetElement = document.querySelector('.gallery-section');
        
        if (targetElement) {
            const offset = 80; // Offset para compensar el header fijo
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    }
    
    // Agregar evento al botón Ver galería en la página decoraciones
    if (isDecoracionesPage && verGaleriaButton) {
        verGaleriaButton.addEventListener('click', smoothScrollToGallery);
    }
    
    // Alternar menú móvil
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            // Alternar clase para mostrar/ocultar el menú
            mainNav.classList.toggle('menu-active');
            // Alternar clase para el botón hamburguesa (animación)
            mobileMenuToggle.classList.toggle('active');
            // Prevenir scroll cuando el menú está abierto
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Manejar el cambio de tamaño de ventana para el menú responsive
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) {
            if (mainNav) {
                mainNav.classList.remove('menu-active');
                document.body.classList.remove('menu-open');
                mobileMenuToggle.classList.remove('active');
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

    // Descarga de pdf personalizado segun día e invitados
    document.getElementById('consultation-form').addEventListener('submit', function(event) {
        event.preventDefault();  
        // Obtener valores del formulario
        const fechaStr = document.getElementById('date').value;
        const adultos = parseInt(document.getElementById('adults').value, 10);
        const ninos = parseInt(document.getElementById('children').value, 10);
        
        // Convertir la fecha a objeto Date y obtener el día de la semana
        const fecha = new Date(fechaStr);
        const diaSemana = fecha.getDay(); 
        // getDay() devuelve: 0 (domingo), 1 (lunes), …, 6 (sábado)

        // Determinar si es día de semana o fin de semana
        // Día de semana: lunes (1) a jueves (4)
        // Fin de semana: viernes (5), sábado (6) y domingo (0)
        let periodo = '';
        if(diaSemana >= 1 && diaSemana <= 4) {
        periodo = 'Día_de_semana';
        } else {
        periodo = 'Fin_de_semana';
        }

        // Determinar nivel de invitados basado en niños o adultos
        // Nivel 1: hasta 15 niños o hasta 20 adultos
        // Nivel 2: entre 16 y 20 niños o entre 21 y 25 adultos
        // Nivel 3: entre 21 y 30 niños o entre 26 y 30 adultos (y si se excede, también se usa el nivel 3)
        let nivel = '';
        if(ninos >= 21 || adultos >= 26) {
        nivel = '30n-30a';
        } else if((ninos >= 16 && ninos <= 20) || (adultos >= 21 && adultos <= 25)) {
        nivel = '20n-25a';
        } else if(ninos <= 15 || adultos <= 20) {
        nivel = '15n-20a';
        } else {
          // Por defecto, si no se cumple ninguna condición anterior, se asigna nivel3
        nivel = '30n-30a';
        }

        // Construir la ruta del PDF según el período y nivel determinado.
        // Ejemplo de ruta: pdf/Día_de_semana_15n-20a.pdf o pdf/Fin_de_semana_30n-30a.pdf
        const pdfUrl = `pdf/${periodo}_${nivel}.pdf`;

        // Crear un elemento 'a' de forma dinámica para iniciar la descarga
        const a = document.createElement('a');
        a.href = pdfUrl;
        a.download = pdfUrl.substring(pdfUrl.lastIndexOf('/') + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});