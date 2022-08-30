import { injectedConnection } from "@/config";
import { getConnection } from "@/utils";
import { Connector } from "@web3-react/types";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useModel } from "umi";
import Button from "../Button";
import TeleportIcon from "../Icons/TeleportIcon";
import Modal from "../Modal";

const modals = [
  {
    key: "teleport",
    name: "Teleport",
    icon: require("@/assets/teleportWallet.png"),
    connector: injectedConnection.connector,
  },
  {
    key: "metamask",
    name: "Metamask",
    icon: require("@/assets/metamask.png"),
    connector: injectedConnection.connector,
  },
  {
    key: "keplr",
    name: "Keplr",
    icon: require("@/assets/keplr.png"),
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
    cursor: pointer;
    &:last-of-type{
      .divider{
        margin-bottom: 0;
      }
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
  button.md {
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    padding: 11px 0;
    height: max-content;
    border-radius: 12px;
  }
`;

export default () => {
  const [step, setStep] = useState(0);
  const [active, setActive] = useState("");

  const {
    walletModal: { walletModalStatus, displayModal, hiddenModal },
  } = useModel("walletModal");
  const {
    wallet: { updateWalletType },
  } = useModel("wallet");

  const handleConnect = async (item: any, connector: Connector) => {
    const connectionType = getConnection(connector).type;
    setActive(item.key);

    try {
      await connector.activate();
      updateWalletType(connectionType);
    } catch (error) {
      console.debug(`web3-react connection error: ${error}`);
    }
  };

  useEffect(() => {
    if (!walletModalStatus) {
      setStep(0);
    }
  }, [walletModalStatus]);

  // injectedConnection.connector
  return (
    <Modal
      visible={walletModalStatus}
      onClose={hiddenModal}
      title="Connect your wallet"
    >
      <ModalContainer>
        {step ? (
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
                <div className="divider" />
              </div>
            ))}
          </Wallets>
        ) : (
          <>
            <TeleportIcon width={98} height={98} />
            <div className="recommend">
              Recommended: Please make sure you are connecting Teleport Wallet -
              rewards (tokens, NFTs) will be bound with the Teleport Wallet
              address you filled in entry-level task list.
            </div>
            <Button
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
