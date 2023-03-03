import React, { useContext, useEffect } from "react";
import { HomePageInfo } from "./HomePage";

function Header() {
  const source = useContext(HomePageInfo);

  function handleClick() {
    source.setPopupMenu(!source.popupMenu);
    source.setStart(false);
    source.setScoreCount(0);
    source.setStageCount(1);
  }

  return (
    <header className="game__header">
      <nav className="game__nav">
        <h3>Score: {source.scoreCount}</h3>
        <i className="fa-solid fa-house house" onClick={handleClick}></i>
        <h3>Stage: {source.stageCount}</h3>
      </nav>
    </header>
  );
}

export default Header;
