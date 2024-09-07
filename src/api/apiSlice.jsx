import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["User", "Car", "Product"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getCars: builder.query({
      query: () => "/cars",
      providesTags: ["Car"],
    }),
    addCar: builder.mutation({
      query: (newCar) => ({
        url: "/cars",
        method: "POST",
        body: newCar,
      }),
      invalidatesTags: ["Car"],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Car"],
    }),
    updateCar: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/cars/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Car"],
    }),

    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetCarsQuery,
  useAddCarMutation,
  useDeleteCarMutation,
  useUpdateCarMutation,
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = apiSlice;
