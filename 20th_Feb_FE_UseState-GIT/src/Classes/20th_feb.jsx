import React, { useState, useEffect } from "react";
import './style.css';

const First20feb = () => {
    
    const [count, setCount] = useState(0);
    const [com, setCom] = useState("Ashutosh");
    // const [back,setBack]=useState(true);

    useEffect(() => {
       console.log("CLicked Number Chnage");
    },[count]);

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
                <div className="left">
                    <h2 id="cnt" style={count>10 ? {color:"green", textDecoration:"underline"}:{color:"rgb(126, 41, 70);"}}>Count is : {count}</h2>
                    <button className="btns" onClick={() => func(2)}>Decrease</button>
                    <button className="btns" onClick={() => func(1)}>Increase</button>
                    <button className="btns" onClick={() => func(3)}>Reset</button>
                </div>
                <div className="right">
                    {/* 22nd Class  */}
                <h3>{com}</h3>
                    <button className="btns" onClick={()=>{com==="Ashutosh" ? setCom("kumar"):setCom("Ashutosh")}}>change</button>
                    <p>1977, pagol</p>
                </div>
            </div>
        </div>
    );
};

export default First20feb;