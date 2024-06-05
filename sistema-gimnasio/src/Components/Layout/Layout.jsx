import Admin from "../Admin/Admin";
import { Route, Routes } from "react-router-dom";
import FormUser from "../Forms/FormUser/FormUser";
import Client from "../Client/Client";
import Trainer from "../Trainer/Trainer";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";
import React from "react";
import Login from "../Login/Login";
import Home from "./Home/Home";
import RecoverPassword from "../Forms/RecoverPassword/RecoverPassword";
import ChangePasswordForm from "../Forms/ValidateTokenForm/ChangePasswordForm";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/admin/create-admin"
          element={<FormUser entity={"admin"} />}
        />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/admin/edit-admin/:userEmail"
          element={<FormUser entity={"admin"} editForm={true} />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<RecoverPassword />} />
        <Route
          path="/forget-password/validate-token"
          element={<ChangePasswordForm />}
        />

        <Route path="/client" element={<Client />} />
        <Route
          path="/client/create-client"
          element={<FormUser entity={"client"} />}
        />
        <Route path="/client" element={<Client />} />
        <Route
          path="/client/edit-client/:userEmail"
          element={<FormUser entity={"client"} editForm={true} />}
        />

        <Route path="/trainer" element={<Trainer />} />
        <Route
          path="/trainer/create-trainer"
          element={<FormUser entity={"trainer"} />}
        />
        <Route path="/trainer" element={<Trainer />} />
        <Route
          path="/trainer/edit-trainer/:userEmail"
          element={<FormUser entity={"trainer"} editForm={true} />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default Layout;
