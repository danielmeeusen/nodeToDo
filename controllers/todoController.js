var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to mlab.com mongo database
mongoose.connect('mongodb://test:whatever1394@ds117495.mlab.com:17495/todo-ninja');
let db = mongoose.connection;

//check for db errors
db.on('error', (err) => {
    console.log(err);
});

//check connection
db.once('open', () => {
    console.log('Connected to MongoDB')
})

//create database schema (blueprint)
var todoSchema = new mongoose.Schema({item: String});

// create db model
var Todo =  mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => { 

    app.get('/', (req, res) => {
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

    app.delete('/todo/:id', (req, res) => {
        let query = {_id: req.params.id}

        Todo.remove(query, (err) => {
            if(err){ throw err; }
            res.send('Success');
        })
    });

};