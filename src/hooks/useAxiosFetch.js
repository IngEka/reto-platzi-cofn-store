/* eslint-disable no-unused-expressions */

import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataAddress) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const params = {
        access_key: process.env.ACCESS_KEY,
        query: dataAddress
    }


    const Api = process.env.API_URL
    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();
 
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(Api, {params}, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setData(response.data.data);
                    console.log(response.data.data)
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData([]);
                }
            } finally {
                isMounted && setIsLoading(false);
            }
        }

        fetchData();

        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }
        console.log(process.env.API_URL)
        return cleanUp;
    }, [Api]);

    return { data, fetchError, isLoading };
}

export default useAxiosFetch;
