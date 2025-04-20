document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll para Links de Navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Pesquisa de Comandos
    const searchInput = document.getElementById('command-search-input');
    const commandCards = document.querySelectorAll('.command-card');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        commandCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelectorAll('p').map(p => p.textContent.toLowerCase()).join(' ');
            if (title.includes(query) || description.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Animação de Entrada para Cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .command-card').forEach(card => {
        observer.observe(card);
    });
});
