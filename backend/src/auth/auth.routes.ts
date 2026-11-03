import { Router } from "express";
import * as authController from "./auth.controller";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário no sistema
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: "senha1234"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "A senha deve ter pelo menos 8 caracteres"
 *       409:
 *         description: Conflito (E-mail já cadastrado)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "E-mail já cadastrado"
 */

router.post("/api/auth/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Autentica um usuário e gera um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "senha1234"
 *     responses:
 *       200:
 *         description: Login efetuado com sucesso. Retorna os dados do usuário e o token de acesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "João Silva"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "joao@email.com"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Requisição inválida (Falta e-mail ou senha).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Informe e-mail e senha"
 *       401:
 *         description: Credenciais incorretas (E-mail inexistente ou senha incorreta).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "E-mail ou senha incorretos"
 */
router.post("/api/auth/login", authController.login);

export default router;