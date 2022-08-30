import { useState } from "react";

export default () => {

  const [walletType, setWalletType] = useState('')
  const updateWalletType = (val: ConnectionType)=>{
    if(val){
      setWalletType(val)
    }
  }

    const wallet = {
      selectedWallet: '',
      selectedWalletBackfilled: '',
      updateWalletType
    };
   
    return { wallet };
  };