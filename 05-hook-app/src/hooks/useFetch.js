import { useState, useEffect, useRef } from "react";

export const useFetch = (url) => {
    
    const isMounted = useRef(true);
    const [state, setState] = useState({data: null, loading: true, error: null});

    useEffect(() => {
        return () => {
            isMounted.current = false;
            console.log("isMounted to false.");
        }
    }, [])

    useEffect(() => {
        console.log("useEffect of [url].");
        setState({data: null, loading: true, error: null});

        fetch(url)
            .then(res => res.json())
            .then(data => {
                
                    setTimeout(() => {
                        if(isMounted.current){
                            setState({
                                loading: false,
                                error: null,
                                data
                            });
                        } else{
                            console.log("setState not called.");
                        }
                    }, 4000);
            });

    }, [url]);

    return state;
}
