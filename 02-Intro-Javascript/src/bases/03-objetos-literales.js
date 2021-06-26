// Objetos literales

// Creación de un objeto literal
const person = {
  name: "Jesús",
  surname: "Flores",
  age: 28,
  direction: {
    city: "Barcelona",
    zip: "08640",
    lat: 14.2332,
    lng: 32.3443
  }
};

console.log(person);
console.table(person);

// Creamos un clon del objeto anterior
// ¡Cuidado!: no se debe hacer esto, ya que se está accediendo al objeto "person" por referencia en memoria
const person2 = person;
person2.name = "Peter";

console.log(person2);
console.table(person2);
console.log(person);
console.table(person);

// Utilizamos spread syntax para clonar el objeto 
const person3 = {...person};
person3.name  = "Miki";

console.log(person3);
console.table(person3);
console.log(person);
console.table(person);