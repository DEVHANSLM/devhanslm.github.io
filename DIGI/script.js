document.addEventListener('DOMContentLoaded', function() {
    const logoText = document.querySelector('.logo-text');
    const logoContainerRight = document.querySelector('.logo-container-right');

    logoContainerRight.addEventListener('mouseover', function() {
        logoText.classList.remove('fade-out');
        logoText.style.display = 'block'; // Asegúrate de que el texto esté visible al pasar el ratón
        logoText.classList.add('animation-complete'); // Para mantener el texto visible después de la animación
    });

    logoContainerRight.addEventListener('mouseout', function() {
        logoText.classList.add('fade-out');
        setTimeout(() => {
            logoText.style.display = 'none'; // Oculta el texto después de que se desvanece
            logoText.classList.remove('animation-complete'); // Quita la clase para reiniciar la animación
        }, 500); // Tiempo de espera para que coincida con la duración de la transición de desvanecimiento
    });
});