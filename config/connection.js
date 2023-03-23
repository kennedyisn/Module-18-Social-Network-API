const { connect, connection } = require('mongoose');

// Connect to MongoDB
connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Log Mongo connection established
connection.on('connected', () => {
    console.log('Mongoose connected successfully.');
});

// Error message if connection not estaablished
connection.on('error', err => {
    console.log('Mongoose connection error: ', err);
});

// Export connection
module.exports = connection;