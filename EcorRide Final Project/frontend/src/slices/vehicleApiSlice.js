import { apiSlice } from "./apiSlice";

const VEHICLES_URL = "/api/vehicles";

export const vehicleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    newvehicle: builder.mutation({
      query: (data) => ({
        url: `${VEHICLES_URL}/newvehicle`,
        method: "POST",
        body: data,
      }),
    }),

    getVehiclesByOwnerId: builder.mutation({
      query: (data) => ({
        url: `${VEHICLES_URL}/getowner/${data}`,
        method: "GET",
      }),
    }),

    getallvehicles: builder.mutation({
      query: () => ({
        url: `${VEHICLES_URL}/getallvehicles`,
        method: "GET",
      }),
    }),
  }),
});

export const { useNewvehicleMutation, useGetVehiclesByOwnerIdMutation, useGetallvehiclesMutation } =
  vehicleApiSlice;
