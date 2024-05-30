import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/auth/auth.jsx';
import { frontURLs } from './components/enums.tsx';
import SignUp from './components/sign_up/sign_up.jsx';
import Note from './components/note/note.jsx';


function App() {

  return (
    <div className="App">
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path={frontURLs.login} element={<Auth />}/>
          <Route path={frontURLs.sign_up} element={<SignUp />}/>
          <Route path={frontURLs.note} element={<Note />}/>
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
