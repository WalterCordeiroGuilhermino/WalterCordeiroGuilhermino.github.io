document.addEventListener('DOMContentLoaded', async () => {
  const username = 'WalterCordeiroGuilhermino';
  const projectsList = document.getElementById('projects-list');

  const config = {
    defaultImage: 'assets/default-preview.jpg',
    portfolioTopic: 'portfolio',
    maxProjects: 6
  };

  // Verificador de imagem melhorado
  async function checkImageExists(url) {
    try {
      if (url.startsWith('assets/')) {
        // Para imagens locais
        const img = new Image();
        img.src = url;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        return true;
      } else {
        // Para imagens remotas
        const res = await fetch(url, { method: 'HEAD', cache: 'no-cache' });
        return res.ok;
      }
    } catch {
      return false;
    }
  }

  async function findProjectImage(repo) {
    // 1. Tenta imagem local primeiro
    const localImage = `assets/${repo.name}.jpg`;
    if (await checkImageExists(localImage)) return localImage;

    // 2. Tenta várias combinações no GitHub
    const branches = ['main', 'master'];
    const paths = ['/assets/preview.jpg', '/preview.jpg', '/screenshot.jpg'];

    for (const branch of branches) {
      for (const path of paths) {
        const imageUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/${branch}${path}`;
        if (await checkImageExists(imageUrl)) return imageUrl;
      }
    }

    // 3. Fallback padrão
    return config.defaultImage;
  }

  function formatProjectName(name) {
    return name
      .replace(/-/g, ' ')
      .replace(/(?:^|\s)\S/g, a => a.toUpperCase());
  }

  async function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    const imageUrl = await findProjectImage(project);
    const hasDemo = project.homepage && !project.homepage.includes('github.io');

    card.innerHTML = `
      <div class="project-image">
        <img src="${imageUrl}"
             alt="${project.name}"
             loading="lazy"
             onerror="this.style.display='none'">
      </div>
      <div class="project-content">
        <h3>${formatProjectName(project.name)}</h3>
        <p>${project.description || 'Projeto desenvolvido como parte do meu portfólio.'}</p>
        ${project.topics?.length ? `
        <ul class="project-techs">
          ${project.topics
            .filter(t => t !== config.portfolioTopic)
            .map(tech => `<li>${tech}</li>`)
            .join('')}
        </ul>` : ''}
        <div class="project-links">
          <a href="${project.html_url}" target="_blank">
            <i class="fab fa-github"></i> Código
          </a>
          ${hasDemo ? `
          <a href="${project.homepage}" target="_blank">
            <i class="fas fa-external-link-alt"></i> Demo
          </a>` : ''}
        </div>
      </div>
    `;

    return card;
  }

  async function loadProjects() {
    try {
      projectsList.innerHTML = '<div class="loading">Carregando projetos...</div>';

      // API com ordenação por data de push (mais recente primeiro)
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=100`);
      const repos = await response.json();

      const portfolioProjects = repos
        .filter(repo =>
          !repo.fork &&
          repo.topics?.includes(config.portfolioTopic))
        .slice(0, config.maxProjects);

      if (!portfolioProjects.length) {
        projectsList.innerHTML = `
          <div class="no-projects">
            Nenhum projeto encontrado. Verifique <a href="https://github.com/${username}" target="_blank">meu GitHub</a>.
          </div>
        `;
        return;
      }

      projectsList.innerHTML = '';
      for (const project of portfolioProjects) {
        projectsList.appendChild(await createProjectCard(project));
      }

    } catch (error) {
      console.error('Erro:', error);
      projectsList.innerHTML = `
        <div class="error">
          Erro ao carregar projetos. Recarregue a página ou visite
          <a href="https://github.com/${username}" target="_blank">meu GitHub</a>.
        </div>
      `;
    }
  }

  // Estilos para os estados de carregamento
  const style = document.createElement('style');
  style.textContent = `
    .loading, .no-projects, .error {
      grid-column: 1 / -1;
      text-align: center;
      padding: 2rem;
      color: #B0C4DE;
    }
    .project-image {
      background-color: #1a3a5a;
      position: relative;
    }
    .project-image:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #183253 0%, #1a3a5a 100%);
      z-index: 1;
    }
    .project-image img {
      position: relative;
      z-index: 2;
    }
  `;
  document.head.appendChild(style);

  loadProjects();
});