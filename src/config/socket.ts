import { io } from "socket.io-client";
import { API_URL } from "./constant";

const isBrowser = typeof window !== "undefined";

export const socket: any | {} = isBrowser ? io(API_URL || "") : {};
