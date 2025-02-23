import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TUser } from "@_types/types";
import { SquarePen } from "lucide-react";

type Props = {
    user: TUser
}

function EditProfile({user}: Props) {

    function handleEditProfile(){
        
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-full" variant="ghost">
                        <SquarePen />
                        <div>Изменить</div>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Изменить профиль пользователя: {user.username}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="username"
                                className="text-right">
                                Username
                            </Label>
                            <Input
                                id="username"
                                value={user.username}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="avatar"
                                className="text-right">
                                Avatar
                            </Label>
                            <Input
                                id="avatar"
                                value={user.avatar}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={()=> handleEditProfile} type="submit">Изменить</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default EditProfile;
