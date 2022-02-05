
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import cn from 'classnames';

import Chart from '../chart';

import './styles.scss';

const timeRanges = {
    '1d': {
        from: () => DateTime.now().minus({ hours: 24 }),
        rollup: '1h'
    },
    '3d': {
        from: () => DateTime.now().minus({ days: 2 }).startOf('day'),
        rollup: '1h'
    },
    '1M': {
        from: () => DateTime.now().minus({ month: 1 }).startOf('day'),
        rollup: '1d'
    }
}

export default function Sensor(props) {

    const [readings, setReadings] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [selectedTimeRange, setTimeRange] = useState('3d');

    async function fetchReadings() {
        const from = timeRanges[selectedTimeRange].from();
        const rollup = timeRanges[selectedTimeRange].rollup;
        const apiUrl = `https://api.smartcitizen.me/v0/devices/${props.deviceId}/readings?sensor_id=${props.id}&rollup=${rollup}&from=${from}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        setReadings(data.readings.reverse());
        setLoading(false);
    }

    function handleClickClose(e) {
        e.stopPropagation();

        return props.handleClose(e);
    }

    useEffect(() => {
        if (props.isOpened && props.deviceId) {
            setLoading(true);
            fetchReadings();
        }
    }, [props.isOpened, selectedTimeRange]);

    return (
        <div className="sensor" onClick={props.handleClick}>
            <span className="name">
                {sensorNiceName[props.id] ? sensorNiceName[props.id] : props.name}
            </span>
            <div className="metric">
                <span className="value">
                    {props.value}
                </span>
                <span className="unit">
                    {props.unit}
                </span>
            </div>
            {props.isOpened &&
                <div className="sensor-details">
                    <p className="description">
                        {props.description}
                    </p>

                    <ul className="time-ranges">
                        {Object.keys(timeRanges).map(timeRange => (
                        <li key={timeRange} className={cn({ 'is-selected': timeRange === selectedTimeRange})}>
                            <button
                                type="button"
                                onClick={() => setTimeRange(timeRange)}
                            >
                                {timeRange}
                            </button>
                        </li>
                        ))}
                    </ul>

                    {isLoading ? 
                        <span>Loading</span>
                        :
                        <Chart 
                            caption={props.name}
                            readings={readings}
                            unit={props.unit}
                            timeRange={selectedTimeRange}
                        />
                    }
                    <button
                        type="button"
                        className="close-btn"
                        onClick={handleClickClose}
                    >
                        close
                    </button>
                </div>
            }
        </div>
    )
}

const sensorNiceName = {
    113: "TVOC",
    112: "eCO2",
    14: "Light",
    10: "Battery",
    53: "Noise",
    58: "Barometric Pressure",
    89: "PM 1.0",
    88: "PM 10",
    87: "PM 2.5",
    56: "Humidity",
    55: "Temperature"
};