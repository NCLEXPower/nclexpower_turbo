import { useEffect, useRef } from "react";
export function usePreviousValue<T>(value: T) {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    }, [value])
    return ref.current
}