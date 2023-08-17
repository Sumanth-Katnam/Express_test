const express = require('express');
const router = express.Router();

const { getProducts, getProductById, searchProducts } = require('../contollers/product');

router.get('/', getProducts);

router.get('/:id', getProductById);

router.get('/search', searchProducts);

module.exports = router;
