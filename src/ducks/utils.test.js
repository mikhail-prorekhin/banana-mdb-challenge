
import { MovieRecord } from "./movies";
import {omdbToEntities} from "./utils"

describe("Message reducer ", () => {

    function getApiRecords() {
        return [
            {
                imdbID: "tt0112950",
                Title: "Empire Records",
                Year: "1995",
                Poster: "https://ia.media-imdb.com/images/M/MV5SX300.jpg",
                Type: "movie"
            },
            {
                imdbID: "tt1042877",
                Title: "Cadillac Records",
                Year: "2008",
                Poster: "https://m.media-amazon.com/images/M/1_SX300.jpg",
                Type: "movie"
            }
        ];
    }

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
 
    it("convert API to Immutable ", () => {
        const convertedRecords = omdbToEntities(getApiRecords(), MovieRecord).toArray();
        expect(convertedRecords).toEqual(
            getImmutableRecords() 
        );
    })
})