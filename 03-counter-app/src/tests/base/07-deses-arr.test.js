import "@testing-library/jest-dom";
import { retornaArreglo } from "../../base/07-deses-arr";

describe("Tests inside file 07-deses-arr.test.js", () =>{

    test("'retornaArreglo' function must return correct values", () =>{

        const array = retornaArreglo();
        const [letters, number] = retornaArreglo();

        expect(array).toEqual(["ABC", 123]);

        expect(letters).toBe("ABC");
        expect(typeof letters).toBe("string");
        
        expect(number).toBe(123);
        expect(typeof number).toBe("number");
    });

});