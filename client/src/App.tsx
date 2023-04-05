import { useEffect, useState } from "react";
import "./App.css";

export function App() {
  const [placeholderText, setPlaceholderText] = useState("");

  useEffect(() => {
    const textToWrite = "Search for your set!";
    let index = 0;
    let textLength = textToWrite.length;
    const intervalId = setInterval(() => {
      if (index === textLength - 1) {
        clearInterval(intervalId);
      } else {
        setPlaceholderText((prevText) => prevText + textToWrite[index]);
        index++;
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <header>
        <h1>SmartWords</h1>
        <div id="search-bar">
          <input type="text" id="text-to-write" placeholder={placeholderText} />
          <input type="submit" value="SEARCH" />
        </div>
        <button className="add-new-set">ADD new set</button>
      </header>
      <main>
        <div className="card-container">
          <div className="card">
            <h2>Card 1</h2>
            <p>Description of Card 1 lorem</p>
          </div>
          <div className="card">
            <h2>Card 2</h2>
            <p>Description of Card 2</p>
          </div>
          <div className="card">
            <h2>Card 3</h2>
            <p>Description of Card 3</p>
          </div>
          <div className="card">
            <h2>Card 4</h2>
            <p>Description of Card 4</p>
          </div>
          <div className="card">
            <h2>Card 5</h2>
            <p>Description of Card 5</p>
          </div>
          <div className="card">
            <h2>Card 6</h2>
            <p>Description of Card 6</p>
          </div>
          <div className="card">
            <h2>Card 7</h2>
            <p>Description of Card 6</p>
          </div>
        </div>
      </main>
    </div>
  );
}
