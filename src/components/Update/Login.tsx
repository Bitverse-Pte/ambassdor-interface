import { getAmbassadorLevel, getContributorLevel, login } from "@/server";
import { useWeb3React } from "@web3-react/core";
import { useLocalStorageState, usePrevious, useRequest } from "ahooks";
import { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useModel } from "umi";

const Login = () => {
  const { account, connector, hooks } = useWeb3React();
  const previousAccount = usePrevious(account)

  // @ts-ignore
  const {
    user: { auth, updateUser, fetchUser, user, updateCurRole },
  } = useModel("userInfo");
  
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
    const storageAuth = window.localStorage.auth
    const _s = JSON.parse(storageAuth)
    if(_s && !auth){
      updateUser(_s);

      return;
    }

    if (account && !auth && !_s) {
      run({address: account})
    }
  }, [account, auth]);

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

  useEffect(()=>{
    // @ts-ignore
    window.__force_deactivate = ()=>{
      if(connector && connector.deactivate){
        connector.deactivate()
      }
    }
  }, [])

  useEffect(()=>{
    if(previousAccount && !account){
      window.localStorage.removeItem('auth')
      updateUser('')
    }
  }, [account, previousAccount])

  return null;
};

export default Login;
