import React, {useState} from 'react';
import {useCounter} from "../../hooks/useCounter"
import { Small } from './Small';

import '../02-useEffect/effects.css';

export const Memorize = () => {

    const {counter, increment} = useCounter();
    const [show, setShow] = useState(false);

    return (
        <div>
            <h1>Counter: <Small value={counter}/></h1>
            <hr/>

            <button className="btn btn-primary" onClick={() => increment()}>+1</button>
            <button className="btn btn-primary ms-3" onClick={() => setShow(!show)}>Show/Hide: {JSON.stringify(show)}</button>
        </div>
    )
}
