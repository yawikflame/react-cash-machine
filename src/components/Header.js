import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="ui menu">
      <Link to="/">
        <div className="header item">Home</div>
      </Link>
      <Link className="item" to="/products/list">
        All Products
      </Link>
      <Link className="item" to="/products/new">
        New Product
      </Link>
    </div>
  );
};

export default Header;
