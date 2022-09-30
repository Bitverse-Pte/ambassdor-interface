import { useHover } from "ahooks";
import { useRef } from "react";
import styled from "styled-components";
import Fire from "../Icons/Fire";
import IconDiscord from "../Icons/IconDiscord";
import IconLinktree from "../Icons/IconLinktree";
import IconMedium from "../Icons/IconMedium";
import IconTelegram from "../Icons/IconTelegram";
import IconTwitter from "../Icons/IconTwitter";
import Logo from "../Icons/Logo";
import LaunchApp from "../Launch";
import Link from "../Link";

const navList = [
  {
    key: "Docs",
    value: "Docs",
    // link: "https://docs",
    children: [
      {
        title: "White Paper",
        link:
          "https://static-files.teleport.network/whitepaper/Teleport_Whitepaper_v1.0.pdf",
      },
      {
        title: "Developer",
        link: "https://docs.teleport.network/",
      },
      {
        title: "Wallet",
        link: "https://docs.teleportwallet.io/guides/teleport-wallet",
      },
    ],
  },
  // {
  //   key: "Tool",
  //   value: "Tool",
  //   link: "https://docs",
  // },
  {
    key: "Community",
    value: "Community",
    // link: "https://discordapp.com/community",
    children: [
      {
        title: "Twitter",
        link: "https://twitter.com/TeleportChain",
        icon: <IconTwitter />,
      },
      {
        title: "Telegram",
        link: "https://t.me/TeleportNetwork",
        icon: <IconTelegram />,
      },
      {
        title: "Discord",
        link: "https://discord.com/invite/5YQtRDF4Rh",
        icon: <IconDiscord />,
      },
      {
        title: "Medium",
        link: "https://medium.com/@TeleportNetwork",
        icon: <IconMedium />,
      },
      {
        title: "Linktree",
        link: "https://linktr.ee/teleportnetwork",
        icon: <IconLinktree />,
      },
    ],
  },
  {
    key: "Ambassador",
    value: "Ambassador",
    link: "https://ambassador.teleport.network/",
    className: "active",
    prefix: <Fire />,
  },
  {
    key: "Wallet",
    value: "Wallet",
    link:
      "https://chrome.google.com/webstore/detail/teleport-wallet/gkeelndblnomfmjnophbhfhcjbcnemka",
  },
];

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 40px;
  .nav {
    display: grid;
    grid-gap: 28px;
    align-items: center;
    justify-content: center;
    grid-template-columns: repeat(${navList.length + 1}, auto);
  }
  .link-container {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all linear .2s;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    &:hover{
      color: #0acbe4;
    }
    a {
      text-decoration: none;
      color: #ffffff;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      transition: all 0.2s ease-in-out;
      :hover {
        color: #0acbe4;
      }
    }
    .active {
      color: #0acbe4;
    }
  }
  .hover-container {
    position: relative;
    .dropdown {
      top: 34px;
      min-width: 120px;
      opacity: 0;
      transition: all linear 0.1s;
      position: absolute;
      background-color: #000;
      padding: 12px 24px;
      z-index: -1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 6px;
      &::before{
        content: '';
        position: absolute;
        top: 0px;
        left: 0;
        width: 100%;
        height: 34px;
        transform: translate(0, -50%);
      }
    }
    &.active .dropdown {
      opacity: 1;
      z-index: 23;
    }
  }

  .dropdown-item {
    margin: 12px 0;
    transition: all linear 0.1s;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transition: transform linear 0.2s;
    &:hover {
      transform: translate(6px, 0);
    }
    span {
      transition: color linear 0.1s;
      margin-left: 6px;
    }
  }
`;

const Hover = styled.div``;

const HoverContainer = ({ id, children }: any) => {
  const target = useRef(null);
  const ifHover = useHover(target);
  const ifChildrenHover = useHover(() =>
    document.querySelectorAll(`#${id} .dropdown`)
  );

  // const dropdown = useRef()
  // console.log('dropdown', dropdown)

  return (
    <Hover
      id={id}
      ref={target}
      className={`hover-container ${(ifHover||ifChildrenHover) ? "active" : ""}`}
    >
      {children}
    </Hover>
  );
};

const Header = () => {
  return (
    <Container>
      <a href="/">
      <Logo />
      </a>
      <div className="nav">
        {navList.map((i) => (
          <HoverContainer key={i.key} id={i?.key}>
            <div className="link-container">
              {i?.prefix && i?.prefix}
              {i?.children ? (
                <div className="dropdown-links">
                  <div>{i?.value}</div>

                  <div className="dropdown">
                    {i?.children?.map((j) => (
                      <a href={j?.link} target="_blank">
                        <div className="dropdown-item" key={j?.title}>
                          {j?.icon && j?.icon}
                          <span>{j?.title}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <Link to={i.link} className={i?.className}>
                  {i.value}
                </Link>
              )}
            </div>
          </HoverContainer>
        ))}
        <LaunchApp />
      </div>
    </Container>
  );
};

export default Header;
