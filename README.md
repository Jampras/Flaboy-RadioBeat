# J.A Radio — Portfólio do produtor musical

Portfólio mobile-first para João Alvarez, com descoberta de beats, previews de cinco segundos, filtros por estilo/clima e navegação app-like em celulares e tablets.

## Stack

- React 19 + TypeScript
- Vite 7
- pnpm 10.18.0
- CSS autoral responsivo
- Lucide React para ícones

A experiência pública é estática: não depende de banco, autenticação ou chaves privadas.

## Desenvolvimento local

Requisitos: Node.js 22 e npm.

```bash
npx --yes pnpm@10.18.0 install --frozen-lockfile
npx --yes pnpm@10.18.0 dev:static
```

Acesse `http://localhost:3000`.

## Verificações

```bash
npx --yes pnpm@10.18.0 check
npx --yes pnpm@10.18.0 build:static
npx --yes pnpm@10.18.0 audit --prod
npx --yes pnpm@10.18.0 test
```

O build gera a pasta `dist/public`, que contém o site estático.

## Publicação na Vercel

O projeto já inclui `vercel.json` com:

- comando `pnpm build:static`;
- saída `dist/public`;
- fallback SPA para `/` e `/catalogo`;
- headers básicos de segurança;
- cache imutável para assets versionados.

Na Vercel, importe o repositório, mantenha o framework Vite e use Node.js 22. Não configure variáveis de ambiente para a versão estática. Se uma futura funcionalidade exigir servidor, banco ou autenticação, ela deverá ser revisada antes de adicionar credenciais.

## GitHub

Antes de publicar o repositório:

1. confirme que `.env*`, logs, artefatos `.manus-*`, `dist/` e `.vercel/` não aparecem no commit;
2. nunca adicione tokens ou chaves ao frontend;
3. mantenha `pnpm-lock.yaml` versionado;
4. configure proteção da branch principal e revisão de pull requests;
5. habilite Dependabot ou atualizações regulares de dependências.

## Conteúdo e áudio

Os URLs de áudio atuais são previews demonstrativos do SoundHelix. Substitua-os por arquivos/URLs autorizados do cliente antes do lançamento comercial. Atualize `previewUrl` em `client/src/pages/Home.tsx` e `client/src/pages/Catalog.tsx`.

Consulte [SECURITY.md](./SECURITY.md) para as regras de segurança e relato responsável.
