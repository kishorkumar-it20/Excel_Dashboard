import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import { LuFlag } from "react-icons/lu";
import { BsGraphUpArrow } from "react-icons/bs";
import '../main/Mainboard.css'
import StyledWeightLineChart from "./WeightGraph";
import Bag_graph from "./Baggraph";
const Mainboard = ()=>{
    return(
        <div>
            <div className="box1">
                <div className="box1-details">
                    <div className="icon1"><IoPersonOutline /></div>
                    <h1>No.of.Clients</h1>
                    <p>1</p>
                </div>
            </div>
            <div className="box1">
            <div className="box2-details">
                <div className="icon2"><LuFlag /></div>
                    <h1>Origin Places</h1>
                    <ul className="scrollable-menu">
                        <li>China</li>
                        <li>Korea</li>
                        <li>Indonesia</li>
                        <li>Malaysia</li>
                    </ul>
                </div>
            </div>
            <div className="box2">
                <div className="box3-details">
                    <div className="icon3"><BsGraphUpArrow /></div>
                    <h1>Gross Weight Metric Ton</h1>
                    <div className="weightgraph">
                        <StyledWeightLineChart/>
                    </div>
                </div>
            </div>
            <div className="box3">
                <div className="box4-details">
                    <h1>Suppliers Name and <br/> No.of.supply</h1>
                    <ul className="scrollable-menu1">
                        <li>GOLDEN GAIN GROUP - 40</li>
                        <li>DAESANG CORPORATION - 10</li>
                        <li>CJ CHEILJEDANG - 5</li>
                        <li>ECO NUTRITION - 20</li>
                    </ul>
                </div>
            </div>
            <div className="box4">
                <div className="box3-details">
                    <div className="icon3"><BsGraphUpArrow /></div>
                    <h1>No of Bag Supplied</h1>
                    <div className="weightgraph">
                        <Bag_graph/>
                    </div>
                </div>
            </div>
            <div className="box5">
                <div className="box4-details">
                    <h1 style={{marginTop: "10px"}}>Remarks</h1>
                    <ul className="scrollable-menu1">
                        <li>Cleared - 40</li>
                        <li>Yet to arrive - 10</li>
                        <li>Under customs - 5</li>
                    </ul>
                </div>
            </div>
            <div className="box5">
                <div className="box4-details">
                    <h1 style={{marginTop: "10px"}}>Remarks</h1>
                    <ul className="scrollable-menu1">
                        <li>Cleared - 40</li>
                        <li>Yet to arrive - 10</li>
                        <li>Under customs - 5</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Mainboard;