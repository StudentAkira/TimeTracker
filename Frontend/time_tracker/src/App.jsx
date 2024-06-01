import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/login/login.jsx';
import { frontURLs } from './components/enums.tsx';
import SignUp from './components/sign_up/sign_up.jsx';
import Note from './components/note/note.jsx';
import NavBar from './components/navbar/navbar.jsx';
import Subject from './components/subject/subject.jsx';
import Topic from './components/topic/topic.jsx';
import Period from './components/period/period.jsx';
import SingleSubject from './components/single_entity/subject/single_subject.jsx';
import SingleNote from './components/single_entity/note/single_note.jsx';
import SingleTopic from './components/single_entity/topic/single_topic.jsx';
import SinglePeriod from './components/single_entity/period/single_period.jsx';


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
          

          <Route path={frontURLs.single_subject} element={<SingleSubject />}/>

          <Route path={frontURLs.single_note} element={<SingleNote />}/>
          <Route path="/topic/:title" element={<SingleTopic />}/>
          <Route path="/period/:title" element={<SinglePeriod />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
