import { useEffect, useState } from 'react';

export default function useDebounce(query) {
    const [debounceQuery, setDebounceQuery] = useState(query)
    useEffect(() => {
        const timeHandler = setTimeout(() => {
            setDebounceQuery(query);
        }, 500);
        return () => clearTimeout(timeHandler);
    }, [query])
    return debounceQuery;
}