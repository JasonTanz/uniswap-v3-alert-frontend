import { Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import { size } from "lodash";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { socket } from "uniswap-frontend/config/socket";
import { formatAddress } from "uniswap-frontend/utils/helper";
import PoolTable from "uniswap-frontend/containers/PoolTable";
import TransactionTable from "uniswap-frontend/containers/TransactionTable";
import { TPool, TTransaction } from "uniswap-frontend/@types/common";
import { PoolCreateData, SwapEventData } from "./props";
import uniSwapLogo from "uniswap-frontend/asset/uniswap_logo.jpg";
import Image from "next/image";

export type DashboardScreenProps = {};

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const DashboardScreen: React.FC<DashboardScreenProps> = () => {
    // =============== STATE
    const [tab, setTab] = useState("pools");
    const [latestPoolCreated, setLatestPoolCreated] = useState({} as TPool);
    const [latestSwapEvent, setLatestSwapEvent] = useState({} as TTransaction);

    // =============== EVENTS
    const onHandleTabChange = (
        event: React.SyntheticEvent,
        newValue: string
    ) => {
        setTab(newValue);
    };

    const onHandlePoolCreated = (pool: TPool) => {
        if (size(pool) === 0) return;
        toast.success(`New Pool ${formatAddress(pool?.address)} Created`, {
            duration: 6000,
            position: "top-right",
        });
        return setLatestPoolCreated(pool);
    };

    const onHandleSwapEvent = (transaction: TTransaction) => {
        if (size(transaction) === 0) return;
        toast.success(
            `New Swap Event on Pool ${formatAddress(
                transaction?.pool?.address
            )}`,
            {
                duration: 6000,
                position: "top-right",
            }
        );
        return setLatestSwapEvent(transaction);
    };

    // =============== EFFECTS
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to socket");

            socket.on("poolCreated", (data: PoolCreateData) =>
                onHandlePoolCreated(data?.pool)
            );

            socket.on("newSwapEvent", (data: SwapEventData) =>
                onHandleSwapEvent(data.transaction)
            );
        });

        return () => {
            socket.off("connect");
        };
    }, []);

    // =============== RENDER FUNCTIONS
    const renderContent = () => {
        switch (tab) {
            case "pools":
                return <PoolTable liveData={latestPoolCreated} />;
            case "transactions":
                return <TransactionTable liveData={latestSwapEvent} />;
            default:
                return <PoolTable liveData={latestPoolCreated} />;
        }
    };

    // =============== VIEWS
    return (
        <Container maxWidth="xl" sx={{ height: "100%" }}>
            <Stack direction={"row"} pt={5} gap={3} alignItems={"center"}>
                <Image
                    src={uniSwapLogo}
                    width={50}
                    height={50}
                    alt="uniSwap-logo"
                />
                <Typography color="#FFF" fontSize={"1.5rem"}>
                    Uniswap v3 Alert System
                </Typography>
            </Stack>
            <Stack height={"100%"} mb={5} mt={3} width={"100%"} gap={5}>
                <Tabs
                    value={tab}
                    onChange={onHandleTabChange}
                    sx={{
                        "& .MuiTab-root": {
                            color: "rgb(155, 155, 155)",
                        },
                    }}
                >
                    <Tab label="Pools" value="pools" />
                    <Tab
                        label="Transactions"
                        value="transactions"
                        color="rgb(155, 155, 155)"
                    />
                </Tabs>
                {renderContent()}
            </Stack>
        </Container>
    );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default DashboardScreen;
