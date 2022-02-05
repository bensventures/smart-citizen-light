import { useState } from 'react';
import cn from 'classnames';

import { useInterval } from '../hooks';

import Sensor from './sensor';

const apiUrl = 'https://api.smartcitizen.me/v0/devices/';
const skipSensor = [10];

export default function Device(props: any) {
    const [device, setDevice] = useState({name: '', data: { sensors: []}, last_reading_at: new Date()});
    const [isLoading, setLoading] = useState(true);
    const [openSensor, setOpenSensor] = useState(null);

    async function fetchDevice() {
        const response = await fetch(apiUrl + props.deviceId);
        const device = await response.json();
        setDevice(device);
        setLoading(false);
    }

    useInterval(
        async () => {
            if (!document.hidden && props.deviceId) {
                await fetchDevice();
            }
        },
        30000,
    );

    if (isLoading) {
        return (
            <span>Loading</span>
        )
    }

    const batterySensor = device.data.sensors.find(sensor => sensor.id === 10);

    return (
        <article className="device">
            <header>
                <h1 className="device-name">
                    {device.name}
                </h1>
                <span className="battery">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-battery"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line></svg>
                    {batterySensor.value}{batterySensor.unit}
                </span>
            </header>
            <ul className="sensors">
                {device.data.sensors.filter(sensor => !skipSensor.includes(sensor.id)).map(sensor => {
                    const isOpened = openSensor && sensor.id === openSensor;

                    return (
                        <li key={sensor.id} className={cn('sensor-item', { 'is-opened': isOpened })}>
                            <Sensor 
                                {...sensor} 
                                isOpened={isOpened} 
                                deviceId={props.deviceId}
                                handleClick={() => setOpenSensor(sensor.id)}
                                handleClose={() => setOpenSensor(null)}
                            />
                        </li>
                    );
                })}
            </ul>
            <footer>
                <span>
                    last update: {new Date(device.last_reading_at).toLocaleString('es', { dateStyle: 'short', timeStyle: 'short' })}
                </span>
                <button
                    type="button"
                    className="change-btn"
                    onClick={props.removeDevice}
                >
                    change
                </button>
            </footer>
        </article>
    );
}