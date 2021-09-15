import {act, renderHook} from "@testing-library/react-hooks";
import {useFetch} from "../../hooks/useFetch";

describe("Tests inside file useFetch.test.js", () => {

    test("'useFetch' hook must return a default state values", () => {
        const url = "https://breakingbadapi.com/api/quotes/1";
        const {result} = renderHook(() => useFetch(url));
        const {data, loading, error} = result.current;

        expect(data).toBe(null);
        expect(loading).toBe(true);
        expect(error).toBe(null);
    });

    test("'useFetch' hook must return the correct data, loading in false and error in false", async () => {
        const url = "https://breakingbadapi.com/api/quotes/1";
        const {result, waitForNextUpdate} = renderHook(() => useFetch(url));

        await waitForNextUpdate({timeout: 5000});
        const {data, loading, error} = result.current;

        expect(data).not.toBeNull();
        expect(loading).toBe(false);
        expect(error).toBe(null);
    });

    test("'useFetch' hook must return an error, loading in false and data in null", async () => {
        const url = "https://bbreakingbadapi.com/api/quotes/1";
        const {result, waitForNextUpdate} = renderHook(() => useFetch(url));

        await waitForNextUpdate({timeout: 5000});
        const {data, loading, error} = result.current;

        expect(data).toBeNull();
        expect(loading).toBe(false);
        expect(error).not.toBeNull();
    });
});