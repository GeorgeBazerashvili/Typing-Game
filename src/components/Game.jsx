import React, { useContext, useState, useEffect } from "react";
// words array (200 words in total)
import words from "../json/words.json";
import { HomePageInfo } from "./HomePage";

function Game() {
  //random word generator.(source: words arr from words.json())
  const randomNumber = Math.floor(Math.random() * words.length);

  const source = useContext(HomePageInfo);

  // React hooks
  const [color, setColor] = useState("lime");
  const [time, setTime] = useState(60);
  const [interval1, setInterval1] = useState(1000);
  const [value, setValue] = useState("");
  const [currentWord, setCurrentWord] = useState(words[0]);

  // function to reduce timer
  function timeDropdown() {
    if (time > 0) {
      setTime(time - 1);
    }
    if (time <= 0) {
      setTime(0);
    }
  }

  // color changer by time
  useEffect(() => {
    const cooldown = setInterval(timeDropdown, interval1);
    if (time > 30) {
      setColor("lime");
    } else if (time <= 30 && time > 10) {
      setColor("orange");
    } else if (time <= 10) {
      setColor("red");
    }

    return () => clearInterval(cooldown);
  }, [time]);

  function incrementStage() {
    if (source.scoreCount % 5 == 0 && source.scoreCount !== 0) {
      source.setStageCount((previous) => previous + 1);
    }
  }

  // add score logic
  useEffect(() => {
    if (currentWord == value) {
      source.setScoreCount(source.scoreCount + 1);
      setValue("");
      setCurrentWord(words[randomNumber]);
    }
  }, [value]);

  useEffect(() => {
    incrementStage();
  }, [source.scoreCount]);

  // JSX
  return (
    <section className="game__section">
      <div className="game__div">
        <h2 className="word">{currentWord}</h2>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <h2 className="time" style={{ color }}>
          {time}S
        </h2>
      </div>
    </section>
  );
}

// exporting Game component
export default Game;
