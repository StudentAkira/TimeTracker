// import './sign_in.css';

import { APIEndpoints, frontURLs } from "../../enums.tsx";



function SignUp() {

  const sign_up = async () => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "username": document.getElementById("username").value,
      "first_name": document.getElementById("first_name").value,
      "second_name": document.getElementById("second_name").value,
      "third_name": document.getElementById("third_name").value,
      "password": document.getElementById("password").value
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: 'include'
    };

    const response = await fetch(APIEndpoints.user_create, requestOptions)
    const response_json = await response.json()

    if ("detail" in response_json){
      alert(response_json["detail"]["error"])
      return
    }

    window.location.href = frontURLs.login;
  }

  return (
    <div className="AuthPage">
      <h1>Time tracker</h1>
      <input type="text" placeholder='username' id='username' required/>
      <input type="text" placeholder='first name' id='first_name' required/>
      <input type="text" placeholder='second name' id='second_name' required/>
      <input type="text" placeholder='third name' id='third_name' required/>
      <input type="password" placeholder='password' id='password' required/>
      <button type='submit' className='btn' onClick={sign_up}>Create</button>
      <a href={frontURLs.login}>Login</a>
    </div>
  );
}

export default SignUp;
