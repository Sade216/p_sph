import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

type AvatarProps = {
    img: string;
    alt?: string;
    isOwner?: boolean;
};

function AvatarCard({ img, alt = "", isOwner = false }: AvatarProps) {

    function handleImageUpload() {

    }
    return (
        <div className="h-50 content-center justify-items-center">
            <Avatar className="size-32 ring-1 ring-purple-600 hover:ring-purple-4">
                <AvatarImage
                    src={img}
                    alt={alt}
                />
                {isOwner && (
                    <div
                        className="opacity-0 hover:opacity-100 absolute hover:bg-primary/75 rounded-full cursor-pointer h-full w-full content-center justify-items-center"
                        onClick={() => handleImageUpload}>
                        <Camera />
                    </div>
                )}
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
    );
}

export default AvatarCard;
