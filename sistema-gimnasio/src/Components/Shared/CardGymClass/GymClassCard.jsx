import React from "react";
import { Button } from "react-bootstrap";
import { deleteGymClass } from "../../GymClass/GymClassServices";
import "./GymClassCard.css";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";
import { useContext } from "react";

const CardGymClass = ({ entity, setChanges, changes }) => {
  const {theme} = useContext(ThemeContext)
  const handleDelete = async () => {
    try {
      await deleteGymClass(entity.idGymClass);
      setChanges(!changes);
    } catch (error) {
      console.error("Failed to delete gym class", error);
    }
  };

  return (
    <div className={theme === "dark" ? 'card-gymclass-dark' : 'card-gymclass-light'}>
      <h5 className="card-title">
        {entity.trainerActivity.activity.activityName}
      </h5>
      <p>
        <strong>Entrenador:</strong> {entity.trainerActivity.trainer.name}{" "}
        {entity.trainerActivity.trainer.lastName}
        <br />
        <strong>Día:</strong> {entity.dayName} <br />
        <strong>Horario:</strong> {entity.timeClass} <br />
        <strong>Cupo:</strong> {entity.capacity}
      </p>
      <div className="buttons">
        <Button variant="danger" onClick={handleDelete}>
          Eliminar
        </Button>
        <Link to={`/gym-class/edit-gym-class/${entity.idGymClass}`}>
          <Button variant="light" className="button-update-entity">
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CardGymClass;
