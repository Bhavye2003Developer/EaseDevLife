import React, { useEffect, useState } from "react";

const Typewriter = ({ lines }) => {
  const [index, setIndex] = useState(0);
  const [lineToBeDisplayed, setlineToBeDisplayed] = useState("");
  const [IsDisplayed, setIsDisplayed] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (index === 0 && IsDisplayed) {
      if (lineIndex === lines.length - 1) setLineIndex(0);
      else setLineIndex(lineIndex + 1);
      setIsDisplayed(false);
    }

    if (index === lines[lineIndex].length + 1) {
      setIsDisplayed(true);
    }
    setlineToBeDisplayed(lines[lineIndex].substring(0, index));
  }, [index]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (IsDisplayed) {
        setIndex(index - 1);
      } else {
        setIndex(index + 1);
      }
    }, 50); // Initial timeout

    return () => clearTimeout(timeout);
  }, [index, IsDisplayed]);

  return (
    <h1 className="text-4xl font-bold text-white mb-6">{lineToBeDisplayed}</h1>
  );
};

export default Typewriter;
