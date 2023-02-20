import React, { useState } from "react";
import './style.css';

const First20feb = () => {
    
    const [count, setCount] = useState(0);
    const func = (a) =>{
        if(a===1){
            setCount(count+1)
        }else if(a===2){
            if(count>0){
                setCount(count-1)
            }
        }else{
            setCount(0)
        }
    }

    return(
        <div>
            <div className="mainHead">
                <h1>Basics</h1>
            </div>
            <div className="mainContent">
                <h2>Count is : {count}</h2>
                <button className="btns" onClick={() => func(2)}>Decrease</button>
                <button className="btns" onClick={() => func(1)}>Increase</button>
                <button className="btns" onClick={() => func(3)}>Reset</button>
            </div>
        </div>
    );
};

export default First20feb;