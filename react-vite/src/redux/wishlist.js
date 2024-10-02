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
  const res = await fetch("/api/wishlist/current");
  if (!res.ok) {
    throw new Error("Failed to fetch wishlists");
  }
  const wishlists = await res.json();
  if (wishlists.errors) return wishlists.errors;
  dispatch(loadWishlists(wishlists));
  return wishlists;
};
export const addToWishlistsThunk = (newWishlist) => async (dispatch) => {
  const res = await fetch("/api/wishlist/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newWishlist),
  });
  if (!res.ok) {
    throw new Error("Failed to add wishlist");
  }
  const newWish = await res.json();
  dispatch(addToWishlists(newWish));
  return newWish;
};
export const deleteWishlistThunk = (wishlistId) => async (dispatch) => {
  const res = await fetch(`/api/wishlist/${wishlistId}/delete`, {
    method: "DELETE",
  });
  if (res.ok) {
    const unWish = await res.json();
    dispatch(deleteWishlist(unWish));
  } else {
    throw new Error("Failed to delete wishlist item");
  }
};

const initialState = {};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_WISHLISTS: {
      // console.log("Loading wishlists into state:", action.wishlists); // Debug log
      return { ...state, ...action.wishlists };
    }
    case ADD_TO_WISHLISTS: {
      return { ...state, ...action.newWish };
    }
    case DELETE_WISHLIST: {
      const deleteState = { ...state };
      delete deleteState[action.unWish];
      return deleteState;
    }
    default:
      return state;
  }
};

export default wishlistReducer;
