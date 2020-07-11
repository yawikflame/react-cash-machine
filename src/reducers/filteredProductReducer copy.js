export const filteredProductsReducer = (state = [], action) => {
  switch (action.type) {
    case 'FILTER_PRODUCTS':
      return action.payload.filter(
        (product) => product.productName.indexOf(action.input) !== -1
      );

    default:
      return state;
  }
};
