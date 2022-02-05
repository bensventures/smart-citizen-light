import { DateTime } from 'luxon';

export default function Label({ date, timeRange, readings, index }) {
    const isNewDay = index === 0 || DateTime.fromISO(readings[index-1][0]).ordinal !== DateTime.fromISO(date).ordinal;
    const isNew2Hour = index === 0 || index % 4 === 0;
    const isNewMonth = index === 0 || DateTime.fromISO(readings[index-1][0]).month !== DateTime.fromISO(date).month;
    const shouldShowLabel = timeRange === '1M' ? isNewMonth : timeRange === '3d' ? isNewDay : isNew2Hour;

    if (!shouldShowLabel) {
        return false;
    }

    if (timeRange === '1M' || timeRange === '3d') {
        return (
            <>
                {DateTime.fromISO(date).toFormat('dd')}
                {isNewMonth &&
                <span>
                    {DateTime.fromISO(date).toFormat('LLL')}
                </span>
                }
            </>
        )
    }

    if (timeRange === '1d') {
        return (
            <>
                {DateTime.fromISO(date).toFormat('HH:00')}
            </>
        )
    }
}