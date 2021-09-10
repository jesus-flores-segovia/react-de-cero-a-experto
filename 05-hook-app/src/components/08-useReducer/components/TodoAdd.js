import React from 'react';
import {useForm} from '../../../hooks/useForm';

export const TodoAdd = ({handleAdd}) => {

    const [{description}, handleInputChanges, reset] = useForm({
        description: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if(description.trim().length === 0){
            reset();
            return;
        }

        handleAdd(description);
        reset();
    };

    return (
        <>
        <h4>Add TODO</h4>
        <hr/>
                    
        <form onSubmit={handleSubmit}>
            <input type="text" name="description" className="form-control" placeholder="Learn..." autoComplete="off" onChange={handleInputChanges} value={description}/>
            <div className="d-grid">
                <button type="submit" className="btn btn-outline-primary mt-1">Add</button>
            </div>
        </form>
        </>
    )
}
