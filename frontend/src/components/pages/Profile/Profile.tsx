import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";

function Profile() {
    const { id } = useParams();
    return (
        <>
            <div className="flex flex-col sm:flex-row lg:flex-row gap-10 my-5">
                <div className="flex-1">
                    <div className="h-50 content-center justify-items-center">
                        <Avatar className="size-32 cursor-pointer ring-1 hover:ring-2 ring-purple-600 hover:ring-purple-4">
                            <AvatarImage
                                src=""
                                alt=""
                            />
                            <AvatarFallback>
                                <svg
                                    className="size-16"
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
                    </div>
                    <div className="flex flex-col gap-2 px-10 mt-2">
                        <div className="text-xl">Никнейм</div>
                        <div className="">Описание</div>
                        <Button className="rounded-2xl mt-4">Отслеживать</Button>
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
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Eum accusamus quibusdam amet
                                expedita aut fuga? Repudiandae ipsam provident
                                alias vero repellendus nesciunt animi recusandae
                                consequuntur dolor veritatis odio, quo nihil?
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
