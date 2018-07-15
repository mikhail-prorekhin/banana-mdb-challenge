import { appName } from "../config";
import { Record } from "immutable";
import { createSelector } from "reselect";
import { FETCH_PAGE_ERROR } from "./movies";


export const moduleName = "message";
const prefix = `${appName}/${moduleName}`;

export const CLEAR_ERROR = `${prefix}/CLEAR_ERROR`;

export const ReducerRecord = Record({
  message: null
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PAGE_ERROR:
      return state
        .set("message", payload.message || payload);
    case CLEAR_ERROR:
      return state.set("message", null);
    default:
      return state;
  }
}

export const stateSelector = state => state[moduleName];
export const messageSelector = createSelector(stateSelector, state => state.message);

/**
 * Action Creators
 * */

export function clearMessage() {
    return {
      type: CLEAR_ERROR
    };
  }
