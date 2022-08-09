import "./assets/reset.css";
import "./assets/style.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import SignUp from "./components/SignUp";
import UserContext from "./contexts/UserContext";



function App() {

  const [user, setUser] = useState([])
  
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
