//User
export type TUser = {
    _id: string;
    username: string;
    email: string;
    avatar?: string;
    role: string;
    createdAt: string;
    updatedAt: string;
};

export type TUserUpdate = {
    username: string;
    avatar?: string;
};

export type TUserLogin = {
    email: string,
    password: string,
}

export type TUserRegister = TUserLogin & {username: string}

export type TUserArray = TUser[];

//Music
export type TMusic = {
    _id: string;
    author: string;
    title: string;
    url: string;

    desc?: string;

    feat?: string[];
    text?: string;
    createdAt: string;
    updatedAt: string;
};

export type TMusicArray = TMusic[];

//Music
export type TAlbum = {
    _id: string;
    author: string;
    title: string;
    urls?: string[];

    desc?: string;

    createdAt: string;
    updatedAt: string;
};

export type TAlbumArray = TAlbum[];


//News
export type TNews = {
    _id: string;
    author: TUser;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

export type TNewsArray = TNews[];