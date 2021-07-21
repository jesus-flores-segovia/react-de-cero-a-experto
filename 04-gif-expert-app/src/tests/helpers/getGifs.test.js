import { getGifs } from "../../helpers/getGifs";

describe("Tests inside file getGifs.test.js", () => {

    test("'getGifs' function must return ten elements from request sent to Giphy API", async () => {

        const category = "Harry Potter";
        const gifs = await getGifs(category);

        expect(gifs.length).toBe(10);
    });

    test("'getGifs' function must return an empty array from request sent to Giphy API, when we do not send any category", async () => {

        const category = "";
        const gifs = await getGifs(category);

        expect(gifs.length).toBe(0);
    });
});