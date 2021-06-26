// Variables y constantes
const name    = "Jesús";
const surname = "Flores";

let value = 5;
value     = 4;

console.log(name, surname, value);

if (true) {

  // Se vuelven a declarar las variables con el mismo nombre.
  // Al observar la salida por consola, podemos ver que estas variables definen el scope dentro de este bloque.
  const name = "Jesús";
  let value  = 6;

  console.log(name, value);
}

// Aquí se está utilizando la variable definido en el scope exterior.
console.log(value);