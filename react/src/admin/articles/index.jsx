import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

function Articles(props) {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/api/articles";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(apiUrl);
        console.log('result.data:', result.data);
        setData(result.data);
        setShowLoading(false);
      } catch (error) {
        console.log('error in fetchData:', error);
        setShowLoading(false);
      }
    };
    fetchData();
  }, []);

  const showDetail = (id) => {
    navigate('/admin/article/' + id);
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
          <h1 className="h3 mb-0 text-gray-800">Article List</h1>
          <div>
            <button className="btn btn-primary" onClick={() => navigate('/admin/article/create')}>
              <i className="bi bi-plus-circle me-1"></i> Add Article
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <i className="bi bi-table me-2"></i> Student Information Table
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover" id="studentsTable">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Actions</th>
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
                        <td>{item.title}</td>
                        <td>{item.content || 'No Content'}</td>
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
  );
}

export default Articles;