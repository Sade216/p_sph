import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSettings from "./components/AccountSettings";
import GeneralSettings from "./components/GeneralSettings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStore } from "@tanstack/react-store";
import { authStore } from "@/lib/store/authStore";
import { NavLink } from "react-router";

function Settings() {
    const { user } = useStore(authStore);
    return (
        <>
            <Tabs
                className="my-5 gap-5 block lg:flex lg:flex-row"
                defaultValue="account">
                <ScrollArea className="mb-5">
                    <NavLink to={`/${user?.username}`} className="flex flex-row gap-4 items-center hover:bg-accent/50 rounded-lg mb-4 p-2">
                        <Avatar className="cursor-pointer ring-1 ring-purple-600 hover:ring-purple-4">
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
                        <div>
                            <div className="text-[16px]">{user?.username}</div>
                            <div className="text-[12px] text-gray-500">
                                {user?.email}
                            </div>
                        </div>
                    </NavLink>
                    <TabsList className="flex flex-row gap-1 h-10 w-auto lg:w-80 lg:flex-col lg:h-auto xl:w-120">
                        <TabsTrigger
                            className="cursor-pointer w-full"
                            value="account">
                            Аккаунт
                        </TabsTrigger>
                        <TabsTrigger
                            className="cursor-pointer w-full"
                            disabled
                            value="general">
                            Общее
                        </TabsTrigger>
                    </TabsList>
                    <ScrollBar
                        className="hidden"
                        orientation="horizontal"
                    />
                </ScrollArea>
                <TabsContent value="account">
                    <AccountSettings />
                </TabsContent>
                <TabsContent value="general">
                    <GeneralSettings />
                </TabsContent>
            </Tabs>
        </>
    );
}

export default Settings;
