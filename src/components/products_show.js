import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchProduct, deleteProduct } from '../actions/index';
import { Link } from 'react-router';

class ProductsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchProduct(this.props.params.id);
  }

  onDeleteClick() {
    this.props.deleteProduct(this.props.params.id)
      .then(() => { this.context.router.push('/'); });
  }

  render() {
    const { product } = this.props;

    if (!product) {
      return <div>Loading...</div>;
    }

    return (
      <div className="product-details single-product">
						<div className="col-sm-5">
							<div className="view-product">
								<img src={product.imageUrl} />
							</div>
						</div>
						<div className="col-sm-7">
							<div className="product-information">
								<h2>{product.name}</h2>
								<p>Web ID: 1089772</p>
                <span>
                  <span> ${product.price} </span>
                  <label> Quantity: </label>
									<input type="text" value='3' readOnly />

									<button type="button" className="btn btn-fefault cart">
                    <i className="fa fa-shopping-cart"></i>
										Add to cart
									</button>
                </span>
								<p><b>Availability:</b> In Stock</p>
								<p><b>Brand:</b> {product.branch}</p>
								<p><b>Category:</b> {product.category}</p>
                <p></p>
                <div className="product-description">
                  <h4>Description</h4>
                  {product.description}
                </div>
							</div>

					</div>
			</div>
    );
  }
}


function mapStateToProps(state) {
  return { product: state.products.product };
}

export default connect(mapStateToProps, { fetchProduct, deleteProduct })(ProductsShow);
