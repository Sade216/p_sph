import { Hono, type Context } from "hono";
import { authenticateJWT } from "../settings/passport";
import { MusicModel } from "../db/models/Models";
import mongoose from "mongoose";
import { EnumTypeOfApi, isAdminOrOwner } from "./middlewares";

const musicRouter = new Hono();

musicRouter.use(authenticateJWT)

musicRouter.get("/", async (c) => {
    try {
        const music = await MusicModel.find();
        return c.json(music)
    } catch (error) {
        return c.json("Failed to fetch track", 500);
    }
});

musicRouter.get("/artist/:id", async (c) => {
    try {
        const { id } = c.req.param();
        const music = await MusicModel.find({artist: id});
        return c.json(music)
    } catch (error) {
        return c.json("Failed to fetch track", 500);
    }
});

musicRouter.get("/:id", async (c) => {
    try {
        const { id } = c.req.param();
        const music = await MusicModel.findById(id);
        if (!music) return c.json("Track not found", 404);
        return c.json(music);
    } catch (error) {
        return c.json("Invalid music ID", 400);
    }
});

// musicRouter.get("/getByUsername/:id", async (c) => {
//     try {
//         const { id } = c.req.param();
//         // const user = await UserModel.findOne({username: id});
//         // if (!user) return c.json("Music not found", 404);
//         // return c.json(user);
//     } catch (error) {
//         return c.json("Invalid Username", 400);
//     }
// });

musicRouter.post("/", async (c: Context) => {
    try {
        //TODO: добавить cloudinary и Multer 
        const user = c.get("user");
        if(!user) return c.json('User not found', 400)

        //deprecated для number, c иными objectID проблем нет
        const objectId = new mongoose.Types.ObjectId(user.id);
        
        const body = await c.req.json();

        const newMusic = new MusicModel({...body, artist: objectId});
        await newMusic.save();

        return c.json("Succesfully created", 201);
    } catch (error) {
        console.log(error)
        return c.json("Failed to create Track", 400);
    }
});

musicRouter.put("/:id", async (c: Context) => {
    try {
        // FIXME: добавить аналог isAdminOrOwner или сделать универсальным
        const user = c.get("user")

        const error = await isAdminOrOwner(c, user.id, EnumTypeOfApi.music);
        if (error) return error;
        const { id } = c.req.param();
        const body = await c.req.json();



        const updatedMusic = await MusicModel.findByIdAndUpdate(id, body, {
            new: true,
        });
        if (!updatedMusic) return c.json("Track not found", 404);
        return c.json(updatedMusic);
    } catch (error) {
        return c.json("Failed to update track", 400);
    }
});

musicRouter.delete("/:id", async (c: Context) => {
    try {
        const { id } = c.req.param();

        const user = c.get("user")

        // FIXME: добавить аналог isAdminOrOwner или сделать универсальным
        const error = await isAdminOrOwner(c, user.id, EnumTypeOfApi.music);
        if (error) return error;
        const deletedMusic = await MusicModel.findByIdAndDelete(id);

        if (!deletedMusic) return c.json("Track not found", 404);
        return c.json("Track deleted successfully", 200);
    } catch (error) {
        return c.json("Failed to delete Track", 400);
    }
});

musicRouter.onError((err, c) => {
    console.error("🔥 Error:", err);
    return c.json("Internal Server Error", 500);
});

export default musicRouter;
