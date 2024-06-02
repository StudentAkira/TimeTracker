import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { frontURLs } from './components/enums.tsx';
import Auth from './components/login/login.jsx';
import NavBar from './components/navbar/navbar.jsx';
import Note from './components/note/note.jsx';
import SignUp from './components/sign_up/sign_up.jsx';
import SingleNote from './components/single_entity/note/single_note.jsx';
import SinglePeriod from './components/single_entity/period/single_period.jsx';
import SingleSubject from './components/single_entity/subject/single_subject.jsx';
import SingleTopic from './components/single_entity/topic/single_topic.jsx';
import Subject from './components/subject/subject.jsx';
import Topic from './components/topic/topic.jsx';
import Test from './test/test.jsx';
import SinglePeriodUpdate from './components/single_entity/period/single_period_update.jsx';


function App() {

  return (
    <div className="App">
      {localStorage.getItem("user_data") == null ? null : <NavBar />}
        <div className="wrapper">
          <BrowserRouter>
            <Routes>
              <Route path={frontURLs.login} element={<Auth />}/>
              <Route path={frontURLs.sign_up} element={<SignUp />}/>
              <Route path={frontURLs.note} element={<Note />}/>
              <Route path={frontURLs.subject} element={<Subject />}/>
              <Route path={frontURLs.topic} element={<Topic />}/>

              <Route path={frontURLs.single_subject} element={<SingleSubject />}/>

              <Route path={frontURLs.single_note} element={<SingleNote />}/>
              <Route path={frontURLs.single_topic} element={<SingleTopic />}/>
              <Route path={frontURLs.single_period} element={<SinglePeriodUpdate />}/>
              <Route path={frontURLs.period} element={<SinglePeriod />}/>

              <Route path="/test" element={<Test />}/>
            </Routes>
          </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
