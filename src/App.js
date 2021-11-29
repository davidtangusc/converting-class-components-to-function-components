import React, { useEffect, useState } from "react";
import Loading from "./Loading";

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonDetails, setPokemonDetails] = useState(null);

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

  function fetchPokemonDetails(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((pokemonDetails) => {
        setPokemonDetails(pokemonDetails);
      });
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex">
      <ul>
        {pokemon.map((pokemon) => {
          return (
            <li key={pokemon.url}>
              {pokemon.name}

              <button
                type="button"
                onClick={() => {
                  fetchPokemonDetails(pokemon.url);
                }}
              >
                View
              </button>
            </li>
          );
        })}
      </ul>
      {pokemonDetails && (
        <div>
          <p>Moves for {pokemonDetails.name}</p>
          <ul>
            {pokemonDetails.moves.map((move) => {
              return <li key={move.move.url}>{move.move.name}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
