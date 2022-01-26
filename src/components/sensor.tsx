
export default function Sensor(props) {
    return (
        <div className="sensor">
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