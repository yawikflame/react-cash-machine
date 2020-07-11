import React from 'react';
import { createProduct } from '../../actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class ProductCreate extends React.Component {
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

  onSubmit = (formValues) => {
    // console.log(formValues);
    this.props.createProduct(formValues);
    formValues.productName = '';
    formValues.productPrice = '';
  };

  render() {
    return (
      <div className="ui three column centered grid">
        <div className="ui three column">
          <form
            className="ui form error"
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <Field
              name="productName"
              component={this.renderInput}
              label="Product Name"
            />
            <Field
              name="productPrice"
              component={this.renderInput}
              label="Product Price"
            />
            <div className="ui three column centered grid">
              <div className="column">
                <button className="ui button primary">Submit</button>
              </div>
            </div>
          </form>
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

ProductCreate = connect(null, { createProduct })(ProductCreate);

export default reduxForm({
  form: 'productCreate',
  validate,
})(ProductCreate);
