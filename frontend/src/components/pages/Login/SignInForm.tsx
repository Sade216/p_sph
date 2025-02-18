import { useState } from "react";

import { cn } from "@/lib/utils";
import { userSignIn } from "@/lib/api/authApi";
import { TUserRegister } from "@_types/types";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";


const initValue: TUserRegister = {
    username: "",
    email: "",
    password: "",
};

export function SignInForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [userData, setUserData] = useState<TUserRegister>(initValue);
    const [isLoading, setIsLoading] = useState(false)

    async function handleSignIn() {
        if (userData.email.length > 3 && userData.password.length > 3) {
            setIsLoading(true)
            userSignIn(userData).then(() => {
                setIsLoading(false)
                setUserData(initValue);
            }).catch(()=>{
                setIsLoading(false)
            });
        }
    }

    return (
        <div
            className={cn("flex flex-col gap-6", className)}
            {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">
                        Samples Packs House
                    </CardTitle>
                    <CardDescription>
                        Регистрация с помощью Email
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Почта</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="vasysiy@example.com"
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                email: e.target.value.toString(),
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Логин</Label>
                                    <Input
                                        id="username"
                                        type="username"
                                        placeholder="your_nickname"
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                username:
                                                    e.target.value.toString(),
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Пароль</Label>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                password:
                                                    e.target.value.toString(),
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <Button
                                    className="w-full"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSignIn();
                                    }}>
                                        {isLoading ?
                                        <LoaderCircle className="size-6 animate-spin" />
                                        :
                                        'Зарегистрироваться'                    
                                    }
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                By clicking continue, you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}
