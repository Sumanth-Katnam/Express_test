let { people } = require('../data');

const getPeople = (req, res) => {
	res.status(200).json({ success: true, data: people });
};

const addPerson = (req, res) => {
	const { name } = req.body;
	console.log(req.body);
	if (!name) {
		return res.status(400).json({ success: false, message: 'Please send value' });
	}
	res.status(201).json({ success: true, person: name });
};

const updatePerson = (req, res) => {
	const { id } = req.params;
	const { name } = req.body;

	const person = people.find((people) => people.id === Number(id));

	if (!person) {
		return res.status(404).json({ success: false, message: 'No such user' });
	}

	const newPeople = people.map((p) => {
		if (p.id === Number(id)) {
			person.name = name;
		}
	});

	return res.status(200).json({ success: true });
};

const deletePerson = (req, res) => {
	const person = people.find((people) => people.id === Number(req.params.id));

	if (!person) {
		return res.status(404).json({ success: false, message: 'No such user' });
	}

	const newPeople = people.filter((people) => people.id !== Number(req.params.id));

	return res.status(200).json({ success: true, data: newPeople });
};

module.exports = {
	getPeople,
	addPerson,
	updatePerson,
	deletePerson,
};
