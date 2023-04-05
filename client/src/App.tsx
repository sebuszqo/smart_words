import { useEffect, useState } from "react";

import "./App.css";

interface Set {
  name: string;
  description: string;
}

export function App() {
  const [placeholderText, setPlaceholderText] = useState("");
  const [searchBar, setSearchBar] = useState("");
  const [sets, setSets] = useState<Set[]>([]);

  // useEffect(() => {
  //   const textToWrite = "Search for your set!";
  //   let index = 0;
  //   let textLength = textToWrite.length;
  //   const intervalId = setInterval(() => {
  //     if (index === textLength - 1) {
  //       clearInterval(intervalId);
  //     } else {
  //       setPlaceholderText((prevText) => prevText + textToWrite[index]);
  //       index++;
  //     }
  //   }, 100);
  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3001/set/search/?name=${searchBar}`
      );
      const sets = await response.json();
      console.log(sets);
      setSets(sets);
    })();
  }, [searchBar]);

  // const handleSearch = async () => {
  //   const response = await fetch(
  //       `http://localhost:3001/set/search?name=${searchBar}`
  //   );
  //   const data = await response.json();
  //   setSets(data);
  //   console.log(data);
  // };

  return (
    <div className="App">
      <header>
        <h1>SmartWords</h1>
        <div id="search-bar">
          <input
            type="text"
            value={searchBar}
            id="text-to-write"
            placeholder={placeholderText}
            onChange={(e) => setSearchBar(e.target.value)}
          />
          {/*<input type="submit" value="SEARCH" />*/}
        </div>
        <button className="add-new-set">ADD new set</button>
      </header>
      <main>
        <div className="card-container">
          {sets.map((obj) => (
            <div className="card">
              <div className="card-header">
                <h2>{obj.name}</h2>
                <button
                  value={obj.name}
                  className="delete-card-button"
                  aria-label="Delete Card"
                >
                  🗑️
                </button>
              </div>
              <div className="card-body">
                <p>{obj.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
