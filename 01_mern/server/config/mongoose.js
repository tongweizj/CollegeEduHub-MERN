// Load the module dependencies:
//  config.js module and mongoose module
var config = require('./config'),
    mongoose = require('mongoose');
// Define the Mongoose configuration method
module.exports = function () {
    // Use Mongoose to connect to MongoDB
    const db = mongoose.connect(config.db, {
		useUnifiedTopology: true,
		useNewUrlParser: true, useCreateIndex: true 
		}).then(() => console.log('DB Connected!'))
		.catch(err => {
		console.log('Error');
		});

    // Load the 'User' model 
    require('../app/models/user.server.model');
    // Load the 'Article' model 
    require('../app/models/article.server.model');
    // Load the 'Student' model 
    require('../app/models/student.server.model');
    // Load the 'Course' model 
    require('../app/models/course.server.model');

    // Create a default admin user if it doesn't exist
    console.log('Checking for default admin user...');
    const mongooseModel = require('mongoose').model('User');
    mongooseModel.findOne({ username: 'admin' }, (err, user) => {
        if (err) {
            console.log('Error checking for admin user:', err);
        } else if (!user) {
            console.log('No admin user found in database. Attempting to create default admin account...');
            const admin = new mongooseModel({
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@example.com',
                username: 'admin',
                password: 'pass123' // Length must be > 6
            });
            admin.save((err) => {
                if (err) {
                    console.log('Error creating default admin user:', err);
                } else {
                    console.log('Default admin user created successfully! Username: admin, Password: password123');
                }
            });
        } else {
            console.log('--- Admin check details ---');
            console.log('Admin user found in DB:', user.username);
            console.log('User ID in MongoDB:', user._id);
            console.log('Connected to Database:', mongoose.connection.name);
            console.log('Database Host:', mongoose.connection.host);
            console.log('---------------------------');
        }
    });

    // Return the Mongoose connection instance
    return db;
};