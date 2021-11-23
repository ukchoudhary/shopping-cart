// Cart Api Tests

const request = require("supertest");
const { app } = require("../../app");

it("returns with cart detail", async () => {
  const res = await request(app).get(`/api/cart/1`).send().expect(200);

  expect(res.body).toEqual(
    expect.objectContaining({
      success: true,
      message: "fetch successfull",
      data: {
        cart: {
          id: "1",
          productDetail: expect.any(Array),
          value: expect.any(Number),
        },
      },
    })
  );
});
