const LOAD_PRODUCTS = "products/loadProducts";
const USER_PRODUCTS = "products/loadUserProducts";
const SINGLE_PRODUCT = "products/loadOneProduct";
const CATEGORY_PRODUCTS = "products/loadCategoryProducts";
const ID_PRODUCTS = "products/loadIdProducts";
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
const loadCategoryProducts = (products) => ({
  type: CATEGORY_PRODUCTS,
  products,
});
const loadIdProducts = (products) => ({
  type: ID_PRODUCTS,
  products,
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
export const loadCategoryProductsThunk = (category) => async (dispatch) => {
  try {
    const res = await fetch(`/api/products/categories/${category}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(loadCategoryProducts(data));
      return data;
    } else {
      throw new Error("Category not found");
    }
  } catch (error) {
    console.error("Failed to load category products:", error);
  }
};
export const loadIdProductsThunk = (productIds) => async (dispatch) => {
  try {
    const res = await fetch(`/api/products`);
    if (res.ok) {
      const data = await res.json();
      console.log("Fetched products data:", data);
      const selectedProducts = data.Products.filter((product) =>
        productIds.includes(product.id)
      );
      dispatch(loadIdProducts(selectedProducts));
      return selectedProducts;
    }
  } catch (error) {
    console.error("Failed to load products by ID:", error);
  }
};
export const newProductThunk = (product) => async (dispatch) => {
  const res = await fetch("/api/products/new-product", {
    method: "POST",
    body: product,
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(createProduct(data));
    return data;
  } else {
    const data = res.json();
    if (data.errors) {
      return data;
    }
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
    return productId;
  }
};

const initialState = {};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      const newState = { ...state };
      action.products.Products.forEach((product) => {
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
    case CATEGORY_PRODUCTS: {
      return { ...state, ...action.products };
    }
    case ID_PRODUCTS: {
      return { ...state, ...action.products };
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
