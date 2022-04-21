import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import DigitComponent from "./Components/DigitComponent";
import OperationComponent from "./Components/OperationComponent";
import AllClearComponent from "./Components/AllClearComponent";
import { SCREEN } from "./constant";

window.onbeforeunload = () => {
  return 0;
};

const App = () => {
  const [calculateInfo, setCalculateInfo] = useState({
    firstNumber: 0,
    secondNumber: "",
    operation: "",
  });
  const calculateScreenElement = useRef();

  const convertToLocaleString = (number) => number.toLocaleString("ko-KR");

  useEffect(() => {
    const calculateInfo = JSON.parse(localStorage.getItem("calculateInfo")) || {
      firstNumber: 0,
      secondNumber: "",
      operation: "",
    };

    setCalculateInfo(calculateInfo);
  }, []);


  useEffect(() => {
    calculateScreenElement.current.textContent = convertToLocaleString(
      calculateInfo.secondNumber === ""
        ? calculateInfo.firstNumber
        : calculateInfo.secondNumber);


    calculateScreenElement.current.textContent.length > SCREEN.FONT_SIZE_SCALE_STANDARD
      ? (calculateScreenElement.current.style.fontSize = "3rem")
      : (calculateScreenElement.current.style.fontSize = "4rem");

    localStorage.setItem("calculateInfo", JSON.stringify(calculateInfo));
  }, [calculateInfo]);

  return (
    <>
      <div className="calculator">
        <h1 className="total" ref={calculateScreenElement}>
          0
        </h1>
        <DigitComponent
          calculateInfo={calculateInfo}
          setCalculateInfo={setCalculateInfo}
        />
        <AllClearComponent
          setCalculateInfo={setCalculateInfo}
        />
        <OperationComponent
          calculateInfo={calculateInfo}
          setCalculateInfo={setCalculateInfo}
        />
      </div>
    </>
  )
}

export default App;
