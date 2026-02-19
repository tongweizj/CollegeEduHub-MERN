// Load the controllers
const students = require('../controllers/students.server.controller');
const users = require('../../app/controllers/users.server.controller');

// Define the routes module method
module.exports = function (app) {
    // List all students (Requires Admin login)
    app.get("/students", users.requiresLogin, students.list); 

      // Authentication routes for students
    app.post('/students/signin', students.authenticate);
    app.get('/students/signout', students.signout);
    app.get('/students/read_cookie', students.isSignedIn);
    
    // Create a new student (Requires Admin login)
    app.post('/students/create', users.requiresLogin, students.create);

    // Student specific routes
    app.route('/students/:studentId')
        .get(students.read)
        .put(users.requiresLogin, students.update)
        .delete(users.requiresLogin, students.delete);

    // Set up the 'studentId' parameter middleware
    app.param('studentId', students.studentByID);

  
    
    // Protected welcome page for students
    app.get('/welcome', students.welcome);
};
