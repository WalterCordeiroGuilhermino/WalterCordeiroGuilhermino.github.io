document.addEventListener('DOMContentLoaded', async () => {
  const username = 'WalterCordeiroGuilhermino';
  const projectsList = document.getElementById('projects-list');
  
  const config = {
    defaultImage: 'https://WalterCordeiroGuilhermino.github.io/assets/default-preview.jpg',
    portfolioTopic: 'portfolio',
    maxProjects: 6
  };

  // 1. Verificador de imagem melhorado com timeout
  async function checkImageExists(url) {
    try {
      if (url.startsWith('assets/')) {
        // Para imagens locais
        const img = new Image();
        img.src = url;
        await new Promise((resolve, reject) => {
          const timer = setTimeout(() => reject(new Error('Timeout')), 3000);
          img.onload = () => {
            clearTimeout(timer);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timer);
            reject();
          };
        });
        return true;
      } else {
        // Para imagens remotas
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        const res = await fetch(url, { 
          method: 'HEAD', 
          cache: 'no-cache',
          signal: controller.signal 
        });
        clearTimeout(timeoutId);
        return res.ok;
      }
    } catch {
      return false;
    }
  }

  // 3. Cache de verificação de imagens
  const imageCache = new Map();

  async function findProjectImage(repo) {
    const cacheKey = `image-${repo.name}`;
    
    // Verifica se já temos no cache
    if (imageCache.has(cacheKey)) {
      return imageCache.get(cacheKey);
    }
    
    // 1. Tenta imagem local primeiro
    const localImage = `assets/${repo.name}.jpg`;
    if (await checkImageExists(localImage)) {
      imageCache.set(cacheKey, localImage);
      return localImage;
    }
    
    // 2. Tenta várias combinações no GitHub
    const branches = ['main', 'master'];
    const paths = ['/assets/preview.jpg', '/preview.jpg', '/screenshot.jpg'];
    
    for (const branch of branches) {
      for (const path of paths) {
        const imageUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/${branch}${path}`;
        if (await checkImageExists(imageUrl)) {
          imageCache.set(cacheKey, imageUrl);
          return imageUrl;
        }
      }
    }
    
    // 5. Fallback padrão com verificação
    const defaultExists = await checkImageExists(config.defaultImage);
    const fallback = defaultExists ? config.defaultImage : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCA0MDAgMzAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWEzYTVhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iI2FiY2RlZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+UHJldmlldyBObyBEaXNwb25pdmVsPC90ZXh0Pjwvc3ZnPg';
    
    imageCache.set(cacheKey, fallback);
    return fallback;
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
      color: #ABCDEE;
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