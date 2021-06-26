// Promesas

import { getHeroeById } from "./bases/08-import-export";

// Creamos una promise para comprobar el uso de resolve y reject
const promise = new Promise((resolve, reject) => {

  setTimeout(() => {

    const heroe = getHeroeById(2);
    resolve(heroe);
    //reject ("No se pudo encontrar al héroe");
  }, 2000);
});

promise.then ((heroe) => {
  console.log("Heroe", heroe);
}).catch(err => console.warn(err));

// Esta segunda promise, contiene la comprobación de la búsqueda del heroe para
// hacer uso del resolve o el reject
const getHeroeByIdAsync = (id) => {

  return new Promise((resolve, reject) => {

    setTimeout(() => {
  
      const heroe = getHeroeById(id);

      heroe ? resolve(heroe): reject(`No se encuentra ningun héroe con el identificador ${id}`);
      
    }, 2000);
  });
};

getHeroeByIdAsync(10)
  .then(console.log)
  .catch(console.warn);