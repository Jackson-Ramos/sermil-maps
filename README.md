# SERMIL MAPS

Aplicativo web (mobile-first) que guia o visitante até um lote específico dentro do
cemitério, organizado por **quadra** e **lote**. A partir da seleção do destino, o app
oferece navegação pelo mapa interno do SERMIL ou abre a rota correspondente no
Google Maps.

Projeto originalmente desenhado no Figma:
https://www.figma.com/design/t8SjsYcVczAZdrzW0Aa7Wz/SERMIL-MAPS-App-Design

## Funcionalidades

O fluxo do app é composto por telas encadeadas com animação de transição:

1. **Login** — identificação do visitante por CPF.
2. **Seleção de Quadra** — lista de quadras disponíveis.
3. **Seleção de Lote** — lotes da quadra escolhida.
4. **Modo de Navegação** — escolha entre o mapa interno do SERMIL, Google Maps ou Waze.
5. **Navegação no Mapa** — orientação até o destino dentro do mapa do SERMIL.
6. **Chegada** — confirmação de chegada e registro do horário de entrada.

As quadras, lotes e respectivos links do Google Maps são definidos em
[src/data/mapsLinks.json](src/data/mapsLinks.json) e consumidos pelos helpers em
[src/data/getMapsLink.ts](src/data/getMapsLink.ts). Quando não há rota cadastrada para
um par quadra+lote, o app avisa que a rota está indisponível.

## Tecnologias

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) como bundler/dev server
- [Tailwind CSS](https://tailwindcss.com/) para estilização
- [Framer Motion](https://www.framer.com/motion/) para as transições de tela
- Componentes de UI baseados em [Radix UI](https://www.radix-ui.com/)

## Executando localmente

Pré-requisito: [Node.js](https://nodejs.org/) instalado.

```bash
npm i        # instala as dependências
npm run dev  # inicia o servidor de desenvolvimento
```

O Vite exibirá no terminal a URL local (por padrão http://localhost:5173).

## Build de produção

```bash
npm run build
```

Os arquivos estáticos são gerados na pasta `dist/`.

## Deploy no GitHub Pages

O projeto está configurado para ser servido a partir de um subcaminho de projeto do
GitHub Pages (ex.: `https://usuario.github.io/sermil-maps/`). Para isso, o
[vite.config.ts](vite.config.ts) usa `base: './'`, garantindo que os assets sejam
resolvidos por caminhos relativos. Basta publicar o conteúdo da pasta `dist/`.

## Estrutura do projeto

```
src/
├── main.tsx                  # ponto de entrada
├── app/
│   ├── App.tsx               # orquestra o fluxo entre as telas
│   └── components/           # telas e componentes de UI
│       ├── LoginScreen.tsx
│       ├── QuadraSelectionScreen.tsx
│       ├── LoteSelectionScreen.tsx
│       ├── NavigationModeScreen.tsx
│       ├── MapNavigationScreen.tsx
│       ├── ArrivalScreen.tsx
│       └── ui/               # componentes reutilizáveis (Radix + Tailwind)
└── data/
    ├── mapsLinks.json        # quadras, lotes e links do Google Maps
    └── getMapsLink.ts        # helpers de consulta dos destinos
```
