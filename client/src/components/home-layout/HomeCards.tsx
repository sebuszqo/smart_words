import { Link } from "react-router-dom";
import React from "react";

interface Props {
  sets: Set[];
  setSets: (sets: Set[]) => void;
}

interface Set {
  name: string;
  description: string;
  _id: string;
}

export function HomeCards(props: Props) {
  function handleDeleteButtonClick(event: any) {
    event.preventDefault();
    (async () => {
      const response = await fetch(
        `http://localhost:3001/set/${event.target.value}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      } else {
        const updatedSets = props.sets.filter(
          (set) => set._id !== event.target.value
        );
        props.setSets(updatedSets);
      }
    })();
  }

  return (
    <div className="card-container">
      {props.sets.map((obj) => (
        <Link className={"card"} key={obj._id} to={`/set/${obj._id}`}>
          <div className="card-header">
            <h2>{obj.name}</h2>

            <button
              value={obj._id}
              className="delete-card-button"
              aria-label="Delete SingleCard"
              type={"button"}
              onClick={(e) => handleDeleteButtonClick(e)}
            >
              🗑️
            </button>
          </div>
          <div className="card-body">
            <p>{obj.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
