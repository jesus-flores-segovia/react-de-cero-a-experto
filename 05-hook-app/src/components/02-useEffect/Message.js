import React, {useEffect, useState} from 'react';

export const Message = () => {

    const [coordinates, setCoordinates] = useState({x: 0, y: 0});
    const {x, y} = coordinates;

    useEffect(() => {

        console.log("component mounted!");

        const mouseMove = (e) => {
            console.log("mouseMove on action!")
            setCoordinates({x: e.x, y: e.y});
            console.log(coordinates)
        }

        window.addEventListener("mousemove", mouseMove);

        return () => {

            console.log("component unmounted!");
            window.removeEventListener("mousemove", mouseMove);
        }
    }, [])

    return (
        <div>
            <h3>You're fantastic!</h3>
            <p>x: {x}</p>
            <p>y: {y}</p>
        </div>
    )
}
