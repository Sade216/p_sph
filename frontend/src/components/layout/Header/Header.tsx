import LogoSVG from "@/assets/Logo.svg";
import { NavLink } from "react-router";
import ThemeToggleButton from "./ThemeToggleButton";
import NavMenuButton from "./NavMenuButton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { House, User } from "lucide-react";
import { useStore } from "@tanstack/react-store";
import { authStore } from "@/lib/store/authStore";

function Header() {
    const { isAuthenticated, user } = useStore(authStore);
    return (
        <>
            <header className="z-1 sticky top-0 backdrop-blur-lg flex-row justify-between px-4 sm:px-10 lg:px-24 h-15 items-center  hidden lg:flex">
                <NavLink
                    to="/"
                    className="flex flex-row gap-2 text-primary hover:text-purple-500 items-center">
                    <img src={LogoSVG} />
                    <div className="lg:block">Sample Packs House</div>
                    <Badge
                        className="scale-80"
                        variant="destructive">{`Work in progress...`}</Badge>
                </NavLink>
                <div className="flex flex-row gap-5">
                    <div className="gap-5 lg:hidden xl:flex items-center">
                        <NavLink
                            className="py-1 px-3 rounded-2xl  [.active]:text-primary hover:text-primary"
                            to="/">
                            Главная
                        </NavLink>
                        {isAuthenticated && (
                            <NavLink
                                className="py-1 px-3 rounded-2xl  [.active]:text-primary hover:text-primary"
                                to={`/${user?.username}`}>
                                Профиль
                            </NavLink>
                        )}
                    </div>
                    <div className="flex flex-row gap-2 items-center rounded-full bg-muted">
                        <ThemeToggleButton />
                        <NavMenuButton />
                    </div>
                </div>
            </header>
            <nav className="block lg:hidden fixed bottom-0 w-full h-15 bg-black">
                <div className="flex flex-row h-full justify-between">
                    <div></div>
                    <NavLink
                        to="/"
                        className="content-center justify-items-center w-full [.active]:text-primary">
                        <House />
                    </NavLink>
                    <Separator
                        orientation="vertical"
                        className="h-[50%]! self-center"
                    />
                    {isAuthenticated && (
                        <NavLink
                            to={`/${user?.username}`}
                            className="content-center justify-items-center w-full [.active]:text-primary">
                            <User />
                        </NavLink>
                    )}
                    <Separator
                        orientation="vertical"
                        className="h-[50%]! self-center"
                    />
                    <div className="content-center justify-items-center w-full">
                        <NavMenuButton />
                    </div>
                    <div></div>
                </div>
            </nav>
        </>
    );
}

export default Header;
