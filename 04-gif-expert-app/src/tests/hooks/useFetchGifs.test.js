import "@testing-library/jest-dom";
import { useFetchGifs } from "../../hooks/useFetchGifs";
import { renderHook } from "@testing-library/react-hooks";

describe("Tests inside file useFetchGifs.test.js", () => {

    test("'useFetchGifs' custom hook must return his initial state", async() => {
        const {result, waitForNextUpdate} = renderHook(() => useFetchGifs(""));
        const {data, loading} = result.current;

        expect(data).toEqual([]);
        expect(loading).toBe(true);

        await waitForNextUpdate({timeout: 3500});
    });

    test("'useFetchGifs' custom hook must return a list of images", async() => {
        const {result, waitForNextUpdate} = renderHook(() => useFetchGifs("One Punch"));
        await waitForNextUpdate({timeout: 3500});
        const {data, loading} = result.current;

        expect(data.length).toEqual(10);
        expect(loading).toBe(false);
    });
});