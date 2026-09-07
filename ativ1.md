# Atividade 1 — Planejamento do Backend (Cinefilia)

1. Tabelas definidas inicialmente:
- **users**: id, name, email, password_hash, created_at
- **movies**: id, tmdb_id, title, release_year, poster_url
- **reviews**: id, user_id, movie_id, rating, text, watched_date, created_at
- **lists**: id, user_id, name, description, created_at
- **list_items**: id, list_id, movie_id, position

Essas cinco tabelas cobrem o núcleo do app: cadastro de usuário, catálogo de filmes (populado a partir de uma API externa tipo TMDB), registro de resenhas/avaliações (o "diário") e listas personalizadas de filmes.

2. Sim, utilizei migrations com Prisma. São 5 migrations, uma para cada tabela:
- **create_users**: cria a tabela de usuários com os campos de autenticação.
- **create_movies**: cria a tabela de filmes, usada como cache local dos dados vindos da API externa.
- **create_reviews**: cria a tabela de resenhas, relacionando usuário e filme, com nota e texto.
- **create_lists**: cria a tabela de listas criadas pelos usuários.
- **create_list_items**: cria a tabela de itens de lista, relacionando listas e filmes.

3. `prisma/seed.ts`

4. Endpoints implementados inicialmente:
- `POST /auth/register`
- `POST /auth/login`
- `GET /movies/:id`
- `POST /reviews`
- `GET /users/:id/diary`

Priorizei esses endpoints porque juntos formam o fluxo mínimo para o app funcionar de ponta a ponta. Sem autenticação (`register` e `login`) nenhuma outra funcionalidade faz sentido, já que resenhas e diário são vinculados a um usuário. `GET /movies/:id` é necessário para exibir informações do filme antes de permitir avaliá-lo. `POST /reviews` é a ação central do produto, já que o Cinefilia existe justamente para registrar o que o usuário assistiu e sua opinião sobre isso. Por fim, `GET /users/:id/diary` fecha o ciclo, permitindo visualizar o histórico de resenhas do usuário, que é o principal valor entregue pelo app. Funcionalidades secundárias, como listas e seguir outros usuários, ficaram para uma etapa posterior.

5. Sim, estou usando **Express.js** (Node.js) com **TypeScript**, e **Prisma** como ORM para acesso ao banco de dados.
