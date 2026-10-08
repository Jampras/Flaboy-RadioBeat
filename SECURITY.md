# Segurança

## Escopo

Este projeto é uma aplicação frontend estática para Vercel. As páginas públicas não precisam de banco, login ou chaves privadas para funcionar.

## Regras

- Nunca faça commit de `.env`, tokens, senhas, chaves privadas ou credenciais de serviços.
- Variáveis server-only como `MANUS_API_KEY`, `MANUS_JWT_SECRET` e `DATABASE_URL` não devem ser usadas em código `client/` nem em variáveis `VITE_*`.
- Use `.env.example` apenas como referência de nomes; mantenha os valores vazios.
- Revogue e substitua imediatamente qualquer credencial que tenha sido exposta.
- Dependências devem ser instaladas com o lockfile (`pnpm install --frozen-lockfile`).
- Execute `pnpm check`, `pnpm build:static` e `pnpm audit --prod` antes de abrir um pull request.

## Relato responsável

Para relatar uma vulnerabilidade, não publique detalhes exploráveis em uma issue. Entre em contato diretamente com o responsável pelo projeto e informe o arquivo/rota afetado, impacto e uma forma segura de reproduzir o problema.
