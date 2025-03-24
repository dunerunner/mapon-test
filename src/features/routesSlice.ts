import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Point {
    address: string;
    time: string;
    lat: number;
    lng: number;
}

export interface Route {
    route_id: string;
    type: 'route' | 'stop';
    start: Point;
    end: Point;
    polyline?: string;
    distance?: number;
}

interface RouteParams {
    unitId: string;
    from: string;
    till: string;
}

interface RoutesState {
    routes: Route[];
    loading: boolean;
    error: string | null;
}

const initialState: RoutesState = {
    routes: [],
    loading: false,
    error: null,
};

export const fetchRoutes = createAsyncThunk<Route[], RouteParams, { rejectValue: string }>(
    'routes/fetchRoutes',
    async ({ unitId, from, till }, thunkAPI) => {
        try {
            const response = await axios.get('https://mapon.com/api/v1/route/list.json', {
                params: {
                    key: process.env.REACT_APP_MAPON_API_KEY,
                    unit_id: unitId,
                    from: new Date(from).toISOString().split('.')[0] + 'Z',
                    till: new Date(till).toISOString().split('.')[0] + 'Z',
                    include: 'polyline'
                },
            });
            return response.data.data.units[0].routes;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Failed to fetch routes'
            );
        }
    }
);

const routesSlice = createSlice({
    name: 'routes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoutes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoutes.fulfilled, (state, action: PayloadAction<Route[]>) => {
                state.loading = false;
                state.routes = action.payload;
            })
            .addCase(fetchRoutes.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export default routesSlice.reducer;
