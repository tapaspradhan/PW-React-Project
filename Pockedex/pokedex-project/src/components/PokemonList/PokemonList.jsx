import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./PokemonList.css";
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {

    const [pokemonList,setPokemonList]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const POKEDEX_URL='https://pokeapi.co/api/v2/pokemon/'

    async function downloadpockmons(){
        const response=await axios.get(POKEDEX_URL) //This downloads 20 pokemon list

        const pokemonResults = response.data.results; // we get the array of pokemon from result

        // console.log(response.data);
        // itrating over the array of pokemons, and using their url, to create of promises
        // that will downloads those 20 pokemons
        const pockmonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
        // passing that promises array to axios.all
        const pokemonData = await axios.all(pockmonResultPromise); //array of 20 pokemon details data
        console.log(pokemonData);
        // now itrate on the data of each pokemon data, and extrate id,name,image,type
        const pokeListResult=pokemonData.map((pokeData)=>{
            const pokemon=pokeData.data;
            return {
                id:pokemon.id,
                name:pokemon.name,
                image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types:pokemon.types
            }
        })
        console.log(pokeListResult);
        setPokemonList(pokeListResult);
        setIsLoading(false)
    }


    useEffect(()=>{
        downloadpockmons();
    },[])
    return (
        <>
            <div className='pokemon-list-wrapper'>
                <div className='pokemon-wrapper'>
                    {(isLoading)?'Loading....':
                        pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id}/>)
                    }
                </div>
            </div>
        </>
    )
}

export default PokemonList