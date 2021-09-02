import React, { useEffect, useReducer } from 'react';
import {todoReducer} from './todoReducer';
import {useForm} from '../../hooks/useForm';

import './styles.css';

const init = () => {
    return JSON.parse(localStorage.getItem("todos")) || [];
}

export const TodoApp = () => {


    const [todos, dispatch] = useReducer(todoReducer, [], init);

    const [{description}, handleInputChanges, reset] = useForm({
        description: ""
    });

    console.log(description);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(description.trim().length === 0){
            reset();
            return;
        }

        const newTodo = {
            id: new Date().getTime(),
            desc: description,
            done: false
        };

        const action = {
            type: "add",
            payload: newTodo
        };

        dispatch(action);
        reset();
    };

    return (
        <div>
            <h1>TodoApp ( {todos.length} )</h1>
            <hr/>

            <div className="row">
                <div className="col-7">
                    <ul className="list-group list-group-flush">
                        {todos.map((todo, index) => {
                            return(
                                <>
                                    <li key={todo.id} className="list-group-item">
                                        <p className="text-center">{index + 1}. {todo.desc}</p>
                                        <button className="btn btn-danger">Remove</button>
                                    </li>
                                </>
                                )
                        })}
                    </ul>
                </div>

                <div className="col-5">
                    <h4>Add TODO</h4>
                    <hr/>

                    <form onSubmit={handleSubmit}>
                        <input type="text" name="description" className="form-control" placeholder="Learn..." autoComplete="off" onChange={handleInputChanges} value={description}/>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-outline-primary mt-1">Add</button>
                        </div>
                    </form>
                </div>
            </div>


            
        </div>
    )
}
