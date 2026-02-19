import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
//
// import './login.css'
// this component is used to create a new user
function CreateUser(props) {
  let navigate = useNavigate()
  //
  const [user, setUser] = useState({
    _id: '', firstName: '', lastName: '',
    email: '', username: '', password: ''
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "/api/students/create";

  const saveUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      studentNumber: user.studentNumber,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      city: user.city,
      phoneNumber: user.phoneNumber,
      email: user.email,
      program: user.program,
      favoriteTopic: user.favoriteTopic,
      hobby: user.hobby
    };
    //use promises
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/admin/student/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  // handles onChange event
  const onChange = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <div>
      {showLoading &&
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      }
      <Form onSubmit={saveUser}>
        <Form.Group>
          <Form.Label> Student Number *</Form.Label>
          <Form.Control type="text" name="studentNumber" id="studentNumber" placeholder="Enter Student Number" value={user.studentNumber} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password *</Form.Label>
          <Form.Control type="password" name="password" id="password" placeholder="Enter password" value={user.password} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label> First Name</Form.Label>
          <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" value={user.firstName} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label> Last Name</Form.Label>
          <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={user.lastName} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>address</Form.Label>
          <Form.Control type="text" name="address" id="address" rows="3" placeholder="Enter address" value={user.address} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>city</Form.Label>
          <Form.Control type="text" name="city" id="city" rows="3" placeholder="Enter city" value={user.city} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>phoneNumber</Form.Label>
          <Form.Control type="text" name="phoneNumber" id="phoneNumber" rows="3" placeholder="Enter phoneNumber" value={user.phoneNumber} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={user.email} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>program</Form.Label>
          <Form.Control type="text" name="program" id="program" rows="3" placeholder="Enter program" value={user.program} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>favoriteTopic</Form.Label>
          <Form.Control type="text" name="favoriteTopic" id="favoriteTopic" placeholder="Enter favoriteTopic" value={user.favoriteTopic} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>hobby</Form.Label>
          <Form.Control type="text" name="hobby" id="hobby" placeholder="Enter hobby" value={user.hobby} onChange={onChange} />
        </Form.Group>



        <Button variant="primary" type="submit">
          Save
        </Button>

      </Form>
    </div>
  );
}
//
export default CreateUser;
