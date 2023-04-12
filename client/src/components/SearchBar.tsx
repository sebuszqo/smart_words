import React, { useEffect, useState } from "react";

interface Props {
  searchBar: string;
  setSearchBar: (searchBar: string) => void;
}

export function SearchBar(props: Props) {
  const [placeholderText, setPlaceholderText] = useState("");

  useEffect(() => {
    const textToWrite = "Seaarch for your set!";
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
    <div id="search-bar">
      <input
        type="text"
        value={props.searchBar}
        id="text-to-write"
        placeholder={placeholderText}
        onChange={(e) => props.setSearchBar(e.target.value)}
      />
    </div>
  );
}
