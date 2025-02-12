import { PropsWithChildren, useEffect } from "react";
import Header from "./Header/Header";
import { ThemeProvider } from "../ui/theme-provider";
import axios from "axios";
import { getAuthToken } from "@/lib/axios";
import { setUser } from "@/lib/authStore";

function Layout({ children }: PropsWithChildren) {

    useEffect(() => {
        const token = getAuthToken()
        async function getUserData() {
            await axios.get("/api/users/verify").then(({ data }) => {
                const {user} = data
                if(user && token){
                    setUser(user, user.role);
                }
            });
        }
        getUserData();
    }, []);
    
    return (
        <ThemeProvider
            defaultTheme="dark"
            storageKey="theme">
            <Header />
            <div className="sm:px-5 lg:px-24 h-[calc(100vh-60px)]">
                {children}
            </div>
        </ThemeProvider>
    );
}

export default Layout;
