import React from "react";
import { MovieListClass } from "./index";
import { shallow } from "enzyme";
import { MovieRecord } from "../../ducks/movies";


function fetchNextPage() {}
function show() {}
function hide() {}
function getRecords() {
  return [
    new MovieRecord({
      id: "tt0112950",
      title: "Empire Records",
      year: "1995",
      pict: "https://ia.media-imdb.com/images/M/MV5SX300.jpg",
      type: "movie"
    }),
    new MovieRecord({
      id: "tt1042877",
      title: "Cadillac Records",
      year: "2008",
      pict: "https://m.media-amazon.com/images/M/1_SX300.jpg",
      type: "movie"
    })
  ];
}


describe("MovieList", () => {
  it("empty list ", () => {
    const field = shallow(
      <MovieListClass
        movies={[]}
        fetchNextPage={fetchNextPage}
        show={show}
        hide={hide}
        showSearchPanel={true}
        select={"The"}
        loading={false}
      />,
      {
        disableLifecycleMethods: true
      }
    );
    expect(field.find("Movie").length).toBe(0);
    expect(field.find("Loader").length).toBe(0);
  });

  it("movies list ", () => {

    const immutMovies = getRecords ();
    const field = shallow(
      <MovieListClass
        movies={immutMovies}
        fetchNextPage={fetchNextPage}
        show={show}
        hide={hide}
        showSearchPanel={true}
        select={"The"}
        loading={false}
      />,
      {
        disableLifecycleMethods: true
      }
    );
    expect(field.find("Movie").length).toBe(2);

    const firstMovie = field.find("Movie").at(0);
    expect(firstMovie.key()).toEqual("tt0112950");
    expect(firstMovie.prop("select")).toEqual("The");
    expect(firstMovie.prop("movie")).toEqual(immutMovies[0]);
 
    const secondMovie = field.find("Movie").at(1);
    expect(secondMovie.key()).toEqual("tt1042877");
    expect(secondMovie.prop("select")).toEqual("The");
    expect(secondMovie.prop("movie")).toEqual(immutMovies[1]);
    
  });

  it("loading records ", () => {
    const field = shallow(
        <MovieListClass
          movies={[]}
          fetchNextPage={fetchNextPage}
          show={show}
          hide={hide}
          showSearchPanel={true}
          select={"The"}
          loading={true}
        />,
        {
          disableLifecycleMethods: true
        }
      );
      expect(field.find("Loader").length).toBe(1);
  })
});
