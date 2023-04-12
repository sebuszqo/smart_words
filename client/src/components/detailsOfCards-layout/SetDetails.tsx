import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FlippableCardContainer } from "./flippableCardContainer";

import "../styles/SetDetails.css";

interface Set {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  words: Word[];
}

interface Word {
  _id: string;
  word: string;
  meaning: string;
}

export function SetDetails() {
  const { id } = useParams();
  const [set, setSet] = useState<Set | null>(null); // Stan przechowujący dane seta

  useEffect(() => {
    (async function fetchSet() {
      try {
        const response = await fetch(`http://localhost:3001/set/${id}`);
        const data = await response.json();
        setSet(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <>
      <header>
        <Link to={"/"}>
          <h1>SmartWords</h1>
        </Link>
        <Link className="add-new-set" to={"/"}>
          Return to sets
        </Link>
      </header>
      {!set ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={"nameContainer"}>
            <h2>
              <span>{set.name}</span>
            </h2>
          </div>
          <div className="cardApp">
            <FlippableCardContainer set={set} />
          </div>
        </>
      )}
      {/*<div className={`card ${isFlipped ? "flip" : ""}`} onClick={handleFlip}>*/}
      {/*  {isFlipped ? (*/}
      {/*    <span className={"front"}>{set.words[index].word}</span>*/}
      {/*  ) : (*/}
      {/*    <span className={"back"}>{set.words[index].meaning}</span>*/}
      {/*  )}*/}
      {/*</div>*/}
    </>
  );
}
