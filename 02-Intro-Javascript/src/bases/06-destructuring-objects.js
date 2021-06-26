// Desestructuración de objetos

const person = {
  name: "Jesús",
  age: 28,
  key: "React Developer"
};

console.log(person.name);
console.log(person.age);
console.log(person.key);

// Extraemos el valor deseado del objeto en una constante. 
// Esta variable puede ser renombrada en caso necesario
//const {name:name2} = person;

//console.log(name2);

// Extramos las propiedades del objeto en una constante para que sean accesibles
const {name, age, key} = person;

console.log(name);
console.log(age);
console.log(key);

// Tambien es posible el uso de la desestructuración en la creación de una función
const restructureObject = ({name, age, key, rank = "Solutions Assistant"}) => {

  //console.log(name, age, key, rank);

  return {
    name2: name,
    key2: key,
    rank2: rank,
    latlng: {
      lat: 14.2324,
      lng: -13.5993
    }
  };
};

// Extraemos las propiedades del objeto, como se puede observar, es posible realizar
// la desestructuración de objetos anidados
const {name2, key2, rank2, latlng:{lat, lng}} = restructureObject(person);
console.log(name2, key2, rank2);
console.log(lat, lng);
