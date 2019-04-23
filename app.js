const Joi = require('joi');
const express = require('express');
const app = express();
const crypto2 = require('crypto2');


app.use(express.json());

const persons = [
  { id: 1, name: 'Jon12'},
  { id: 2, name: 'Stannis43'},
  { id: 3, name: 'Ned50'},

];

app.get('/', (req, res) => {
  res.send('Hello World');

});
app.get('/persons', (req, res) => {
  res.send(persons);

});

app.post('/persons', (req, res) => {

  const { error } = ValidatePerson(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const person = {
    id: persons.length + 1,
    name: req.body.name
  };
  persons.push(person);
  res.send(person);
});
app.put('/persons/:id', (req, res) => {
  const person = persons.find(c => c.id === parseInt(req.params.id));
  if (!person) return res.status(404).send('the person with the given id was not found');


  const { error } = ValidatePerson(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  person.name = req.body.name;
  res.send(person);

});

async function ValidatePerson(person){
  var letterNumber = /^[0-9a-zA-Z]+$/;
  const schema = {name: Joi.string().value.match(letterNumber).required()};
  return Joi.validate(person, schema);
};


app.get('/persons/:id', (req, res) => {
  const person = persons.find(c => c.id === parseInt(req.params.id));
  if (!person) return res.status(404).send('the person with the given id was not found');
  res.send(person);
});

app.delete('/persons/:id', (req, res) => {
  const person = persons.find(c => c.id === parseInt(req.params.id));
  if (!person) return res.status(404).send('the person with the given id was not found');

  const index = persons.indexOf(person);
  persons.splice(index, 1);

  res.send(person);
});


app.listen(3000, () => console.log('Listen on port 3000..'))
