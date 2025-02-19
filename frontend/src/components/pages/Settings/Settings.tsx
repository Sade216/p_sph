import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSettings from "./components/AccountSettings";
import GeneralSettings from "./components/GeneralSettings";

function Settings() {
    return (
        <>
            <Tabs
                className="my-5 gap-5 block lg:flex lg:flex-row"
                defaultValue="account">
                <ScrollArea className="mb-5">
                    <TabsList className="flex flex-row gap-1 h-10 w-auto lg:w-80 lg:flex-col lg:h-auto xl:w-120">
                        <TabsTrigger
                            className="cursor-pointer w-full"
                            value="account">
                            Аккаунт
                        </TabsTrigger>
                        <TabsTrigger
                            className="cursor-pointer w-full"
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
