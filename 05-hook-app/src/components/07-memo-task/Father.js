import React from 'react'
import { Child } from './Child'
import { useState, useMemo, useCallback } from 'react';

export const Father = () => {

    const numbers = [2,4,6,8,10];
    const [value, setValue] = useState(0);

    const increment = useCallback((number) => {
        setValue(value => value + number);
    }, [setValue]);

    return (
        <div>
            <h1>Padre</h1>
            <p> Total: { value } </p>

            <hr />

            {
                numbers.map( n => (
                    <Child 
                        key={ n }
                        number={ n }
                        increment={ increment }
                    />
                ))
            }
        </div>
    )
}
