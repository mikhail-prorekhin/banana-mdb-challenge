import reducer, {
  ReducerRecord,
  MovieRecord,
  fetchLazySaga,
  FETCH_PAGE_ERROR,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_START,
  FETCH_PAGE_REQUEST,
  STOP_FETCH,
  SEARCH_REQUEST,
  fetchRecords
} from "./movies";
import { List } from "immutable";
import { put, call, take } from "redux-saga/effects";
import { apiKey } from "../config";

function getImmutableRecords() {
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

function getApiResponse() {
  return {
    totalResults: "12",
    Response: "True",
    Search: [
      {
        imdbID: "tt0318034",
        Title: "Russian Ark",
        Year: "2002",
        Poster:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEyNDEwOTU0NV5BMl5BanBnXkFtZTYwNjk0NTk5._V1_SX300.jpg",
        Type: "movie"
      },
      {
        imdbID: "tt0100530",
        Title: "The Russia House",
        Year: "1990",
        Poster:
          "https://ia.media-imdb.com/images/M/MV5BMTM4NDAxMjQ5M15BMl5BanBnXkFtZTcwMzI0NzI5NA@@._V1_SX300.jpg",
        Type: "movie"
      }
    ]
  };
}

function getResultImmutableRecords() {
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
    }),
    new MovieRecord({
      id: "tt0318034",
      title: "Russian Ark",
      year: "2002",
      pict:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEyNDEwOTU0NV5BMl5BanBnXkFtZTYwNjk0NTk5._V1_SX300.jpg",
      type: "movie"
    }),
    new MovieRecord({
      id: "tt0100530",
      title: "The Russia House",
      year: "1990",
      pict:
        "https://ia.media-imdb.com/images/M/MV5BMTM4NDAxMjQ5M15BMl5BanBnXkFtZTcwMzI0NzI5NA@@._V1_SX300.jpg",
      type: "movie"
    })
  ];
}

describe("Movies reducer ", () => {
  const arbitrary = new ReducerRecord({
    loading: false,
    loaded: true,
    error: null,
    total: 12,
    page: 1,
    search: "search",
    firstFetch: false,
    movies: new List(getImmutableRecords())
  });

  const searchStart = new ReducerRecord({
    loading: false,
    loaded: false,
    error: null,
    total: 0,
    page: 0,
    search: "search",
    firstFetch: true,
    movies: new List([])
  });

  const fetchPageStart = new ReducerRecord({
    loading: true,
    loaded: false,
    error: null,
    total: 12,
    page: 1,
    search: "search",
    firstFetch: false,
    movies: new List(getImmutableRecords())
  });

  const fetchPageSucsess = new ReducerRecord({
    loading: false,
    loaded: true,
    error: null,
    total: 12,
    page: 2,
    search: "search",
    firstFetch: false,
    movies: new List( getResultImmutableRecords())
  });

  const fetchPageError = new ReducerRecord({
    loading: false,
    loaded: true,
    error: "error",
    total: 12,
    page: 1,
    search: "search",
    firstFetch: false,
    movies: new List(getImmutableRecords())
  });

  const stopFetch = new ReducerRecord({
    loading: false,
    loaded: true,
    error: null,
    total: 12,
    page: 1,
    search: "search",
    firstFetch: false,
    movies: new List(getImmutableRecords())
  });

  it("first ", () => {
    expect(reducer(undefined, { type: "none", payload: null })).toEqual(
      ReducerRecord()
    );
  });

  it(" default ", () => {
    expect(reducer(ReducerRecord, { type: "none", payload: null })).toEqual(
      ReducerRecord
    );
  });

  it(" search request ", () => {
    expect(
      reducer(arbitrary, {
        type: SEARCH_REQUEST,
        payload: { search: "search" }
      })
    ).toEqual(searchStart);
  });

  it(" start fetch page ", () => {
    expect(
      reducer(arbitrary, { type: FETCH_PAGE_START, payload: null })
    ).toEqual(fetchPageStart);
  });

  it(" fetch sucsess ", () => {
    expect(
      reducer(arbitrary, { type: FETCH_PAGE_SUCCESS, payload: getApiResponse() })
    ).toEqual(fetchPageSucsess);
  });

  it(" start fetch page ", () => {
    expect(
      reducer(arbitrary, { type: FETCH_PAGE_ERROR, payload: "error" })
    ).toEqual(fetchPageError);
  });

  it(" start fetch page ", () => {
    expect(
      reducer(arbitrary, { type: STOP_FETCH, payload: null })
    ).toEqual(stopFetch);
  });
});

describe("Movies saga", () => {


    it("already loading ", () => {

        const state = new ReducerRecord({
            loading: true,
            loaded: false,
            error: null,
            total: 2,
            page: 1,
            search: "search",
            firstFetch: false,
            movies: new List(getImmutableRecords())
          });

        const saga = fetchLazySaga();
        saga.next();
        saga.next();
        expect(saga.next(state).value).toEqual(take(FETCH_PAGE_REQUEST));
    });

    it("search was not set ", () => {

        const state = new ReducerRecord({
            loading: false,
            loaded: false,
            error: null,
            total: 2,
            page: 1,
            search: "",
            firstFetch: false,
            movies: new List(getImmutableRecords())
          });

        const saga = fetchLazySaga();
        saga.next();
        saga.next();
        expect(saga.next(state).value).toEqual(take(FETCH_PAGE_REQUEST));
    });

    it(" no result ", () => {

        const state = new ReducerRecord({
            loading: false,
            loaded: false,
            error: null,
            total: 0,
            page: 1,
            search: "search",
            firstFetch: false,
            movies: new List(getImmutableRecords())
          });

        const saga = fetchLazySaga();
        saga.next();
        saga.next();
        expect(saga.next(state).value).toEqual(take(FETCH_PAGE_REQUEST));
    });

    it(" already loaded ", () => {

        const state = new ReducerRecord({
            loading: false,
            loaded: false,
            error: null,
            total: 2,
            page: 1,
            search: "search",
            firstFetch: false,
            movies: new List(getImmutableRecords())
          });

        const saga = fetchLazySaga();
        saga.next();
        saga.next();
        expect(saga.next(state).value).toEqual(take(FETCH_PAGE_REQUEST));
    });

    it(" negative result", () => {

        const state = new ReducerRecord({
            loading: false,
            loaded: false,
            error: null,
            total: 4,
            page: 1,
            search: "search",
            firstFetch: false,
            movies: new List(getImmutableRecords())
          });

        const saga = fetchLazySaga();
        saga.next();
        saga.next();
        expect(saga.next(state).value).toEqual(put({type:FETCH_PAGE_START}));

        expect(saga.next().value).toEqual(call([null,fetchRecords],apiKey, 'search', 2));
        expect(saga.next({Response: "False", Error: "Error"}).value).toEqual(put({type:STOP_FETCH}));
        expect(saga.next().value).toEqual(put({type:FETCH_PAGE_ERROR, payload:"Error"}));
        expect(saga.next(state).value).toEqual(take(FETCH_PAGE_REQUEST));

    });
    it(" negative result", () => {

        const state = new ReducerRecord({
            loading: false,
            loaded: false,
            error: null,
            total: 4,
            page: 1,
            search: "search",
            firstFetch: false,
            movies: new List(getImmutableRecords())
          });

        const saga = fetchLazySaga();
        saga.next();
        saga.next();
        expect(saga.next(state).value).toEqual(put({type:FETCH_PAGE_START}));

        expect(saga.next().value).toEqual(call([null,fetchRecords],apiKey, 'search', 2));
        expect(saga.next(getApiResponse()).value).toEqual(put({type:FETCH_PAGE_SUCCESS, payload:getApiResponse()}));
        expect(saga.next(state).value).toEqual(take(FETCH_PAGE_REQUEST));
        
    });
});
