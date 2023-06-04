import React from 'react';
import { Map, Marker, GoogleApiWrapper, IProvidedProps, IMapProps, IMarkerProps, Polyline } from 'google-maps-react';

interface MapContainerProps extends IProvidedProps {}

class MapContainer extends React.Component<MapContainerProps> {
    render() {
        const mapProps: IMapProps = {
            google: this.props.google!,
            initialCenter: {lat: -27.467, lng: 153.027},
        };

        const markerProps: IMarkerProps = {
            mapCenter: {lat: -27.467, lng: 153.027},
        };


        const path = [
            {lat: 37.772, lng: -122.214},
            {lat: 21.291, lng: -157.821},
            {lat: -18.142, lng: 178.431},
            {lat: -27.467, lng: 153.027}
        ];

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
            paths: [
                {lat: 37.772, lng: -122.214},
                {lat: 21.291, lng: -157.821},
                {lat: -18.142, lng: 178.431},
                {lat: -27.467, lng: 153.027}
            ],
            zIndex: 1
        };

        return (
            <Map {...mapProps}>
                <Polyline
                    path={path}
                    options={options}
                />
                <Marker {...markerProps} />
            </Map>
        );
    }
}

const WrappedMapContainer = GoogleApiWrapper({
    apiKey: 'AIzaSyDM9y8YCKfW_v0j0iBvPHe9bOyZFtkB1DU',
})(MapContainer as any);

const TrackMap: React.FC = () => {
    return (
        <div>
            <div className="map-container">
                <WrappedMapContainer />
            </div>
        </div>
    );
};

export default TrackMap;
