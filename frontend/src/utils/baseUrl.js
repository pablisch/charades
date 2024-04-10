/* eslint-disable no-undef */
export default process.env.NODE_ENV === 'deploy'
  ? 'https://charades-backend.onrender.com'
  : 'http://localhost:8080';
