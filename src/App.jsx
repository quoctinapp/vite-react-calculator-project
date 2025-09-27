import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState(""); 
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setExpression(expression + num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
      setExpression(expression + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setExpression(expression + "0.");
      setWaitingForOperand(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
      setExpression(expression + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setExpression("");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
    setExpression(expression + " " + nextOperation + " ");
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(parseFloat(newValue.toFixed(9))));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
      setExpression(""); 
    }
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "−":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-90">

        <div className="mb-4 p-4 bg-gray-200 text-right text-2xl font-mono rounded-lg h-16 flex items-center justify-end overflow-x-auto">
          {expression || display}
        </div>

        <div className="grid grid-cols-4 gap-3">
          <button 
            className="col-span-2 bg-red-400 text-white text-xl font-semibold rounded-lg h-14 hover:bg-red-500 transition cursor-pointer"
            onClick={clear}
          >
            Delete
          </button>
          <button 
            className="bg-blue-400 text-white text-xl font-semibold rounded-lg h-14 hover:bg-blue-500 transition cursor-pointer"
            onClick={() => performOperation("÷")}
          >
            ÷
          </button>
          <button 
            className="bg-blue-400 text-white text-xl font-semibold rounded-lg h-14 hover:bg-blue-500 transition cursor-pointer"
            onClick={() => performOperation("×")}
          >
            ×
          </button>

          {[7, 8, 9].map((num) => (
            <button
              key={num}
              className="bg-gray-200 text-xl font-semibold rounded-lg h-14 hover:bg-gray-300 transition cursor-pointer"
              onClick={() => inputNumber(num)}
            >
              {num}
            </button>
          ))}
          <button 
            className="bg-blue-400 text-white text-xl font-semibold rounded-lg h-14 hover:bg-blue-500 transition cursor-pointer"
            onClick={() => performOperation("−")}
          >
            −
          </button>

          {[4, 5, 6].map((num) => (
            <button
              key={num}
              className="bg-gray-200 text-xl font-semibold rounded-lg h-14 hover:bg-gray-300 transition cursor-pointer"
              onClick={() => inputNumber(num)}
            >
              {num}
            </button>
          ))}
          <button 
            className="bg-blue-400 text-white text-xl font-semibold rounded-lg h-14 hover:bg-blue-500 transition cursor-pointer"
            onClick={() => performOperation("+")}
          >
            +
          </button>

          {[1, 2, 3].map((num) => (
            <button
              key={num}
              className="bg-gray-200 text-xl font-semibold rounded-lg h-14 hover:bg-gray-300 transition cursor-pointer"
              onClick={() => inputNumber(num)}
            >
              {num}
            </button>
          ))}
          <button 
            className="row-span-2 bg-green-500 text-white text-xl font-semibold rounded-lg h-full hover:bg-green-600 transition cursor-pointer"
            onClick={performCalculation}
          >
            =
          </button>

          <button 
            className="col-span-2 bg-gray-200 text-xl font-semibold rounded-lg h-14 hover:bg-gray-300 transition cursor-pointer"
            onClick={() => inputNumber(0)}
          >
            0
          </button>
          <button 
            className="bg-gray-200 text-xl font-semibold rounded-lg h-14 hover:bg-gray-300 transition cursor-pointer"
            onClick={inputDecimal}
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
