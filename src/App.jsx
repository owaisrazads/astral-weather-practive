import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [text, setText] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=a69a7319aeb3482294d93003240407&q=${text}`);
        setWeatherData(res.data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (text) { 
      fetchData();
    }
  }, [text]); 

  const handleForm = (e) => {
    e.preventDefault();

  };

  return (
    <>
      <h1>Weather App</h1>
      <form onSubmit={handleForm} className='flex gap-2 justify-center'>
        <input type="text" className='p-2 w-[70%] bg-[#f3f3f3] outline-none' onChange={(e) => setText(e.target.value)} value={text} placeholder="Enter city or location" />
        <button type="submit" className='bg-blue-600 text-white p-2 rounded-sm'>Search</button>
      </form>

      {weatherData && (
        <div className='bg-[#ffff] border-[1px] shadow-sm'>
          <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
          <p>Temperature: {weatherData.current.temp_c} °C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img src={weatherData.current.condition.icon} alt="Weather Icon" />
        </div>
      )}

      {error && <p>{error}</p>}
    </>
  );
};

export default App;
