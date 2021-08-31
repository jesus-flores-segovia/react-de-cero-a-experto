import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useCounter } from '../../hooks/useCounter';
import '../02-useEffect/effects.css';

export const MultipleCustomHooks = () => {

    const {counter, increment, reset} = useCounter(1);
    const {loading, data, error} = useFetch(`https://breakingbadapi.com/api/quotes/${counter}`);
    const {author, quote} = !loading && data[0];

    return (
        <div>
            <h1>Breaking Bad Quotes</h1>
            <hr/>

            {
                loading? 
                (<div className="alert, alert-info text-center">
                Loading...
                </div>)
                :
                <blockquote className="blockquote text-end">
                    <p className="mb-3">{quote}</p>
                    <footer className="blockquote-footer">{author}</footer>
                </blockquote>
            }
            
            <button className="btn btn-primary" onClick={() => {counter === 30? reset(): increment(1)}}>Next quote</button>

            
        </div>
    )
}
