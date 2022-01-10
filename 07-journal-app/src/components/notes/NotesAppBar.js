import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const {active: note} = useSelector(state => state.notes);
    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(startSaveNote(note));
    }

    const handlePictureUpload = () => {
        document.querySelector("#fileSelector").click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if(file) {
            dispatch(startUploading(file));
        }
    }

    return (
        <div className="notes__appbar">
            <span>28th August 2021</span>
            <input
                id='fileSelector' 
                type="file" 
                style={{display: 'none'}}
                onChange={handleFileChange}    
                />
            <div>
                <button 
                    className="buttons__btn"
                    onClick={handlePictureUpload}>
                    Picture
                </button>
                <button 
                    className="buttons__btn"
                    onClick={handleSave}
                    >
                    Save
                </button>
            </div>
        </div>
    )
}
