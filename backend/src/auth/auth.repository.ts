import { pool } from "../db";
import { User } from "./auth.entity";

export async function findByEmail(email: string) {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    return result.rows[0] ?? null;
}

export async function create(
    name: string,
    email: string,
    passwordHash: string
) {
    const result = await pool.query(
        `INSERT INTO users (name, email, password_hash)
         VALUES ($1, $2, $3)
         RETURNING id, name, email, created_at`,
        [name, email, passwordHash]
    );

    return result.rows[0] as User;
}