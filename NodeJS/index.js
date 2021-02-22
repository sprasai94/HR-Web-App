const express = require('express');
require('express-async-errors');
var app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

const port = process.env.PORT || 8848;
app.listen(8848, () => console.log(`Server started at port : ${port}...`));


