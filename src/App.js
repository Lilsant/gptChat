import {
  collection,
  addDoc,
  setDoc,
  getDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import "./App.css";
import Message from "./components/message/message";
import Input from "./components/input/input";
import jailMessage from "./info/messages";
import NewImage from "./components/image/image";
import ImageInput from "./components/image_input/image_input";
import DialogList from "./components/DialogList/DialogList";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectData } from "react-firebase-hooks/firestore";
import { auth } from "./firebase/auth";
import SingIn from "./components/SingIn/SingIn";
import { db } from "./firebase/firebase";

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Я хочу, чтобы ты указывал на мои ошибки в тексте. В грубой форме, будто ты гопник.",
    },
  ]);
  const [currentId, setCurrentId] = useState(0);
  const [currentDialog, setCurrentDialog] = useState(0);
  const [dialogList, setDialogList] = useState();
  const [isFirstTime, setIsFirstTime] = useState(true);
  useEffect(() => {
    if (user != null && dialogList) {
      if (isFirstTime) {
        setIsFirstTime(false);
        return;
      }
      console.log("TO SERVER", dialogList);
      setDoc(
        doc(db, "users_list", user.uid),
        {
          dialogList: dialogList,
        },
        { merge: true }
      );
    }
  }, [dialogList]);
  const [inputValue, setInputValue] = useState("");
  const [imageInputValue, setImageInputValue] = useState("");
  function inpChange(value) {
    setInputValue(value);
    dialogList.forEach((el, i) => {
      if (el.id === currentId) setCurrentDialog(i);
    });
    setDialogList((list) => {
      list[currentDialog].messages = [
        ...list[currentDialog].messages,
        { role: "user", content: value },
      ];
      return list;
    });
  }

  async function getList(user) {
    if (user) {
      const docRef = doc(db, "users_list", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) return docSnap.data();
    } else return [{ id: 0, messages: [{ role: "system", content: "Hello" }] }];
  }
  async function signInFunc(user) {
    setUser(user);
    let bro = await getList(user);
    console.log("HAHAHA", bro);
    setDialogList(bro.dialogList, (prevValue, newValue) => newValue);
    console.log(dialogList);
    setDoc(doc(db, "users_list", user.uid), {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      dialogList: bro.dialogList,
    });
    console.log("bro", dialogList);
  }
  async function changeMessages(newMsg) {
    dialogList.forEach((el, i) => {
      if (el.id === currentId) setCurrentDialog(i);
    });
    setDialogList((list) => {
      return [
        ...list.slice(0, currentDialog),
        {
          id: currentId,
          messages: [...list[currentDialog].messages, newMsg],
        },
        ...list.slice(currentDialog + 1),
      ];
    });
    console.log(dialogList);
  }
  function changeInputImage(value) {
    setImageInputValue(value);
  }
  function changeCurrentId(id, isNew) {
    console.log(id);
    if (isNew) {
      setCurrentId(id);
      setCurrentDialog(dialogList.length);
      setDialogList((list) => {
        return [
          ...list,
          { id: id, messages: [{ role: "system", content: "Hello" }] },
        ];
      });
    } else {
      dialogList.forEach((el, i) => {
        if (el.id === id) {
          console.log(el.id);
          setCurrentDialog(i);
          setCurrentId(el.id);
        }
      });
    }
    console.log(currentDialog);
  }
  if (!user) return <SingIn setUser={signInFunc} />;
  if (!dialogList) return null;
  if (dialogList) console.log(dialogList);
  return (
    <div className="App">
      <div className="dialog__main">
        <DialogList dialog={dialogList} changeDialog={changeCurrentId} />
      </div>
      <div className="chat">
        <Message
          messages={dialogList[currentDialog].messages}
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
