import "dotenv";
import { Hono, type Context } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";

import mongoose from "mongoose";

import testRouter from "./src/routes/testRouter";
import usersRouter from "./src/routes/usersRouter";

//Настройки
const app = new Hono();

app.use("*", logger());

//Routes
const apiRoutes = app
    .basePath("/api")
    .get("/", (c) => {
        return c.redirect("/api/test");
    })
    .route("/test", testRouter)
    .route("/users", usersRouter);

//Получение статики с фронта
app.get("*", serveStatic({ root: "././frontend/dist" }));
app.get("*", serveStatic({ path: "././frontend/dist/index.html" }));

//Запуск сервера
const server = Bun.serve({
    port: process.env.PORT || 3000,
    fetch: app.fetch,
});

console.log(
    `Сервер запущен по адресу -> ${process.env.SERVER_URL}:${server.port}/api`,
);

//Запуск базы данных
async function StartDB() {
    if (process.env.URL_DATABASE) {
        try {
            return await mongoose
                .connect(process.env.URL_DATABASE)
                .then(() => console.log(`База данных запущена`));
        } catch (err) {
            return console.log("Ошибка подключения к базе данных -\n", err);
        }
    } else return console.log("Env строка базы данных не найдена...");
}

StartDB();

export type ApiRoutes = typeof apiRoutes;
