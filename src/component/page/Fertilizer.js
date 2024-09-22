import React, { useState } from 'react';

function ExpressionCalculator() {
  // State to handle inputs
  const [x1, setX1] = useState('');
  const [x2, setX2] = useState('');
  const [x3, setX3] = useState('');
  const [y, setY] = useState('');
  const [result, setResult] = useState(null);

  // Functions to compute expressions
  const computeExpression = (x, y) => Math.round(((x / y) / 50) / 2 * 100) / 100;

  const computeExpressionWithX = (x, y, xi) => Math.round((((x - xi) / y) / 50) / 2 * 100) / 100;

  const computeExpressionWithXs = (x, y, xi, xj) => Math.round((((x - xi - xj) / y) / 50) / 2 * 100) / 100;

  const computeExpressionWithXj = (x, y, xj) => Math.round((((x - xj) / y) / 50) / 2 * 100) / 100;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert inputs to numbers
    const x1Val = parseFloat(x1);
    const x2Val = parseFloat(x2);
    const x3Val = parseFloat(x3);
    const yVal = parseFloat(y);

    // Perform the calculation based on inputs
    const resultValue = computeExpressionWithXs(x1Val, yVal, x2Val, x3Val);

    setResult(resultValue);
  };

  return (
    <div>
      <h2>Expression Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            X1:
            <input
              type="number"
              value={x1}
              onChange={(e) => setX1(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            X2:
            <input
              type="number"
              value={x2}
              onChange={(e) => setX2(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            X3:
            <input
              type="number"
              value={x3}
              onChange={(e) => setX3(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Y:
            <input
              type="number"
              value={y}
              onChange={(e) => setY(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Calculate</button>
      </form>
      {result !== null && <h3>Result: {result}</h3>}
    </div>
  );
}

export default ExpressionCalculator;
