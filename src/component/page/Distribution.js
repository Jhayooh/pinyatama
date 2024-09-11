import React, { useState } from 'react';

// Date Component
const DatePicker = ({ onDateChange }) => {
  return (
    <div>
      <label>Select Date: </label>
      <input
        type="date"
        onChange={(e) => onDateChange(e.target.value)}
      />
    </div>
  );
};

// Input Component
const InputField = ({ onInputChange }) => {
  return (
    <div>
      <label>Enter Data: </label>
      <input
        type="text"
        onChange={(e) => onInputChange(e.target.value)}
      />
    </div>
  );
};

// Table Component
const DataTable = ({ data }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Date</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.date}</td>
            <td>{row.input}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Main Component
const SampleApp = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [inputText, setInputText] = useState('');
  const [tableData, setTableData] = useState([]);

  const addRowToTable = () => {
    if (selectedDate && inputText) {
      setTableData([...tableData, { date: selectedDate, input: inputText }]);
      setInputText(''); // Clear input field after adding data
    }
  };

  return (
    <div>
      <h1>Sample App</h1>
      <DatePicker onDateChange={setSelectedDate} />
      <InputField onInputChange={setInputText} />
      <button onClick={addRowToTable}>Add to Table</button>
      <DataTable data={tableData} />
    </div>
  );
};

export default SampleApp;
