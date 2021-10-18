import { heroes } from "../data/heroes";

export const getHeroeById = (id) => {
    
    if(!heroes.includes(id)){
        throw new Error(`id "${id}" doesn't exists`);
    }

    return heroes.filter(hero => hero.id === id);
}
