import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BagGraph = ({ bagData }) => {
    return (
        <div>
            <div style={{ width: '1750px', margin: 'auto' }}>
                <ResponsiveContainer width="100%" height={450}>
                    <BarChart data={bagData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis />
                        <YAxis label={{ value: 'No. of bags', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="No of Bags" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BagGraph;