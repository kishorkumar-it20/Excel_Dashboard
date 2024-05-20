import React, { useEffect, useRef, useState } from 'react';
import { LuFlag } from "react-icons/lu";
import { useExcelData } from '../ExcelDataContent';
import { Link } from 'react-router-dom';
import WiderLineChart from './WiderLineChart ';
import Chart from 'chart.js/auto';
import { FaChartPie } from "react-icons/fa";
import './Mainboard.css';
import { BsGraphUpArrow } from "react-icons/bs";
import BagGraph from './Baggraph';

const MainboardContent = ({ excelData }) => {
    const dataArray = Array.isArray(excelData) ? excelData : [];

    // Process data and render components
    const bagData = dataArray.map(item => ({ "DATE": item["DATE"], "No of Bags": item["No of Bags"] }));
    const uniqueCountries = new Set(excelData.map(item => item["Origin Country"]));
    const supplierCounts = {};
    excelData.forEach(item => {
        const supplierName = item["SUPPLIER NAME"];
        supplierCounts[supplierName] = (supplierCounts[supplierName] || 0) + 1;
    });

    const descriptionCounts = {};
    excelData.forEach(item => {
        const description = item["DESCRIPTION"];
        descriptionCounts[description] = (descriptionCounts[description] || 0) + 1;
    });

    const countryCounts = {};
    excelData.forEach(item => {
        const country = item["Origin Country"];
        countryCounts[country] = (countryCounts[country] || 0) + 1;
    });

    const chartRefDescription = useRef(null);
    const chartRefCountry = useRef(null);

    const [descriptionData, setDescriptionData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [leadTimeData, setLeadTimeData] = useState({});
    const chartRefLeadTime = useRef(null);
    const chartRefLeadTimeInstance = useRef(null); // Keep track of Chart instance

    const [transitTimeData, setTransitTimeData] = useState([]);
    const chartRefTransit = useRef(null);
    const chartRefTransitInstance = useRef(null); // Keep track of Chart instance

    useEffect(() => {
        if (excelData && excelData.length > 0) {
            // Calculate lead time distribution
            const leadTimes = excelData.map(item => item['Customs clearance lead Time']);
            const leadTimeCounts = {};
            leadTimes.forEach(time => {
                leadTimeCounts[time] = (leadTimeCounts[time] || 0) + 1;
            });
            setLeadTimeData(leadTimeCounts);
        }
    }, [excelData]);

    useEffect(() => {
        if (chartRefLeadTimeInstance.current) {
            chartRefLeadTimeInstance.current.destroy(); // Destroy previous instance
        }
        if (chartRefLeadTime.current && Object.keys(leadTimeData).length > 0) {
            const ctx = chartRefLeadTime.current.getContext('2d');
            chartRefLeadTimeInstance.current = new Chart(ctx, {
                type: 'bar', // Changed to bar
                data: {
                    labels: Object.keys(leadTimeData),
                    datasets: [{
                        label: 'Customs clearance lead Time',
                        data: Object.values(leadTimeData),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            // Add more colors as needed
                        ],
                        borderWidth: 1,
                    }],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                        },
                    },
                },
            });
        }
    }, [leadTimeData]);

    useEffect(() => {
        if (excelData && excelData.length > 0) {
            // Calculate transit time distribution
            const transitTimes = excelData.map(item => item['Transit Time']); // Assuming 'Transit Time' is the column name
            const transitTimeCounts = transitTimes.reduce((counts, time) => {
                counts[time] = (counts[time] || 0) + 1;
                return counts;
            }, {});
            setTransitTimeData(Object.values(transitTimeCounts));
        }
    }, [excelData]);

    useEffect(() => {
        if (chartRefTransitInstance.current) {
            chartRefTransitInstance.current.destroy(); // Destroy previous instance
        }
        if (chartRefTransit.current && transitTimeData.length > 0) {
            const ctx = chartRefTransit.current.getContext('2d');
            chartRefTransitInstance.current = new Chart(ctx, {
                type: 'bar', // Changed to bar
                data: {
                    labels: Object.keys(transitTimeData),
                    datasets: [
                        {
                            label: 'Transit Time Distribution',
                            data: transitTimeData,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(255, 159, 64, 0.6)',
                                // Add more colors if needed
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                        },
                    },
                },
            });
        }
    }, [transitTimeData]);

    useEffect(() => {
        setDescriptionData(Object.values(descriptionCounts));
    }, [excelData]);

    useEffect(() => {
        setCountryData(Object.values(countryCounts));
    }, [excelData]);

    // UseEffect for rendering the Description chart
    useEffect(() => {
        if (chartRefDescription.current && descriptionData.length > 0) {
            const ctx = chartRefDescription.current.getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: Object.keys(descriptionCounts),
                    datasets: [{
                        label: 'Description Distribution',
                        data: descriptionData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            // Add more colors if needed
                        ],
                        borderWidth: 1,
                    }],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            color: 'white'
                        },
                        legend: {
                            display: true,
                            position: 'right', // Align the labels to the right
                        },
                    },
                },
            });
        }
    }, [descriptionData]);

    // UseEffect for rendering the Country chart
    useEffect(() => {
        if (chartRefCountry.current && countryData.length > 0) {
            const ctx = chartRefCountry.current.getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: Object.keys(countryCounts),
                    datasets: [{
                        label: 'Origin Country Distribution',
                        data: countryData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            // Add more colors if needed
                        ],
                        borderWidth: 1,
                    }],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                        },
                        legend: {
                            display: true,
                            position: 'right', // Align the labels to the right
                        },
                    },
                },
            });
        }
    }, [countryData]);

    return (
        <div>
            <div className="box1">
                <div className="box2-details">
                    <div className="icon2"><LuFlag /></div>
                    <h1>Origin Places</h1>
                    <ul className="scrollable-menu">
                        {[...uniqueCountries].map((country, idx) => (
                            <li key={idx}>{country}</li>
                        ))}
                    </ul>
                </div>
            </div>
            {Object.keys(leadTimeData).length > 0 && (
                <div className="box8">
                    <div className="box6details">
                        <div className="icon6"><FaChartPie /></div>
                        <p>Customs clearance lead Time chart</p>
                        <canvas ref={chartRefLeadTime} className='piechart' style={{ width: '500px', height: '350px', marginLeft: '-90px', color: 'white' }} />
                    </div>
                </div>
            )}
            {transitTimeData.length > 0 && (
                <div className="box9">
                    <div className="box6details">
                        <div className="icon6"><FaChartPie /></div>
                        <p>Transit Time chart</p>
                        <canvas ref={chartRefTransit} className='piechart' style={{ width: '500px', height: '350px', marginLeft: '-90px' }} />
                    </div>
                </div>
            )}
            <div className="box3">
                <div className="box4-details">
                    <h1>Suppliers Name and No.of.<br />supply</h1>
                    <ul className="scrollable-menu1">
                        {Object.keys(supplierCounts).map((supplierName, idx) => (
                            <li key={idx}>
                                {supplierName} - {supplierCounts[supplierName]}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {descriptionData.length > 0 && (
                <div className="box10">
                    <div className="box6details">
                        <div className="icon6"><FaChartPie /></div>
                        <p>Description chart</p>
                        <canvas ref={chartRefDescription} className='piechart' style={{ width: '500px', height: '400px', marginLeft:'-80px' }} />
                    </div>
                </div>
            )}

            {/* Origin Country Chart */}
            {countryData.length > 0 && (
                <div className="box11">
                    <div className="box6details">
                        <div className="icon6"><FaChartPie /></div>
                        <p>Origin Country chart</p>
                        <canvas ref={chartRefCountry} className='piechart' style={{ width: '500px', height: '400px',marginLeft:'-80px' }} />
                    </div>
                </div>
            )}
            <div className="box4">
                <div className="box3-details">
                    <div className="icon3"><BsGraphUpArrow /></div>
                    <h1>No of Bag Supplied</h1>
                    <div className="weightgraph">
                        <BagGraph bagData={bagData} />
                    </div>
                </div>
            </div>
            <div className="box2">
                <div className="box3-details">
                    <div className="icon3"><BsGraphUpArrow /></div>
                    <h1>Gross Weight Metric Ton</h1>
                    <div className="weightgraph">
                        <WiderLineChart data={excelData} />
                    </div>
                </div>
            </div>
             {/* <Link to="/graph">
                <button className="btn">
                    <span className="text">Show Graph</span>
                </button>
            </Link> */}
        </div>
    );
};

const Mainboard = () => {
    const { excelData } = useExcelData(); // Access parsed data from context

    return (
        <div>
            {excelData && <MainboardContent excelData={excelData} />}
            {!excelData && <div className='no-data'>
                <img src="image-removebg-preview.png" alt="" />
                <h1>No data found</h1>
            </div>}
        </div>
    );
};

export default Mainboard;
