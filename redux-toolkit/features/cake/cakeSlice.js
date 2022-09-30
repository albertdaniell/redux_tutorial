const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  numOfCakes: 10,
};

const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    ordered: (state, action) => {
      state.numOfCakes--;
    },
    restocked: (state, action) => {
      let { payload } = action;
      state.numOfCakes += payload;
    },
  },
});

module.exports = cakeSlice.reducer;
module.exports.cakeActions = cakeSlice.actions

// module.exports = {
//   cakeActions: cakeSlice.actions,
// };
