import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './components/auth/auth_page';


function App() {
  return (
    <div className="App">
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthPage />}/>
          {/* <Route path="#" element={<AuthPage />} /><Route path={frontURLs.append_software_equipment_suffix} element={<AppendSoftwareEquipment />} /> */}
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
