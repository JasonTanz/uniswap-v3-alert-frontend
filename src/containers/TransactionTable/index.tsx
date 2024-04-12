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
import { formatAddress, getTimeAgo } from "uniswap-frontend/utils/helper";
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
                    return (
                        <TableRow
                            key={index}
                            sx={{
                                "& td, & th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell sx={{ color: "rgb(155, 155, 155)" }}>
                                {getTimeAgo(transactionData.timestamp)}
                            </TableCell>
                            <TableCell sx={{ color: "#FFF" }}>
                                <Typography>
                                    <span>Swap</span>{" "}
                                    {poolData?.token0?.tokenName}{" "}
                                    <span>for</span>{" "}
                                    {poolData?.token1?.tokenName}
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ color: "#FFF" }}>
                                {transactionData?.transactionHash}
                            </TableCell>
                            <TableCell sx={{ color: "#FFF" }}>
                                {transactionData?.amount0}{" "}
                                {poolData?.token0?.tokenName}
                            </TableCell>
                            <TableCell sx={{ color: "#FFF" }}>
                                {transactionData?.amount1}{" "}
                                {poolData?.token1?.tokenName}
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
