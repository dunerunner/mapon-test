import React, { useEffect, useState } from 'react';
import logo from '../mapon-logo.png';
import './RouteSelect.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchUnitList } from '../features/unitSlice';
import { fetchRoutes } from '../features/routesSlice';
import RouteMap from '../components/routeMap/routeMap';
import RouteSummary from '../components/routeSummary/routeSummary';
import SubmitButton from '../components/submitButton/submitButton';
import CustomSelect from '../components/customSelect/customSelect';
import DateSelect from '../components/dateSelect/dateSelect';

function RouteSelect() {
    const dispatch = useDispatch<AppDispatch>();
    const { units, loading: unitsLoading, error } = useSelector((state: RootState) => state.units);
    const { routes, loading: routesLoading, error: routesError } = useSelector((state: RootState) => state.routes);

    useEffect(() => {
        dispatch(fetchUnitList());
    }, [dispatch]);

    const [vehicleNumber, setVehicleNumber] = useState<string>('');
    const [periodFrom, setPeriodFrom] = useState<string>('');
    const [periodTo, setPeriodTo] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!vehicleNumber || !periodFrom || !periodTo) {
            alert('Please fill in all fields');
            return;
        }
        dispatch(fetchRoutes({ unitId: vehicleNumber, from: periodFrom, till: periodTo }));
    };

    return (
        <div className="route-select">
            <div className="route-select-logo">
                <img src={logo} className="mapon-logo" alt="logo"/>
            </div>

            <div className="route-select-content">
                <div className="route-select-body">
                    <h2 className="title">Route report</h2>
                    <form className="route-select-form">
                        {unitsLoading ? <p>Loading units...</p> : null}
                        {error ? <p>{error}</p> : null}
                        {!unitsLoading && !error ?
                            <CustomSelect
                                items={units}
                                id={'vehicleNumber'}
                                value={vehicleNumber}
                                label={'Vehicle number'}
                                onChange={setVehicleNumber}
                                isLoading={unitsLoading}
                                error={error}
                            />

                            : null}

                        <div className="form-row">
                            <label>Period</label>
                            <div className="date-row">
                                <DateSelect
                                    label="From"
                                    id="periodFrom"
                                    value={periodFrom}
                                    onChange={setPeriodFrom}
                                />
                                <DateSelect
                                    label="To"
                                    id="periodTo"
                                    value={periodTo}
                                    onChange={setPeriodTo}
                                />

                            </div>
                        </div>
                    </form>
                </div>
                {routes.length > 0 && <RouteMap routes={routes}/>}
                {routes.length > 0 && <RouteSummary routes={routes}/>}
                <div className="route-select-footer">
                    <SubmitButton
                        onClick={handleSubmit}
                        isLoading={routesLoading}
                        label="Generate"
                        disabled={routesLoading}
                    />
                </div>
            </div>
        </div>
    );
}

export default RouteSelect;
