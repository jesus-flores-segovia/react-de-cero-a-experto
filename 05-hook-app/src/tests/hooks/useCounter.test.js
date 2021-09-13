import {renderHook} from "@testing-library/react-hooks";
import {useCounter} from "../../hooks/useCounter";

describe("Tests inside file useCounter.test.js", () => {

    test("'useCounter' hook must return a default values", () => {
        const {result} = renderHook(() => useCounter());

        expect(result.current.counter).toBe(10);
        expect(typeof result.current.increment).toBe("function");
        expect(typeof result.current.decrement).toBe("function");
        expect(typeof result.current.reset).toBe("function");
    });

});