// component: TheBar

// import { useEffect } from "react";
import "../App.css";

interface Props{
    wins: number;
    handleReset(): void;
}

// using props.shit bloats the code, so im destructuring...
const TheBar: React.FC<Props> = ({ wins, handleReset }) => {
  // useEffect(() => {
  //   document.title = "WINS: " + wins;
  // }, [wins]);

  return (
    <header className="header">
      <h3>WINS: {wins}</h3>
      <h2>MEMENTO</h2>
      <button onClick={handleReset}>RESET</button>
    </header>
  );
};

export default TheBar;
