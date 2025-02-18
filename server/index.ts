import "dotenv";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";

import mongoose from "mongoose";

import usersRouter from "./src/routes/usersRouter";

const PORT = process.env.PORT || 3000

//Настройки
const app = new Hono();

app.use("*", logger());

//Routes
const apiRoutes = app
    .basePath("/api")
    .get("/", (c) => {
        return c.redirect("/api/test");
    })
    .route("/users", usersRouter);

//Получение статики с фронта
app.get("*", serveStatic({ root: "././frontend/dist" }));
app.get("*", serveStatic({ path: "././frontend/dist/index.html" }));

async function start() {
    //Запуск сервера
    if(PORT){
        Bun.serve({
            port: PORT,
            fetch: app.fetch,
        });
        
        console.log(
            `Сервер -> ${process.env.SERVER_URL}:${PORT}/api`
        );
    }
    
    
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

start();

export type ApiRoutes = typeof apiRoutes;
