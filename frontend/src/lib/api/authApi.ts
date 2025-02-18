import axios from "axios";
import { setUser } from "../store/authStore";
import { apiUrl, deleteAuthToken, getAuthToken, setAuthToken } from "../axios";
import { TUserLogin, TUserRegister } from "@_types/types";
import { toast } from "sonner";

export async function userVerifyLogin() {
    const token = getAuthToken();
    if (token) {
        await axios.get(apiUrl + "/users/verify").then(({ data }) => {
            const { user } = data;
            if (user && token) {
                setUser(user, user.role);
            }
        }).catch(()=>{
            deleteAuthToken()
        });
    }
}

export async function userLogin(user: TUserLogin) {
    await axios
        .post(
            apiUrl + "/users/login",
            {
                email: user.email,
                password: user.password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((res) => {
            const { user, token } = res.data;

            if (user && token) {
                setAuthToken(token);
                setUser(user, user.role);
            }
        })
        .catch((err) => {
            const res = err.response.data;
            toast.error(res);
        });
}

export async function userSignIn(user: TUserRegister) {
    await axios
        .post(
            apiUrl + "/users",
            {
                username: user.username,
                email: user.email,
                password: user.password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then(({ data }) => {
            toast.success(data);
        })
        .catch((err) => {
            const res = err.response.data;
            toast.error(res);
        });
}
