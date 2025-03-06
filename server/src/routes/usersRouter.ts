import { Hono, type Context } from "hono";
import { UserModel } from "../db/models/Models";
import { authenticateJWT, generateToken } from "../settings/passport";

import bcrypt from "bcrypt";
import {
    EnumTypeOfApi,
    isAdminOrOwner,
    isUsernameAllowed,
    isValidEmail,
    roleMiddleware,
} from "./middlewares";
import type { ContentfulStatusCode, StatusCode } from "hono/utils/http-status";

const userRouter = new Hono();

userRouter.get("/verify", authenticateJWT, async (c: Context) => {
    const user = c.get("user");
    return c.json({ user }, 200);
});

userRouter.post("/login", async (c: Context) => {
    try {
        const { email, password } = await c.req.json();
        const user = await UserModel.findOne().where({ email: email });
        if (!user) return c.json("Invalid credentials", 401);
        const result = await bcrypt.compare(password, user.password);

        if (!result) return c.json("Invalid credentials", 401);

        const token = generateToken(user);
        return c.json({ user, token }, 200);
    } catch (error) {
        return c.json("Failed to fetch user", 500);
    }
});

// Создать нового пользователя
userRouter.post("/", async (c) => {
    try {
        const body = await c.req.json();

        if (!isValidEmail(body.email))
            return c.json("Invalid email address.", 400);

        if (body.username) {
            const result = isUsernameAllowed(c, body.username);
            const data = await result.json();
            if(result.status !== 200) return c.json(data, result.status as ContentfulStatusCode);
        }

        const hashedPass = await bcrypt.hash(body.password, 10);
        const userWithHashedPass = {
            ...body,
            password: hashedPass,
        };
        const newUser = new UserModel(userWithHashedPass);
        await newUser.save();
        return c.json("Succesfully created", 201);
    } catch (error) {
        return c.json("Failed to create user", 400);
    }
});

//Получить всех пользователей
userRouter.get("/", async (c) => {
    try {
        const users = await UserModel.find().select("-password");
        return c.json(users);
    } catch (error) {
        return c.json("Failed to fetch users", 500);
    }
});

// Получить одного пользователя по ID
userRouter.get("/:id", authenticateJWT, async (c) => {
    try {
        const { id } = c.req.param();
        console.log('1')
        const user = await UserModel.findById(id).select("-password");
        if (!user) return c.json("User not found", 404);
        return c.json(user);
    } catch (error) {
        return c.json("Invalid User ID", 400);
    }
});

// Получить одного пользователя по Username
userRouter.get("/getByUsername/:id", authenticateJWT, async (c) => {
    try {
        const { id } = c.req.param();
        const user = await UserModel.findOne({username: id}).select("-password");
        if (!user) return c.json("User not found", 404);
        return c.json(user);
    } catch (error) {
        return c.json("Invalid Username", 400);
    }
});

// Обновить пользователя по ID
userRouter.put("/:id", authenticateJWT, async (c) => {
    try {
        const { id } = c.req.param();
        const body = await c.req.json();

        const error = await isAdminOrOwner(c, id, EnumTypeOfApi.music);
        if (error) return error;

        const updatedUser = await UserModel.findByIdAndUpdate(id, body, {
            new: true,
        }).select("-password");
        if (!updatedUser) return c.json("User not found", 404);
        return c.json(updatedUser);
    } catch (error) {
        return c.json("Failed to update user", 400);
    }
});

// Удалить пользователя по ID
userRouter.delete("/:id", authenticateJWT, async (c) => {
    try {
        const { id } = c.req.param();

        const error = await isAdminOrOwner(c, id, EnumTypeOfApi.music);
        if (error) return error;
        const deletedUser = await UserModel.findByIdAndDelete(id).select(
            "-password"
        );

        if (!deletedUser) return c.json("User not found", 404);
        return c.json("User deleted successfully", 200);
    } catch (error) {
        return c.json("Failed to delete user", 400);
    }
});

userRouter.onError((err, c) => {
    console.error("🔥 Error:", err);
    return c.json("Internal Server Error", 500);
});

export default userRouter;
