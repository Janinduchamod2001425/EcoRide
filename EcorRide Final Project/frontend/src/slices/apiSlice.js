import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Package', 'Payment', 'License', 'Vehicle', 'Booking', 'Feedback', 'Maintenance', 'Loyalty'],
    endpoints: (builder) => ({}),
});