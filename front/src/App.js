import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [flightPrices, setFlightPrices] = useState(null);
  const [error, setError] = useState('');

  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!source || !destination) {
      setError('Please enter both source and destination');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/flight-prices', {
        params: { source, destination },
      });
      setFlightPrices(response.data);
      setError('');
    } catch (error) {
      setError('Error fetching flight prices');
      setFlightPrices(null);
    }
  };

  return (
    <div className='prices'>
      <h1>Flight Prices</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Source:
          <input type="text" value={source} onChange={handleSourceChange} />
        </label>
        <br />
        <label>
          Destination:
          <input type="text" value={destination} onChange={handleDestinationChange} />
        </label>
        <br />
        <button type="submit">Get Prices</button>
      </form>
      {error && <p>{error}</p>}
      {flightPrices && (
        <div>
          <h2>Flight Prices:</h2>
          <ul>
            {Object.entries(flightPrices).map(([airline, price]) => (
              <li key={airline}>
                {airline}: {price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
