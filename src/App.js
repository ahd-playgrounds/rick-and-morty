import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchCharacters() {
      const results = await axios.get('https://rickandmortyapi.com/api/character')
      console.log(results.data.results[0])
      setCharacters(results.data.results)
    }
    fetchCharacters();
  }, [])

  console.log(characters)
  return (
    <div className="App">
      {characters.map((character) => <Character
        image={character.image}
        name={character.name}
        status={character.status}
        species={character.species}
        location={character.location.name}
      />)}
      <p>{characters.find((character) => character.name === "Rick Sanchez")?.status}</p>
      
    </div>
  );
}

export default App;

function Character({ image, name, status, species, location }) {
  return (
    <div>
      <img src={image} alt=""/>
      <h2>{name}</h2>
      <h3>{status} {species}</h3>
      <p>Last known location {location}</p>
      <p>first seen in EPISODE NAME</p>
    </div>
  )
}
