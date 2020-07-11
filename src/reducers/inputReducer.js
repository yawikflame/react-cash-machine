export const inputReducer = (state = '', action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return action.payload;

    default:
      return state;
  }
};
