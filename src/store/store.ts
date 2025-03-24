import { configureStore } from '@reduxjs/toolkit';
import unitSlice from '../features/unitSlice';
import routesSlice from '../features/routesSlice';

const store = configureStore({
    reducer: {
        units: unitSlice,
        routes: routesSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
