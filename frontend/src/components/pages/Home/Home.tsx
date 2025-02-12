import { authStore } from "@/lib/authStore"

import { useStore } from "@tanstack/react-store";

function Home() {
    const auth = useStore(authStore)
    
    return (
        <div className="flex text-center gap-5">
            <div className="w-30 flex-3">
                <div className="bg-secondary rounded-xl h-50">
                    {auth ? `Авторизован?: ${auth.isAuthenticated}` : ''}
                    {}
                </div>
            </div>
            <div className="w-30 flex-1">
                <div className="bg-secondary rounded-xl h-50">

                </div>
            </div>
        </div>
    )
}

export default Home