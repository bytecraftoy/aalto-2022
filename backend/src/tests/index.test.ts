import { magicNumber, server } from "../index";

test("The magic number should be 42", () => {
  expect(magicNumber).toBe(42);
  server.close();
});
