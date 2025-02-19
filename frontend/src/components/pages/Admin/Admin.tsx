import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersTable from "./UsersTable";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function Admin() {
    return (
        <>
            <Tabs
                className="my-5 gap-5 block lg:flex lg:flex-row"
                defaultValue="users"
                >
                <ScrollArea className="mb-5">
                    <TabsList className="flex flex-row gap-1 h-10 w-auto lg:w-50 lg:flex-col lg:h-auto xl:w-50">
                        <TabsTrigger
                            className="text-md cursor-pointer w-full"
                            value="users">
                            Пользователи
                        </TabsTrigger>
                        <TabsTrigger
                            className="text-md cursor-pointer w-full"
                            value="music">
                            Музыка
                        </TabsTrigger>
                        <TabsTrigger
                            className="text-md cursor-pointer w-full"
                            value="news">
                            Новости
                        </TabsTrigger>
                    </TabsList>
                    <ScrollBar
                        className="hidden"
                        orientation="horizontal"
                    />
                </ScrollArea>
                <TabsContent className="overflow-auto" value="users">
                    <UsersTable />
                </TabsContent>
                <TabsContent className="overflow-auto" value="music">MusicTable</TabsContent>
                <TabsContent className="overflow-auto" value="news">NewsTable</TabsContent>
            </Tabs>
        </>
    );
}

export default Admin;
