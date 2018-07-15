import React from "react";

function ErrorField(props) {
  const {
    input,
    inputModificator,
    type,
    meta: { error, touched }
  } = props;

  const errorText = touched &&
    error && <div className="field__error">{error}</div>;

  const inputElement = (
    <div className={`${inputModificator || " "}`}>
      <input className="field__input " {...input} type={type} />
    </div>
  );

  return (
    <div className="field">
      {inputElement}
      {errorText}
    </div>
  );
}
ErrorField.propTypes = {};
export default ErrorField;
