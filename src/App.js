import "./assets/reset.css";
import "./assets/style.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import SignUp from "./components/SignUp";
import UserContext from "./contexts/UserContext";



function App() {

  const [token, setToken] = useState("");
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [user, setUser] = useState([]);
  const contextValue = { token, setToken, menuDisplay, setMenuDisplay };
  
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ contextValue, user, setUser }}>
        <Routes>
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
