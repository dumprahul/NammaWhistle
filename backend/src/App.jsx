import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../src/components/Home";
import Anon from "../src/components/Anon";
import Location from "../src/components/Location";

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
