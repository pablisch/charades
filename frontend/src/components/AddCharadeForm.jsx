import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
import InputField from './InputField';
import axios from 'axios';
import './Form.css';
import baseUrl from '../utils/baseUrl';
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

const AddCharadeForm = () => {
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

    try {
      const DbResponse = await axios.post(
        `${baseUrl}/api/v1.0/charade`,
        {
          title,
          format: checkedFormats,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (DbResponse.status === 201) {
        const responseData = DbResponse.data;
        console.log('responseData:', responseData);
        clearForm();
        navigate('/');
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

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   console.log('file', file);
  //   console.log('file name', file.name);
  // };

  const clearForm = () => {
    setTitle('');
  };

  return (
    <>
      <main id='add-charade-form-container' className='form-container'>
        <form
          id='add-charade-form'
          className='form'
          onSubmit={handleSignUpSubmit}
          noValidate>
          <h1 id='add-charade-title' className='form-title'>
            Add a Charade
          </h1>
          <InputField
            id={'title-input'}
            className='form-field'
            value={title}
            onChangeFunc={handleTitleChange}
            ref={titleInputRef}>
            Title
          </InputField>
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
        </form>
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      </main>
    </>
  );
};

// AddCharadeForm.propTypes = {
// };

export default AddCharadeForm;
