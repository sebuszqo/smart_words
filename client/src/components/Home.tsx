import React, { useEffect, useState } from "react";

import "../App.css";
import { Link } from "react-router-dom";
import { SearchBar } from "./Search";
import { HomeCards } from "./HomeCards";

interface Set {
  name: string;
  description: string;
  _id: string;
}

export function Home() {
  const [searchBar, setSearchBar] = useState("");
  const [sets, setSets] = useState<Set[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3001/set/search/${searchBar}`
      );
      const sets = await response.json();
      setSets(sets);
    })();
  }, [searchBar]);

  return (
    <>
      <header>
        <h1>SmartWords</h1>
        <SearchBar searchBar={searchBar} setSearchBar={setSearchBar} />
        <Link to={"/create-set"}>
          <button className="add-new-set">ADD new set</button>
        </Link>
      </header>
      <main>
        <HomeCards sets={sets} setSets={setSets}></HomeCards>
      </main>
    </>
  );
}
