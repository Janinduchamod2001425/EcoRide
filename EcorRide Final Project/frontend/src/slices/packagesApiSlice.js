import { apiSlice } from "./apiSlice";

const PACKAGES_URL = "/api/packages";

export const packagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (data) => ({
        url: `${PACKAGES_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),

    getPackageByCustomerId: builder.mutation({
      query: (data) => ({
        url: `${PACKAGES_URL}/getpackage/${data}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateMutation, useGetPackageByCustomerIdMutation } = packagesApiSlice;
