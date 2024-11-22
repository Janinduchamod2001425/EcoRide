import { apiSlice } from "./apiSlice";

const INCIDENTS_URL = "/api/incidentDetails";

export const incidentApiSLice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveIncidentData: builder.mutation({
      query: (data) => {
        return {
          url: `${INCIDENTS_URL}`,
          method: "POST",
          body: data,
        };
      },
    }),

    updateIncidentData: builder.mutation({
      query: (data) => {
        return {
          url: `${INCIDENTS_URL}/${data.id}`,
          method: "PUT",
          body: data.data,
        };
      },
    }),

    deleteIncidentReport: builder.mutation({
      query: (id) => ({
        url: `${INCIDENTS_URL}/${id}`,
        method: "DELETE",
      }),
    }),

    getAllIncidentData: builder.mutation({
      query: (id) => {
        return {
          url: `${INCIDENTS_URL}/findbyuserid/${id}`,
          method: "GET",
        };
      },
    }),

    getById: builder.mutation({
      query: (id) => ({
        url: `${INCIDENTS_URL}/${id}`,
        method: "GET",
      }),
    }),

    getAllIncidentDataAdmin: builder.mutation({
      query: () => {
        return {
          url: `${INCIDENTS_URL}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useSaveIncidentDataMutation,
  useGetAllIncidentDataMutation,
  useGetByIdMutation,
  useUpdateIncidentDataMutation,
  useDeleteIncidentReportMutation,
  useGetAllIncidentDataAdminMutation,
} = incidentApiSLice;
