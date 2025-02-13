import { Routes, Route } from "react-router"
import Home from "./components/pages/Home/Home"
import Layout from "./Layout"
import Admin from "./components/pages/Admin/Admin"
import ErrorPage from "./components/pages/Error/ErrorPage"
import Login from "./components/pages/Login/Login"
import { useStore } from "@tanstack/react-store"
import { authStore } from "./lib/authStore"
import Profile from "./components/pages/Profile/Profile"

function App() {
    const {isAuthenticated, role} = useStore(authStore)

    return (
        <Layout>
            <Routes>
                <Route index element={<Home/>} />
                {isAuthenticated &&
                    <>
                        <Route path='/profile' element={<Profile/>} />
                        <Route path='/profile/:id' element={<Admin/>} />
                        {role === 'admin' &&
                            <>
                                <Route path='/admin' element={<Admin/>} />
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
