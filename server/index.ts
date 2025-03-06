import "dotenv";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";

import mongoose from "mongoose";

import usersRouter from "./src/routes/usersRouter";
import newsRouter from "./src/routes/newsRouter";
import musicRouter from "./src/routes/musicRouter";

let INIT_PORT = process.env.PORT || 3000;
const SERVER_URL = process.env.SERVER_URL

//Настройки
const app = new Hono();

app.use("*", logger());

//Routes
const apiRoutes = app
    .basePath("/api")
    .route("/users", usersRouter)
    .route("/news", newsRouter)
    .route("/music", musicRouter)

//Получение статики с фронта
app.get("*", serveStatic({ root: "././frontend/dist" }));
app.get("*", serveStatic({ path: "././frontend/dist/index.html" }));

const server = Bun.serve({
    port: INIT_PORT,
    fetch: app.fetch,
});

const PORT = server.port

console.log(`Сервер -> ${SERVER_URL}:${PORT}/api`);


async function StartDB() {
    //Запуск базы данных
    if (process.env.URL_DATABASE) {
        try {
            return await mongoose
                .connect(process.env.URL_DATABASE)
                .then(() => console.log(`База данных -> OK`));
        } catch (err) {
            return console.log("Ошибка подключения к базе данных -\n", err);
        }
    } else return console.log("Env строка базы данных не найдена...");
}

StartDB();

export type ApiRoutes = typeof apiRoutes;

export {PORT, SERVER_URL}
