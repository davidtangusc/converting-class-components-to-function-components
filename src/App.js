import React, { useEffect, useState } from "react";
import Loading from "./Loading";

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=200")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setPokemon(json.results);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex">
      <ul>
        {pokemon.map((pokemon) => {
          return <li key={pokemon.url}>{pokemon.name}</li>;
        })}
      </ul>
    </div>
  );
}
