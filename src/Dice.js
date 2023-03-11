import React from "react";

export const Dice = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59e391" : "white",
  };
  return (
    <>
      <div className="dice-face" onClick={props.holdDice} style={styles}>
        <h2 className="die-num">{props.value}</h2>
      </div>
    </>
  );
};
