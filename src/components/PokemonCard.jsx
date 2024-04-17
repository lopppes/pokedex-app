import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingData from './LoadingData';
import pokeball_placeholder from '../images/pokeball_placeholder.png';

const PokemonCard = ({ pokemon }) => {
    
    const getGradient = (type1, type2) => {
        const gradients = {
            normal: 'linear-gradient(to right, #a8a878, #c0c08c)',
            fighting: 'background: linear-gradient(220.55deg, #FF0000 0%, #470000 100%);',
            flying: 'linear-gradient(to right, #57a7dd, #a8a878)',
            poison: 'linear-gradient(to right, #754db0, #b05da0)',
            ground: 'linear-gradient(to right, #d7bc4d, #c9a550)',
            rock: 'linear-gradient(to right, #b8a038, #c0b870)',
            bug: 'linear-gradient(to right, #a8b820, #a0b030)',
            ghost: 'linear-gradient(to right, #705898, #a890f0)',
            steel: 'linear-gradient(to right, #b8b8d0, #c8c8d0)',
            fire: 'linear-gradient(220.55deg, #a67005 0%, #E20000 100%)',
            water: 'linear-gradient(to right, #6890f0, #78a0d0)',
            grass: 'linear-gradient(220.55deg, #61C695 0%, #102e16 100%)',
            electric: 'linear-gradient(to right, #f8d030, #cfa211)',
            psychic: 'linear-gradient(to right, #f85888, #fc8)',
            ice: 'linear-gradient(to right, #98d8d8, #b8f)',
            dragon: 'linear-gradient(to right, #7038f8, #78f)',
            dark: 'linear-gradient(to right, #705848, #8b8)',
            fairy: 'linear-gradient(to right, #ee99ac, #ee9)',
        };

        return gradients[type1] || gradients[type2] || gradients.normal;
    };

    const [pokemonData, setPokemonData] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoadingData(true);
        axios.get(pokemon)
            .then(res => setPokemonData(res.data))
            .finally(() => setIsLoadingData(false));
    }, [pokemon]);

    const setColor = () => {
        const type1 = pokemonData.types?.[0]?.type?.name;
        const type2 = pokemonData.types?.[1]?.type?.name;
        return getGradient(type1, type2);
    };

    const setSecondColor = () => {
        const type1 = pokemonData.types?.[0]?.type?.name;
        const type2 = pokemonData.types?.[1]?.type?.name;
        return getGradient(type1, type2);
    };

    const pokemonName = pokemonData.name?.[0].toUpperCase() + pokemonData.name?.substring(1);
    const firstType = pokemonData.types?.[0]?.type?.name;
    const secondType = pokemonData.types?.[1]?.type?.name;
    const firstTypeFixed = firstType?.toUpperCase();
    const secondTypeFixed = secondType?.toUpperCase();

    return (
        <div onClick={() => navigate(`/pokedex/${pokemonData.id}`)}>
            <li className="pokemon-card" style={{ background: setColor() }}>
                <div className="p-c-bg"></div>
                <img src={pokemonData.sprites?.front_default || pokeball_placeholder} alt={pokemonName} />
                <div className="card-details">
                    <div className="p-name">
                        {isLoadingData ? (
                            <LoadingData />
                        ) : (
                            <h3>---<b>{pokemonName}</b>---</h3>
                        )}
                    </div>
                    <div className="t-details">
                        {isLoadingData ? (
                            <LoadingData />
                        ) : (
                             <p>{pokemonData.types?.[1] ? <><span className='p-d-type-details'>{firstTypeFixed}</span> <span className='p-d-type-details'>{secondTypeFixed}</span></> : <span className='p-d-type-details'>{firstTypeFixed}</span>}</p>
                        )}
                    </div>
                    <div className="f-details">
                        {isLoadingData ? (
                            <LoadingData />
                        ) : (
                            <>
                             <div>
                                    <p>
                                        <b>HP</b>: {pokemonData.stats?.[0].base_stat} 
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <b>Ataque</b>: {pokemonData.stats?.[1].base_stat}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <b>Defesa</b>: {pokemonData.stats?.[2].base_stat}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </li>
        </div>
    );
};

export default PokemonCard;
