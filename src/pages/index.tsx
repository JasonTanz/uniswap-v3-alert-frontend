import Head from "next/head";
import DashboardScreen from "uniswap-frontend/screens/Dashboard";

export default function Home() {
    return (
        <>
            <Head>
                <title>Uniswap V3 Alert</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DashboardScreen />
        </>
    );
}
