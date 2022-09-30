const store = require("./app/store");
const cakeActions = require("./features/cake/cakeSlice").cakeActions

const iceCreamActions = require("./features/icecream/icreamSlice").iceCreamActions


const {fetchUsers} = require("./features/user/userSlice")

// console.log("Initial state", store.getState())

const unsubscribe = store.subscribe(()=>{
  
})


store.dispatch(cakeActions.ordered())

store.dispatch(iceCreamActions.ordered())
store.dispatch(fetchUsers())


// unsubscribe()