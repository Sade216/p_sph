import { Button } from "@/components/ui/button";
import { timestampToData } from "@/lib/utils";
import { TUser } from "@_types/types";
import AvatarCard from "../components/avatarCard/AvatarCard";

interface UserProps {
    user: TUser;
    isOwner?: true | false;
}

function ProfileComponent({ user, isOwner = false }: UserProps) {
    return (
        <div className="flex flex-col sm:flex-row lg:flex-row gap-10 my-5">
            <div className="flex-1">
                <AvatarCard
                    img={user.avatar ? user.avatar : ""}
                    isOwner={isOwner}
                />
                <div className="flex flex-col gap-2 px-10 mt-2">
                    <div className="text-xl">{user.username}</div>
                    <div className="">
                        {`Создан: ` + timestampToData(user.createdAt, false)}
                    </div>
                    <Button
                        className="rounded-2xl mt-4"
                        disabled>
                        Отслеживать
                    </Button>
                </div>
                <div className="flex flex-col gap-2 px-10 mt-10">
                    <div className="flex flex-row gap-2 justify-between">
                        <div className="flex flex-col items-start">
                            <div className="text-xl">стата</div>
                            <div className="">стата</div>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="text-xl">стата</div>
                            <div className="">стата</div>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="text-xl">стата</div>
                            <div className="">стата</div>
                        </div>
                    </div>
                    <hr className="my-5" />
                    <div>
                        <div>link</div>
                        <div>link</div>
                        <div>link</div>
                        <div>link</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-3 gap-10">
                <div className="h-50 rounded-2xl bg-secondary shadow-xl"></div>
                <div className="flex gap-10 flex-col-reverse lg:flex-row">
                    <div className="h-60 rounded-2xl bg-secondary shadow-xl flex-none lg:flex-2"></div>
                    <div className="flex flex-col flex-none lg:flex-1 gap-5">
                        <div className="text-xl">О себе:</div>
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Eum accusamus quibusdam amet expedita aut
                            fuga? Repudiandae ipsam provident alias vero
                            repellendus nesciunt animi recusandae consequuntur
                            dolor veritatis odio, quo nihil?
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileComponent;
