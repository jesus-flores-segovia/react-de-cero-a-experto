describe("Tests inside file demo.test.js", () =>{

    test("Message values need to be equal", () =>{

        // Inicialization
        const message = "Hello World";
    
        // Action
        const message2 = `Hello World`;
    
        // Observe the behavior
        expect(message).toBe(message2);
    });
});