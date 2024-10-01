import React from "react";
import { Link, useRouteError } from "react-router-dom";

function Error() {
    let errorData = useRouteError();
    return(
    <>
    <div className="error-container">
        <div>
            <h1 style={{fontSize:"90px"}}>{errorData.status}</h1>
            <h1 style={{fontSize: "80px"}}>{errorData.statusText}</h1>
            <div style={{fontSize: "60px"}}>Oops! The Page You Are Looking For Is Not Found </div>
            <Link to="/"><button style={{position: "absolute", top: "50px", backgroundColor: "blue", border:"1px solid black" }}>
            Return To Home 
            </button></Link>
        </div>
    </div>
    </>
    )
}

export default Error;