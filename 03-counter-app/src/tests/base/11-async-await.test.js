import "@testing-library/jest-dom";
import {getImagen} from "../../base/11-async-await";

describe("Tests inside file 11-async-await.test.js", () =>{

    test("'getImagen' function must return an image", async() =>{

        const url = await getImagen();
        console.log(url);

        expect(url.includes("https://")).toBe(true);
    });

    test("'getImagen' function must return an error", async() =>{

        const url = await getImagen();
        console.log(url);

        expect(url).toBe("Image doesn't exist");
    });
});