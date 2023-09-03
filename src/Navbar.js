import React from "react";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom"
import SignUp from "./SignUp";
import 'bootstrap/dist/css/bootstrap.css'
import "./Navbar.css"
import Login from "./Login";
import { useCookies } from "react-cookie";
import Profile from "./Profile";
import Home from "./Home"
function Navbar() {
    let [cookies, setCookies] = useCookies(["access_token"])
    return (
        <>
            <BrowserRouter>


                <nav>

                    <ul>

                        <li>

                            <Link to={'/'}>Home</Link>

                        </li>
                        <li>
                            <Link to={'/SignUp'}>SignUp</Link>

                        </li>
                        {!cookies.access_token ? (<li>
                            <Link to={'/Login'}>Login</Link>

                        </li>) : (<li>
                            <Link to={'/Profile'}>Profile</Link>

                        </li>)}



                    </ul>
                </nav>

                <Routes>
                    <Route
                        path="/SignUp"
                        element={<SignUp />}

                    />
                    <Route
                        path="/"
                        element={<Home/>}


                    />  <Route
                        path="/Login"
                        element={<Login />}

                    />
                    <Route
                        path="/Profile"
                        element={<Profile />}

                    />
                </Routes>
            </BrowserRouter>


        </>
    )

}
export default Navbar;