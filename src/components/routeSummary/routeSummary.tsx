import React, { useMemo } from 'react';
import './routeSummary.scss';
import { Route } from '../../features/routesSlice';

interface RouteMapProps {
    routes: Route[];
}

const RouteSummary: React.FC<RouteMapProps> = ({ routes }) => {
    const totalDistance = routes.reduce((total, route) => total + (route.distance || 0), 0);

    const { driving, idle } = useMemo(() => {
        return routes.reduce((total, route) => {
            const start = new Date(route.start.time).getTime();
            const end = new Date(route.end.time).getTime();
            if (route.start && route.end) {
                if (route.type === 'route') {
                    total.driving += Math.max(0, (end - start) / 1000);
                } else {
                    total.idle += Math.max(0, (end - start) / 1000);
                }
            }
            return total;
        }, { driving: 0, idle: 0 })
    }, [routes]);

    const formatTime = (timeInSeconds: number) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`;
    };

    return (
        <div className="route-summary">
            <div className="summary-item">
                <span className="value">{(totalDistance / 1000).toFixed(1)}</span>
                <span className="label">Km Driven</span>
            </div>
            <div className="summary-item">
                <span className="value">{formatTime(driving)}</span>
                <span className="label">Driving Time</span>
            </div>
            <div className="summary-item">
                <span className="value">{formatTime(idle)}</span>
                <span className="label">Idle Time</span>
            </div>

        </div>
    )
};

export default RouteSummary;
