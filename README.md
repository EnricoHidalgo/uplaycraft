# front-uplaycraft

Proposta de front novo pro site do UPlayCraft (servidor de Minecraft com SkyWars e BedWars).

Feito em React + TypeScript com Vite. CSS puro, sem biblioteca de componentes.

## Rodando

```
npm install
npm run dev
```

Abre em http://localhost:5173

Pra gerar a versão final: `npm run build` (sai na pasta `dist`).

## Páginas

- `/` home
- `/loja` VIPs, coins e kits
- `/entrar` login
- `/conta` conta do jogador (precisa estar logado)

Tem PT, EN e ES. Os textos ficam em `src/i18n`.

## O que ainda é de mentira

Ainda não tá ligado na API do servidor, então:

- o login aceita qualquer nick e senha
- comprar só muda os dados no navegador, não cobra nada
- os jogadores online são fixos (`src/data/content.ts`)
- as imagens do banner são fundos provisórios

Quando a API existir, o login e as compras mudam só em `src/auth/AuthContext.tsx`.

## Trocando as imagens do banner

Coloca a imagem em `public/banner/` e preenche o campo `image` do slide em `src/data/server.ts`:

```ts
{ id: 'skywars', image: '/banner/skywars.jpg', ... }
```
