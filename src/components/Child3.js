import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { Child4 } from "./Child4";


export const Child3 = () => {

    const users = useContext(UserContext)
    return (
        <div>
            CHiLD 3
            <Child4 />
        </div>
    )
}