import "./assets/reset.css";
import "./assets/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp.js";
import SignIn from "./components/signIn.js";
import { UserDataProvider } from "./contexts/UserDataContext";
import Timeline from "./components/Timeline";
import UserTimeline from "./components/UserTimeline";

function App() {
  return (
    <BrowserRouter>
      <UserDataProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/user/:id" element={<UserTimeline />} />
        </Routes>
      </UserDataProvider>
    </BrowserRouter>
  );
}

export default App;
