import React, { useMemo } from 'react';
import { Redirect, useParams } from 'react-router';
import { getHeroById } from '../../selectors/getHeroById';

const heroes = require.context("../../assets/heroes", true);

export const HeroScreen = ({history}) => {

    const {heroId} = useParams();

    const hero = useMemo(() => getHeroById(heroId), [heroId]);

    if(!hero) { return <Redirect to="/"/>};

    const {
        id,
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;

    const handleReturn = () => history.length <= 2 ? history.push("/") : history.goBack();

    return (
        <div className="row">
            <div className="col-4 animate__animated animate__fadeInLeft">
                <img src={heroes(`./${id}.jpg`).default} className="img-thumbnail" alt={superhero} />
            </div>
            <div className="col-8">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego: </b>{alter_ego}</li>
                    <li className="list-group-item"><b>Publisher: </b>{publisher}</li>
                    <li className="list-group-item"><b>First Appearance: </b>{first_appearance}</li>
                </ul>

                <h5 className="mt-3">Characters</h5>
                <p>{characters}</p>

                <button 
                    className="btn btn-primary"
                    onClick={handleReturn}
                >
                Go back
                </button>
            </div>
        </div>
    )
}
