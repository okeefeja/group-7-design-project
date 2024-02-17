import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
/// TO be used with database
  const fetchData = async () => {
    try {
      const response = await fetch('localhost:5000/');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
// dummy list 
  const array = ["a", "b", "c", "d", "e"];
  
  return (
  <div>
      <h1>Elements</h1>
      <ul>
        {array.map((member) => (
          <li>{member}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
