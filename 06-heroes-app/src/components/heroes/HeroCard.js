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
        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card h-100">
                <img src={`./assets/heroes/${id}.jpg`} className="card-img-top" alt={superhero}/>
                <div className="card-body">
                    <h5 className="card-title">{superhero}</h5>
                    <p className="card-text">{alter_ego}</p>

                    {
                        (alter_ego !== characters)
                            && <p className="card-text">{characters.split(",").map(character => character.trim()).filter(character => character !== alter_ego).join(", ")}</p>
                    }

                    <p className="card-text">
                        <small className="text-muted">{first_appearance}</small>
                    </p>

                    <Link to={`/hero/${id}`}>
                        See more
                    </Link>
                </div>
            </div>
        </div>
    )
}
