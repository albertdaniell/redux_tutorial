const redux = require("redux");
const axios = require("axios");
const thunkMiddleWare = require("redux-thunk").default;
const produce = require("immer").produce;
const { createStore, applyMiddleware } = redux;

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  let { payload, type } = action;

  switch (type) {
    case FETCH_USERS_REQUESTED: {
      return produce(state, (draft) => {
        draft.loading = true;
      });
    }

    case FETCH_USERS_SUCCEEDED: {
      return produce(state, (draft) => {
        (draft.loading = false), (draft.users = payload), (draft.error = "");
      });
    }

    case FETCH_USERS_FAILED: {
      return produce(state, (draft) => {
        (draft.loading = false), (draft.error = payload);
      });
    }

    default:
      return state;
  }
};

const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    // axios request

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const users = res.data.map((user) => user.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((e) => {
        dispatch(fetchUsersFailure(e.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleWare));

// store.dispath(fet)

store.subscribe(() => {
  console.log("initial state", store.getState());
});

store.dispatch(fetchUsers());
let unsubscribe = store.subscribe(() => {
  console.log("state updated", store.getState());
});
