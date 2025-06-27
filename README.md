# Documentação do Projeto `novo-site-homolog`

Este documento detalha a estrutura, funcionalidades e tecnologias utilizadas no projeto `novo-site-homolog`, um website desenvolvido para a Homolog Solar.

## 1. Visão Geral do Projeto

O projeto `novo-site-homolog` é um website estático focado em captação de leads para a Homolog Solar, uma empresa especializada em homologação de projetos de energia solar no Nordeste do Brasil. O site apresenta os benefícios do serviço, o processo de homologação, depoimentos de clientes, e informações de contato. Ele utiliza HTML para a estrutura, CSS para estilização e Bootstrap para responsividade e componentes de UI.

## 2. Estrutura de Arquivos

O repositório possui a seguinte estrutura de diretórios e arquivos:

```
novo-site-homolog/
├── LICENSE
├── README.md
├── index.html
├── obrigado.html
├── src/
│   └── imagens/
│       ├── Alagoas.webp
│       ├── Bahia.webp
│       ├── Ceara.webp
│       ├── Paraiba.webp
│       ├── Pernambuco.webp
│       ├── RN.webp
│       ├── celpe-logo.webp
│       ├── coelba-logo.webp
│       ├── cosern-logo.webp
│       ├── depoimento-heverton-paz-lottus.webp
│       ├── depoimento-paulo-Amaral.webp
│       ├── depoimento-roberto-lima.webp
│       ├── depoimento-sol-do-nordeste.webp
│       ├── enel-logo.webp
│       ├── energisa-logo.webp
│       ├── equatorial--600.webp
│       ├── homolog-icon.webp
│       ├── integrador.webp
│       ├── mascote-homolog.webp
│       └── usinasolar.webp
└── styles/
    └── styles.css
```

### Descrição dos Arquivos e Diretórios Principais:

*   `LICENSE`: Arquivo de licença do projeto (MIT License).
*   `README.md`: Arquivo README do repositório, contendo uma breve descrição do projeto.
*   `index.html`: A página principal do website, contendo a maior parte do conteúdo e o formulário de contato.
*   `obrigado.html`: Uma página de agradecimento exibida após o envio bem-sucedido do formulário de contato.
*   `src/`: Diretório que contém recursos do site.
    *   `imagens/`: Contém todas as imagens utilizadas no site, incluindo logos de concessionárias, ícones, e imagens de depoimentos.
*   `styles/`: Diretório que contém os arquivos de estilo CSS.
    *   `styles.css`: O arquivo CSS principal que define a estilização personalizada do site, complementando o Bootstrap.

## 3. Análise de Código e Funcionalidades

### 3.1. `index.html`

Esta é a página de entrada do site. Suas principais seções e funcionalidades incluem:

*   **Meta Tags e SEO:** Configurações de `meta` tags para SEO, incluindo `description`, `keywords`, `robots`, `canonical`, e Open Graph (`og:`) e Twitter Card (`twitter:`) para compartilhamento em redes sociais.
*   **Favicon e Ícones Apple Touch:** Links para ícones do site em diferentes formatos e para dispositivos Apple.
*   **Bibliotecas Externas:**
    *   `normalize.min.css`: Para normalização de estilos CSS entre navegadores.
    *   `bootstrap.min.css`: Framework CSS Bootstrap para design responsivo e componentes de UI.
    *   `bootstrap-icons.min.css`: Biblioteca de ícones do Bootstrap.
    *   `Ubuntu` font do Google Fonts.
*   **Pixel do Facebook (Meta Pixel):** Código JavaScript para rastreamento de eventos e page views para campanhas de marketing no Facebook/Instagram.
*   **Google Tag (gtag.js):** Código JavaScript para integração com o Google Analytics e Google Ads, rastreando conversões (especificamente o evento `entrou em contato`).
*   **Estrutura da Página:**
    *   **Header:** Contém a barra de navegação (`navbar`) com links para seções da página (`#beneficios`, `#processo`, `#depoimentos`, `#FAQ`) e um botão de contato para WhatsApp.
    *   **Main Content (`<main>`):**
        *   **Hero Section (`#hero`):** Seção de destaque com título, subtítulo e um formulário de contato para captação de leads. Inclui uma imagem de mascote e um background com imagem de usina solar.
        *   **Benefícios (`#beneficios`, `#boxbeneficios`):** Descreve o problema que a Homolog Solar resolve (o Custo da Espera) e apresenta a solução da Homolog Solar.
        *   **Depoimentos (`#depoimentos`, `#depoimentoUm`):** Exibe depoimentos de clientes satisfeitos, com imagens.
        *   **Concessionárias (`#concessionarias`):** Lista as principais concessionárias de energia do Nordeste com as quais a Homolog Solar trabalha, juntamente com estatísticas de experiência e projetos aprovados.
        *   **Processo (`#processo`, `#boxprocesso`):** Detalha o processo simplificado de homologação da Homolog Solar.
        *   **FAQ (`#FAQ`, `#boxFAQ`):** Seção de Perguntas Frequentes com respostas em um formato de acordeão.
        *   **Contato (`#contato`):** Seção final com informações de contato e um formulário (embora o formulário principal esteja na seção Hero).
*   **Footer:** Contém links úteis, informações de contato (email, telefone) e links para redes sociais (LinkedIn, Instagram, WhatsApp).
*   **Botão Flutuante do WhatsApp (`#whatsapp-float`):** Um botão de WhatsApp fixo na parte inferior direita da tela para contato rápido.

### 3.2. `obrigado.html`

Esta página é uma confirmação de envio do formulário. Ela possui:

*   **Meta Tags:** Configurações básicas de `meta` tags, com `noindex, nofollow` para evitar indexação por motores de busca.
*   **Bibliotecas Externas:** As mesmas do `index.html` (Normalize, Bootstrap, Bootstrap Icons).
*   **Google Tag (gtag.js):** Para rastreamento de conversões.
*   **Estrutura da Página:**
    *   **Header:** Similar ao `index.html`, mas com links de navegação apontando para seções específicas do `index.html`.
    *   **Main Content (`<main>`):** Uma mensagem de agradecimento, confirmando o recebimento das informações e informando sobre o próximo contato. Inclui um ícone de check e um botão para retornar à página inicial.
    *   **Footer:** Idêntico ao `index.html`.

### 3.3. `styles/styles.css`

Este arquivo CSS é responsável pela estilização visual do site, utilizando variáveis CSS para cores e fontes, e complementando o framework Bootstrap. Pontos chave incluem:

*   **Variáveis Globais:** Definição de cores (`--neutral-100`, `--neutral-500`, `--blue-light`, `--blue-base`, `--blue-darker`, `--yellow-base`, `--yellow-dark`, `--yellow-darker`, `--warning`) e fontes (`--ubuntu`).
*   **Estilos Base:** Reset de estilos, comportamento de scroll suave, fonte padrão e cores de texto.
*   **Estilos de Botões:** Estilização personalizada para botões, incluindo efeitos de hover e active com transformações e sombras.
*   **Animações e Efeitos:** Animações 3D para seções da `main` ao rolar a página (`show-3d`), e elementos flutuantes (`boxfloat1` a `boxfloat4`) para design visual. Animação de 


bounce para o botão flutuante do WhatsApp.
*   **Componentes Específicos:** Estilização do cabeçalho (`header`), barra de navegação (`navbar`), seção hero (`#hero`), formulário (`#form`), mascote (`#mascote`), seções de benefícios, processo, depoimentos, FAQ, contato e rodapé (`footer`).
*   **Responsividade:** Media queries (`@media`) para adaptar o layout e a estilização do site para diferentes tamanhos de tela (tablets, desktops menores, celulares maiores e celulares pequenos), garantindo uma experiência de usuário otimizada em diversos dispositivos.

## 4. Dependências e Ferramentas

*   **HTML5:** Linguagem de marcação para a estrutura do conteúdo.
*   **CSS3:** Linguagem de estilo para a apresentação visual.
*   **Bootstrap 5.3.7:** Framework front-end para desenvolvimento responsivo e componentes de UI.
*   **Bootstrap Icons 1.13.1:** Biblioteca de ícones.
*   **Normalize.css 8.0.1:** Para padronizar a renderização de elementos HTML em diferentes navegadores.
*   **Google Fonts (Ubuntu):** Fonte utilizada no projeto.
*   **Meta Pixel (Facebook):** Para rastreamento de eventos e campanhas de marketing.
*   **Google Tag (gtag.js):** Para integração com Google Analytics e Google Ads.
*   **Submit-Form.com:** Serviço externo utilizado para o processamento do formulário de contato.

## 5. Como Usar/Visualizar o Projeto

Para visualizar o projeto localmente, siga os passos:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/mosiah-andrade/novo-site-homolog.git
    ```
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd novo-site-homolog
    ```
3.  **Abra o arquivo `index.html` em seu navegador:**
    Basta clicar duas vezes no arquivo `index.html` ou arrastá-lo para a janela do navegador.

## 6. Considerações Finais

O projeto `novo-site-homolog` é um exemplo de website estático bem estruturado, utilizando práticas modernas de desenvolvimento web (HTML5, CSS3, Bootstrap) e integrando ferramentas de marketing digital (Meta Pixel, Google Tag). A organização do código e a responsividade garantem uma boa experiência para o usuário e facilitam a manutenção futura.


