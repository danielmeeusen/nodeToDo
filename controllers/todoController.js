var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to mlab.com mongo database
mongoose.connect('mongodb://test:whatever1394@ds117495.mlab.com:17495/todo-ninja');

//create database schema (blueprint)
var todoSchema = new mongoose.Schema({item: String});

// create db model
var Todo =  mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => { 

    app.get('/todo', (req, res) => {
        // get data from mongodb and pass it to the view
        Todo.find({}, (err, data) => {
            if(err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, (req, res) => {
        // get data from view and add it to mongodb
        var newTodo = Todo(req.body).save( (err, data) => {
            if(err) throw err;
            // console.log(data);
            res.json(data);
        });
    });

    app.delete('/todo/:item', (req, res) => {
        // delete requested from mongodb
        var toDelete = Todo.find( {item: req.params.item} );
        // console.log('"'+req.params.item+'"');
        Todo.find( {item: req.params.item} ).remove( (err, data) => {
            if(err) throw err;
            // console.log(data);
            res.json(data);
        });
    });

};