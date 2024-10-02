const LOAD_HISTORY = "history/LOAD_HISTORY";
const USER_HISTORY = "history/USER_HISTORY";
const ADD_TO_HISTORY = "history/ADD_TO_HISTORY";

const loadHistory = (histories) => ({
  type: LOAD_HISTORY,
  histories,
});
const userHistory = (theirStory) => ({
  type: USER_HISTORY,
  theirStory,
});
const addToHistory = (newStory) => ({
  type: ADD_TO_HISTORY,
  newStory,
});

export const getHistoryThunk = () => async (dispatch) => {
  const res = await fetch("/api/history");
  if (!res.ok) {
    throw new Error("Failed to fetch history");
  }
  const histories = await res.json();
  if (histories.errors) return histories.errors;
  dispatch(loadHistory(histories));
  return histories;
};
export const getUserHistoryThunk = () => async (dispatch) => {
  const res = await fetch("/api/history/current");
  if (!res.ok) {
    throw new Error("Failed to fetch user history");
  }
  const theirStory = await res.json();
  if (theirStory.errors) return theirStory.errors;
  dispatch(userHistory(theirStory));
  return theirStory;
};
export const addToHistoryThunk = (addHistory) => async (dispatch) => {
  const res = await fetch("/api/history/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(addHistory),
  });
  if (!res.ok) {
    throw new Error("Failed to add history");
  }
  const newStory = await res.json();
  dispatch(addToHistory(newStory));
  return newStory;
};

const initialState = {};

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_HISTORY: {
      return { ...state, ...action.histories };
    }
    case USER_HISTORY: {
      return { ...state, ...action.theirStory };
    }
    case ADD_TO_HISTORY: {
      return { ...state, ...action.newStory };
    }
    default:
      return state;
  }
}
