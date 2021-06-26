// Desestructuración de arrays

const characters = ["Goku", "Vegeta", "Trunks"];

// Extraemos solamente el valor situado en la posición 3 del array
const [ ,  , p3] = characters;

console.log(p3);

const returnArray = () => {

  return ["ABC", 123];
};

// Como podemos observar, la desestructuración es util en caso de querer retornar
// los distintos data type por separado
const [letters, numbers] = returnArray();

console.log(letters, numbers);

const restructureArray = (value) => {

  return [value, () => {console.log("Hello World")}];
};

// Extraemos el valor y la función renombrando cada uno de ellos
const [name, setName] = restructureArray("Goku");

console.log(name);
setName();