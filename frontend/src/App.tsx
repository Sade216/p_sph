import { Routes, Route } from "react-router"
import Home from "./components/pages/Home/Home"
import Layout from "./Layout"
import Admin from "./components/pages/Admin/Admin"
import ErrorPage from "./components/pages/Error/ErrorPage"
import Login from "./components/pages/Login/Login"
import { useStore } from "@tanstack/react-store"
import { authStore } from "./lib/store/authStore"
import Profile from "./components/pages/Profile/Profile"
import Settings from "./components/pages/Settings/Settings"

function App() {
    const {isAuthenticated, role} = useStore(authStore)

    return (
        <Layout>
            <Routes>
                <Route index path="/" element={<Home/>} />
                {isAuthenticated &&
                    <>
                        <Route path='/:id' element={<Profile/>} />
                        <Route path='/settings' element={<Settings/>} />
                        {role === 'admin' &&
                            <>
                                <Route path='/crm' element={<Admin/>} />
                            </>
                        }
                    </>

                }
                <Route path='/login' element={<Login/>} />
                <Route path={"*"} element={<ErrorPage/>} />
            </Routes>
        </Layout>
    )
}

export default App
