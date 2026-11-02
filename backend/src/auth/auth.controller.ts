import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";

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
            user
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