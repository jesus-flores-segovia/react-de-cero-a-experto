const FirstApp = () => {

    const greetings = "Hello World";
    const object    = {name: "Jesús", surname: "Flores"};

    return (
        <>
	        <h1>{greetings}</h1>
	        <p>My first React App</p>
            <pre>{JSON.stringify(object, null, 3)}</pre>
        </>
    );
};

export default FirstApp;