const moongose = require('mongoose');

const connectDB = async () => {
    await moongose.connect(process.env.MONGO_URI).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });
};

module.exports = connectDB;