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
    if(!result) return c.text("User not found", 403);
    
    if(result.role === "admin") return c.json(`You can't delete this user`, 401)
    
        if (user.role === "admin" || String(result._id) === user.id) {
        return null;
    }
    return c.text("Forbidden", 403);
};
