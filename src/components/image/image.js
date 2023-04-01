import React, { useEffect, useState } from "react";
import "./image.css";

export default function NewImage({ req }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
      body: JSON.stringify({
        prompt: req,
        n: 2,
        size: "1024x1024",
      }),
    })
      .then((res) => res.json())
      .then((gptdata) => {
        setData(gptdata);
        console.log(gptdata);
      });
    console.log("generated");
  }, []);
  if (data == null) {
    return <div className="image"></div>;
  }

  return (
    <div className="image">
      <img className="image__inner" src={data.data[0].url} />
    </div>
  );
}
