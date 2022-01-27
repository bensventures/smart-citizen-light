import { useEffect, useState } from 'react';

import DeviceSelector from './components/device-selector';
import Device from './components/device';

export function App() {
    const [selectedDeviceId, setDeviceId] = useState(null);

    useEffect(() => {
        const deviceId = window.localStorage.getItem('device_id');
        if (deviceId) setDeviceId(deviceId);
    }, [selectedDeviceId]);

    function setAndSaveDeviceId(deviceId) {
        window.localStorage.setItem('device_id', deviceId);
        setDeviceId(deviceId);
    }

    return (
        selectedDeviceId ? 
        <Device deviceId={selectedDeviceId} />
        :
        <DeviceSelector setDeviceId={setAndSaveDeviceId} />
    );
}