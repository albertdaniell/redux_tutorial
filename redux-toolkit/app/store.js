const {configureStore} = require("@reduxjs/toolkit")
const cakeReducer = require("../features/cake/cakeSlice")
const iceCreamReducer = require("../features/icecream/icreamSlice")
const userReducer = require("../features/user/userSlice")

const reduxLogger = require("redux-logger")

const {logger} = reduxLogger


const store = configureStore({

    reducer : {
        cake:cakeReducer,
        icecream:iceCreamReducer,
        user:userReducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

module.exports = store