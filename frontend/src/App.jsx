import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Anon from "./Pages/Anon";
import Location from "./Pages/Location";

function App() {


  return (
  <div>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/anon" element={<Anon />}></Route>
          <Route path="/location" element={<Location />}></Route>
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
