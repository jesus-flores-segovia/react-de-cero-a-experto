// Async y Await

//const getImagePromise = () => new Promise(resolve => resolve("https://media1.giphy.com/media/cPa0SJ328UpmTbadtj/giphy.gif?cid=cc01726b9ab3a2bb61687bae7a32211f0f47d8bbd845c703&rid=giphy.gif&ct=g"));
//getImagePromise().then(console.log);

const getImage = async() => {

  const apiKey   = "H1fsG7dJKwEzuWy3mD6lXASZNOIU0c0y";

  try {
    
    const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`);
    const {data}   = await response.json();
  
    const {url} = data.images.original;
  
    const img = document.createElement("img");
    img.src   = url;
  
    document.body.append(img);

  } catch (error) {
    
    // Controlamos cualquier excepción
    console.log(error);
  }

};

getImage();

