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
const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
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
  console.log(product);
  const res = await fetch("/api/products/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
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
    headers: { "Content-Type": "application/json" },
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
    return productId;
  }
};

const initialState = {};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      const newState = { ...state };
      action.products.products.forEach((product) => {
        newState[product.id] = product;
      });
      return newState;
    }
    case SINGLE_PRODUCT: {
      return {
        ...state,
        [action.product?.id]: action?.product,
      };
    }
    case USER_PRODUCTS: {
      const newState = { ...state };
      action.products.Products.forEach((product) => {
        newState[product.id] = product;
      });
      return newState;
    }
    case CREATE_PRODUCT: {
      return {
        ...state,
        [action.product?.id]: action?.product,
      };
    }
    case UPDATE_PRODUCT: {
      return {
        ...state,
        [action.product.id]: action.product,
      };
    }
    case DELETE_PRODUCT: {
      const newState = { ...state };
      delete newState[action.productId];
      return newState;
    }
    default:
      return state;
  }
}
