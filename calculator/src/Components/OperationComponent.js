import React, { Component } from "react";

import { EXPONENTIAL_LIMIT_POINT, SCREEN } from "../constant";

export default class OperationComponent extends Component {
  calculateResultNumber = () => {
    const firstNumber = Number(this.props.calculateInfo.firstNumber);
    const secondNumber = Number(this.props.calculateInfo.secondNumber);
    const calculateMethod = {
      X: firstNumber * secondNumber,
      "/": firstNumber / secondNumber,
      "+": firstNumber + secondNumber,
      "-": firstNumber - secondNumber,
    };

    return calculateMethod[this.props.calculateInfo.operation] || firstNumber;
  };

  handleOperationButton = ({ target }) => {
    if (
      target.textContent === "=" &&
      this.props.calculateInfo.secondNumber !== ""
    ) {
      const resultNumber = this.calculateResultNumber();

      if (String(resultNumber).length > SCREEN.MAX_TEXT_LENGTH) {
        this.props.setCalculateInfo({
          firstNumber: Number.isFinite(resultNumber)
            ? resultNumber.toExponential(EXPONENTIAL_LIMIT_POINT)
            : SCREEN.ERROR_MESSAGE,
          operation: "",
          secondNumber: "",
        });

        return;
      }

      this.props.setCalculateInfo({
        firstNumber: Number.isFinite(resultNumber)
          ? resultNumber
          : SCREEN.ERROR_MESSAGE,
        operation: "",
        secondNumber: "",
      });

      return;
    }

    this.props.setCalculateInfo({
      operation: target.textContent,
    });
  };

  render() {
    return (
      <div className="operations subgrid" onClick={this.handleOperationButton}>
        <button
          className={
            this.props.calculateInfo.operation === "/"
              ? "operation--focused"
              : "operation"
          }
        >
          /
        </button>
        <button
          className={
            this.props.calculateInfo.operation === "X"
              ? "operation--focused"
              : "operation"
          }
        >
          X
        </button>
        <button
          className={
            this.props.calculateInfo.operation === "-"
              ? "operation--focused"
              : "operation"
          }
        >
          -
        </button>
        <button
          className={
            this.props.calculateInfo.operation === "+"
              ? "operation--focused"
              : "operation"
          }
        >
          +
        </button>
        <button className="operation">=</button>
      </div>
    );
  }
}
