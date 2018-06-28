import React, {Component} from 'react';
import {FormGroup, Button, ControlLabel, HelpBlock, FormControl} from 'react-bootstrap';
import {addCategory} from '../utils/post-api';

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

class AddCategory extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      category_name: '',
      category_added: false
    };

    this.handleCategoryNameChange = this
      .handleCategoryNameChange
      .bind(this);
    this.postData = this
      .postData
      .bind(this);
  }

  handleCategoryNameChange = (e) => {
    this.setState({category_name: e.target.value});
  }

  postData = (event) => {
    event.preventDefault();
    this.setState({category_added: false});
    addCategory(this.state.category_name);
    this.setState({category_added: true});
  }

  render() {
    if (!this.state.category_added) {
      return (
        <div>
          <form onSubmit={this.postData}>
            <FieldGroup
              id="category_name"
              type="text"
              label="Category name"
              placeholder="Enter category name"
              onChange={this.handleCategoryNameChange}/>

            <Button type="submit">Submit</Button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <h1>
            Category {this.state.category_name}
            added!
          </h1>
        </div>
      );
    }
  }
}

export default AddCategory;