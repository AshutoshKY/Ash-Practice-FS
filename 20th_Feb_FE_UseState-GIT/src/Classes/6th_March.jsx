import React from "react";
import Second6march from "./6th_March_II";

function First6March(props){
    const students = [
        {name:"Person 1", age:23},
        {name:"Person 2", age:22},
        {name:"Person 3", age:21},
    ]
    const names = ["P1","P2","P3","P4","P5",]
    return(
        <div>
            {students.map((std,index)=><h1 key={index}>{index+1} - My nam is {std.name} and I am {std.age}</h1>)}
            {names.map(
                (name,index)=>
                    <h1 key={index}>
                        {name}
                    </h1>
                )
            }
        </div>
    )
}

export default First6March;