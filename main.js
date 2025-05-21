document.addEventListener('DOMContentLoaded', function() {
  // Función para inicializar un carrusel
  function initCarrusel(carrusel) {
    const carruselInterno = carrusel.querySelector('.carrusel-interno');
    const siguienteBtn = carrusel.querySelector('.siguiente');
    const anteriorBtn = carrusel.querySelector('.anterior');
    const imagenes = carrusel.querySelectorAll('img');
    let currentIndex = 0;
    const itemWidth = 300 + 20; // Ancho de imagen + gap
    
    function updateCarrusel() {
      carruselInterno.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
    
    siguienteBtn.addEventListener('click', () => {
      if (currentIndex < imagenes.length - 1) {
        currentIndex++;
        updateCarrusel();
      }
    });
    
    anteriorBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarrusel();
      }
    });
    
    // Para pantallas pequeñas
    if (window.matchMedia('(max-width: 768px)').matches) {
      carruselInterno.style.overflowX = 'auto';
      carruselInterno.style.flexWrap = 'nowrap';
      carruselInterno.style.scrollSnapType = 'x mandatory';
      
      imagenes.forEach(img => {
        img.style.scrollSnapAlign = 'start';
      });
      
      siguienteBtn.style.display = 'none';
      anteriorBtn.style.display = 'none';
    }
  }

  // Inicializar todos los carruseles
  document.querySelectorAll('.carrusel').forEach(initCarrusel);

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const imgAmpliada = document.getElementById('imagen-ampliada');
  const tituloProyecto = document.getElementById('titulo-proyecto');
  const textoDescripcion = document.getElementById('texto-descripcion');
  const cerrarLightbox = document.querySelector('.cerrar-lightbox');

  function openLightbox(imgElement) {
    imgAmpliada.src = imgElement.src;
    imgAmpliada.alt = imgElement.alt;
    tituloProyecto.textContent = imgElement.dataset.titulo || "Proyecto";
    
    const driveLink = imgElement.dataset.link;
    textoDescripcion.innerHTML = imgElement.dataset.descripcion + 
      (driveLink ? `<br><a href="${driveLink}" target="_blank" class="drive-btn">Ver más</a>` : "");
    
    lightbox.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }

  document.querySelectorAll('.carrusel').forEach(carrusel => {
    carrusel.addEventListener('click', (e) => {
      const img = e.target.closest('img');
      if (img && carrusel.contains(img)) {
        openLightbox(img);
      }
    });
  });

  cerrarLightbox.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && lightbox.style.display === "block") {
      closeLightbox();
    }
  });

  // Smooth scrolling para la navegación
  document.querySelectorAll('.navbar-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});