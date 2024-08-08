import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import { RecoilRoot } from "recoil";
import Signup from "./components/Signup";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
export default App;
