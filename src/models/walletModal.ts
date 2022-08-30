import { useBoolean } from "ahooks";

export default () => {

  const [walletModalStatus, {setTrue, setFalse}] = useBoolean(false)

  const displayModal = (val: ConnectionType)=>{
    setTrue()
  }

  const hiddenModal = (val: ConnectionType)=>{
    setFalse()
  }

    const walletModal = {
      walletModalStatus,
      displayModal,
      hiddenModal
    };
   
    return { walletModal };
  };