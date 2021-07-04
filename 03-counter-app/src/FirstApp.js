import PropTypes from "prop-types";

// Podemos definir valores por defecto al recibir props vacias
const FirstApp = ({greetings= "There is not greetings prop", greetings2, subtitle, subtitle2, author}) => {

    // Tambien podemos realizar cualquier validación por tal de asignar un valor a la prop
    //subtitle = subtitle === undefined ? "There is not subtitle prop": null;

    return (
        <>
	        <h1>{greetings}</h1>
            {/*<h1>{greetings2}</h1>*/}
	        <p>{subtitle}</p>
            {/*<p>{subtitle2}</p>*/}
            {/*<pre>{JSON.stringify(author, null, 3)}</pre>*/}
        </>
    );
};

// Mediante PropTypes, es posible configurar validaciones para el uso del componente
FirstApp.propTypes = {
    //greetings2: PropTypes.string.isRequired
};

FirstApp.defaultProps = {
    subtitle2: "Here there is a default subtitle",
    subtitle: "Here there is a default subtitle"
};

export default FirstApp;