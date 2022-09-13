import { useBoolean } from "ahooks";

export default () => {

  const [walletModalStatus, {setTrue, setFalse}] = useBoolean(false)

  const displayModal = ()=>{
    setTrue()
  }

  const hiddenModal = ()=>{
    setFalse()
  }

    const walletModal = {
      walletModalStatus,
      displayModal,
      hiddenModal
    };
   
    return { walletModal };
  };