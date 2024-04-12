import "uniswap-frontend/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Fragment } from "react";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Fragment>
            <Toaster />
            <Component {...pageProps} />
        </Fragment>
    );
}
