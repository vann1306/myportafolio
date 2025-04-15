document.addEventListener('DOMContentLoaded', function() {

    const pestanaBtns = document.querySelectorAll('.pestana-btn');
    const carruseles = document.querySelectorAll('.carrusel');
   
    pestanaBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remover clase activa de todos los botones y carruseles
        pestanaBtns.forEach(b => b.classList.remove('activo'));
        carruseles.forEach(c => c.classList.remove('activo'));
       

        btn.classList.add('activo');
       

        const carruselId = btn.getAttribute('data-carrusel');
        document.getElementById(carruselId).classList.add('activo');
      });
    });
  
  
  
   const carruselInternos = document.querySelectorAll('.carrusel-interno');
   
    carruselInternos.forEach(carrusel => {
      const siguienteBtn = carrusel.parentElement.querySelector('.siguiente');
      const anteriorBtn = carrusel.parentElement.querySelector('.anterior');
      const imagenes = carrusel.querySelectorAll('img');
      let currentIndex = 0;
      const itemWidth = 300 + 20; // Ancho de imagen + gap
     
      function updateCarrusel() {
        carrusel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
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
        carrusel.style.overflowX = 'auto';
        carrusel.style.flexWrap = 'nowrap';
        carrusel.style.scrollSnapType = 'x mandatory';
       
        imagenes.forEach(img => {
          img.style.scrollSnapAlign = 'start';
        });
       
        siguienteBtn.style.display = 'none';
        anteriorBtn.style.display = 'none';
      }
    });
  
  
  
  
   
    const lightbox = document.getElementById('lightbox');
    const imgAmpliada = document.getElementById('imagen-ampliada');
    const tituloProyecto = document.getElementById('titulo-proyecto');
    const textoDescripcion = document.getElementById('texto-descripcion');
    const cerrarLightbox = document.querySelector('.cerrar-lightbox');
  
  
  

    function openLightbox(imgElement) {
      imgAmpliada.src = imgElement.src;
      imgAmpliada.alt = imgElement.alt;
      tituloProyecto.textContent = imgElement.dataset.titulo || "Proyecto";
      textoDescripcion.textContent = imgElement.dataset.descripcion || "Descripción no disponible";
      lightbox.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  
  
  
  
    function closeLightbox() {
      lightbox.style.display = "none";
      document.body.style.overflow = "auto";
    }
  
  
  
  
  
    document.querySelectorAll('.carrusel-interno img').forEach(img => {
      img.style.cursor = 'pointer'; // Cambia el cursor al pasar sobre imágenes
     
      img.addEventListener('click', function() {
        openLightbox(this); // 'this' es la imagen clickeada
      });
    });
  
  
  
  

    cerrarLightbox.addEventListener('click', closeLightbox);
  
  
  
  

    lightbox.addEventListener('click', function(e) {
      if (e.target === this) { // Si se hizo clic en el fondo (no en la imagen)
        closeLightbox();
      }
    });
  
  
  
  
    // Evento para cerrar con la tecla ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === "Escape" && lightbox.style.display === "block") {
        closeLightbox();
      }
    });
  });
  
  
