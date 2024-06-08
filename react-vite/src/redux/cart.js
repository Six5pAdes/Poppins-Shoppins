const LOAD_CARTS = "carts/loadCarts";
const ACTIVE_CART = "carts/activeCart";
const CREATE_CART = "carts/createCart";

const loadCarts = (carts) => ({
  type: LOAD_CARTS,
  carts,
});
const activeCart = (cart) => ({
  type: ACTIVE_CART,
  cart,
});
const createCart = (cart) => ({
  type: CREATE_CART,
  cart,
});

export const loadCartsThunk = () => async (dispatch) => {
  const res = await fetch(`/api/carts`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadCarts(data));
    return data;
  }
};
export const activeCartThunk = () => async (dispatch) => {
  const res = await fetch(`/api/carts/active`);
  if (res.ok) {
    const data = await res.json();
    dispatch(activeCart(data));
    return data;
  }
};
export const createCartThunk = () => async (dispatch) => {
  const res = await fetch(`/api/carts/new`, {
    method: "POST",
    // headers: { "Content-Type": "application/json" },
    // body: JSON.stringify(cart),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(createCart(data));
    return data;
  }
};

const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CARTS: {
      return {
        ...state,
        ...action.carts,
      };
    }
    case ACTIVE_CART: {
      return {
        ...state,
        ...action.cart,
      };
    }
    case CREATE_CART: {
      return {
        ...state,
        ...action.cart,
      };
    }
    default:
      return state;
  }
}
