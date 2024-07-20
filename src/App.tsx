import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import appLogo from "/favicon.svg";
import PWABadge from "./PWABadge.tsx";
import "./App.css";
import Cards from "./components/Cards.tsx";
import TheBar from "./components/TheBar.tsx";
import shuffle from "./utilities/shuffle.ts";
import useAppBadge from "./hooks/useAppBadge.ts";

interface Card {
  id: number;
  image: string;
  matched?: boolean;
}

const App: React.FC = () => {
  const [cards, setCards] = useState(shuffle); // Shuffled stated cards array from assets
  const [firstPick, setFirstPick] = useState<Card | null>(null);
  const [secondPick, setSecondPick] = useState<Card | null>(null);
  const [intentionalDelay, setIntentionalDelay] = useState(false); // Intentional Delay
  const [wins, setWins] = useState(0);
  const [setBadge, clearBadge] = useAppBadge(); // app badge for installed PWAs

  // handle click, primary logic
  function handleClick(card: Card) {
    if (!intentionalDelay) {
      firstPick ? setSecondPick(card) : setFirstPick(card);
    }
  }

  // handle turn, reset picks, and intentional delay...
  function handleFlip() {
    setFirstPick(null);
    setSecondPick(null);
    setIntentionalDelay(false);
  }

  // reset
  function handleReset() {
    clearBadge();
    setWins(0);
    handleFlip();
    setCards(shuffle);
  }

  // game logic
  useEffect(() => {
    let timer: number;

    if (firstPick && secondPick) {
      // console.log(firstPick, secondPick)
      if ((firstPick as Card).image === (secondPick as Card).image) {
        // console.log(firstPick.image, secondPick.image)
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === (firstPick as Card).image) {
              // console.log(card)
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        handleFlip();
      } else {
        setIntentionalDelay(true); // for testing
        // delay between selections
        timer = setTimeout(() => {
          handleFlip();
        }, 1000);
      }
    }

    // cleanup
    return () => {
      clearTimeout(timer);
    };
  }, [cards, firstPick, secondPick]);

  // winDef
  useEffect(() => {
    const winDef = cards.filter((card) => !(card as Card).matched);

    if (cards.length && winDef.length < 1) {
      setWins((wins) => ++wins);
      handleFlip();
      setBadge();
      setCards(shuffle);
      console.log("WINS:", wins);
      // console.log('cards length:', cards.length)
      // console.log('winDef:', winDef.length)
      // console.log('cards:', cards)
    }
  }, [cards, wins, setBadge]);

  return (
    <>
      <div>
        <TheBar handleReset={handleReset} wins={wins}></TheBar>

        <div className="grid">
          {cards.map((card) => {
            const { image, id, matched = false } = card as Card;

            // Rather than returning a div, we return a Card component...
            return (
              <Cards
                key={id}
                image={image}
                selected={card === firstPick || card === secondPick || matched ? "selected" : ""}
                onClick={() => handleClick(card)}
                matched={matched}
              ></Cards>
            );
          })}
        </div>
      </div>
      {/* <footer className="white-80 mt5">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={appLogo} className="logo" alt="animalFarm logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <small>&copy; Copyright 2024, Starboy Inc.</small>
      </footer> */}

      <PWABadge />
      {useEffect(() => {
        // console.log("Welcome to MEMENTO: The House Of Cards.)")
        // console.log("MEMENTO WINS:", wins);
      }, [wins])}
    </>
  );
};

export default App;
