import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthService } from '../../../../../services/AuthUser.service';
import ErrorPopUp from '../../../../../components/errors/ErrorPopUp';
import Inputs from '../../../../../components/inputs/InputText';
import './LoginForm.scss';

const LoginForm = ({ onRegister }) => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { loginUser } = useAuthService();

  const handleLogin = async ( event ) => {
    event.preventDefault();

    try {
      await loginUser(userInput, password);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };
  
  const renderErrorPopUps = () => {
    if (error) {
      return (
        <ErrorPopUp
          key={1}
          message={"Usuario o contraseña incorrectos"} 
          onClose={handleCloseError}
        />
      );
    }
  };
  
  const handleCloseError = () => {
    setError(null); // Restablecemos el estado de error a null
  };

  return (
    <form className="loginForm" onSubmit={handleLogin}>
      <h2 className="title">ASEGURADO</h2>

      <Inputs
        type="text"
        span="Usuario"
        name="userInput"
        value={userInput}
        placeholderClass="span-email"
        inputClass="input-email"
        onChange={(e) => setUserInput(e.target.value)}
        iconName="person"
      />

      <Inputs
        type="password"
        span="Contraseña"
        name="password"
        value={password}
        placeholderClass="span-password"
        inputClass="input-password"
        onChange={(e) => setPassword(e.target.value)}
        iconName="password"
      />

      <div className="buttons">
        <button type="button" className="btn btn-registro" onClick={onRegister}>
          Registro
        </button>
        <button type="submit" className="btn btn-ingresar">
          Ingresar
        </button>
      </div>

      <div className='errors-alert'>
        {renderErrorPopUps()}
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default LoginForm;
