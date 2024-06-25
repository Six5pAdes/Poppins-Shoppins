const LOAD_CART_ITEMS = "carts/loadCartItems";
const LOAD_USER_ORDER = "carts/loadUserOrder";
const LOAD_ID_ORDER = "carts/loadIdOrder";
const CREATE_ORDER = "carts/createOrder";
const UPDATE_ORDER = "carts/updateOrder";
const DELETE_ORDER = "carts/deleteOrder";
const CLEAR_CART = "carts/clearCart";

const loadCartsItems = (orders) => ({
  type: LOAD_CART_ITEMS,
  orders,
});
const loadUserOrder = (orders) => ({
  type: LOAD_USER_ORDER,
  orders,
});
const loadIdOrder = (order) => ({
  type: LOAD_ID_ORDER,
  order,
});
const createOrder = (newOrder) => ({
  type: CREATE_ORDER,
  newOrder,
});
const updateOrder = (updatedOrder) => ({
  type: UPDATE_ORDER,
  updatedOrder,
});
const deleteOrder = (orderToDelete) => ({
  type: DELETE_ORDER,
  orderToDelete,
});
const clearCart = (removeItems) => ({
  type: CLEAR_CART,
  removeItems,
});

export const loadOrdersThunk = () => async (dispatch) => {
  const res = await fetch(`/api/orders`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadCartsItems(data));
    return data;
  }
};
export const loadUserOrderThunk = () => async (dispatch) => {
  const res = await fetch(`/api/orders/current`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadUserOrder(data));
    return data;
  }
};
export const loadIdOrderThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/orders/${id}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadIdOrder(data));
    return data;
  }
};
export const createOrderThunk = (newOrderData) => async (dispatch) => {
  const res = await fetch(`/api/orders/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newOrderData),
  });
  if (!res.ok) {
    throw new Error("Failed to create order");
  }
  const data = await res.json();
  dispatch(createOrder(data));
  return data;
};
export const updateOrderThunk =
  (orderId, updatedOrderData) => async (dispatch) => {
    const res = await fetch(`/api/orders/${orderId}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedOrderData),
    });
    if (!res.ok) {
      throw new Error("Failed to update order");
    }
    const data = await res.json();
    dispatch(updateOrder(data));
    return data;
  };
export const deleteOrderThunk = (orderId) => async (dispatch) => {
  const res = await fetch(`/api/orders/${orderId}/delete`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete order");
  }
  const data = await res.json();
  dispatch(deleteOrder(data));
};
export const clearCartThunk = () => async (dispatch) => {
  const res = await fetch(`/api/orders/current/clear`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to clear cart");
  }
  const data = await res.json();
  dispatch(clearCart(data));
};

const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART_ITEMS: {
      return { ...state, ...action.orders };
    }
    case LOAD_USER_ORDER: {
      return { ...state, ...action.orders };
    }
    case LOAD_ID_ORDER: {
      return { ...state, ...action.order };
    }
    case CREATE_ORDER: {
      return { ...state, ...action.newOrder };
    }
    case UPDATE_ORDER: {
      return { ...state, ...action.updatedOrder };
    }
    case DELETE_ORDER: {
      const deleteState = { ...state };
      delete deleteState[action.orderToDelete];
      return deleteState;
    }
    case CLEAR_CART: {
      const clearState = { ...state };
      delete clearState[action.removeItems];
      return clearState;
    }

    default:
      return state;
  }
}
