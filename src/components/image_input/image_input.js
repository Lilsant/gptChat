import React, { useState } from "react";

export default function ImageInput({ imgInpChange }) {
  const [inputValue, setInputValue] = useState("");
  return (
    <form
      className="input"
      onSubmit={(e) => {
        e.preventDefault();
        console.log("BDYSH");
        imgInpChange(inputValue);
      }}
    >
      <input
        className="input__input"
        onChange={(ev) => {
          setInputValue(ev.target.value);
        }}
      />
      <button className="input__button">Отправить</button>
    </form>
  );
}
