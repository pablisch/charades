import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import MainPage from './pages/MainPage';

import charadeSeedData from './data/charadeSeedData';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [charades, setCharades] = useState(charadeSeedData);
  const [charade, setCharade] = useState({});
  const [thisSessionCharades, setThisSessionCharades] = useState([]);



  
  

  // const handleFetchAllCharades = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/api/v1.0/charades');
  //     const data = await response.json();
  //     setCharades(data);
  //   } catch (error) {
  //     console.error('Error fetching all charades:', error);
  //   }
  // };

  

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
        {/* <Route
          path='/:id'
          element={
            <SingleImagePage
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              setAvatar={setAvatar}
              setUser={setUser}
              imageData={imageData}
              setImageData={setImageData}
              setIsSideEffect={setIsSideEffect}
            />
          }
        /> */}
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
