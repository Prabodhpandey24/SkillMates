import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateEdu = () => {
  // const eduauth = localStorage.getItem("Eduuser");
  const eduauth = useSelector(selectData=>selectData);
  return eduauth.auth.user ? <Outlet /> : <Navigate to="/edudashlogin" />;
};

export default PrivateEdu;
