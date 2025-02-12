import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { SignInForm } from "./SignInForm";


export default function LoginPage() {

    return (
        <div className="flex flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="">
                <Tabs defaultValue="login">
                    <TabsList className="gap-4 self-center">
                        <TabsTrigger
                            className="w-25"
                            value="login">
                            Логин
                        </TabsTrigger>
                        <TabsTrigger
                            className="w-25"
                            value="signin">
                            Регистрация
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <LoginForm />
                    </TabsContent>
                    <TabsContent value="signin">
                        <SignInForm/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
