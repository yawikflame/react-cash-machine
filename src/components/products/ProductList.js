import React from 'react';
import { connect } from 'react-redux';

class ProductList extends React.Component {
  renderList = () => {
    return this.props.products.map(
      ({ productName, productId, productPrice }) => {
        return (
          <div className="item" key={productId}>
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

  render() {
    return <div className="ui relaxed divided list">{this.renderList()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { products: state.products };
};

export default connect(mapStateToProps, {})(ProductList);
