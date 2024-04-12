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
import { formatAddress } from "uniswap-frontend/utils/helper";
import { useLazyFetchData } from "uniswap-frontend/hooks/fetchDataHooks";
import { Props } from "./props";
import { TPool } from "uniswap-frontend/@types/common";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const PoolTable: React.FC<Props> = (props) => {
    const { liveData } = props;

    // =============== STATE
    const [data, setData] = useState([] as TPool[]);

    // =============== API
    const { loading } = useLazyFetchData({
        url: "/api/pools/getAll",
        onCompleted: (data) => {
            setData(data.data.data);
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
                        #
                    </TableCell>
                    <TableCell sx={{ color: "rgb(155, 155, 155)" }}>
                        Pool
                    </TableCell>
                    <TableCell sx={{ color: "rgb(155, 155, 155)" }}>
                        Transactions
                    </TableCell>
                    <TableCell sx={{ color: "rgb(155, 155, 155)" }}>
                        Address
                    </TableCell>
                </TableRow>
            </TableHead>
        );
    };

    const renderTableBody = () => {
        if (size(data) === 0) return null;

        return (
            <TableBody>
                {map(data, (poolData, index) => {
                    const poolAddress = poolData?.address;
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
                                    `https://etherscan.io/address/${poolAddress}`,
                                    "_blank"
                                );
                            }}
                        >
                            <TableCell sx={{ color: "rgb(155, 155, 155)" }}>
                                #{index + 1}
                            </TableCell>
                            <TableCell sx={{ color: "#FFF" }}>
                                <Stack>
                                    <Typography>
                                        {poolData?.token0?.tokenName}/
                                        {poolData?.token1?.tokenName}
                                    </Typography>
                                </Stack>
                            </TableCell>
                            <TableCell sx={{ color: "#FFF" }}>
                                {size(poolData.transactions)}
                            </TableCell>
                            <TableCell sx={{ color: "#FFF" }}>
                                {poolAddress}
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
export default PoolTable;
