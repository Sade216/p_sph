import { PropsWithChildren, useEffect } from "react";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner"

import { userVerifyLogin } from "./lib/api/authApi";

import Header from "./components/layout/Header/Header";

function Layout({ children }: PropsWithChildren) {

    useEffect(() => {
        userVerifyLogin()
    }, []);
    
    return (
        <ThemeProvider defaultTheme="dark" storageKey="theme">
            <Header />
            <div className="px-4 sm:px-10 lg:px-24 h-min-[calc(100vh-60px)] pb-15 lg:mb-0">
                {children}
            </div>
            <Toaster expand={true} richColors/>
        </ThemeProvider>
    );
}

export default Layout;
