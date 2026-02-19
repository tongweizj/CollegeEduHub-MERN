import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
//
// this component is used to show a single user
function ShowUser(props) {
  let navigate = useNavigate();
  // Get the userId param from the URL.
  let { id } = useParams();
  console.log(id)
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/students/" + id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log("result:", result.data)
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editUser = (id) => {
    navigate('/admin/student/edit/' + id);
  };

  const deleteUser = (id) => {
    setShowLoading(true);
    const user = {
      firstName: data.firstName, lastName: data.lastName,
      email: data.email, username: data.username, password: data.password
    };

    axios.delete(apiUrl, user)
      .then((result) => {
        setShowLoading(false);
        navigate('/admin/students')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>}
      <h1>studentNumber: {data.firstName}, {data.lastName}</h1>
      <p>studentNumber: {data.studentNumber}</p>
      <p>Email: {data.email}</p>
      <p>address: {data.address}</p>
      <p>city: {data.city}</p>
      <p>phoneNumber: {data.phoneNumber}</p>
      <p>program: {data.program}</p>
      <p>favoriteTopic: {data.favoriteTopic}</p>
      <p>hobby: {data.hobby}</p>
      <p>
        <Button type="button" variant="primary" onClick={() => { editUser(data._id) }}>Edit</Button>&nbsp;
        <Button type="button" variant="danger" onClick={() => { deleteUser(data._id) }}>Delete</Button>
      </p>
    </div>
  );
}
//
export default ShowUser;
