// Load the module dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Define a schema
const Schema = mongoose.Schema;

// Define a new 'StudentSchema'
var StudentSchema = new Schema({
    studentNumber: {
        type: String,
        unique: true,
        required: 'Student number is required',
        trim: true
    },
    password: {
        type: String,
        validate: [
            (password) => password && password.length > 6,
            'Password should be longer than 6 characters'
        ]
    },
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    phoneNumber: String,
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    program: String,
    favoriteTopic: String,
    hobby: String
});

// Set the 'fullName' virtual property
StudentSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
    const splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

// Use a pre-save middleware to hash the password
StudentSchema.pre('save', function(next) {
    if (this.password) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

// Create an instance method for authenticating student
StudentSchema.methods.authenticate = function(password) {
    return this.password === bcrypt.hashSync(password, saltRounds);
};

// Configure the 'StudentSchema' to use getters and virtuals when transforming to JSON
StudentSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

// Create the 'Student' model out of the 'StudentSchema'
mongoose.model('Student', StudentSchema);
