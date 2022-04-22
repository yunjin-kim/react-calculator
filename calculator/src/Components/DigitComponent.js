import { SCREEN } from "../constant";

const DigitComponent = ({ calculateInfo, setCalculateInfo }) => {
  const handleDigitButton = ({ target }) => {
    if (
      String(calculateInfo.firstNumber).length >=
        SCREEN.MAX_TEXT_LENGTH &&
      calculateInfo.operation === ""
    ) {
      return;
    }

    if (
      String(calculateInfo.secondNumber).length >=
      SCREEN.MAX_TEXT_LENGTH
    ) {
      return;
    }

    if (calculateInfo.operation) {
      const prevNumber = calculateInfo.secondNumber;

      setCalculateInfo({ ...calculateInfo, secondNumber: Number(prevNumber + target.textContent) });

      return;
    }

    const prevNumber = calculateInfo.firstNumber;
    const editFirstNumber = isNaN(prevNumber)
        ? target.textContent
        : Number(prevNumber + target.textContent);

    setCalculateInfo({ ...calculateInfo, firstNumber: editFirstNumber });
  }

  return (
    <>
      <div className="digits flex" onClick={handleDigitButton}>
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
    </>
  )
}

export default DigitComponent;
