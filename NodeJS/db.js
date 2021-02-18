// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/HRDb', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
//     if (!err)
//         console.log('MongoDB connection succeeded...');
//     else
//         console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
// });

// module.exports = mongoose;
const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function() {
    const db = config.get('db');
    mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => winston.info(`Connected to ${db}...`))
}
