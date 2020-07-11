import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ProductCreate from './products/ProductCreate';
import ProductDelete from './products/ProductDelete';
import ProductEdit from './products/ProductEdit';
import ProductList from './products/ProductList';
import ProductShow from './products/ProductShow';
import Purchase from './Purchase';
import Header from './Header';
import ProductAdd from './products/ProductAdd';

class App extends React.Component {
  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Header />
          <Route path="/" exact component={Purchase} />
          <Route path="/products/add" exact component={ProductAdd} />
          <Route path="/products/new" exact component={ProductCreate} />
          <Route path="/products/list" exact component={ProductList} />
          <Route path="/products/delete" exact component={ProductDelete} />
          <Route path="/products/edit" exact component={ProductEdit} />
          <Route path="/products/show" exact component={ProductShow} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
