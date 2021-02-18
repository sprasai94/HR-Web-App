const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./db')();
var employee = require('./router/employeeCRUD');
var users = require('./router/users');
const auth = require('./router/auth');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));


app.listen(8848, () => console.log('Server started at port : 8848'));

app.use('/api/employees', employee);
app.use('/api/users', users);
app.use('/api/auth', auth);

