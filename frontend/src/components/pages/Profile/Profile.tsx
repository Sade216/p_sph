import { authStore } from "@/lib/store/authStore";
import { useStore } from "@tanstack/react-store";
import { useNavigate, useParams } from "react-router";
import ProfileComponent from "./layout/ProfileComponent";
import { getUserByUsername } from "@/lib/api/usersApi";
import { useEffect, useState } from "react";
import { TUser } from "@_types/types";
import ErrorPage from "../Error/ErrorPage";

function Profile() {
    const { id } = useParams();

    const { user } = useStore(authStore);
    const [otherUser, setOtherUser] = useState<TUser>();

    const navigate = useNavigate();

    const isOwner = user?.username === id ? true : false;

    useEffect(() => {
        if (!isOwner && id) {
            getUserByUsername(id)
                .then((data) => {
                    setOtherUser(data);
                })
                // .catch(() => {
                //     navigate("/");
                // });
        }
    }, []);

    return (
        <>
            {/* 
                Пользователь владелец? - рендерим user'a со store, 
                если нет - проверяем есть ли такой пользователь вообще, 
                если да - рендерим другого пользователя, 
                если нет - ошибку или navigate()
            */}
            {user && isOwner ? (
                <ProfileComponent
                    user={user}
                    isOwner={isOwner}
                />
            ) : otherUser ? (
                <ProfileComponent user={otherUser} />
            ) : (
                <ErrorPage />
            )}
        </>
    );
}

export default Profile;
