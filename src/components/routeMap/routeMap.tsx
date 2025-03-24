import React from 'react';
import './routeMap.scss';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { Route } from '../../features/routesSlice';
import { PathLayer } from '@deck.gl/layers';
import { decodePolyline } from '../../utils/decodePolyline';

interface RouteMapProps {
    routes: Route[];
}

const RouteMap: React.FC<RouteMapProps> = ({ routes }) => {

    const firstRoute = routes.find(route => route.type === 'route');

    const center = firstRoute
        ? decodePolyline(firstRoute.polyline as string)[0] || { lat: 0, lng: 0 }
        : { lat: 0, lng: 0 };

    const layers = routes
        .filter((route) => route.type === 'route')
        .map((route, index) => {
            const pathCoordinates = decodePolyline(route.polyline!).map(({ lat, lng }) => [
                lng,
                lat,
            ]);

            return new PathLayer({
                id: `path-layer-${index}`,
                data: [{ path: pathCoordinates }],
                getPath: (d) => d.path,
                getColor: [0, 0, 255],
                widthMinPixels: 2,
                widthScale: 10,
            });
        });

    return (
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY as string}>
            <Map center={center} zoom={8} disableDefaultUI={true}
                 style={{
                     width: '600px',
                     height: '200px',
                 }}
            />
        </APIProvider>

    );
};

export default RouteMap;
