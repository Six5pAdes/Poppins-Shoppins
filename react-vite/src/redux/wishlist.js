const LOAD_WISHLISTS = "wishlist/LOAD_WISHLISTS";
const ADD_TO_WISHLISTS = "wishlist/ADD_TO_WISHLISTS";
const DELETE_WISHLIST = "wishlist/DELETE_WISHLIST";

const loadWishlists = (wishlists) => ({
  type: LOAD_WISHLISTS,
  wishlists,
});
const addToWishlists = (wishlist) => ({
  type: ADD_TO_WISHLISTS,
  wishlist,
});
const deleteWishlist = (wishlistId) => ({
  type: DELETE_WISHLIST,
  wishlistId,
});

export const getWishlistsThunk = () => async (dispatch) => {
  const res = await fetch("/api/wishlists");
  if (res.ok) {
    const wishlists = await res.json();
    dispatch(loadWishlists(wishlists));
    return wishlists;
  }
};
export const addToWishlistsThunk = (newWishlist) => async (dispatch) => {
  const res = await fetch("/api/wishlists/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newWishlist),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addToWishlists(data));
    return data;
  }
};
export const deleteWishlistThunk = (wishlistId) => async (dispatch) => {
  const res = await fetch(`/api/wishlists/${wishlistId}/delete`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteWishlist(wishlistId));
    return wishlistId;
  }
};

const initialState = {};

export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_WISHLISTS: {
      return { ...state, ...action.wishlists };
    }
    case ADD_TO_WISHLISTS: {
      return { ...state, ...action.newWishlist };
    }
    case DELETE_WISHLIST: {
      const newState = { ...state };
      delete newState[action.wishlistId];
      return newState;
    }
    default:
      return state;
  }
}
