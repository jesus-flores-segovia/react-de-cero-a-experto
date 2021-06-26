// Import, export y funciones comunes para arrays
import heroes, {owners} from "../data/heroes";

console.log(heroes);

// Uso de la function find, que nos devuelve un object que cumple la condición definida
// dentro de la función de callback
export const getHeroeById = (id) => heroes.find(({id:id2}) => id === id2);

console.log(getHeroeById(4));

// Uso de la function filter, que nos devuelve un array que cumple con la condición definida
// dentro de la función de callback
export const getHeroesByOwner = (owner) => heroes.filter(({owner:owner2}) => owner === owner2);

console.log(getHeroesByOwner("DC"));

console.log(owners);