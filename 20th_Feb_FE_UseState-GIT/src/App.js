import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import First20feb from './Classes/20th_feb';
import Second27feb from './Classes/27th_feb';
import Third27febRed from './Classes/27th_feb_red';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>  
          <Route exact path='/' element={<First20feb/>}></Route>
          <Route exact path='/27feb1' element={<Second27feb/>}></Route>
          <Route exact path='/27feb2' element={<Third27febRed/>}></Route>
        </Routes>  
      </BrowserRouter>
    </>
  );
}

export default App;
