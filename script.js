document.addEventListener('DOMContentLoaded', () => {
    // Este evento se dispara cuando todo el DOM (estructura HTML) ha sido completamente cargado y parseado.
    // Es el lugar seguro para comenzar a manipular el DOM con JavaScript.

    // --- Cargar y mostrar las tarjetas de problemas desde data.json ---
    // Realiza una petición para obtener el archivo 'data.json'
    fetch('data.json')
        .then(response => response.json()) // Cuando la respuesta llega, la convierte a un objeto JavaScript (JSON)
        .then(data => {
            // Una vez que los datos JSON se han parseado, esta función se ejecuta.
            const contenedorTarjetasProblema = document.querySelector('.tarjetas-problemas'); // Selecciona el div donde se insertarán las tarjetas

            // Itera sobre cada objeto (problema) en el array 'data'
            data.forEach((problema, inicio) => {
                const tarjeta = document.createElement('div'); // Crea un nuevo elemento div para cada tarjeta
                tarjeta.classList.add('tarjeta-problema'); // Añade la clase CSS para aplicar los estilos de tarjeta

                // Construye el contenido HTML de cada tarjeta usando las propiedades del objeto 'problema'
                tarjeta.innerHTML = `
                    <h3>${problema.title}</h3>
                    <img src="${problema.image}" alt="${problema.title}">
                    <p><strong>Descripción:</strong> ${problema.description}</p>
                    <p><strong>Impacto:</strong> ${problema.impact}</p>
                    <p><strong>Acción:</strong> ${problema.callToAction}</p>
                `;
                contenedorTarjetasProblema.appendChild(tarjeta); // Añade la tarjeta creada al contenedor en el HTML

                // Anima la entrada de cada tarjeta con un ligero retraso
                // Esto crea un efecto escalonado donde las tarjetas aparecen una tras otra.
                setTimeout(() => {
                    tarjeta.style.opacity = '1'; // Hace la tarjeta visible
                    tarjeta.style.transform = 'translateY(0)'; // La mueve a su posición final (sin desplazamiento)
                }, inicio * 150); // El retraso aumenta para cada tarjeta (0ms, 150ms, 300ms, etc.)
            });
        })
        .catch(error => console.error('Error al cargar los datos de los problemas:', error)); // Captura cualquier error durante la carga

    // --- Intersection Observer para animaciones al hacer scroll ---
    // Esto permite detectar cuándo un elemento entra o sale del viewport (área visible de la ventana).
    const seccion = document.querySelectorAll('section'); // Selecciona todas las etiquetas <section> de la página

    // Opciones para el Intersection Observer
    const obsOpciones = {
        root: null, // El root es el viewport (la ventana del navegador)
        rootMargin: '0px', // No hay margen adicional alrededor del root
        threshold: 0.2 // El callback se ejecutará cuando el 20% de la sección sea visible
    };

    // Crea una nueva instancia de Intersection Observer
    const obs = new IntersectionObserver((entries, observer) => {
        // 'entries' es un array de objetos IntersectionObserverEntry, uno por cada elemento observado.
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si la sección está intersectando (es decir, es visible en el viewport)
                if (entry.target.id === 'heroe') { // Si es la sección del héroe
                    entry.target.classList.add('fade-in'); // Aplica la animación fade-in
                } else {
                    // Para las demás secciones
                    entry.target.classList.add('slide-up'); // Aplica la animación slide-up
                }
                observer.unobserve(entry.target); // Deja de observar este elemento una vez que se ha animado
            }
        });
    }, obsOpciones); // Pasa las opciones definidas anteriormente

    // Itera sobre cada sección y le pide al observer que la observe
    seccion.forEach(seccIon => {
        obs.observe(seccIon);
    });

    // --- Desplazamiento suave para los enlaces de navegación ---
    // Selecciona todos los enlaces dentro de la etiqueta <nav>
    documento.querySelectorAll('nav a').forEach(anchor => {
        // Añade un 'event listener' para el evento 'click' a cada enlace
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previene el comportamiento por defecto del enlace (que sería un salto brusco)

            // Obtiene el ID del destino del enlace (por ejemplo, "#sobre", "#problemas")
            // Y desplaza la vista a ese elemento con un comportamiento suave
            documento.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth' // Hace que el desplazamiento sea suave y animado
            });
        });
    });
});