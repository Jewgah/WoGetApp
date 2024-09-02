import React from "react";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "../../ErrorPage/ErrorPage.jsx";
import Login from "../Login/Login.jsx";
import SignUp from "../SignUp/SignUp.jsx";

export default function AuthLayout () {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login  />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
