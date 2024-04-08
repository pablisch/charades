import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Button from '../components/Button'
import Format from '../components/Format'
import './MainPage.css'

import getRandomNumber from '../utils/getRandomNumber';

let randomNumber;

// eslint-disable-next-line no-unused-vars
const MainPage = ({ charades, charade, setCharade, thisSessionCharades, setThisSessionCharades }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [words, setWords] = useState(null);

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
    setCharade(charades[randomNumber]);
    setWords(null)
    // charade.format && setWords(charade.title.split(' ').length);
    setIsHidden(false);
    setCompleted(false);
  };

  useEffect(() => {
    // remove hyphens from title
    if (charade.format) {
      const title = charade.title.replace(/-/g, '')
      console.log('title:', title)
      setWords(title.split(' ').length);
    }
  }, [charade]);

  const handleReveal = () => {
    setIsHidden(!isHidden);
  }

  const handleCompleted = () => {
    setCompleted(!completed);
  }

  return (
    <>
      <div className='card'>
        {!isHidden ?
          <>
            <h2><strong>{charade.title}</strong></h2>
            <div className="formats">
            {charade.format && charade.format.map(item => (
              <Format key={item}>{item}</Format>
            ))}
            </div>
          </> :
          <>
            <p>Charade is hidden</p>
            <p>Press <strong>Show Charade</strong> to reveal</p>
          </>}
      </div>
      <Button onClick={handleSetNewCharade} disabled={completed ? false : true} >{completed ? 'Next Charade' : words && `${words} words`}</Button>
      <Button onClick={handleReveal} className={`btn ${isHidden ? '' : 'warn-btn'}`} >{isHidden ? 'Show Charade' : 'Hide Charade'}</Button>
      <Button onClick={handleCompleted} className={`btn ${!completed ? '' : 'warn-btn'}`} >{!completed ? 'Mark Done' : 'Mark Not Done'}</Button>
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
