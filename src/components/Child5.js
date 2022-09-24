import React, { useState, useRef, useEffect, useContext, memo } from "react";
import { UserContext } from "../App";

const Child5 = () => {
    const users = useContext(UserContext)
    const [inputValue, setInputValue] = useState("");
    const count = useRef(0);
    const inputElement = useRef();

    useEffect(() => {
        count.current = count.current + 1;
      });

    const focusInput = () => {
    inputElement.current.value = "eeeeeeeee";
    };

    return (
        <div>
            Child 5
            {JSON.stringify(users)}

            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                ref={inputElement}
            />
            <button onClick={focusInput}>Focus Input</button>
            <h1>Render Count: {count.current}</h1>
        </div>
    )
}

export default memo(Child5);