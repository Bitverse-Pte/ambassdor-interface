import {
  ConnectionType,
  injectedConnection,
  networkConnection,
  walletConnectConnection,
} from "@/config";
import { Connector } from "@web3-react/types";
import { BigNumber } from "bignumber.js";

export function getIsInjected(): boolean {
  return Boolean(window.ethereum);
}

export function getIsMetaMask(): boolean {
  return window.ethereum?.isMetaMask ?? false;
}

const CONNECTIONS = [
  injectedConnection,
  walletConnectConnection,
  networkConnection,
];
export function getConnection(c: Connector | ConnectionType) {
  if (c instanceof Connector) {
    const connection = CONNECTIONS.find(
      (connection) => connection.connector === c
    );
    if (!connection) {
      throw Error("unsupported connector");
    }
    return connection;
  } else {
    switch (c) {
      case ConnectionType.INJECTED:
        return injectedConnection;
      case ConnectionType.WALLET_CONNECT:
        return walletConnectConnection;
      case ConnectionType.NETWORK:
        return networkConnection;
    }
  }
}

export function getConnectionName(
  connectionType: ConnectionType,
  isMetaMask?: boolean
) {
  switch (connectionType) {
    case ConnectionType.INJECTED:
      return isMetaMask ? "MetaMask" : "Injected";
    case ConnectionType.WALLET_CONNECT:
      return "WalletConnect";
    case ConnectionType.NETWORK:
      return "Network";
  }
}

export const fuzzAddress = (
  str: string,
  before = 6,
  after = 4,
  fuzz = "...."
) => {
  if (!str || str.length <= before + after) return str;
  return `${str.slice(0, before)}${fuzz}${str.slice(-after)}`;
};

export function uriToHttp(uri: string): string[] {
  const protocol = uri.split(":")[0].toLowerCase();
  switch (protocol) {
    case "data":
      return [uri];
    case "https":
      return [uri];
    case "http":
      return ["https" + uri.substr(4), uri];
    case "ipfs":
      const hash = uri.match(/^ipfs:(\/\/)?(.*)$/i)?.[2];
      return [
        `https://cloudflare-ipfs.com/ipfs/${hash}/`,
        `https://ipfs.io/ipfs/${hash}/`,
      ];
    case "ipns":
      const name = uri.match(/^ipns:(\/\/)?(.*)$/i)?.[2];
      return [
        `https://cloudflare-ipfs.com/ipns/${name}/`,
        `https://ipfs.io/ipns/${name}/`,
      ];
    case "ar":
      const tx = uri.match(/^ar:(\/\/)?(.*)$/i)?.[2];
      return [`https://arweave.net/${tx}`];
    default:
      return [];
  }
}

const SI_PREFIXES = [
  { value: 1, symbol: "" },
  { value: 1e3, symbol: "k" },
  { value: 1e6, symbol: "M" },
  { value: 1e9, symbol: "G" },
  { value: 1e12, symbol: "T" },
  { value: 1e15, symbol: "P" },
  { value: 1e18, symbol: "E" },
];

export const abbreviateNumber = (_number: number) => {
  const number = Number(_number);

  if (number === 0) return number;

  const tier: any = SI_PREFIXES.filter((n) => number >= n.value).pop();
  const numberFixed = (number / tier.value).toFixed(1);

  return `${numberFixed}${tier.symbol}`;
};

export const sign = async (account: string) => {
  const exampleMessage = `Welcome Dear Teleporter! \n\r
Gear up and embark on your Quests to win level-up points in the Ambassador Program as a Contributor or Ambassador.\n\r
Your journey to becoming a seasoned Teleporter begins now...`;

  try {
    const from = account;
    const msg = `0x${Buffer.from(exampleMessage, "utf8").toString("hex")}`;
    // @ts-ignore
    const sign = await window?.teleport?.request({
      method: "personal_sign",
      params: [msg, from, "Teleport Ambassador"],
    });

    return sign;
  } catch (err) {
    // @ts-ignore
    window?.__toast && window?.__toast.error(err?.message);
    console.error(err);
  }
};

export const format = (_: any) => BigNumber(_ || 0).toFormat();

export const uuidv4 = () => {
  const UINT36 = '10000000-1000-4000-8000-100000000000';
  // eslint-disable-next-line no-bitwise
  const random = (x: string) => ((Number(x) ^ crypto.getRandomValues(new Uint8Array(1))[0]) & 15) >> (Number(x) / 4);
  return UINT36.replace(/[018]/g, (x) => random(x)!.toString(16));
};