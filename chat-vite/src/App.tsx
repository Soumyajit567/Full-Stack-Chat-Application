import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Chat from "./components/Chat";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faThumbsDown, faAdjust } from '@fortawesome/free-solid-svg-icons'
import { UserProvider } from './components/UserContext';


library.add(faThumbsUp, faThumbsDown, faAdjust)

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;












