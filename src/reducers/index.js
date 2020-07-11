import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { productReducer } from './productReducer';
import { purchaseReducer } from './purchaseReducer';
import { inputReducer } from './inputReducer';
import { selectProductReducer } from './selectProductReducer';
import { filteredProductsReducer } from './filteredProductReducer copy';

export default combineReducers({
  products: productReducer,
  filteredProducts: filteredProductsReducer,
  purchases: purchaseReducer,
  input: inputReducer,
  selectedProduct: selectProductReducer,
  form: formReducer,
});
