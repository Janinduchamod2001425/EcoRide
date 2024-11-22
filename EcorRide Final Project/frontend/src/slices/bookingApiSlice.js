import { apiSlice } from "./apiSlice";

const BOOKINGS_URL = "/api/bookings";

export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addbooking: builder.mutation({
      query: (data) => ({
        url: `${BOOKINGS_URL}/addbooking`,
        method: "POST",
        body: data,
      }),
    }),

    getbookingsByUserId: builder.mutation({
      query: (data) => ({
        url: `${BOOKINGS_URL}/getbooking/${data}`,
        method: "GET",
      }),
    }),

    updateBooking: builder.mutation({
      query: (data) => ({
        url: `${BOOKINGS_URL}/booking`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteBooking: builder.mutation({
      query: (data) => ({
        url: `${BOOKINGS_URL}/delete/${data}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddbookingMutation,
  useGetbookingsByUserIdMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApiSlice;
