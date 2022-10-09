import { injectedConnection } from "@/config";
import { login } from "@/server";
import { getConnection } from "@/utils";
import { useWeb3React } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import { useRequest } from "ahooks";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useModel } from "umi";
import Button from "../Button";
import TeleportIcon from "../Icons/TeleportIcon";
import TeleportSignIcon from "../Icons/TeleportSignIcon";
import Modal from "../Modal";

const modals = [
  {
    key: "teleport",
    name: "Teleport",
    icon: require("@/assets/teleportWallet.png"),
    connector: injectedConnection.connector,
  },
];

const Wallets = styled.div`
  display: flex;
  flex-direction: column;
  width: 528px;
  .row {
    display: flex;
    align-items: center;
  }
  .row-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      margin-right: 24px;
    }
    span {
      font-weight: 600;
      font-size: 20px;
      line-height: 26px;
      color: #ffffff;
    }
  }
  .divider {
    height: 1px;
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    margin: 32px 0;
  }
  .dot {
    width: 10px;
    height: 10px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    transition: all linear 0.2s;
    &.active {
      background: #00ebc8;
      box-shadow: 0px 0px 8px #00ebc8;
      border: none;
    }
  }
  .wallet-item {
    padding: 30px 0;
    cursor: pointer;
    &:last-of-type {
      .divider {
        margin-bottom: 0;
      }
    }
  }

  .wallet-download-link {
    text-decoration: none;
    margin-top: 3px;
    margin-bottom: 0;
    width: 100%;
    background: rgba(217, 217, 217, 0.1);
    border-radius: 4px;
    padding: 7px 0;
    color: #00ebc9;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      svg {
        transform: translate(8px, 0);
      }
    }
    svg {
      transition: all linear 0.2s;
      margin-left: 12px;
    }
  }
`;

const ModalContainer = styled.div`
  padding-top: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .recommend {
    font-weight: 700;
    font-size: 14px;
    line-height: 177%;
    color: #ffffff;
    text-align: center;
    margin: 24px 0 36px;
  }

  .download-link {
    text-decoration: none;
    margin-bottom: 36px;
    width: 100%;
    background: rgba(217, 217, 217, 0.1);
    border-radius: 4px;
    padding: 7px 0;
    color: #00ebc9;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      svg {
        transform: translate(8px, 0);
      }
    }
    svg {
      transition: all linear 0.2s;
      margin-left: 12px;
    }
  }

  button.md {
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    padding: 11px 0;
    height: max-content;
    border-radius: 12px;
    .loader {
      height: 30px;
    }
  }
`;

export default () => {
  const [step, setStep] = useState(0);
  const [active, setActive] = useState("");
  const { account } = useWeb3React();
  // 登陆
  const { run, data, loading, error } = useRequest(
    ({ address }) => login({ address }),
    { manual: true }
  );

  const {
    walletModal: { walletModalStatus, hiddenModal },
  } = useModel("walletModal");
  const {
    wallet: { updateWalletType },
  } = useModel("wallet");
  // @ts-ignore
  const {
    user: { updateAuth },
  } = useModel("userInfo");

  const handleConnect = async (item: any, connector: Connector) => {
    const connectionType = getConnection(connector).type;
    setActive(item.key);

    try {
      await connector.activate();
      updateWalletType(connectionType);
      // @ts-ignore
      const address: [string] = await connector?.provider.request({
        method: "eth_requestAccounts",
      });
      if (address[0]) {
        run({ address: address[0] });
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.debug(`web3-react connection error: ${error}`);
      // @ts-ignore
      if(error?.code === 4001){
        toast('Please');
      }else{
        toast.error(error?.message);
      }
      // todo 引流下载钱包链接
    }
  };

  useEffect(() => {
    if (!walletModalStatus) {
      setStep(0);
    }
  }, [walletModalStatus]);

  const handleSign = () => {
    if (loading) {
      toast.error("Please check the request in your wallet");
      return;
    }
    run({ address: account });
  };

  useEffect(() => {
    // @ts-ignore
    if (data?.data?.result?.token) {
      toast("Login Success!");
      // @ts-ignore
      updateAuth(data?.data?.result?.token);
    }
  }, [data]);

  useEffect(()=>{
    if(error){
      toast.error("Unknown Character!");
      hiddenModal();
    }
  }, [error])

  // @ts-ignore
  const hasDownloadTeleport = useMemo(()=>!!window?.teleport, [])

  // injectedConnection.connector
  return (
    <Modal
      visible={walletModalStatus}
      onClose={hiddenModal}
      title={account ? "Sign in" : "Connect your wallet"}
    >
      <ModalContainer style={{ minWidth: "526px" }}>
        {account ? (
          // sign
          <>
            <TeleportSignIcon width={98} height={98} />
            <div className="recommend">Please sign in your wallet</div>
            <Button loading={loading} onClick={handleSign}>
              Sign in
            </Button>
          </>
        ) : step ? (
          <Wallets>
            {modals?.map((i) => (
              <div
                className="wallet-item"
                onClick={() => {
                  handleConnect(i, i.connector);
                }}
                key={i.key}
              >
                <div className="row-between">
                  <div className="row">
                    <img src={i.icon} />
                    <span>{i.name}</span>
                  </div>
                  <div className={`dot ${active === i.key ? "active" : ""}`} />
                </div>
                {/* <div className="divider" /> */}
              </div>
            ))}

           {hasDownloadTeleport ? null : <a
              className="wallet-download-link"
              target="_blank"
              href="https://chrome.google.com/webstore/detail/teleport-wallet/gkeelndblnomfmjnophbhfhcjbcnemka"
            >
              Download Teleport Wallet Here
              <svg
                width="22"
                height="10"
                viewBox="0 0 22 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 9.5L20.1741 5.74329C20.6155 5.34605 20.6155 4.65395 20.1741 4.25671L16 0.5"
                  stroke="#00EBC9"
                  strokeLinecap="round"
                />
                <rect y="4.5" width="20" height="1" rx="0.5" fill="#00EBC9" />
              </svg>
            </a>}
          </Wallets>
        ) : (
          <>
            <TeleportIcon width={98} height={98} />
            <div className="recommend">
              Recommended: Please make sure you are connecting Teleport Wallet -
              rewards (tokens, NFTs) will be bound with the Teleport Wallet
              address you filled in entry-level task list.
            </div>

            {hasDownloadTeleport ? null : <a
              className="download-link"
              target="_blank"
              href="https://chrome.google.com/webstore/detail/teleport-wallet/gkeelndblnomfmjnophbhfhcjbcnemka"
            >
              Download Teleport Wallet Here
              <svg
                width="22"
                height="10"
                viewBox="0 0 22 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 9.5L20.1741 5.74329C20.6155 5.34605 20.6155 4.65395 20.1741 4.25671L16 0.5"
                  stroke="#00EBC9"
                  strokeLinecap="round"
                />
                <rect y="4.5" width="20" height="1" rx="0.5" fill="#00EBC9" />
              </svg>
            </a>}

            <Button
              disabled={!hasDownloadTeleport}
              onClick={() => {
                setStep(1);
              }}
            >
              Next
            </Button>
          </>
        )}
      </ModalContainer>
    </Modal>
  );
};
