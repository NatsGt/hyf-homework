import React, { useState } from "react";
import UnderlineItem from "./UnderlineItem"
import PropTypes from 'prop-types';

function CreateTodo(props) {
    const { id, description, deadline } = props;
    const [todoStatus, setTodoStatus] = useState(true);
    const [updateStatus, setUpdateStatus] = useState(true);
    const [todoDescription, setTodoDescription] = useState(description)
    function checkboxStatus() {
        setTodoStatus(!todoStatus)
    }

    function handleUpdateStatus() {
        setUpdateStatus(!updateStatus)
    }

    return (
        <div className="todo-item">
            <div className="item-description">
                <input type="checkbox" onClick={checkboxStatus}></input>
                <span className="todo-li">
                    {updateStatus ? <span style={{ 'textDecoration': todoStatus ? 'none' : 'line-through' }}>{todoDescription}</span> : <input onChange={(e) => setTodoDescription(e.target.value)} value={todoDescription} ></input>}
                    <span className="todo-deadline">{deadline}</span>
                </span>
            </div>
            <div className="buttons-container">
                <button className="edit-button" onClick={handleUpdateStatus} >{updateStatus ? "Edit" : "Update"} </button>
                <button className="delete-button" onClick={() => props.deleteMethod(id)}> Delete </button>
            </div>
        </div>
    )
}

CreateTodo.propTypes = {
    description: PropTypes.string.isRequired,
}

export default function TodoList(props) {
    const { todoList, deleteMethod } = props;
    return (
        <div>
            {todoList.length === 0 && <p>No items</p>}
            <ul>
                {todoList.map((item, index) => {
                    return (
                        <UnderlineItem key={item.id} >
                            <CreateTodo key={item.id} description={item.description} deadline={item.deadline} deleteMethod={deleteMethod} id={item.id} />
                        </UnderlineItem>
                    )
                })}
            </ul>
        </div>
    )
}