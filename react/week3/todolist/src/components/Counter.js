import React, { useEffect, useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setTimeout(() => setCount(prev => prev += 1), 1000)
    })
    return <p>You have used {count} seconds on this website</p>
}