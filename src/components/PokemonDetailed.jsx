import LoadingData from './LoadingData';
import pokeball_placeholder from '../images/pokeball_placeholder.png';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import pokedexicon from '../images/pokedexicon.png';

const PokemonDetailed = () => {
  
    const colors = [
        {
            id: 'normal',
            color: 'linear-gradient(to right, #a8a878, #c0c08c)',
        },
        {
            id: 'fighting',
            color: 'linear-gradient(220.55deg, #FF0000 0%, #470000 100%)',
        },
        {
            id: 'flying',
            color: 'linear-gradient(to right, #57a7dd, #a8a878)',
        },
        {
            id: 'poison',
            color: 'linear-gradient(to right, #754db0, #b05da0)',
        },
        {
            id: 'ground',
            color: 'linear-gradient(to right, #d7bc4d, #c9a550)',
        },
        {
            id: 'rock',
            color: 'linear-gradient(to right, #b8a038, #c0b870)',
        },
        {
            id: 'bug',
            color: 'linear-gradient(to right, #a8b820, #a0b030)',
        },
        {
            id: 'ghost',
            color: 'linear-gradient(to right, #705898, #a890f0)',
        },
        {
            id: 'steel',
            color: 'linear-gradient(to right, #b8b8d0, #c8c8d0)',
        },
        {
            id: 'fire',
            color: 'linear-gradient(220.55deg, #a67005 0%, #E20000 100%)',
        },
        {
            id: 'water',
            color: 'linear-gradient(to right, #6890f0, #78a0d0)',
        },
        {
            id: 'grass',
            color: 'linear-gradient(220.55deg, #61C695 0%, #102e16 100%)',
        },
        {
            id: 'electric',
            color: 'linear-gradient(to right, #f8d030, #cfa211)',
        },
        {
            id: 'psychic',
            color: 'linear-gradient(to right, #f85888, #fc8)',
        },
        {
            id: 'ice',
            color: 'linear-gradient(to right, #98d8d8, #b8f)',
        },
        {
            id: 'dragon',
            color: 'linear-gradient(to right, #7038f8, #78f)',
        },
        {
            id: 'dark',
            color: 'linear-gradient(to right, #705848, #a8a878)',
        },
        {
            id: 'fairy',
            color: 'linear-gradient(to right, #ee99ac, #ee9)',
        },
        {
            id: 'unknown',
            color: 'linear-gradient(to right, #68a090, #44b789)',
        },
    ];

    const [pokemonDetails, setPokemonDetails] = useState([]);
    const [moves, setMoves] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const { pokeId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsLoadingData(true);
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
            .then((res) => {
                setPokemonDetails(res.data);
                setMoves(res.data.moves);
            })
            .catch(() => navigate('/pokedex/notfound'))
            .finally(() => setIsLoadingData(false));
    }, [pokeId, navigate]);

    const setColor = () => {
        for (let i in colors) {
            if (colors[i].id === pokemonDetails.types?.[0]?.type?.name) {
                return colors[i].color;
            }
        }
    };

    const barWidthFixed = (value, max) => {
        const percentage = (value * 100) / max;
        return percentage;
    };

    const pokemonName = pokemonDetails.name?.[0].toUpperCase() + pokemonDetails.name?.substring(1);
    const firstType = pokemonDetails.types?.[0]?.type?.name;
    const secondType = pokemonDetails.types?.[1]?.type?.name;
    const firstTypeFixed = firstType?.toUpperCase();
    const secondTypeFixed = secondType?.toUpperCase();
    const pHeight = (pokemonDetails.height / 10);
    const pWeight = (pokemonDetails.weight / 10);

    return (
        <div className='pokemon-details-container'>
            <div className='pokedex-title'>
                <img src={pokedexicon} alt='' />
                <h1>Pokédex</h1>
            </div>
            <div className='full-pokemon-container'>
                <button onClick={() => navigate('/pokedex')}>
                    <i className='bx bxs-chevron-left bx-xs'></i>
                </button>
                <div className='pokemon-details-card' style={{ background: setColor() }}>
                    {isLoadingData ? (
                        <img src={pokeball_placeholder} className='pokeball-spinning' />
                    ) : (
                        <img src={pokemonDetails.sprites?.other.home.front_default} alt='' />
                    )}
                    <div className='p-d-info'>
                        <div className='p-d-pname'>
                            {isLoadingData ? (
                                <LoadingData />
                            ) : (
                                <p><b>--{pokemonName}--</b></p>
                            )}
                        </div>
                        <div className='p-d-type'>
                            <div className='p-d-type-title'>
                                {isLoadingData ? (
                                    <LoadingData />
                                ) : (
                                    <p><b>Tipo:</b></p>
                                )}
                            </div>
                            <div className='p-d-type-info'>
                                {isLoadingData ? (
                                    <LoadingData />
                                ) : (
                                    <p>
                                        {pokemonDetails.types?.[1] ? (
                                            <>
                                                <span className='p-d-type-details'>
                                                    {firstTypeFixed}
                                                </span>
                                                <span className='p-d-type-details'>
                                                    {secondTypeFixed}
                                                </span>
                                            </>
                                        ) : (
                                            <span className='p-d-type-details' style={{ background: setColor() }}>
                                                {firstTypeFixed}
                                            </span>
                                        )}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='p-d-hnw'>
                            <div className='p-d-hnw-title'>
                                {isLoadingData ? (
                                    <LoadingData />
                                ) : (
                                    <>
                                        <p><b>Altura</b></p>
                                        <p><b>Peso</b></p>
                                    </>
                                )}
                            </div>
                            <div className='p-d-hnw-description'>
                                {isLoadingData ? (
                                    <LoadingData />
                                ) : (
                                    <>
                                        <p>{pHeight}M</p>
                                        <p>{pWeight}KG</p>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className='p-d-stats-container'>
                            <div className='p-d-stats-title'>
                                {isLoadingData ? (
                                    <LoadingData />
                                ) : (
                                    <p><b>Estatísticas</b></p>
                                )}
                            </div>
                            <div className='p-d-stat-container'>
                                {isLoadingData ? (
                                    <LoadingData />
                                ) : (
                                    <>
                                        <p>HP</p>
                                        <div className='p-d-stat-bar'>
                                            <div className='p-d-stat-bar-filled' style={{ width: `${barWidthFixed(pokemonDetails.stats?.[0].base_stat, 255)}%` }}>
                                                <p>{`${pokemonDetails.stats?.[0].base_stat} / 255`}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className='p-d-stat-container'>
                                {isLoadingData ? (
                                    <LoadingData />
                                ) : (
                                    <>
                                        <p>Ataque</p>
                                        <div className='p-d-stat-bar'>
                                            <div className='p-d-stat-bar-filled' style={{ width: `${barWidthFixed(pokemonDetails.stats?.[1].base_stat, 190)}%` }}>
                                                <p>{`${pokemonDetails.stats?.[1].base_stat} / 190`}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className='p-d-stat-container'>
                                {isLoadingData ? (
                                    <LoadingData />
                                ) : (
                                    <>
                                         <p>Defesa</p>
                                        <div className='p-d-stat-bar'>
                                            <div className='p-d-stat-bar-filled' style={{ width: `${barWidthFixed(pokemonDetails.stats?.[2].base_stat, 230)}%` }}>
                                                <p>{`${pokemonDetails.stats?.[2].base_stat} / 230`}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className='p-d-stat-container'>
                                {isLoadingData ? (
                                    <LoadingData />
                                ) : (
                                    <>
                                        <p>Velocidade</p>
                                        <div className='p-d-stat-bar'>
                                            <div className='p-d-stat-bar-filled' style={{ width: `${barWidthFixed(pokemonDetails.stats?.[5].base_stat, 180)}%` }}>
                                                <p>{`${pokemonDetails.stats?.[5].base_stat} / 180`}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className='p-d-stat-container'>
                                {isLoadingData ? (
                                    <LoadingData />
                                ) : (
                                    <>
                                        <p>SP/Ataque</p>
                                        <div className='p-d-stat-bar'>
                                            <div className='p-d-stat-bar-filled' style={{ width: `${barWidthFixed(pokemonDetails.stats?.[3].base_stat, 180)}%` }}>
                                                <p>{`${pokemonDetails.stats?.[3].base_stat} / 180`}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className='p-d-stat-container'>
                                {isLoadingData ? (
                                    <LoadingData />
                                ) : (
                                    <>
                                        <p>SP/Defesa</p>
                                        <div className='p-d-stat-bar'>
                                            <div className='p-d-stat-bar-filled' style={{ width: `${barWidthFixed(pokemonDetails.stats?.[4].base_stat, 194)}%` }}>
                                                <p>{`${pokemonDetails.stats?.[4].base_stat} / 194`}</p>
                                            </div>
                                        </div>
                                    </>
                                )}  </div>
                                </div>
                              </div>
                            </div>
                            <div className="p-d-moves-card">
                              <div className="p-d-moves-container">
                                <div className="p-d-moves-title">
                                  {isLoadingData ? (<LoadingData />) :
                                    (<p><b>Movimentos</b></p>)
                                  }
                                </div>
                                {isLoadingData ?
                                  (
                                    <ul className='p-d-moves-ul ul-loading'>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                      <li><LoadingData /></li>
                                    </ul>
                                  )
                                  :
                                  (
                                    <ul className='p-d-moves-ul'>
                                      {moves.map(move => (
                                        <li key={move.move.name}>
                                          <p>{(move.move.name)[0].toUpperCase()+(move.move.name).substring(1).replace('-', ' ')}</p>
                                        </li>
                                      ))}
                                    </ul>
                                  )
                                }
                              </div>
                            </div>
                          </div>
                          <div className="pokedex__footer">
                          <ul className="footer__social-media">
                          <li><a className="footer__link" href="https://www.linkedin.com/in/samuel-ara%C3%BAjo-733a54241" target='_blank'> <i className='bx bxl-linkedin'></i> @Samuel Lopes</a>
                          </li>
                          <br></br>
                          <li>
                          <a className="footer__link" href="https://github.com/lopppes" target='_blank'>
                          <i className='bx bxl-github'></i> @lopppes</a>
                 
                         </li>
                         </ul>
                            
                          </div>
                        </div>
                      );
                    };
                    
export default PokemonDetailed;