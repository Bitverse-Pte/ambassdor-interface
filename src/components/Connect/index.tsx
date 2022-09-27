import { useWeb3React } from "@web3-react/core";
import { useModel } from "umi";
import WalletModal from "../WalletModal";

const Connect = ({ children }: { children: any }) => {
  const { account } = useWeb3React();
  const {
    walletModal: { displayModal },
  } = useModel("walletModal");

  const {
    user: { auth },
  } = useModel("userInfo");

  const handleConnect = () => {
    displayModal();
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={handleConnect}
      >
        {account && !auth ? "Sign in" : "Connect Wallet"}
      </div>
      <WalletModal />
    </>
  );
};

export default Connect;
