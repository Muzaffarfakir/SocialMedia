import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'
import axios from "axios";

function Profile() {
    let nav = useNavigate();
    let [_, setCookies] = useCookies(["access_token"])
    let [text, SetText] = useState();
    let [data, setData] = useState([])
    let [dataPost, setDataPost] = useState([]);
    let [v,SetV]=useState(0);



    function Logout() {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("id");
        setCookies("access_token", "")
        nav("/login")



    }
    function k(e) {
        let file = e.target.files[0];
        let data = new FormData();
        data.append("imgs", file);
        axios({
            method: "post",
            url: "http://localhost:8000/postImg",
            data: data,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

        })

    }
    let id = window.localStorage.getItem('id')


    function posts() {
        if (text == undefined || text == null) {
            alert("Write sometings here first")
        }
        else {
            axios.post("http://localhost:8000/posts", { text, id });
            window.location.reload();

        }
    }
    function Show() {
        fetch(`http://localhost:8000/profile/${id}`).then((res) => res.json()).then((data) => {
            setData(data)
            setDataPost(data[0].post)

        })
    }
    useEffect(() => {
        Show();


    }, [])
  
  



    return (

        <>
            <h1 class="text-center">
                Your Profile
            </h1>
            {data.map((el) => {
                return <div class=" card text-center my-3 mb-3 mx-3">
                    <img src={`${el.img}`} alt="img here" />
                    <h5>Name :{el.name} </h5>
                    <p>Email :{el.email} </p>
                    <p>Password :{el.pass} </p>
                    <p>Mobile :{el.mobile} </p>
                    <p>Description :{el.des} </p>
                    <button className="btn btn-outline-danger" onClick={Logout}>Logout</button>

                </div>
            })}


            <div class="card mx-3">
                <h3 className="text-center">Make Post from here</h3>
                <div class="input-group mb-3  " style={{ marginTop: "2rem" }}>
                    <input type="file" encType="multipart/form-data" class="form-control" name="imgs" onChange={k} aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                    </div>
                </div>

                <div class="input-group  mb-3 " style={{ marginTop: "1rem" }}>
                    <textarea type="text" placeholder="Write your Thinking here" onChange={(e) => { SetText(e.target.value) }} class="form-control" aria-describedby="basic-addon2" ></textarea>
                    <div class="input-group-append">
                    </div>
                </div>
                <button onClick={posts} class="btn btn-outline-primary">Post</button>


            </div>
            <hr />
            {dataPost.map((ell) => {
                return <div className="card mx-4 my-6 mb-3">
                    <img src={`${ell.img}`} />

                    <div className="card-body">
                        <h5>{ell.text}</h5>
                        <i   class="fa-sharp fa-solid fa-star   " ><span title="This Rating Given By Our AI">{ell.view}</span></i>
                        <p>This Rating Given By Our Us </p>
                    </div>


                </div>


            })}





        </>

    )

}
export default Profile;