import React, { useEffect, useRef, useState } from 'react';
import { LuFlag } from "react-icons/lu";
import { BsGraphUpArrow } from "react-icons/bs";
import { useExcelData } from '../ExcelDataContent';
import Chart from 'chart.js/auto';
import { FaChartPie } from "react-icons/fa";
import WiderLineChart from './WiderLineChart ';
import Bag_graph from './Baggraph';
import './Mainboard.css'

const MainboardContent = ({ excelData }) => {
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

    const chartRefWeek = useRef(null);
    const chartRefMonth = useRef(null);
    const chartRefDescription = useRef(null);
    const chartRefCountry = useRef(null);

    const [etaWeekData, setEtaWeekData] = useState([]);
    const [etaMonthData, setEtaMonthData] = useState([]);
    const [descriptionData, setDescriptionData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    useEffect(() => {
        if (excelData && excelData.length > 0) {
            const etaDates = excelData.map(item => new Date(item.ETA));

            // Calculate ETA week data
            const etaWeeks = etaDates.reduce((weeks, date) => {
                const weekNumber = getWeekNumber(date);
                weeks[weekNumber] = (weeks[weekNumber] || 0) + 1;
                return weeks;
            }, {});
            setEtaWeekData(Object.values(etaWeeks));

            // Calculate ETA month data
            const etaMonths = etaDates.reduce((months, date) => {
                const monthName = date.toLocaleString('default', { month: 'long' }); // Convert date to month name
                months[monthName] = (months[monthName] || 0) + 1;
                return months;
            }, {});
            setEtaMonthData(Object.values(etaMonths));
        }
    }, [excelData]);

    useEffect(() => {
        if (chartRefWeek.current && etaWeekData.length > 0) {
            const ctx = chartRefWeek.current.getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: etaWeekData.map((_, index) => `Week ${index + 1}`),
                    datasets: [
                        {
                            label: 'ETA Week',
                            data: etaWeekData,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(255, 159, 64, 0.6)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'ETA Week Distribution',
                        },
                    },
                },
            });
        }
    }, [etaWeekData]);

    useEffect(() => {
        if (chartRefMonth.current && etaMonthData.length > 0) {
            const ctx = chartRefMonth.current.getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: Object.keys(etaMonthData), // Use month names as labels
                    datasets: [
                        {
                            label: 'ETA Month',
                            data: Object.values(etaMonthData),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(255, 159, 64, 0.6)',
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(255, 159, 64, 0.6)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'ETA Month Distribution',
                        },
                    },
                },
            });
        }
    }, [etaMonthData]);

    const getWeekNumber = (date) => {
        const oneJan = new Date(date.getFullYear(), 0, 1);
        const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
        return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
    };

    const [leadTimeData, setLeadTimeData] = useState({});
    const chartRefLeadTime = useRef(null);

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
        if (chartRefLeadTime.current && Object.keys(leadTimeData).length > 0) {
            const ctx = chartRefLeadTime.current.getContext('2d');
            new Chart(ctx, {
                type: 'pie',
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

    const transitTimes = excelData.map(item => item['Transit Time']); // Assuming 'Transit Time' is the column name

    const chartRefTransit = useRef(null);
    const [transitTimeData, setTransitTimeData] = useState([]);

    useEffect(() => {
        if (excelData && excelData.length > 0) {
            // Calculate transit time distribution
            const transitTimeCounts = transitTimes.reduce((counts, time) => {
                counts[time] = (counts[time] || 0) + 1;
                return counts;
            }, {});
            setTransitTimeData(Object.values(transitTimeCounts));
        }
    }, [excelData]);

    useEffect(() => {
        if (chartRefTransit.current && transitTimeData.length > 0) {
            const ctx = chartRefTransit.current.getContext('2d');
            new Chart(ctx, {
                type: 'pie',
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
            {etaWeekData.length > 0 && (
                <div className="box6">
                    <div className="box6details">
                        <div className="icon6"><FaChartPie /></div>
                        <p>ETA Week chart</p>
                        <canvas ref={chartRefWeek} className='piechart'/>
                    </div>
                </div>
            )}
            {etaMonthData.length > 0 && (
                <div className="box6">
                    <div className="box6details">
                        <div className="icon6"><FaChartPie /></div>
                        <p>ETA Month chart</p>
                        <canvas ref={chartRefMonth} className='piechart' />
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
             <div className="box2">
                <div className="box3-details">
                    <div className="icon3"><BsGraphUpArrow /></div>
                    <h1>Gross Weight Metric Ton</h1>
                    <div className="weightgraph">
                        <WiderLineChart data={excelData} />
                    </div>
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
            {Object.keys(leadTimeData).length > 0 && (
                <div className="box8">
                    <div className="box6details">
                        <div className="icon6"><FaChartPie /></div>
                        <p>Customs clearance lead Time chart</p>
                        <canvas ref={chartRefLeadTime} className='piechart' style={{ width: '350px', height: '350px',marginLeft:'-50px' }}/>
                    </div>
                </div>
            )}
            {transitTimeData.length > 0 && (
                <div className="box9">
                    <div className="box6details">
                        <div className="icon6"><FaChartPie /></div>
                        <p>Transit Time chart</p>
                        <canvas ref={chartRefTransit} className='piechart' style={{ width: '350px', height: '350px',marginLeft:'-50px' }}/>
                    </div>
                </div>
            )}
            {descriptionData.length > 0 && (
                <div className="box10">
                    <div className="box6details">
                        <div className="icon6"><FaChartPie /></div>
                        <p>Description chart</p>
                        <canvas ref={chartRefDescription} className='piechart' />
                    </div>
                </div>
            )}

            {/* Origin Country Chart */}
            {countryData.length > 0 && (
                <div className="box11">
                    <div className="box6details">
                        <div className="icon6"><FaChartPie /></div>
                        <p>Origin Country chart</p>
                        <canvas ref={chartRefCountry} className='piechart' />
                    </div>
                </div>
            )}
            {/* <div className="box5">
                <div className="box4-details">
                    <h1 style={{ marginTop: "10px" }}>Remarks</h1>
                    <ul className="scrollable-menu2">
                        <li>Cleared - 40</li>
                        <li>Yet to arrive - 10</li>
                        <li>Under customs - 5</li>
                    </ul>
                </div>
            </div> */}
        </div>
    );
};

const Mainboard = () => {
    const { excelData } = useExcelData(); // Access parsed data from context

    return (
        <div>
            {excelData && <MainboardContent excelData={excelData} />}
            {!excelData && <div>No data available</div>}
        </div>
    );
};

export default Mainboard;
