import { NavLink } from "react-router";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
    House,
    LogIn,
    LogOut,
    Settings,
    ShieldAlert,
    User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "@/components/ui/button";
import { authStore, clearUser } from "@/lib/store/authStore";
import { useStore } from "@tanstack/react-store";
import { toast } from "sonner";

function NavMenuButton() {
    const { isAuthenticated, user, role } = useStore(authStore);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer ring-1 hover:ring-2 ring-purple-600 hover:ring-purple-4 00">
                        <AvatarImage
                            src={user?.avatar}
                            alt={user?.username}
                        />
                        <AvatarFallback>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle
                                    cx="12"
                                    cy="7"
                                    r="4"
                                />
                            </svg>
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                    {user && (
                        <>
                            <DropdownMenuLabel>
                                <div className="text-[16px]">
                                    {user?.username}
                                </div>
                                <div className="text-[12px] text-gray-500">
                                    {user?.email}
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                        </>
                    )}
                    <DropdownMenuItem
                        asChild
                        className="hidden lg:flex xl:hidden">
                        <NavLink
                            className="cursor-default [.active]:text-primary"
                            to="/">
                            <House />
                            <span>Главная страница</span>
                        </NavLink>
                    </DropdownMenuItem>
                    {role === "admin" && (
                        <DropdownMenuItem asChild>
                            <NavLink
                                className="cursor-default [.active]:text-primary"
                                to="/crm">
                                <ShieldAlert />
                                <span>Админ-панель</span>
                            </NavLink>
                        </DropdownMenuItem>
                    )}
                    {isAuthenticated && (
                        <>
                            <DropdownMenuItem
                                asChild
                                className="hidden lg:flex xl:hidden">
                                <NavLink
                                    className="cursor-default [.active]:text-primary"
                                    to={`/${user?.username}`}>
                                    <User />
                                    <span>Профиль</span>
                                </NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <NavLink
                                    className="cursor-default [.active]:text-primary"
                                    to="/settings">
                                    <Settings />
                                    <span>Настройки</span>
                                </NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </>
                    )}
                    {!isAuthenticated && (
                        <DropdownMenuItem asChild>
                            <NavLink
                                className="cursor-default [.active]:text-primary"
                                to="/login">
                                <LogIn />
                                <span>Логин/Регистрация</span>
                            </NavLink>
                        </DropdownMenuItem>
                    )}
                    {isAuthenticated && (
                        <DropdownMenuItem asChild>
                            <Button
                                className="cursor-default bg-transparent w-full justify-start text-black dark:text-white hover:bg-accent"
                                onClick={() => {
                                    clearUser();
                                    toast("Вы вышли :(");
                                }}>
                                <LogOut />
                                <span>Выйти</span>
                            </Button>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export default NavMenuButton;
