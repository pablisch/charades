import AddCharadeForm from '../components/AddCharadeForm';
import PropTypes from "prop-types";

const Signup = ({setCharades, charades}) => {
  
  return (
    <div>
      <AddCharadeForm setCharades={setCharades} charades={charades} />
    </div>
  );
};

Signup.propTypes = {
  setCharades: PropTypes.func,
  charades: PropTypes.array,
};

export default Signup;