let offset = 0;

let url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=`

const image = document.getElementById("pokemon-image-id")
const attack = document.getElementById("attack")
const spAttack = document.getElementById("sp-attack")
const defense = document.getElementById("defense")
const spDefense = document.getElementById("sp-defense")
const hp = document.getElementById("hp")
const weight = document.getElementById("weight")
const height = document.getElementById("height")
let div

let capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

const pokemonContainer = document.getElementById("#pokemon-container-id")

function getPokemon(){
  fetch(url)
    .then((res) => res.json())
    .then((data) => showPokemon(data))
}

async function showPokemon(pokemon){

  for(let index = 0; index < 20; index++){
    let pokemonInfo = await (await fetch(pokemon.results[index].url)).json()
    console.log(pokemon.results[index].url)

    let pokemonName = capitalize(pokemonInfo.name)
    let pokemonID = pokemonInfo.id
    let pokemonImage = pokemonInfo.sprites.front_default
    let pokemonAttack = pokemonInfo.stats[1].base_stat
    let pokemonSpAttack = pokemonInfo.stats[3].base_stat
    let pokemonDefense = pokemonInfo.stats[2].base_stat
    let pokemonSpDefense = pokemonInfo.stats[4].base_stat
    let pokemonHP = pokemonInfo.stats[0].base_stat
    let pokemonWeight = pokemonInfo.weight
    let pokemonHeight = pokemonInfo.height

    //TODO: let pokemonTypes = pokemonInfo.types

    div = document.createElement("div")
    div.classList.add("pokemon-card")

    div.addEventListener('click', function()
    {image.innerHTML = 
    `
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png" alt="${pokemonName}">`

    attack.innerText = `Attack: ${pokemonAttack}`
    spAttack.innerText = `Special Attack: ${pokemonSpAttack}`
    defense.innerText = `Defense: ${pokemonDefense}`
    spDefense.innerText = `Special Defense: ${pokemonSpDefense}`
    hp.innerText = `HP: ${pokemonHP}`
    weight.innerText = `Weight: ${pokemonWeight} hg`
    height.innerText = `Height: ${pokemonHeight} dm`
    })

    div.innerHTML = `
    
        <div class="pokemon-image">
        <img src=${pokemonImage} alt="${pokemonName}">
        </div>

        <div class="pokemon-info">
            <h2 class="pokemon-name">${pokemonName}</h2>
            <div class="pokemon-types">
                <ul id="pokemon-types-list">

                </ul>
            </div>
            <p class="pokemon-id">#${pokemonID}</p>
        </div>`
    pokemonContainer.append(div)
  }
    // console.log(`index = ${index}`)
}

getPokemon()

const next = document.getElementById("next")
next.addEventListener("click", function (){ 
    offset += 20
    console.log(offset)
    url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=${offset}`
    getPokemon()
    pokemonContainer.innerHTML = ``
})

const previous = document.getElementById("previous")
previous.addEventListener("click", function (){ 
  offset -= 20

  if (offset < 0){
    offset = 0
  }

  console.log(offset)
  url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=${offset}`
  getPokemon()
  pokemonContainer.innerHTML = ``
})