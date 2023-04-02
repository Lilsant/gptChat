import React from "react";

export default function DialogList({ dialog, changeDialog }) {
  const list = dialog.map((el) => {
    return (
      <li
        onClick={() => changeDialog(el.id, false)}
        className="dialogs__list-item"
      >
        Dialog
      </li>
    );
  });
  return (
    <div className="dialogs">
      <ul className="dialogs__list">
        {list}
        <li
          onClick={() => {
            changeDialog(Math.floor(Math.random() * 1000), true);
          }}
          className="dialogs__icon-new"
        >
          +
        </li>
      </ul>
    </div>
  );
}
