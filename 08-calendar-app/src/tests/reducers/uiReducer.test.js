import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";

const initState = {
  modalOpen: false,
};

describe("Tests inside file 'uiReducer.test.js'", () => {
  test("Must return the default state", () => {
    const state = uiReducer(initState, {});

    expect(state).toEqual(initState);
  });

  test("Must open and close the modal component", () => {
    const modalOpen = uiOpenModal();
    let state = uiReducer(initState, modalOpen);

    expect(state).toEqual({ modalOpen: true });

    const modalClose = uiCloseModal();
    state = uiReducer(initState, modalClose);

    expect(state).toEqual({ modalOpen: false });
  });
});
