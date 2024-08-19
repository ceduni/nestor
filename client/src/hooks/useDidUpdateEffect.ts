import {useEffect, useRef} from "react";

export function useDidUpdateEffect(fn, inputs) {
    const isMountingRef = useRef(false);

    useEffect(() => {
        isMountingRef.current = true;
    }, []);

    useEffect(() => {
        if (!isMountingRef.current) {
            return fn();
        } else {
            isMountingRef.current = false;
        }
    }, inputs);
}