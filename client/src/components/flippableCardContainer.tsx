import "./styles/flippableCardContainer.css";
import { SingleCard } from "./SingleCard";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";

interface Props {
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

export function FlippableCardContainer(props: Props) {
  const [showFront, setShowFront] = useState(true);
  return (
    <div className="flippable-card-container">
      <CSSTransition in={showFront} timeout={300} classNames={"flip"}>
        <SingleCard
          set={props.set}
          onClick={() => {
            setShowFront((value) => !value);
          }}
        />
      </CSSTransition>
    </div>
  );
}
