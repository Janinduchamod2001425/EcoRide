import { apiSlice } from "./apiSlice";

const FEEDBACK_URL = "/api/feedbacks";

export const feedbackApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFeedback: builder.mutation({
      query: (data) => ({
        url: `${FEEDBACK_URL}/addfeedback`,
        method: "POST",
        body: data,
      }),
    }),

    updateFeedback: builder.mutation({
      query: (data) => ({
        url: `${FEEDBACK_URL}/feedback`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteFeedback: builder.mutation({
      query: (data) => ({
        url: `${FEEDBACK_URL}/delete/${data}`,
        method: "DELETE",
      }),
    }),

    getFeedbackByCustomerId: builder.mutation({
      query: (data) => ({
        url: `${FEEDBACK_URL}/getfeedback/${data}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddFeedbackMutation, useUpdateFeedbackMutation, useDeleteFeedbackMutation, useGetFeedbackByCustomerIdMutation } = feedbackApiSlice;
