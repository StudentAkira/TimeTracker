// import './auth.css';

import { APIEndpoints, frontURLs } from "../enums.tsx";


function Auth() {
  
  const login = async () => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "username": document.getElementById("username").value,
      "password": document.getElementById("password").value,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: 'include'
    };

    const response = await fetch(APIEndpoints.login, requestOptions);
    const response_json = await response.json()

    if ("detail" in response_json){
      alert(response_json["detail"]["error"])
      return
    }

    localStorage.setItem("user_data", 1)
    window.location.href = frontURLs.note;

  }

  return (
    <div className="AuthPage">
      <h1>Time tracker</h1>
      <input type="text" placeholder='username' id="username" required/>
      <input type="password" placeholder='password' id="password" required/>
      <button type='submit' className='btn' onClick={login}>Login</button>
      <a href={frontURLs.sign_up}>create account</a>
    </div>
  );
}

export default Auth;
