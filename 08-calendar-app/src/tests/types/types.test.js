import { types } from "../../types/types";

describe("Tests inside file types.test.js", () => {
  test("Types must be equal", () => {
    expect(types).toEqual({
      uiOpenModal: "[UI] Open Modal",
      uiCloseModal: "[UI] Close Modal",

      calendarStartNewEvent: "[Calendar] Start add new event",
      calendarNewEvent: "[Calendar] Add new event",
      calendarUpdateEvent: "[Calendar] Update event",
      calendarDeleteEvent: "[Calendar] Delete event",
      calendarSetActiveEvent: "[Calendar] Set active event",
      calendarStartLoadEvents: "[Calendar] Start load events",
      calendarSetLoadedEvents: "[Calendar] Set loaded events",
      calendarLogoutCleanEvents: "[Calendar] Logout Clean Events",

      authCheckLoginState: "[Auth] Finish checking login state",
      authStartLogin: "[Auth] Start login",
      authLogin: "[Auth] Login",
      authStartRegister: "[Auth] Start register",
      authRegister: "[Auth] Register",
      authGetNewToken: "[Auth] Get new token",
      authLogout: "[Auth] Logout",
    });
  });
});
