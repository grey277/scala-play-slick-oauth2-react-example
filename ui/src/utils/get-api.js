import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

export {
  getProducts,
  getCategories,
  getBasket,
  getOrders,
  getPayments,
  getReviews,
  getTypes,
  authenticate,
  getProduct
};

function authenticate() {
  const url = `${BASE_URL}/authenticate/facebook`;
  return axios
    .get(url)
    .then(response => response.data)
}

function getProduct(product_id) {
  const url = `${BASE_URL}/api/getproduct/` + product_id;
  return axios
    .get(url)
    .then(response => response.data);
}

function getProducts() {
  const url = `${BASE_URL}/api/getproducts`;
  return axios
    .get(url)
    .then(response => response.data);
}

function getCategories() {
  const url = `${BASE_URL}/api/getcategories`;
  return axios
    .get(url)
    .then(response => response.data);
}

function getBasket() {
  const url = `${BASE_URL}/api/getbasket`;
  return axios
    .get(url)
    .then(response => response.data);
}

function getOrders() {
  const url = `${BASE_URL}/api/getorders`;
  return axios
    .get(url)
    .then(response => response.data);
}

function getPayments() {
  const url = `${BASE_URL}/api/getpayments`;
  return axios
    .get(url)
    .then(response => response.data);
}

function getReviews() {
  const url = `${BASE_URL}/api/getrevies`;
  return axios
    .get(url)
    .then(response => response.data);
}

function getTypes() {
  const url = `${BASE_URL}/api/gettypes`;
  return axios
    .get(url)
    .then(response => response.data);
}