import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

export {deleteFromBasket};

function deleteFromBasket(product_id) {
  const url = `${BASE_URL}/api/deleteFromBasket/` + product_id;
  return axios
    .delete(url)
    .then(response => response.data);
}
