import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

export default function TodoListContainer() {
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
        });
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
            <AddTodoForm addMethod={addTodo} />
            <TodoList todoList={todo} deleteMethod={deleteTodo} />
        </div>
    )
}