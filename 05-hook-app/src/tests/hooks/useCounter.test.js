import {act, renderHook} from "@testing-library/react-hooks";
import {useCounter} from "../../hooks/useCounter";

describe("Tests inside file useCounter.test.js", () => {

    test("'useCounter' hook must return a default values", () => {
        const {result} = renderHook(() => useCounter());

        expect(result.current.counter).toBe(10);
        expect(typeof result.current.increment).toBe("function");
        expect(typeof result.current.decrement).toBe("function");
        expect(typeof result.current.reset).toBe("function");
    });

    test("'useCounter' increment function must increment the value in one", () => {
        const {result} = renderHook(() => useCounter(100));
        const {increment} = result.current;

        act(() => {
            increment(1);
        });

        expect(result.current.counter).toBe(101);
    });

    test("'useCounter' decrement function must decrement the value in one", () => {
        const {result} = renderHook(() => useCounter(100));
        const {decrement} = result.current;

        act(() => {
            decrement(1);
        });

        expect(result.current.counter).toBe(99);
    });

    test("'useCounter' reset function must reset the state value of hook", () => {
        const {result} = renderHook(() => useCounter(100));
        const {decrement, reset} = result.current;

        act(() => {
            decrement(1);
            reset();
        });

        expect(result.current.counter).toBe(100);
    });

});