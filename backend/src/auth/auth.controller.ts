import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           description: ID interno do usuário, gerado automaticamente
 *         name:
 *           type: string
 *           description: Nome completo do usuário
 *         email:
 *           type: string
 *           format: email
 *           description: Endereço de e-mail do usuário
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação do registro no banco
 *       example:
 *         id: 1
 *         name: "João Silva"
 *         email: "joao@email.com"
 *         created_at: "2026-11-03T16:45:00.000Z"
 */
export async function register(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { name, email, password } = req.body;

        const user = await authService.register(
            name,
            email,
            password
        );

        res.status(201).json({
            message: "Usuário cadastrado com sucesso!",
            user: user.name
        });
    } catch (error) {
        next(error);
    }
}

export async function login(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { email, password } = req.body;

        const result = await authService.login(email, password);

        res.status(200).json({
            message: "Login realizado com sucesso!",
            ...result
        });
    } catch (error) {
        next(error);
    }
}