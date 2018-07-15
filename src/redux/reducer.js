import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import moviesReducer, { moduleName as moviesModule } from "../ducks/movies";
import searchReducer, { moduleName as searchModule } from "../ducks/search";
import messageReducer, { moduleName as messageModule } from "../ducks/message";

export default combineReducers({
  form,
  [moviesModule]: moviesReducer,
  [searchModule]: searchReducer,
  [messageModule]: messageReducer
});
