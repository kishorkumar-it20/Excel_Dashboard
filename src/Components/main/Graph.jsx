import React from "react";
import './Mainboard.css'
import { useExcelData } from '../ExcelDataContent';
import { BsGraphUpArrow } from "react-icons/bs";
import WiderLineChart from './WiderLineChart ';
import BagGraph from './Baggraph';
import Appbar1 from "../Appbar/Appbar1";

const Graph = ({ excelData, graphWidth, graphHeight }) => { // Destructure excelData, graphWidth, and graphHeight from props
    // Ensure excelData is an array
    const dataArray = Array.isArray(excelData) ? excelData : [];

    // Process data and render components
    const bagData = dataArray.map(item => ({ "DATE": item["DATE"], "No of Bags": item["No of Bags"] }));

    return(
        <div>
            <Appbar1/>
            <div className="box2">
                <div className="box3-details">
                    <div className="icon3"><BsGraphUpArrow /></div>
                    <h1>Gross Weight Metric Ton</h1>
                    <div className="weightgraph">
                        <WiderLineChart data={excelData} width={graphWidth} height={graphHeight} /> {/* Pass width and height props */}
                    </div>
                </div>
            </div>
        </div>
    )
}
const Mainboard1 = () => {
    const { excelData } = useExcelData(); // Access parsed data from context

    // Define width and height for the graphs
    const graphWidth = 600;
    const graphHeight = 300;

    return (
        <div>
            {excelData && <Graph excelData={excelData} graphWidth={graphWidth} graphHeight={graphHeight} />} {/* Pass width and height props */}
            {!excelData && <div className='no-data'>
                <img src="image-removebg-preview.png" alt="" />
                <h1>No data found</h1>
            </div>}
        </div>
    );
};

export default Mainboard1;
