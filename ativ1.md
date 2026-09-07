# Atividade 1 — Planejamento do Backend (Cinefilia)

1. Tabela users, tabela movies, tabela reviews, tabela lists e tabela list_items.

2. Sim:
- 000_erase: reseta o banco de dados.
- 001_create_users: cria a tabela de usuários, com id (chave serial), nome, email, senha (hash) e data de criação.
- 002_create_movies: cria a tabela de filmes, com id (chave serial), id do TMDB, título, ano de lançamento e URL do pôster.
- 003_create_reviews: cria a tabela de resenhas, com id (chave serial), nota, texto e data assistida, além das colunas com o id do usuário e o id do filme (chaves estrangeiras).
- 004_create_lists: cria a tabela de listas, com id (chave serial), nome, descrição e data de criação, além da coluna com o id do usuário (chave estrangeira).
- 005_create_list_items: cria a tabela de itens de lista, com id (chave serial) e posição, além das colunas com o id da lista e o id do filme (chaves estrangeiras).

3. /workspaces/Cinefilia/backend/seed.sql

4. Um endpoint de POST no path /auth/register, um de POST no path /auth/login, um de GET no path /movies/:id, um de POST no path /reviews e um de GET no path /users/:id/diary.
Os endpoints de registro e login são essenciais porque toda resenha e todo diário ficam vinculados a um usuário, então nada mais funciona sem autenticação primeiro. O GET em /movies/:id é necessário para exibir as informações do filme antes do usuário poder avaliá-lo. O POST em /reviews é a ação central do produto, já que o Cinefilia existe justamente para registrar o que o usuário assistiu e sua opinião sobre isso. Por fim, o GET em /users/:id/diary permite visualizar o histórico de resenhas do usuário, que é o principal valor entregue pelo app.

5. Sim, planejo utilizar o framework Express.
