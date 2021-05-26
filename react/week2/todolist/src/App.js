import './App.css';
import React, { useEffect, useState } from "react";

const todos = [
    {
        id: 1,
        description: "Get out of bed",
    },
    {
        id: 2,
        description: "Brush teeth",
    },
    {
        id: 3,
        description: "Eat breakfast",
    },
];

const myTodoList = ["Finish my hyf homework", "Walk the dog", "Do laundry", "Prepare for class"]

function TodoItem(props) {
    const [todoStatus, setTodoStatus] = useState(true);
    function checkState() {
        setTodoStatus(!todoStatus)
    }

    return (
        <div className="todo-item">
            <div className="item-description">
                <input type="checkbox" onClick={checkState}></input>
                <li style={{ 'textDecoration': todoStatus ? 'none' : 'line-through' }} >{props.description}</li>
            </div>
            <div>
                <button onClick={() => props.deleteMethod(props.id)}> Delete </button>
            </div>
        </div>
    )
}

function ListContainer() {
    return (
        <div className="list-container">
            <h1>Todo List</h1>
            <List />
        </div>
    )
}

function List() {
    const [todo, setTodo] = useState(todos)
    function addTodo() {
        const randomIndex = Math.floor(Math.random() * myTodoList.length);
        setTodo(prev => [...prev, {
            id: prev.length + 1,
            description: myTodoList[randomIndex]
        }]);
    }
    function deleteTodo(itemID) {
        setTodo((prev) => {
            return prev.filter((item, index) => {
                return index !== itemID
            });
        })
    }
    return (
        <div>
            {todo.length === 0 && <p>No items</p>}
            <ul>
                {todo.map((item, index) => <TodoItem key={item.id} description={item.description} deleteMethod={deleteTodo} id={index} />)}
            </ul>
            <div className="add-button-container">
                <button onClick={addTodo} className="add-button">Add todo</button>
            </div>
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
            <ListContainer />
        </div>
    );
}

