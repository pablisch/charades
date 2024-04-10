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

const AddCharadeForm = () => {
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMovie, setIsMovie] = useState(false);

  
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
        `${baseUrl}/api/v1.0/charade/add`,
        {
          title,
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
        console.log('Something went wrong in handleSignUpSubmit');
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
  
  const handleMovieCheck = () => {
    setIsMovie(!isMovie);
  };

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

          <div className='format-checkbox'>
  <label htmlFor="movie-checkbox">Movie</label>
  <input
    id="movie-checkbox"
    type='checkbox'
    checked={isMovie}
    onChange={handleMovieCheck}
  />
</div>
          <Button
            id='add-charade-submit-button'
            disabled={title ? false : true}>
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
