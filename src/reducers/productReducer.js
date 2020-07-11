const INITIAL_STATE = [
  { productId: '1', productName: 'tomato', productPrice: 14 },
  { productId: '2', productName: 'cucumber', productPrice: 7 },
  { productId: '3', productName: 'onion', productPrice: 9 },
  { productId: '4', productName: 'carrot', productPrice: 11 },
];

export const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return state;

    case 'CREATE_PRODUCT':
      return [...state, action.payload];

    default:
      return state;
  }
};
