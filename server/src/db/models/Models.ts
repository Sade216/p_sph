import mongoose, { Schema, Document } from "mongoose";

//----------------------------------------------------------------
//User

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

// FIXME: добавить исключение для обновления
// UserSchema.pre("findOneAndUpdate", removeRestrictedFields);
// UserSchema.pre("", removeRestrictedFields);
// UserSchema.pre("updateOne", removeRestrictedFields);
// UserSchema.pre("updateMany", removeRestrictedFields);

const UserModel = mongoose.model<IUser>("User", UserSchema);

//----------------------------------------------------------------
//News

interface INews extends Document {
    title: string;
    content: string;
    author: mongoose.Types.ObjectId;
}

const NewsSchema = new Schema<INews>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

const NewsModel = mongoose.model<INews>("News", NewsSchema);

//----------------------------------------------------------------
//Music

interface IMusic extends Document {
    title: string;
    description: string,
    text: string,
    artist: mongoose.Types.ObjectId;
    trackUrl: string;
    cover: string;
    largeCover: string;
}

const MusicSchema = new Schema<IMusic>(
    {
        title: { type: String, required: true },
        description: { type: String, default: "" },
        text: { type: String, default: ""},
        artist: { type: Schema.Types.ObjectId, ref: "User", required: true },
        trackUrl: { type: String, required: true },
        cover: { type: String, default: "" },
        largeCover: { type: String, default: "" },
    },
    { timestamps: true }
);

const MusicModel = mongoose.model<IMusic>("Music", MusicSchema);

//----------------------------------------------------------------
//Albums

interface IAlbum extends Document {
    title: string;
    description: string;
    creator: mongoose.Types.ObjectId;
    tracks: mongoose.Types.ObjectId[];
    cover: string;
}

const AlbumSchema = new Schema<IAlbum>(
    {
        title: { type: String, required: true },
        description: { type: String, default: ""  },
        creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
        tracks: [{ type: Schema.Types.ObjectId, ref: "Music" }],
        cover: { type: String, default: "" },
    },
    { timestamps: true }
);

const AlbumModel = mongoose.model<IAlbum>("Album", AlbumSchema);

//Export

export { UserModel, NewsModel, MusicModel, AlbumModel };

export type { IUser, INews, IMusic, IAlbum };
