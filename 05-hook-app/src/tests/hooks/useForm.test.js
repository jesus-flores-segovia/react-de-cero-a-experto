import {act, renderHook} from "@testing-library/react-hooks";
import {useForm} from "../../hooks/useForm";

describe("Tests inside file useForm.test.js", () => {

    const initialForm = {
        name: "Jesús",
        email: "jesus@gmail.com"
    };

    test("'useForm' hook must return a default form values passed by parameter", () => {
        const {result} = renderHook(() => useForm(initialForm));
        const [values, handleInputChange, reset] = result.current.values();

        expect(values).toEqual(initialForm);
        expect(typeof handleInputChange).toBe("function");
        expect(typeof reset).toBe("function");
    });

    test("'useForm' handleInputChange function must change the form value", () => {
        const {result} = renderHook(() => useForm(initialForm));
        const [ , handleInputChange] = result.current;

        act(() => {
            handleInputChange({
                target: {
                    name: "name",
                    value: "Andrea"
                }
            });
        });

        const [ values ] = result.current;
        expect(values.name).toBe("Andrea");
    });

    test("'useForm' reset function must restablish the form values", () => {
        const {result} = renderHook(() => useForm(initialForm));
        const [ , handleInputChange, reset] = result.current;

        act(() => {
            handleInputChange({
                target: {
                    name: "name",
                    value: "Andrea"
                }
            });

            reset();
        });
        
        const [ values ] = result.current;
        expect(values.name).toBe("Jesús");
    });
});