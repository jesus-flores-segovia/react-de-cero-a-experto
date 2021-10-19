import { heroes } from "../data/heroes";

export const getHeroById = (id) => {
    
    if(heroes.filter(hero => hero.id === id).length === 0){
        return;
    }

    return heroes.filter(hero => hero.id === id)[0];
}
