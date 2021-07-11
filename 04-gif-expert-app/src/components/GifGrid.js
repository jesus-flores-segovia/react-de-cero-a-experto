import { useState, useEffect } from "react";
import { GifGridItem } from "./GifGridItem";

export const GifGrid = ({category}) => {
    
    const [images, setImages] = useState([]);

    useEffect(() => {
        getGifs();
    }, []);

    const getGifs = async() => {

        const url = "https://api.giphy.com/v1/gifs/search?api_key=H1fsG7dJKwEzuWy3mD6lXASZNOIU0c0y&q=Rick and Morty&limit=10";
        const response = await fetch(url);
        const {data} = await response.json();

        const gifs = data.map(img => {
            return {
                id: img.id,
                title: img.title,
                url: img.images?.downsized_medium.url
            }
        })

        setImages(gifs);
    };

    return (
        <div>
            <h3>{category}</h3>
            {
                images.map(img => (
                    <GifGridItem
                        key={img.id}
                        {...img}
                    />
                ))
            }
        </div>
    )
}
