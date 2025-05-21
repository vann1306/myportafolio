document.addEventListener('DOMContentLoaded', () => {
  // Configuración del carrusel
  const carruseles = document.querySelectorAll('.carrusel');

  carruseles.forEach(carrusel => {
    carrusel.style.display = 'block';
    const interno = carrusel.querySelector('.carrusel-interno');
    const siguiente = carrusel.querySelector('.carrusel-btn.siguiente');
    const anterior = carrusel.querySelector('.carrusel-btn.anterior');
    const slides = interno.querySelectorAll('img');
    let index = 0;

    const slideWidth = slides[0].offsetWidth + parseInt(window.getComputedStyle(interno).gap);
    
    if (window.matchMedia('(max-width: 768px)').matches) {
      interno.style.overflowX = 'auto';
      interno.style.flexWrap = 'nowrap';
      interno.style.scrollSnapType = 'x mandatory';
      
      slides.forEach(img => {
        img.style.scrollSnapAlign = 'start';
      });
      
      siguiente.style.display = 'none';
      anterior.style.display = 'none';
    } else {
      siguiente.addEventListener('click', (e) => {
        e.stopPropagation(); // Previene que el evento llegue al carrusel
        if (index < slides.length - 1) {
          index++;
          interno.style.transform = `translateX(-${index * slideWidth}px)`;
        }
      });

      anterior.addEventListener('click', (e) => {
        e.stopPropagation(); // Previene que el evento llegue al carrusel
        if (index > 0) {
          index--;
          interno.style.transform = `translateX(-${index * slideWidth}px)`;
        }
      });
    }
  });

// Lightbox - Versión robusta
const images = document.querySelectorAll('.carrusel-interno img');
const lightbox = document.getElementById('lightbox');

if (!lightbox) {
  console.error('Error: No se encontró el lightbox en el DOM');
  return;
}

images.forEach(img => {
  img.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Actualizar contenido del lightbox
    document.getElementById('imagen-ampliada').src = this.src;
    document.getElementById('titulo-proyecto').textContent = 
      this.dataset.titulo || "Proyecto sin título";
    
    const descripcion = this.dataset.descripcion || "Descripción no disponible";
    const link = this.dataset.link ? 
      `<br><a href="${this.dataset.link}" target="_blank" class="drive-btn">Ver proyecto completo</a>` : '';
    
    document.getElementById('texto-descripcion').innerHTML = descripcion + link;
    
    // Mostrar lightbox
    lightbox.style.display = "block";
    document.body.style.overflow = "hidden";
  });
});

// Cerrar lightbox
document.querySelector('.cerrar-lightbox').addEventListener('click', function() {
  lightbox.style.display = "none";
  document.body.style.overflow = "auto";
});

// Cerrar al hacer clic fuera
lightbox.addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Cerrar con ESC
document.addEventListener('keydown', function(e) {
  if (e.key === "Escape" && lightbox.style.display === "block") {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

 
 
});