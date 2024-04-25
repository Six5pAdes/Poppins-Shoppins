const LOAD_PRODUCTS = "products/loadProducts";
const USER_PRODUCTS = "products/loadUserProducts";
const SINGLE_PRODUCT = "products/loadOneProduct";
const CREATE_PRODUCT = "products/createProduct";
const UPDATE_PRODUCT = "products/updateProduct";
const DELETE_PRODUCT = "products/deleteProduct";

const loadProducts = (products) => ({
  type: LOAD_PRODUCTS,
  products,
});
const loadUserProducts = (products) => ({
  type: USER_PRODUCTS,
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
export const loadUserProductsThunk = () => async (dispatch) => {
  const res = await fetch("/api/products/current");

  if (res.ok) {
    const data = await res.json();
    dispatch(loadUserProducts(data));
    return data;
  }
};
export const loadOneProductThunk = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadOneProduct(data));
    return data;
  }
};
export const newProductThunk = (product) => async (dispatch) => {
  const res = await fetch(`/api/new`, {
    method: "POST",
    body: product,
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(createProduct(data));
    return data;
  }
};
export const editProductThunk = (product, productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}/edit`, {
    method: "PUT",
    body: product,
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(editProduct(data));
    return data;
  }
};
export const deleteProductThunk = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteProduct(productId));
    return;
  }
};

const initialState = {};

const ProductReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_PRODUCTS: {
      newState = {};
      action.products.products.forEach((product) => {
        newState[product.id] = product;
      });
      return newState;
    }
    case SINGLE_PRODUCT: {
      return {
        ...newState,
        [action.product.id]: action.product,
      };
    }
    case USER_PRODUCTS: {
      newState = {};
      action.products.products.forEach((product) => {
        newState[product.id] = product;
      });
      return newState;
    }
    case CREATE_PRODUCT: {
      return {
        ...newState,
        [action.product.id]: action.product,
      };
    }
    case UPDATE_PRODUCT: {
      return {
        ...newState,
        [action.product.id]: action.product,
      };
    }
    case DELETE_PRODUCT: {
      newState = { ...state };
      delete newState[action.productId];
      return newState;
    }
    default:
      return state;
  }
};

export default ProductReducer;
