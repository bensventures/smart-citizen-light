import { DateTime } from 'luxon';
import cn from 'classnames';

import Label from './label';

import '../../../node_modules/charts.css/dist/charts.css'
import './styles.scss';

export default function Chart(props) {
    const maxReading = props.readings.reduce((acc, elem) => acc[1] > elem[1] ? acc : elem , 0)[1];

    return (
        <div className="chart">
            <table id="sc-charts" className="charts-css column show-primary-axis show-labels show-4-secondary-axes">
                <caption>
                    {props.caption}
                </caption>
                <tbody>
                    {props.readings.map(([date, value], index) => {
                        const size = value / maxReading;
                        const start = index === 0 ? size : props.readings[index-1][1] / maxReading;

                        return (
                            <tr key={date}>
                                <th scope="row" className="date-label">
                                    <Label
                                        index={index}
                                        date={date}
                                        readings={props.readings}
                                        timeRange={props.timeRange}
                                    />
                                </th>
                                <td 
                                    scope="row"
                                    style={{
                                        '--size': size,
                                        '--start': start
                                    }}
                                >
                                    <span className="tooltip">
                                        <span className="value">
                                            {value.toFixed(2)} {props.unit}
                                        </span>
                                        <span className="date">
                                            {DateTime.fromISO(date).toFormat('HH:mm')}
                                        </span>
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}