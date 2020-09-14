import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Purchase extends React.Component {

  renderList = () => {
    const priceResults = this.props.purchases.map(
      ({ productPrice, productQuantity }) => productPrice * productQuantity
    )

    priceResults = priceResults.reduce((a,b) => a + b, 0);

    return [
      this.props.purchases.map(
        ({ productId, productName, productPrice, productQuantity }) => {
          return (
            <div className="item" key={productId}>
              <div className="content">
                <h1 className="header">{productName}</h1>
                <div className="description">
                  <p>{`Quantity: ${productQuantity} Price: ${productPrice}`}</p>
                </div>
              </div>
            </div>
          );
        }
      ),
      <div>
        <h2>{`Total price: ${priceResults}`}</h2>
      </div>,
    ];
  };

  render() {
    return (
      <div
        className="ui three column centered grid"
        style={{ paddingTop: '10px' }}
      >
        <div className="ui relaxed divided list">
          {this.props.purchases.length > 0
            ? this.renderList()
            : 'Nothing to show'}
          <div>
            <Link to="/products/add">
              <button className="ui button green">Add Products</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    purchases: state.purchases,
  };
};

export default connect(mapStateToProps, {})(Purchase);
