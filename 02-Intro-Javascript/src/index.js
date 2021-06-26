// Operador condicional ternario

const active = true;

// Manera tradicional de realizar una estructura condicional
// let message = "";

// if(!active){

//   message = "Active";

// } else{

//   message = "Inactive";
// }

// Mediante el operador condicional ternario
//const message = (active) ? "Active" : "Inactive";

// Podemos decidir si devolver un resultado en caso de false o no
//const message = (active) ? "Active" : null;

// Podemos resumir una clausula condicional de esta manera, si no queremos devolver ningun resultado en caso de que no se cumpla la condición
const message = active && "Active";

console.log(message);