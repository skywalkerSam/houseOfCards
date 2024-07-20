// component: Cards

import starboyLogo from "/logo.png";
import "../App.css";

interface Props {
  selected: string;
  image: string;
  matched: boolean;
  onClick(): void;
}

const Cards: React.FC<Props> = ({ selected, image, onClick }) => {
  return (
    <div className="card">
      {/* 
                    pass className={condition ? value : undefined} instead. 
                */}
      <div className={selected && "selected"}>
        <img src={image} alt="Card Front" className="card-face" />

        <img
          src={starboyLogo}
          alt="Logo"
          className="card-back"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default Cards;
