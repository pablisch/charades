import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputField from './InputField';
import axios from 'axios';
import './Form.css';
import baseUrl from '../utils/baseUrl';
import { capitaliseString } from '../utils/capitaliseString';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import './AddCharadeForm.css';

const formatsTypes = [
  'Movie',
  'TV Show',
  'Book',
  'Song',
  'Play',
  'Comic',
  'Poem',
  'Other',
];

const AddCharadeForm = ({ setCharades, charades }) => {
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [checkedFormats, setCheckedFormats] = useState([]);

  const navigate = useNavigate();

  const titleInputRef = useRef(null);

  useEffect(() => {
    document.title = 'Add Charade';
    window.localStorage.clear();
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    const capitalisedTitle = capitaliseString(title);

    const titles = charades.map((charade) => charade.title);
    if (titles.includes(capitalisedTitle)) {
      setErrorMessage('That charade already exists.');
      clearForm();
      return;
    }

    const lowercaseFormats = checkedFormats.map((format) => format.toLowerCase());

    try {
      const DbResponse = await axios.post(
        `${baseUrl}/api/v1.0/charades/add`,
        {
          title: capitalisedTitle,
          format: lowercaseFormats,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (DbResponse.status === 201) {
        const responseData = DbResponse.data;
        console.log(
          'Charade saved. ResponseData.charade:',
          responseData.charade
        );
        setCharades((prevCharades) => [
          ...prevCharades,
          {
            title: responseData.charade.title,
            format: responseData.charade.format,
          },
        ]);
        clearForm();
        // navigate('/');
      } else {
        console.log('Something went wrong with adding the charade.');
      }
    } catch (error) {
      console.error('Error in handleSignUpSubmit:', error);
      console.log('error.response:', error.response.data.error);
      setErrorMessage(error.response.data.error);
    }
  };

  // Input field functions
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleFormatCheck = (format) => {
    const isChecked = checkedFormats.includes(format);

    if (isChecked) {
      setCheckedFormats((prevFormats) =>
        prevFormats.filter((item) => item !== format)
      );
    } else {
      setCheckedFormats((prevFormats) => [...prevFormats, format]);
    }
  };

  useEffect(() => {
    console.log('checkedFormats:', checkedFormats);
  }, [checkedFormats]);

  const clearForm = () => {
    setTitle('');
    setCheckedFormats([]);
  };

  return (
    <>
      <main id='add-charade-form-container' className='form-container'>
        <form
          id='add-charade-form'
          className='form'
          onSubmit={handleSignUpSubmit}
          noValidate>
          <h2 id='add-charade-title' className='form-title'>
            Add a Charade
          </h2>
          <InputField
            id={'title-input'}
            className='form-field'
            value={title}
            onChangeFunc={handleTitleChange}
            ref={titleInputRef}
            placeholder='Title'></InputField>
          <div id='format-checkbox-container'>
            {formatsTypes.map((format) => (
              <div key={format} className='format-checkbox'>
                <label htmlFor={`${format}-checkbox`}>{format}</label>
                <input
                  id={`${format}-checkbox`}
                  type='checkbox'
                  checked={checkedFormats.includes(format)}
                  onChange={() => handleFormatCheck(format)}
                />
              </div>
            ))}
          </div>
          <Button
            id='add-charade-submit-button'
            disabled={title && checkedFormats.length ? false : true}>
            Add Charade
          </Button>
          <Button id='return-to-charades-button' onClick={() => navigate('/')}>
            Return to Charades
          </Button>
        </form>
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      </main>
    </>
  );
};

AddCharadeForm.propTypes = {
  setCharades: PropTypes.func,
  charades: PropTypes.array,
};

export default AddCharadeForm;
