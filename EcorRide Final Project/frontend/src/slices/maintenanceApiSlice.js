import { apiSlice } from "./apiSlice";

const MAINTENANCE_URL = "/api/maintenances";

export const maintenanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    schedule: builder.mutation({
      query: (data) => ({
        url: `${MAINTENANCE_URL}/createmaintenance`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useScheduleMutation } = maintenanceApiSlice;
