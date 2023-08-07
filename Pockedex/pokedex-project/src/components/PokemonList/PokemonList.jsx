import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./PokemonList.css";
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {

    const [pokemonList,setPokemonList]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const [pokedexUlr,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon/')

    const [nextUrl,setNextUrl]=useState("")
    const [prevUrl,setPrevUrl]=useState("")

    async function downloadpockmons(){
        setIsLoading(true)
        const response=await axios.get(pokedexUlr) //This downloads 20 pokemon list

        const pokemonResults = response.data.results; // we get the array of pokemon from result

        console.log(response.data);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
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
    },[pokedexUlr])
    return (
        <>
            <div className='pokemon-list-wrapper'>
                <div className='pokemon-wrapper'>
                    {(isLoading)?'Loading....':
                        pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)
                    }
                </div>
                <div className='controls'>
                    <button disabled={prevUrl==null} onClick={()=>{setPokedexUrl(prevUrl)}}>Prev</button>
                    <button disabled={nextUrl==null} onClick={()=>{setPokedexUrl(nextUrl)}}>Next</button>
                </div>
            </div>
        </>
    )
}

export default PokemonList