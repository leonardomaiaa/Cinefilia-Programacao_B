import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as authRepository from "./auth.repository";

export async function register(
    name: string,
    email: string,
    password: string
) {
    if (!name || !email || !password) {
        throw Object.assign(new Error("Preencha todos os campos"), {
            statusCode: 400
        });
    }

    if (password.length < 8) {
        throw Object.assign(new Error("A senha deve ter pelo menos 8 caracteres"), {
            statusCode: 400
        });
    }

    email = email.trim().toLowerCase();
    name = name.trim();

    const existingUser = await authRepository.findByEmail(email);

    if (existingUser) {
        throw Object.assign(new Error("E-mail já cadastrado"), {
            statusCode: 409
        });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return authRepository.create(name, email, passwordHash);
}

export async function login(email: string, password: string) {
    if (!email || !password) {
        throw Object.assign(new Error("Informe e-mail e senha"), {
            statusCode: 400
        });
    }

    email = email.trim().toLowerCase();

    const user = await authRepository.findByEmail(email);

    if (!user) {
        throw Object.assign(new Error("E-mail ou senha incorretos"), {
            statusCode: 401
        });
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!passwordMatch) {
        throw Object.assign(new Error("E-mail ou senha incorretos"), {
            statusCode: 401
        });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET não configurada");
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        secret,
        { expiresIn: "1d" }
    );

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token
    };
}