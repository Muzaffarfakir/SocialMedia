import React, { useState } from "react";
import { ReactDOM } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie"

function Login() {
    let [email, setEmail] = useState();
    let [pass, setPass] = useState();
    let [_,setCookies]=useCookies(["access_token"])
    let nav=useNavigate()

    function log() {
        axios.post("https://socail-back.onrender.com/login", { email, pass }).then((res)=>{
           if(res.data.mess=="hai"){
            setCookies("access_token",res.data.token)
            window.localStorage.setItem("token",res.data.token);
            window.localStorage.setItem("id",res.data.id);

            nav("/profile")
            
           }
           else{
            alert("You Enter a Wrong Credientls")
           }
        })
    }


    return (
        <>
            <h2 className="text-center">Login</h2>
            <div class="card my-6 mx-3 mb-6 ">


                <div class="input-group mb-3  " style={{ marginTop: "3rem" }}>
                    <input type="text" encType="multipart/form-data" placeholder="Enter a Email here" onChange={(e) => { setEmail(e.target.value) }} class="form-control" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                    </div>
                </div>
                <div class="input-group mb-3  " style={{ marginTop: "3rem" }}>
                    <input type="text" name="Name" placeholder="Enter a Pass here" onChange={(e) => { setPass(e.target.value) }} class="form-control" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                    </div>
                </div>
                <button onClick={log} className="text-center btn btn-outline-primary my-4">Login</button>
            </div>
        </>
    )

}
export default Login;
