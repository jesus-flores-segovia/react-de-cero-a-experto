// Funciones

// Es recomendable hacer uso de variables const para la definición de functions, para que su definición sea immutable.
const salute = function (name){

  return `Hello ${name}`;
};

// Arrow functions
const salute2  = (name) => {

  return `Hello ${name}`;
};

// Nos permite crear el return de la function de una manera más legible
const salute3  = (name) => `Hello ${name}`;
const salute4  = () => `Hello World`;

console.log(salute("Jesús"));
console.log(salute2("Jesús"));
console.log(salute3("Jesús"));
console.log(salute4());

// En el caso de devolver un object, hay que indicarle al compiler entre paréntesis el return
const getUser = () => (
  {
    uid: "0362894snu1903asd",
    username : "Jesús"
  }
);

console.log(getUser());

const getActiveUser = (name) => (
  {
    uid: "0362894snu1903asd",
    username : name
  }
);

console.log(getActiveUser("Jesús"));