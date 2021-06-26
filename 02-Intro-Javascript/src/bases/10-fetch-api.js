// Fetch API

const apiKey   = "H1fsG7dJKwEzuWy3mD6lXASZNOIU0c0y";
const httpCall = fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`);

// Promises encadenadas
// El catch captura todas las excepciones, estas excepciones podrian ser tratadas independientemente
httpCall
  .then(response => response.json())
  .then(({data}) => {

    const {url} = data.images.original;

    const img = document.createElement("img");
    img.src   = url;

    document.body.append(img);
  })
  .catch(console.warn);