import React, { useState } from 'react';

function computeExpression(x, y) {
  return Math.round(((x / y) / 50) / 2 * 100) / 100;
}

function computeExpressionWithX(x, y, xi) {
  return Math.round((((x - xi) / y) / 50) / 2 * 100) / 100;
}

function computeExpressionWithXs(x, y, xi, xj) {
  return Math.round((((x - xi - xj) / y) / 50) / 2 * 100) / 100;
}

function App() {
  const [xValues, setXValues] = useState([0, 0, 0]);
  const [results, setResults] = useState(null);

  const yValues = [0.14, 0.16, 0.20, 0.46, 0.60];
  const labels = ["a", "b", "c"];
  const labelDict = {
    "a1": "CF", "a1_x2": "CF", "b1": "CF", "c1": "CF",
    "a2": "AP", "b3": "AP", "c3": "AP",
    "a4": "U", "a4_x2": "U", "b4": "U", "c4": "U",
    "a5": "P", "b5": "P", "c5": "P", "c5_x2": "P", "a2_x2": "AP", "c1_x2": "CF",
  };

  const handleInputChange = (index, value) => {
    const newXValues = [...xValues];
    newXValues[index] = parseFloat(value) || 0;
    setXValues(newXValues);
  };

  const calculateResults = () => {
    const newResults = {};

    xValues.forEach((x, idx) => {
      yValues.forEach((y, jdx) => {
        const label = `${labels[idx]}${jdx + 1}`;
        newResults[label] = computeExpression(x, y);

        newResults[`${label}_x1`] = computeExpressionWithX(x, y, xValues[0]);
        newResults[`${label}_x2`] = computeExpressionWithX(x, y, xValues[1]);
        newResults[`${label}_x3`] = computeExpressionWithX(x, y, xValues[2]);

        newResults[`${label}_xs12`] = computeExpressionWithXs(x, y, xValues[0], xValues[1]);
        newResults[`${label}_xs13`] = computeExpressionWithXs(x, y, xValues[0], xValues[2]);
        newResults[`${label}_xs23`] = computeExpressionWithXs(x, y, xValues[1], xValues[2]);
      });
    });

    setResults(newResults);
  };

  const conditionsAndGroups = [
    // NPK
    [xValues[0] < xValues[1] && xValues[1] < xValues[2], ["a1", "b3", "c5"]],
    [xValues[0] < xValues[1] && xValues[1] < xValues[2], ["a2", "b1", "c5"]],
    [xValues[0] < xValues[1] && xValues[1] < xValues[2], ["a4", "b1", "c5"]],
    [xValues[0] < xValues[1] && xValues[1] < xValues[2], ["a4", "b3", "c1"]],
    [xValues[0] < xValues[1] && xValues[1] < xValues[2], ["a4", "b3", "c5"]],
    // NPK
    [xValues[0] === xValues[1] && xValues[1] < xValues[2], ["a1", "b3", "c5"]],
    [xValues[0] === xValues[1] && xValues[1] < xValues[2], ["a2", "b1", "c5"]],
    [xValues[0] === xValues[1] && xValues[1] < xValues[2], ["a4", "b1", "c5"]],
    [xValues[0] === xValues[1] && xValues[1] < xValues[2], ["a4", "b3", "c1"]],
    [xValues[0] === xValues[1] && xValues[1] < xValues[2], ["a4", "b3", "c5"]],
    // NKP
    [xValues[0] < xValues[2] && xValues[2] < xValues[1], ["a1", "c5", "b3"]],
    [xValues[0] < xValues[2] && xValues[2] < xValues[1], ["a2", "c5", "b1"]],
    [xValues[0] < xValues[2] && xValues[2] < xValues[1], ["a4", "c1", "b5"]],
    [xValues[0] < xValues[2] && xValues[2] < xValues[1], ["a4", "c5", "b1"]],
    [xValues[0] < xValues[2] && xValues[2] < xValues[1], ["a4", "c5", "b3"]],
    // PNK
    [xValues[1] < xValues[0] && xValues[0] < xValues[2], ["b1", "a2", "c5"]],
    [xValues[1] < xValues[0] && xValues[0] < xValues[2], ["b1", "a4", "c5"]],
    [xValues[1] < xValues[0] && xValues[0] < xValues[2], ["b3", "a1", "c5"]],
    [xValues[1] < xValues[0] && xValues[0] < xValues[2], ["b3", "a4", "c1"]],
    [xValues[1] < xValues[0] && xValues[0] < xValues[2], ["b3", "a4", "c5"]],
    // PKN
    [xValues[1] < xValues[2] && xValues[2] < xValues[0], ["b1", "c5", "a2"]],
    [xValues[1] < xValues[2] && xValues[2] < xValues[0], ["b1", "c5", "a4"]],
    [xValues[1] < xValues[2] && xValues[2] < xValues[0], ["b3", "c5", "a1"]],
    [xValues[1] < xValues[2] && xValues[2] < xValues[0], ["b3", "c1", "a4"]],
    [xValues[1] < xValues[2] && xValues[2] < xValues[0], ["b3", "c5", "a4"]],
    // KNP
    [xValues[2] < xValues[0] && xValues[0] < xValues[1], ["c1", "a4", "b3"]],
    [xValues[2] < xValues[0] && xValues[0] < xValues[1], ["c5", "a1", "b3"]],
    [xValues[2] < xValues[0] && xValues[0] < xValues[1], ["c5", "a2", "b1"]],
    [xValues[2] < xValues[0] && xValues[0] < xValues[1], ["c5", "a4", "b3"]],
    [xValues[2] < xValues[0] && xValues[0] < xValues[1], ["c5", "a4", "b1"]],
    // KPN
    [xValues[2] < xValues[1] && xValues[1] < xValues[0], ["c1", "b3", "a4"]],
    [xValues[2] < xValues[1] && xValues[1] < xValues[0], ["c5", "b3", "a1"]],
    [xValues[2] < xValues[1] && xValues[1] < xValues[0], ["c5", "b1", "a2"]],
    [xValues[2] < xValues[1] && xValues[1] < xValues[0], ["c5", "b1", "a4"]],
    [xValues[2] < xValues[1] && xValues[1] < xValues[0], ["c5", "b3", "a4"]],
  ];

  return (
    <div>
      <h1>Compute Expressions</h1>
      <div>
        {xValues.map((x, index) => (
          <div key={index}>
            <label>
              Enter value for x[{index + 1}]:
              <input
                type="number"
                value={x}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </label>
          </div>
        ))}
      </div>
      <button onClick={calculateResults}>Calculate</button>
      {results && (
        <div>
          {conditionsAndGroups.map(([condition, groups], idx) => {
            if (condition) {
              return (
                <div key={idx}>
                  <p>Condition: True</p>
                  <div>
                    {groups.map((label, labelIdx) => (
                      <p key={labelIdx}>
                        {labelDict[label]}: {results[label] || 'N/A'}
                      </p>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
