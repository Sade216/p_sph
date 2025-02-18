import { TUser } from "@_types/types";
import { Store } from "@tanstack/store";
import { setAuthToken } from "../axios";

type Role = "user" | "admin" | "guest";

type AuthState = {
    user: TUser | null;
    isAuthenticated: boolean;
    role: Role;
};

export const authStore = new Store<AuthState>({
    user: null,
    isAuthenticated: false,
    role: "guest",
});

// Устанавливаем пользователя
export const setUser = (user: AuthState["user"], role: Role) => {
    if (user) {
        authStore.setState((prev) => ({
            ...prev,
            user,
            isAuthenticated: true,
            role,
          }));
    }
};

export const updateUser = (user: AuthState["user"], role: Role) => {
    if(user){
        authStore.setState((prev)=>({
            ...prev,
            user,
            role
        }))
    }
}

// Выход
export const clearUser = () => {
    localStorage.removeItem("jwtToken");
    setAuthToken("");
    authStore.setState((prev) => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        role: "guest",
      }));
};
