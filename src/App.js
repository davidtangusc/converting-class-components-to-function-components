import React from "react";
import Loading from "./Loading";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=200")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          pokemon: json.results,
          isLoading: false,
        });
      });
  }

  render() {
    return this.state.isLoading ? (
      <Loading />
    ) : (
      <div className="flex">
        <ul>
          {this.state.pokemon.map((pokemon) => {
            return <li key={pokemon.url}>{pokemon.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}
