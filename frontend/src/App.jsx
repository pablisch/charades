import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import MainPage from './pages/MainPage';
import AddCharadePage from './pages/AddCharadePage';

import baseUrl from './utils/baseUrl';
import charadeSeedData from './data/charadeSeedData';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [charades, setCharades] = useState(charadeSeedData);
  const [charade, setCharade] = useState({});
  const [thisSessionCharades, setThisSessionCharades] = useState([]);
  const [isServerUp, setIsServerUp] = useState(false);

  const handleFetchAllCharades = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1.0/charades');
      const data = await response.json();
      setCharades(data);
      console.log('Charades have been fecthed:', data[data.length - 1])
    } catch (error) {
      console.error('Error fetching all charades:', error);
    }
  };

  const checkServerStatus = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/v1.0/health/server`);
      if (response.ok) {
        // console.log('server is up');
        setIsServerUp(true);
      } else {
        setIsServerUp(false);
      }
    } catch (error) {
      setIsServerUp(false);
    }
  };

  useEffect(() => {
    checkServerStatus();
    const intervalId = setInterval(() => {
      checkServerStatus(); // check server status every x seconds
      // console.log(isServerUp, 'still checking');
    }, 1000);

    if (isServerUp) {
      clearInterval(intervalId);
      handleFetchAllCharades();
      // console.log('stop checking');
    }
  }, [isServerUp]);
  

  console.log('charade:', charade);

  return (
    <BrowserRouter>
      <Navbar
      />
      <div id='fixed-navbar-offset'></div>
      <Routes>
        <Route
          path='/'
          element={
            <MainPage charades={charades} charade={charade} setCharade={setCharade} thisSessionCharades={thisSessionCharades} setThisSessionCharades={setThisSessionCharades} />
          }
        />
        <Route
          path='/add-charade'
          element={
            <AddCharadePage
            setCharades={setCharades}
            />
          }
        />
      </Routes>
      {/* <div className='card'>
        <p><strong>{charade.title}</strong></p>
        <p>
          <strong>Formats: </strong>
          {charade.format && charade.format.join(', ')}
        </p>
      </div>
      <button onClick={handleSetNewCharade}>New Charade</button> */}
    </BrowserRouter>
      
  );
}

export default App;
