import "@testing-library/jest-dom";
import {getHeroeByIdAsync} from "../../base/09-promesas";
import heroes from "../../data/heroes";

describe("Tests inside file 09-promesas.test.js", () =>{

    test("'getHeroeByIdAsync' function must return a heroe", (done) =>{

        const id = 1;
        
        getHeroeByIdAsync(id)
            .then(heroe => {
                expect(heroe).toBe(heroes[0]);
                done();
            });
    });

    test("'getHeroeByIdAsync' function must not return a heroe", (done) =>{

        const id = 10;
        
        getHeroeByIdAsync(id)
            .catch(error => {
                expect(error).toBe("No se pudo encontrar el héroe");
                done();
            });
    });
});