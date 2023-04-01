import React, { useEffect, useState } from "react";
import "./message.css";
import gptLogo from "./gpt_logo.svg";
import avatar from "./avatar.jpg";

export default function Message({ messages, req, changeMessages }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (req.length === 0) return;
    setData(null);
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-0301",
        messages: messages,
        temperature: 0.7,
      }),
    })
      .then((res) => res.json())
      .then((gptdata) => {
        setData(gptdata);
        changeMessages(gptdata.choices[0].message);
      });
    console.log("generated");
  }, [req]);
  const msgs = messages.map((el) => {
    if (el.role === "system") return null;
    if (el.role === "user")
      return (
        <li className="answer__list-item answer__list-item--user">
          <img src={avatar} className="answer__list-icon" alt="user avatar" />
          <p className="answer__list-text">{el.content}</p>
        </li>
      );
    return (
      <li className="answer__list-item answer__list-item--assistent">
        <img src={gptLogo} className="answer__list-icon" alt="gpt logo" />
        <p className="answer__list-text">{el.content}</p>
      </li>
    );
  });
  if (data == null || req.length === 0) {
    return (
      <div
        onLoad={(e) => {
          e.target.scrollIntoView();
        }}
        className="answer"
      >
        <ul className="answer__list">{msgs}</ul>
      </div>
    );
  }

  return (
    <div
      onLoad={(e) => {
        e.target.scrollIntoView();
      }}
      className="answer"
    >
      <ul className="answer__list">{msgs}</ul>
    </div>
  );
}
