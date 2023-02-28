import React, { createContext } from "react";
import Second27febII from "./27th_feb_II";

const cd = createContext();

const Second27feb = () => {
    return(
        <div>
            <cd.Provider value={"Kemcho??"}>
                <Second27febII />
            </cd.Provider>
        </div>
    )
}

export default Second27feb;
export {cd};