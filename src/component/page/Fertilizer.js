import React, { useState } from 'react';

// Functions to compute expressions
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
  const [results, setResults] = useState(null);
  const [npkType, setNpkType] = useState([]);

  const xValuesGroups = [
    [45, 25, 40],
    [100, 40, 50],
    [60, 30, 100]
  ];
  const yValues = [0.14, 0.16, 0.20, 0.46, 0.60];
  const labels = ["a", "b", "c"];
  const labelDict = {
    "a1": "14-14-14", "a1_x2": "14-14-14", "b1": "14-14-14", "c1": "14-14-14",
    "a2": "16-20-0", "b3": "16-20-0", "c3": "16-20-0",
    "a4": "46-0-0", "a4_x2": "46-0-0", "b4": "46-0-0", "c4": "46-0-0",
    "a5": "0-0-60", "b5": "0-0-60", "c5": "0-0-60", "c5_x2": "0-0-60", "a2_x2": "16-20-0", "c1_x2": "14-14-14",
  };

  const calculateResults = () => {
    const newResults = {};

    xValuesGroups.forEach((xValues, groupIdx) => {
      yValues.forEach((y, yIdx) => {
        const label = `${labels[groupIdx]}${yIdx + 1}`;
        newResults[label] = computeExpression(xValues[groupIdx], y);

        newResults[`${label}_x1`] = computeExpressionWithX(xValues[groupIdx], y, xValues[0]);
        newResults[`${label}_x2`] = computeExpressionWithX(xValues[groupIdx], y, xValues[1]);
        newResults[`${label}_x3`] = computeExpressionWithX(xValues[groupIdx], y, xValues[2]);

        newResults[`${label}_xs12`] = computeExpressionWithXs(xValues[groupIdx], y, xValues[0], xValues[1]);
        newResults[`${label}_xs13`] = computeExpressionWithXs(xValues[groupIdx], y, xValues[0], xValues[2]);
        newResults[`${label}_xs23`] = computeExpressionWithXs(xValues[groupIdx], y, xValues[1], xValues[2]);
      });
    });

    setResults(newResults);

    const npkConditions = xValuesGroups.map((xValues, groupIdx) => {
      const conditionsAndGroups = [
        [xValues[0] < xValues[1] && xValues[1] < xValues[2], ["a1", "b3", "c5_x1"]],
        [xValues[0] < xValues[1] && xValues[1] < xValues[2], ["a2", "b1_x1", "c5_x2"]],
        [xValues[0] < xValues[1] && xValues[1] < xValues[2], ["a4", "b1_x1", "c5_x2"]],
        [xValues[0] < xValues[1] && xValues[1] < xValues[2], ["a4", "b3_x2", "c1_x1_x2"]],
        [xValues[0] < xValues[1] && xValues[1] < xValues[2], ["a4", "b3_x2", "c5"]],
        [xValues[0] === xValues[1] && xValues[1] < xValues[2], ["a1", "b3", "c5_x1"]],
        [xValues[0] === xValues[1] && xValues[1] < xValues[2], ["a2", "b1_x1", "c5_x2"]],
        [xValues[0] === xValues[1] && xValues[1] < xValues[2], ["a4", "b1_x1", "c5_x2"]],
        [xValues[0] === xValues[1] && xValues[1] < xValues[2], ["a4", "b3_x2", "c1_x1_x2"]],
        [xValues[0] === xValues[1] && xValues[1] < xValues[2], ["a4", "b3_x2", "c5"]],
        [xValues[0] < xValues[2] && xValues[2] < xValues[1], ["a1", "c5_x1", "b3_x1"]],
        [xValues[0] < xValues[2] && xValues[2] < xValues[1], ["a2", "c5", "b1_x1"]],
        [xValues[0] < xValues[2] && xValues[2] < xValues[1], ["a4", "c1_x1", "b5_x2"]],
        [xValues[0] < xValues[2] && xValues[2] < xValues[1], ["a4", "c5", "b1_x1"]],
        [xValues[0] < xValues[2] && xValues[2] < xValues[1], ["a4", "c5", "b3_x1"]],
        [xValues[1] < xValues[0] && xValues[0] < xValues[2], ["b1", "a2_x2", "c5_x2"]],
        [xValues[1] < xValues[0] && xValues[0] < xValues[2], ["b1", "a4_x2", "c5_x2"]],
        [xValues[1] < xValues[0] && xValues[0] < xValues[2], ["b3", "a1_x2", "c5"]],
        [xValues[1] < xValues[0] && xValues[0] < xValues[2], ["b3", "a4_x2", "c1_x2"]],
        [xValues[1] < xValues[0] && xValues[0] < xValues[2], ["b3", "a4_x2", "c5"]],
        [xValues[1] < xValues[2] && xValues[2] < xValues[0], ["b1", "c5_x2", "a2_x2"]],
        [xValues[1] < xValues[2] && xValues[2] < xValues[0], ["b1", "c5_x2", "a4_x2"]],
        [xValues[1] < xValues[2] && xValues[2] < xValues[0], ["b3", "c5", "a1_x2"]],
        [xValues[1] < xValues[2] && xValues[2] < xValues[0], ["b3", "c1", "a4_x2"]],
        [xValues[1] < xValues[2] && xValues[2] < xValues[0], ["b3", "c5", "a4_x2"]],
        [xValues[2] < xValues[0] && xValues[0] < xValues[1], ["c1", "a4_x3", "b3_x2_x3"]],
        [xValues[2] < xValues[0] && xValues[0] < xValues[1], ["c5", "a1_x3", "b3_x3"]],
        [xValues[2] < xValues[0] && xValues[0] < xValues[1], ["c5", "a2", "b1_x2_x3"]],
        [xValues[2] < xValues[0] && xValues[0] < xValues[1], ["c5", "a4", "b3"]],
        [xValues[2] < xValues[0] && xValues[0] < xValues[1], ["c5", "a4", "b1_x2_x3"]],
      ];

      return conditionsAndGroups
        .filter(([condition]) => condition)
        .flatMap(([condition, groups]) => [
          {
            label: 'LMD',
            value: 'LMD',
            data: {
              oranicFert: 8,
              first: {
                nutrients: {
                  N: xValues[0],
                  P: xValues[1],
                  K: xValues[2]
                },
                list: groups.reduce((acc, label) => {
                  console.log("Label:", label);
                  console.log("Label Dict Entry:", labelDict[label]);
                  console.log("New Results Entry:", newResults[label]);

                  if (labelDict[label] && newResults[label] !== undefined) {
                    acc[labelDict[label]] = newResults[label];
                  }
                  return acc;
                }, {})
              },
              second: {
                nutrients: {
                  N: 150,
                  P: 0,
                  K: 75,
                },
              }
            }
          },
          {
            label: 'LLD',
            value: 'LLD',
            data: {
              oranicFert: 4,
              first: {
                nutrients: {
                  N: xValues[0],
                  P: xValues[1],
                  K: xValues[2]
                },
                list: groups.reduce((acc, label) => {
                  console.log("Label:", label);
                  console.log("Label Dict Entry:", labelDict[label]);
                  console.log("New Results Entry:", newResults[label]);

                  if (labelDict[label] && newResults[label] !== undefined) {
                    acc[labelDict[label]] = newResults[label];
                  }
                  return acc;
                }, {})
              },
              second: {
                nutrients: {
                  N: 150,
                  P: 0,
                  K: 75,
                },
              }
            }
          }
        ]);
    });

    // Ensure state is set correctly
    setNpkType(npkConditions.flat());
  };

  const renderResults = () => {
    return results ? (
      <div>
        {Object.entries(results).map(([key, value]) => (
          <div key={key}>
            <h4>{key}</h4>
            <p>Value: {value}</p>
          </div>
        ))}
      </div>
    ) : null;
  };

  const renderNpkConditions = () => {
    return npkType.length ? (
      <div>
        {npkType.map((item, index) => (
          <div key={index}>
            <h3>{item.label}</h3>
            <p><strong>Oranic Fertilizer:</strong> {item.data.oranicFert}</p>
            <h4>First:</h4>
            <p><strong>N:</strong> {item.data.first.nutrients.N}</p>
            <p><strong>P:</strong> {item.data.first.nutrients.P}</p>
            <p><strong>K:</strong> {item.data.first.nutrients.K}</p>
            <h4>List:</h4>
            {Object.entries(item.data.first.list).map(([key, value]) => (
              <p key={key}>{key}: {value}</p>
            ))}
            <h4>Second:</h4>
            <p><strong>N:</strong> {item.data.second.nutrients.N}</p>
            <p><strong>P:</strong> {item.data.second.nutrients.P}</p>
            <p><strong>K:</strong> {item.data.second.nutrients.K}</p>
          </div>
        ))}
      </div>
    ) : null;
  };

  return (
    <div>
      <h1>Compute Expressions</h1>
      <button onClick={calculateResults}>Calculate</button>
      
      <h2>Results</h2>
      {renderResults()}

      <h2>NPK Conditions</h2>
      {renderNpkConditions()}
    </div>
  );
}

export default App;
