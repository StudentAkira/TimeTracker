import './auth.css';
import LoginButton from './buttons/login';
import PasswordInput from './inputs/password';
import UsernameInput from './inputs/username';


function Auth() {
  
  return (
    <div className="AuthPage">
        <div className="wrapper">
          <div className='auth_content'>
            <div className='inputs'>
              <h1 className='title'>Time tracker</h1>
              <UsernameInput />
              <PasswordInput />
              <div className='actions'>
                <LoginButton />
                <br/>
                <br/>
                <a href="#">create account</a>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Auth;
