const { products } = require('../data');

const getProducts = (req, res) => {
	res.json(products);
};

const getProductById = (req, res) => {
	const { id } = req.params;
	const product = products.find((prod) => prod.id === Number(id));
	if (!product) {
		return res.status(404).send('No such prod');
	}
	res.json(product);
};

const searchProducts = (req, res) => {
	const { name, limit } = req.query;
	let newProds = [...products];

	if (name) {
		newProds = newProds.filter((prod) => {
			return prod.name.startsWith(name);
		});
	}

	if (limit) {
		newProds = newProds.slice(0, Number(limit));
	}

	res.json(newProds);
};

module.exports = {
	getProducts,
	getProductById,
	searchProducts,
};
