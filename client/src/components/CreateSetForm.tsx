import React, { useState } from "react";

import "./styles/CreateSetForm.css";
import { Link, useNavigate } from "react-router-dom";

interface Word {
  word: string;
  meaning: string;
}

interface SetData {
  name: string;
  description: string;
  createdAt: Date;
  words: Word[];
}

export function AddSetForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date());
  const [words, setWords] = useState<Word[]>([{ word: "", meaning: "" }]);

  const navigate = useNavigate();

  const handleRemoveWord = () => {
    if (words.length > 1) {
      setWords(words.slice(0, -1));
    }
  };

  const handleAddWord = () => {
    setWords([...words, { word: "", meaning: "" }]);
  };

  const handleWordChange = (index: number, key: string, value: string) => {
    const newWords = [...words];
    newWords[index] = { ...newWords[index], [key]: value };
    setWords(newWords);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: SetData = { name, description, createdAt, words };

    try {
      const response = await fetch("http://localhost:3001/set", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Set created successfully!");
        navigate("/");
      } else {
        console.log("An error occurred while creating the set");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header>
        <Link to={"/"}>
          <h1>SmartWords</h1>
        </Link>
        <Link to={"/"}>
          <button className={"add-new-set"}>Return to sets</button>
        </Link>
      </header>
      <form onSubmit={handleSubmit} className={"newSet"}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        {words.map((word, index) => (
          <div key={index} className="word-input-container">
            <label>
              Word:
              <input
                type="text"
                className="word-input"
                value={word.word}
                onChange={(e) =>
                  handleWordChange(index, "word", e.target.value)
                }
              />
            </label>
            <label>
              Meaning:
              <input
                type="text"
                className="meaning-input"
                value={word.meaning}
                onChange={(e) =>
                  handleWordChange(index, "meaning", e.target.value)
                }
              />
            </label>
          </div>
        ))}
        <div className="button-container">
          <button
            type="button"
            className={"word-meaning"}
            onClick={handleRemoveWord}
          >
            <i className="fas fa-minus"></i>
          </button>
          <button
            type="button"
            className={"word-meaning"}
            onClick={handleAddWord}
          >
            <i className="fas fa-plus"></i>
          </button>
          <button className="submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
