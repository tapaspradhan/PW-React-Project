import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
function PokemonDetails() {
    const {id}=useParams();
    const [pokemon, setPokemon]=useState({})
    async function dowonloadPokemons(){
        const response = await axios.get(`http://localhost:5173/pokemon/${id}`)
        setPokemon({
            name:response.data.name,
            image:response.data.sprites.other.dream_world.front_default,
            weight:response.data.weight,
            height:response.data.height,
            types:response.data.type.map((t)=>t.type.name)
        });
    }

    useEffect(()=>{
        dowonloadPokemons();
    }, [])
  return (
    <div className='pokemon-details-wrapper'>
        <div className='pokemon-details-name'>Name:{pokemon.name}</div>
        <img className="pokemon-details-image" src={pokemon.image}/>
        <div>Height:{pokemon.height}</div>
        <div>Weight:{pokemon.weight}</div>
        <div className="pokemon-details-type">
            {pokemon.types && pokemon.type.map((t)=> <div key={t}> {t} </div>)}
        </div>
    </div>
  )
}

export default PokemonDetails