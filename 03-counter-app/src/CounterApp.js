import {useState} from "react"
import PropTypes from "prop-types";


const CounterApp = ({value = CounterApp.defaultProps.value}) => {

    // Definimos el State del componente con el valor a 0 mediante el Hook useState
    const [counter, setCounter] = useState(value);

    const handleSubstract = (e) => {
        
        // En caso de no disponer de la desestructuración del array
        //setCounter((value) => value + 1);
        setCounter(counter - 1);
    };

    const handleReset = (e) => {
        
        // En caso de no disponer de la desestructuración del array
        //setCounter((value) => value + 1);
        setCounter(value);
    };
    
    const handleAdd = (e) => {
        
        // En caso de no disponer de la desestructuración del array
        //setCounter((value) => value + 1);
        setCounter(counter + 1);
    };

    return (

        <>
            <h1>Counter App</h1>
            <h2>{counter}</h2>
            <button onClick={handleSubstract}>-1</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleAdd}>+1</button>
        </>
    );

};

CounterApp.propTypes = {
    value: PropTypes.number
};

CounterApp.defaultProps = {
    value: 0
}

export default CounterApp;