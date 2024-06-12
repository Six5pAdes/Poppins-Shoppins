const LOAD_HISTORY = "history/LOAD_HISTORY";
const USER_HISTORY = "history/USER_HISTORY";
const ADD_TO_HISTORY = "history/ADD_TO_HISTORY";

const loadHistory = (histories) => ({
  type: LOAD_HISTORY,
  histories,
});
const userHistory = (history) => ({
  type: USER_HISTORY,
  history,
});
const addToHistory = (history) => ({
  type: ADD_TO_HISTORY,
  history,
});

export const getHistoryThunk = () => async (dispatch) => {
  const res = await fetch("/api/history");
  if (res.ok) {
    const histories = await res.json();
    dispatch(loadHistory(histories));
    return histories;
  }
};
export const getUserHistoryThunk = () => async (dispatch) => {
  const res = await fetch("/api/history/current");
  if (res.ok) {
    const history = await res.json();
    dispatch(userHistory(history));
    return history;
  }
};
export const addToHistoryThunk = (history) => async (dispatch) => {
  const res = await fetch("/api/history/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(history),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addToHistory(data));
    return data;
  }
};

const initialState = {};

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_HISTORY: {
      return { ...state, ...action.histories };
    }
    case USER_HISTORY: {
      return { ...state, ...action.history };
    }
    case ADD_TO_HISTORY: {
      return { ...state, ...action.history };
    }
    default:
      return state;
  }
}
