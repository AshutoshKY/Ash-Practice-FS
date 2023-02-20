import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import First20feb from './Classes/20th_feb';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>  
          <Route exact path='/' element={<First20feb/>}></Route>
        </Routes>  
      </BrowserRouter>
    </>
  );
}

export default App;
