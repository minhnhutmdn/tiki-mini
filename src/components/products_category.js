import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductsCategory } from '../actions/index';
import { Link } from 'react-router';

class ProductCategory extends Component {

  componentWillMount() {
    this.props.fetchProductsCategory(this.props.params.category);
  }

  renderProductsCategory() {
    return this.props.products.map((product) => {
      return (
        <div className="product-item col-sm-6 col-md-4 col-lg-3" key={product._id}>
          <Link to={"products/" + product._id}>
  					<div className="product-image-wrapper">
    						<div className="single-products">
    								<div className="productinfo text-center">
                      <img src={product.imageUrl} />
                      <h2>${product.price}</h2>
                      <p>{product.name}</p>
                      <span href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</span>
                    </div>
    						</div>
  					</div>
          </Link>
				</div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2 className="title text-center">in Category</h2>
        <div className="row">
          {this.renderProductsCategory()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { products: state.products.all };
}

export default connect(mapStateToProps, { fetchProductsCategory })(ProductCategory);
