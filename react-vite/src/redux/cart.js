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
const loadUserOrder = (userOrders) => ({
  type: LOAD_USER_ORDER,
  userOrders,
});
const loadIdOrder = (idOrder) => ({
  type: LOAD_ID_ORDER,
  idOrder,
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
  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }
  const orders = await res.json();
  if (orders.errors) return orders.errors;
  dispatch(loadCartsItems(orders));
  return orders;
};
export const loadUserOrderThunk = () => async (dispatch) => {
  const res = await fetch(`/api/orders/current`);
  if (!res.ok) {
    throw new Error("Failed to fetch user order");
  }
  const userOrders = await res.json();
  if (userOrders.errors) return userOrders.errors;
  dispatch(loadUserOrder(userOrders));
  return userOrders;
};
export const loadIdOrderThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/orders/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch order");
  }
  const idOrder = await res.json();
  if (idOrder.errors) return idOrder.errors;
  dispatch(loadIdOrder(idOrder));
  return idOrder;
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
  const newOrder = await res.json();
  dispatch(createOrder(newOrder));
  return newOrder;
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
    const updatedOrder = await res.json();
    dispatch(updateOrder(updatedOrder));
    return updatedOrder;
  };
export const deleteOrderThunk = (orderId) => async (dispatch) => {
  const res = await fetch(`/api/orders/${orderId}/delete`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteOrder(data));
  } else {
    throw new Error("Failed to delete order");
  }
};
export const clearCartThunk = () => async (dispatch) => {
  const res = await fetch(`/api/orders/current/clear`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(clearCart(data));
  } else {
    throw new Error("Failed to clear cart");
  }
};

const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART_ITEMS: {
      return { ...state, ...action.orders };
    }
    case LOAD_USER_ORDER: {
      return { ...state, ...action.userOrders };
    }
    case LOAD_ID_ORDER: {
      return { ...state, ...action.idOrder };
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
