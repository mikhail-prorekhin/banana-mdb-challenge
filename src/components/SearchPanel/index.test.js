import { validate } from "./index";


const getFailValidation = ()  => (
    {search:"Input needs to be at least 2 characters long"}
);
describe("validate test", () => {
  it("Empty string", () => {
    const state = {search: ""};
    expect(validate(state)).toEqual(getFailValidation());
  });

  it("space only string", () => {
    const state = {search: "   "};
    expect(validate(state)).toEqual(getFailValidation());
  });
  
  it("one char only string", () => {
    const state = {search: " 1  "};
    expect(validate(state)).toEqual(getFailValidation());
  });

  it("one char only string", () => {
    const state = {search: " 1 1  "};
    expect(validate(state)).toEqual(getFailValidation());
  });

  it("valid string", () => {
    const state = {search: " 11  "};
    expect(validate(state)).toEqual({});
  });

});