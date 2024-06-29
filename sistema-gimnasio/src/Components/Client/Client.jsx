import React, { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../Shared/Card/Card";
import "./Client.css";
import { getAllClients } from "./ClientServices";
import { deleteClient } from "./ClientServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../Context/ThemeContext";

const Client = () => {
  const [clients, setClients] = useState([]);
  const {theme} = useContext(ThemeContext)
  const [changes, setChanges] = useState(false);
  const [toastModal, setToast] = useState({
    message: null,
    display: false,
    error: false,
  });

  const getClients = async () => {
    try {
      const response = await getAllClients();
      setClients(response.data);
    } catch (error) {
      toast.error("No puedes acceder a esa seccion");
    }
  };
  useEffect(() => {
    if (toastModal.display === true && toastModal.error === false) {
      toast.success(toastModal.message);
    } else if (toastModal.display === true && toastModal.error === true) {
      toast.error(toastModal.message);
    }
  }, [toastModal]);

  useEffect(() => {
    getClients();
  }, [changes]);

  return (
    <section className="client-section">
      <h2>CLIENTES</h2>
      <Link to="/client/create-client">
        <Button variant="light" className={theme === "dark" ? 'button-client-dark' : 'button-client-light'}>
          + Nuevo cliente
        </Button>
      </Link>
      <div className="client-container-card">
      {clients.map((client) => (
        <Card
          entity={client}
          type={"client"}
          key={client.email}
          setToast={setToast}
          setChanges={setChanges}
          changes={changes}
          deleteEntity={deleteClient}
        />
      ))}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default Client;
