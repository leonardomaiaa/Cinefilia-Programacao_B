# Atividade 1 — Planejamento do Backend (Cinefilia)

1. Tabela users, tabela movies, tabela reviews, tabela lists e tabela list_items.

2. Sim:
- 000_erase: reseta o banco de dados.
- 001_initial_schema: cria todas as tabelas iniciais de uma vez (users, movies, reviews, lists, list_items), já que todas foram definidas antes de o projeto começar e não representam mudanças incrementais no schema.

3. /workspaces/Cinefilia/backend/seed.sql

4. Um endpoint de POST no path /auth/register, um de POST no path /auth/login, um de GET no path /movies/:id, um de POST no path /reviews e um de GET no path /users/:id/diary.
Os endpoints de registro e login são essenciais porque toda resenha e todo diário ficam vinculados a um usuário, então nada mais funciona sem autenticação primeiro. O GET em /movies/:id é necessário para exibir as informações do filme antes do usuário poder avaliá-lo. O POST em /reviews é a ação central do produto, já que o Cinefilia existe justamente para registrar o que o usuário assistiu e sua opinião sobre isso. Por fim, o GET em /users/:id/diary permite visualizar o histórico de resenhas do usuário, que é o principal valor entregue pelo app.

5. Sim, planejo utilizar o framework Express.
