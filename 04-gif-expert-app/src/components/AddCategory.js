import { useState } from "react"
import PropTypes from "prop-types";

export const AddCategory = ({setCategories}) => {
    
    // Es importante inicializar el state, para evitar el warning que aparece por consola, que nos avisa de cambios incontrolados en el input
    const [inputValue, setInputValue] = useState();
    
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(inputValue.trim().length !== 0){
            // Recibimos las categories en el callback de la función del useState
            setCategories(categories => [...categories, inputValue]);
            setInputValue("");
        }
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
            />
        </form>
    )
}

AddCategory.propTypes = {
    setCategories: PropTypes.func.isRequired
};