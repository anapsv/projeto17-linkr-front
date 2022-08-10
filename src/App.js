import "./assets/reset.css";
import "./assets/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import { UserDataProvider } from "./contexts/UserDataContext";
import Timeline from "./components/Timeline";

function App() {
  return (
    <BrowserRouter>
      <UserDataProvider>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </UserDataProvider>
    </BrowserRouter>
  );
}

export default App;
