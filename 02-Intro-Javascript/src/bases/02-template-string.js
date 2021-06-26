// Template String
const name    = "Jesús";
const surname = "Flores";

//const fullName = name + " " + surname;
const fullName = `${name} ${surname}`;

console.log(fullName);

function getSalute (name) {

  return "Hello " + name;
}

console.log(`This is a text: ${getSalute(name)}`);