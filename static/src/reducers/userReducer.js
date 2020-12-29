const userReducer = (state = { userData: {} }, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        userData: action.userData,
      };
    default:
      return state;
  }
};

export default userReducer;
