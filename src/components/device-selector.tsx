import { useState } from 'react';

export default function DeviceSelector(props: any) {
    const [deviceId, setDeviceId] = useState('');

    return (
        <div className="device-selector">
            <input 
                type="number"
                value={deviceId}
                placeholder="device id"
                onChange={e => setDeviceId(e.currentTarget.value)}
            />
            <button
                type="button"
                onClick={e => props.setDeviceId(deviceId)}
            >
                add device
            </button>
        </div>
    );
}