import React, {Component} from 'react';
import {getCategories} from '../utils/get-api';
import {ListGroup, ListGroupItem} from 'react-bootstrap'
class Categories extends Component {

  constructor() {
    super()
    this.state = {
      categories: []
    };
  }

  getCategories() {
    getCategories().then((categories) => {
      this.setState({categories});
    });
  }

  componentDidMount() {
    this.getCategories();
  }

  render() {
    const {categories} = this.state;
    return (
      <div>
        <h3 className="text-center">Categories</h3>
        <hr/>
        <ListGroup>
          {categories.map((category, index) => (
            <ListGroupItem key={index} header={category.id}>
              {category.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}
export {Categories}