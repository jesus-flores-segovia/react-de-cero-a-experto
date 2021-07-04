import { getSaludo } from "../../base/02-template-string";
import "@testing-library/jest-dom";

describe("Tests inside file 02-template-string.test.js", () =>{
    test("'getSaludo' function must return 'Hello Jesús Flores'", () =>{

        const nombre   = 'Jesús';
        const apellido = 'Flores';
        const nombreCompleto = `${ nombre } ${ apellido }`;

        const saludo = getSaludo(nombreCompleto);

        expect(saludo).toBe(`Hola ${nombreCompleto}`)

    });

    test("'getSaludo' function must return 'Hello Fernando Herrera' if we aren't introducing any function parameter value", () =>{

        const nombre   = 'Fernando';
        const apellido = 'Herrera';
        const nombreCompleto = `${ nombre } ${ apellido }`;

        const saludo = getSaludo();

        expect(saludo).toBe(`Hola ${nombreCompleto}`)

    });
});