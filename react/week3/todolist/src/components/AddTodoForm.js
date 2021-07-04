import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DescriptionInput(props) {
    return (
        <div className="description-input-container">
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
            }}
            name="deadline"
            value={props.value}
            minDate={date}
            openToDate={date}
            className="date-input"
            autoComplete="off"
        />
    )
}

export default function AddTodoForm(props) {
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
            <div className="add-todo-inputs-container">
                <div className="inputs-container">
                    <DescriptionInput changeMethod={setNewInput} value={inputTodo.description} />
                    <DeadlineInput changeMethod={setNewInput} value={inputTodo.deadline} />
                </div>
                <div className="add-button-container">
                    <button onClick={() => {
                        addMethod(inputTodo)
                        setInputTodo({
                            description: "",
                            deadline: ""
                        })
                    }} className="add-button">Add todo</button>
                </div>
            </div>
        </div>
    )
}