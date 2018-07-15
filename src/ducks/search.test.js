import reducer, { ReducerRecord, SHOW, HIDE } from "./message";


describe("Message reducer ", () => {
  const show = new ReducerRecord({ show: true});
  const hide = new ReducerRecord({ show: false });  

  it("first ", () => {
    expect(reducer(undefined, { type: "none", payload: null })).toEqual(
        show
    );
  });


  it(" default ", () => {
    expect(reducer(show, { type: "none", payload: null })).toEqual(
        show);
  });

  it(" show ", () => {
    expect(reducer(hide, { type: SHOW, payload: null})).toEqual(
        show);
  });

  it(" hide ", () => {
    expect(reducer(show, { type: HIDE, payload: null })).toEqual(
        hide);
  });
});