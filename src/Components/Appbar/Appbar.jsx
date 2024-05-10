import React from "react";
import '../Appbar/Appbar.css'
const Appbar = () =>
    {
        return(
            <div>
                <div className="Barcontainer">
                    <div className="img-src">
                        <img src="image001.png" alt="Logo"/>
                    </div>
                    <div className="appname">
                        <h1>Dashboard</h1>
                    </div>
                    <div>
                        <button className="btn"><span className="text">Contact Us</span></button>
                    </div>
                </div>
            </div>
        )
    }
export default Appbar;