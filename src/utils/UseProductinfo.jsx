import { useState, useEffect } from "react";

/**
 * Custom hook to fetch product information from an API.
 * 
 * @param {string} apiURL 
 * @returns {Object} 
 */

function useProductinfo(apiURL) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(apiURL, { signal });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                if (err.name === 'AbortError') {
                } else {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        return () => {
            controller.abort();
        };
    }, [apiURL]);
    return { data, error, loading };
}

export default useProductinfo;
