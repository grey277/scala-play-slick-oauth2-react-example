import React, {Component} from 'react';
import {FormGroup, Button, ControlLabel, HelpBlock, FormControl} from 'react-bootstrap';
import {addProduct} from '../utils/post-api';

function FieldGroup({
  id,
  label,
  help,
  ...props
}) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props}/> {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class AddProduct extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      product_name: '',
      product_description: '',
      product_category: '',
      product_key_words: '',
      product_added: false
    };

    this.handleProductNameChange = this
      .handleProductNameChange
      .bind(this);
    this.handleProductDescriptionChange = this
      .handleProductDescriptionChange
      .bind(this);
    this.handleProductCategoryChange = this
      .handleProductCategoryChange
      .bind(this);
    this.handleProductKeyWordsChange = this
      .handleProductKeyWordsChange
      .bind(this);
    this.postData = this
      .postData
      .bind(this);
  }

  handleProductNameChange = (e) => {
    this.setState({product_name: e.target.value});
  }

  handleProductDescriptionChange = (e) => {
    this.setState({product_description: e.target.value});
  }

  handleProductCategoryChange = (e) => {
    this.setState({product_category: e.target.value});
  }

  handleProductKeyWordsChange = (e) => {
    this.setState({product_key_words: e.target.value});
  }

  postData = (event) => {
    event.preventDefault();
    this.setState({product_added: false});
    addProduct(this.state.product_name, this.state.product_description, this.state.product_category, this.state.product_key_words);
    this.setState({product_added: true});
  }

  render() {
    if (!this.state.product_added) {
      return (
        <div>
          <form onSubmit={this.postData}>
            <FieldGroup
              id="product_name"
              type="text"
              label="Product name"
              placeholder="Enter product name"
              onChange={this.handleProductNameChange}/>

            <FieldGroup
              id="product_description"
              type="text"
              label="Product description"
              placeholder="Enter product description"
              onChange={this.handleProductDescriptionChange}/>

            <FieldGroup
              id="product_category"
              type="text"
              label="Product category"
              placeholder="Enter product category"
              onChange={this.handleProductCategoryChange}/>

            <FieldGroup
              id="product_key_words"
              type="text"
              label="Product key words"
              placeholder="Enter product key words"
              onChange={this.handleProductKeyWordsChange}/>

            <Button type="submit">Submit</Button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <h1>
            Product {this.state.product_name}
            added!
          </h1>
        </div>
      );
    }
  }
}

export default AddProduct;