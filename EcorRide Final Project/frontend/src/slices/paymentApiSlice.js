import { apiSlice } from "./apiSlice";

const PAYMENT_URL = "/api/payments";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    payment: builder.mutation({
      query: (data) => ({
        url: `${PAYMENT_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),

    getPaymentByCustomerId: builder.mutation({
      query: (data) => ({
        url: `${PAYMENT_URL}/getpayment/${data}`,
        method: "GET",
      }),
    }),

  }),
});

export const { usePaymentMutation, useGetPaymentByCustomerIdMutation } = paymentApiSlice;
