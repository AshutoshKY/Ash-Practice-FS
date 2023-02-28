import React, { useContext } from "react";
import { cd } from "./27th_feb";

const Second27febII = () => {
    const prp = useContext(cd);
    return(
        <div>
            <h1>{prp}</h1>
        </div>
    )
}

export default Second27febII;