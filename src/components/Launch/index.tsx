import { fuzzAddress } from "@/utils";
import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import Connect from "@/components/Connect";
import { useBoolean, useClickAway } from "ahooks";
import { useModel } from "umi";
import { useEffect, useRef } from "react";

const Container = styled.div`
  position: relative;
  .home, .logout {
    cursor: pointer;
    z-index: 12;
    backdrop-filter: blur(2px);
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translate(0, 100%);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
    background: linear-gradient(
        298.38deg,
        rgba(10, 203, 228, 0.13) 17.25%,
        rgba(10, 203, 228, 0) 51.67%
      ),
      rgba(255, 255, 255, 0.1);
    padding: 4px 20px;
  }

  .logout{
    transform: translate(0, 200%);
    margin-top: 15px;
  }
`;

const ButtonContainer = styled.div`
  border-radius: 5px;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  transition: all 0.2s linear;
  display: flex;
  align-items: center;
  &.connect {
    background: #0acbe4;
    color: #000;
    padding: 4px 29px;
  }
  &.login {
    backdrop-filter: blur(2px);
    background: linear-gradient(
        298.38deg,
        rgba(10, 203, 228, 0.13) 17.25%,
        rgba(10, 203, 228, 0) 51.67%
      ),
      rgba(255, 255, 255, 0.1);
    color: #fff;
    padding: 4px 20px;
  }
  .divider {
    width: 1px;
    height: 8px;
    background: #ffffff;
    opacity: 0.2;
    border-radius: 4px;
    margin: 0 6px;
  }
  .avatar {
    width: 20px;
    height: 20px;
    overflow: hidden;
    border-radius: 50%;
    background: #00ecc9;
  }
  /* &:hover{
        background: linear-gradient(180deg, #009EFD 0%, #12EFCF 100%), #0ACBE4;
    } */
`;

const LaunchApp = () => {
  const [showTab, { toggle, setTrue, setFalse }] = useBoolean(false);
  const container = useRef();
  const { account, connector } = useWeb3React();
  // @ts-ignore
  const {
    user: { updateAuth },
  } = useModel("userInfo");

  const disconnect = () => {
    if (connector.deactivate) {
      connector.deactivate();
    } else {
      connector.resetState();
    }
    window.localStorage.removeItem("auth");
    updateAuth("");
    setTimeout(()=>{
      window.location.reload()
    }, 500)
  };

  useClickAway(() => {
    setFalse();
  }, [() => document.getElementById("wallet-logout"), container]);

  useEffect(() => {
    if (!account) {
      setFalse();
    }
  }, [account]);

  if (account) {
    return (
      <Container ref={container}>
        <ButtonContainer
          className="login"
          onClick={toggle}
        >
          <img
            className="avatar"
            src={require("@/assets/wallet-login-avatar.png")}
          />
          <div className="divider" />
          <span>PROFILE&nbsp;{fuzzAddress(account)}</span>
        </ButtonContainer>

        <div
          style={{ display: showTab ? "flex" : "none" }}
          id="go-home"
          className="home"
          onClick={()=>window.open('/')}
        >
          HOME
        </div>

        <div
          style={{ display: showTab ? "flex" : "none" }}
          id="wallet-logout"
          className="logout"
          onClick={disconnect}
        >
          LOGOUT
        </div>
      </Container>
    );
  }
  return (
    <ButtonContainer className="connect">
      <Connect>{null}</Connect>
    </ButtonContainer>
  );
};

export default LaunchApp;
