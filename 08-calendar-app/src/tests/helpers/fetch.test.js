import { fetchWithToken } from "../../helpers/fetch";

describe("Tests inside file 'fetch.test.js'", () => {
  let token = "";

  test("'fetchWithoutToken' function must return an expected value", async () => {
    const response = await fetchWithToken("auth", "POST", {
      email: "floressegoviajesus@gmail.com",
      password: "123456",
    });

    expect(response instanceof Response).toBe(true);

    const body = await response.json();

    expect(body.ok).toBe(true);

    token = body.token;
  });

  test("'fetchWithToken' function must return an expected value", async () => {
    localStorage.setItem("token", token);

    const response = await fetchWithToken(
      "events/622658f42e4503990f02cdbb",
      "DELETE"
    );

    const body = await response.json();

    expect(body.msg).toBe("Event not exists");
  });
});
