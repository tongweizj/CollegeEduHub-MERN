import React, { useState, useEffect } from 'react'; 
import LoginForm from '../../components/LoginForm'

function App() {
 
  return (
    <LoginForm title='Admin welcome back' apiUrl='/api/signin' redirectPath='/admin/dashboard' isAdmin={true}/>
  );
}
//
export default App;

