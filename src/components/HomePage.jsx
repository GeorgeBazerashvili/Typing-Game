import React, { createContext, useState } from "react";
import Game from "./Game";
import Header from "./Header";

export const HomePageInfo = createContext();

function HomePage() {
  const [start, setStart] = useState(false);
  const [rules, setRules] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);
  const [stageCount, setStageCount] = useState(1);
  const [popupMenu, setPopupMenu] = useState(false);
  const [stageShow, setStageShow] = useState("Stage: ");
  const [showStyles, setShowStyles] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [showStyles2, setShowStyles2] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <>
      {!rules && !start && (
        <section className="home__page">
          <section className="homepage__inner">
            <div className="texts">
              <h1>Typing Game</h1>
              <h2>
                <span>React</span> Edition
              </h2>
            </div>
            <div className="buttons">
              <button
                className="start__game button"
                onClick={() => setStart(!start)}
              >
                Start Game
              </button>
              <button
                className="rules__button button"
                onClick={() => setRules(!rules)}
              >
                Check Rules
              </button>
            </div>
          </section>
        </section>
      )}
      {rules && (
        <section className="rules">
          <div className="rules__container">
            <h2>
              Rules of the <span>game</span>
            </h2>
            <p>
              In <span>Typing Game</span> you will have to collect as many
              points as you can. By the time you go to <span>next stage</span>{" "}
              and game gets harder. There are total of <span>7</span> rounds: 6{" "}
              <span>normal</span> ones and seventh <span>BOSS</span> round,
              where timer will be faster than any other round if you are good
              enough you will give try to beat <span>BOSS</span>. In every stage
              timer goes down quicker. <span>Good Luck!</span>
            </p>
            <button onClick={() => setRules(!rules)}>Back</button>
          </div>
        </section>
      )}
      {start && (
        <HomePageInfo.Provider
          value={{
            start,
            setStart,
            rules,
            setRules,
            scoreCount,
            setScoreCount,
            popupMenu,
            setPopupMenu,
            stageCount,
            setStageCount,
            stageShow,
            setStageShow,
            showStyles,
            setShowStyles,
            gameOver,
            setGameOver,
            gameWin,
            setGameWin,
            setShowStyles2,
            showStyles2,
            menu,
            setMenu,
          }}
        >
          <section className="game__page">
            <Header />
            <Game />
          </section>
        </HomePageInfo.Provider>
      )}{" "}
    </>
  );
}

export default HomePage;
