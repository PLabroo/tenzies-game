import React from "react";
import { Dice } from "./Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

// ADD nanoid package for key inside child comp

const App = () => {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allValue) {
      setTenzies(true);
    }
  }, [dice]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    // console.log(newDice);
    return newDice;
  }

  const holdDice = (id) => {
    setDice(
      dice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
    // console.log(dice);
  };

  const diceElements = dice.map((die) => (
    <Dice
      key={die.id}
      isHeld={die.isHeld}
      value={die.value}
      holdDice={() => holdDice(die.id)}
    />
  ));

  const rollDice = () => {
    if (!tenzies) {
      setDice(
        dice.map((die) => {
          return die.isHeld !== true
            ? {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid(),
              }
            : die;
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  };
  return (
    <>
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="dice-roll" onClick={rollDice}>
          {tenzies ? "RESTART" : "ROLL"}
        </button>
      </main>
    </>
  );
};

export default App;
