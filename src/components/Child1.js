import React, { useState, useEffect, createContext, useContext, memo} from "react";
import { Child3 } from "./Child3";

const Child1 = ({users, addUser}) => {
    // const user = useContext(UserContext);
    useEffect(() => {
     console.log("called") 
    })
    
    return (
        <div>
            <>
            {users.length > 0 && users.map((user) => (
                <li>{user.name}</li>
            ))}
            </>
            <>////////////////</>
            <button onClick={addUser}> add User</button>
            <>////////////////</>
            
            <Child3 />
        </div>
    )
}

export default memo(Child1);