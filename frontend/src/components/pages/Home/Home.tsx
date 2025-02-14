import { authStore } from "@/lib/authStore";

import { useStore } from "@tanstack/react-store";
import { AudioWaveform, Disc3, Headphones } from "lucide-react";

function Home() {
    const {user} = useStore(authStore);

    return (
        <div className="flex flex-col-reverse xl:flex-row gap-10 my-5">
            <div className="flex flex-4 flex-col gap-5">
                <div className="">
                    <div className="flex flex-row items-center mb-5 gap-5">
                        <AudioWaveform className="size-8" />
                        <div>
                            <div className="text-xl">В топе</div>
                            <div className=" text-gray-400">
                                Самые прослушиваемые
                            </div>
                        </div>
                    </div>
                    <div className="bg-secondary rounded-xl h-50 shadow-xl">
                        {}
                    </div>
                </div>
                <div className="">
                    <div className="flex flex-row items-center mb-5 gap-5">
                        <Disc3 className="size-8" />
                        <div>
                            <div className="text-xl">Плейлисты</div>
                            <div className="text-gray-400">
                                Популярное
                            </div>
                        </div>
                    </div>
                    <div className="bg-secondary rounded-xl h-50 shadow-xl">
                        {}
                    </div>
                </div>
            </div>
            <div className="flex flex-3 lg:flex-2 xl:flex-1 flex-col gap-5">
                <div className="">
                    <div className="flex flex-row items-center mb-5 gap-5">
                        <Headphones className="size-8" />
                        <div>
                            <div className="text-xl">Для вас</div>
                            <div className="text-gray-400">
                                {user?.username}
                            </div>
                        </div>
                    </div>
                    <div className="bg-secondary rounded-xl h-50 shadow-xl"></div>
                </div>
            </div>
        </div>
    );
}

export default Home;
