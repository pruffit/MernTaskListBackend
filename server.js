const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const MONGOUSER = 'mongo';
const MONGOPASSWORD = 'TezBCYSRtkER9Zm2N32N';
const MONGOHOST = 'containers-us-west-171.railway.app';
const MONGOPORT = '5467';

const app = express();

app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false).connect(`mongodb://${{ MONGOUSER }}:${{ MONGOPASSWORD }}@${{ MONGOHOST }}:${{ MONGOPORT }}/todo`, {
	useNewUrlParser: true
}).then(() => console.log('Connected to DB')).catch(console.error);

const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});

app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	});

	todo.save();

	res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json(result);
});

app.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
});

app.listen(`0.0.0.0:$PORT`);