const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  numberOfIcecreams: 20,
};

const iceCreamSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    ordered: (state) => {
      state.numberOfIcecreams--;
    },

    restocked: (state, action) => {
      let { payload } = action;

      state.numberOfIcecreams += payload;
    },
  },
});

module.exports = iceCreamSlice.reducer;
module.exports.iceCreamActions = iceCreamSlice.actions;
