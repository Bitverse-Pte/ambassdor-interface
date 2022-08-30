import styled from "styled-components";
import Connect from "../Connect";
import Fire from "../Icons/Fire";
import Logo from "../Icons/Logo";
import LaunchApp from "../Launch";
import Link from "../Link";

const navList = [
    {
      key: "Docs",
      value: "Docs",
      link: "https://docs",
    },
    {
      key: "Faucet",
      value: "Faucet",
      link: "https://docs",
    },
    {
      key: "Ambassador",
      value: "Ambassador",
      link: "/ambassador",
      className: "active",
      prefix: <Fire />,
    },
    {
      key: "Wallet",
      value: "Wallet",
      link: "https://docs",
    },
    {
      key: "Community",
      value: "Community",
      link: "https://discordapp.com/community",
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
    grid-template-columns: repeat(${navList.length+1}, auto);
  }
  .link-container {
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      text-decoration: none;
      color: #ffffff;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      transition: all 0.2s ease-in-out;
      :hover{
        color: #0acbe4;
      }
    }
    .active {
      color: #0acbe4;
    }
  }
`;

const Header = () => {
  return (
    <Container>
      <Logo />
      <div className="nav">
        {navList.map((i) => (
          <div className="link-container" key={i.key}>
            {i?.prefix && i?.prefix}
            <Link to={i.link} className={i?.className}>
              {i.value}
            </Link>
          </div>
        ))}
        <LaunchApp />
      </div>
    </Container>
  );
};

export default Header;
