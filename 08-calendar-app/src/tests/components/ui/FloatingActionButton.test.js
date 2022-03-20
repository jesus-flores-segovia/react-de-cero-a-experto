import { mount } from "enzyme";
import { FloatingActionButton } from "../../../components/ui/FloatingActionButton";

const deleteEvent = jest.fn();

const wrapper = mount(
  <FloatingActionButton
    className="btn btn-danger fab-danger"
    onClick={deleteEvent}
  >
    <i className="fas fa-trash" />
    <span> Delete event</span>
  </FloatingActionButton>
);

describe("Tests inside file 'FloatingActionButton.test.js'", () => {
  test("Must be shown correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Component must fire the configured event", () => {
    wrapper.find("button").prop("onClick")();
    expect(deleteEvent).toHaveBeenCalledTimes(1);
  });
});
