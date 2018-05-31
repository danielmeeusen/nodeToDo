var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to mlab.com mongo database
mongoose.connect('mongodb://test:whatever1394@ds117495.mlab.com:17495/todo-ninja');

//create database schema (blueprint)
var todoSchema = new mongoose.Schema({item: String});

var Todo =  mongoose.model('Todo', todoSchema);

var itemOne = Todo({item: 'masterbate'}).save((err) => {
    if(err) throw err;
    console.log('item saved');
});

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'masterbate'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => { 

    app.get('/todo', (req, res) => {
        res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser, (req, res) => {
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo/:item', (req, res) => {
        data = data.filter( (todo) => {
            return todo.item.replace(/ /g, '-') !== req.params.items;
        });
        res.json(data);
    });

};