import { useEffect, useState } from 'react';
import { useInterval } from './hooks';

import Sensor from './components/sensor';

const apiUrl = 'https://api.smartcitizen.me/v0/devices/14042';
const skipSensor = [10];

export function App() {
    const [device, setDevice] = useState({name: '', data: { sensors: []}});

    async function fetchDevice() {
        const response = await fetch(apiUrl);
        const device = await response.json();
        setDevice(device);
    }

    useInterval(
        async () => {
            await fetchDevice();
        },
        15000,
    );

    return (
        <article className="device">
            <h3>
                {device.name}
            </h3>
            <ul className="sensors">
                {device.data.sensors.filter(sensor => !skipSensor.includes(sensor.id)).map(sensor => (
                <li key={sensor.id} className="sensor-item">
                    <Sensor {...sensor} />
                </li>
                ))}
            </ul>
        </article>
    );
}