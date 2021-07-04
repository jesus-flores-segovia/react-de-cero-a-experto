export const getImagen = async() => {

    try {

        const apiKey = 'H1fsG7dJKwEzuWy3mD6lXASZNOIU0c0yy';
        const resp   = await fetch(`http://api.giphy.com/v1/gifs/random?api_key=${ apiKey }`);
        const { data } = await resp.json(); 

        const { url } = data.images.original;

        return url;

    } catch (error) {
        return "Image doesn't exist"
    }
}