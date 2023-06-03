import { useState } from "react";
import axios from "axios";

const useAxios = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async (url, method, data = null) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios({
                method,
                url,
                data,
            });

            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(error.response.data.error.message);
        }
    };

    return { loading, error, sendRequest };
};

export default useAxios;
