import { useState } from "react";

export default function Calculator() {
  const defaultCalculatorData = {
    firstOperand: "0",
    operation: "",
    secondOperand: "0",
    result: "0",
  };

  const [calculatorData, setCalculatorData] = useState(defaultCalculatorData);

  function handleClickNumber(number) {
    const { operation, result } = calculatorData;
    const patternInt = /^(-?)0*/;
    const patternFloat = /^(-?)0*(?=0\.)/;

    if (result !== "0") {
      setCalculatorData((oldCalculatorData) => ({
        ...oldCalculatorData,
        result: "0",
      }));
    }

    if (operation) {
      setCalculatorData((oldCalculatorData) => {
        const oldSecondOperand = oldCalculatorData.secondOperand;
        return {
          ...oldCalculatorData,
          secondOperand:
            oldSecondOperand.replace(
              oldSecondOperand.includes(".") ? patternFloat : patternInt,
              "$1"
            ) + number,
        };
      });
    } else {
      setCalculatorData((oldCalculatorData) => {
        const oldFirstOperand = oldCalculatorData.firstOperand;
        return {
          ...oldCalculatorData,
          firstOperand:
            oldFirstOperand.replace(
              oldFirstOperand.includes(".") ? patternFloat : patternInt,
              "$1"
            ) + number,
        };
      });
    }
  }

  function handleClickFloatingPoint() {
    const { firstOperand, secondOperand, operation } = calculatorData;

    if (operation) {
      if (secondOperand.includes(".")) return;
      else if (!secondOperand.includes(".")) {
        setCalculatorData((oldCalculatorData) => ({
          ...oldCalculatorData,
          secondOperand: oldCalculatorData.secondOperand + ".",
        }));
      }
    } else {
      if (firstOperand.includes(".")) return;
      else if (!firstOperand.includes(".")) {
        setCalculatorData((oldCalculatorData) => ({
          ...oldCalculatorData,
          firstOperand: oldCalculatorData.firstOperand + ".",
        }));
      }
    }
  }

  function handleClickOperation(operation) {
    const { secondOperand, result } = calculatorData;

    if (result !== "0") {
      setCalculatorData((oldCalculatorData) => ({
        ...oldCalculatorData,
        firstOperand: oldCalculatorData.result,
        result: "0",
      }));
    }

    if (secondOperand === "0") {
      setCalculatorData((oldCalculatorData) => ({
        ...oldCalculatorData,
        operation: operation,
      }));
    }
  }

  function handleClickEqual() {
    const { firstOperand, operation, secondOperand } = calculatorData;
    // Check if one of the operand is floating point number (default is int)
    let firstOperandNumber = parseInt(firstOperand);
    let secondOperandNumber = parseInt(secondOperand);

    if (firstOperand.includes(".") || secondOperand.includes(".")) {
      firstOperandNumber = parseFloat(firstOperand);
      secondOperandNumber = parseFloat(secondOperand);
    }

    if (operation === "+") {
      const result = (firstOperandNumber + secondOperandNumber).toString();
      setCalculatorData({
        firstOperand: "0",
        operation: "",
        secondOperand: "0",
        result: result,
      });
    } else if (operation === "-") {
      const result = (firstOperandNumber - secondOperandNumber).toString();
      setCalculatorData({
        firstOperand: "0",
        operation: "",
        secondOperand: "0",
        result: result,
      });
    } else if (operation === "x") {
      const result = (firstOperandNumber * secondOperandNumber).toString();
      setCalculatorData({
        firstOperand: "0",
        operation: "",
        secondOperand: "0",
        result: result,
      });
    } else if (operation === "/") {
      const result = (firstOperandNumber / secondOperandNumber).toString();
      setCalculatorData({
        firstOperand: "0",
        operation: "",
        secondOperand: "0",
        result: result,
      });
    }
  }

  function handleClickReset() {
    setCalculatorData(defaultCalculatorData);
  }

  function handleClickDelete() {
    const { firstOperand, secondOperand } = calculatorData;

    if (secondOperand !== "0") {
      setCalculatorData((oldCalculatorData) => {
        const oldSecondOperand = oldCalculatorData.secondOperand;
        return {
          ...oldCalculatorData,
          secondOperand: !oldSecondOperand.includes(".")
            ? oldSecondOperand.slice(0, oldSecondOperand.length - 1) || "0"
            : oldSecondOperand.slice(0, oldSecondOperand.length - 1) || "0",
        };
      });
    } else if (firstOperand !== "0") {
      setCalculatorData((oldCalculatorData) => {
        const oldFirstOperand = oldCalculatorData.firstOperand;
        return {
          ...oldCalculatorData,
          operation: "",
          firstOperand: !oldFirstOperand.includes(".")
            ? oldFirstOperand.slice(0, oldFirstOperand.length - 1) || "0"
            : oldFirstOperand.slice(0, oldFirstOperand.length - 1) || "0",
        };
      });
    }
  }

  function handleClickNegative() {
    const { firstOperand, operation, secondOperand, result } = calculatorData;

    if (result !== "0") {
      handleClickOperation("-");
    } else {
      if (operation && secondOperand === "0") {
        setCalculatorData((oldCalculatorData) => ({
          ...oldCalculatorData,
          secondOperand: "-0",
        }));
      } else if (firstOperand === "0") {
        setCalculatorData((oldCalculatorData) => ({
          ...oldCalculatorData,
          firstOperand: "-0",
        }));
      } else {
        handleClickOperation("-");
      }
    }
  }

  console.log(calculatorData);

  return (
    <div className="calculator">
      <div className="calculator__display">
        {calculatorData.result !== "0"
          ? calculatorData.result
          : calculatorData.secondOperand !== "0"
          ? calculatorData.secondOperand
          : calculatorData.firstOperand}
      </div>
      <div className="calculator__buttons">
        <button
          className="calculator__button calculator__button--number"
          onClick={() => {
            handleClickNumber("7");
          }}
        >
          7
        </button>
        <button
          className="calculator__button calculator__button--number"
          onClick={() => {
            handleClickNumber("8");
          }}
        >
          8
        </button>
        <button
          className="calculator__button calculator__button--number"
          onClick={() => {
            handleClickNumber("9");
          }}
        >
          9
        </button>
        <button
          className="calculator__button calculator__button--del"
          onClick={handleClickDelete}
        >
          DEL
        </button>
        <button
          className="calculator__button calculator__button--number"
          onClick={() => {
            handleClickNumber("4");
          }}
        >
          4
        </button>
        <button
          className="calculator__button calculator__button--number"
          onClick={() => {
            handleClickNumber("5");
          }}
        >
          5
        </button>
        <button
          className="calculator__button calculator__button--number"
          onClick={() => {
            handleClickNumber("6");
          }}
        >
          6
        </button>
        <button
          className="calculator__button calculator__button--operation"
          onClick={() => {
            handleClickOperation("+");
          }}
        >
          +
        </button>
        <button
          className="calculator__button calculator__button--number"
          onClick={() => {
            handleClickNumber("1");
          }}
        >
          1
        </button>
        <button
          className="calculator__button calculator__button--number"
          onClick={() => {
            handleClickNumber("2");
          }}
        >
          2
        </button>
        <button
          className="calculator__button calculator__button--number"
          onClick={() => {
            handleClickNumber("3");
          }}
        >
          3
        </button>
        <button
          className="calculator__button calculator__button--operation"
          onClick={() => {
            handleClickNegative();
          }}
        >
          -
        </button>
        <button
          className="calculator__button calculator__button--operation"
          onClick={handleClickFloatingPoint}
        >
          .
        </button>
        <button
          className="calculator__button calculator__button--number"
          onClick={() => {
            handleClickNumber("0");
          }}
        >
          0
        </button>
        <button
          className="calculator__button calculator__button--operation"
          onClick={() => {
            handleClickOperation("/");
          }}
        >
          /
        </button>
        <button
          className="calculator__button calculator__button--operation"
          onClick={() => {
            handleClickOperation("x");
          }}
        >
          x
        </button>
        <button
          className="calculator__button calculator__button--reset"
          onClick={handleClickReset}
        >
          RESET
        </button>
        <button
          className="calculator__button calculator__button--equal"
          onClick={handleClickEqual}
        >
          =
        </button>
      </div>
    </div>
  );
}
