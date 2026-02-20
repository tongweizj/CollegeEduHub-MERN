// AddStudent component to add a student
import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//
import { useNavigate } from 'react-router-dom';

import "./entryform.css"
//
//
const ADD_STUDENT = gql`
    mutation AddStudent(
        # define input variables
        $studentNumber: String!,
        $password: String!,
        $firstName: String!,
        $lastName: String!,
        $address: String!,
        $city: String!,
        $phoneNumber: String!,
        $email: String!,
        $program: String!       
        ) {
        addStudent(        
            # provide values for the variables
            studentNumber: $studentNumber,
            password:$password,
            firstName: $firstName,
            lastName: $lastName,
            address: $address,
            city: $city,
            phoneNumber: $phoneNumber,
            email: $email,
            program: $program
            ) 
            # This is what the query will return when it is called
            {
                id

            }
    }
`;
//function component to add a student
const AddStudent = () => {
    //
    let navigate = useNavigate()
    //
    let id, studentNumber, password, firstName, lastName, address, city, phoneNumber, email, program ;
    const [addStudent, { data, loading, error }] = useMutation(ADD_STUDENT);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div className = 'entryform'>
            <form
                onSubmit={ e => {    
                    e.preventDefault();
                    addStudent( { variables: {
                        studentNumber:studentNumber.value, 
                        password: password.value, 
                        firstName: firstName.value, 
                        lastName: lastName.value,
                        address: address.value,
                        city: city.value,
                        phoneNumber: phoneNumber.value, 
                        email: email.value,
                        program: program.value
                    } 
                    });
                    //
                    studentNumber.value = '';
                    password.value = ''; 
                    firstName.value = '';
                    lastName.value='';
                    address.value = '';
                    city.value = '';
                    phoneNumber.value = '';
                    email.value='';
                    program.value='';
                    navigate('/studentlist')                    } 
                }
            >
                    
                    <Form.Group>
                        <Form.Label> student Number:</Form.Label>
                        <Form.Control type="text"  name="studentNumber" ref={node => {studentNumber = node; }} 
                            placeholder="Student Number:" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> password:</Form.Label>
                        <Form.Control type="text"  name="password" ref={node => {password = node; }} 
                            placeholder="password:" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> First Name:</Form.Label>
                        <Form.Control type="text"  name="firstName" ref={node => {firstName = node; }} 
                            placeholder="First Name:" />
                    </Form.Group>                   
                    <Form.Group>
                        <Form.Label> Last Name:</Form.Label>
                        <Form.Control type="text" name="lastName" ref={node => {lastName = node; }} 
                            placeholder="Last Name:" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> address:</Form.Label>
                        <Form.Control type="text" name="address" ref={node => {address = node; }} 
                            placeholder="address:" />
                    </Form.Group> 

                    <Form.Group>
                        <Form.Label> city:</Form.Label>
                        <Form.Control type="text"  name="city" ref={node => {city = node; }} 
                            placeholder="city:" />
                    </Form.Group>  

                    <Form.Group>
                        <Form.Label> phoneNumber:</Form.Label>
                        <Form.Control type="text"  name="phoneNumber" ref={node => {phoneNumber = node; }} 
                            placeholder="Phone Number:" />
                    </Form.Group> 

                    <Form.Group>
                        <Form.Label> Email:</Form.Label>
                        <Form.Control type="text"  name="email" ref={node => {email = node; }} 
                            placeholder="Email:" />
                    </Form.Group>                     
                

                   
                
                    <Form.Group>
                        <Form.Label> Program:</Form.Label>
                        <Form.Control type="text"  name="program" ref={node => {program = node; }} 
                            placeholder="Program:" />
                    </Form.Group>                    
                
                                        

                    <Button variant="primary" type="submit"> Add Student </Button>

            </form>
        </div>
    );
}

export default AddStudent
