import { all } from "redux-saga/effects";
import { saga as moviesSaga } from "../ducks/movies";

export default function* rootSaga() {
  yield all([moviesSaga()]);
}
