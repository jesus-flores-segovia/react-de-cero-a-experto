import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveNote, startDelete } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const {active: note} = useSelector(state => state.notes);
    const [values, handleInputChange, reset] = useForm(note);
    const {title, body} = values;

    const activeId = useRef(note.id);

    useEffect(() => {
        if(note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }
    }, [note, reset])

    useEffect(() => {
        dispatch(setActiveNote(values.id, {imageUrl: note.imageUrl, ...values}));
    }, [values, dispatch])

    const handleDelete = () => {
        dispatch(startDelete(note.id));
    }
    
    return (
        <div className="notes__main-content">
            <NotesAppBar/>
            <div className="notes__content">
                <input 
                    name='title'
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea 
                    name='body'
                    placeholder="What happened today"
                    className="notes__textarea" 
                    value={body}
                    onChange={handleInputChange}    
                />
                {note.imageUrl &&
                    <div className="notes__image">
                        <img src={note.imageUrl} alt="image"/>
                    </div>
                }
            </div>
            <button 
                className='buttons__btn buttons__btn-danger'
                onClick={handleDelete}
                >
                Delete
            </button>
        </div>
    )
}
