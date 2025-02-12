import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UsersTable from "./UsersTable"


function Admin() {
  return (
    <>
        <Tabs defaultValue="users" className="w-full">
            <TabsList className="h-10 gap-4">
                <TabsTrigger className="text-lg" value="users">Пользователи</TabsTrigger>
                <TabsTrigger className="text-lg" value="news">Новости</TabsTrigger>
                <TabsTrigger className="text-lg" value="music">Музыка</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
                <UsersTable/>
            </TabsContent>
            <TabsContent value="news">
                NewsTable
            </TabsContent>
            <TabsContent value="music">
                MusicTable
            </TabsContent>
        </Tabs>

    </>
  )
}

export default Admin