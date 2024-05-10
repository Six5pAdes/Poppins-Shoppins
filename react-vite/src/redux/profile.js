const GET_USER = "users/GET_USER";
const EDIT_USER = "users/EDIT_USER";
const DELETE_USER = "users/DELETE_USER";

export const getUser = (user) => ({
  type: GET_USER,
  user,
});
export const editUser = (user) => ({
  type: EDIT_USER,
  user,
});
export const deleteUser = (userId) => ({
  type: DELETE_USER,
  userId,
});

export const getUserThunk = (userId) => async (dispatch) => {
  //   const toInt = parseInt(userId);
  const res = await fetch(`/api/users/${userId}`);
  if (res.ok) {
    const givenUser = await res.json();
    dispatch(getUser(givenUser));
    return givenUser;
  } else {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  }
};
export const editUserThunk = (userId, updatedUserData) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUserData),
  });
  if (res.ok) {
    const editedUserData = await res.json();
    dispatch(editUser(editedUserData));
    return editedUserData;
  }
};
export const deleteUserThunk = (userId) => async (dispatch) => {
  const toInt = parseInt(userId);
  const response = await fetch(`/api/users/${toInt}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteUser(userId));
  }
};

const initialState = { userProfile: {} };

export default function profileReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_USER:
      newState = { ...state };
      newState.userProfile = action.user;
      newState.userId = action.user.id;
      return newState;
    case EDIT_USER:
      return {
        ...state,
        userProfile: action.user,
      };
    case DELETE_USER:
      newState = { ...state };
      delete newState.userProfile;
      return newState;
    default:
      return state;
  }
}
