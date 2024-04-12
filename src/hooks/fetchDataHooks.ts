import { useEffect, useState } from "react";
import useAxios from "./useAxios";

type BaseOptions = {
    url: string;
    onCompleted?: (res: any) => void;
    onError?: (res: any) => void;
    axiosParams?: any;
};

type LazyOptions = BaseOptions & {
    params?: any;
};

const useFetchData = ({
    url,
    axiosParams,
    onCompleted,
    onError,
}: BaseOptions) => {
    const [data, setData] = useState<any>();
    const [error, setError] = useState();
    const handleCompletedData = (res: any) => {
        setData(res.data);
        onCompleted?.(res);
    };
    const handleOnError = (err: any) => {
        setError(err);
        onError?.(err);
    };
    const { loading, fetch } = useAxios(
        {
            url,
            method: "GET",
            ...axiosParams,
        },
        handleCompletedData,
        handleOnError
    );

    return {
        loading,
        fetch,
        data,
        error,
    };
};

const useLazyFetchData = <T>({
    url,
    onCompleted,
    onError,
    params,
    axiosParams,
}: LazyOptions) => {
    const [data, setData] = useState<T>();
    const [error, setError] = useState();
    const handleCompletedData = (res: any) => {
        setData(res.data);
        onCompleted?.(res);
    };
    const handleOnError = (err: any) => {
        setError(err);
        onError?.(err);
    };
    const { loading, fetch: fetchData } = useAxios(
        {
            url,
            method: "GET",
            ...axiosParams,
        },
        handleCompletedData,
        handleOnError
    );

    useEffect(() => {
        fetchData(params ?? null);
    }, []);

    return {
        loading,
        refetch: fetchData,
        data,
        error,
    };
};

const usePostData = ({
    url,
    axiosParams,
    onCompleted,
    onError,
}: BaseOptions) => {
    const { loading, fetch } = useAxios(
        {
            url,
            method: "POST",
            ...axiosParams,
        },
        onCompleted,
        onError
    );

    return {
        loading,
        fetch,
    };
};

const usePatchData = ({
    url,
    axiosParams,
    onCompleted,
    onError,
}: BaseOptions) => {
    const { loading, fetch } = useAxios(
        {
            url,
            method: "PATCH",
            ...axiosParams,
        },
        onCompleted,
        onError
    );

    return {
        loading,
        fetch,
    };
};

export { useFetchData, useLazyFetchData, usePostData, usePatchData };
