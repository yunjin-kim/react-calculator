import { useState, useEffect, useRef } from "react";
import "./App.css";
import { SCREEN } from "./constant";
import AllClearWrapper from "./containers/AllClearWrapper";
import DigitWrapper from "./containers/DigitWrapper";
import OperationWrapper from "./containers/OperationWrapper";

const handleBeforeunload = (event) => {
  event.preventDefault();
  event.returnValue = "";
};

const initCalculateInfo = {
  firstNumber: 0,
  secondNumber: "",
  operation: "",
}

const App = () => {
  const [calculateInfo, setCalculateInfo] = useState(initCalculateInfo);
  const [screenFont, setScreenFont] = useState("bigFont");
  const calculateScreenElement = useRef();

  const convertToLocaleString = (number) => number.toLocaleString("ko-KR");

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeunload);

    const localCalculateInfo = JSON.parse(localStorage.getItem("calculateInfo")) || initCalculateInfo;
    console.log(localCalculateInfo);
    setCalculateInfo(localCalculateInfo);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeunload);
    }
  }, []);

  useEffect(() => {
    calculateScreenElement.current.textContent.length > SCREEN.FONT_SIZE_SCALE_STANDARD
      ? setScreenFont(SCREEN.SMALL_FONT)
      : setScreenFont(SCREEN.BIG_FONT);

    const handleUnload = () => {
      localStorage.setItem("calculateInfo", JSON.stringify(calculateInfo));  
    }
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("unload", handleUnload);
    }
  }, [calculateInfo]);

  return (
    <>
      <div className="calculator">
        <h1 className={`total ${screenFont === SCREEN.BIG_FONT ? SCREEN.BIG_FONT : SCREEN.SMALL_FONT} `} ref={calculateScreenElement}>
          {convertToLocaleString(calculateInfo.secondNumber || calculateInfo.firstNumber)}
        </h1>
        <DigitWrapper
          calculateInfo={calculateInfo}
          setCalculateInfo={setCalculateInfo}
        />
        <AllClearWrapper
          setCalculateInfo={setCalculateInfo}
        />
        <OperationWrapper
          calculateInfo={calculateInfo}
          setCalculateInfo={setCalculateInfo}
        />
      </div>
    </>
  )
}

export default App;
