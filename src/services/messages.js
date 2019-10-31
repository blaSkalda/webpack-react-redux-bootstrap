// @flow

export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const fetchStart = () => ({ type: FETCH_START });
export const fetchSuccess = (data) => ({ type: FETCH_SUCCESS, payload: data });
export const fetchFailure = (error) => ({ type: FETCH_FAILURE, error });

export const getMessage = (id) => (dispatch) => {
  dispatch(fetchStart());

  return fetch(`/api/messages/get?id=${id}`)
    .then((data) => data.json().then((response) => dispatch(fetchSuccess(response))))
    .catch((error) => {
      dispatch(fetchFailure(error));
    });
};

export const getMessages = () => (dispatch) => {
  dispatch(fetchStart());

  return fetch('/api/messages/get')
    .then((data) => data.json().then((response) => dispatch(fetchSuccess(response))))
    .catch((error) => {
      dispatch(fetchFailure(error));
    });
};

export const defaultState = {
  fetching: false,
  data: [],
};

const MessageReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, fetching: true };
    case FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        fetching: false,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default MessageReducer;
