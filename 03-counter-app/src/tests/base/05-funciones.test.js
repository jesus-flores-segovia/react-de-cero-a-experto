import { getUser, getUsuarioActivo } from "../../base/05-funciones";
import "@testing-library/jest-dom";

describe("Tests inside file 05-funciones.test.js", () =>{

    test("'getUser' function must return an object", () =>{

        const userTest = {
            uid: 'ABC123',
            username: 'El_Papi1502'
        };

        const user = getUser();

        expect(user).toEqual(userTest);
    });

    test("'getUsuarioActivo' function must return an object", () =>{

        const userTest = {
            uid: 'ABC567',
            username: 'jesus'
        };

        const user = getUsuarioActivo("jesus");

        expect(user).toEqual(userTest);
    });
});