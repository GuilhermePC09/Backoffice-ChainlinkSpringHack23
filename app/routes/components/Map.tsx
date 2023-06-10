import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { MyContext } from '~/routes/context/context_provider';
import { getLocations } from "~/functions/Iot_client/iotClient";
import trackingInfo from "~/functions/contracts/tracking_info";
import TrackingInfoDto from "~/functions/dtos/trackingInfoDto";

const containerStyle = {
    width: '100vw',
    height: '100vh',
};

export type Path = {
    lat: number;
    lng: number;
};

export default function TrackMap() {
    const orderHash = useContext(MyContext);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDM9y8YCKfW_v0j0iBvPHe9bOyZFtkB1DU',
    });
    const options = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        zIndex: 1,
    };

    const [path, setPath] = useState<Path[]>([]);
    const [center, setCenter] = useState<Path>({ lat: 0, lng: 0 });
    const [info, setInfo] = useState<TrackingInfoDto | undefined >()

    useEffect(() => {
        async function fetchLocations() {
            try {
                const locations = await getLocations(orderHash);
                if (locations) {
                    setPath(locations);
                    setCenter(locations[locations.length - 1]);
                }
                const info = await trackingInfo(orderHash);
                setInfo(info);

            } catch (error) {
                console.error('Failed to fetch locations:', error);
            }
        }
        fetchLocations();
    }, [orderHash]);

    const [map, setMap] = useState(null);

    // @ts-ignore
    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, [center]);

    const onUnmount = React.useCallback(function callback() {
        setMap(null);
    }, []);

    if (!isLoaded) {
        return null;
    }

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={center} onLoad={onLoad} onUnmount={onUnmount}>
            {/*<Marker position={info?.senderLocation} />*/}
            {/*<Marker position={info?.receiverLocation} />*/}
            {path.length > 0 && <Marker position={center} />}
            {path.length > 0 && <Polyline path={path} options={options} />}
        </GoogleMap>
    );
}
