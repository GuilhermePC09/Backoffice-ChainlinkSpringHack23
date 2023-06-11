import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { MyContext } from '~/routes/context/context_provider';
import { getLocations } from "~/functions/Iot_client/iotClient";
import trackingInfo from "~/functions/contracts/tracking_info";
import TrackingInfoDto from "~/functions/dtos/trackingInfoDto";
import {getBoundsOfDistance} from "geolib";


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
    const polylineOptions = {
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

    const sourceMarker = {
        path: 'M 0,0 m -5,0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0',
        fillColor: 'purple',
        fillOpacity: 0.8,
        scale: 1,
    }

    const deliveryMarker = {
        path: 'M 0,0 m -5,0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0',
        fillColor: 'green',
        fillOpacity: 0.8,
        scale: 1,
    }

    const [path, setPath] = useState<Path[]>([]);
    const [center, setCenter] = useState<Path>({ lat: 0, lng: 0 });
    const [sourceLocation, setSourceLocation] = useState<Path>({ lat: 0, lng: 0 });
    const [destinationLocation, setDestinationLocation] = useState<Path>({ lat: 0, lng: 0 });

    useEffect(() => {
        async function fetchLocations() {
            try {
                const trackingInfoData = await trackingInfo(orderHash);
                if (trackingInfoData?.senderLocation !== undefined && trackingInfoData?.receiverLocation !== undefined) {
                    setSourceLocation(trackingInfoData.senderLocation);
                    setDestinationLocation(trackingInfoData.receiverLocation);
                    setCenter(trackingInfoData.senderLocation)
                }
                const locations = await getLocations(orderHash);
                if (locations) {
                    setPath(locations);
                    setCenter(locations[locations.length - 1]);
                }
                // @ts-ignore
                const onLoad = React.useCallback(function callback(map) {
                    const bounds = getBoundsOfDistance(center, 10000);
                    map.fitBounds(bounds);
                    map.panToBounds(bounds);
                    setMap(map);
                }, [center]);
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
            {sourceLocation.lat !== 0 && sourceLocation.lng !== 0 && <Marker position={sourceLocation} icon={sourceMarker}/>}
            {destinationLocation.lat !== 0 && destinationLocation.lng !== 0 && <Marker position={destinationLocation} icon={deliveryMarker} />}
            {path.length > 0 && <Marker position={center} />}
            {path.length > 0 && <Polyline path={path} options={polylineOptions} />}
        </GoogleMap>
    );
}
