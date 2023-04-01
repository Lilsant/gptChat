import React, { useState } from "react";
import "./input.css";
import sendIcon from "./send.svg";

export default function Input({ inpChange }) {
  const [inputValue, setInputValue] = useState("");
  return (
    <form
      className="input"
      onSubmit={(e) => {
        e.preventDefault();
        inpChange(inputValue);
      }}
    >
      <textarea
        className="input__input"
        onChange={(ev) => {
          setInputValue(ev.target.value);
        }}
        placeholder="Text..."
      />
      <button className="input__button">
        <img src={sendIcon} className="input__button-icon" alt="send" />
      </button>
    </form>
  );
}
