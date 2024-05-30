import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/auth/auth.jsx';
import { frontURLs } from './components/enums.tsx';
import SignUp from './components/sign_up/sign_up.jsx';
import Note from './components/note/note.jsx';
import NavBar from './components/navbar/navbar.jsx';
import Subject from './components/subject/subject.jsx';
import Topic from './components/topic/topic.jsx';
import Period from './components/period/period.jsx';


function App() {

  return (
    <div className="App">
      {
        localStorage.getItem("user_data") == null ? null : <NavBar />
      }
        <BrowserRouter>
        <Routes>
          <Route path={frontURLs.login} element={<Auth />}/>
          <Route path={frontURLs.sign_up} element={<SignUp />}/>
          <Route path={frontURLs.note} element={<Note />}/>
          <Route path={frontURLs.subject} element={<Subject />}/>
          <Route path={frontURLs.topic} element={<Topic />}/>
          <Route path={frontURLs.period} element={<Period />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
