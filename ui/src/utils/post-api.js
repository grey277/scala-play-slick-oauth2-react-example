import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

export {addProduct, addCategory, addToBasket};

function addProduct(product_name, product_description, product_category, product_key_words) {
  const url = `${BASE_URL}/api/addproduct`;
  return axios.post(url, {
    product_name: product_name,
    product_description: product_description,
    product_category: parseInt(product_category, 10),
    product_key_words: product_key_words
  }).then(response => response.data);
}

function addCategory(category_name) {
  const url = `${BASE_URL}/api/addcategory`;
  return axios
    .post(url, {category_name: category_name})
    .then(response => response.data);
}

function addToBasket(product_id) {
  const url = `${BASE_URL}/api/addToBasket`;
  return axios
    .post(url, {product_id: product_id})
    .then(response => response.data);
}