/**
 * Dynamické načítání profilových dat z profile.json
 * Michal Bartoš - IT Profil
 */

document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.querySelector('#name');
    const skillsList = document.querySelector('#skills');
    const interestsContainer = document.querySelector('#interests');
    const projectsContainer = document.querySelector('#projects');
    const errorMessage = document.querySelector('#error-message');

    // Načtení dat pomocí fetch
    fetch('profile.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Chyba při stahování profile.json');
            }
            return response.json();
        })
        .then(data => {
            renderProfile(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            showError();
        });

    /**
     * Vykreslí data do HTML
     * @param {Object} data 
     */
    function renderProfile(data) {
        // 1. Jméno
        nameElement.textContent = data.name;

        // 2. Dovednosti (skills)
        data.skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillsList.appendChild(li);
        });

        // 3. Zájmy (interests)
        if (data.interests) {
            const p = document.createElement('p');
            p.textContent = data.interests.join(', ');
            interestsContainer.appendChild(p);
        }

        // 4. Projekty (projekty) - Bonus
        if (data.projects) {
            data.projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';

                const title = document.createElement('h3');
                title.textContent = project.title;

                const desc = document.createElement('p');
                desc.textContent = project.description;

                const tech = document.createElement('span');
                tech.className = 'tech-tag';
                tech.textContent = project.tech;

                projectCard.appendChild(title);
                projectCard.appendChild(desc);
                projectCard.appendChild(tech);
                projectsContainer.appendChild(projectCard);
            });
        }
    }

    /**
     * Zobrazí chybovou hlášku
     */
    function showError() {
        nameElement.textContent = 'Chyba';
        errorMessage.style.display = 'block';
    }
});
