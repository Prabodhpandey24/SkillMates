import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponent = () => {
  const userauth = localStorage.getItem("user");
  return userauth ? <Outlet /> : <Navigate to="/Signin" />;
};

export default PrivateComponent;
