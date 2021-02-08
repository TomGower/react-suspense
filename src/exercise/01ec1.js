// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {PokemonDataView, fetchPokemon, PokemonErrorBoundary} from '../pokemon'

let pokemon
let pokemonError

const pokemonPromise = fetchPokemon('pikachukka')

pokemonPromise.then(data => pokemon = data)
  .catch(error => pokemonError = error) // need this catch as an error handler

function PokemonInfo() {
  // promise results in an error, throw the error
  if (pokemonError) throw pokemonError
  // promise is not resolved, throw the promise
  if (!pokemon) throw pokemonPromise

  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  // wrap entire Suspense component in ErrorBoundary so ErrorBoundary handles the thrown error
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
      <PokemonErrorBoundary>
        <React.Suspense fallback={<div>Loading Pokemon...</div>}>
          <PokemonInfo />
        </React.Suspense>
      </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
