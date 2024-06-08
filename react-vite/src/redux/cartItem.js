const LOAD_CART_ITEMS = "cartItems/loadCartItems";
const ADD_PRODUCT_TO_CART = "cartItems/addProductToCart";
const UPDATE_ITEM_QUANTITY = "cartItems/updateItemQuantity";
const DELETE_CART_ITEM = "cartItems/deleteCartItem";

const loadCartItems = (cartItems) => ({
  type: LOAD_CART_ITEMS,
  cartItems,
});
const addProductToCart = (cartItem) => ({
  type: ADD_PRODUCT_TO_CART,
  cartItem,
});
const updateItemQuantity = (cartItem) => ({
  type: UPDATE_ITEM_QUANTITY,
  cartItem,
});
const deleteCartItem = (cartItem) => ({
  type: DELETE_CART_ITEM,
  cartItem,
});

export const loadCartItemsThunk = (cartId) => async (dispatch) => {
  const res = await fetch(`/api/cart/${cartId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadCartItems(data));
    return data;
  }
};
export const addProductToCartThunk = (cartItem, cartId) => async (dispatch) => {
  const res = await fetch(`/api/cart/${cartId}/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cartItem),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addProductToCart(data));
    return data;
  }
};
export const updateItemQuantityThunk =
  (updateItem, cartItemId) => async (dispatch) => {
    const res = await fetch(`/api/cart/${cartItemId}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateItem),
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(updateItemQuantity(data));
      return data;
    }
  };
export const deleteCartItemThunk = (cartItemId) => async (dispatch) => {
  const res = await fetch(`/api/cart/${cartItemId}/delete`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteCartItem(cartItemId));
    return cartItemId;
  }
};

const initialState = {};

export default function cartItemReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART_ITEMS: {
      return {
        ...state,
        ...action.cartItems,
      };
    }
    case ADD_PRODUCT_TO_CART: {
      return {
        ...state,
        ...action.cartItem,
      };
    }
    case UPDATE_ITEM_QUANTITY: {
      return {
        ...state,
        ...action.cartItem,
      };
    }
    case DELETE_CART_ITEM: {
      const newState = { ...state };
      delete newState[action.cartItem];
      return newState;
    }
    default:
      return state;
  }
}
