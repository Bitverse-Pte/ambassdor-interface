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
    console.log('token', token, window.localStorage.getItem("auth"))
    if (token && config.headers) {
      config.headers["X-Access-Token"] = token;
      return config;
    }
    throw {message: 'Invalid', code: -99}
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
    console.log('err', err)
    if(err?.code === -99) {
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

export const login = async ({
  address,
}: {
  address: string;
}) => {
  try {
    const signature = await sign(address)
    if(!signature) {
      return new Error("Login Failed");
    }
    const loginRes = await publicAxios.post("/jeecg-boot/sys/user-login", {
      address,
      sign: signature,
    });
    if (!loginRes?.data?.result?.token) {
      return new Error("Login Failed");
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
export const getJoinedQuest = async () =>
  privateAxios.get("/jeecg-boot/am/profile/joined-quest");

// 全部list
export const getQuestList = async (
  { page, questKey, assignTo, type }: any = { page: 0, questKey: null, assignTo: null, type: null }
) =>
  privateAxios.get("/jeecg-boot/amquest/quest/list", {
    params: {
      pageNo: (page||1) ,
      pageSize: 9,
      questKey,
      assignTo,
      type
    },
  });

// listActionDefByMainId
export const filterActionList = async ({ questFk, id }: any) =>
  privateAxios.get("/jeecg-boot/amquest/quest/listActionDefByMainId", {
    params: {
      questFk,
      id,
    },
  });

// ambassador level
export const getAmbassadorLevel = async () =>
  privateAxios.get("/jeecg-boot/amlevel/ambassadorLevel/list");

// contributor level
export const getContributorLevel = async () =>
  privateAxios.get("/jeecg-boot/amlevel/contributorLevel/list");

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
