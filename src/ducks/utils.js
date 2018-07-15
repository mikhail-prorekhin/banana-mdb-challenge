import { List } from "immutable";

export function omdbToEntities(values, DataRecord) {
  return values.reduce((resultList, { Title, Year, imdbID, Type, Poster }) => {
    return resultList.set(
      resultList.size,
      new DataRecord({
        id: imdbID,
        title: Title,
        year: Year,
        pict: Poster,
        type: Type
      })
    );
  }, new List());
}
