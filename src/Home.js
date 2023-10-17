import React, { useEffect, useState } from "react";

function Home() {
    let [data, setData] = useState([]);



    function show() {
        fetch("https://socail-back.onrender.com/allpost").then((res) => res.json()).then((data) => {
           //  console.log(data)
                setData(data)


        })

    }
    useEffect(() => {
        show()
    },[])


    return (
     <>
            {data.map((ell) => {
                return <div className="card">
                    {ell.post.map((el) => {
                        return <div className="card mb-3 my-3 mx-3">
                            <img src={`${el.img}`} />
                            <h5>{el.text}</h5>
                        </div>
                    })}




                </div>

            })
            }
        </>


    )

}
export default Home
