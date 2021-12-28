import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize:"cover",
                    backgroundImage: "url(https://whatsup.es/wp-content/uploads/2020/09/travel-trip-journey.jpg)"
                }}
                >
            </div>
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    A new day
                </p>
                <p className="journal__entry-content">
                    Lorem ipsum asit met
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    )
}
