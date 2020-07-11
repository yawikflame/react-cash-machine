import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  getProducts,
  filterProducts,
  inputChange,
  selectProduct,
  addProduct,
} from '../../actions';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

class ProductCreate extends React.Component {
  componentDidMount = () => {
    this.itemsPrice = 0;
    this.props.filterProducts(this.props.products, '');
    this.props.selectProduct(this.props.products, null);
  };

  onInputChange = (event) => {
    this.props.inputChange(event.target.value);
    this.props.filterProducts(this.props.products, event.target.value);
  };

  onPriceChange = (formValues) => {
    this.itemsPrice = formValues.productPrice * formValues.productQuantity;
  };

  renderList = () => {
    return this.props.filteredProducts.map(
      ({ productName, productId, productPrice }) => {
        return (
          <div
            className="item"
            key={productId}
            onClick={() => this.onProductSelect(productId)}
            style={{
              cursor: 'pointer',
              backgroundColor:
                this.props.selectedProduct.length > 0
                  ? this.props.selectedProduct[0].productId === productId
                    ? 'green'
                    : ''
                  : '',
            }}
          >
            <div className="content">
              <h1 className="header">{productName}</h1>
              <div className="description">
                <p>{`id: ${productId} price: ${productPrice}`}</p>
              </div>
            </div>
          </div>
        );
      }
    );
  };

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  onProductSelect = (productId) => {
    this.props.selectProduct(this.props.products, productId);
  };

  onSubmit = (formValues) => {
    this.props.addProduct(formValues);
    formValues.productName = '';
    formValues.productPrice = '';
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="ui centered grid">
        <div className="ui row">
          <div className="five wide column">
            <form
              className="ui form error"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <Field
                name="productName"
                component={this.renderInput}
                label="Product Name"
                onChange={this.onInputChange}
              />
              <Field
                name="productPrice"
                component={this.renderInput}
                label="Product Price"
                onChange={this.props.handleSubmit(this.onPriceChange)}
              />
              <Field
                name="productQuantity"
                component={this.renderInput}
                label="Product Quantity"
                onChange={this.props.handleSubmit(this.onPriceChange)}
              />
              <p>Calculated Price: {this.itemsPrice ? this.itemsPrice : 0}</p>
              <div>{this.props.itemsPrice}</div>
              <div className="ui three column centered grid">
                <div className="column">
                  <button className="ui button primary">Submit</button>
                </div>
              </div>
            </form>
          </div>
          <div className="eleven wide column">
            <h1 className="ui header centered">Products</h1>
            <div className="ui inverted segment">
              <div className="ui divided inverted relaxed list">
                {this.renderList()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.productName) {
    errors.productName = 'You must enter a product name';
  }

  if (!formValues.productPrice) {
    errors.productPrice = 'You must enter a product price';
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    filteredProducts: state.filteredProducts,
    products: state.products,
    selectedProduct: state.selectedProduct,
  };
};

ProductCreate = withRouter(ProductCreate);

ProductCreate = connect(mapStateToProps, {
  getProducts,
  filterProducts,
  inputChange,
  selectProduct,
  addProduct,
})(ProductCreate);

export default reduxForm({
  form: 'productCreate',
  validate,
})(ProductCreate);
