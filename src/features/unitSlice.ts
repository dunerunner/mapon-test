import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Unit {
    unit_id: string;
    number: string;
}

interface UnitsState {
    units: Unit[];
    loading: boolean;
    error: string | null;
}

const initialState: UnitsState = {
    units: [],
    loading: false,
    error: null,
};

export const fetchUnitList = createAsyncThunk<Unit[], void, { rejectValue: string }>(
    'mapon/fetchUnitList',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('https://mapon.com/api/v1/unit/list.json', {
                params: {
                    key: process.env.REACT_APP_MAPON_API_KEY,
                },
            });
            return response.data.data.units;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Failed to fetch units'
            );
        }
    }
);

const apiSlice = createSlice({
    name: 'units',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUnitList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUnitList.fulfilled, (state, action: PayloadAction<Unit[]>) => {
                state.loading = false;
                state.units = action.payload;
            })
            .addCase(fetchUnitList.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export default apiSlice.reducer;
