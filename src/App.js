import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const createRandomNumber = () => (Math.floor(Math.random() * 20))

function App() {
  const [characters, setCharacters] = useState([]);
  const [randomNumber, setRandomNumber] = useState(createRandomNumber())

  function updateRandomNumber() {
    setRandomNumber(createRandomNumber())
  }
  
  useEffect(() => {
    async function fetchCharacters() {
      const results = await axios.get('https://rickandmortyapi.com/api/character')
      console.log(results.data.results[0])
      setCharacters(results.data.results)
    }
    fetchCharacters();
  }, [randomNumber])
  
  console.log(characters)
  return (
    <>
    <div className="App">
      {characters.map((character) => <Character
        image={character.image}
        name={character.name}
        status={character.status}
        species={character.species}
        location={character.location.name}
        episodeNumber={character.episode[0]}
        />)}
      {/* <p>{characters.find((character) => character.name === "Rick Sanchez")?.status}</p> */}
      </div>
      {characters.filter((character) => character.id === randomNumber)
        .map((character) => <GridView
        image={character.image}
        name={character.name}
        status={character.status}
        species={character.species}
          location={character.location.name}
          updateRandomNumber={updateRandomNumber}
      />)}
</>
  );
}

function Character({ image, name, status, species, location, episodeNumber }) {
  
  const [episodeName, setEpisodeName] = useState(null);

  useEffect(() => {
    async function fetchEpisode() {
      const results = await axios.get(episodeNumber)
      console.log(results.data)
      setEpisodeName(results.data.name)
    }
    fetchEpisode();
  }, [episodeNumber])
  return (
      <div>
      <img src={image} alt=""/>
      <h2>{name}</h2>
      <h3>{status} {species}</h3>
      <p>Last known location {location}</p>
      {episodeName ?<p>First seen in {episodeName}</p> : null} 
    </div>
  )
}

function GridView({ image, name, status, species, location, updateRandomNumber }) {

  return (
    <>
    <article class="c-tile c-tile--square">
  <a class="c-tile__link c-shine-context" href="#">
    <div class="c-tile__content">
      <div class="c-tile__media">
        <img alt="Example image" class="c-tile__poster" src={image} />
      </div>
      <div class="c-tile__body c-tile__caption">
              <p class="c-tile__title c-heading-delta">{name}</p>
              <p>{status} {species}</p>
              <p>Last known location {location}</p>
      </div>
    </div>
    <div class="c-tile__shine c-tile__shine--top c-shine">
      <div class="c-shine__rail"></div>
    </div>
    <div class="c-tile__shine c-tile__shine--bottom c-shine c-shine--rev">
      <div class="c-shine__rail"></div>
    </div>
  </a>
</article>

    {/* <div className="grid">
      <img src={image} alt=""/>
      <h2>{name}</h2>
      <h3>{status} {species}</h3>
      <p>Last known location {location}</p> */}
      
      <button
        onClick={() => { updateRandomNumber(); }}
        className="c-btn c-btn--primary"
      >
        Flumpy
      </button> 
    
  
      </>
  )
}






export default App;
