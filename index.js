const pokedexExample=document.getElementById('pokedexExample');
const pokedex = document.getElementById('pokedex');



const fetchPokemon = (genSelector,typeStr) => {
	const genBtn=document.getElementById("genBtn")
    let typeBtn=document.getElementById("typeBtn")
    let start=1;
    let end=1025;
    console.log(genSelector+typeStr+ "fetchmethod")
    //switch checks the gen selected and provides the numbers associated with the gen
    //these are then run through and displayed, type is checked below as well
    //anytime a new gen is selected, reset to all since we do all pokemon in gen
    switch(genSelector){
        case "all":
            genBtn.textContent="All Gens"
            typeBtn.textContent="All"
            start=1
            end=1025
            break;
        case "1":
            genBtn.textContent="Gen 1"
            typeBtn.textContent="All"
            start=1
            end=151
            break;
        case "2":
            genBtn.textContent="Gen 2"
            typeBtn.textContent="All"
            start=152
            end=251
            break;
        case "3":
            genBtn.textContent="Gen 3"
            typeBtn.textContent="All"
            start=252
            end=386
            break;
        case "4":
            genBtn.textContent="Gen 4"
            typeBtn.textContent="All"
            start=387
            end=493
            break;
        case "5":
            genBtn.textContent="Gen 5"
            typeBtn.textContent="All"
            start=494
            end=649
            break;
        case "6":
            genBtn.textContent="Gen 6"
            typeBtn.textContent="All"
            start=650
            end=721
            break;
        case "7":
            genBtn.textContent="Gen 7"
            typeBtn.textContent="All"
            start=722
            end=809
            break;
        case "8":
            genBtn.textContent="Gen 8"
            typeBtn.textContent="All"
            start=810
            end=905
            break;
        case "9":
            genBtn.textContent="Gen 9"
            typeBtn.textContent="All"
            start=906
            end=1025
            break;
    }
	const pokemonByType= [];
    const promises = [];
    const promiseUrls=[];
    for (let i = start; i <= end; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
        promiseUrls.push(url);
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id,
            hp:result.stats[0].base_stat,
            atk:result.stats[1].base_stat,
            def:result.stats[2].base_stat,
            spd:result.stats[5].base_stat,
            weight: result.weight,
            height: result.height
        }));
		//this returns an arry of pokemon so to filter out the types we must iterate through it
        //or maybe iterate through pokemon array and remove 
        console.log("this is the typestr "+typeStr)
        if(typeStr!=="all"){
            console.log("this is the typestr not all "+typeStr)
            for(let i=0;i<results.length;i++){
                for(let j=0;j<results[i].types.length;j++){//this to iterate thorugh types
                    if(results[i].types[j].type.name==typeStr){//if primary or secondary containst the type. add it to list
                        console.log(results[i].name)
                        console.log(results[i].types[j].type.name)
                        const typePokemon={
                            name:results[i].name,
                            image: results[i].sprites[`front_default`],
                            type: results[i].types.map((type) => type.type.name).join(', '),
                            id: results[i].id,
                            hp:results[i].stats[0].base_stat,
                            atk:results[i].stats[1].base_stat,
                            def:results[i].stats[2].base_stat,
                            spd:results[i].stats[5].base_stat,
                            weight: results[i].weight,
                            height: results[i].height
                        };
                        pokemonByType.push(typePokemon)
                        
                    }
                }
                
            }
            displayPokemon(pokemonByType);
        }
        else if(typeStr==="all"){
            displayPokemon(pokemon);
        }
    });
};

const displayPokemon = (pokemon) => {
   
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
            <li class="myCard">
            <div class="statsImagePopover">
                <img class="myCard-image" src="${pokeman.image}"/>
                <div class="stats">
                <div style="display:flex;justify-content: space-around;">
                <p class="hp">HP ${pokeman.hp}</p>
                <p class="atk">ATK ${pokeman.atk}</p>
                </div>
                <div style="display:flex;justify-content: space-around;">
                <p class="def">DEF ${pokeman.def}</p>
                <p class="spd">SPD ${pokeman.spd}</p>
                </div>
    
                <img src="icons/height.svg" alt="height icon" style="position:relative;bottom:7px;">
                <p>Height ${pokeman.height/10}m</p>
                
    
                <img src="icons/weight.svg" alt="weight icon">
                <p>Weight ${pokeman.weight/10}kg</p>
                </div>
            </div>
            <h2 class="myCard-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="myCard-subtitle">Type: ${pokeman.type}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

//if gen was not picked, error is thrown.
//else the current gen is picked again and passed the type to filter
const fetchType= (typeString) =>{
	const generation=document.getElementById("genBtn")
    let typeBtn=document.getElementById("typeBtn")
	if(generation.textContent=="Pokemon Generations"){
		alert("Please Select Pokemon Generation First. To sort by type you must have pokemon selected in your pokedex.");
		return;
	}
    else{
        switch(generation.textContent){
            case "All Gens":
                fetchPokemon("all",typeString)
                typeBtn.textContent=typeString.charAt(0).toUpperCase()+typeString.slice(1);
                return
            case "Gen 1":
                fetchPokemon("1",typeString)
                typeBtn.textContent=typeString.charAt(0).toUpperCase()+typeString.slice(1);
                return
            case "Gen 2":
                fetchPokemon("2",typeString)
                typeBtn.textContent=typeString.charAt(0).toUpperCase()+typeString.slice(1);
                return
            case "Gen 3":
                fetchPokemon("3",typeString)
                typeBtn.textContent=typeString.charAt(0).toUpperCase()+typeString.slice(1);
                return
            case "Gen 4":
                fetchPokemon("4",typeString)
                typeBtn.textContent=typeString.charAt(0).toUpperCase()+typeString.slice(1);
                return
            case "Gen 5":
                fetchPokemon("5",typeString)
                typeBtn.textContent=typeString.charAt(0).toUpperCase()+typeString.slice(1);
                return
            case "Gen 6":
                fetchPokemon("6",typeString)
                typeBtn.textContent=typeString.charAt(0).toUpperCase()+typeString.slice(1);
                return
            case "Gen 7":
                fetchPokemon("7",typeString)
                typeBtn.textContent=typeString.charAt(0).toUpperCase()+typeString.slice(1);
                return
            case "Gen 8":
                fetchPokemon("8",typeString)
                typeBtn.textContent=typeString.charAt(0).toUpperCase()+typeString.slice(1);
                return
            case "Gen 9":
                fetchPokemon("9",typeString)
                typeBtn.textContent=typeString.charAt(0).toUpperCase()+typeString.slice(1);
                return
        }
    }
}
const fetchExample= ()=>{
    console.log("hey examples")
    let promises = [];
    const url1 = "https://pokeapi.co/api/v2/pokemon/35";
    const url2 = "https://pokeapi.co/api/v2/pokemon/36";
    const url3 = "https://pokeapi.co/api/v2/pokemon/39";
    const url4 = "https://pokeapi.co/api/v2/pokemon/40";
    const url5 = "https://pokeapi.co/api/v2/pokemon/122";
    promises.push(fetch(url1).then((res) => res.json()));
    promises.push(fetch(url2).then((res) => res.json()));
    promises.push(fetch(url3).then((res) => res.json()));
    promises.push(fetch(url4).then((res) => res.json()));
    promises.push(fetch(url5).then((res) => res.json()));
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id,
            hp:result.stats[0].base_stat,
            atk:result.stats[1].base_stat,
            def:result.stats[2].base_stat,
            spd:result.stats[5].base_stat,
            weight: result.weight,
            height: result.height

        }));
    const pokemonHTMLString = pokemon
    .map(
        (pokeman) =>`
    <li class="myCard">
        <div class="statsImagePopover">
            <img class="myCard-image" src="${pokeman.image}"/>
            <div class="stats">
            <div style="display:flex;justify-content: space-around;">
            <p class="hp">HP ${pokeman.hp}</p>
            <p class="atk">ATK ${pokeman.atk}</p>
            </div>
            <div style="display:flex;justify-content: space-around;">
            <p class="def">DEF ${pokeman.def}</p>
            <p class="spd">SPD ${pokeman.spd}</p>
            </div>

            <img src="icons/height.svg" alt="height icon" style="position:relative;bottom:7px;">
            <p>Height ${pokeman.height/10}m</p>
            

            <img src="icons/weight.svg" alt="weight icon">
            <p>Weight ${pokeman.weight/10}kg</p>
            </div>
        </div>
        <h2 class="myCard-title">${pokeman.id}. ${pokeman.name}</h2>
        <p class="myCard-subtitle">Type: ${pokeman.type}</p>
    </li>
`
    )
    .join('');
    pokedexExample.innerHTML = pokemonHTMLString;
    });
   
}

const fetchSearchPokemon=(pokemonName)=>{
    let generation=document.getElementById("genBtn")
    let typeBtn=document.getElementById("typeBtn")
    generation.textContent="Pokemon Generations"
    typeBtn.textContent="Pokemon Type"
    let promises=[]
    let lowerPokemonName=pokemonName.toLowerCase();
    console.log(pokemonName)
    let url=`https://pokeapi.co/api/v2/pokemon/${lowerPokemonName}`
    promises.push(fetch(url).then((res)=> res.json()));
    console.log("promise pushed")
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id,
            hp:result.stats[0].base_stat,
            atk:result.stats[1].base_stat,
            def:result.stats[2].base_stat,
            spd:result.stats[5].base_stat,
            weight: result.weight,
            height: result.height
        }));
    const pokemonHTMLString = pokemon
    .map(
        (pokeman) =>`
        <li class="myCard">
        <div class="statsImagePopover">
            <img class="myCard-image" src="${pokeman.image}"/>
            <div class="stats">
            <div style="display:flex;justify-content: space-around;">
            <p class="hp">HP ${pokeman.hp}</p>
            <p class="atk">ATK ${pokeman.atk}</p>
            </div>
            <div style="display:flex;justify-content: space-around;">
            <p class="def">DEF ${pokeman.def}</p>
            <p class="spd">SPD ${pokeman.spd}</p>
            </div>

            <img src="icons/height.svg" alt="height icon" style="position:relative;bottom:7px;">
            <p>Height ${pokeman.height/10}m</p>
            

            <img src="icons/weight.svg" alt="weight icon">
            <p>Weight ${pokeman.weight/10}kg</p>
            </div>
        </div>
        <h2 class="myCard-title">${pokeman.id}. ${pokeman.name}</h2>
        <p class="myCard-subtitle">Type: ${pokeman.type}</p>
    </li>
`
    )
    .join('');
    pokedex.innerHTML = pokemonHTMLString;
    });
    
    

}

fetchExample();



const pokemonSearchBtn= document.getElementById("pokemonSearchBtn")
pokemonSearchBtn.onclick=function(){
    let searchPhrase=document.getElementById("pokeSearch");
    console.log(searchPhrase.value)
    fetchSearchPokemon(searchPhrase.value)
};
const allGenButton = document.getElementById("allGenButton")
allGenButton.onclick=()=>fetchPokemon("all","all")

const gen1Button = document.getElementById("gen1Button")
gen1Button.onclick=()=>fetchPokemon("1","all")

const gen2Button = document.getElementById("gen2Button")
gen2Button.onclick=()=>fetchPokemon("2","all")

const gen3Button = document.getElementById("gen3Button")
gen3Button.onclick=()=>fetchPokemon("3","all")

const gen4Button = document.getElementById("gen4Button")
gen4Button.onclick=()=>fetchPokemon("4","all")

const gen5Button = document.getElementById("gen5Button")
gen5Button.onclick=()=>fetchPokemon("5","all")

const gen6Button = document.getElementById("gen6Button")
gen6Button.onclick=()=>fetchPokemon("6","all")

const gen7Button = document.getElementById("gen7Button")
gen7Button.onclick=()=>fetchPokemon("7","all")

const gen8Button = document.getElementById("gen8Button")
gen8Button.onclick=()=>fetchPokemon("8","all")

const gen9Button = document.getElementById("gen9Button")
gen9Button.onclick=()=>fetchPokemon("9","all")

//Types selectors will pass in their type to fetchType function


const allPokeTypes = document.getElementById("allTypes")
allPokeTypes.onclick=()=> fetchType("all")

const bugType=document.getElementById("bugType")
bugType.onclick=()=>fetchType("bug")

const darkType=document.getElementById("darkType")
darkType.onclick=()=>fetchType("dark")

const dragonType=document.getElementById("dragonType")
dragonType.onclick=()=>fetchType("dragon")

const electricType=document.getElementById("electricType")
electricType.onclick=()=>fetchType("electric")

const fairyType=document.getElementById("fairyType")
fairyType.onclick=()=>fetchType("fairy")

const fightingType=document.getElementById("fightingType")
fightingType.onclick=()=>fetchType("fighting")

const fireType=  document.getElementById("fireType")
fireType.onclick=()=>fetchType("fire")

const flyingType=  document.getElementById("flyingType")
flyingType.onclick=()=>fetchType("flying")

const ghostType=  document.getElementById("ghostType")
ghostType.onclick=()=>fetchType("ghost")

const grassType=  document.getElementById("grassType")
grassType.onclick=()=>fetchType("grass")

const groundType=  document.getElementById("groundType")
groundType.onclick=()=>fetchType("ground")

const iceType=  document.getElementById("iceType")
iceType.onclick=()=>fetchType("ice")

const normalType=  document.getElementById("normalType")
normalType.onclick=()=>fetchType("normal")

const poisonType=  document.getElementById("poisonType")
poisonType.onclick=()=>fetchType("poison")

const psychicType=  document.getElementById("psychicType")
psychicType.onclick=()=>fetchType("psychic")

const rockType=  document.getElementById("rockType")
rockType.onclick=()=>fetchType("rock")

const steelType=  document.getElementById("steelType")
steelType.onclick=()=>fetchType("steel")

const waterType=  document.getElementById("waterType")
waterType.onclick=()=>fetchType("water")


