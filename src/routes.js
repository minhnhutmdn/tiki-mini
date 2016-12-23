import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import ProductsIndex from './components/product_index';
import ProductsShow from './components/products_show';
import ProductsCategory from './components/products_category';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ProductsIndex} />
    <Route path="products/categories/:category" component={ProductsCategory} />
    <Route path="products/:id" component={ProductsShow} />
  </Route>
);
