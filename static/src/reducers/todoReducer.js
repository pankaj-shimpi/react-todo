const todoReducer = (state = { todos: [] }, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return {
        ...state,
        todos: action.todos,
      };
    default:
      return state;
  }
};

export default todoReducer;
