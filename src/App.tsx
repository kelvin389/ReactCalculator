import { useState } from "react";
import "./App.css";

function App() {
    const numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const operations: string[] = ["+", "-", "*", "/"];
    const [screenValue, setScreenValue] = useState<number>(0);

    const [prevValue, setPrevValue] = useState<number>(0);
    const [op, setOp] = useState<string>("");
    const [createNewNumber, setCreateNewNumber] = useState<boolean>(true);

    function appendToScreen(num: number): void {
        if (createNewNumber) {
            setScreenValue(num);
            setCreateNewNumber(false);
        } else {
            const newNum = parseInt(screenValue.toString() + num.toString());
            setScreenValue(newNum);
        }
    }

    function clearScreen(): void {
        setScreenValue(0);
    }

    function clearAll(): void {
        setPrevValue(0);
        clearScreen();
    }

    function beginCalculation(op: string): void {
        setOp(op);
        setPrevValue(screenValue);
        setCreateNewNumber(true);
    }

    function evaluate(): void {
        let result: number;

        switch (op) {
            case "+":
                result = prevValue + screenValue;
                break;
            case "-":
                result = prevValue - screenValue;
                break;
            case "*":
                result = prevValue * screenValue;
                break;
            case "/":
                result = prevValue / screenValue;
                break;
            default:
                result = 0;
                console.log("error evaluating");
                break;
        }

        setCreateNewNumber(true);
        setScreenValue(result);
    }

    return (
        <div>
            <div>
                <h1 className="screen">{screenValue}</h1>
            </div>
            <div>
                <button className="square-button" onClick={clearAll}>CA</button>
                <button className="square-button" onClick={clearScreen}>C</button>
                <br />
                <div className="numbers-container">
                    {numbers.map((num) => (
                        <button
                            className="square-button"
                            key={num}
                            onClick={() => appendToScreen(num)}
                        >
                            {num}
                        </button>
                    ))}
                </div>
                <br />
                {operations.map((op) => (
                    <button className="square-button" key={op} onClick={() => beginCalculation(op)}>
                        {op}
                    </button>
                ))}
                <br />
                <button className="square-button" onClick={evaluate}>=</button>
            </div>

            <div>
                {prevValue}
                <br />
                {op}
                <br />
                {createNewNumber.toString()}
            </div>
        </div>
    );
}

export default App;
