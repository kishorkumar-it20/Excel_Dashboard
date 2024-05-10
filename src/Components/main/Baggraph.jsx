import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Bag_graph = () =>{
    
const weightData = [
    { month: 'January', weight: 45 },
    { month: 'February', weight: 38 },
    { month: 'March', weight: 50 },
    { month: 'April', weight: 30 },
    { month: 'May', weight: 55 },
    { month: 'June', weight: 60 },
    { month: 'July', weight: 65 },
    { month: 'August', weight: 58 },
    { month: 'September', weight: 45 },
    { month: 'October', weight: 50 },
    { month: 'November', weight: 48 },
    { month: 'December', weight: 40 },
  ];
    return(
        <div>
            <div style={{ width: '900px', margin: 'auto' }}> 
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weightData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis label={{ value: 'no of bag', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="weight"
                            stroke="#ff7300"
                            strokeWidth={1}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
export default Bag_graph