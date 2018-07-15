import React from "react";
import Movie  from "./index";
import { shallow } from "enzyme";




describe("Movie test", () => {
  it("Info test ", () => {
    const field = shallow(
      <Movie
      movie = {{
      year:"1999",
      title:"The Hobbit: An Unexpected Journey",
      pict:"some-url"
      }}
      select="  an the  "
      
      />,
      {
        disableLifecycleMethods: true
      }
    );
    expect(field.find(".movie").length).toBe(1);
    expect(field.find(".movie").length).toBe(1);
    expect(field.find("MovieInfo").length).toBe(2);
    expect(field.find(".movie__button").length).toBe(1);
    expect(field.find(".movie__pict").prop('style')).toHaveProperty('backgroundImage', 'url(some-url)');
    expect(field.find(".movie__button").hasClass("movie-appear-leave")).toEqual(true)
  });


  it("no poster test ", () => {
    const field = shallow(
      <Movie
      movie = {{
      year:"1999",
      title:"The Hobbit: An Unexpected Journey",
      pict:"N/A"
      }}
      select="  an the  "
      
      />,
      {
        disableLifecycleMethods: true
      }
    );
    expect(field.find(".movie").length).toBe(1);
    expect(field.find(".movie__pict").prop('style')).toHaveProperty('backgroundImage', 'url(no_poster.png)');

});

  it("click test ", () => {
    const field = shallow(
      <Movie
      movie = {{
      year:"1999",
      title:"The Hobbit: An Unexpected Journey",
      pict:"some-url"
      }}
      select="  an the  "
      
      />,
      {
        disableLifecycleMethods: true
      }
    );
    expect(field.find(".movie").length).toBe(1);
    expect(field.find(".movie__button").hasClass("movie-appear-leave")).toEqual(true)
    field.find(".movie__button").simulate('click');
    expect(field.find(".movie__button").hasClass("movie-appear-active")).toEqual(true)

});


});