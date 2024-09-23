const LOAD_REVIEWS = "reviews/loadReviews";
const LOAD_USER_REVIEWS = "reviews/loadUserReviews";
const CREATE_REVIEW = "reviews/createReview";
const UPDATE_REVIEW = "reviews/updateReview";
const DELETE_REVIEW = "reviews/deleteReview";

const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});
const loadUserReviews = (reviews) => ({
  type: LOAD_USER_REVIEWS,
  reviews,
});
const createReview = (review) => ({
  type: CREATE_REVIEW,
  review,
});
const editReview = (review) => ({
  type: UPDATE_REVIEW,
  review,
});
const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

export const loadReviewsThunk = (productId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${productId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadReviews(data));
    return data;
  }
};
export const loadUserReviewsThunk = () => async (dispatch) => {
  const res = await fetch(`/api/reviews/current`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadUserReviews(data));
    return data;
  }
};
export const newReviewThunk = (review) => async (dispatch) => {
  const res = await fetch(`/api/reviews/new-review`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(createReview(data));
    return data;
  }
};
export const editReviewThunk = (review, reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(editReview(data));
    return data;
  }
};
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}/delete`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteReview(reviewId));
    return reviewId;
  }
};

const initialState = {};

export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const newState = { ...state };
      action.reviews.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    }
    case LOAD_USER_REVIEWS: {
      const newState = { ...state };
      action.reviews.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    }
    case CREATE_REVIEW: {
      return {
        ...state,
        [action.review.id]: action.review,
      };
    }
    case UPDATE_REVIEW: {
      return {
        ...state,
        [action.review.id]: action.review,
      };
    }
    case DELETE_REVIEW: {
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    }
    default:
      return state;
  }
}
