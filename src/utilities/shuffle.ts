// utility: shuffle
import tsLogo from "../assets/ts.png";
import jsLogo from "../assets/js.png";
import reactLogo from "../assets/react.png";
import nodeLogo from "../assets/node.png";
// import goLogo from "../assets/go.png";
// import sqlLogo from "../assets/sql.png";
import stackOverFlow from "../assets/stackOverFlow.png";
import firebaseLogo from "../assets/firebase.png";
// import nextLogo from "../assets/next.png";
// import reactSvg from "../assets/react.svg";
// import jsxLogo from "../assets/jsx.png";
// import fireshipLogo from "../assets/fireship.png";
// import flutterLogo from "../assets/flutter.png";
import htmlLogo from "../assets/html.png";
import cssLogo from "../assets/css.png";
// import jqueryLogo from "../assets/jquery.png";
// import dartLogo from "../assets/dart.png";
// import rustLogo from "../assets/rust.png";

const shuffle = () => {
  const assets = [
    { image: tsLogo },
    { image: jsLogo },
    { image: reactLogo },
    { image: nodeLogo },
    { image: cssLogo },
    { image: htmlLogo },
    { image: firebaseLogo },
    { image: stackOverFlow },
  ];
  // Duplicating the array [1, 2, 3, 1, 2, 3]
  return (
    //TODO: Fisher-Yates (also known as Knuth) shuffle algorithm.
    [...assets, ...assets]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
  );
};

export default shuffle;
