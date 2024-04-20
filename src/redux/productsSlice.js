import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    deleteProduct: (state, action) => {
      return state.filter((product) => product.product_id !== action.payload);
    },
    updateProduct: (state, action) => {
        const updatedProduct = action.payload;
        return state.map((product) =>
          product.product_id === updatedProduct.product_id
            ? updatedProduct
            : product
        );
      },
  },
});

export const { addProduct, deleteProduct, updateProduct } = productsSlice.actions;
export const selectProductsList = (state) => state.products;
export default productsSlice.reducer;

