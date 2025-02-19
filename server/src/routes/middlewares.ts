import type { Context, Next } from "hono";
import { UserModel } from "../db/models/Models";

export const roleMiddleware = (role: "admin" | "user") => {
    return async (c: Context, next: Next) => {
        const user = c.get("user"); // Предполагаем, что user уже добавлен в контекст после аутентификации

        if (!user) {
            return c.json({ message: "Unauthorized" }, 401);
        }

        if (user.role !== role) {
            return c.json({ message: "Forbidden" }, 403);
        }

        await next();
    };
};

export const isAdminOrOwner = async (c: Context, id: string) => {
    const user = c.get("user");
    if (!user) return c.text("Unauthorized", 401);

    const result = await UserModel.findById(id);
    if (!result) return c.text("User not found", 403);

    if (result.role === "admin")
        return c.json(`You can't modify this user`, 401);

    if (user.role === "admin" || String(result._id) === user.id) {
        return null;
    }
    return c.text("Forbidden", 403);
};

export const isLegalWord = (id: string) => {
    const illegalWords = [
        "home",
        "profile",
        "prof",
        "settings",
        "setting",
        "crm",
        "admin",
        "owner",
    ];

    const result = illegalWords.some((word) => id.includes(word));
    console.log(!result);

    return !result;
};

export const isUsernameAllowed = (c: Context, username: string) => {
    if (username.length < 3 || username.length > 20) return c.json("Username must be more than 3 and less than 20 characters long.", 400);
    if (!isLegalWord(username)) return c.json("Username has bad words", 400);
    
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*(_{1,2}[a-zA-Z0-9]+)*$/;
    const result = username.match(usernameRegex);
    if(!result) return c.json("Username contains incorrect characters.", 400);
    
    return c.json('1', 200)
};

export const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }