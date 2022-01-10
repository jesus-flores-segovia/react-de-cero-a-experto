import moment from 'moment';
import React from 'react'
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../actions/notes';

export const JournalEntry = ({id, title, body, date, imageUrl}) => {

    const dispatch = useDispatch();

    const noteDate = moment(date);

    const handleEntryClick = () => {
        dispatch(setActiveNote(id, {title, body, date, imageUrl}));
    };

    return (
        <div className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
            onClick={handleEntryClick}
            >
            {imageUrl && <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize:"cover",
                    backgroundImage: `url(${imageUrl})`
                }}
                >
            </div>}
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>{noteDate.format("dddd")}</span>
                <h4>{noteDate.format("Do")}</h4>
            </div>
        </div>
    )
}
