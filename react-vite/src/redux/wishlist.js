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
    const data = await res.json();
    dispatch(loadWishlists(data.MyWishlists));
    return data;
  }
};
export const addToWishlistsThunk = (newWishlist) => async (dispatch) => {
  const res = await fetch("/api/wishlist/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newWishlist),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addToWishlists(data.wishlist));
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

const initialState = {
  MyWishlists: [],
};

export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_WISHLISTS: {
      return { ...state, MyWishlists: action.wishlists };
    }
    case ADD_TO_WISHLISTS: {
      return { ...state, MyWishlists: [...state.MyWishlists, action.wishlist] };
    }
    case DELETE_WISHLIST: {
      return {
        ...state,
        MyWishlists: state.MyWishlists.filter(
          (wishlist) => wishlist.id !== action.wishlistId
        ),
      };
    }
    default:
      return state;
  }
}
