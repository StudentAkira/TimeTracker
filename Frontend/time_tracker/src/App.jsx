import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/auth/auth.jsx';
import { frontURLs } from './components/enums.tsx';


function App() {

  return (
    <div className="App">
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path={frontURLs.auth} element={<Auth />}/>
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
