import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authStore } from "@/lib/store/authStore";
import { useStore } from "@tanstack/react-store";

function AccountSettings() {
    const { user } = useStore(authStore);
    return (
        <div className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Логин</Label>
                <Input
                    type="text"
                    placeholder={user?.username}
                    defaultValue={user?.username}
                    disabled
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Почта</Label>
                <Input
                    type="text"
                    placeholder={user?.email}
                    defaultValue={user?.email}
                    disabled
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Пароль</Label>
                <Input
                    type="text"
                    placeholder={"**********"}
                    defaultValue={"**********"}
                    disabled
                />
            </div>
            <div className="">
                <Button
                    className="w-full cursor-pointer"
                    disabled
                >
                    Изменить
                </Button>
            </div>
        </div>
    );
}

export default AccountSettings;
