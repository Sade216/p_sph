import { PropsWithChildren, useEffect } from "react";
import Header from "./Header/Header";
import { ThemeProvider } from "../ui/theme-provider";
import axios from "axios";
import { getAuthToken } from "@/lib/axios";
import { setUser } from "@/lib/authStore";

import { Toaster } from "@/components/ui/sonner"

function Layout({ children }: PropsWithChildren) {

    useEffect(() => {
        const token = getAuthToken()
        async function getUserData() {
            await axios.get("/api/users/verify").then(({ data }) => {
                const {user} = data
                if(user && token){
                    setUser(user, user.role)
                }
            });
        }
        getUserData();
    }, []);
    
    return (
        <ThemeProvider defaultTheme="dark" storageKey="theme">
            <Header />
            <div className="px-4 sm:px-10 lg:px-24 h-min-[calc(100vh-60px)]">
                {children}
            </div>
            <Toaster/>
        </ThemeProvider>
    );
}

export default Layout;
