import React from "react";
import MovieInfo , { replace } from "./index";
import { shallow } from "enzyme";


describe("Replace test", () => {
  it("No replace", () => {
    const title = "The Hobbit: An Unexpected Journey";
    expect(replace(title, "Robocop")).toEqual(title);
  });

  it("replace", () => {
    const title = "The Hobbit: An Unexpected Journey";
    const expected = "The <strong>Hob</strong>bit: An Unexpected Journey";
    expect(replace(title, "Hob")).toEqual(expected);
  });

  it("replace case insentative", () => {
    const title = "The Hobbit: An Unexpected Journey";
    const expected = "The <strong>Hob</strong>bit: An Unexpected Journey";
    expect(replace(title, "hob")).toEqual(expected);
  });
});

describe("Movie Info test", () => {
  it("Info test ", () => {
    const field = shallow(
      <MovieInfo
      year="1999"
      title="The Hobbit: An Unexpected Journey"
      select="  an the  "
      className="simple"
      >
        <span>test</span>
       </MovieInfo>,
      {
        disableLifecycleMethods: true
      }
    );
    expect(field.find(".simple").length).toBe(1);
    expect(field.find(".movie__title").length).toBe(1);
    expect(field.find(".movie__year").length).toBe(1);
    expect(field.find(".movie__year").at(0).text()).toEqual("1999");
    expect(field.find("span").length).toBe(1);
    expect(field.find("span").at(0).text()).toEqual("test");
    expect(field.find(".movie__title strong").length).toBe(2);
    expect(field.find(".movie__title strong").at(0).text()).toEqual("The");
    expect(field.find(".movie__title strong").at(1).text()).toEqual("An");
  });


});