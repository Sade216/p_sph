import type { Context, Next } from "hono";
import { MusicModel, UserModel } from "../db/models/Models";

export enum EnumTypeOfApi {"user", "music"}

export const roleMiddleware = (role: "admin" | "user") => {
    return async (c: Context, next: Next) => {
        const user = c.get("user");
        console.log(user.role)

        if (!user) {
            return c.json({ message: "Unauthorized" }, 401);
        }

        if (user.role !== role) {
            return c.json({ message: "Forbidden" }, 403);
        }

        await next();
    };
};


export const isAdminOrOwner = async (c: Context, id: string, type: EnumTypeOfApi) => {
    const user = c.get("user");
    if (!user) return c.text("Unauthorized", 401);

    if (type === EnumTypeOfApi.user) {
        const result = await UserModel.findById(id);
        if (!result) return c.text("User not found", 403);

        if (result.role === "admin")
            return c.json(`You can't modify this user`, 401);

        if (user.role === "admin" || String(result._id) === user.id) {
            console.log(user.role, String(result._id), user.id)
            return null;
        }
    }
    if(type === EnumTypeOfApi.music){
        const result = await MusicModel.findById(id);
        if (!result) return c.text("Track not found", 403);

        if (user.role === "admin" || String(result.artist) === user.id) {
            return null;
        }
    }

    return c.text("Forbidden", 403);
};

export const isLegalWord = (id: string) => {
    const illegalWords = [
        "admin", "administrator", "moderator", "root", "superuser", "system",
        "support", "helpdesk", "security", "server", "host", "webmaster",
        "contact", "user", "guest", "test", "tester", "anon", "anonymous",
        "null", "void", "undefined", "error", "fail", "password", "1234",
        "owner", "founder", "bot", "robot", "api", "backup", "operator",
        "police", "gov", "official", "banned", "restricted", "forbidden",

        "settings", "profile", "account", "dashboard", "login", "logout",
        "signup", "register", "home", "about", "contact", "search",
        "faq", "terms", "privacy", "policy", "support", "help", "shop",
        "cart", "checkout", "order", "blog", "news", "music", "forum", "community",
        
        "qwerty", "asdf", "password1", "letmein", "welcome",
        "abc123", "admin123", "passw0rd", "123456",
      ];

    const result = illegalWords.some((word) => id.includes(word));
    console.log(!result);

    return !result;
};

export const isUsernameAllowed = (c: Context, username: string) => {
    if (username.length < 3 || username.length > 20)
        return c.json(
            "Username must be more than 3 and less than 20 characters long.",
            400
        );
    if (!isLegalWord(username)) return c.json("Username has bad words", 400);

    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*(_{1,2}[a-zA-Z0-9]+)*$/;
    const result = username.match(usernameRegex);
    if (!result) return c.json("Username contains incorrect characters.", 400);

    return c.json("1", 200);
};

export const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};
