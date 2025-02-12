import type { Context, Next } from "hono";


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