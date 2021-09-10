import React, { useEffect, useReducer } from 'react';
import {todoReducer} from './todoReducer';

import './styles.css';
import { TodoList } from './components/TodoList';
import { TodoAdd } from './components/TodoAdd';

const init = () => {
    return JSON.parse(localStorage.getItem("todos")) || [];
}

export const TodoApp = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], init);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleAdd = (description) => {

        const newTodo = {
            id: new Date().getTime(),
            desc: description,
            done: false
        };

        dispatch({
            type: "add",
            payload: newTodo
        });
    };

    const handleDelete = (todoId) => {

        dispatch({
            type: "delete",
            payload: todoId
        });
    };

    const handleToggle = (todoId) => {
        
        dispatch({
            type: "toggle",
            payload: todoId
        });
    };

    return (
        <div>
            <h1>TodoApp ( {todos.length} )</h1>
            <hr/>

            <div className="row">
                <div className="col-7">
                    <TodoList todos={todos} handleDelete={handleDelete} handleToggle={handleToggle}/>
                </div>

                <div className="col-5">
                    <TodoAdd handleAdd={handleAdd}/>
                </div>
            </div>
        </div>
    )
}
