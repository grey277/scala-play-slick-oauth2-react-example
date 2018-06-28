import React, {Component} from 'react';
import {getProducts} from '../utils/get-api';
import {addToBasket} from '../utils/post-api';

class Products extends Component {

  constructor() {
    super()
    this.state = {
      products: []
    };
    this.addBasketItem = this
      .addBasketItem
      .bind(this)
  }

  getProducts() {
    getProducts().then((products) => {
      this.setState({products});
    });
  }

  componentDidMount() {
    this.getProducts();
  }

  addBasketItem(product_id) {
    this
      .props
      .updateBasket()
    addToBasket(product_id)
  }

  render() {

    const {products} = this.state;
    return (
      <div>
        <h3 className="text-center">Products</h3>
        <hr/> {products.map((product, index) => (
          <div className="col-sm-6" key={index}>
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">
                  <span
                    className="btn"
                    onClick={this
                    .addBasketItem
                    .bind(this, product.id)}>#{product.id}: {product.name}</span>
                </h3>
              </div>
              <div className="panel-body">
                <p>
                  {product.description}
                </p>
                <p>Key words: {product.key_words}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export {Products};