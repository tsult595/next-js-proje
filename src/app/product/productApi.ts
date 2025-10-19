// src/store/product/productApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Iproduct } from '../product/productType';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['Products'],
  endpoints: (build) => ({
    getProducts: build.query<Iproduct[], void>({
      query: () => '/products',
      providesTags: ['Products'],
    }),
    getProductById: build.query<Iproduct, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    addProduct: build.mutation<Iproduct, Omit<Iproduct, '_id'>>({
      query: (productData) => ({
        url: '/products',
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: build.mutation<Iproduct, { id: string; updateData: Partial<Iproduct> }>({
      query: ({ id, updateData }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }, 'Products'],
    }),
    deleteProduct: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    addToFavorites: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/products/${id}/favorite`,
        method: 'POST',
      }),
    }),
    removeFromFavorites: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/products/${id}/favorite`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
} = productApi;