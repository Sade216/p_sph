import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import type { Context } from "hono";
import type { IUser } from "../db/models/Models";

const SECRET_KEY = "mymeowsecrettokenwwzxc192112";

const users = [{ id: 1, username: "admin", password: "password" }];

// Конфигурация стратегии JWT
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
};

passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
        const user = users.find((u) => u.id === jwtPayload.id);
        return user ? done(null, user) : done(null, false);
    })
);

export async function authenticateJWT(c: Context, next: Function) {
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return c.json({ message: "Unauthorized" }, 401);
    }

    const token = authHeader.split(" ")[1];

    try {
        const user = jwt.verify(token, SECRET_KEY);
        c.set("user", user);
        await next();
    } catch (err) {
        return c.json({ message: "Invalid token" }, 401);
    }
}

// Функция для создания токена
export const generateToken = (user: IUser) => {

    return jwt.sign(
        { 
            id: user.id, 
            username: user.username, 
            avatar: user.avatar,
            email: user.email,
            role: user.role
        },
        SECRET_KEY,
        {
            expiresIn: "1h",
        }
    );
};

export { passport };
