// import { createAsyncThunk } from '@reduxjs/toolkit';
// import maintenanceAPI from '/Users/tharindurewatha/Documents/Codes/EcoRide/isuri_FE/src/API/Newmaintaion.js' // Adjust the import path based on your project structure

// // Async thunk action creator for fetching maintenance records
// export const getMaintenanceRecords = createAsyncThunk(
//     'maintenance/getMaintenanceRecords',
//     async (filters, { rejectWithValue }) => {
//         try {
//             // Call your API function to fetch maintenance records with the provided filters
//             const response = await maintenanceAPI.fetchMaintenanceRecords(filters);
//             return response.data; // Assuming the API response contains the data field with maintenance records
//         } catch (error) {
//             // Handle errors and return an error message or reject with a value
//             return rejectWithValue(error.message || 'Failed to fetch maintenance records');
//         }
//     }
// );

// // Redux slice file (e.g., maintenanceSlice.js)

import { createAsyncThunk } from '@reduxjs/toolkit';
import maintenanceAPI from '../API/Newmaintaion'; // Adjust the import path based on your project structure
import maintenanceSlice from './maintenanceSlice'; // Adjust the import path based on your folder structure

const { getMaintenanceRecords } = maintenanceSlice.actions;

// Async thunk action creator for fetching maintenance records
export const fetchMaintenanceRecords = createAsyncThunk(
    'maintenance/fetchMaintenanceRecords',
    async (filters, { rejectWithValue }) => {
        try {
            // Call your API function to fetch maintenance records with the provided filters
            const response = await maintenanceAPI.fetchMaintenanceRecords(filters);
            return response.data; // Assuming the API response contains the data field with maintenance records
        } catch (error) {
            // Handle errors and return an error message or reject with a value
            return rejectWithValue(error.message || 'Failed to fetch maintenance records');
        }
    }
);
export default fetchMaintenanceRecords; // Export the async thunk action creator

