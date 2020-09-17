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
import { Field, reduxForm } from 'redux-form';

class ProductCreate extends React.Component {

  componentDidMount = () => {
    this.props.filterProducts(this.props.products, '');
    this.props.selectProduct(this.props.products, null);
    this.props.initialize({productQuantity: "1"})
  };

  onInputChange = (event) => {
    this.props.inputChange(event.target.value);
    this.props.filterProducts(this.props.products, event.target.value);
  };

  onPriceChange = (event) => {
    // console.log(this.props.form.productCreate.values);
      this.props.change(
        'productCalculatedPrice',
        this.props.form.productCreate.values.productPrice *
        Number(event.target.value)
      );
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

  renderInput = ({ input, label, meta, disabled }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} disabled={disabled} />
        {this.renderError(meta)}
      </div>
    );
  };

  onProductSelect = async (productId) => {
    // console.log(this.props.selectedProduct);
    await this.props.selectProduct(this.props.products, productId);
    if (this.props.selectedProduct.length > 0) {
      this.props.change(
        'productName',
        this.props.selectedProduct[0].productName
      );
      this.props.change(
        'productPrice',
        this.props.selectedProduct[0].productPrice
      );
      // TODO: fix this
      this.props.change(
        'productCalculatedPrice',
        this.props.selectedProduct[0].productPrice *
        this.props.form.productCreate.values.productQuantity
      );
    }
  };

  onSubmit = (formValues) => {
    this.props.addProduct(formValues);
    this.props.reset();
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
                onChange={(e) => this.onPriceChange(e)}
              />
              <Field
                name="productQuantity"
                component={this.renderInput}
                label="Product Quantity"
                onChange={(e) => this.onPriceChange(e)}
              />
              <Field
                name="productCalculatedPrice"
                component={this.renderInput}
                label="Calculated Price"
                props={{disabled: true}}
              />
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
    form: state.form,
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
