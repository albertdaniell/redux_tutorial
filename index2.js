// console.log("Fron index2.js");

//coore concepts
// Shop - store, holds the state of the app
//Action - describes what has happened - an order has been placed and the cake should reduce
// reducer - ties the store and actions together
//  reducer is the shop keeper who receives order, and remove the cake from the store

const redux = require("redux");
const produce = require("immer").produce;

const { createStore, combineReducers } = redux;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_ADDED = "CAKE_ADDED";

const ICE_CREAM_ADDED = "ICE_CREAM_ADDED";
const ICE_CREAM_ORDERED = "ICE_CREAM_ORDERED";

//action creators
const orderCake = () => {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
};

const addCake = (qnt) => {
  return {
    type: CAKE_ADDED,
    payload: qnt,
  };
};

const orderIceCream = (qnt = 1) => {
  return {
    type: ICE_CREAM_ORDERED,
    payload: qnt,
  };
};

const addIceCream = (qnt = 1) => {
  return {
    type: ICE_CREAM_ADDED,
    payload: qnt,
  };
};

const initialState = {
  numberOfCakes: 10,
  numberOfIceCreams: 20,
};

const initialCakeState = {
  numberOfCakes: 10,
};

const initialIceCreamState = {
  numberOfIceCreams: 20,
};

// reducer
// (previousState,action)=>newState

const cakeReducer = (state = initialCakeState, action) => {
  let { type, payload } = action;
  switch (type) {
    case CAKE_ADDED:
      // return {
      //     ...state,
      //     numberOfCakes:state.numberOfCakes + payload
      // }

      return produce(state, (draft) => {
        draft.numberOfCakes = draft.numberOfCakes + payload;
      });
    case CAKE_ORDERED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  let { type, payload } = action;

  switch (type) {
    case ICE_CREAM_ADDED:
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams + payload,
      };
    case ICE_CREAM_ORDERED:
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams - payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cakeReducer,
  iceCreamReducer,
});

// redux store
// holds app state
// allows state tp state via getState()
// allows atate to be updated via dispath(action)
// registers listeners via sybscribe(listener)
// handles unregistering of listeners via func returned by subscribe

const store = createStore(rootReducer);

console.log("initial state", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("updated state", store.getState())
);

store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());

// store.dispatch(addCake(1));
store.dispatch(addCake(1));

unsubscribe();
