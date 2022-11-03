import React, { useEffect, useState } from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer
} from 'recharts';

const CityGraph = ({ events, locations }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = () => {

            const data = locations.map((location) => {
                const number = events.filter((event) => event.location === location).length
                const city = location.split(', ').shift()
                return { city, number };
            });
            return data;
        };
        setData(() => getData());
    }, [events, locations]);

    return (
        <ResponsiveContainer height={400} >

            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="city" />
                <YAxis
                    allowDecimals={false}
                    type="number"
                    dataKey="number"
                    name="number of events"
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Event" data={data} fill="#8884d8" />
            </ScatterChart>

        </ResponsiveContainer>
    );
};

export default CityGraph;




















