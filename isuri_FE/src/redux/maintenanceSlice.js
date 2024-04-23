import { createSlice } from '@reduxjs/toolkit';
import { getMaintenanceRecords } from './maintenanceActions'; // Adjust the import path as needed

const initialState = {
    maintenanceRecords: [],
    loading: false,
    error: null,
};

const maintenanceSlice = createSlice({
    name: 'maintenance',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMaintenanceRecords.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMaintenanceRecords.fulfilled, (state, action) => {
                state.loading = false;
                state.maintenanceRecords = action.payload;
            })
            .addCase(getMaintenanceRecords.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Assuming you handle errors in your action creator
            });
    },
});

export default maintenanceSlice.reducer;
