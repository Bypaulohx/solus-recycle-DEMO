# Solus Recycle DEMO

Aplicação web para gerenciamento de reciclagem.

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Build para Produção

```bash
npm run build
npm start
```

## Deploy no GitHub Pages

O deploy é feito automaticamente via GitHub Actions assim que um commit é feito na branch principal (`main` ou `master`). Certifique-se de habilitar o GitHub Pages no painel do repositório escolhendo a origem "GitHub Actions".

## Tecnologias

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI
- React Hook Form
- TanStack Query
- Lucide Icons

## Estrutura

```
src/
├── app/              # Rotas e layouts Next.js
├── components/       # Componentes React reutilizáveis
├── hooks/            # Hooks customizados
├── lib/              # Funções utilitárias
└── assets/           # Ativos estáticos
```
