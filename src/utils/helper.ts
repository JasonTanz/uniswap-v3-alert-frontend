import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

export const formatAddress = (address: string) => {
    const formattedAddress = `0x...${address?.slice(-4)}`;
    return formattedAddress;
};

export const getTimeAgo = (timestamp: string) => {
    return dayjs(timestamp).fromNow();
};

export const formatTokenName = (name: string) => {
    return name.substring(0, 3);
};
