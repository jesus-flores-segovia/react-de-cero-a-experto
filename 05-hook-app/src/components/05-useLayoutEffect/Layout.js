import React, {useLayoutEffect, useRef, useState} from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useCounter } from '../../hooks/useCounter';
import '../02-useEffect/effects.css';
import './layout.css';

export const Layout = () => {

    const {counter, increment, reset} = useCounter(1);
    const {data} = useFetch(`https://breakingbadapi.com/api/quotes/${counter}`);
    const {author, quote} = !!data && data[0];

    const pRef = useRef();
    const [boxSize, setBoxSize] = useState({});

    useLayoutEffect(() => {
        setBoxSize(pRef.current.getBoundingClientRect());
    }, [quote])

    return (
        <div>
            <h1>LayoutEffect</h1>
            <hr/>
            <blockquote className="blockquote text-end">
                <p className="mb-3" ref={pRef}>{quote}</p>
                <footer className="blockquote-footer">{author}</footer>
            </blockquote>

            <pre>{JSON.stringify(boxSize, null, 3)}</pre>
            
            <button className="btn btn-primary" onClick={() => {counter === 30? reset(): increment(1)}}>Next quote</button>

            
        </div>
    )
}
