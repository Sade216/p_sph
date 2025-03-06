import { Hono, type Context } from "hono";
import { authenticateJWT } from "../settings/passport";
import { isAdminOrOwner, roleMiddleware } from "./middlewares";
import { NewsModel } from "../db/models/Models";
import mongoose from "mongoose";

const newsRouter = new Hono();

newsRouter.use(authenticateJWT)

newsRouter.get("/", async (c: Context) => {
    try {
        const news = await NewsModel.find().populate('author');
        return c.json(news);
    } catch (error) {
        return c.json("Failed to fetch news", 500);
    }
});

newsRouter.get("/:id", async (c: Context) => {
    try {
        const { id } = c.req.param();
        const news = await NewsModel.findById(id).populate('author');
        if (!news) return c.json("News not found", 404);
        return c.json(news);
    } catch (error) {
        return c.json("Invalid News ID", 400);
    }
});

newsRouter.post("/", roleMiddleware('admin'), async (c: Context) => {
    try {
        const user = c.get("user");
        if(!user) return c.json('User not found', 400)

        //deprecated для number, c иными objectID проблем нет
        const objectId = new mongoose.Types.ObjectId(user.id);
        
        const body = await c.req.json();

        const newMusic = new NewsModel({...body, author: objectId});
        await newMusic.save();

        return c.json("Succesfully created", 201);
    } catch (error) {
        console.log(error)
        return c.json("Failed to create News", 400);
    }
});

newsRouter.put("/:id", roleMiddleware('admin'), async (c: Context) => {
    try {
        const { id } = c.req.param();
        const body = await c.req.json();

        const updatedNews = await NewsModel.findByIdAndUpdate(id, body, {
            new: true,
        });
        if (!updatedNews) return c.json("News not found", 404);
        return c.json(updatedNews);
    } catch (error) {
        return c.json("Failed to update news", 400);
    }
});

newsRouter.delete("/:id", roleMiddleware('admin'),  async (c: Context) => {
    try {
        const { id } = c.req.param();

        const deletedNews = await NewsModel.findByIdAndDelete(id);

        if (!deletedNews) return c.json("News not found", 404);
        return c.json("News deleted successfully", 200);
    } catch (error) {
        return c.json("Failed to delete news", 400);
    }
});

newsRouter.onError((err, c) => {
    console.error("🔥 Error:", err);
    return c.json("Internal Server Error", 500);
});

export default newsRouter;
