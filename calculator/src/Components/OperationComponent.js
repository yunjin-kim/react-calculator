import React, { useCallback } from "react";
import { EXPONENTIAL_LIMIT_POINT, SCREEN } from "../constant";

const OperationComponent = ({ calculateInfo, setCalculateInfo }) => {
  const calculateResultNumber = () => {
    const firstNumber = Number(calculateInfo.firstNumber);
    const secondNumber = Number(calculateInfo.secondNumber);
    const calculateMethod = {
      X: firstNumber * secondNumber,
      "/": firstNumber / secondNumber,
      "+": firstNumber + secondNumber,
      "-": firstNumber - secondNumber,
    };

    return calculateMethod[calculateInfo.operation] || firstNumber;
  };

  const generateResultNumber = (number) => {
    if (
      String(number).length > SCREEN.MAX_TEXT_LENGTH
    ) {
      return number.toExponential(EXPONENTIAL_LIMIT_POINT);
    }

    if (Number.isFinite(number)) {
      return number;
    }

    return SCREEN.ERROR_MESSAGE;
  }

  const canCalculate = (target) => {
    return (
      target.textContent === "=" && calculateInfo.secondNumber !== ""
    );
  }

  const handleOperationButton = ({ target }) => {
    if (target.textContent === calculateInfo.operation) {
      return;
    }

    if (canCalculate(target)) {
      const resultNumber = calculateResultNumber();

      setCalculateInfo({
        firstNumber: generateResultNumber(resultNumber),
        secondNumber: "",
        operation: "",
      })

      return;
    }

    setCalculateInfo({ ...calculateInfo, operation: target.textContent })
  };

  return (
    <>
      <div className="operations subgrid" onClick={handleOperationButton}>
        <button
          className={
            calculateInfo.operation === "/"
              ? "operation--focused"
              : "operation"
          }
        >
          /
        </button>
        <button
          className={
            calculateInfo.operation === "X"
              ? "operation--focused"
              : "operation"
          }
        >
          X
        </button>
        <button
          className={
            calculateInfo.operation === "-"
              ? "operation--focused"
              : "operation"
          }
        >
          -
        </button>
        <button
          className={
            calculateInfo.operation === "+"
              ? "operation--focused"
              : "operation"
          }
        >
          +
        </button>
        <button className="operation">=</button>
      </div>
    </>
  )
}

export default OperationComponent;
