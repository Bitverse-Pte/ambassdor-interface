import { useWeb3React } from "@web3-react/core";
import { usePrevious } from "ahooks";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useModel } from "umi";

const Login = () => {
  const { account, connector } = useWeb3React();
  const previousAccount = usePrevious(account);

  const disconnect = ()=>{
    if(connector.deactivate){
      connector.deactivate()
    }else{
      connector.resetState()
    }
    window.localStorage.removeItem('auth')
    updateAuth('')
  }

  // @ts-ignore
  const {
    user: { auth, updateAuth, fetchUser, user, updateCurRole },
  } = useModel("userInfo");
  
  const {
    config: { contributor, ambassador },
  } = useModel("config");

  useEffect(() => {
    if (user && (contributor || ambassador)) {
      updateCurRole(contributor || ambassador)
    }
  }, [user, contributor, ambassador]);

  useEffect(() => {
    if (auth) {
      fetchUser();
    }
  }, [auth]);

  useEffect(()=>{
    // @ts-ignore
    window.__force_deactivate = disconnect
  }, [])

  
  useEffect(()=>{
    // 登出/切换account
    if((previousAccount && !account) || (previousAccount && account && previousAccount !== account)){
      disconnect()
    }
  }, [account, previousAccount])


  return null;
};

export default Login;
