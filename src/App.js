import React, { useEffect, useState } from 'react';
import Child1 from './Child1';
import Child2 from './Child2';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/tips.csv')
      .then(response => response.text())
      .then(text => {
        const parsedData = parseCSV(text);
        setData(parsedData);
      });
  }, []);

  const parseCSV = (text) => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      return {
        total_bill: parseFloat(values[0]), 
        tip: parseFloat(values[1]),         
        day: values[4].replace(/"/g, ''),
      };
    });
  };

  return (
    <div className="App">
      {data.length > 0 ? (
        <>
          <Child1 data={data} />
          <Child2 data={data} />
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;
