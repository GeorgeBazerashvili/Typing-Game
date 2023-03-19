// importing hooks
import React, { useContext, useState, useEffect, useRef } from "react";
// words array (300 words in total)
import words from "../json/words.json";
// imported <HomePageInfo /> component
import { HomePageInfo } from "./HomePage";
//
function Game() {
  // interval marks. First stage got default interval of 1500.
  const stage2 = 1000;
  const stage3 = 800;
  const stage4 = 600;
  const stage5 = 500;
  const stage6 = 400;
  const bossStage = 200;

  //random word generator.(source: words arr from words.json())
  const randomNumber = Math.floor(Math.random() * words.length);

  const source = useContext(HomePageInfo);

  // React hooks
  const [color, setColor] = useState("lime");
  const [time, setTime] = useState(60);
  const [interval1, setInterval1] = useState(1500);
  const [value, setValue] = useState("");
  const [currentWord, setCurrentWord] = useState(words[0]);
  const globalRef = useRef();

  // function to reduce timer
  function timeDropdown() {
    if (time > 0) {
      setTime(time - 1);
    }
    if (time <= 0) {
      setTime(0);
    }
  }

  function setFocus() {
    globalRef.current.focus();
  }

  // focus input by default
  useEffect(() => {
    setFocus();
  }, []);

  // interval changer for each stage
  useEffect(() => {
    switch (source.stageCount) {
      case 2:
        setInterval1(stage2);
        break;
      case 3:
        setInterval1(stage3);
        break;
      case 4:
        setInterval1(stage4);
        break;
      case 5:
        setInterval1(stage5);
        break;
      case 6:
        setInterval1(stage6);
        break;
    }
    if (source.scoreCount >= 30) {
      setInterval1(bossStage);
    }
  }, [source.scoreCount]);

  function gameEnd() {
    if (!source.gamewin) {
      source.setGameOver((prev) => !prev);
      source.setShowStyles((prev) => !prev);
      globalRef.current.blur();
      source.setMenu(false);
    }
  }

  // color changer by time
  useEffect(() => {
    const cooldown = setInterval(timeDropdown, interval1);
    if (source.menu) {
      clearInterval(cooldown);
    } else {
      if (time > 30) {
        setColor("lime");
      } else if (time <= 30 && time > 10) {
        setColor("orange");
      } else if (time <= 10) {
        setColor("red");
      }

      if (time == 60) {
        setFocus();
      }

      if (time == 0 && !source.gameWin) {
        gameEnd();
      }
    }

    return () => clearInterval(cooldown);
  }, [time, source.menu]);

  function gameWin(score) {
    if (score >= 35) {
      source.setGameWin(true);
      source.setShowStyles2(true);
      globalRef.current.blur();
    }
  }

  // stage increment every 5 score
  function incrementStage() {
    if (
      source.scoreCount % 5 == 0 &&
      source.scoreCount !== 0 &&
      source.scoreCount !== 30 &&
      source.stageCount !== "BOSS Stage!"
    ) {
      source.setStageCount((previous) => previous + 1);
    }
    if (source.scoreCount >= 30) {
      source.setStageShow("");
      source.setStageCount("BOSS Stage!");
    }
  }

  // add score and time increment logic
  useEffect(() => {
    if (currentWord == value) {
      source.setScoreCount(source.scoreCount + 1);
      setValue("");
      setCurrentWord(words[randomNumber]);
      setTime((curr) => curr + 1);
    }
  }, [value]);

  useEffect(() => {
    incrementStage();
    gameWin(source.scoreCount);
  }, [source.scoreCount]);

  function handleClick() {
    setValue("");
    source.setPopupMenu((prev) => !prev);
    source.setScoreCount(0);
    source.setStageCount(1);
    source.setStageShow("Stage: ");
    source.setShowStyles((prev) => !prev);
    source.setGameOver((prev) => !prev);
    setInterval1(1500);
    setTime(60);
    setFocus();
  }

  function handleClick3() {
    setValue("");
    source.setPopupMenu((prev) => !prev);
    source.setScoreCount(0);
    source.setStageCount(1);
    source.setStageShow("Stage: ");
    source.setShowStyles2((prev) => !prev);
    source.setGameWin((prev) => !prev);
    source.setMenu(false);
    setInterval1(1500);
    setTime(60);
    setFocus();
  }

  // function for main menu
  function handleClick2() {
    source.setStart((prev) => !prev);
    source.setShowStyles((prev) => !prev);
    source.setGameOver(false);
    source.setScoreCount(0);
    source.setStageCount(1);
    source.setStageShow("Stage: ");
    source.setGameWin(false);
  }

  function handleClick4() {
    source.setStart((prev) => !prev);
    source.setShowStyles2((prev) => !prev);
    source.setGameWin(false);
    source.setScoreCount(0);
    source.setStageCount(1);
    source.setStageShow("Stage: ");
    source.setGameWin(false);
  }

  function handleClick5() {
    setValue("");
    source.setPopupMenu((prev) => !prev);
    source.setScoreCount(0);
    source.setStageCount(1);
    source.setStageShow("Stage: ");
    source.setMenu((prev) => !prev);
    setInterval1(1500);
    setTime(60);
    setFocus();
  }

  function handleClick6() {
    source.setStart((prev) => !prev);
    source.setScoreCount(0);
    source.setStageCount(1);
    source.setStageShow("Stage: ");
    source.setGameWin(false);
    source.setMenu(false);
  }

  function handleClick7() {
    source.setMenu((prev) => !prev);
  }

  // JSX
  return (
    <section className="game__section">
      <div
        className="game__div"
        style={
          source.gameOver || source.gameWin
            ? { display: "none" }
            : { display: "flex" }
        }
      >
        <h2 className="word">{currentWord}</h2>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          ref={globalRef}
        />
        <h2 className="time" style={{ color: `${color}` }}>
          {time}S
        </h2>
      </div>
      <div
        className="game__over__container"
        style={source.showStyles ? { display: "block" } : { display: "none" }}
      >
        <div className="padding__container">
          <h2>Game Over</h2>
          <h3>Your score was {source.scoreCount} </h3>
          <div className="buttons__container">
            <button className="main__menu" onClick={() => handleClick2()}>
              Main menu
            </button>
            <button className="play__again" onClick={handleClick}>
              Play again
            </button>
          </div>
        </div>
      </div>
      <div
        className="game__over__container game__win__container"
        style={source.showStyles2 ? { display: "flex" } : { display: "none" }}
      >
        <div className="padding__container">
          <h2 className="h2__win__one">Congratulations</h2>
          <h2 className="h2__win__two">You killed it!</h2>
          <p className="firstp">You collected 35 score</p>
          <div className="buttons__container">
            <button className="main__menu" onClick={handleClick4}>
              Main menu
            </button>
            <button className="play__again" onClick={handleClick3}>
              Play again
            </button>
          </div>
        </div>
      </div>
      <div
        className="menu"
        style={source.menu ? { display: "block" } : { display: "none" }}
      >
        <div className="padding__container2">
          <p className="close" onClick={handleClick7}>
            x
          </p>
          <h2>Game paused</h2>
          <div className="buttons__container2">
            <h2 className="buttonica" onClick={handleClick6}>
              Main menu
            </h2>
            <h2 className="buttonica" onClick={handleClick5}>
              Play again
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

// exporting Game component
export default Game;
