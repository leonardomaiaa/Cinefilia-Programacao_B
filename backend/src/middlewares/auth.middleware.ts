import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;

    const secret = process.env.JWT_SECRET;

    if (!token) {
        res.status(401).json({ message: "Token não informado" });
        return;
    }

    if (!secret) {
        res.status(500).json({
            message: "Configuração de autenticação ausente"
        });
        return;
    }

    try {
        jwt.verify(token, secret);
        next();
    } catch {
        res.status(401).json({
            message: "Token inválido ou expirado"
        });
    }
}