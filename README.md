# Portfólio · Walter Cordeiro Guilhermino

Site estático (HTML + CSS + JavaScript puro), publicado no GitHub Pages. Não precisa de build.

## Como os projetos aparecem

1. No repositório do projeto, adicione o tópico **`portfolio`** (engrenagem ⚙ ao lado de "About").
2. A **descrição** do repositório vira o texto do card.
3. O campo **Website** do repositório vira o botão "Ver demo" / "Abrir app" / "Ver dashboard".
4. **Capa**: coloque um `preview.png` ou `preview.jpg` na raiz (ou em `assets/`) do repositório.
   Sem imagem, o site usa a prévia automática que o GitHub gera.
5. Os outros tópicos (ex.: `python`, `power-bi`, `sql`) aparecem como tags e definem em qual
   **foco** o projeto sobe para o topo.

### Títulos
O nome do repositório é convertido automaticamente. Separadores aceitos: `-`, `_`, `.`, `+` e camelCase.
Siglas como SQL, BI, YOLO, PySpark e Power BI ficam com a grafia certa (lista `ACRONYMS` em `javascripts/main.js`).

### Textos extras (opcional): `data/projects.json`
Para mostrar "problema resolvido", "resultado", ordem fixa ou título manual, adicione uma entrada com o
nome exato do repositório (veja o exemplo dentro do arquivo). Campos terminados em `_en` (`title_en`,
`problem_en`, `result_en`) aparecem na versão em inglês. Só use métricas reais.

## Foco do portfólio
Botões **Tech** (padrão) e **Negócios** mudam o título do topo, a ordem dos projetos, o destaque da stack e o
currículo para download. Textos e tópicos de cada foco ficam no objeto `MODES` em `javascripts/main.js`.

## Idioma
O botão **EN/PT** troca a página entre português e inglês. O português fica no `index.html`; o inglês fica
no objeto `I18N_EN` em `javascripts/main.js` (mesma chave do atributo `data-i18n`).
A descrição dos projetos vem do GitHub; para traduzir, use os campos `_en` do `data/projects.json`.

## Links para candidaturas
- `https://waltercordeiroguilhermino.github.io/?foco=tech`
- `https://waltercordeiroguilhermino.github.io/?foco=negocios`
- `https://waltercordeiroguilhermino.github.io/?foco=tech&lang=en` (vagas em inglês)

## Currículo
Coloque os PDFs em `assets/` (todos opcionais; se nenhum existir, o botão de download não aparece):

| Foco | Português | Inglês |
|---|---|---|
| Tech | `curriculo-tech.pdf` | `resume-tech-en.pdf` |
| Negócios | `curriculo-negocios.pdf` | `resume-business-en.pdf` |
| Reserva | `curriculo.pdf` | `resume-en.pdf` |

## Tema
Claro/escuro segue o sistema do visitante na primeira visita e depois lembra a escolha.
