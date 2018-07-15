import { appName } from "../config";
import { Record } from "immutable";
import { createSelector } from "reselect";

export const moduleName = "search";
const prefix = `${appName}/${moduleName}`;

export const SHOW = `${prefix}/SHOW`;
export const HIDE = `${prefix}/HIDE`;

export const ReducerRecord = Record({
  show: true
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type } = action;
  switch (type) {
    case SHOW:
      return state.set("show", true);
    case HIDE:
      return state.set("show", false);
    default:
      return state;
  }
}

export const stateSelector = state => state[moduleName];
export const showSelector = createSelector(stateSelector, state => state.show);

/**
 * Action Creators
 * */

export function show() {
  return {
    type: SHOW
  };
}

export function hide() {
  return {
    type: HIDE
  };
}
