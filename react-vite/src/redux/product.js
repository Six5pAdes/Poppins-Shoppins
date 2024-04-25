const LOAD_PRODUCTS = "products/loadProducts";
const SINGLE_PRODUCT = "products/loadOneProduct";
const CREATE_PRODUCT = "products/createProduct";
const UPDATE_PRODUCT = "products/updateProduct";
const DELETE_PRODUCT = "products/deleteProduct";

const loadProducts = (products) => ({
  type: LOAD_PRODUCTS,
  products,
});
const loadOneProduct = (product) => ({
  type: SINGLE_PRODUCT,
  product,
});
const createProduct = (product) => ({
  type: CREATE_PRODUCT,
  product,
});
const editProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});
const deleteProduct = () => ({
  type: DELETE_PRODUCT,
  product,
});

export const loadProductsThunk = () => async (dispatch) => {
  const res = await fetch("/api/products");

  if (res.ok) {
    const data = await res.json();
    dispatch(loadProducts(data));
    return data;
  }
};
