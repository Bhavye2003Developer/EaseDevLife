import React, { useEffect, useState } from "react";

const Typewriter = () => {
  const lines = [
    "Bring your vision to life, effortlessly! With our intuitive tool",
    "Transforming URLs into engaging videos and beautifully crafted PDFs is as easy as a few clicks – no tech wizardry required.",
  ];

  const [index, setIndex] = useState(0);
  const [lineToBeDisplayed, setlineToBeDisplayed] = useState("");
  const [IsDisplayed, setIsDisplayed] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (index === 0 && IsDisplayed) {
      console.log(index);
      if (lineIndex === lines.length - 1) setLineIndex(0);
      else setLineIndex(lineIndex + 1);
      setIsDisplayed(false);
    }

    if (index === lines[lineIndex].length + 1) {
      setIsDisplayed(true);
    }
    setlineToBeDisplayed(lines[lineIndex].substring(0, index));
  }, [index]);

  useEffect(() => {}, [lineIndex]);

  setTimeout(() => {
    if (IsDisplayed) {
      setIndex(index - 1);
    } else {
      setIndex(index + 1);
    }
  }, 50);

  return (
    <h1 className="text-4xl font-bold text-white mb-6">{lineToBeDisplayed}</h1>
  );
};

export default Typewriter;
