export const getProducts = () => {
  return {
    type: 'GET_PRODUCTS',
  };
};

export const createProduct = ({ productName, productPrice }) => {
  return {
    type: 'CREATE_PRODUCT',
    payload: {
      productId: Math.ceil(Math.random() * 100),
      productName,
      productPrice,
    },
  };
};

export const filterProducts = (products, input) => {
  return {
    type: 'FILTER_PRODUCTS',
    payload: products,
    input: input,
  };
};

export const inputChange = (input) => {
  return {
    type: 'INPUT_CHANGE',
    payload: input,
  };
};

export const selectProduct = (products, productId) => {
  return {
    type: 'SELECT_PRODUCT',
    payload: { products, selectedId: productId },
  };
};

export const addProduct = ({ productName, productPrice, productQuantity }) => {
  return {
    type: 'ADD_PRODUCT',
    payload: {
      productId: Math.ceil(Math.random() * 100),
      productName,
      productPrice,
      productQuantity,
    },
  };
};
