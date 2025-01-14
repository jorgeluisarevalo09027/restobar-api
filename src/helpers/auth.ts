import 'dotenv/config';

import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

import rateLimit from "express-rate-limit";

// Asegurar que JWT_TOKEN_SECRET está definido
const JWT_SECRET = process.env.JWT_TOKEN_SECRET as string;

if (!JWT_SECRET) {
    throw new Error("JWT_TOKEN_SECRET is not defined in environment variables");
}

// Función para generar un token JWT
export function generateToken(email: string,name:string,id:string): string {
    return jsonwebtoken.sign({ email, id, name }, JWT_SECRET, { expiresIn: '1h' });
}

// Middleware para verificar un token JWT
export function tokenVerification(req: Request, res: Response, next: NextFunction) {
    try {
        // Extraer correctamente el token eliminando espacios adicionales
        const token = req.header('Authorization')?.replace(/^Bearer\s+/i, '');

        if (!token) {
            res.status(401).json({ error: 'Token required' });
            return
        }

        //  Verificar el token y forzar el tipo `JwtPayload`
        const decoded = jsonwebtoken.verify(token, JWT_SECRET) as JwtPayload;

        console.log('Token valid:', decoded);

        //  Almacenar la información del usuario en `req.user`
        (req as Request & { user: JwtPayload }).user = decoded;

        //  Continuar con la ejecución
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ error: 'Invalid Token' });
    }
}


export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // 5 intentos por IP
    message: "Demasiados intentos de inicio de sesión, intenta nuevamente en 15 minutos"
});