import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateEdu = () => {
  const eduauth = localStorage.getItem("Eduuser");
  return eduauth ? <Outlet /> : <Navigate to="/edudashlogin" />;
};

export default PrivateEdu;
