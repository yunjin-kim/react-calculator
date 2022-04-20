import React, { Component } from "react";

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

      if (String(resultNumber).length > 10) {
        this.props.setCalculateInfo({
          firstNumber: Number.isFinite(resultNumber)
            ? resultNumber.toExponential(3)
            : "오류",
          operation: "",
          secondNumber: "",
        });

        return;
      }

      this.props.setCalculateInfo({
        firstNumber: Number.isFinite(resultNumber) ? resultNumber : "오류",
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
