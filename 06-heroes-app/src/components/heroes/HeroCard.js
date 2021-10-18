import React from 'react'
import { Link } from 'react-router-dom'

export const HeroCard = ({
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
}) => {

    return (
        <div class="col-sm-3 mb-4">
            <div class="card">
                <img src={`./assets/heroes/${id}.jpg`} className="card-img-top" alt={superhero}/>
                <div class="card-body">
                    <h5 className="card-title">{superhero}</h5>
                    <p className="card-text">{alter_ego}</p>

                    {
                        (alter_ego !== characters)
                            && <p className="card-text">{characters}</p>
                    }

                    <p className="card-text">
                        <small className="text-muted">{first_appearance}</small>
                    </p>

                    <Link to={`./hero/${id}`}>
                        See more
                    </Link>
                </div>
            </div>
        </div>
    )
}
