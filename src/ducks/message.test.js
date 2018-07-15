import reducer, { ReducerRecord, CLEAR_ERROR } from "./message";
import { FETCH_PAGE_ERROR } from "./movies";

describe("Message reducer ", () => {
  const existsMessage = new ReducerRecord({ message: "Custom Error" });
  const noMessage = new ReducerRecord({ message: null });  

  it("first ", () => {
    expect(reducer(undefined, { type: "none", payload: null })).toEqual(
        noMessage
    );
  });


  it(" default ", () => {
    expect(reducer(existsMessage, { type: "none", payload: null })).toEqual(
        existsMessage);
  });

  it(" set message ", () => {
    expect(reducer(noMessage, { type: FETCH_PAGE_ERROR, payload: "Custom Error" })).toEqual(
        existsMessage);
  });

  it(" reset message ", () => {
    expect(reducer(existsMessage, { type: CLEAR_ERROR, payload: null })).toEqual(
        noMessage);
  });
});
