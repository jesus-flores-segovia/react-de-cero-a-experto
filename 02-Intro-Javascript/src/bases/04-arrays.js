// Arrays en Javascript

// No se recomienda crear arrays mediante constructor. Utilizar en caso de querer crear un array con ciertas posiciones
//const array = new Array();

// Se crea mediante un array literal
const array = [1, 2, 3, 4];

console.log(array);

// No se recomienda hacer uso del method push, ya que este modifica el object
// array.push(1);
// array.push(2);
// array.push(3);
// array.push(4);

// Copia del objeto mediante referencia en memoria
let array2 = array;

// Mediante el uso del método push, estamos alterando el objeto, modificando por lo tanto la referencia unica en memoria de los objetos
//array2.push(5);

console.log(array2);
console.log(array);

// Para realizar una clonación del objeto inicial, añadir un nuevo valor y no alterar el objeto inicial, hacemos uso de spread syntax
array2 = [...array, 5];

console.log(array2);
console.log(array);

// Creamos un nuevo array mediante el uso del method "map" y una función de callback
const array3 = array2.map(function(number){

  return number * 2;
});

console.log(array3);
