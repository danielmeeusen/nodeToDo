var bodyParser = require('body-parser');

var data = [];

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