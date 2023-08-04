import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./PokemonList.css";

function PokemonList() {

    const [pokemonList,setPokemonList]=useState([])
    const [isLoading,setIsLoading]=useState(true)

    async function downloadpockmons(){
        const response=await axios.get('https://pokeapi.co/api/v2/pokemon/')
        const pokemonResults = response.data.results;
        const pockmonResultPromise = pokemonResults.map((pokemon) => {axios.get(pokemon.url)})
        const pokemonData = await axios.all(pockmonResultPromise)
        const res=PokemonList(pokemonData.map((pokeData)=>{
            const pokemon=pokeData.data;
            return {
                name:pokemon.name,
                image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types:pokemon.types
            }
        }))
        console.log(res);
        setPokemonList(res);
        setIsLoading(false)
    }

    // const [x,setX]=useState(0);
    // const [y,setY]=useState(0);

    useEffect(()=>{
        downloadpockmons();
    },[])
    return (
        <>
            <div className='pokemon-list-wrapper'>
                <div>Pokemon List</div>
                {(isLoading)?'Loading....':"Data downloded"}
            </div>




            {/* <div>
                X:{x}<button onClick={()=>{setX(x+1)}}>Inc</button>
            </div>
            <div>
                Y:{y}<button onClick={()=>{setY(y+1)}}>Inc</button>
            </div> */}
        </>
    )
}

export default PokemonList