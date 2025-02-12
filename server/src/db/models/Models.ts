import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: "user" | "admin";
    avatar: string;
}

const UserSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        avatar: { type: String, default: "" },
    },
    { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

interface INews extends Document {
    title: string;
    content: string;
    author: mongoose.Types.ObjectId;
    image: string;
}

const NewsSchema = new Schema<INews>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        image: { type: String, default: "" },
    },
    { timestamps: true }
);

const NewsModel = mongoose.model<INews>("News", NewsSchema);

interface IPost extends Document {
    title: string;
    content: string;
    author: mongoose.Types.ObjectId;
}

const PostSchema = new Schema<IPost>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

const PostModel = mongoose.model<IPost>("Post", PostSchema);

interface IMusic extends Document {
    title: string;
    artist: string;
    trackUrl: string;
    cover: string;
    largeCover: string;
}

const MusicSchema = new Schema<IMusic>(
    {
        title: { type: String, required: true },
        artist: { type: String, required: true },
        trackUrl: { type: String, required: true },
        cover: { type: String, default: "" },
        largeCover: { type: String, default: "" },
    },
    { timestamps: true }
);

const MusicModel = mongoose.model<IMusic>("Music", MusicSchema);

interface IAlbum extends Document {
    title: string;
    creator: mongoose.Types.ObjectId;
    tracks: mongoose.Types.ObjectId[];
    cover: string;
}

const AlbumSchema = new Schema<IAlbum>(
    {
        title: { type: String, required: true },
        creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
        tracks: [{ type: Schema.Types.ObjectId, ref: "Music" }],
        cover: { type: String, default: "" },
    },
    { timestamps: true }
);

const AlbumModel = mongoose.model<IAlbum>("Album", AlbumSchema);

export { UserModel, NewsModel, PostModel, MusicModel, AlbumModel };

export type { IUser, INews, IPost, IMusic, IAlbum };
