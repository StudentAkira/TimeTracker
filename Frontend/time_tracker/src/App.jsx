import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
import { frontURLs } from './components/enums.tsx';
import NavBar from "./components/ui/navbar/navbar.jsx"
import Login from "./components/pages/login/login.jsx"
import SignUp from "./components/pages/sign_up/sign_up.jsx"
import Note from "./components/pages/note/note.jsx"
import Subject from "./components/pages/subject/subject.jsx"
import Topic from "./components/pages/topic/topic.jsx"
import SingleSubject from "./components/pages/detail_pages/subject/single_subject.jsx"
import SingleNote from "./components/pages/detail_pages/note/single_note.jsx"
import SingleTopic from "./components/pages/detail_pages/topic/single_topic.jsx"
import SinglePeriodUpdate from "./components/pages/detail_pages/period/single_period_update.jsx"
import SinglePeriod from "./components/pages/detail_pages/period/single_period.jsx"
import Test from "./test/test.jsx"


function App() {

  return (
    <div className="App">
      {/* {localStorage.getItem("user_data") == null ? null : <NavBar />}
        <div className="wrapper">
          <BrowserRouter>
            <Routes>
              <Route path={frontURLs.login} element={<Login />}/>
              <Route path={frontURLs.sign_up} element={<SignUp />}/>
              <Route path={frontURLs.note} element={<Note />}/>
              <Route path={frontURLs.subject} element={<Subject />}/>
              <Route path={frontURLs.topic} element={<Topic />}/>

              <Route path={frontURLs.single_subject} element={<SingleSubject />}/>

              <Route path={frontURLs.single_note} element={<SingleNote />}/>
              <Route path={frontURLs.single_topic} element={<SingleTopic />}/>
              <Route path={frontURLs.single_period} element={<SinglePeriodUpdate />}/>
              <Route path={frontURLs.period} element={<SinglePeriod />}/>

            </Routes>
          </BrowserRouter>
        </div> */}
        <BrowserRouter>
          <Routes>
            <Route path="/test" element={<Test />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
