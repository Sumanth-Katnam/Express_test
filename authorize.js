const authorize = (req, res, next) => {
	const { user } = req.query;
	if (user) {
		// Can be accessed later
		req.user = { name: user };
		next();
	} else {
		res.status(401).send('Unauthorized');
	}
};

module.exports = authorize;
