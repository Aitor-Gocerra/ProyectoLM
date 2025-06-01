document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const issueCardsContainer = document.querySelector('.issue-cards');
            data.forEach(issue => {
                const card = document.createElement('div');
                card.classList.add('issue-card');

                card.innerHTML = `
                    <h3>${issue.title}</h3>
                    <img src="${issue.image}" alt="${issue.title}" style="max-width: 100%; height: auto; margin-bottom: 15px;">
                    <p><strong>Descripción:</strong> ${issue.description}</p>
                    <p><strong>Impacto:</strong> ${issue.impact}</p>
                    <p><strong>Acción:</strong> ${issue.callToAction}</p>
                `;
                issueCardsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error al cargar los datos de los problemas:', error));
});