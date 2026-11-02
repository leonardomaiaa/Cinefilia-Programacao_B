import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import * as moviesController from "./movies.controller";
const router = Router();

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Retorna todos os filmes na API
 *     tags:
 *       - Movies
 *     responses:
 *       200:
 *         description: Lista de filmes retornada com sucesso
 *       
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */

router.get("/api/movies", moviesController.getAll);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Retorna um filme específico da API
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do filme a ser retornado
 *     responses:
 *       200:
 *         description: Filme retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: ID informado não é um número
 *       404:
 *         description: ID não existe no banco de dados
 */

router.get("/api/movies/:id", moviesController.getById);


/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Adiciona um filme no banco de dados
 *     tags:
 *       - Movies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tmdb_id
 *               - title
 *               - release_year
 *               - poster_url
 *             properties:
 *               tmdb_id:
 *                 type: integer
 *                 description: ID do filme na API do TMDB
 *               title:
 *                 type: string
 *                 description: Título do filme
 *               release_year:
 *                 type: integer
 *                 description: Ano de lançamento do filme
 *               poster_url:
 *                 type: string
 *                 description: URL da imagem do pôster do filme
 *     responses:
 *       201:
 *         description: Filme criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Campos obrigatórios ausentes ou inválidos
 *       409:
 *         description: Filme já existe dentro na API(tmdb_id já está na API)
 */

router.post("/api/movies", authenticateToken, moviesController.create);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Altera as informações de um filme existente
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do filme a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tmdb_id
 *               - title
 *               - release_year
 *               - poster_url
 *             properties:
 *               tmdb_id:
 *                 type: integer
 *                 description: ID do filme na API do TMDB
 *               title:
 *                 type: string
 *                 description: Título do filme
 *               release_year:
 *                 type: integer
 *                 description: Ano de lançamento do filme
 *               poster_url:
 *                 type: string
 *                 description: URL da imagem do pôster do filme
 *     responses:
 *       200:
 *         description: Informações do filme alteradas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Informações do filme alteradas com sucesso
 *       400:
 *         description: ID do filme inválido ou campos obrigatórios ausentes
 *       404:
 *         description: ID não existe no banco de dados
 */

router.put("/api/movies/:id", authenticateToken, moviesController.change);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Remove um filme do banco de dados
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do filme a ser removido
 *     responses:
 *       200:
 *         description: Filme removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Filme removido do banco de dados com sucesso
 *                 tmdb_id:
 *                   type: integer
 *                   example: 550
 *       400:
 *         description: ID do filme inválido. Deve ser um número
 *       404:
 *         description: ID não existe no banco de dados
 */

router.delete("/api/movies/:id", authenticateToken, moviesController.remove);
export default router;

