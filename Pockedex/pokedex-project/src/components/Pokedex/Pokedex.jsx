import React from 'react'
import Search from '../Search/Search'
// CSS Import
import "./Pokedex.css"
import PokemonList from '../PokemonList/PokemonList'

function Pokedex() {
  return (
    <div className='pokedex-wrapper'>
        <Search/>
        <PokemonList/>
    </div>
  )
}

export default Pokedex