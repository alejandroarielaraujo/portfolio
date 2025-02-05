// script.js
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

       
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Animación de la barra del loader
gsap.to(".loader-bar", {
    scaleX: 0, // Reduce la escala de la barra a 0 (hace que desaparezca)
    duration: .4,
    ease: "power2.inOut", // Se aplica el easing a esta animación
    onComplete: () => {
        // Al finalizar la animación de la barra, ocultamos el loader
        gsap.to(".loader", {            
            duration: 0, // Tiempo para desvanecerse            
            onComplete: () => {
                // El loader ya no será visible, se puede quitar completamente
                document.querySelector(".loader").style.display = "none";
            }
        });
    }
});


gsap.from(".logo", {
    rotate: 720,
    x: 400,
    y: 200,
    scale: 20,
    duration: 1.5,
    ease: "bounce.out",
})

gsap.from(".navbar-links li", {
    y: -100,
    ease: "power3.out",
    duration: 1,
    stagger: .1,
})






let btnEs = document.getElementById('btn-es');
let btnEn = document.getElementById('btn-en');

// Evento para cambiar entre las imágenes cuando se hace clic
btnEs.addEventListener('click', () => {
    // Ocultar la imagen de español y mostrar la de inglés
    btnEs.style.display = 'none';
    btnEn.style.display = 'block';
});

btnEn.addEventListener('click', () => {
    // Ocultar la imagen de inglés y mostrar la de español
    btnEn.style.display = 'none';
    btnEs.style.display = 'block';
});












let toggle = document.getElementById('toggle');
let label_toggle = document.getElementById('label_toggle'); // Usamos 'label_toggle' para cambiar el icono

toggle.addEventListener('change', (e) => {
    let checked = e.target.checked;
    document.body.classList.toggle('light', checked);
    if (checked) {
        label_toggle.innerHTML = '<i class="fa-solid fa-moon"></i>'; // Cambia el icono a la luna
    } else {
        label_toggle.innerHTML = '<i class="fa-solid fa-sun"></i>'; // Cambia el icono al sol
    }
});




/* HIGHLIGHT ACTIVE SECTION LINK */

document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const link = document.querySelector(`a[href="#${entry.target.id}"]`);
            if (entry.isIntersecting) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }, {
        threshold: 0.5, // We need at least 50% of the section to be visible.     
    });
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});





gsap.from(".avatar", {
    scale: 0.5,
    opacity: 0,
    duration: 1,
    ease: "power3.inout",
});




const swiper = new Swiper('.swiper', {
    // Optional parameters    
    loop: false,
    slidesPerView: 'auto',
    spaceBetween: 33,
    centeredSlides: true,
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
        init: function(){
            const videos = document.querySelectorAll('video');
            const activeIndex = this.realIndex;
            const activeSlide = document.getElementsByClassName('swiper-slide')[activeIndex];
            const activeVideo = activeSlide.getElementsByTagName('video')[0];
            activeVideo.muted = true;
            Array.prototype.forEach.call(videos, function(video){
                video.pause();
                video.currentTime = 0;
            })
            activeVideo.play();
        },
        slideChange: function(){
            const videos = document.querySelectorAll('video');
            const activeIndex = this.realIndex;
            const activeSlide = document.getElementsByClassName('swiper-slide')[activeIndex];
            const activeVideo = activeSlide.getElementsByTagName('video')[0];
            activeVideo.muted = true;
            Array.prototype.forEach.call(videos, function(video){
                video.pause();
                video.currentTime = 0;
            })
            activeVideo.play();
        },
    },

});







// Seleccionamos el botón y el tooltip
const mailBtn = document.getElementById('mailBtn');
const tooltip = document.getElementById('tooltip');

// La dirección de correo que se copiará
const emailAddress = 'momorex3@gmail.com';

// Agregamos el evento de clic
mailBtn.addEventListener('click', function() {
    // Crear un input temporal para copiar el texto al portapapeles
    const tempInput = document.createElement('input');
    tempInput.value = emailAddress;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Cambiar el texto del tooltip
    tooltip.textContent = emailAddress; // Muestra la dirección copiada en el tooltip
});


// Seleccionamos los botones y los tooltips
const whatsappBtn = document.getElementById('whatsappBtn');
const tooltipWhatsapp = document.getElementById('tooltipWhatsapp');

// El número de WhatsApp que se copiará
const whatsappNumber = '+54 261 5673399';

// Agregamos el evento de clic al ícono de WhatsApp
whatsappBtn.addEventListener('click', function() {
    // Crear un input temporal para copiar el texto al portapapeles
    const tempInput = document.createElement('input');
    tempInput.value = whatsappNumber;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Cambiar el texto del tooltip
    tooltipWhatsapp.textContent = whatsappNumber; // Muestra el número copiado en el tooltip
});





const langButtons = document.querySelectorAll("[data-language]");
const textsToChange = document.querySelectorAll("[data-section]");
const downloadCvButton = document.getElementById('downloadCvButton');

langButtons.forEach((button) => {
    button.addEventListener("click", () => {
        fetch(`languages/${button.dataset.language}.json`)
            .then(res => res.json())
            .then(data => {
                // Cambia el contenido de texto según el idioma seleccionado
                textsToChange.forEach((el) => {
                    const section = el.dataset.section;
                    const value = el.dataset.value;
                    el.innerHTML = data[section][value];
                });

                // Cambia el enlace del botón de ver CV dependiendo del idioma
                if (button.dataset.language === 'es') {
                    downloadCvButton.onclick = function() {
                        window.open('docs/CurriculumVitae-AlejandroAraujo-ES.pdf', '_blank');
                    };
                } else if (button.dataset.language === 'en') {
                    downloadCvButton.onclick = function() {
                        window.open('docs/Resume-AlejandroAraujo-EN.pdf', '_blank');
                    };
                }
            })
            .catch(error => console.error('Error fetching the JSON:', error));
    });
});

