import {
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { map, size } from "lodash";
import {
    formatAddress,
    formatNumber,
    formatTokenName,
    getTimeAgo,
} from "uniswap-frontend/utils/helper";
import { useLazyFetchData } from "uniswap-frontend/hooks/fetchDataHooks";
import { Props } from "./props";
import { TTransaction } from "uniswap-frontend/@types/common";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const TransactionTable: React.FC<Props> = (props) => {
    const { liveData } = props;

    // =============== STATE
    const [data, setData] = useState([] as TTransaction[]);

    // =============== API
    const { loading } = useLazyFetchData({
        url: "/api/transactions/getAll",
        onCompleted: (data) => {
            setData(data?.data?.data);
        },
    });

    // =============== EFFECTS
    useEffect(() => {
        if (size(liveData) > 0) {
            setData((prevData) => [liveData, ...prevData]);
        }
    }, [liveData]);

    // =============== RENDER FUNCTIONS
    const renderTableHead = () => {
        return (
            <TableHead
                sx={{
                    background: "rgb(27, 27, 27)",
                }}
            >
                <TableRow
                    sx={{
                        "&:last-child td, &:last-child th": {
                            border: 0,
                            borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
                        },
                    }}
                >
                    <TableCell
                        sx={{
                            color: "rgb(155, 155, 155)",
                        }}
                    >
                        Time
                    </TableCell>
                    <TableCell sx={{ color: "rgb(155, 155, 155)" }}>
                        Type
                    </TableCell>
                    <TableCell sx={{ color: "rgb(155, 155, 155)" }}>
                        Tx Hash
                    </TableCell>
                    <TableCell sx={{ color: "rgb(155, 155, 155)" }}>
                        Token Amount
                    </TableCell>
                    <TableCell sx={{ color: "rgb(155, 155, 155)" }}>
                        Token Amount
                    </TableCell>
                    <TableCell sx={{ color: "rgb(155, 155, 155)" }}>
                        Sender
                    </TableCell>
                    <TableCell sx={{ color: "rgb(155, 155, 155)" }}>
                        Recipient
                    </TableCell>
                    <TableCell sx={{ color: "rgb(155, 155, 155)" }}>
                        Pool
                    </TableCell>
                </TableRow>
            </TableHead>
        );
    };

    const renderTableBody = () => {
        if (size(data) === 0) return null;

        return (
            <TableBody>
                {map(data, (transactionData, index) => {
                    const poolData = transactionData?.pool;
                    const txHash = transactionData?.transactionHash;
                    return (
                        <TableRow
                            key={index}
                            sx={{
                                "& td, & th": {
                                    border: 0,
                                },
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                window.open(
                                    `https://etherscan.io/tx/${txHash}`,
                                    "_blank"
                                );
                            }}
                        >
                            <TableCell sx={{ color: "rgb(155, 155, 155)" }}>
                                {getTimeAgo(transactionData.timestamp)}
                            </TableCell>
                            <TableCell sx={{ color: "#FFF" }}>
                                <Typography>
                                    <span>Swap</span>{" "}
                                    {formatTokenName(
                                        poolData?.token0?.tokenName
                                    )}{" "}
                                    <span>for</span>{" "}
                                    {formatTokenName(
                                        poolData?.token1?.tokenName
                                    )}
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ color: "#FFF" }}>
                                {txHash}
                            </TableCell>
                            <TableCell sx={{ color: "#FFF" }}>
                                {formatNumber(transactionData?.amount0)}{" "}
                                {formatTokenName(poolData?.token0?.tokenName)}
                            </TableCell>
                            <TableCell sx={{ color: "#FFF" }}>
                                {formatNumber(transactionData?.amount1)}{" "}
                                {formatTokenName(poolData?.token1?.tokenName)}
                            </TableCell>
                            <TableCell sx={{ color: "#FFF" }}>
                                {formatAddress(transactionData?.sender)}
                            </TableCell>
                            <TableCell sx={{ color: "#FFF" }}>
                                {formatAddress(transactionData?.recipient)}
                            </TableCell>
                            <TableCell sx={{ color: "#FFF" }}>
                                {formatAddress(poolData?.address)}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        );
    };

    // =============== VIEWS
    if (loading) return null;
    return (
        <Table
            sx={{
                borderRadius: "2rem",
                border: "1px solid rgba(255, 255, 255, 0.07)",
            }}
        >
            {renderTableHead()}
            {renderTableBody()}
        </Table>
    );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default TransactionTable;
