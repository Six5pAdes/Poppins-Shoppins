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
  if (res.ok) {
    const allWishlists = await res.json();
    dispatch(loadWishlists(allWishlists));
    return allWishlists;
  }
};
export const addToWishlistsThunk = (newWishlist) => async (dispatch) => {
  const res = await fetch("/api/wishlist/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newWishlist),
  });
  if (res.ok) {
    const newWishlistItem = await res.json();
    dispatch(addToWishlists(newWishlistItem));
    return newWishlistItem;
  }
};
export const deleteWishlistThunk = (wishlistId) => async (dispatch) => {
  const res = await fetch(`/api/wishlists/${wishlistId}/delete`, {
    method: "DELETE",
  });
  if (res.ok) {
    const deleteFromWishList = await res.json();
    dispatch(deleteWishlist(deleteFromWishList));
  }
};

const initialState = {};

export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_WISHLISTS: {
      return { ...state, ...action.wishlists };
    }
    case ADD_TO_WISHLISTS: {
      return { ...state, ...action.wishlist };
    }
    case DELETE_WISHLIST: {
      const deleteState = { ...state };
      delete deleteState[action.deleteFromWishList];
      return deleteState;
    }
    default:
      return state;
  }
}
