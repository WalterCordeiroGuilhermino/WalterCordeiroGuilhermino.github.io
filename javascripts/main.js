document.addEventListener('DOMContentLoaded', () => {
    const username = 'WalterCordeiroGuilhermino'; // Substitua pelo seu nome de usuário do GitHub
    const projectsList = document.getElementById('projects-list');
  
    async function fetchProjects() {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const projects = await response.json();
  
        projects.forEach(project => {
          // Filtra por repositórios com o tópico "portfolio"
          if (project.topics && project.topics.includes('portfolio')) {
            const projectElement = document.createElement('div');
            projectElement.className = 'card';
            projectElement.innerHTML = `
              <h3>${project.name}</h3>
              <p>${project.description || 'Sem descrição.'}</p>
              <a href="${project.html_url}" target="_blank">Ver no GitHub</a>
            `;
            projectsList.appendChild(projectElement);
          }
        });
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    }
  
    fetchProjects();
  });