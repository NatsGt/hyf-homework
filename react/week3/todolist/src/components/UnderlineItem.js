import React from "react";

export default function UnderlineItem(props) {
    return (
        <li className="todo-border" >
            {props.children}
        </li>
    )
}