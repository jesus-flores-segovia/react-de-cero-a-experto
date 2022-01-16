import { finishLoading, removeError, setError, startLoading } from "../../actions/ui"
import { types } from "../../types/types";

describe("Tests inside file 'ui.test.js'", () => {

    test("All actions must run correctly", () => {
        const setErrorAction = setError("An error has ocurred.");

        expect(setErrorAction).toEqual(
            {
                type: types.uiSetError,
                payload: "An error has ocurred."
            }
        );

        const removeErrorAction = removeError();

        expect(removeErrorAction).toEqual(
            {
                type: types.uiRemoveError            }
        );

        const startLoadingAction = startLoading();

        expect(startLoadingAction).toEqual(
            {
                type: types.uiStartLoading
            }
        );
            
        
        const finishLoadingAction = finishLoading();

        expect(finishLoadingAction).toEqual(
            {
                type: types.uiFinishLoading
            }
        );
    })
})