import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import pokedexicon from '../images/pokedexicon.png';
import Login from '../components/Login';
import Charizard from '../images/charizard.png';
import BackToTop from '../components/BackToTop/BackToTop';
import pokeball_placeholder from '../images/pokeball_placeholder.png'; 


const MyPokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [pokemonInput, setPokemonInput] = useState('');
  const [pokemonIndex, setPokemonIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(true);
  const [showPopup, setShowPopup] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);

const [darkMode, setDarkMode] = useState(() => {
  const storedPreference = localStorage.getItem('darkMode');
  return storedPreference !== null ? JSON.parse(storedPreference) : false;
});


  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
};

  useEffect(() => {
    setIsLoadingData(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=9&offset=${pokemonIndex}`)
      .then(res => setPokemons(res.data.results));

      setIsLoadingData(false);

    axios.get('https://pokeapi.co/api/v2/type/')
      .then(res => setTypes(res.data.results))

    const button = document.getElementById('list');
    const pokemonsListContainer = document.getElementById('pokemons-list-container');

    button.addEventListener('click', function() {
        pokemonsListContainer.scrollIntoView({ behavior: 'smooth' });
    });
     
  }, [pokemonIndex]);

  

  const togglePopup = () => {
    setShowPopup(false); 
    setTimeout(() => {
      setShowPopup(true);
    }, 6000);
  };

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      togglePopup();
    }, 6000);

    return () => clearTimeout(hideTimer);
  }, [showPopup]);


  const searchPokemonByName = (e) => {
    e.preventDefault();
    navigate(`/pokedex/${pokemonInput.toLowerCase()}`);
    window.scrollTo(0, 0);
  }

  const filterByType = (e) => {
    const url = e.target.value;
    axios.get(url)
      .then(res => {
        const data = url === 'https://pokeapi.co/api/v2/pokemon' ? res.data.results : res.data.pokemon;
        setPokemons(data);
        setShowButtons(url === 'https://pokeapi.co/api/v2/pokemon');
      })
      .catch(error => console.log(error));
  }

  const handlePagination = (increment) => {
    setPokemonIndex(prevIndex => prevIndex + increment);
    
  }

  const paginationButtons = () => {
    return (
      <div className="pagination">
        {showButtons && pokemonIndex > 0 && (
          <button onClick={(event) => {
            event.preventDefault();
            handlePagination(-20);
          }} disabled={pokemonIndex === 0}>
            <i className='bx bxs-left-arrow'></i>
          </button>
        )}
        {showButtons && (
          <button onClick={(event) => {
            event.preventDefault();
            handlePagination(20);
          }}>
            <i className='bx bxs-right-arrow'></i>
          </button>
        )}
      </div>
    );
  }

  return (
    <div id="top" className={`pokedex-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="pokedex-title">
        <a href={Login}>
          <img src={pokedexicon} alt="" />
        </a>
        <h1>Sua Pokédex</h1>
        <input  type="checkbox"
                    id="toggle"
                    className="trocarCor"
                    checked={darkMode}
                    onChange={toggleDarkMode} />
        <label
           htmlFor="toggle"
           className="check"
        ></label>
      </div>

      <div className='page-container'>
      <div className='page-info'>
      <p>リザードン</p>
      <h1>Charizard</h1>
      <p>Charizard, conhecido como Lizardon (リザードン Rizadon) no Japão, é uma criatura fictícia da franquia Pokémon que pertence a Nintendo e Game Freak. Criado por Ken Sugimori, Charizard apareceu pela primeira vez nos jogos Pokémon Red e Blue e subsequentes sequelas.
     </p>
     <button id='list'>Ver Mais</button>
     
      </div>

      {isLoadingData ? (
            <img src={pokeball_placeholder} className="loading-image" alt="Carregando" />
          ) : (
            <img src={Charizard} alt="Charizard" />
          )}

      </div>
                                

      <div className="pokedex-menu">
     
        {showPopup && (
          <div className="popup">
            <p><b>{user}</b>! Esta é a Sua Pokédex.</p>
          </div>
        )}

        <form onSubmit={searchPokemonByName}>
          <input
            type="text"
            placeholder='Nome do Pokemon...'
            onChange={e => setPokemonInput(e.target.value)}
            value={pokemonInput}
          />
          <button type="submit">
          <i className='bx bxs-search'></i>
          </button>
        </form>

        <div className="select-container">
          <p><b>Filtrar Por Tipo</b>:</p>
          <select onChange={filterByType}>
            <option value="https://pokeapi.co/api/v2/pokemon">Selecionar</option>
            {types.map(type => (
              <option value={type.url} key={type.name}>
                {type.name[0].toUpperCase() + type.name.substring(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pokemons-list-container" id='pokemons-list-container'>
        {paginationButtons()}
        <ul className='pokemons-list' >
          {pokemons.map(pokemon => (
            <PokemonCard
              pokemon={pokemon.url ? pokemon.url : pokemon.pokemon.url}
              key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
            />
          ))
          }
        </ul>
        {paginationButtons()}
      </div>
      <div className="pokedex__footer">
           <ul className="footer__social-media">
                <li><a className="footer__link" href="https://www.linkedin.com/in/samuel-ara%C3%BAjo-733a54241" target='_blank'> <i className='bx bxl-linkedin'></i> @Samuel Araújo</a>
                </li>
                <br></br>
                 <li>
                  <a className="footer__link" href="https://github.com/lopppes" target='_blank'>
                  <i className='bx bxl-github'></i> @lopppes</a>
                 
                 </li>
           </ul>
                            
     </div>
      <BackToTop></BackToTop>
    </div>

  );
};

export default MyPokedex;
