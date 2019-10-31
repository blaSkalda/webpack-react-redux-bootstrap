import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import MessageReducer, {
  FETCH_START, FETCH_SUCCESS, FETCH_FAILURE, getMessages, getMessage, defaultState,
} from './messages';

const mockStore = configureStore([thunk]);

describe('actions', () => {
  describe('getMessages', () => {
    let store;

    const mockSuccessResponse = { id: 1, dev: 'Skalda' };
    const mockErrorResponse = { id: 1, error: 'Skalda' };

    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
      json: () => mockJsonPromise,
    });

    const mockErrorPromise = Promise.reject(mockErrorResponse);

    beforeEach(() => {
      store = mockStore({});
    });

    it('should dispatch start and fail with error', (done) => {
      global.fetch = jest.fn().mockImplementationOnce(() => mockErrorPromise);

      store.dispatch(getMessages()).then(() => {
        const [startAction, successAction] = store.getActions();

        expect(startAction).toEqual({
          type: FETCH_START,
        });

        expect(successAction).toEqual({
          type: FETCH_FAILURE,
          error: mockErrorResponse,
        });

        done();
      });
    });

    it('should dispatch start and fail with error', (done) => {
      global.fetch = jest.fn().mockImplementationOnce(() => mockErrorPromise);

      store.dispatch(getMessage(1)).then(() => {
        const [startAction, successAction] = store.getActions();

        expect(startAction).toEqual({
          type: FETCH_START,
        });

        expect(successAction).toEqual({
          type: FETCH_FAILURE,
          error: mockErrorResponse,
        });

        done();
      });
    });

    it('should dispatch start and success with dao payload', (done) => {
      global.fetch = jest.fn().mockImplementationOnce(() => mockFetchPromise);

      store.dispatch(getMessages()).then(() => {
        const [startAction, successAction] = store.getActions();

        expect(startAction).toEqual({
          type: FETCH_START,
        });

        expect(successAction).toEqual({
          type: FETCH_SUCCESS,
          payload: mockSuccessResponse,
        });

        done();
      });
    });

    it('should dispatch start and success with dao payload with profile Id stored in localStorage', (done) => {
      global.fetch = jest.fn().mockImplementationOnce(() => mockFetchPromise);

      store.dispatch(getMessage(1)).then(() => {
        const [startAction, successAction] = store.getActions();

        expect(startAction).toEqual({
          type: FETCH_START,
        });

        expect(successAction).toEqual({
          type: FETCH_SUCCESS,
          payload: mockSuccessResponse,
        });

        done();
      });
    });
  });
});

describe('MessageReducer', () => {
  it('should return original state when no action type matches', () => {
    const result = MessageReducer();

    expect(result).toBe(defaultState);
  });

  it('sets the DAO_START and it is fetching the dao', () => {
    const oldState = {};
    const newState = MessageReducer(oldState, { type: FETCH_START });

    expect(newState.fetching).toEqual(true);
  });

  it('sets the DAO_SUCCESS and response payload is as expected', () => {
    const action = {
      type: FETCH_SUCCESS,
      payload: [1],
    };
    const newState = MessageReducer({}, action);

    expect(newState.fetching).toBe(false);
    expect(newState.data).toEqual([1]);
  });

  it('sets the DAO_FAILURE and response with error as expected', () => {
    const action = {
      type: FETCH_FAILURE,
      payload: { error: 'error' },
    };
    const newState = MessageReducer({}, action);

    expect(newState.fetching).toBe(false);
    expect(newState.error).toEqual({ error: 'error' });
  });
});
