import React, { useEffect, useState } from 'react'
import { heroes } from '../../data/heroes'
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';

export const SearchScreen = () => {

    const [filteredHeroes, setFilteredHeroes] = useState([]);

    const [values, handleInputChange] = useForm({
        query: ""
    });

    const {query} = values;

    const handleSearch = (e) => {
        e.preventDefault();
        setFilteredHeroes(
            heroes.filter((hero) => (hero.superhero.toLowerCase().includes(query.toLowerCase())) )
        );        
    }

    console.log(filteredHeroes)

    useEffect(() => {
        console.log("Component re-render")
    }, [filteredHeroes])


    return (
        <div>
            <h1>SearchScreen</h1>
            <hr/>

            <div className="row">

                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr/>

                    <form onSubmit={handleSearch}>
                        <input 
                            className="form-control"
                            name="query"
                            type="text"
                            id="query"
                            value={query}
                            placeholder="Find your hero"
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                        <button 
                            type="submit"
                            className="btn btn-block btn-outline-primary m-1"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr/>
                    <div className="row">
                        {
                            filteredHeroes.map(hero => 
                                <HeroCard 
                                    key={hero.id}
                                    {...hero}
                                />
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}
