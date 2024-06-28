import {
  faPenToSquare,
  faTrashCan,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Card.css";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { Link } from "react-router-dom";
import { updateClientActiveState } from "../../Client/ClientServices";
import { ThemeContext } from "../../Context/ThemeContext";
import { useContext } from "react";

const Card = ({ entity, type, setChanges, changes, deleteEntity }) => {
  const [confirm, setConfirmModal] = useState(false);
  const {theme} = useContext(ThemeContext)
  const [activeModalClient, setActiveModalClient] = useState(false);

  const handleConfirm = () => {
    setConfirmModal(!confirm);
  };
  const handleConfirmActiveClient = () => {
    setConfirmModal(!confirm);
    setActiveModalClient(!activeModalClient);
  };

  const handleChange = () => {
    setConfirmModal(!confirm);
    setActiveModalClient(!activeModalClient);
    updateClientActiveState(entity.email, !entity.autorizationToReserve)
      .then(() => {
        setChanges(!changes);
      })
      .catch((error) => {
        console.error("Error al actualizar el estado del cliente:", error);
      });
  };

  const onAction = () => {
    if (activeModalClient) {
      return handleChange();
    }
    handleConfirm();
    deleteEntity(entity.email)
      .then(() => {
        setChanges(!changes);
      })
      .catch((error) => {
        console.error(`Error deleting ${type}:`, error);
      });
  };

  return (
    <div className={theme === "dark" ? 'card-entity-dark' : 'card-entity-light'}>
      <div className="card-left">
        <div className="icon-user">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="client-active">
          {type === "client" && (
            <Form.Check
              type="checkbox"
              id="cliente-activo"
              label="Cliente activo"
              checked={entity.autorizationToReserve}
              onChange={handleConfirmActiveClient}
            />
          )}
        </div>
      </div>

      <div className="information-user-section">
        <div className="information-user">
          <h5 className="card-entity-name">
            {entity.name} {entity.lastName}
          </h5>
          <h6 className="card-entity-email mb-2 text-body-secondary">
            {entity.email}
          </h6>
        </div>
        <div className="buttons">
          <Link to={`/${type}/edit-${type}/${entity.email}`}>
            <Button variant="light" className="button-update-entity">
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
          </Link>
          <Button
            variant="light"
            className="button-delete-entity"
            onClick={handleConfirm}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </div>
      </div>
      {confirm && (
        <ConfirmModal
          handler={handleConfirm}
          title={`Eliminar ${type}`}
          reason={"eliminar"}
          onAction={() => onAction()}
        >
          Estás seguro de que quieres eliminar {type !== "activity" ? "a" : ""}{" "}
          <strong>
            {entity.name} {entity.lastName}
          </strong>
          ?
        </ConfirmModal>
      )}
      {confirm && activeModalClient && (
        <ConfirmModal
          handler={handleChange}
          title={
            entity.autorizationToReserve ? `Desactivar ${type}` : `Activar`
          }
          reason={"enviar"}
          onAction={() => onAction()}
        >
          Estás seguro de que quieres{" "}
          {entity.autorizationToReserve ? " desactivar" : " activar"} la cuenta
          de{" "}
          <strong>
            {entity.name} {entity.lastName}
          </strong>
          ?
        </ConfirmModal>
      )}
    </div>
  );
};

export default Card;
