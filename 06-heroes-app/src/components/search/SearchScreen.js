import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { useLocation } from 'react-router';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({history}) => {

    const location = useLocation();
    const q = queryString.parse(location.search).q;

    const [values, handleInputChange] = useForm({
        query: q || ""
    });

    const {query} = values;

    let filteredHeroes = useMemo(() => {
        return getHeroesByName(q);
    }, [q]);

    const handleSearch = (e) => {
        e.preventDefault();

        if (!query) {
            history.replace({ pathname: location.pathname, search: ''});
            return;
        }
             
        location.search = queryString.stringify({q: query});
        history.push(`?${location.search}`);    
    }

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
                            className="btn btn-block btn-outline-primary w-100 mt-2"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr/>
                    {
                        filteredHeroes.length === 0 && 
                        !q &&
                            <div className="alert alert-info" role="alert">
                                <p>
                                    Try to search something.
                                </p>
                            </div>
                    }
                    {
                        filteredHeroes.length === 0 && 
                        q &&
                            <div className="alert alert-danger" role="alert">
                                <p>
                                    There are not results for '{query}'. <br/>
                                    Please try again.
                                </p>
                            </div>
                    }
                    <div className="row">
                        {
                            filteredHeroes.length !== 0 && filteredHeroes.map(hero => 
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
