import PropTypes from 'prop-types'
import { useEffect } from 'react'

import getRandomNumber from '../utils/getRandomNumber';

let randomNumber;

// eslint-disable-next-line no-unused-vars
const MainPage = ({ charades, charade, setCharade, thisSessionCharades, setThisSessionCharades }) => {

  useEffect(() => {
    handleSetNewCharade()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleSetNewCharade = () => {
    randomNumber = getRandomNumber(charades.length);
    if (thisSessionCharades.includes(randomNumber)) {
      while (thisSessionCharades.includes(randomNumber)) {
        randomNumber = getRandomNumber(charades.length);
      }
    }
    setThisSessionCharades([...thisSessionCharades, randomNumber]);
    setCharade(charades[getRandomNumber(charades.length)]);
  };

  return (
    <>
      <div className='card'>
        <p><strong>{charade.title}</strong></p>
        <p>
          <strong>Formats: </strong>
          {charade.format && charade.format.join(', ')}
        </p>
      </div>
      <button onClick={handleSetNewCharade}>New Charade</button>
    </>
  )
}

MainPage.propTypes = {
  charades: PropTypes.array,
  charade: PropTypes.object,
  setCharade: PropTypes.func,
  thisSessionCharades: PropTypes.array,
  setThisSessionCharades: PropTypes.func,
}

export default MainPage
