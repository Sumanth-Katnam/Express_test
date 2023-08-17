const express = require('express');
const router = express.Router();

const { getPeople, addPerson, updatePerson, deletePerson } = require('../contollers/people');

// router.get('/', getPeople);

// router.post('/', addPerson);

router.route('/').get(getPeople).post(addPerson);

// router.put('/:id', updatePerson);

// router.delete('/:id', deletePerson);

router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router;
