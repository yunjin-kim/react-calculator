import "./App.css";
import React, { Component, createRef } from "react";

window.onbeforeunload = () => {
  return 0;
};

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      firstNumber: 0,
      operation: "",
      secondNumber: "",
    };

    this.calculateScreenElement = createRef();
  }

  handleDigitButton = ({ target }) => {
    if (
      this.calculateScreenElement.current.textContent.length > 11 &&
      this.state.operation === ""
    ) {
      return;
    }

    if (this.state.operation) {
      const prevNumber = this.state.secondNumber;

      this.setState({
        secondNumber: Number(prevNumber + target.textContent),
      });

      return;
    }

    const prevNumber = this.state.firstNumber;

    this.setState({
      firstNumber: !isNaN(prevNumber)
        ? Number(prevNumber + target.textContent)
        : target.textContent,
    });
  };

  handleOperationButton = ({ target }) => {
    if (target.textContent === "=" && this.state.secondNumber !== "") {
      const resultNumber = this.calculateResultNumber();

      if (String(resultNumber).length > 10) {
        this.setState({
          firstNumber: Number.isFinite(resultNumber)
            ? resultNumber.toExponential(3)
            : "오류",
          operation: "",
          secondNumber: "",
        });

        return;
      }

      this.setState({
        firstNumber: Number.isFinite(resultNumber) ? resultNumber : "오류",
        operation: "",
        secondNumber: "",
      });

      return;
    }

    this.setState({
      operation: target.textContent,
    });
  };

  handleAllClear = () => {
    this.setState({
      firstNumber: 0,
      operation: "",
      secondNumber: "",
    });
  };

  calculateResultNumber = () => {
    const firstNumber = Number(this.state.firstNumber);
    const secondNumber = Number(this.state.secondNumber);
    const calculateMethod = {
      X: firstNumber * secondNumber,
      "/": firstNumber / secondNumber,
      "+": firstNumber + secondNumber,
      "-": firstNumber - secondNumber,
    };

    return calculateMethod[this.state.operation] || firstNumber;
  };

  convertToLocaleString = (number) => number.toLocaleString("ko-KR");

  componentDidMount() {
    const calculateInfo = JSON.parse(localStorage.getItem("calculateInfo"));

    this.setState(calculateInfo);
  }

  componentDidUpdate() {
    console.log(this.state);
    const calculateScreenElement = this.calculateScreenElement.current;

    calculateScreenElement.textContent = this.convertToLocaleString(
      this.state.secondNumber === ""
        ? this.state.firstNumber
        : this.state.secondNumber
    );

    calculateScreenElement.textContent.length > 7
      ? (calculateScreenElement.style.fontSize = "3rem")
      : (calculateScreenElement.style.fontSize = "4rem");

    localStorage.setItem("calculateInfo", JSON.stringify(this.state));
  }

  render() {
    return (
      <div className="app">
        <div className="calculator">
          <h1 className="total" ref={this.calculateScreenElement}>
            0
          </h1>
          <div className="digits flex" onClick={this.handleDigitButton}>
            <button className="digit">9</button>
            <button className="digit">8</button>
            <button className="digit">7</button>
            <button className="digit">6</button>
            <button className="digit">5</button>
            <button className="digit">4</button>
            <button className="digit">3</button>
            <button className="digit">2</button>
            <button className="digit">1</button>
            <button className="digit">0</button>
          </div>
          <div className="modifiers subgrid">
            <button className="modifier" onClick={this.handleAllClear}>
              AC
            </button>
          </div>
          <div
            className="operations subgrid"
            onClick={this.handleOperationButton}
          >
            <button
              className={
                this.state.operation === "/"
                  ? "operation--focused"
                  : "operation"
              }
            >
              /
            </button>
            <button
              className={
                this.state.operation === "X"
                  ? "operation--focused"
                  : "operation"
              }
            >
              X
            </button>
            <button
              className={
                this.state.operation === "-"
                  ? "operation--focused"
                  : "operation"
              }
            >
              -
            </button>
            <button
              className={
                this.state.operation === "+"
                  ? "operation--focused"
                  : "operation"
              }
            >
              +
            </button>
            <button className="operation">=</button>
          </div>
        </div>
      </div>
    );
  }
}
