export const selectProductReducer = (state = null, action) => {
  switch (action.type) {
    case 'SELECT_PRODUCT':
      return action.payload.products.filter(
        (product) => product.productId === action.payload.selectedId
      );

    default:
      return state;
  }
};
