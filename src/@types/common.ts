export type TPool = {
    address: string;
    token0: TToken;
    token1: TToken;
    transactions: TTransaction[];
    _id?: string;
    createdAt?: string;
};

export type TToken = {
    address: string;
    tokenName: string;
    logo: string;
    decimals: number;
};

export type TTransaction = {
    transactionHash: string;
    pool: TPool;
    sender: string;
    recipient: string;
    amount0: number;
    amount1: number;
    timestamp: string;
};
