import React, { useState, useEffect } from "react";

export const Child2 = () => {

    const [first, setfirst] = useState(0)
    return (
        <div>
            {"child One is me => "} {first}
            <button onClick={() => setfirst(first+1)}> change Child 1</button>
        </div>
    )
}