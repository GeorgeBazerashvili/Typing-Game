import React, { useContext } from "react";
import { HomePageInfo } from "./HomePage";
import "../App.css";

function Header() {
  const source = useContext(HomePageInfo);

  const handleClick = () => {
    source.setMenu((previous) => !previous);
  };

  return (
    <header
      className="game__header"
      style={
        source.gameOver || source.gameWin
          ? { display: "none" }
          : { display: "flex" }
      }
    >
      <nav className="game__nav">
        <h3 className="h3__first">Score: {source.scoreCount}</h3>
        <i className="fa-solid fa-house house" onClick={handleClick}></i>
        <h3 className="h3__second">
          {source.stageShow} {source.stageCount}
        </h3>
      </nav>
    </header>
  );
}

export default Header;
