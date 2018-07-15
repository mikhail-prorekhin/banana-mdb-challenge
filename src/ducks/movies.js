import { put, call, take, select, all } from "redux-saga/effects";
import { appName } from "../config";
import { Record, List } from "immutable";
import { createSelector } from "reselect";
import { omdbToEntities } from "./utils";
import { takeEvery } from "../../node_modules/redux-saga";
import { apiKey } from "../config";
/**
 * Constants
 * */
export const moduleName = "movies";
const prefix = `${appName}/${moduleName}`;

export const SEARCH_REQUEST = `${prefix}/FETCH_LAZY_REQUEST`;
export const STOP_FETCH = `${prefix}/STOP_FETCH`;
export const FETCH_PAGE_REQUEST = `${prefix}/FETCH_PAGE_REQUEST`;
export const FETCH_PAGE_START = `${prefix}/FETCH_PAGE_START`;
export const FETCH_PAGE_SUCCESS = `${prefix}/FETCH_PAGE_SUCCESS`;
export const FETCH_PAGE_ERROR = `${prefix}/FETCH_PAGE_ERROR`;


/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  error: null,
  total: 0,
  page: 0,
  search: null,
  firstFetch: true,
  movies: new List([])
});

export const MovieRecord = Record({
  id: null,
  title: null,
  year: null,
  pict: null,
  type: null
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_REQUEST:
      return new ReducerRecord().set("search", payload.search);
    case FETCH_PAGE_START:
      return state
        .set("loading", true)
        .set("loaded", false)
        .set("error", null);
    case FETCH_PAGE_SUCCESS:
      return state
        .set("loading", false)
        .set("loaded", true)
        .set("firstFetch", false)
        .set(
          "movies",
          state
            .get("movies")
            .concat(omdbToEntities(payload.Search, MovieRecord))
        )
        .set("total", +payload.totalResults)
        .set("page", state.get("page") + 1);
    case FETCH_PAGE_ERROR:
      return state
        .set("loading", false)
        .set("error", payload.message || payload);
    case STOP_FETCH:
      return state.set("loading", false).set("firstFetch", false);
    default:
      return state;
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName];
export const moviesSelector = createSelector(
  stateSelector,
  state => state.movies
);
export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
);
export const loadedSelector = createSelector(
  stateSelector,
  state => state.loaded
);

export const totalSelector = createSelector(
  stateSelector,
  state => state.total
);
export const searchSelector = createSelector(
  stateSelector,
  state => state.search
);
export const pageSelector = createSelector(stateSelector, state => state.page);

/**
 * Action Creators
 * */

export function fetchNextPage() {
  return {
    type: FETCH_PAGE_REQUEST
  };
}

export function setSearch(search) {
  return {
    type: SEARCH_REQUEST,
    payload: search
  };
}


/**
 * Sagas
 * */

export const searchSaga = function*() {
  yield put({
    type: FETCH_PAGE_REQUEST
  });
};

export async function fetchRecords(apiKey, search, page) {
  const apiResponse = await fetch(
    `http://www.omdbapi.com/?&apikey=${apiKey}&s=${search}*&page=${page}`
  );
  return await apiResponse.json();
}

export const fetchLazySaga = function*() {
  while (true) {
    yield take(FETCH_PAGE_REQUEST);

    const state = yield select(stateSelector);

    if (state.loading) continue;
    if (!state.search) continue;
    if (!state.firstFetch && !state.total) continue;
    if (!state.firstFetch && state.total === state.movies.size) continue;

    yield put({
      type: FETCH_PAGE_START
    });

    try {
      const result = yield call(
        fetchRecords,
        apiKey,
        state.search,
        state.page + 1
      );

      if (result.Response !== "True") {
        yield put({
          type: STOP_FETCH
        });
        throw result.Error;
      }

      yield put({
        type: FETCH_PAGE_SUCCESS,
        payload: result
      });
    } catch (err) {
      console.log(err);
      yield put({
        type: FETCH_PAGE_ERROR,
        payload: err
      });
    }
  }
};

export function* saga() {
  yield all([takeEvery(SEARCH_REQUEST, searchSaga), fetchLazySaga()]);
}
