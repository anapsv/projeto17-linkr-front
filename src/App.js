import "./assets/reset.css";
import "./assets/style.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import SignUp from "./components/SignUp.js";
import SignIn from "./components/signIn.js";
import { UserDataProvider } from "./contexts/UserDataContext";
import Timeline from "./components/Timeline";


function App() {
  return (
    <BrowserRouter>
      <UserDataProvider>
        <Routes>
          <Route path='/' element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path="/timeline" element={<Timeline />} />
{/*           <Route path="/hashtag/:hashtag" element={< Hashtag/>} /> */}
        </Routes>
      </UserDataProvider>
    </BrowserRouter>
  );
}

export default App;
