import { useState } from "react";
import { API_URL } from "../config/constant";
import axios from "axios";
type onUpdate = (err: object | null | any, res: any | null) => any;

axios.defaults.baseURL = API_URL;
const useAxios = (axiosParams: object, onCompleted: any, onError: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const fetchData = (data?: object | null) => {
        setLoading(true);
        axios
            .request({
                ...axiosParams,
                data: data ? data : null,
            })
            .then((res: any) => {
                if (
                    res.status === 200 ||
                    res.status === 201 ||
                    res.status === 203
                ) {
                    onCompleted(res);
                } else {
                    onError?.(res);
                }
            })

            .catch((err: any) => {
                const message = err?.response?.data?.message;
                onError?.(message, err);
            })

            .finally(() => {
                setLoading(false);
            });
    };

    return { loading, fetch: fetchData };
};

export default useAxios;
