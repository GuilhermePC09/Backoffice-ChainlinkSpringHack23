import React from 'react';
import { Map, Marker, GoogleApiWrapper, IProvidedProps, IMapProps, IMarkerProps } from 'google-maps-react';

interface MapContainerProps extends IProvidedProps {}

class MapContainer extends React.Component<MapContainerProps> {
    render() {
        const mapProps: IMapProps = {
            google: this.props.google!,
            initialCenter: { lat: -25.344, lng: 131.031 },
        };

        const markerProps: IMarkerProps = {
            mapCenter: { lat: -25.344, lng: 131.031 },
        };

        return (
            <Map {...mapProps}>
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
