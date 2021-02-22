const cors = require('cors'); 
const bodyParser = require('body-parser');

var employee = require('../router/employeeCRUD');
var users = require('../router/users');
const auth = require('../router/auth');
const error = require('../middleware/error');


module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(cors({ origin: 'http://localhost:4200' }));
    app.use('/api/employees', employee);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    
    app.use(error);
    
}