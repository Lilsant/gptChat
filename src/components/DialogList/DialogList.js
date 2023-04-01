import React from "react";

export default function DialogList({ dialog }) {
  const list = dialog.map((el) => {
    return <li className="dialogs__list-item">Dialog</li>;
  });
  return (
    <div className="dialogs">
      <ul className="dialogs__list">
        {list}
        <li className="dialogs__icon-new">+</li>
      </ul>
    </div>
  );
}
