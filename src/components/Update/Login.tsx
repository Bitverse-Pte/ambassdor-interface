import { getAmbassadorLevel, getContributorLevel, login } from "@/server";
import { useWeb3React } from "@web3-react/core";
import { useLocalStorageState, useRequest } from "ahooks";
import { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useModel } from "umi";

const Login = () => {
  const { account } = useWeb3React();

  // @ts-ignore
  const {
    user: { auth, updateUser, fetchUser, user, updateCurRole },
  } = useModel("userInfo");

  // @ts-ignore
  const {
    config: { contributor, ambassador },
  } = useModel("config");

  const curRole = useMemo(() => {
    if(!user?.role) return;
    const cr = user?.role;
    switch (cr) {
      case "ambassador":
        return ambassador;
      case "contributor":
        return contributor;
      default:
        return contributor;
    }
  }, [contributor, ambassador, user]);

  const { run, loading, data, error } = useRequest(
    ({ address }) => login({ address }),
    { manual: true }
  );

  useEffect(() => {
    if (user && contributor && ambassador) {
      updateCurRole(curRole)
    }
  }, [user, contributor, ambassador, curRole]);

  useEffect(() => {
    if (account && !auth) {
      run({ address: account });
    }
  }, [account]);

  useEffect(() => {
    // @ts-ignore
    if (data?.data?.result?.token) {
      toast("Login Success!");
      // @ts-ignore
      updateUser(data?.data?.result?.token);
    }
  }, [data]);

  useEffect(() => {
    if (auth) {
      fetchUser();
    }
  }, [auth]);

  return null;
};

export default Login;
