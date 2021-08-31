import React, {useCallback, useState} from 'react';
import { ShowIncrement } from './ShowIncrement';

import '../02-useEffect/effects.css';

export const CallbackHook = () => {

    const [counter, setCounter] = useState(10);

    const increment = useCallback(
        (factor) => {
            setCounter(counter => counter + factor);
        },
        [setCounter],
    );

    return (
        <div>
            <h1>useCallback Hook {counter}</h1>
            <hr/>

            <ShowIncrement increment={increment}/>
        </div>
    )
}
