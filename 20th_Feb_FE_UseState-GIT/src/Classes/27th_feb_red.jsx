import React, { useReducer } from 'react';

const Third27febRed = () =>{

    const initstate = 0;

    const reducer = (state, action) => {
        switch (action) {
            case "INC":
                return state + 1;
            case "DEC":
                return state - 1;
            case "RESET":
                return initstate;

        }
    }

    const [count, dispatch] = useReducer(reducer, initstate);
    return (
        <div>
            <h1>{count}</h1>
            <button type='button' onClick={() => dispatch("INC")} >INC</button>
            <button type='button' onClick={() => dispatch("DEC")} >DEC</button>
            <button type='button' onClick={() => dispatch("RESET")} >RESET</button>

        </div>
    );
}

export default Third27febRed;