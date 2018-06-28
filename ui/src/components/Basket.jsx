import React, {Component} from 'react';
import {getBasket} from '../utils/get-api';
import {getProduct} from '../utils/get-api';
import {deleteFromBasket} from '../utils/delete-api';

class Basket extends Component {

  constructor() {
    super()
    this.state = {
      basketItems: [],
      basket: []
    };
    this.getBasket = this
      .getBasket
      .bind(this);
    this.removeItem = this
      .removeItem
      .bind(this);
  }

  removeItem(product_id) {
    deleteFromBasket(product_id).then((result) => {
      this.getBasket()
      this
        .props
        .basketChanged()
    })

  }

  getBasket() {
    this.setState({basketItems: [], basket: []})
    getBasket().then((basket) => {
      this.setState({basketItems: basket})
      basket.map((item, index) => (getProduct(item.product_id).then((product) => {
        this.setState({
          basket: this
            .state
            .basket
            .concat([product])
        })
      })))
    });
  }

  componentDidMount() {
    this.getBasket();
  }

  render() {

    const {basket} = this.state;
    return (
      <div>
        <h3 className="text-center">Basket</h3>
        <hr/> {basket.map((product, index) => (
          <div className="col-sm-6" key={index}>
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">
                  <span className="btn">#{product.id}: {product.name}
                  </span>
                  <span
                    className="btn"
                    onClick={this
                    .removeItem
                    .bind(this, this.state.basketItems[index].id)}>Remove
                  </span>
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

export {Basket};