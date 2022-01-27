import { useState } from 'react';
import { useInterval } from '../hooks';

import Sensor from './sensor';

const apiUrl = 'https://api.smartcitizen.me/v0/devices/';
const skipSensor = [10];

export default function Device(props: any) {
    const [device, setDevice] = useState({name: '', data: { sensors: []}});

    async function fetchDevice() {
        const response = await fetch(apiUrl + props.deviceId);
        const device = await response.json();
        setDevice(device);
    }

    useInterval(
        async () => {
            if (!document.hidden) {
                await fetchDevice();
            }
        },
        30000,
    );

    return (
        <article className="device">
            <h1 className="device-name">
                {device.name}
            </h1>
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