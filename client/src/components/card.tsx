import React, { useState } from "react";
import "./card.css";

interface Props {
  onClick: () => void;
  set: Set;
}

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

export function Card(props: Props) {
  const [index, setIndex] = useState(0); // Stan przechowujący indeks wyświetlanego słowa
  function handleLeftArrow() {
    setIndex((prevIndex) =>
      props.set
        ? prevIndex === 0
          ? props.set.words.length - 1
          : prevIndex - 1
        : prevIndex
    );
  }

  function handleRightArrow() {
    setIndex((prevIndex) =>
      props.set
        ? prevIndex === props.set.words.length - 1
          ? 0
          : prevIndex + 1
        : prevIndex
    );
  }

  return (
    <>
      <div className="carded" onClick={props.onClick}>
        <div className="card-back">
          <p>{props.set.words[index].meaning}</p>
        </div>
        <div className="card-front">
          <p>{props.set.words[index].word}</p>
        </div>
      </div>
      <p>
        Words: {props.set.words.length} | Current Word: {index} | Words to End:{" "}
        {props.set.words.length - index}
      </p>
      <div className="arrows">
        <span className="arrow-left" onClick={handleLeftArrow}>
          &#10094;
        </span>
        <span className="arrow-right" onClick={handleRightArrow}>
          &#10095;
        </span>
      </div>
    </>
  );
}
