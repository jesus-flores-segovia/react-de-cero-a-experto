export const heavyProcess = (iterations) => {

    for (let i = 0; i < iterations; i++){
        console.log(`Iteration ${i + 1}.`);
    }

    return `${iterations} iterations done.`
};