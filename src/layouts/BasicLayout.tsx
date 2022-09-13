import Header from "@/components/Header";
import styled from "styled-components";

import Web3Provider from "@/components/WalletProvider";
import Login from "@/components/Update/Login";
import QuestTitleModal from "@/components/QuestTItleModal";

const Container = styled.div`
  background-color: #05050e;
  color: #fff;
  /* width: max; */
`;

const Content = styled.div`
  background-color: #05050e;
  min-width: 1440px;
  min-height: calc(100vh - 60px);
`

export default function Layout({ children }: { children: any }) {
  
  return (
    <Web3Provider>
      <Login/>
      <QuestTitleModal/>
      <Container>
        <Header />
        <Content>
          {children}
        </Content>
      </Container>
    </Web3Provider>
  );
}
