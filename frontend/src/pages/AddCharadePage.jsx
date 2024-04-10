import AddCharadeForm from '../components/AddCharadeForm';
import PropTypes from "prop-types";

const Signup = ({setCharades}) => {
  
  return (
    <div>
      <AddCharadeForm setCharades={setCharades}  />
    </div>
  );
};

Signup.propTypes = {
  setCharades: PropTypes.func,
};

export default Signup;