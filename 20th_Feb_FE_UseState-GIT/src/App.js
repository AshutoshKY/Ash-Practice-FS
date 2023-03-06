import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import First20feb from './Classes/20th_feb';
import Second27feb from './Classes/27th_feb';
import Third27febRed from './Classes/27th_feb_red';
import First6March from './Classes/6th_March';
import Second6march from './Classes/6th_March_II';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>  
          <Route exact path='/' element={<First20feb/>}></Route>
          <Route exact path='/27feb1' element={<Second27feb/>}></Route>
          <Route exact path='/27feb2' element={<Third27febRed/>}></Route>
          <Route exact path='/6march1' element={<First6March/>}></Route>
          <Route exact path='/6march2' element={<Second6march/>}></Route>
        </Routes>  
      </BrowserRouter>
    </>
  );
}

export default App;
