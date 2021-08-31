import React, { memo } from 'react'

export const Small = memo(({value}) => {

    console.log("Small component rendered!");

    return (
        <small>
            {value}
        </small>
    )
});
