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
  try {
    const res = await fetch("/api/wishlist/current");
    if (res.ok) {
      const allWishlists = await res.json();
      console.log("Fetched wishlists:", allWishlists); // Debug log
      dispatch(loadWishlists(allWishlists));
      return allWishlists;
    } else {
      const errorText = await res.text();
      console.error("Error fetching wishlists:", errorText);
    }
  } catch (error) {
    console.error("Error fetching wishlists:", error);
  }
};
export const addToWishlistsThunk = (newWishlist) => async (dispatch) => {
  try {
    const res = await fetch("/api/wishlist/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWishlist),
    });
    if (res.ok) {
      const newWishlistItem = await res.json();
      dispatch(addToWishlists(newWishlistItem));
      return newWishlistItem;
    } else {
      const errorText = await res.text();
      console.error("Error adding to wishlist:", errorText);
    }
  } catch (error) {
    console.error("Error adding to wishlist:", error);
  }
};
export const deleteWishlistThunk = (wishlistId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/wishlist/${wishlistId}/delete`, {
      method: "DELETE",
    });
    if (res.ok) {
      dispatch(deleteWishlist(wishlistId));
    } else {
      const errorText = await res.text();
      console.error("Error deleting wishlist:", errorText);
    }
  } catch (error) {
    console.error("Error deleting wishlist:", error);
  }
};

const initialState = {};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_WISHLISTS: {
      console.log("Loading wishlists into state:", action.wishlists); // Debug log
      return { ...action.wishlists };
    }
    case ADD_TO_WISHLISTS: {
      return { ...state, [action.wishlist.id]: action.wishlist };
    }
    case DELETE_WISHLIST: {
      const deleteState = { ...state };
      delete deleteState[action.wishlistId];
      return deleteState;
    }
    default:
      return state;
  }
};

export default wishlistReducer;
