import "@testing-library/jest-dom";
import { getHeroeById, getHeroesByOwner } from "../../base/08-imp-exp";
import { owners, heroes } from "../../data/heroes";

describe("Tests inside file 08-imp-exp.test.js", () =>{

    test("'getHeroeById' function must return '{ id: 1, name: 'Batman', owner: 'DC'}'", () =>{

        const heroeToTest = {
            id: 1,
            name: 'Batman',
            owner: 'DC'
        };
        console.log("heroeToTest", heroeToTest);

        const heroe = getHeroeById(1);
        console.log("heroe", heroe);

        expect(heroe).toEqual(heroeToTest);
        
    });

    test("'getHeroeById' function must return undefined if didn't match any heroe", () =>{

        const heroe = getHeroeById(15);
        console.log("heroe", heroe);

        expect(heroe).toBe(undefined);
        
    });

    test("'getHeroesByOwner' function must return an array with DC heroes", () =>{
        
        const heroesToTest = [
            {
                id: 1,
                name: 'Batman',
                owner: 'DC'
            },
            {
                id: 3,
                name: 'Superman',
                owner: 'DC'
            },
            {
                id: 4,
                name: 'Flash',
                owner: 'DC'
            },
        ];
        console.log(heroesToTest);

        const heroes = getHeroesByOwner(owners[0]);
        console.log(heroes);

        expect(heroes).toEqual(heroesToTest);
    });

    test("'getHeroesByOwner' function must return an array length value equal to Marvel heroes array", () =>{

        const heroesToTest = [
            {
                id: 2,
                name: 'Spiderman',
                owner: 'Marvel'
            },
            {
                id: 5,
                name: 'Wolverine',
                owner: 'Marvel'
            },
        ];
        console.log(heroesToTest.length);
        
        const heroes = getHeroesByOwner(owners[1]);
        console.log(heroes.length);

        expect(heroes.length).toBe(2);
    });

});