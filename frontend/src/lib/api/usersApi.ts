import axios from "axios";
import { apiUrl } from "../axios";
import { TUserUpdate } from "@_types/types";
import { toast } from "sonner";

export async function getAllUsers() {
    const users = await axios.get(apiUrl + "/users");
    return users;
}

export async function getUserById(id: string) {
    const { data } = await axios.get(apiUrl + `/users/${id}`);
    return data;
}

export async function getUserByUsername(id: string) {
    const { data } = await axios.get(apiUrl + `/users/getByUsername/${id}`);
    return data;
}

//need test
export async function updateUserById(id: string, user: TUserUpdate) {
    const updatedUser = await axios.put(
        apiUrl + `/users/${id}`,
        {
            username: user.username,
            avatar: user.avatar,
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return updatedUser;
}

export async function deleteUserById(id: string) {
    await axios
        .delete(apiUrl + `/users/${id}`)
        .then(({data}) => {
            toast.success(data);
        })
        .catch((err) => {
            toast.error(err.response.data);
        });
}
