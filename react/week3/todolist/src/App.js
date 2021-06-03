import './App.css';
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';

import "react-datepicker/dist/react-datepicker.css";


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

    function inputChange(e) {
        setTodoDescription(prev => e.target.value)
    }

    return (
        <div className="todo-item">
            <div className="item-description">
                <input type="checkbox" onClick={checkboxStatus}></input>
                <li className="todo-li" style={{ 'textDecoration': todoStatus ? 'none' : 'line-through' }} >
                    {updateStatus ? <span>{todoDescription}</span> : <input onChange={(e) => inputChange(e)} value={todoDescription} ></input>}
                    <span className="todo-deadline">{deadline}</span>
                </li>
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


function DescriptionInput(props) {
    return (
        <div>
            <label>Description</label>
            <input className="description-input" onChange={(e) => props.changeMethod(e.target, 'description')} type="text" name="description" value={props.value} autoComplete="off"></input>
        </div>
    )
}

function DeadlineInput(props) {
    const [startDate, setStartDate] = useState(null);
    const date = new Date();

    return (
        <DatePicker
            placeholderText="Click to select a date"
            closeOnScroll={true}
            selected={startDate}
            onChange={(date) => {
                setStartDate(date)
                props.changeMethod(date, 'date')
            }
            }
            name="deadline"
            value={props.value}
            minDate={date}
            openToDate={date}
            className="date-input"
            autoComplete="off"
        />
    )
}

function TodoForm(props) {
    const [inputTodo, setInputTodo] = useState({
        description: "",
        deadline: ""
    });
    function setNewInput(inputValue, inputName) {
        if (inputName === 'date') {
            setInputTodo((prev) => {
                return ({ ...prev, deadline: inputValue.getFullYear() + "-" + ((inputValue.getMonth() < 10) ? "0" : "") + (inputValue.getMonth() + 1) + "-" + ((inputValue.getDate() < 10) ? "0" : "") + inputValue.getDate() })
            })
        } else if (inputName === 'description') {
            const { name, value } = inputValue;
            setInputTodo((prev) => {
                return ({ ...prev, [name]: value })
            })
        }
    }

    const { addMethod } = props
    return (
        <div className="add-todo-container">
            <h3>Add a todo</h3>
            <div className="inputs-container">
                <DescriptionInput changeMethod={setNewInput} value={inputTodo.description} />
                <DeadlineInput changeMethod={setNewInput} value={inputTodo.deadline} />
                <div className="add-button-container">
                    <button onClick={() => {
                        addMethod(inputTodo)
                        setInputTodo({
                            description: "",
                            deadline: null
                        })
                    }} className="add-button">Add todo</button>
                </div>
            </div>
        </div>

    )
}

function TodoListContainer() {
    const [todo, setTodo] = useState([]);
    const [id, setId] = useState(4);

    useEffect(() => {
        fetch("https://gist.githubusercontent.com/benna100/391eee7a119b50bd2c5960ab51622532/raw")
            .then(data => data.json())
            .then(apiTodo => setTodo(prev => apiTodo))
    }, [])
    function incrementId() {
        setId(prev => prev + 1);
    }

    function addTodo(newTodo) {
        let { description, deadline } = newTodo
        if (description.length === 0) {
            description = undefined;
        }
        if (deadline === "") {
            alert("Set a valid due date")
            return
        }

        incrementId();
        setTodo(prev => {
            return (
                [...prev, {
                    id: id,
                    description: description,
                    deadline: deadline
                }]
            )
        }

        );
    }

    function deleteTodo(itemID) {
        setTodo((prev) => {
            return prev.filter((item, index) => {
                return item.id !== itemID
            });
        })
    }
    return (
        <div className="list-container">
            <h1>Todo List</h1>
            <TodoForm addMethod={addTodo} />
            <TodoList todoList={todo} deleteMethod={deleteTodo} />
        </div>
    )
}

function TodoBorder(props) {
    return (
        <div className="todo-border" >
            {props.children}
        </div>
    )
}

function TodoList(props) {
    const { todoList, deleteMethod } = props;
    return (
        <div>
            {todoList.length === 0 && <p>No items</p>}
            <ul>
                {todoList.map((item, index) => {
                    return (
                        <TodoBorder key={item.id} >
                            <CreateTodo key={item.id} description={item.description} deadline={item.deadline} deleteMethod={deleteMethod} id={item.id} />
                        </TodoBorder>
                    )
                })}
            </ul>
        </div>
    )
}


function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setTimeout(() => setCount(prev => prev += 1), 1000)
    })
    return <p>You have used {count} seconds on this website</p>
}

export default function App() {
    return (
        <div className="App">
            <Counter />
            <TodoListContainer />
        </div>
    );
}