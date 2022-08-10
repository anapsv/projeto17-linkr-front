import "./assets/reset.css";
import "./assets/style.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import SignUp from "./components/SignUp.js";
import SignIn from "./components/signIn.js";
import UserContext from "./contexts/UserContext.js";



function App() {

  const [user, setUser] = useState([])
  
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path='/' element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
