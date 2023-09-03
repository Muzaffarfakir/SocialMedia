import React, { useEffect, useState } from "react";

function Home() {
    let [data, setData] = useState([]);



    function show() {
        fetch("http://localhost:8000/allpost").then((res) => res.json()).then((data) => {
             console.log(data)
                setData(data[0].post)


        })

    }
    useEffect(() => {
        show()
    },[])


    return (
        <>
            {data.map((el) => {
return<div className="card mx-3 m-6 mb-3">
                    <img src={`${el.img}`} />
                    <h5>{el.text}</h5>


                </div>

            })
            }
        </>



    )

}
export default Home