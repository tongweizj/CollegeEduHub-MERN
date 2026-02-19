import React, { useState, useEffect } from 'react';
import LoginForm from '../../components/LoginForm';

function App() {
  return (
    <LoginForm title='Welcome back' apiUrl='/api/students/signin' redirectPath='/' isAdmin={false}/>
    
  );
}
//
export default App;

