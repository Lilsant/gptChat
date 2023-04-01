import { useEffect, useState } from "react";
import "./App.css";
import Message from "./components/message/message";
import Input from "./components/input/input";
import jailMessage from "./info/messages";
import NewImage from "./components/image/image";
import ImageInput from "./components/image_input/image_input";
import DialogList from "./components/DialogList/DialogList";
function App() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Я хочу, чтобы ты указывал на мои ошибки в тексте. В грубой форме, будто ты гопник.",
    },
  ]);
  const [dialogList, setDialogList] = useState([
    {
      id: 0,
      messages: messages,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [imageInputValue, setImageInputValue] = useState("");
  function inpChange(value) {
    setInputValue(value);
    console.log("bro");
    setMessages((msgs) => [
      ...msgs,
      {
        role: "user",
        content: value,
      },
    ]);
  }
  function changeMessages(newMsg) {
    setMessages((msgs) => [...msgs, newMsg]);
  }
  function changeInputImage(value) {
    setImageInputValue(value);
  }
  return (
    <div className="App">
      <div className="dialog__main">
        <DialogList dialog={dialogList} />
      </div>
      <div className="chat">
        <Message
          messages={messages}
          req={inputValue}
          changeMessages={changeMessages}
        />
        <Input inpChange={inpChange} />
      </div>
      {imageInputValue.length !== 0 ? <NewImage req={imageInputValue} /> : null}
      <ImageInput imgInpChange={changeInputImage} />
    </div>
  );
}

export default App;
