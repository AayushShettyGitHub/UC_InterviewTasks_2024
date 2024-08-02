import { useState } from 'react'
import './App.css'
const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [expression, setExpression] = useState('');
  const [mode, setMode] = useState(false); 

  const Functional = {
    sin: "Math.sin",
    cos: "Math.cos",
    tan: "Math.tan",
    ln: "Math.log",
    log: "Math.log10",
    π: "Math.PI",
    e: "Math.E",
    "^": "**",
    "√": "Math.sqrt",
  };

  const handleButtonClick = (value) => {
    if (value === "AC") {
      setDisplay('');
      setExpression('');
    } else if (value === '=') {
      calculate();
    } else if (value === 'X') {
      let newDisplay = display;
      let newExpression = expression;

      for (const i in Functional) {
        if (display.endsWith(i + '(')) {
          newDisplay = display.slice(0, -i.length - 1);
          newExpression = expression.slice(0, -Functional[i].length - 1);
          break;
        }
      }

      if (newDisplay === display) {
        newDisplay = display.slice(0, -1);
        newExpression = expression.slice(0, -1);
      }

      setDisplay(newDisplay);
      setExpression(newExpression);

    } else if (Functional.hasOwnProperty(value)) {
      if (value === 'π' || value === 'e') {
        setDisplay(display + value);
        setExpression(expression + Functional[value]);
      }
       else {
        setDisplay(display + value + '(');
        setExpression(expression + Functional[value] + '(');
      }
    } 
    else {
      setExpression(expression + value);
      setDisplay(display + value);
    }
  };

  const calculate = () => {
    try {
      console.log(expression);
      const result = eval(expression); 
      setDisplay(result.toString());
      setExpression(result.toString());
    } catch (error) {
      setDisplay('Error');
      setExpression('');
    }
  };

  return (
    <div className="calculator">
      <input type="text" value={display} readOnly className="display" />
      <div className="buttonBox">
        <button onClick={() => handleButtonClick('1')} className="button">1</button>
        <button onClick={() => handleButtonClick('2')} className="button">2</button>
        <button onClick={() => handleButtonClick('3')} className="button">3</button>
        <button onClick={() => handleButtonClick('+')} className="orangeButton">+</button>
        <button onClick={() => handleButtonClick('4')} className="button">4</button>
        <button onClick={() => handleButtonClick('5')} className="button">5</button>
        <button onClick={() => handleButtonClick('6')} className="button">6</button>
        <button onClick={() => handleButtonClick('-')} className="orangeButton">-</button>
        <button onClick={() => handleButtonClick('7')} className="button">7</button>
        <button onClick={() => handleButtonClick('8')} className="button">8</button>
        <button onClick={() => handleButtonClick('9')} className="button">9</button>
        <button onClick={() => handleButtonClick('*')} className="orangeButton">*</button>
        <button onClick={() => handleButtonClick('0')} className="button">0</button>
        <button onClick={() => handleButtonClick('.')} className="button">.</button>
        <button onClick={() => handleButtonClick('X')} className="button">X</button>
        <button onClick={() => handleButtonClick('/')} className="orangeButton">/</button>
        <button onClick={() => handleButtonClick('=')} className="orangeButton">=</button>
        <button onClick={() => handleButtonClick('AC')} className="buttonDoubleOrange">AC</button>
        <button onClick={() => handleButtonClick('%')} className="orangeButton">%</button>

        
        <button onClick={() => setMode(!mode)} className="buttonDouble">Switch</button>
        <button onClick={() => handleButtonClick('e')} className="button">e</button>
        <button onClick={() => handleButtonClick('π')} className="button">π</button>

        {mode && (
          <>
            <button onClick={() => handleButtonClick('sin')} className="button">sin</button>
            <button onClick={() => handleButtonClick('cos')} className="button">cos</button>
            <button onClick={() => handleButtonClick('tan')} className="button">tan</button>
            <button onClick={() => handleButtonClick('log')} className="button">log</button>
            <button onClick={() => handleButtonClick('√')} className="orangeButton">√</button>
            <button onClick={() => handleButtonClick('^')} className="orangeButton">^</button>
            <button onClick={() => handleButtonClick('(')} className="orangeButton">(</button>
            <button onClick={() => handleButtonClick(')')} className="orangeButton">)</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Calculator;


