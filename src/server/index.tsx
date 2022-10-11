import { ROLE } from "@/interface";
import { sign } from "@/utils";
import axios, { AxiosRequestConfig } from "axios";

// https://documenter.getpostman.com/view/667615/VUjLL76H#3df655e5-22d8-4f64-a3df-a87a2ca62d20

const getToken = () => {
  const _a = window.localStorage.getItem("auth");
  if (!_a) return null;
  return JSON.parse(_a);
};

const privateAxios = axios.create({
  timeout: 100000,
});
const publicAxios = axios.create({
  timeout: 100000,
});

privateAxios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers["X-Access-Token"] = token;
      return config;
    }
    throw { message: "Invalid", code: -99 };
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

privateAxios.interceptors.response.use(
  (config) => {
    if (config?.data?.code !== 200) {
      // @ts-ignore
      window?.__toast && window?.__toast.error(config?.data?.message);
    }
    return config;
  },
  (err) => {
    console.log("err", err);
    if (err?.code === -99) {
      return err;
    }
    // @ts-ignore
    window?.__toast && window?.__toast.error(err?.message);
    if (err?.response?.data?.code) {
      window.localStorage.removeItem("auth");
      // @ts-ignore
      window?.__force_deactivate && window?.__force_deactivate();
    }
    return err;
  }
);

publicAxios.interceptors.response.use(
  (config) => {
    if (config?.data?.code !== 200) {
      // @ts-ignore
      window?.__toast && window?.__toast.error(config?.data?.message);
    }
    return config;
  },
  (err) => {
    // @ts-ignore
    window?.__toast && window?.__toast.error(err?.message);
    return err;
  }
);

export const login = async ({ address }: { address: string }) => {
  try {
    const signature = await sign(address);
    if (!signature) {
      return Promise.reject("Login Failed");
    }
    const loginRes = await publicAxios.post("/jeecg-boot/am/user-login", {
      address,
      sign: signature,
    });
    if (!loginRes?.data?.result?.token) {
      // return new Error("Login Failed");
      return Promise.reject("Login Failed");
    }
    // window.localStorage.auth = loginRes?.data?.result?.token
    return Promise.resolve(loginRes);
  } catch (err) {
    // @ts-ignore
    window?.__toast && window?.__toast.error(err?.message);
    return Promise.reject(err);
  }
};

// 通过actionRef -> listActionDefByMainId查详情
export const getActionList = async ({
  questKey,
}: {
  questKey?: string | null;
}) =>
  privateAxios.get("/jeecg-boot/am/profile/action", {
    params: {
      questKey,
    },
  });

// 先查quest 再通过id查询action
export const getJoinedQuest = async ({ page, from, to }: any = { page: 0 }) =>
  privateAxios.get("/jeecg-boot/am/profile/joined-quest", {
    params: {
      pageNo: page || 1,
      pageSize: 9,
      from,
      to,
    },
  });

// 全部list
export const getQuestList = async (
  { page, questKey, assignTo, type }: any = {
    page: 0,
    questKey: null,
    assignTo: null,
    type: null,
  }
) =>
  privateAxios.get("/jeecg-boot/amquest/quest/list", {
    params: {
      pageNo: page || 1,
      pageSize: 9,
      questKey,
      assignTo,
      type,
    },
  });

// listActionDefByMainId
export const filterActionList = async ({ questKey }: any) =>
  privateAxios.get("/jeecg-boot/amquest/quest/listActionDefByMainId", {
    params: {
      questKey,
    },
  });

export const filterActionCategories = async ({ questKey }: any) =>
  publicAxios.get("/jeecg-boot/ambassador/quest/action-def-categories", {
    params: {
      questFk: questKey,
    },
  });
// /action-def-categories

// get profile
export const getProfile = async () =>
  privateAxios.get("/jeecg-boot/am/profile");

// collect point
export const collectPoint = async () =>
  privateAxios.post("/jeecg-boot/am/profile/collect-point");

// error 504
// ambassador user
export const getAmbassadorUser = async () =>
  privateAxios.get("/jeecg-boot/amuser/ambassadorUser/list");

export const getPublicQuestList = async ({assignTo}: any) =>
  publicAxios.get("/jeecg-boot/ambassador/quest/list", {
    params: {
      pageSize: 5,
      active: "Y",
      assignTo: assignTo || ROLE.contributor
    },
  });

export const getAllPublicQuestList = async (props: any) =>
  publicAxios.get("/jeecg-boot/ambassador/quest/list", {
    params: {
      ...props,
      column: "active",
      order: "desc",
    },
  });

//
export const getPublicNFTList = async () =>
  publicAxios.get("/jeecg-boot/ambassador/nft/list");

// 获取contributor等级
export const getContributorLevelList = async () =>
  publicAxios.get("/jeecg-boot/amlevel/contributorLevel/list");

// 获取ambassador等级
export const getAmbassadorLevelList = async () =>
  publicAxios.get("/jeecg-boot/amlevel/ambassadorLevel/list");

export const getPublicContributorNFTList = async () =>
  publicAxios.get("/jeecg-boot/contributor/nft/list");

// 用户获取的nft
export const getUserNFT = async (props?: any) =>
  privateAxios.get("/jeecg-boot/am/profile/user-nft", {
    params: {
      ...props,
    },
  });

// 用户获取的token
export const getUserToken = async (props?: any) =>
  privateAxios.get("/jeecg-boot/am/profile/user-token", {
    params: {
      ...props,
    },
  });

// 获取progress
export const getUserNftProgress = async () =>
  privateAxios.get("/jeecg-boot/am/profile/user-nft-onprogress");

// {{host}}/jeecg-boot/am/profile/claim-token?name=CLV1
// claim token post接口特殊处理
export const claimToken = async ({ name }: any) =>
  privateAxios.post(`/jeecg-boot/am/profile/claim-token?name=${name}`);
