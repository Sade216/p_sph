import { Routes, Route } from "react-router"
import Home from "./components/pages/Home/Home"
import Layout from "./components/layout/Layout"
import Admin from "./components/pages/Admin/Admin"
import ErrorPage from "./components/pages/Error/ErrorPage"
import Login from "./components/pages/Login/Login"
import { useStore } from "@tanstack/react-store"
import { authStore } from "./lib/authStore"

function App() {
    const {isAuthenticated, role} = useStore(authStore)

    return (
        <Layout>
            <Routes>
                <Route index element={<Home/>} />
                {isAuthenticated &&
                    <>
                        <Route path='/profile' element={<div>123321</div>} />
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
