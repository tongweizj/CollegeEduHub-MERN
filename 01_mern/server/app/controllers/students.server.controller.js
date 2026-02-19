// Load the module dependencies
const Student = require('mongoose').model('Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

// Create a new error handling controller method
const getErrorMessage = function(err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Student number already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (const errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    return message;
};

// Create a new student
exports.create = function (req, res, next) {
    var student = new Student(req.body);
    student.save(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(student);
        }
    });
};

// Returns all students
exports.list = function (req, res, next) {
    Student.find({}, function (err, students) {
        if (err) {
            return next(err);
        } else {
            res.json(students);
        }
    });
};

// 'read' controller method to display a student
exports.read = function(req, res) {
    res.json(req.student);
};

// 'studentByID' controller method to find a student by its id
exports.studentByID = function (req, res, next, id) {
    Student.findOne({
        _id: id
    }, (err, student) => {
        if (err) {
            return next(err);
        } else {
            req.student = student;
            next();
        }
    });
};

// Update a student by id
exports.update = function(req, res, next) {
    Student.findByIdAndUpdate(req.student.id, req.body, function (err, student) {
      if (err) {
        return next(err);
      }
      res.json(student);
    });
};

// Delete a student by id
exports.delete = function(req, res, next) {
    Student.findByIdAndRemove(req.student.id, function (err, student) {
      if (err) return next(err);
      res.json(student);
    });
};

// Authenticates a student
exports.authenticate = function(req, res, next) {
    const studentNumber = req.body.auth.username; // Keep 'username' key from frontend but map to studentNumber
    const password = req.body.auth.password;

    console.log('Searching for student with number:', studentNumber, '--', password, 'Type:', typeof studentNumber);

    Student.findOne({studentNumber: studentNumber}, (err, student) => {
        if (err) {
            console.error('Database error during student auth:', err);
            return next(err);
        } else {
            if(student) {
                console.log('Student found:', student.studentNumber);
                if(bcrypt.compareSync(password, student.password)) {
                    console.log('Student password match successful');
                    const token = jwt.sign({ id: student._id, username: student.studentNumber }, jwtKey, 
                        {algorithm: 'HS256', expiresIn: jwtExpirySeconds });
                    
                    res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true});
                    res.status(200).send({ screen: student.studentNumber });
                    
                    req.student = student;
                    next();
                } else {
                    console.log('Student password mismatch for:', studentNumber);
                    res.json({status:"error", message: "Invalid student number/password!!!", data:null});
                }
            } else {
                console.log('Student not found in database:', studentNumber);
                res.json({status:"error", message: "Invalid student number/password!!!", data:null});
            }
        }
    });
};

// Protected page uses the JWT token
exports.welcome = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).end();
    }
  
    var payload;
    try {
      payload = jwt.verify(token, jwtKey);
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        return res.status(401).end();
      }
      return res.status(400).end();
    }
    res.send(`${payload.username}`);
};

// Sign out function
exports.signout = (req, res) => {
    res.clearCookie("token");
    return res.status('200').json({message: "signed out"});
};

// Check if the student is signed in
exports.isSignedIn = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.send({ screen: 'auth' }).end();
    }
    var payload;
    try {
      payload = jwt.verify(token, jwtKey);
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        return res.status(401).end();
      }
      return res.status(400).end();
    }
    res.status(200).send({ screen: payload.username });
};

// Check whether a student is currently authenticated
exports.requiresLogin = function (req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      return res.send({ screen: 'auth' }).end();
    }
    var payload;
    try {
      payload = jwt.verify(token, jwtKey);
      req.id = payload.id;
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        return res.status(401).end();
      }
      return res.status(400).end();
    }
    next();
};