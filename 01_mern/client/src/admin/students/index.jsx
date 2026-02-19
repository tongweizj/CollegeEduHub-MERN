import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Login from '../login';
import { useNavigate } from 'react-router-dom';

function Students(props) {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/students";
  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('result.data:', result.data)
          //check if the user has logged in
          if (result.data.screen !== 'auth') {

            console.log('data in if:', result.data)
            setData(result.data);
            setShowLoading(false);
          }
        }).catch((error) => {
          console.log('error in fetchData:', error)
          setListError(true)
        });
    };
    fetchData();
  }, []);

  const showDetail = (id) => {
    navigate('/admin/student/' + id);
  };
  return (
    <div>
      {showLoading &&
        <div className="text-center my-3">
          <Spinner animation="border" variant="primary" />
        </div>
      }

      <div className="main-content" id="mainContent">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0 text-gray-800">Student User List</h1>
          <div>
            <button className="btn btn-primary" onClick={() => navigate('/admin/student/create')}>
              <i className="bi bi-plus-circle me-1"></i> Add Student
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <i className="bi bi-table me-2"></i> Student Table
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover" id="studentsTable">
                <thead>
                  <tr>
                    <th>username</th>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>email</th>
                    <th>Tools</th>
                  </tr>
                </thead>
                <tbody id="studentsTableBody">
                  {data.length !== 0 ? (
                    data.map((item, idx) => (
                      <tr
                        key={idx}
                        onClick={() => showDetail(item._id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>{item.studentNumber}</td>
                        <td>{item.firstName || 'null'}</td>
                        <td>{item.lastName || 'null'}</td>
                        <td>{item.email || 'null'}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-info">View</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">No data found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Students;