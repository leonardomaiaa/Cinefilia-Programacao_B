INSERT INTO users (name, email, password_hash) VALUES
('Leonardo', 'leonardo@example.com', 'hash_de_exemplo_1'),
('Amigo Teste', 'amigo@example.com', 'hash_de_exemplo_2');

INSERT INTO movies (tmdb_id, title, release_year, poster_url) VALUES
(27205, 'A Origem', 2010, 'https://image.tmdb.org/t/p/w500/example1.jpg'),
(155, 'Batman: O Cavaleiro das Trevas', 2008, 'https://image.tmdb.org/t/p/w500/example2.jpg'),
(496243, 'Parasita', 2019, 'https://image.tmdb.org/t/p/w500/example3.jpg');

INSERT INTO reviews (user_id, movie_id, rating, text, watched_date) VALUES
(1, 1, 5, 'Um dos melhores filmes que já vi.', '2026-08-01'),
(1, 2, 4, 'Ótimo, mas achei um pouco longo.', '2026-08-10'),
(2, 3, 5, 'Roteiro impecável.', '2026-08-15');

INSERT INTO lists (user_id, name, description) VALUES
(1, 'Favoritos de todos os tempos', 'Filmes que eu assistiria de novo sem pensar duas vezes.');

INSERT INTO list_items (list_id, movie_id, position) VALUES
(1, 1, 1),
(1, 3, 2);