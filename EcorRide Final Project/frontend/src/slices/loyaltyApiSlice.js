import { apiSlice } from "./apiSlice";

const LOYALTY_URL = "/api/loyalty";

export const loyaltyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createloyalty: builder.mutation({
      query: (data) => ({
        url: `${LOYALTY_URL}/createloyalty`,
        method: "POST",
        body: data,
      }),
    }),

    getLoyaltyByCustomerId: builder.mutation({
      query: (data) => ({
        url: `${LOYALTY_URL}/getloyalty/${data}`,
        method: "GET",
      }),
    }),

  }),
});

export const { useCreateloyaltyMutation, useGetLoyaltyByCustomerIdMutation  } = loyaltyApiSlice;
