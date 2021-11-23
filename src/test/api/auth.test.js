// Auth Api Test

const request = require("supertest");
const { app } = require("../../app");

it("returns token with succesfull login with right credential", async () => {
  const res = await request(app)
    .post(`/api/auth/login`)
    .send({ user_name: "uppi", password: "Password@123" })
    .set("Accept", "application/json")
    .expect(200);

  expect(res.body).toEqual(
    expect.objectContaining({
      success: true,
      message: "login successfull",
      data: {
        accessToken: expect.any(String),
        user: expect.any(Object),
      },
    })
  );
});

it("returns error with wrong credential", async () => {
  const res = await request(app)
    .post(`/api/auth/login`)
    .send({ user_name: "upp", password: "Password@123" })
    .set("Accept", "application/json")
    .expect(401);

  expect(res.body).toEqual(
    expect.objectContaining({
      success: false,
      message: "either user name or password is wrong",
      error: null,
    })
  );
});
